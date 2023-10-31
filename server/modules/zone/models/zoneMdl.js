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
exports.insertzoneMdl = function (data, user, callback) {
    var fnm = 'insertzoneMdl';

	var QRY_TO_EXEC = `insert into zones set zone_name= '${data.zone_name}', zone_status=1, 
    zone_date_created = CURRENT_TIMESTAMP()`;
    
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
exports.getzonelistMdl = function (data, user, callback) {
    var fnm = 'getzonelistMdl';
    let qry = ``
    if(data.status === 1){
        qry = `where zone_status = 1;`;
    }
    if(data.status === 0){
        qry = ``;
    }
    var QRY_TO_EXEC = `select * from zones ${qry};`
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
exports.getbyidzoneMdl = function (data, user, callback) {
    var fnm = 'getbyidzoneMdl';

	var QRY_TO_EXEC = `select * from zones where zone_id=${data};`;
    
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
exports.updatezoneMdl = function (data, user, callback) {
    let qry = ``
  
  
    if(data.zone_name){
        qry = `zone_name= '${data.zone_name}', zone_date_updated = CURRENT_TIMESTAMP()`
    }
    
    var fnm = 'updatezoneMdl';

	var QRY_TO_EXEC = `update zones set ${qry} where zone_id=${data.zone_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.deletezoneMdl = function (data, user, callback) {

    var fnm = 'deletezoneMdl';

	var QRY_TO_EXEC = `update zones set zone_status=${data.zone_status}, zone_date_updated = CURRENT_TIMESTAMP() where zone_id=${data.zone_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getzonesstatesandclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getzonesstatesandclustersMdl = function (data, user, callback) {

    var fnm = 'deletgetzonesstatesandclustersMdlezoneMdl';

	var QRY_TO_EXEC = `SELECT z.zone_id,z.zone_status,z.zone_name,s.state_id,s.state_name,c.cluster_id,c.cluster_name
	 FROM zones  as z
    join states as s on z.zone_id = s.zone_id 
    join clusters as c on s.state_id = c.state_id and c.zone_id=z.zone_id order by z.zone_id asc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}