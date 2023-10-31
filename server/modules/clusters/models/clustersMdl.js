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
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.insertclustersMdl = function (data, user, callback) {
    var fnm = 'insertclustersMdl';

     console.log("success", data)

	var QRY_TO_EXEC = ` insert into clusters ( state_id, zone_id, cluster_name, cluster_status, cluster_created_date_time, latitude, longitude, address, pincodes, min_task_per_emp) 
	values(${data.state_id},${data.zone_id},'${data.cluster_name}',${data.cluster_status},current_timestamp(),'${data.latitude}','${data.longitude}','${data.address}','${data.pincodes}',${data.min_task_per_emp})`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getclustersMdl = function (data, user, callback) {
    var fnm = 'getclustersMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select c.*,s.state_name,z.zone_name from clusters as c
join states as s on s.state_id=c.state_id
join zones as z on z.zone_id=c.zone_id order by cluster_id desc`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updateclustersMdl = function (data, user, callback) {
    var fnm = 'updateclustersMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update clusters set state_id=${data.state_id},zone_id=${data.zone_id},cluster_name='${data.cluster_name}',cluster_status=${data.cluster_status},latitude='${data.latitude}',longitude='${data.longitude}',address='${data.address}',pincodes='${data.pincodes}',min_task_per_emp=${data.min_task_per_emp} where cluster_id=${data.cluster_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getclustersbyidMdl = function (id, user, callback) {
    var fnm = 'getclustersbyidMdl';

     

	var QRY_TO_EXEC = ` select * from clusters where cluster_id=${id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deleteclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.deleteclustersMdl = function (data, user, callback) {
    var fnm = 'deleteclustersMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update clusters set cluster_status=${data.cluster_status} where cluster_id=${data.cluster_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deleteclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getclustersbystateidandzoneidMdl = function (data, user, callback) {
    var fnm = 'getclustersbystateidandzoneidMdl';

    // console.log("success", data)

	var QRY_TO_EXEC = `select * from clusters where state_id = ${data.state_id} and zone_id = ${data.zone_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getvenderbyclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 27/04/2023   -  shaik  - Initial Function
*
***************************************************************************************/
// frontend has to send some value otherwise it will throw an error(informed frontend about this)
exports.getvenderbyclustersMdl = function (data, user, callback) {
    var fnm = 'getvenderbyclustersMdl';

    if(data.length == 1){
        var QRY_TO_EXEC = `SELECT * FROM vendors where FIND_IN_SET(${data},cluster_ids);`;

    }else if(data.length > 1){
        data = data.split(',')
        var QRY_TO_EXEC = `select * from vendors where FIND_IN_SET(${data[0]},cluster_ids)`
         let datafilter = function(index){
            QRY_TO_EXEC = QRY_TO_EXEC + `or FIND_IN_SET(${data[index]},cluster_ids)`
            if(index == data.length -1){
                console.log("ompleted")
            } else {
                datafilter(index + 1)
            }
        }
        datafilter(0)
    }

    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : getclustersbymanagerMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  shaik  - Initial Function
*
***************************************************************************************/
exports.getclustersbymanagerMdl = function (data, user, callback) {
    var fnm = 'getclustersbymanagerMdl';
    let qry = ``
    console.log("success", data)

    if(user.emp_designation == 234){
        qry = `where c.cluster_id in (${user.cluster_id})`
    }

	var QRY_TO_EXEC = `select c.*,s.state_name,z.zone_name from clusters as c
    join states as s on s.state_id=c.state_id
    join zones as z on z.zone_id=c.zone_id ${qry} order by cluster_id desc`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}