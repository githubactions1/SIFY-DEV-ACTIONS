var appRoot = '/home/centos/glits/code/nodejs/sifi'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : insertclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchinMdl = function (data, user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` insert into attendence (emp_id,username,punch_in_time,punch_status) values(${data.emp_id},'${data.username}',current_timestamp(),1)`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}