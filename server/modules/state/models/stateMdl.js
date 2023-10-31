var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.insertstateMdl = function (data, user, callback) {
    var fnm = 'insertstateMdl';

    var QRY_TO_EXEC = `insert into states set state_created_date_time = CURRENT_TIMESTAMP(),state_status=1,
    zone_id = ${data.zone_id} ,state_name= '${data.state_name}';`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getliststateMdl = function (data, user, callback) {
    var fnm = 'getliststateMdl';
    let qry = ``

    if(data.status === 1){
        qry = `where state_status = 1;`;
    }
    if(data.status === 0){
        qry = ``;
    }
    var QRY_TO_EXEC = `SELECT s.*, z.zone_name FROM states as s left join zones as z on s.zone_id = z.zone_id ${qry};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getbyidstateMdl = function (data, user, callback) {
    var fnm = 'getbyidstateMdl';

	var QRY_TO_EXEC = `select * from states where state_id=${data};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.updatestateMdl = function (data, user, callback) {
    let qry = ``

    if(data.zone_id){
        qry = ` ,zone_id = ${data.zone_id}`
    }
    if(data.state_name){
        qry = qry + `,state_name= '${data.state_name}'`
    }
    
    var fnm = 'updatestateMdl';

	var QRY_TO_EXEC = `update states set state_update_date_time = CURRENT_TIMESTAMP() ${qry} where state_id=${data.state_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
// exports.updatestateMdl = function (data, user, callback) {
//     let qry = ``
//     let count = 0
//     if(data.zone_id){
//         qry = ` zone_id = ${data.zone_id},`
//         count = 1
//     }
//     if(data.state_name && count === 1){
//         qry = qry + `state_name= '${data.state_name}',`
//     }
//     if(data.state_name && count === 0){
//         qry = qry + `state_name= '${data.state_name}',`
//     }
    
//     var fnm = 'updatestateMdl';

// 	var QRY_TO_EXEC = `update states set ${qry} state_update_date_time = CURRENT_TIMESTAMP() where state_id=${data.state_id};`;
    
//     console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
// }

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.deletestateMdl = function (data, user, callback) {

    var fnm = 'deletestateMdl';

	var QRY_TO_EXEC = `update states set state_status=${data.state_status}, state_update_date_time = CURRENT_TIMESTAMP() where state_id=${data.state_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getstatebyzoneMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getstatebyzoneMdl = function (data, user, callback) {
    var fnm = 'getstatebyzoneMdl';

	var QRY_TO_EXEC = `select * from states where zone_id = ${data.zone_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}