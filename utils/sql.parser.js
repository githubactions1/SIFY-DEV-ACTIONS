(function (exports) {
    "use strict";

    function trim(str) {
        if (typeof str == 'string') return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
        else return str;
    }

    // Split a string using a separator, only if this separator isn't between brackets
    function protect_split(separator, str) {
        var sep = '######';

        var string = false;
        var nb_brackets = 0;
        var new_str = "";
        for (var i = 0; i < str.length; i++) {
            if (!string && /['"`]/.test(str[i])) string = str[i];
            else if (string && str[i] == string) string = false;
            else if (!string && str[i] == '(') nb_brackets++;
            else if (!string && str[i] == ')') nb_brackets--;

            if (str[i] == separator && (nb_brackets > 0 || string)) new_str += sep;
            else new_str += str[i];
        }
        str = new_str;

        str = str.split(separator);
        str = str.map(function (item) {
            return trim(item.replace(new RegExp(sep, 'g'), separator));
        });

        return str;
    }

    // Add some # inside a string to avoid it to match a regex/split
    function protect(str) {
        var result = '#';
        var length = str.length;
        for (var i = 0; i < length; i++) result += str[i] + "#";
        return result;
    }

    // Restore a string output by protect() to its original state
    function unprotect(str) {
        var result = '';
        var length = str.length;
        for (var i = 1; i < length; i = i + 2) result += str[i];
        return result;
    }

    // Parse a query
    exports.multiQrs = function (m_query) {

        // Separate queries
        var semi_colon = '###semi-colon###';
        m_query = m_query.replace(/[("'`].*;.*[)"'`]/g, function (match) {
            return match.replace(/;/g, semi_colon);
        });
        var eor = '###EOR###';
        m_query = m_query.replace(/;/g, eor);
        var multiQrs = m_query.split(eor);

        for (var i = 0; i < multiQrs.length; i++) {
            multiQrs[i] = multiQrs[i].replace(new RegExp(semi_colon, 'gi'), ';');
            multiQrs[i] = trim(multiQrs[i]);
        }
        multiQrs = multiQrs.filter(function (el) { return el; });

        return multiQrs;
    }
    // Parse a query
    // parseCond: (bool) parse conditions in WHERE and JOIN (default true)
    exports.sql2ast = function (query) {
        let openbrc =(query.match(/\(/g) || []).length;
        // console.log((query.match(/\(/g) || []).length);
        let closebrc = (query.match(/\)/g) || []).length
        // console.log((query.match(/\)/g) || []).length);
        // console.log("query",query)
        for(var i=closebrc; i<=openbrc; i++){
            query += ")" ;
        }
        //Skip test if query is INSERT-SELECT OR INSERT-UPDATE -(Raju)
        if ((query.indexOf('SELECT') > 0 && query.indexOf('INSERT') > 0) || (query.indexOf('INSERT') > 0 && query.indexOf('UPDATE') > 0)) {
            return {};
        }

        // Remove semi-colons and keep only the first query
        var semi_colon = '###semi-colon###';
        query = query.replace(/[("'`].*;.*[)"'`]/g, function (match) {
            return match.replace(/;/g, semi_colon);
        });
        var eor = '###EOR###';
        query = query.replace(/;/g, eor);
        query = query.split(eor)[0];
        query = query.replace(new RegExp(semi_colon, 'g'), ';');

        // Define which words can act as separator
        var keywords = ['SELECT', 'FROM', 'DELETE FROM', 'INSERT INTO', 'UPDATE', 'SET', 'WHERE'];

        query = query.replace(/(\r\n|\n|\r)/g, ' ');
        keywords.map(function (item) {
            query = query.replace(new RegExp(item, 'gi'), item.toUpperCase());
        });

        var parts_name = keywords.map(function (item) {
            return item + ' ';
        });
        parts_name = parts_name.concat(keywords.map(function (item) {
            return item + '(';
        }));
        var parts_name_escaped = parts_name.map(function (item) {
            return item.replace('(', '[\\(]');
        });

        // Hide words defined as separator but written inside brackets in the query
        query = query.replace(/\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)|"(.+?)"|'(.+?)'|`(.+?)`/gi, function (match) {
            // console.log(match);
            return match.replace(new RegExp(parts_name_escaped.join('|'), 'gi'), protect);
        });

        // Write the position(s) in query of these separators
        var parts_order = [];
        function realNameCallback(match, name) {
            return name;
        }
        parts_name.forEach(function (item) {
            var pos = 0;
            var part;

            do {
                part = query.indexOf(item, pos);
                if (part != -1) {
                    var realName = item.replace(/^((\w|\s)+?)\s?\(?$/i, realNameCallback);
                    parts_order[part] = realName;	// Position won't be exact because the use of protect() (above) and unprotect() alter the query string ; but we just need the order :)
                    pos = part + realName.length;
                }
            }
            while (part != -1);
        });

        // Delete duplicates (caused, for example, by JOIN and INNER JOIN)
        var busy_until = 0;
        parts_order.forEach(function (item, key) {
            if (busy_until > key) delete parts_order[key];
            else {
                busy_until = parseInt(key, 10) + item.length;

                // Replace JOIN by INNER JOIN
                if (item == 'JOIN') parts_order[key] = 'INNER JOIN';
            }
        });

        // Generate protected word list to reverse the use of protect()
        var words = parts_name_escaped.slice(0);
        words = words.map(function (item) {
            return protect(item);
        });
        words = words.join('|');

        // Split parts
        var parts = query.split(new RegExp(parts_name_escaped.join('|'), 'i'));

        // Unhide words precedently hidden with protect()
        query = query.replace(/\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)|"(.+?)"|'(.+?)'|`(.+?)`/gi, function (match) {
            return match.replace(new RegExp(words, 'gi'), unprotect);
        });
        parts = parts.map(function (item) {
            return item.replace(/\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)|"(.+?)"|'(.+?)'|`(.+?)`/gi, function (match) {
                return match.replace(new RegExp(words, 'gi'), unprotect);
            });
        });

        var result = {};
        var j = 0;
        // console.log(query)
        result.TYPE = query.substring(6, 0);

        // Define analysis functions
        var analysis = [];

        analysis['SELECT'] = function (str) {
            // console.log(str)
            result.COLUMNS = trim(str);
            return;
        };
        analysis['SET'] = function (str) {
            var _a = protect_split(',', str);
            _a = _a.filter(function (item) {
                return item !== '';
            }).map(function (item) {
                return item;
            });
            result.COLUMNS = _a;
            return;
        };
        analysis['WHERE'] = function (str) {
            return trim(str);
        };
        analysis['FROM'] = analysis['DELETE FROM'] = analysis['UPDATE'] = function (str) {
            // console.log(str);
            var joins = '', tables = [];
            var _a = trim(str).toLowerCase();

            if (_a.indexOf('join') == -1) {
                if (_a.indexOf(',') != -1) {
                    tables = _a.split(',');
                } else
                    tables = [_a];
            } else {
                var joinType = str.length;

                if (_a.indexOf('left') != -1) {
                    if (joinType >= 0 && joinType > _a.indexOf('left'))
                        joinType = _a.indexOf('left');
                }
                if (_a.indexOf('right') != -1) {
                    if (joinType >= 0 && joinType > _a.indexOf('right'))
                        joinType = _a.indexOf('right');
                }
                if (_a.indexOf('inner') != -1) {
                    if (joinType >= 0 && joinType > _a.indexOf('inner'))
                        joinType = _a.indexOf('inner');
                }
                if (_a.indexOf('outer') != -1) {
                    if (joinType >= 0 && joinType > _a.indexOf('outer'))
                        joinType = _a.indexOf('outer');
                }
                if (_a.indexOf('join') != -1) {
                    if (joinType >= 0 && joinType > _a.indexOf('join'))
                        joinType = _a.indexOf('join');
                }

                joins = _a.substr(joinType, str.length)

                tables = _a.substr(0, joinType);
                if (tables.indexOf(',') != -1) {
                    tables = tables.split(',');
                } else
                    tables = [tables];
            }

            tables = tables.map(function (item) {
                return trim(item);
            });
            tables.forEach(function (item, key) {
                if (item === '') tables.splice(key);
            });
            tables = tables.map(function (el) {
                let item = '', clauses ='';
                if (el.indexOf('(') != -1)
                    item = [el];
                else {
                    item = el.split(/\s+/);
                    clauses = item.slice(1, item.length).join(" ")
                }

                return { name: item[0], clauses: clauses };
            });

            result.TABLES = tables;
            result.JOINS = joins;

            return;
        };

        analysis['INSERT INTO'] = function (str) {
            var insert = /([A-Za-z0-9_\.]+)\s*(\(([A-Za-z0-9_\., ]+)\))?/gi;
            insert = insert.exec(str);

            var _a = {};
            _a['TABLE'] = trim(insert[1]);
            result.TABLES = [{ name: _a['TABLE'] }];
            if (typeof insert[3] != 'undefined') {
                _a['columns'] = insert[3];
            }
            return _a;
        };

        // Analyze parts
        parts_order.forEach(function (item, key) {
            item = item.toUpperCase();
            j++;
            if (typeof analysis[item] != 'undefined') {
                var part_result = analysis[item](parts[j]);

                if (typeof result[item] != 'undefined') {
                    if (typeof result[item] == 'string' || typeof result[item][0] == 'undefined') {
                        var tmp = result[item];
                        result[item] = [];
                        result[item].push(tmp);
                    }

                    result[item].push(part_result);
                }
                else if (part_result) { result[item] = part_result; }
            }
            else console.log('Can\'t analyze statement "' + item + '"');
        });

        return result;
    };

    // Export some methods for tests
    exports.trim = trim;
    exports.protect = protect;
    exports.unprotect = unprotect;
    exports.protect_split = protect_split;

}(typeof exports === "undefined" ? (this.simpleSqlParser = {}) : exports));
