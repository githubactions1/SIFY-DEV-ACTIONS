var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var FCM = require('fcm-node');

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.getcircuitdetailsbyuserstatusMdl = function (data, user, callback) {
    var fnm = 'getcircuitdetailsbyuserstatusMdl';
   
   var QRY_TO_EXEC = ` select * from circuits where user_status = ${data.user_status}; `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}