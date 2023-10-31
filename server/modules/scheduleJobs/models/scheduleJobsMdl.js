var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : tokenExpiry
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11/09/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.tokenexpiryMdl = function (callback) {
	var fnm = 'tokenexpiryMdl';
	
	var QRY_TO_EXEC = ` update employee_tokens set token_status=0 where date(created_at) < curdate()`;

	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}