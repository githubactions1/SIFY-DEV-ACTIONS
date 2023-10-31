var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
moment = require('moment');

var dbutil = require(appRoot + '/utils/db.utils');


/**************************************************************************************
* Controller     : getregionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getregionMdl = function(data){
	var fnm = 'getregionMdl';
	var QRY_TO_EXEC = `select zone_id,zone_name from zones where zone_status=1;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getcircleMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getcircleMdl = function(data){
	var fnm = 'getcircleMdl';
	var QRY_TO_EXEC = `select state_id,state_name,z.zone_id,z.zone_name from states as s
 join zones as z on z.zone_id=s.zone_id where s.zone_id in (${data.zone_id}) and state_status=1;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getClusterMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getClusterMdl = function(data){
	var fnm = 'getClusterMdl';
	var QRY_TO_EXEC = ` select cluster_name,cluster_id,s.state_name,s.state_id,z.zone_id,z.zone_name from clusters as c
      join states as s on s.state_id=c.state_id 
     join zones as z on z.zone_id=s.zone_id  where c.zone_id in(${data.zone_id}) and c.state_id in (${data.state_id}) and c.cluster_status=1;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getEmploymentTypeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getEmploymentTypeMdl = function(data){
	var fnm = 'getEmploymentTypeMdl';
	
	var QRY_TO_EXEC = `select sub_cat_id,sub_cat_name as 'member_type_name' from sub_categories where cat_id=3 and sub_cat_status=1;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getVendorMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getVendorMdl = function(data){
	var fnm = 'getVendorMdl';
	var QRY_TO_EXEC = `select vendor_name,vendor_id,vendor_code,s.state_name,s.state_id,z.zone_id,z.zone_name,c.cluster_name,c.cluster_id from vendors as v
   join clusters as c on find_in_set(c.cluster_id,v.cluster_ids)
   join states as s on s.state_id=c.state_id
   join zones as z on z.zone_id=s.zone_id  where cluster_ids in (${data.cluster_ids});`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : getEmployeeDtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.getEmployeeDtlsMdl = function(data){
	var fnm = 'getEmployeeDtlsMdl';
	var QRY_TO_EXEC = `select e.*,z.zone_name,s.state_name,z.zone_id,s.state_id,sc.sub_cat_name as 'member_type_name' from employees as e
	                  left join zones as z on z.zone_id=e.zone_id
                      left join states as s on s.state_id=e.state 
					  left join sub_categories as sc on sub_cat_id=e.member_type
	                    where cluster_id in (${data.cluster_id}) and member_type in (${data.member_type});`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}