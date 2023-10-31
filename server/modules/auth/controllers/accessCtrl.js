var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var validateToken = require('../validators/jwtValidator');
var jsonUtils = require(appRoot + '/utils/json.utils');
var accessMdl = require('../models/accessMdl');
var _ = require('lodash');
//var redisclnt = require(appRoot + '/utils/redis.utils');

/**
 * Status - 257 - Token expired
 * Status - 258 - Token not provided
 * Status - 555 - Invalid token
 * Status - 666 - Permission denied
 */

/**
 * token validation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.hasToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    // redisclnt.getValue(token // random unique access key
    //     , function (err, jwt_tkn) {
    //         //console.log(err);
    //         if (err)
    //             return res.status(500).send({ auth: false, message: 'Connection closed', data: [] });
    //         else
    //             token = jwt_tkn; //JWT token

            if (!token) {
                return res.status(258).send({ auth: false, message: 'No token provided.', data: [] });
            }

            let parts = token.split('.');

            if (parts.length !== 3) {
                return res.status(555).send({ auth: false, message: 'Invalid token: ' + JSON.stringify(token), data: [] });
            }

            let user = jwt.decode(token);
            console.log(user)

            let validSeconds = 0;
            let ignoreExp = true;

            if (user.app == 'web') {
                validSeconds = 15;
                ignoreExp = false;
            }
            // //console.log('*************', validateToken.isExpired(token, validSeconds, user));
            if (validateToken.isExpired(token, validSeconds, user)) {
                //const accessToken = validateToken.generateNewToken(token, 'sifywaterDev101222', ignoreExp);

                //if (!accessToken)
                   return res.status(257).send({ auth: false, message: 'Token Expired/Invalid Token', data: [] });

                //let user = jwt.decode(accessToken);
                //req.user = user;
                //res.setHeader('x-access-token', accessToken);

                //next();
            } else {
				
                //console.log("in else")
                var verified;
                //console.log(jwt.verify(token, 'BssGlitsUser', { algorithm: 'HS256'}));
                try {
                    verified = jwt.verify(token, 'sifywaterDev101222', { algorithm: 'HS256'});
                }
                catch (err) {
                    verified = null;
                }
                console.log(verified)
				
				const creationTime = verified.iat * 1000; // Convert to milliseconds
				const currentTime = Date.now();

				if (currentTime - creationTime > 3600000) {
				  return res.status(257).send({ auth: false, message: 'Token Expired/Invalid Token', data: [] });
				}
				
                if (verified) {
                    req.user = user;
                    next();
                } else {
                    return res.status(555).send({ auth: false, message: 'Failed to authenticate token.', data: [] });
                }
            };
        // });
}

function checkPermission(req, res, next, keyword, perm_in) {
    // //console.log(req.user.mrcht_usr_id);
    var id = req.headers['access_id'];
    if (!id) {
        return next();
    }
    if (req.user) {
        return a(req, res, next, keyword, perm_in, id);
    } else {
        sessionStore.get(req.user.mrcht_usr_id + '_' + req.user.app, function (err, data) {
            req.user = data;
            return a(req, res, next, keyword, perm_in, id);
        });
    }
}

function a(req, res, next, keyword, perm_in, id) {
    var data = jsonUtils.concateArr(req.user.appprfls || [], req.user.mnuprfls || []);
    var perm = false;
    // //console.log(data);
    for (var i = 0; i < data.length; i++) {
        // //console.log(data[i]);
        data[i].id = data[i].mnu_itm_id || data[i].app_id;
        if (data[i].id == id) {
            if (data[i].kywrd_tx && keyword) {
                if (data[i].kywrd_tx == keyword) {
                    if (perm_in == 'r_in') perm_in = data[i].r_in;
                    else if (perm_in == 'c_in') perm_in = data[i].c_in;
                    else if (perm_in == 'u_in') perm_in = data[i].u_in;
                    else if (perm_in == 'd_in') perm_in = data[i].d_in;
                }
            } else {
                if (perm_in == 'r_in') perm_in = data[i].r_in;
                else if (perm_in == 'c_in') perm_in = data[i].c_in;
                else if (perm_in == 'u_in') perm_in = data[i].u_in;
                else if (perm_in == 'd_in') perm_in = data[i].d_in;
            }
        }
        perm = perm_in == 1 ? true : false;
    }
    if (perm) {
        return next();
    }
    else {
        return res.status(666).send({ access: false, message: 'Permission Denied.', data: [] });
    }
}

function canRead(keyword) {
    return canRead[keyword] || (canRead[keyword] = function (req, res, next) {
        checkPermission(req, res, next, keyword, 'r_in');
    })
}
function canCreate(keyword) {
    return canCreate[keyword] || (canCreate[keyword] = function (req, res, next) {
        checkPermission(req, res, next, keyword, 'c_in');
    })
}
function canUpdate(keyword) {
    return canUpdate[keyword] || (canUpdate[keyword] = function (req, res, next) {
        checkPermission(req, res, next, keyword, 'u_in');
    })
}
function canDelete(keyword) {
    return canDelete[keyword] || (canDelete[keyword] = function (req, res, next) {
        checkPermission(req, res, next, keyword, 'd_in');
    })
}


var prepare_array_valdtn = (req_body, validate_string, calbk) => {
    let schema_rqured_mtchd_keys = [];
    let err_msg = ' ';
    calbk(false, {
        schema_rqured_mtchd_keys: [],
        err_msg: err_msg
    })
    // validate_string.fields.filter((f) => {
    //     if (f.required == 'true') {
    //         let req_body_indx_val = -1;
    //         req_body.filter((r) => {
    //             req_body_indx_val++;
    //             let mtchd_key = false;
    //             let mtchd_val = false;
    //             let counter = 0;
    //             let no_of_obj = Object.keys(r)
    //             for (key in r) {
    //                 counter++;
    //                 if (f.nm == key) {
    //                     mtchd_key = true;
    //                     if (r[key] != null && r[key] != undefined && r[key] != '') {
    //                         mtchd_val = true;
    //                     }
    //                 }
    //                 if (counter == no_of_obj.length) {

    //                     if (mtchd_key == false) {
    //                         schema_rqured_mtchd_keys.push({
    //                             rqrd_fld_nm: f.nm,
    //                             recieve_fld_val: r[f.nm],
    //                             err_msg: 'feild should be required',
    //                             req_body_indx_val: req_body_indx_val
    //                         })
    //                     }

    //                     if (mtchd_val == false) {
    //                         schema_rqured_mtchd_keys.push({
    //                             rqrd_fld_nm: f.nm,
    //                             recieve_fld_val: r[f.nm],
    //                             err_msg: 'value must not be empty',
    //                             req_body_indx_val: req_body_indx_val
    //                         })
    //                     }

    //                 }
    //             }
    //         })
    //     }
    //     else if (f.required == 'false') {
    //         req_body.filter((r) => {
    //             for (key in r) {
    //                 if (f.nm == key) {

    //                 }
    //             }
    //         })
    //     }
    // });
    // let fld_rqrd_mtchd = false;
    // if (schema_rqured_mtchd_keys.length > 0) {
    //     err_msg = 'Required feilds not matched';
    //     fld_rqrd_mtchd = true;
    // }
    // else {
    //     err_msg = 'correct format';
    //     fld_rqrd_mtchd = false;
    // }
    // calbk(fld_rqrd_mtchd, {
    //     schema_rqured_mtchd_keys: _.orderBy(schema_rqured_mtchd_keys, 'req_body_indx_val'),
    //     err_msg: err_msg
    // })
}

var prepare_object_valdtn = (req_body, validate_string, calbk) => {
    let schema_rqured_mtchd_keys = [];
    let err_msg = ' ';
    //console.log(validate_string)
    validate_string.fields.filter((f) => {
        if (f.required == 'true') {
            let mtchd_key = false
            let mtchd_val = false
            let counter = 0;
            let no_of_obj = Object.keys(req_body)
            for (key in req_body) {
                counter++;
                if (f.nm == key) {
                    mtchd_key = true;
                    if (req_body[key] != null && req_body[key] != undefined && req_body[key] != '') {
                        mtchd_val = true;
                    }
                }
                if (counter == no_of_obj.length) {

                    if (mtchd_key == false) {
                        schema_rqured_mtchd_keys.push({
                            rqrd_fld_nm: f.nm,
                            recieve_fld_val: req_body[f.nm],
                            err_msg: 'feild should be required'
                        })
                    }

                    if (mtchd_val == false) {
                        schema_rqured_mtchd_keys.push({
                            rqrd_fld_nm: f.nm,
                            recieve_fld_val: req_body[f.nm],
                            err_msg: 'value must not be empty'
                        })
                    }

                }
            }
        }
        else if (f.required == 'false') {
        }
    })

    let fld_rqrd_mtchd = false;
    if (schema_rqured_mtchd_keys.length > 0) {
        err_msg = 'Required feilds not matched';
        fld_rqrd_mtchd = true;
    }
    else {
        err_msg = 'correct format';
        fld_rqrd_mtchd = false;
    }
    calbk(fld_rqrd_mtchd, {
        schema_rqured_mtchd_keys: _.orderBy(schema_rqured_mtchd_keys, 'req_body_indx_val'),
        err_msg: err_msg
    })
}

var usr_valdtion = (tbl_obj, req, fnm, calbk) => {
    //console.log(fnm);
    let obj = tbl_obj;
    // var user = "114841790497948546";
    if (obj && req.user) {
        accessMdl.checkPermissionMdl(obj, req.user)
            .then(function (results) {
                if (results.length < 1) {
                    // req.perm = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 };
                    req.perm = undefined;
                    calbk(false, 'No Access');
                } else {
                    req.perm = results;
                    if (fnm == 'vldSelect') {
                        // //console.log('results.length', results.length, 'results[0].slct_in', results[0].slct_in)
                        var fnVal = results.length && results[0].slct_in == 1;
                    }
                    else if (fnm == 'vldInsert') {
                        var fnVal = results.length && results[0].insrt_in == 1;
                    } else if (fnm == 'vldUpdate') {
                        var fnVal = results.length && results[0].updt_in == 1;
                    }
                    else if (fnm == 'vldDelete') {
                        var fnVal = results.length && results[0].dlte_in == 1;
                    }
                    //console.log('fnVal', fnVal)
                    if (fnVal) {
                        //console.log(results)
                        req.perm = results;
                        calbk(false, 'sucess');
                    } else {
                        req.perm = undefined;
                        calbk(true, 'No Access');
                    }
                }

            }, function (error) {
                calbk(true, error);
            });
    } else {
        calbk(true, 'User ID Required');
    }
}




/**************************************************************************************
* Controller     : vldSelect
* Parameters     : req,res,obj,validate_string
* Description    : validate the user got permissions on the object and if the passed fields are correct
* Change History :
* 08/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
function vldSelect(obj, validate_string) {
    return (req, res, next) => {
        var fnm = 'vldSelect';
        if (req.user) {
            usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                if (usr_vald_err) {
                    return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                }
                else {
                    return next();
                }
            })
        }
    }
}
// function vldSelect(req, res, obj, validate_string) {
//     var fnm = 'vldSelect';
//     if (req.user) {
//         usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
//             if (usr_vald_err) {
//                 return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
//             } else {
//                 return next();
//             }
//         })
//     }
// }
/**************************************************************************************
* Controller     : vldSearch
* Parameters     : req,res,obj,validate_string
* Description    : validate the user got permissions on the object and if the passed fields are correct
* Change History :
* 08/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
function vldSearch(obj, validate_string) {
    return vldSearch[validate_string] || (vldSearch[validate_string] = function (req, res, next) {
        return next();
    })
}
/**************************************************************************************
* Controller     : vldInsert
* Parameters     : req,res,obj,validate_string
* Description    : validate the user got permissions on the object and if the passed fields are correct
* Change History :
* 08/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
function vldInsert(obj, validate_string) {
    return (req, res, next) => {
        let err_msg = ' ';
        let valdtn_res = [];
        //console.log(req.body.data)
        if (Array.isArray(req.body.data)) {
            prepare_array_valdtn(req.body.data, validate_string, (fld_rqrd_mtchd, results) => {
                valdtn_res = results

                if (fld_rqrd_mtchd == false) {
                    var fnm = 'vldInsert';

                    if (req.user) {
                        usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                            if (usr_vald_err) {
                                return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                            }
                            else {
                                return next();
                            }
                        })
                    }
                    else {
                        return next();
                    }


                }
                else {
                    return res.status(555).send({ auth: false, message: 'Feilds not Matched', data: [] });
                }
            })
        }
        else if (typeof req.body.data == 'object') {
            prepare_object_valdtn(req.body.data, validate_string, (fld_rqrd_mtchd, results) => {
                valdtn_res = results;
                //console.log("------------------------------------------------------------------------------------------- -")
                //console.log(fld_rqrd_mtchd)
                if (fld_rqrd_mtchd == true) {
                    var fnm = 'vldInsert';
                    if (req.user) {
                        usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                            if (usr_vald_err) {
                                //console.log('in-------------------2');
                                return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                            }
                            else {
                                return next();
                            }
                        })
                    }
                    else {
                        return next();
                    }


                }
                else {
                    return res.status(555).send({ auth: false, message: 'Feilds not Matched', data: [] });
                }
            })
        }
        else {
            return res.status(666).send({ access: false, message: 'Bad format.', data: [] });
        }

    }
}
/**************************************************************************************
* Controller     : vldUpdate
* Parameters     : req,res,obj,validate_string
* Description    : validate the user got permissions on the object and if the passed fields are correct
* Change History :
* 08/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
function vldUpdate(obj, validate_string) {
    return (req, res, next) => {
        let err_msg = ' ';
        let valdtn_res = [];
        if (Array.isArray(req.body.data)) {
            prepare_array_valdtn(req.body.data, validate_string, (fld_rqrd_mtchd, results) => {
                valdtn_res = results
                if (fld_rqrd_mtchd == false) {
                    var fnm = 'vldUpdate';
                    if (req.user) {
                        usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                            if (usr_vald_err) {
                                return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                            }
                            else {
                                return next();
                            }
                        })
                    }
                }
                else {
                    return res.status(555).send({ auth: false, message: 'Feilds not Matched', data: [] });
                }
            })
        }
        else if (typeof req.body.data == 'object') {
            prepare_object_valdtn(req.body.data, validate_string, (fld_rqrd_mtchd, results) => {
                valdtn_res = results;
                if (fld_rqrd_mtchd == true) {
                    var fnm = 'vldUpdate';
                    if (req.user) {
                        usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                            if (usr_vald_err) {
                                return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                            }
                            else {
                                return next();
                            }
                        })
                    }
                }
                else {
                    return res.status(555).send({ auth: false, message: 'Feilds not Matched', data: [] });
                }
            })
        }
        else {
            return res.status(666).send({ access: false, message: 'Bad format.', data: [] });
        }

    }
}
/**************************************************************************************
* Controller     : vldDelete
* Parameters     : req,res,obj,validate_string
* Description    : validate the user got permissions on the object and if the passed fields are correct
* Change History :
* 08/01/2020    -  Sunil Mulagada  - Initial Function
*
***************************************************************************************/
function vldDelete(obj, validate_string) {
    return (req, res, next) => {
        let err_msg = ' ';
        let valdtn_res = [];
        if (Array.isArray(req.body.data)) {
            prepare_array_valdtn(req.body.data, validate_string, (fld_rqrd_mtchd, results) => {
                valdtn_res = results
                if (fld_rqrd_mtchd == false) {
                    var fnm = 'vldDelete';
                    if (req.user) {
                        usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                            if (usr_vald_err) {
                                return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                            }
                            else {
                                return next();
                            }
                        })
                    }
                }
                else {
                    return res.status(555).send({ auth: false, message: 'Feilds not Matched', data: [] });
                }
            })
        }
        else if (typeof req.body.data == 'object') {
            prepare_object_valdtn(req.body.data, validate_string, (fld_rqrd_mtchd, results) => {
                valdtn_res = results;
                if (fld_rqrd_mtchd == false) {
                    var fnm = 'vldDelete';
                    if (req.user) {
                        usr_valdtion(obj, req, fnm, (usr_vald_err, usr_vald_res) => {
                            if (usr_vald_err) {
                                return res.status(555).send({ auth: false, message: 'User ID Required', data: [] });
                            }
                            else {
                                //console.log('in---')
                                return next();
                            }
                        })
                    }
                }
                else {
                    return res.status(555).send({ auth: false, message: 'Feilds not Matched', data: [] });
                }
            })
        }
        else {
            return res.status(666).send({ access: false, message: 'Bad format.', data: [] });
        }

    }
}

exports.canRead = canRead;
exports.canCreate = canCreate;
exports.canDelete = canDelete;
exports.canUpdate = canUpdate;
exports.vldSelect = vldSelect;
exports.vldSearch = vldSearch;
exports.vldInsert = vldInsert;
exports.vldUpdate = vldUpdate;
exports.vldDelete = vldDelete;