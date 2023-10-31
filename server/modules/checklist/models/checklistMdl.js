var appRoot = '/home/centos/glits/code/nodejs/SIFY_server/';
var df = require(appRoot + '/utils/dflower.utils'); 
var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');


/**************************************************************************************
* Controller     : getchcklstDtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getchcklstDtlsMdl = function (data, user) { 
	var fnm = "getchcklstDtlsMdl"

    var QRY_TO_EXEC = `select count(*) as count from checklist where checkListName='${data.checkListName}' and checkListSysId ='${data.checkListSysId}'`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}

/**************************************************************************************
* Controller     : updateorInsrtchcklstMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateorInsrtchcklstMdl = function (data, length, user) { 
	var fnm = "updateorInsrtchcklstMdl"
	if(length == 0 ){
		var QRY_TO_EXEC = `insert into checklist (checkListName, checkListSysId, tabs, i_ts, status) values ('${data.checkListName}','${data.checkListSysId}','${JSON.stringify(data.tabs)}',current_timestamp(),1)`
	} else {
		var QRY_TO_EXEC = `update checklist set tabs='${JSON.stringify(data.tabs)}',u_ts=current_timestamp() where checkListName='${data.checkListName}' and checkListSysId ='${data.checkListSysId}'`
	}
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, "hello",user,fnm);
}