var _ = require('lodash');


/**************************************************************************************
* Controller     : rejectArr
* Description    : Returns Groupd Json
* 18/Oct/2018    -Sony Angel - Initial Function
***************************************************************************************/
exports.rejectArr = function (arr) {
    return _.reject(arr,  _.isEmpty);
}

/**************************************************************************************
* Controller     : uniqueArr
* Description    : Returns Groupd Json
* 18/Oct/2018    -Sony Angel - Initial Function
***************************************************************************************/
exports.uniqueArr = function (arr, field_name) {
    return _.uniqBy(arr, field_name);
}
 
/**************************************************************************************
* Controller     : concateArr
* Description    : Returns Groupd Json
* 18/Oct/2018    -Sony Angel - Initial Function
***************************************************************************************/
exports.concateArr = function (arr, arr2) {
    return _.concat(arr, arr2);
}

/**************************************************************************************
* Controller     : sortArr
* Description    : Returns Sorted Json
* 24/APR/2019    -Sony Angel - Initial Function
***************************************************************************************/
exports.sortArr = function (arr, sortKey, orderTyp) {
    if (orderTyp == 'asc') {
        return _.sortBy(arr, sortKey);
    } else {
        return _.sortBy(arr, sortKey).reverse();
    }
}

/**************************************************************************************
* Controller     : groupJsonByKey
* Parameters     : req,res()
* Description    : Returns Groupd Json
* 05/MAY/2018    -Raju Dasari - Initial Function
***************************************************************************************/
exports.groupJsonByKey = function (input_data, common_feilds, arrFeilds, arrName, groupByKey, sortKey, orderTyp) {

    var resData = _.groupBy(input_data, groupByKey);
	console.log("resData",resData)
	console.log("resData.length",resData.length)
    var resArr = [];
    Object.keys(resData).forEach(function (key) {
        // When Duplicate entries found
        if (resData[key].length > 1 || resData[key][0][arrFeilds[0]] != null) {
            var tempObj = {};
            common_feilds.forEach(cmn_f => {
                tempObj[cmn_f] = resData[key][0][cmn_f];
            });
            tempObj[arrName] = [];
            for (i = 0; i < resData[key].length; i++) {
                var arrFeildObj = {};
                arrFeilds.forEach(arr_f => {
                    arrFeildObj[arr_f] = resData[key][i][arr_f];
                });
                tempObj[arrName].push(arrFeildObj);
            }
            resArr.push(tempObj);
        }
        //When No Duplicate entries found
        else {
            var tempObj = {};
            common_feilds.forEach(cmn_f => {
                tempObj[cmn_f] = resData[key][0][cmn_f];
            });
            resArr.push(tempObj);
        }
    });
    if (orderTyp == 'asc') {
        var responseData = _.sortBy(resArr, sortKey);
    } else {
        var responseData = _.sortBy(resArr, sortKey).reverse();
    }
    return responseData;
};


/**************************************************************************************
* Controller     : groupJsonByKeycustom
* Parameters     : req,res()
* Description    : Returns Groupd Json
* 15/APR/2023    - Ramesh - Initial Function
***************************************************************************************/
exports.groupJsonByKeycustom = function (input_data, common_feilds, arrFeilds, arrName, groupByKey, sortKey, orderTyp) {

    var resData = _.groupBy(input_data, groupByKey);
	//console.log(input_data)

    var resArr = [];
    Object.keys(resData).forEach(function (key) {
        // When Duplicate entries found
        if (resData[key].length > 1 || resData[key][0][arrFeilds[0]] != null) {
			//var newarrName = _.uniq(resData[key][0].section_name);
				
			//console.log("newarrName",newarrName)
            var tempObj = {};
            common_feilds.forEach(cmn_f => {
                tempObj[cmn_f] = resData[key][0][cmn_f];
            });
            tempObj[resData[key][0].section_name] = [];
			 //tempObj[arrName[key].name] = [];
            for (i = 0; i < resData[key].length; i++) {
                var arrFeildObj = {};
                arrFeilds.forEach(arr_f => {
                    arrFeildObj[arr_f] = resData[key][i][arr_f];
                });
                tempObj[resData[key][0].section_name].push(arrFeildObj);
            }
            resArr.push(tempObj);
        }
        //When No Duplicate entries found
        else {
            var tempObj = {};
            common_feilds.forEach(cmn_f => {
                tempObj[cmn_f] = resData[key][0][cmn_f];
            });
            resArr.push(tempObj);
        }
    });
    if (orderTyp == 'asc') {
        var responseData = _.sortBy(resArr, sortKey);
    } else {
        var responseData = _.sortBy(resArr, sortKey).reverse();
    }
    return responseData;
};

/**************************************************************************************
* Controller     : groupJsonByKey
* Parameters     : req,res()
* Description    : Returns Groupd Json
* 27/04/2023    - Ramesh Patlola - Initial Function
***************************************************************************************/
exports.newznegroupJsonByKey = function (input_data, common_feilds, arrFeilds, arrName, groupByKey, sortKey, orderTyp) {

    var resData = _.groupBy(input_data, groupByKey);
    var resArr = [];
    Object.keys(resData).forEach(function (key) {
        // When Duplicate entries found
        if (resData[key].length > 1 || resData[key][0][arrFeilds[0]] != null) {
            var tempObj = {};
            common_feilds.forEach(cmn_f => {
                tempObj['zone_id'] = resData[key][0].zone_id;
                tempObj['zone'] = resData[key][0].zone_name;
            });
            tempObj[resData[key][0].zone_name] = [];
            //tempObj['zone'] = resData[key][0].zone_name;
            for (i = 0; i < resData[key].length; i++) {
                var arrFeildObj = {};
                arrFeilds.forEach(arr_f => {
                    arrFeildObj[arr_f] = resData[key][i][arr_f];
                });
                tempObj[[resData[key][0].zone_name]].push(arrFeildObj);
            }
            resArr.push(tempObj);
        }
        //When No Duplicate entries found
        else {
            var tempObj = {};
            common_feilds.forEach(cmn_f => {
                tempObj[cmn_f] = resData[key][0][cmn_f];
            });
            resArr.push(tempObj);
        }
    });
    if (orderTyp == 'asc') {
        var responseData = _.sortBy(resArr, sortKey);
    } else {
        var responseData = _.sortBy(resArr, sortKey).reverse();
    }
    return responseData;
};

/**************************************************************************************
* Controller     : groupJsonByKey
* Parameters     : req,res()
* Description    : Returns Groupd Json
* 27-04-2023   -  Ramesh Patlola - Initial Function
***************************************************************************************/
exports.groupcstmznesteclsJsonByKey = function (input_data, common_feilds, arrFeilds, arrName, groupByKey, sortKey, orderTyp) {
    var resArr = [];
    Object.keys(input_data).forEach(function (key) {
		var resData = _.groupBy(input_data[key][arrName[key]], groupByKey);
		let mainnewtempObj = [];
		Object.keys(resData).forEach(function (newkey) {
			let tempObj = {};
			let newtempObj = {};
			tempObj[newkey]=[]
			tempObj[newkey]=resData[newkey]
			newtempObj["state_id"]=resData[newkey][0]['state_id']
			newtempObj["state"]=newkey
			//newtempObj[newkey]=[]
			//newtempObj[newkey].push(tempObj[newkey])
			newtempObj['state_name']=[]
			newtempObj['state_name'].push(tempObj[newkey])
			mainnewtempObj.push(newtempObj)
		})
		input_data[key][arrName[key]] = mainnewtempObj
    });
	resArr = input_data;
    if (orderTyp == 'asc') {
        var responseData = _.sortBy(resArr, sortKey);
    } else {
        var responseData = _.sortBy(resArr, sortKey).reverse();
    }
    return responseData;
};


/**************************************************************************************
* Controller     : processData
* Parameters     : req,res()
* Description    : Returns JSON Sub Arrays
***************************************************************************************/

exports.processData1 = (input, id, val, extr, subarr) => {
    const sortedData = _.sortBy(input, id);
    var tmpArr = [];
    var index = 0;
    for (i = 0; i < sortedData.length; i++) {
        if (i == index) {
            tmpArr[index] = {};
            tmpArr[index][id] = sortedData[i][id];
            tmpArr[index][val] = sortedData[i][val];
            tmpArr[index][extr] = sortedData[i][extr];
            tmpArr[index][subarr] = [];
            tmpArr[index][subarr].push(sortedData[i]);

        }
        else {
            if (sortedData[i - 1][id] == sortedData[i][id]) {
                tmpArr[index][subarr].push(sortedData[i]);
            } else {
                index++;
                tmpArr[index] = {};
                tmpArr[index][id] = sortedData[i][id];
                tmpArr[index][val] = sortedData[i][val];
                tmpArr[index][extr] = sortedData[i][extr];
                tmpArr[index][subarr] = [];
                tmpArr[index][subarr].push(sortedData[i]);

            }
        }

        if (i >= sortedData.length - 1) {
            return tmpArr;
        }
    }
}


exports.processData = (resArr, groupByKey) => {
    var str = '';

    for (i = 0; i < resArr.length; i++) {
        (str == '') ? str += resArr[i][groupByKey] : str += "," + resArr[i][groupByKey];
    }

    return str;
}


/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

// exports.prcs_tmplte_get_xml = function (input_str, data) {
//     Object.keys(data).forEach(function (k) {
//         input_str = input_str.replace("$$" + k + "$$", data[k]);
//     });
//     return input_str;
// }
/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_url = function (input_str, data) {

    Object.keys(data).forEach(function (k) {
        input_str = input_str.replace("$$" + k + "$$", data[k]);
    });
    return input_str;
}

/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_json = function (input_str, data) {
    Object.keys(data).forEach(function (k) {
        Object.keys(input_str).forEach(function (m) {
            if (k == m) {
                input_str[m] = data[k];
            }
        })
    });

    return input_str;
}

/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_json2 = function (input_str, data) {

    try {

        Object.keys(data).forEach(function (k) {
            var find = "$$" + k + "$$";
            input_str = input_str.split(find).join(data[k]);
        });
        let input = JSON.parse(input_str);
        if (input.hasOwnProperty("tps") && data.hasOwnProperty("tps")) {
            input["tps"][0]["tps"] = data["tps"]
        }


        return input;
    } catch (err) {
        console.log("CATCHED---------------------------------")
        console.log(input_str, err)
        return "";
    }


}


/**************************************************************************************
* Controller     : getstandedvariablesAndflitersMdl
* Parameters     : req,res()
* Description    : Report Sql
***************************************************************************************/

exports.getstandedvariablesAndflitersMdl = function (reportdata, variablesdata, fltrdata, rptParamsData) {
    var input_str = reportdata[0].qry_tx
    if (rptParamsData != 0) {
        for (m = 0; m < rptParamsData.length; m++) {
            if (rptParamsData[m].value != 0) {
                console.log(input_str)
                input_str = input_str.replace("$$" + rptParamsData[m].compare + "$$", rptParamsData[m].value);
                console.log(input_str)
            }
        }
        if (m == rptParamsData.length) {
            for (i = 0; i < fltrdata.length; i++) {
                if (fltrdata[i].dflt_vlue_tx == 0) {
                    input_str = input_str.replace(fltrdata[i].acceptall_dsc, '');
                }
            }
        }
        if (i == fltrdata.length) {
            for (j = 0; j < variablesdata.length; j++) {
                input_str = input_str.replace("$$" + variablesdata[j].type + "$$", variablesdata[j].value);
            }
        }

        if (j == variablesdata.length) {
            for (k = 0; k < reportdata.length; k++) {
                input_str = input_str.replace("$$" + reportdata[k].fltr_varble_tx + "$$", reportdata[k].dflt_vlue_tx);
            }
             
        }
        if(k == reportdata.length){
            input_str = input_str.replace("'CURDATE()'", 'CURDATE()');
            input_str = input_str.replace("'CURDATE()'", 'CURDATE()');
            return input_str;
        }
    }
    else {
        for (i = 0; i < fltrdata.length; i++) {
            if (fltrdata[i].dflt_vlue_tx == 0) {
                input_str = input_str.replace(fltrdata[i].acceptall_dsc, '');
            }
        }
        if (i == fltrdata.length) {
            for (j = 0; j < variablesdata.length; j++) {
                input_str = input_str.replace("$$" + variablesdata[j].type + "$$", variablesdata[j].value);
            }
        }

        if (j == variablesdata.length) {
            for (k = 0; k < reportdata.length; k++) {
                input_str = input_str.replace("$$" + reportdata[k].fltr_varble_tx + "$$", reportdata[k].dflt_vlue_tx);
            }
        }
        if(k == reportdata.length){
            // input_str = input_str.replace("and actvn_ts='CURDATE()'", 'and actvn_ts=CURDATE()');
            input_str = input_str.replace("'CURDATE()'", 'CURDATE()');
            input_str = input_str.replace("'CURDATE()'", 'CURDATE()');
            return input_str;
        }
    }

}





/**************************************************************************************
* Controller     : getDataForAllOption
* Parameters     : req,res()
* Description    : Report Sql
***************************************************************************************/

exports.getDataForAllOption = function (querydata, data, standedvariables) {
    var input_str1 = querydata[0].qry_tx
    for (i = 0; i < data[1].length; i++) {
        for (j = 0; j < querydata.length; j++) {
            if (data[1][i].value == 0) {
                if (data[1][i].type == querydata[j].fltr_varble_tx) {
                    input_str1 = input_str1.replace(querydata[j].acpt_dsc_tx, '');
                }
            }
        }
    }
    if (i == data[1].length) {
        for (k = 0; k < standedvariables.length; k++) {
            input_str1 = input_str1.replace("$$" + standedvariables[k].type + "$$", standedvariables[k].value);
            if (k + 1 == standedvariables.length) {
                return input_str1;
            }
        }

    }

}
/**************************************************************************************
* Controller     : chunkArray
* Description    : Returns Sorted Json
* 24/APR/2019    -Sony Angel - Initial Function
***************************************************************************************/

exports.chunkArray  = function (myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}
/**************************************************************************************
* Controller     : getDataForAllOption

***************************************************************************************/
exports.prcs_tmplte_get_xml = function (input_str, data) {
	console.log("input_str, data",input_str, data);
    Object.keys(data).forEach(function (k) {
		console.log("k",k);
        var replace = "\\$\\$" + k + "\\$\\$";
        var re = new RegExp(replace, "gi");
        input_str = input_str.replace(re, data[k]);
    });
    return input_str;
}


/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_data = function (input_str, data) {
    Object.keys(data).forEach(function (k) {
        Object.keys(input_str).forEach(function (m) {
            if (k == m) {
                console.log(input_str[m])
                console.log(data[k])
                input_str[m] = data[k];
            }
        })
    });
    return input_str;
}


/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_json_3 = function (tmpltJson, valJson) {
    //console.log("&&&&&&&&&&&&&&&&jsonutilssssssssssssss&&&&&&&&&&&&&&&&&&&");
    // console.log(tmpltJson);
    // console.log(valJson);
    let filledJson;
    Object.keys(valJson).forEach(function (v) {
        filledJson = lookupKeyAndGetJson(tmpltJson, v, valJson[v])
    })
    return filledJson;
}


function lookupKeyAndGetJson(obj, k, val) {
    if (typeof (obj) != 'object') {
        return null;
    }
    var result = null;
    if (obj.hasOwnProperty(k)) {
        obj[k] = val;
    } else {
        for (var o in obj) {
            result = lookupKeyAndGetJson(obj[o], k);
            if (result == null) continue;
            else break;
        }
    }
    console.log()
    return obj;

}

/**************************************************************************************
* Controller     : prcs_tmplte
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_json_4 = function (tmpltJson, valJson) {
    function findProp(obj, key, out) {
        var i,
            proto = Object.prototype,
            ts = proto.toString,
            hasOwn = proto.hasOwnProperty.bind(obj);
        if ('[object Array]' !== ts.call(out)) out = [];
        for (i in obj) {
            if (hasOwn(i)) {
                if (i === key) {
                    out.push(obj[i]);
                } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                    findProp(obj[i], key, out);
                }
            }
        }
        return out;
    }

    function mapKeysToValue(obj, valJson) {
        for (const prop in obj) {
            const value = obj[prop];
            if (typeof value === 'object') {
                mapKeysToValue(value, valJson);
            }
            else {
                let fltr_json = findProp(valJson, prop);
                fltr_json.filter((k) => {
                    obj[prop] = k;
                })
            }
        }
        console.log("&&&&&&&&&&&&&tmpltJson&&&&&&&&&&&&&&&&&&&&");
        return obj;
    }
    return mapKeysToValue(tmpltJson, valJson)
}

/**************************************************************************************
* Controller     : prcs_tmplte_get_json_for_package
* Parameters     : req,res()
* Description    : Precise Query
***************************************************************************************/

exports.prcs_tmplte_get_json_for_package = function (input_str, data) {

    try {

        Object.keys(data).forEach(function (k) {
            var find = "$$" + k + "$$";
            input_str = input_str.split(find).join(data[k]);
        });
        let input = JSON.parse(input_str);
        if (input.hasOwnProperty("tps") && data.hasOwnProperty("tps")) {
            input["tps"][0]["tps"] = data["tps"]
        }
        if (data.hasOwnProperty("franchiseCodes")) {
            if (input.hasOwnProperty("franchiseCodes") && data.hasOwnProperty("franchiseCodes")) {
                input["franchiseCodes"] = data["franchiseCodes"]
            } else {
                input["franchiseCodes"] = []
            }
        }else{
            input["franchiseCodes"] = []
        }
        if (data.hasOwnProperty("franchisecds")) {
            if (input.hasOwnProperty("franchiseCodes") && data.hasOwnProperty("franchisecds")) {
                input["franchiseCodes"] = data["franchisecds"]
            } else {
                input["franchiseCodes"] = []
            }
        }
        
        if (data.hasOwnProperty("subscriberCodes")) {
            if (input.hasOwnProperty("subscriberCodes") && data.hasOwnProperty("subscriberCodes")) {
                input["subscriberCodes"] = data["subscriberCodes"]
            }
        } else if (!data.hasOwnProperty("subscribercode")) {
            input["subscriberCodes"] = []
        }
        if (data.hasOwnProperty("servicepacks")) {
            if (input.hasOwnProperty("servicepacks") && data.hasOwnProperty("servicepacks")) {
                input["servicepacks"] = data["servicepacks"]
            }
        }

        // if(input.hasOwnProperty("subscriberCodes") && data.hasOwnProperty("subscriberCodes")){
        //     input["subscriberCodes"] = data["subscriberCodes"]
        //   }

        return input;
    } catch (err) {
        console.log("CATCHED---------------------------------")
        console.log(input_str, err)
        return "";
    }


}