var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : insertcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
 -  durga  - Initial Function
*
***************************************************************************************/
exports.insertcategoriesMdl = function (data, user, callback) {
    var fnm = 'insertcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into complaint_categories ( main_cat_id, comp_cat_name, service_time, action_type, date_created, comp_status) values (${data.main_cat_id},'${data.comp_cat_name}',${data.service_time},'${data.action_type}',current_timestamp(),1) `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.editcomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'editcomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update complaint_categories set last_updated = current_timestamp(),comp_cat_name = '${data.comp_cat_name}',main_cat_id=${data.main_cat_id},service_time=${data.service_time},action_type='${data.action_type}' where comp_cat_id = ${data.comp_cat_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletecomplaintcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.deletecomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'deletecomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update complaint_categories set comp_status=0 where comp_cat_id = ${data.comp_cat_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletecomplaintcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.getcomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'getcomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select cc.comp_cat_id,cc.main_cat_id,cc.comp_cat_name,cc.action_type,cc.service_time,date_format(cc.date_created,'%Y-%m-%d %h:%m:%s') as date_created,cc.comp_status,date_format(cc.last_updated,'%Y-%m-%d %h:%m:%s') as last_updated,sc.sub_cat_name from  complaint_categories as cc
                       join sub_categories as sc on sc.sub_cat_id=cc.main_cat_id `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
