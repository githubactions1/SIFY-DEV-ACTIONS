var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
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
* 28/04/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.insertclustersMdl = function (data, user, callback) {
    var fnm = 'insertclustersMdl';
    let qry = ``
    if(data.vendor_name){
        qry = qry + `, vendor_name = '${data.vendor_name}'`
    }
    if(data.vendor_code || data.vendor_code == 0){
        qry = qry + `, vendor_code = '${data.vendor_code}'`
    }
    if(data.cluster_ids || data.cluster_ids == 0){
        qry = qry + `, cluster_ids = '${data.cluster_ids}'`
    }
    // data format y-m-d
    if(data.start_date){
        qry = qry + `, start_date =  '${data.start_date}'`
    }
    if(data.end_date){
        qry = qry + `, end_date = '${data.end_date}'`
    }

	var QRY_TO_EXEC = ` insert into vendors set i_ts = current_timestamp(), status = 1 ${qry}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getvenderMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/04/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.getvenderMdl = function (data, user, callback) {
    var fnm = 'getvenderMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select v.*, DATE_FORMAT(v.start_date,'%Y-%m-%d') as formated_start_date, DATE_FORMAT(v.end_date,'%Y-%m-%d') as formated_end_date,
    (select group_concat(cluster_name) as cluster_name from clusters where FIND_IN_SET(cluster_id,v.cluster_ids)) as cluster_name,
      (select count(*) as count from vendors  where status = 1) as count from vendors as v
      join clusters as c on c.cluster_id = v.cluster_ids where v.status != 99;`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updatevenderMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/04/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.updatevenderMdl = function (data, user, callback) {
    var fnm = 'updatevenderMdl';

    let qry = ``

    if(data.vendor_name){
        qry = qry + `, vendor_name = '${data.vendor_name}'`
    }
    if(data.vendor_code || data.vendor_code == 0){
        qry = qry + `, vendor_code = '${data.vendor_code}'`
    }
    if(data.cluster_ids || data.cluster_ids == 0){
        qry = qry + `, cluster_ids = '${data.cluster_ids}'`
    }
    // data format y-m-d
    if(data.start_date){
        qry = qry + `, start_date =  '${data.start_date}'`
    }
    if(data.end_date){
        qry = qry + `, end_date = '${data.end_date}'`
    }
    if(data.status || data.status == 0){
        qry = qry + `, status = '${data.status}'`
    }


	var QRY_TO_EXEC = `update vendors set u_ts = current_timestamp() ${qry}  where vendor_id=${data.vendor_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getvenderbyidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/04/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.getvenderbyidMdl = function (id, user, callback) {
    var fnm = 'getvenderbyidMdl';

	var QRY_TO_EXEC = ` select v.*, DATE_FORMAT(start_date,'%Y-%m-%d') as formated_start_date, DATE_FORMAT(end_date,'%Y-%m-%d') as formated_end_date,
    (select group_concat(cluster_name) as cluster_name from clusters where FIND_IN_SET(cluster_id,v.cluster_ids)) as cluster_name
    from vendors as v where v.vendor_id= ${id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletevenderMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28/04/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.deletevenderMdl = function (data, user, callback) {
    var fnm = 'deletevenderMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update vendors set status = 99  where vendor_id=${data.vendor_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
