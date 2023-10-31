var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : getemployeeSteZneMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.getemployeeSteZneMdl = function (data, user, callback) {
    var fnm = 'getemployeeSteZneMdl';

	var QRY_TO_EXEC = `select group_concat(distinct(state_id)) as state_id,group_concat(distinct(zone_id)) as zone_id from clusters where cluster_id in (${data.cluster_id})`;
    
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
exports.insertemployeeMdl = function (data, user, zoneStateData, randomPassword, callback) {
    var fnm = 'insertemployeeMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into employees( emp_username, emp_password, emp_name, emp_dept, emp_designation, emp_reporting,city_type,total_leaves,emp_latitude,emp_longitude,member_type,skill_type, vendor_name, shift_type_id, comp_cat_id, emp_mobile, emp_email, emp_code, emp_role, address, address2, city, state, zone_id, cluster_id, pincode, date_created, notes,emp_status,team_type)
	values ('${data.emp_username}',MD5('${randomPassword}'),'${data.emp_name}','${data.emp_dept}','${data.emp_designation}','${data.emp_reporting}','${data.city_type}',${data.total_leaves},'${data.emp_latitude}','${data.emp_longitude}',${data.member_type},'${data.skill_type}','${data.vendor_name}','${data.shift_type_id}','${data.comp_cat_id}','${data.emp_mobile}','${data.emp_email}','${data.emp_code}','${data.emp_role}','${data.address}','${data.address2}','${data.city}','${zoneStateData.state_id}',
	'${zoneStateData.zone_id}','${data.cluster_id}','${data.pincode}',current_timestamp(),'${data.notes}',${data.emp_status},${data.team_type})`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getemployeeMdl = function (data, user, callback) {
    var fnm = 'getemployeeMdl';

     console.log("success", data)
	 
	 let qry= ``;
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

}

	var QRY_TO_EXEC = `select e.*,v.vendor_name,z.zone_name,sc.sub_cat_name as 'member_type_name',e.lock_user,sc1.sub_cat_name as 'team_type',s.state_name,c.cluster_name,r.role_name from employees as e
left join zones as z on z.zone_id=e.zone_id 
left join states as s on s.state_id=e.state
left join clusters as c on c.cluster_id=e.cluster_id 
left join roles as r on r.role_id=e.emp_role 
left join vendors as v on v.vendor_id=e.vendor_name 
left join sub_categories as sc on sub_cat_id=e.member_type
left join sub_categories as sc1 on sc1.sub_cat_id=e.team_type
left join shifts as sf on sf.shift_id=e.shift_type_id
 where emp_status not in (2) and e.emp_designation not in (284,234) ${qry} order by e.emp_id desc`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
    sqldb.MySQLConPool.connection.release()
    
}
/**************************************************************************************
* Controller     : getbyemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getbyemployeeMdl = function (id, user, callback) {
    var fnm = 'getbyemployeeMdl';

    

	var QRY_TO_EXEC = `select e.*,z.zone_name,s.state_name,c.cluster_name from employees as e
left join zones as z on z.zone_id=e.zone_id 
left join states as s on s.state_id=e.state
left join clusters as c on c.cluster_id=e.cluster_id  where emp_id =${id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updateemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.updateemployeeMdl = function (data, user, callback) {
    var fnm = 'updateemployeeMdl';

	 //var emppwd = ``;
	 var empusername = ``;
	 
    // if (data.emppwd != '' && data.emppwd != null && data.emppwd != undefined) {
        // emppwd = ` , emp_password=MD5('${data.emppwd}')`;
    // }
	if (data.empusername != '' && data.empusername != null && data.empusername != undefined) {
        empusername = ` , emp_username='${data.empusername}'`;
    }

	var QRY_TO_EXEC = `update employees set updated_on= current_timestamp(),emp_name='${data.emp_name}' ${empusername} ,emp_dept='${data.emp_dept}',emp_designation='${data.emp_designation}',emp_reporting='${data.emp_reporting}',member_type=${data.member_type},skill_type='${data.skill_type}',vendor_name='${data.vendor_name}',shift_type_id='${data.shift_type_id}',comp_cat_id='${data.comp_cat_id}',emp_mobile='${data.emp_mobile}',emp_email='${data.emp_email}',emp_code='${data.emp_code}',emp_role='${data.emp_role}',address='${data.address}',address2='${data.address2}',city='${data.city}',state='${data.state}',
	zone_id='${data.zone_id}',cluster_id='${data.cluster_id}',pincode='${data.pincode}',notes='${data.notes}',city_type='${data.city_type}',total_leaves=${data.total_leaves},emp_latitude='${data.emp_latitude}',emp_longitude='${data.emp_longitude}',team_type='${data.team_type}' where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertedemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.insertedemployeeMdl = function (data,imgpath, user, callback) {
    var fnm = 'insertedemployeeMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into employees(emp_username, emp_password, emp_first_name, emp_last_name, emp_dept, emp_designation, emp_reporting, emp_mobile, emp_email, emp_code, emp_role, emp_gender, work_location, emp_work_sub_location, company_name, emp_dob, emp_doj, h_no, street, landmark, city, state, zone_id, cluster_id, pincode, date_created, notes, emp_image, emp_status, emp_show)
	values ('${data.emp_username}',MD5('${data.emp_password}'),'${data.emp_first_name}','${data.emp_last_name}','${data.emp_dept}','${data.emp_designation}','${data.emp_reporting}',${data.emp_mobile},'${data.emp_email}','${data.emp_code}','${data.emp_role}','${data.emp_gender}','${data.work_location}','${data.emp_work_sub_location}','${data.company_name}','${data.emp_dob}','${data.emp_doj}','${data.h_no}','${data.street}','${data.landmark}',
	'${data.city}','${data.state}',${data.zone_id},${data.cluster_id},${data.pincode},current_timestamp(),'${data.notes}','${imgpath}',${data.emp_status},${data.emp_show})`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deleteemployestatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.deleteemployestatusMdl = function (data, user, callback) {
    var fnm = 'deleteemployestatusMdl';

    

	var QRY_TO_EXEC = `update employees set emp_status=${data.emp_status} where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : categorieslistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.categorieslistMdl = function (data, user, callback) {
    var fnm = 'categorieslistMdl';

    

	var QRY_TO_EXEC = `select  * from  categories `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
    
}
/**************************************************************************************
* Controller     : categorieslistbyidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.categorieslistbyidMdl = function (id, user, callback) {
    var fnm = 'categorieslistbyidMdl';

    

	var QRY_TO_EXEC = `select  * from  categories where cat_id=${id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : subcategorieslistbyidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.subcategorieslistbyidMdl = function (id, user, callback) {
    var fnm = 'subcategorieslistbyidMdl';

    

	var QRY_TO_EXEC = `select  * from  sub_categories where sub_cat_id=${id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : subcategorieslistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.subcategorieslistMdl = function (data, user, callback) {
    var fnm = 'subcategorieslistMdl';

    

	var QRY_TO_EXEC = `select  * from  sub_categories `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : employeenameslistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.employeenameslistMdl = function (data, user, callback) {
    var fnm = 'employeenameslistMdl';

    

	var QRY_TO_EXEC = `select emp_name,emp_mobile,emp_email from  employees `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getengnrandriggerlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getengnrandriggerlistMdl = function (data, user, callback) {
    var fnm = 'getengnrandriggerlistMdl';
    let qry = ``
   
    if(user.emp_designation == 234){
         let ids = user.cluster_id.split(',')
            if(ids.length == 1){
                qry = `  find_in_set(${ids[0]}, e.cluster_id)`
            }else{
                ids.forEach((id, i)=> {
                    qry = qry + `find_in_set(${id}, e.cluster_id)`
                    if(i <= (ids.length - 2)) qry = qry + ` or `
                })
            }
            qry = `and ` + `(` + qry + `)` 
    }

     console.log("success", data)

	var QRY_TO_EXEC = `
select e.*,z.zone_name,s.state_name,r.role_name,sc.sub_cat_name as 'team_type',e.vendor_name as 'vendor_id',v.vendor_name ,
(select group_concat(cluster_name)  from clusters as cluster_name where FIND_IN_SET(cluster_id,e.cluster_id) )as cluster_name
 from employees as e
left join zones as z on z.zone_id=e.zone_id 
left join states as s on s.state_id=e.state
left join clusters as c on c.cluster_id=e.cluster_id
left join roles as r on r.role_id=e.emp_role
left join sub_categories as sc on sc.sub_cat_id=e.team_type
left join vendors as v on v.vendor_id=e.vendor_name
where emp_status not in (2) and emp_role =4 ${qry}
`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : addmanagersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.addmanagersMdl = function (data, user, randomManagerPassword, callback) {
    var fnm = 'addmanagersMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into employees(emp_username, emp_password, emp_dept, emp_designation, emp_mobile, emp_email, emp_code,cluster_id,emp_reporting,total_leaves,emp_role,emp_name,team_type,vendor_name)
	values ('${data.emp_username}',MD5('${randomManagerPassword}'),'${data.emp_dept}','${data.emp_designation}',${data.emp_mobile},'${data.emp_email}','${data.emp_code}','${data.cluster_id}',${data.emp_reporting},${data.total_leaves},${data.emp_role},'${data.emp_name}',${data.team_type},${data.vendor_name}) `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : editmanagersdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.editmanagersdataMdl = function (data, user, callback) {
	var fnm = 'editmanagersdataMdl';
     //var emppwd = ``;
	 var empusername = ``;
	 
    // if (data.emppwd != '' && data.emppwd != null && data.emppwd != undefined) {
        // emppwd = ` , emp_password=MD5('${data.emppwd}')`;
    // }
	if (data.empusername != '' && data.empusername != null && data.empusername != undefined) {
        empusername = ` , emp_username='${data.empusername}'`;
    }

	var QRY_TO_EXEC = `update employees set updated_on= current_timestamp(),emp_name='${data.emp_name}' ${empusername},emp_dept='${data.emp_dept}',emp_designation='${data.emp_designation}',emp_reporting='${data.emp_reporting}',emp_mobile='${data.emp_mobile}',emp_email='${data.emp_email}',emp_code='${data.emp_code}',emp_role='${data.emp_role}',cluster_id='${data.cluster_id}',total_leaves=${data.total_leaves},team_type=${data.team_type},vendor_name=${data.vendor_name} where emp_id=${data.emp_id}`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : clustersbymembersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.clustersbymembersMdl = function (data, user, callback) {
    var fnm = 'clustersbymembersMdl';

     console.log("success", data)
if(data.length == 1){
        var QRY_TO_EXEC = `select e.emp_username,e.emp_id from employees as e where e.cluster_id != 0 AND  FIND_IN_SET(${data},cluster_id);`;

    }else{
        data = data.split(',')
        var QRY_TO_EXEC = `select e.emp_username,e.emp_id from employees as e where e.cluster_id != 0 AND  FIND_IN_SET(${data[0]},cluster_id)`
        let datafilter = function(index){
            QRY_TO_EXEC = QRY_TO_EXEC + `or FIND_IN_SET(${data[index]},cluster_id)`
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
* Controller     : getappshorturl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*  07-06-2023  -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getappshorturl = function (id, user, callback) {
    var fnm = 'getappshorturl';

	var QRY_TO_EXEC = `select app_short_url,web_short_url from  business_information`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getwebshorturl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*  07-06-2023  -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getwebshorturl = function (id, user, callback) {
    var fnm = 'getwebshorturl';

	var QRY_TO_EXEC = `select web_short_url from  business_information`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : resetemplyeedeviceIdMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*  07/07/2023  -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.resetemplyeedeviceIdMdl = function (data, user, callback) {
    var fnm = 'resetemplyeedeviceIdMdl';

	var QRY_TO_EXEC = `update employees set device_id=null where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : chckclstremployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckclstremployeeMdl = function (data, user, callback) {
    var fnm = 'chckclstremployeeMdl';

	var QRY_TO_EXEC = `select group_concat(cluster_id) as cluster_id from clusters where cluster_name in (${data.cluster_id})`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : chckVndremployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckVndremployeeMdl = function (data, user, callback) {
    var fnm = 'chckVndremployeeMdl';

	var QRY_TO_EXEC = `select group_concat(vendor_id) as vendor_id from vendors where vendor_name in (${data.vendor_name})`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : chckTaskTypeemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckTaskTypeemployeeMdl = function (data, user, callback) {
    var fnm = 'chckTaskTypeemployeeMdl';

	var QRY_TO_EXEC = `select group_concat(comp_cat_id) as comp_cat_id from complaint_categories where comp_cat_name in (${data.skill_type})`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : chckshiftemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckshiftemployeeMdl = function (data, user, callback) {
    var fnm = 'chckshiftemployeeMdl';

	var QRY_TO_EXEC = `select shift_id from shifts where shift_name like '%${data.shift_type_id}%' limit 1`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : insertBulkemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.insertBulkemployeeMdl = function (data, user, zoneStateData, randomPassword, callback) {
    var fnm = 'insertBulkemployeeMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into employees( emp_username, emp_password, emp_name, emp_dept, emp_designation, emp_reporting,city_type,total_leaves,emp_latitude,emp_longitude,member_type,skill_type, vendor_name, shift_type_id, comp_cat_id, emp_mobile, emp_email, emp_code, emp_role, address, address2, state, zone_id, cluster_id, date_created, emp_status)
	values ('${data.emp_username}',MD5('${randomPassword}'),'${data.emp_name}','1','${data.emp_designation}','1','${data.city_type}',${data.total_leaves},'${data.emp_latitude}','${data.emp_longitude}',${data.member_type},'269,270','${data.vendor_name}','${data.shift_type_id}','${data.skill_type}','${data.emp_mobile}','${data.emp_email}','${data.emp_code}','${data.emp_role}','${data.address}','${data.address2}','${zoneStateData.state_id}',
	'${zoneStateData.zone_id}','${data.cluster_id}',current_timestamp(),1)`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : chckemployeeDtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckemployeeDtlsMdl = function (data, user, callback) {
    var fnm = 'chckemployeeDtlsMdl';

	var QRY_TO_EXEC = `select * from employees where emp_username='${data.emp_username}' `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : teamsetupgetemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.employeereinviteMdl = function (data, user, callback) {
    var fnm = 'employeereinviteMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from employees where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updaterandompwdemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updaterandompwdemployeeMdl = function (data, user, randomPassword, callback) {
    var fnm = 'updaterandompwdemployeeMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update employees set emp_password=MD5('${randomPassword}') where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : chckeditemployeeDtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.chckeditemployeeDtlsMdl = function (data, user, callback) {
    var fnm = 'chckeditemployeeDtlsMdl';
	console.log("data",data)
	var QRY_TO_EXEC = `select emp_username,emp_mobile from employees where emp_username='${data.empusername}' and emp_id != ${data.emp_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
 * Controller     : createnewflashnewsMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  Shaik  - Initial Function
 *
 ***************************************************************************************/
exports.createnewflashnewsMdl = function (data, user) {
    var fnm = 'createnewflashnewsMdl';
    let qry = ``
    if(data.news_name){
        qry =  `,news_name = '${data.news_name}'`
    }
    if(data.news_content){
        qry = qry + `,news_content = '${data.news_content}'`
    }
    if(data.news_start_date ){
        qry = qry + `,news_start_date = '${data.news_start_date}'`
    }
    if(data.news_end_date ){
        qry = qry + `,news_end_date = '${data.news_end_date}'`
    }
    if(data.attKycChres){
        qry = qry + `,news_image = '${data.attKycChres}'`
    }
	if(data.news_image_size){
        qry = qry + `,news_image_size = '${data.news_image_size}'`
    }
  
    var QRY_TO_EXEC = `insert into flash_news_scrolling set i_ts = current_timestamp(), news_status = 1, emp_id = ${user.emp_id} ${qry} ;`;
  
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
  }


  /**************************************************************************************
 * Controller     : updateflashnewsMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  Shaik  - Initial Function
 *
 ***************************************************************************************/
exports.updateflashnewsMdl = function (data, user) {
    var fnm = 'updateflashnewsMdl';
    let qry = ``
    if(data.news_name){
        qry =  `,news_name = '${data.news_name}'`
    }
    if(data.news_content){
        qry = qry + `,news_content = '${data.news_content}'`
    }
    if(data.news_start_date){
        qry = qry + `,news_start_date = '${data.news_start_date}'`
    }
    if(data.news_end_date){
        qry = qry + `,news_end_date = '${data.news_end_date}'`
    }
    if(data.attKycChres){
        qry = qry + `,news_image = '${data.attKycChres}'`
    }
	if(data.news_image_size){
        qry = qry + `,news_image_size = '${data.news_image_size}'`
    }
  
    var QRY_TO_EXEC = `update flash_news_scrolling set u_ts = current_timestamp(), emp_id = ${user.emp_id} ${qry} where news_id = ${data.news_id};`;
  
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
  }

/**************************************************************************************
 * Controller     : deactivateflashnewsMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  Shaik  - Initial Function
 *
 ***************************************************************************************/
exports.deactivateflashnewsMdl = function (data, user) {
    var fnm = 'deactivateflashnewsMdl';
  
    var QRY_TO_EXEC = `update flash_news_scrolling set u_ts = current_timestamp(), news_status = ${data.news_status} where news_id = ${data.news_id} ;`;
  
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
  }

/**************************************************************************************
 * Controller     : getflashnewsbyidMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  Shaik  - Initial Function
 *
 ***************************************************************************************/
exports.getflashnewsbyidMdl = function (news_id, user) {
    var fnm = 'getflashnewsbyidMdl';
  
    var QRY_TO_EXEC = `select * from flash_news_scrolling where news_id = ${news_id} ;`;
  
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
  }



/**************************************************************************************
 * Controller     : getflashnewsMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  Shaik  - Initial Function
 *
 ***************************************************************************************/
exports.getflashnewsMdl = function (data, user) {
    var fnm = 'getflashnewsMdl';

   if (data.type == 0){
        var QRY_TO_EXEC = `select * from flash_news_scrolling order by news_id desc;`;
   }else{
        var QRY_TO_EXEC = `select * from flash_news_scrolling 
        where curdate() between DATE(news_start_date) and DATE(news_end_date) and news_status = 1 order by news_id desc;`
        // var QRY_TO_EXEC = `select * from flash_news_scrolling 
        // where (DATE(news_start_date) = '${data.news_date}'  or 
        // DATE(news_end_date) = '${data.news_date}') and news_status = 1`
   }
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
 /**************************************************************************************
* Controller     : getbyemployeeroleMdl
* Parameters     : req,res()
* Description    : getbyemployeerole
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getbyemployeeroleMdl = function (id, user, callback) {
    var fnm = 'getbyemployeeroleMdl';

    

	var QRY_TO_EXEC = `select  * from  roles where role_type=${id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
  /**************************************************************************************
* Controller     : imge api
* Parameters     : req,res()
* Description    : getbyemployeerole
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getbyemployeeimageprofileMdl = function (data, user, callback) {
    var fnm = 'getbyemployeeimageprofileMdl';

    

	var QRY_TO_EXEC = `update employees set image_url='${data.image_url}' where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
 * Controller     : managerlockemployestatusMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  rajkumar  - Initial Function
 *
 ***************************************************************************************/

exports.managerlockemployestatusMdl = function (data, user, callback) {
    var fnm = 'managerlockemployestatusMdl';

	var QRY_TO_EXEC = `update employees set lock_user=${data.lock_user} where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
 * Controller     : empolyetokenupdateMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 25/08/2023   -  rajkumar  - Initial Function
 *
 ***************************************************************************************/
exports.empolyetokenupdateMdl = function (data, user, callback) {
    var fnm = 'empolyetokenupdateMdl';

	var QRY_TO_EXEC = `update employee_tokens set token_status=0 where emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}