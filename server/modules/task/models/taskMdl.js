var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var FCM = require('fcm-node');

var dbutil = require(appRoot + '/utils/db.utils');


/**************************************************************************************
* Controller     : insrtapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtapicalldtlsMdl = function(reqst, data, options, webapp, user){
	var fnm = 'insrtapicalldtlsMdl';
	var emp_id=0;
	if(user){
		if(user.emp_id)
		emp_id = user.emp_id;
	}
	var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t ( web_app, task_id, task_no, service_no, url_tx, url_dta_tx, hdr_tx, crte_usr_id, a_in, i_ts) 
	values (${webapp},'${reqst.task_id}','${data.primaryAssignment}','${data.externalID}','${JSON.stringify(options.url)}','${JSON.stringify(options.body).replace(/'/g, "''")}','${JSON.stringify(options.headers).replace(/'/g, "''")}','${emp_id}',1,current_timestamp());`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : updateapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.updateapicalldtlsMdl = function(reqst, id, data, resp){
	var fnm = 'updateapicalldtlsMdl';
	const statusCode = resp.status !== undefined ? resp.status : resp.statusCode;
	var QRY_TO_EXEC = `update api_rqst_cl_dtl_t set rspne_tx='${JSON.stringify(reqst).replace(/'/g, "''")}',respnse_hdr='${statusCode}' where rest_cl_id=${id};`
	//var QRY_TO_EXEC = `update api_rqst_cl_dtl_t set rspne_tx='${JSON.stringify(reqst).replace(/'/g, "''")}',respnse_hdr='${resp.status}' where rest_cl_id=${id};`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insrtapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtapicalldtlsMdl = function(reqst, data, options, webapp, user){
	var fnm = 'insrtapicalldtlsMdl';
	var emp_id=0;
	if(user){
		if(user.emp_id)
		emp_id = user.emp_id;
	}
	var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t ( web_app, task_id, task_no, service_no, url_tx, url_dta_tx, hdr_tx, crte_usr_id, a_in, i_ts) 
	values (${webapp},'${reqst.task_id}','${data.primaryAssignment}','${data.externalID}','${JSON.stringify(options.url)}','${JSON.stringify(options.data).replace(/'/g, "''")}','${JSON.stringify(options.headers).replace(/'/g, "''")}','${emp_id}',1,current_timestamp());`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getlasttaskMdl = function (data, user, callback) {
    var fnm = 'insertstateMdl'; 
 
	var QRY_TO_EXEC = `SELECT task_no, service_no from tasks ORDER BY task_id DESC LIMIT 1`;
     
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : cmplttaskchckdatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/06/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.cmplttaskchckdatafrservicenowMdl = function (data, primary_flag, user, callback) {
    var fnm = 'cmplttaskchckdatafrservicenowMdl'; 

	/*var QRY_TO_EXEC = `select * from task_hw_used where task_id  in (select task_id from tasks where task_id=${data.task_id} or parent_id=${data.task_id} or parent_id=${data.parent_id})`;*/
	if(primary_flag == 1){
		var QRY_TO_EXEC = `select * from task_hw_used where task_id  in (select task_id from tasks where task_id=${data.task_id} or parent_id=${data.task_id} or parent_id=${data.parent_id})`;
    } else {
		var QRY_TO_EXEC = `select 1 as length;`;
	}
     
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
exports.taskcreationMdl = function (data, task_no, service_no, user, callback) {
    var fnm = 'taskcreationMdl';
    let qry = ``
    if(data.circuit_id){
        qry = `,circuit_id = ${data.circuit_id}`
    }
    if(data.call_attend_by){
        qry = qry + `, call_attend_by = '${data.call_attend_by}'`
    }
    if(data.call_type){
        qry = qry + `, call_type = '${data.call_type}'`
    }
    if(data.task_type){
        qry = qry + `, task_type = ${data.task_type}`
    }
    if(data.task_status || data.task_status===0){
        qry = qry + `, task_status = ${data.task_status}`
    }
    if(data.task_category){
        qry = qry + `, task_category = '${data.task_category}'`
    }
    if(data.task_other_issue){
        qry = qry + `, task_other_issue = '${data.task_other_issue}'`
    }
    if(data.task_owner){
        qry = qry + `, task_owner = '${data.task_owner}'`
    }
    if(data.task_message){
        qry = qry + `, task_message = '${data.task_message}'`
    }
  
    // if(data.eng_reached_time){
    //     qry = qry + `, eng_reached_time = '${data.eng_reached_time}'`
    // }
    // if(data.task_resolved_time){
    //     qry = qry + `, task_resolved_time = '${data.task_resolved_time}'`
    // }

    // if(data.task_closed_time){
    //     qry = qry + `, task_closed_time = '${data.task_closed_time}'`
    // }
    // if(data.task_reopen_time){
    //     qry = qry + `, task_reopen_time = '${data.task_reopen_time}'`
    // }
    // if(data.total_time){
    //     qry = qry + `, total_time = '${data.total_time}'`
    // }
    // if(data.resolve_time){
    //     qry = qry + `, resolve_time = '${data.resolve_time}'`
    // }

    if(data.emp_id){
        qry = qry + `, emp_id = ${data.emp_id}`
    }
    if(data.resolved_through){
        qry = qry + `, resolved_through = '${data.resolved_through}'`
    }
    if(data.issue_found){
        qry = qry + `, issue_found = '${data.issue_found}'`
    }
    if(data.remarks){
        qry = qry + `, remarks = '${data.remarks}'`
    }
    if(data.task_priority){
        qry = qry + `, task_priority = '${data.task_priority}'`
    }
    if(data.emp_department_id){
        qry = qry + `, emp_department_id = ${data.emp_department_id}`
    }
    if(data.task_latitude){
        qry = qry + `, task_latitude = '${data.task_latitude}'`
    }
    if(data.task_longitude){
        qry = qry + `, task_longitude = '${data.task_longitude}'`
    }
    if(task_no){
        qry = qry + `, task_no = '${task_no}'`
    }
    if(service_no){
        qry = qry + `, service_no = '${service_no}'`
    }
    


    
    
	var QRY_TO_EXEC = `insert into tasks set mngr=0,task_created_date = current_timestamp(), task_assigned_date =current_timestamp()  ${qry}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatetaskMdl = function (data, user, distance, callback) {
    var fnm = 'updatetaskMdl';
    let qry = ``
    let qry2 = ``
 
    if(data.circuit_id){
        qry = `,circuit_id = ${data.circuit_id}`
    }
    if(data.call_attend_by){
        qry = qry + `, call_attend_by = '${data.call_attend_by}'`
    }
    if(data.call_type){
        qry = qry + `, call_type = '${data.call_type}'`
    }
    if(data.task_type){
        qry = qry + `, task_type = ${data.task_type}`
    }
    if(data.task_status || data.task_status==0){
        qry = qry + `, task_status = ${data.task_status}`
    }
    // if(data.task_category){
    //     qry = qry + `, task_category = '${data.task_category}'`
    // }
    if(data.task_other_issue){
        qry = qry + `, task_other_issue = '${data.task_other_issue}'`
    }
    if(data.task_owner){
        qry = qry + `, task_owner = '${data.task_owner}'`
    }
    if(data.task_message){
        qry = qry + `, task_message = '${data.task_message}'`
    }
    // if(data.eng_reached_time){
    //     qry = qry + `, eng_reached_time = '${data.eng_reached_time}'`
    // }
    // if(data.task_resolved_time){
    //     qry = qry + `, task_resolved_time = '${data.task_resolved_time}'`
    // }

    if(data.task_status == 226){
        qry = qry + `, task_closed_time = current_timestamp()`
    }
    // if(data.task_reopen_time){
    //     qry = qry + `, task_reopen_time = '${data.task_reopen_time}'`
    // }
    // if(data.total_time){
    //     qry = qry + `, total_time = '${data.total_time}'`
    // }
    // if(data.resolve_time){
    //     qry = qry + `, resolve_time = '${data.resolve_time}'`
    // }
    if(data.emp_id){
        qry = qry + `, emp_id = ${data.emp_id}`
    }
    if(data.resolved_through){
        qry = qry + `, resolved_through = '${data.resolved_through}'`
    }
    if(data.issue_found){
        qry = qry + `, issue_found = '${data.issue_found}'`
    }
    if(data.remarks){
        qry = qry + `, remarks = '${data.remarks}'`
    }
    if(data.task_priority){
        qry = qry + `, task_priority = '${data.task_priority}'`
    }
    if(data.emp_department_id){
        qry = qry + `, emp_department_id = ${data.emp_department_id}`
    }
    if(data.task_latitude){
        qry = qry + `, task_latitude = '${data.task_latitude}'`
    }
    if(data.task_longitude){
        qry = qry + `, task_longitude = '${data.task_longitude}'`
    }
	if(data.task_status == 220){
        qry = qry + `,travel_flg = 1`
    }
	//if(data.task_status == 271){
       // qry = qry + `,primary_flag = 0`
    //}
	// if(data.task_status == 221 || data.task_status == 271 ){
    //     qry = qry + `,travel_distance = ${distance[0].dst}`
    // } 
    // if(data.task_status == 271 && data.primary_flag == 1 ){
    //     qry2 = qry2 + ` update tasks set last_updated_time = current_timestamp(), task_status = 271 where parent_id = ${data.perent_task_id} and primary_flag = 0;`
    // }
    
    
	var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp() ${qry} where task_id = ${data.task_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : updatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 23/06/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updatetask_distance_mobile_Mdl = function (data, user, distance, callback) {
    var fnm = 'updatetaskMdl';
    let qry = ``
    let qry2 = ``;

    if(data.task_status || data.task_status == 0){
        qry = qry + `, task_status = ${data.task_status}`
    }


    if(data.task_status == 226){
        qry = qry + `, task_closed_time = current_timestamp()`
    }

    if(data.task_status == 220){
        qry = qry + `,travel_flg = 1`
    }
   
	if((data.task_status == 221 || data.task_status == 271) && distance != '0'){
        qry = qry + `,travel_distance = ${distance}`
    }
	
	if(data.task_status == 221 ){
        qry = qry + `,end_time=CURRENT_TIMESTAMP(),end_coordinates = '${data.task_log_lat},${data.task_log_long}',end_address = '${JSON.stringify(data.full_addr).replace(/'/g, "''")}'`
    }

	var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp() ${qry} where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id} and task_status not in (408,271,407);`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : gettasklatlongMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getcall_attend_byMdl = function (data, user, callback) {
    var fnm = 'getcall_attend_byMdl';

	var QRY_TO_EXEC = `select call_attend_by from tasks where task_id =  ${data.task_id};`;
 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gettasklatlongMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklatlongat219Mdl = function (data, user, callback) {
    var fnm = 'gettasklatlongat219Mdl';
    let qry = ``
    if(data.task_status == 219 && data.parent_id == "null"){
       qry = qry +  `is null`
    }else if(data.task_status == 219 && data.parent_id != "null"){
        qry = qry + `is not null`
    }
   
    var QRY_TO_EXEC = `SELECT * FROM task_logs as tlogs
    JOIN ( SELECT * FROM tasks WHERE FIND_IN_SET(${data.emp_id},call_attend_by) and task_status = 225 and parent_id ${qry} ORDER BY task_id DESC LIMIT 1) 
    as t ON t.task_id = tlogs.task_id where tlogs.task_status = 225 and date(tlogs.tl_date_created) = curdate();`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gettasklatlongMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklatlongMdl = function (data, user, count, callback) {
    var fnm = 'gettasklatlongMdl';

    var QRY_TO_EXEC = `select task_latitude as task_log_lat, task_longitude as task_log_long from tasks where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id};`
   
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
// exports.gettasklatlongMdl = function (data, user, count, callback) {
//     var fnm = 'gettasklatlongMdl';

//     let qry = ``
//     if(data.task_status == 219){
//         console.log(data.parent_id,"parent_idparent_idparent_idparent_id")
//         if(data.task_status == 219 && data.parent_id == null){
//             qry = qry +  `is null`
//         }else if(data.task_status == 219 && data.parent_id != null){
//             qry = qry + `is not null`
//         }
   
//         var QRY_TO_EXEC = [`SELECT * FROM task_logs as tlogs
//         JOIN ( SELECT * FROM tasks WHERE FIND_IN_SET(${data.emp_id},call_attend_by) and task_status = 226 and parent_id ${qry} ORDER BY task_id DESC LIMIT 1) 
//         as t ON t.task_id = tlogs.task_id where tlogs.task_status = 226 and date_format(tlogs.tl_date_created, '%Y-%m-%d') = curdate();`,
//         `select task_latitude as task_log_lat, task_longitude as task_log_long from tasks where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id};`]
    
//     }else{
//         // let oldtaskstatus = parseInt(data.task_status) - 1
// 	    var QRY_TO_EXEC = [`SELECT * FROM task_logs where task_id = ${data.task_id} and task_status = ${data.oldtaskstatus};`]
//     }

//     console.log(QRY_TO_EXEC);
//     return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
// }

/**************************************************************************************
* Controller     : taskdatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrservicenowMdl = function(data){
	var fnm = 'taskdatafrservicenowMdl';
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.task_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						#(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e2.emp_mobile) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id left join vendors as v on v.vendor_id=e.vendor_name where t2.parent_id=t.parent_id and t2.task_id <> 271) as 'assignedToIDs',
						concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where parent_id = ${data.parent_id} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then t.travel_distance else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${data.task_status}
						join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						left join vendors as v on v.vendor_id=e.vendor_name
						where t.task_id='${data.task_id}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskHardwaredatafrservicenowmngrapprlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 24/05/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.taskHardwaredatafrservicenowmngrapprlMdl = function (data, user, callback) {
    var fnm = 'taskHardwaredatafrservicenowmngrapprlMdl';
	
	var QRY_TO_EXEC = `select hw_partcode as 'partCode',hw_desc as 'partCodeDescription', no_of_units_used as 'partCodeUnits',useage_type as 'type',serial_number as 'serialNumber' from task_hw_used where task_id in (${data.task_id}) or task_id in (${data.perent_task_id});`;
 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : updatetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatetask_mobile_Mdl = function (data, user, distance, callback) {
    var fnm = 'updatetaskMdl';
    let qry = ``
    let qry2 = ``;
	
	console.log("distance",distance)
	console.log("data",data)
 
    // if(data.circuit_id){
    //     qry = `,circuit_id = ${data.circuit_id}`
    // }
    // if(data.call_attend_by){
    //     qry = qry + `, call_attend_by = '${data.call_attend_by}'`
    // }
    // if(data.call_type){
    //     qry = qry + `, call_type = '${data.call_type}'`
    // }
    // if(data.task_type){
    //     qry = qry + `, task_type = ${data.task_type}`
    // }
    if(data.task_status || data.task_status == 0){
        qry = qry + `, task_status = ${data.task_status}`
    }
    // if(data.task_category){
    //     qry = qry + `, task_category = '${data.task_category}'`
    // }
    // if(data.task_other_issue){
    //     qry = qry + `, task_other_issue = '${data.task_other_issue}'`
    // }
    // if(data.task_owner){
    //     qry = qry + `, task_owner = '${data.task_owner}'`
    // }
    // if(data.task_message){
    //     qry = qry + `, task_message = '${data.task_message}'`
    // }
    // if(data.eng_reached_time){
    //     qry = qry + `, eng_reached_time = '${data.eng_reached_time}'`
    // }
    // if(data.task_resolved_time){
    //     qry = qry + `, task_resolved_time = '${data.task_resolved_time}'`
    // }

    if(data.task_status == 226){
        qry = qry + `, task_closed_time = current_timestamp()`
    }
    // if(data.task_reopen_time){
    //     qry = qry + `, task_reopen_time = '${data.task_reopen_time}'`
    // }
    // if(data.total_time){
    //     qry = qry + `, total_time = '${data.total_time}'`
    // }
    // if(data.resolve_time){
    //     qry = qry + `, resolve_time = '${data.resolve_time}'`
    // }
    // if(data.emp_id){
    //     qry = qry + `, emp_id = ${data.emp_id}`
    // }
    // if(data.resolved_through){
    //     qry = qry + `, resolved_through = '${data.resolved_through}'`
    // }
    // if(data.issue_found){
    //     qry = qry + `, issue_found = '${data.issue_found}'`
    // }
    // if(data.remarks){
    //     qry = qry + `, remarks = '${data.remarks}'`
    // }
    // if(data.task_priority){
    //     qry = qry + `, task_priority = '${data.task_priority}'`
    // }
    // if(data.emp_department_id){
    //     qry = qry + `, emp_department_id = ${data.emp_department_id}`
    // }
    // if(data.task_latitude){
    //     qry = qry + `, task_latitude = '${data.task_latitude}'`
    // }
    // if(data.task_longitude){
    //     qry = qry + `, task_longitude = '${data.task_longitude}'`
    // }
    if(data.task_status == 220){
        qry = qry + `,travel_flg = 1`
    }
   
	if(data.task_status == 221 || data.task_status == 271 ){
        qry = qry + `,travel_distance = ${distance[0].dst}`
    }
	
	if(data.task_status == 220 ){
        qry = qry + `,start_coordinates = '${data.task_log_lat},${data.task_log_long}', start_time=CURRENT_TIMESTAMP(), start_address = '${JSON.stringify(data.full_addr).replace(/'/g, "''")}'`
    }
	
    // if(data.task_status == 271 && data.primary_flag == 1 ){
    //     qry2 = qry2 + ` update tasks set last_updated_time = current_timestamp(), task_status = 271 where parent_id = ${data.parent_id} and primary_flag = 0;`
    // }
	var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp() ${qry} where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id} and task_status not in (408,271,407);`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatetasklogsMdl = function (data, user) {
    var fnm = 'gettasklistMdl';
    let qry = ``
    if(data.comments){
        qry = ` ,comments = '${data.comments}'`
    }
    if(data.log_type){
        qry = qry + ` ,log_type = ${data.log_type}`
    }
    if(data.batterypercent){
        qry = qry + ` ,batterypercent = ${data.batterypercent}`
    }
    if(data.task_log_lat){
        qry = qry + ` ,task_log_lat = '${data.task_log_lat}'`
    }
    if(data.task_log_long){
        qry = qry + ` ,task_log_long = '${data.task_log_long}'`
    }
    if(data.task_status){
        qry = qry + ` ,task_status = '${data.task_status}'`
    }
    if(data.call_attend_by){
        qry = qry + ` ,call_attend_by = '${data.call_attend_by}'`
    }

    if(data.distance || data.distance == 0){
        qry = qry + ` ,distance = '${data.distance}'`
    }
    if(data.emp_id || data.emp_id == 0){
        qry = qry + ` ,emp_id = '${data.emp_id}'`
    }

    if(data.full_addr){
        qry = qry + `,full_addr = '${JSON.stringify(data.full_addr).replace(/'/g, "''")}'`
    }
console.log("i'm in model---------------------")
	var QRY_TO_EXEC = `insert into task_logs set task_id = ${data.task_id}, tl_date_created = current_timestamp() ${qry}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatetasklogswhentaskcreatedMdl = function (data, task_id, user, callback) {
    var fnm = 'updatetasklogswhentaskcreatedMdl';
    let qry = ``
    if(data.comments){
        qry = ` ,comments = '${data.remarks}'`
    }
    if(data.log_type){
        qry = qry + ` ,log_type = ${data.log_type}`
    }
    if(data.batterypercent){
        qry = qry + ` ,batterypercent = ${data.batterypercent}`
    }
    if(data.task_log_lat){
        qry = qry + ` ,task_log_lat = '${data.task_log_lat}'`
    }
    if(data.task_log_long){
        qry = qry + ` ,task_log_long = '${data.task_log_long}'`
    }
    if(data.task_status){
        qry = qry + ` ,task_status = '${data.task_status}'`
    }

	var QRY_TO_EXEC = `insert into task_logs set task_id = ${task_id}, tl_date_created = current_timestamp(), emp_id = ${data.emp_id} ${qry}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklistMdl = function (data, user, callback) {
    var fnm = 'gettasklistMdl';

	var QRY_TO_EXEC = `SELECT * from tasks order by task_id desc;`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskbyidMdl = function (id, user, callback) {
    var fnm = 'gettaskbyidMdl';

	var QRY_TO_EXEC = `select t.*,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name, cc.service_time as comp_service_time,  
    e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    c.city as circuit_city, c.pincode as circuit_pincode, c.mobile_no as circuit_mobile_number, cl.cluster_name as cluster_name, 
    (select group_concat(emp_name) as call_attended_name from employees where FIND_IN_SET(emp_id,t.call_attend_by)) as call_attended_name ,
    (select group_concat(t.call_attend_by) as primary_member from  tasks as t where t.parent_id = ${id} and t.primary_flag = 1) as primary_member,
    (select group_concat(t.call_attend_by) as secondary_member from  tasks as t where t.parent_id = ${id} and t.primary_flag = 0 and t.task_status not in (271,408)) as secondary_member
    from tasks as t  
    left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id 
    left join clusters as cl on  c.cluster_id = cl.cluster_id 
    where t.task_id =  ${id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getactivetaskMdl = function (id, user, callback) {
    var fnm = 'getactivetaskMdl';

	var QRY_TO_EXEC = `SELECT * from tasks where task_status = 1 order by task_id desc;`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getsubcategoryMdl = function (data, user, callback) {
    var fnm = 'getsubcategoryMdl';

	// var QRY_TO_EXEC = `select sc.* from sub_categories as sc right join tasks as t on 
    //     t.task_category = sc.sub_cat_id where t.task_category = ${data} and sc.sub_cat_id = ${data} and sub_cat_status = 1 group by sub_cat_id;`;
    var QRY_TO_EXEC = `select * from sub_categories where sub_cat_id = ${data}`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getcallattendedandassignedtaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/

// exports.getcallattendedandtaskownerMdl = function (data, user, callback) {
//     var fnm = 'getcallattendedandtaskownerMdl';
//     let qry = ``
//     if(data.task_category){
//         qry = `and task_category = ${data.task_category} and sub_cat_id = ${data.task_category}`
//     }

// 	var QRY_TO_EXEC = `SELECT t.*, c.user_name, c.first_name, c.company_name, c.city, c.mobile_no, c.email_id, c.pincode, s.sub_cat_name from tasks as t 
//     join circuits as c on t.circuit_id = c.circuit_id 
//     join sub_categories as s on t.task_category = s.sub_cat_id
//     where (t.call_attend_by = ${data.emp_id} or t.task_owner = ${data.emp_id}) ${qry} order by t.task_id desc;`;
    
//     console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
// }
/**************************************************************************************
* Controller     : getcallattendedandassignedtaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/

// exports.getcallattendedandtaskownercountMdl = function (data, user, callback) {
//     var fnm = 'getcallattendedandtaskownercountMdl';
//     let qry = ``
//     if(data.task_category){
//         qry = `and task_category = ${data.task_category} and sub_cat_id = ${data.task_category}`
//     }

// 	var QRY_TO_EXEC = `SELECT count(*) as count from tasks as t 
//     join circuits as c on t.circuit_id = c.circuit_id 
//     join sub_categories as s on t.task_category = s.sub_cat_id
//     where (t.call_attend_by = ${data.emp_id} or t.task_owner = ${data.emp_id}) ${qry} order by t.task_id desc;`;
    
//     console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
// }



/*****************************************************************************
* Function       : cllattndbyMdl
* Description    : 
* Arguments      : callback function
* Change History :
*    - durga - Initial Function
****************************************************fcmmodel************************************************************** */
exports.sendPushNotificationMdl = function (data,task_no, user, text, newtitle, QRY_TO_EXEC, taskkind, noti_log_id, callback) {
	console.log("iam in pushnotify log",text)
    var serverKey = 'AAAAtTJND5Q:APA91bEB_muFMrCJHYzXSB3ulvT_5EWmqKvvWVzyZNRnHoucJqm_rVGQW9-OeI1nHG6_BxYlwA5Q1rXokv9656DYPqXyJ2sJNe1WNOLAdZV112-R9E1d3Le_PijIjuBImNT3qFAhNQtd';
    var fcm = new FCM(serverKey);
//     var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
// join employees as e on e.emp_id=t.emp_id where t.task_no= '${task_no}'`;
    
    console.log(QRY_TO_EXEC, 'qureyfcm')
    sqldb.MySQLConPool.getConnection(function (err, connection) {  // get connection from Connection Pool 
        if (err) { console.log("[ERROR:" + Date() + "]" + err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); console.log(err.fatal); return err; } // Handle Error   
        // Execute the query
        connection.query(QRY_TO_EXEC, function (err, rows) {
            console.log("rows",rows)
            connection.release();
            let fcm_token = rows[0].fcm_tkn;
            var nowdate = new Date();
            //let fcm_token = 'cCbfDH5cQAaWOEpPLTeYeQ:APA91bFJs-NPpeoPHRKWMlhfztTgEtC1zxyX8HWg68Tu_CVwcMRsKw0_nV-VIA9hlEn8K71GE5TZeat8hm0MvHvYkH7B2O505ybIxInEXm_tmV-TCBaK2234xCqRsUTc5dsNajoVnNVq'
            if (err) { console.log(err); callback(true, err); return; } // Handle Query Errors
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                to: fcm_token
                // collapse_key: 'your_collapse_key',
                ,
                notification: {
                    title: newtitle,
                    body: text,
                    kind: taskkind,
                    tag : '.activity.CameraBarcodeScannerActivity'
                },
                
                data: {  //you can send only notification or only data(or include both)
                    taskId: task_no,
                    kind: taskkind,
					date: nowdate,
					task_no:task_no,
                    title: newtitle,
                    message: text,
                    notificationid: noti_log_id,
                    tag : '.activity.CameraBarcodeScannerActivity'
                }
            };
            console.log(message,"message")
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                    console.log(err)
                    callback(true, err); 
                    return;
                } else {
                    console.log("Successfully sent with response: ", response);
                    // Release connection back to Pool
                    callback(false, [])
                    return;
                }
            });
            //console.log("rows",rows[0]);
            //console.log("rows",rows.fcm_tkn)
        });
    });
}

/**************************************************************************************
* Controller     : taskfilterMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.taskfilterMdl = function (data, user, callback) {
    var fnm = 'taskfilterMdl';
    let qry = ``
    let qry2 = ``
    let qry3 = ``
    let qry4 = ``
    
    qry4 = `1`
    if(data.call_attend_by){
        qry = qry + ` and FIND_IN_SET(${data.call_attend_by}, st_id.call_attend_by)`
        qry4 = `1,0`
    }
    if(data.task_priority){
        qry = qry + ` and t.task_priority = '${data.task_priority}'`
    }

    if(data.cluster_id){
        qry = qry + ` and cl.cluster_id = ${data.cluster_id}`
    }else{
        if(user.emp_designation == 234){
            qry = qry + ` and cl.cluster_id in (${user.cluster_id}) `
        }
    }

    if(data.task_category && data.task_category != 0){
		qry = qry + ` and  t.task_category= ${data.task_category} `   
	}
	if(data.task_status && data.task_status != 0 && data.task_status != 217){
		qry = qry + ` and st_id.task_status= ${data.task_status} `   
	}else if(data.task_status == 217){
        qry = qry + ` and t.task_status= ${data.task_status} and t.mngr = 1`   
    }
    qry2 = `and ((t.parent_id is null and st_id.primary_flag in (${qry4}))
    and (t.task_created_date) >= '${data.fromDate}'
    and (t.task_created_date) <= '${data.toDate}')`
    if(data.task_status == 217){
        qry2 = qry2 + ` or ((t.mngr = 1)
        and (t.task_created_date) >= '${data.fromDate}'
        and (t.task_created_date) <= '${data.toDate}')`
    }

    if(data.order_by){
        qry3 = qry3 + `group by t.task_id order by t.task_id ${data.order_by} `
    }else{
        qry3 = qry3 + `group by t.task_id order by t.task_id desc`
    }
	var QRY_TO_EXEC = ` select t.task_id,t.circuit_id,t.task_no,t.service_no,t.auto_assgn,t.parent_id,t.call_attend_by,t.mngr,t.primary_flag,t.travel_change, t.travel_distance,t.call_type,t.task_type,t.task_status,t.travel_flg,t.task_category,t.task_other_issue,t.task_owner, t.task_message,t.task_created_date,t.eng_reached_time,t.task_resolved_time,t.last_updated_time,t.task_closed_time, t.task_reopen_time,t.total_time,t.resolve_time,t.emp_id,t.resolved_through,t.issue_found,t.remarks,t.task_priority, t.emp_department_id,t.task_latitude,t.task_longitude,t.start_coordinates,t.start_address,t.start_time,t.end_coordinates, t.end_address,t.end_time,t.Approver,t.return_distance,t.Approver_id,t.Approver_reason,t.task_assigned_date, t.task_appointment_date,t.taskAddress,t.task_pincode,t.formId,t.slaTime,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name,
    e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark,
    c.city as circuit_city, c.pincode as circuit_pincode, cl.cluster_name as cluster_name,

    (SELECT GROUP_CONCAT(e.emp_name ORDER BY st.task_id DESC) AS call_attended_name
       FROM employees e
       INNER JOIN tasks st on st.parent_id = t.task_id
       WHERE e.emp_id = st.call_attend_by and st.task_status <> 408) as call_attended_name,

    (select group_concat(st.service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id and st.task_status <> 408) as sub_task_no,
    (select st.task_id as primary_task_id from tasks as st where st.parent_id = t.task_id  and primary_flag = 1) as primary_task_id,
    (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st where st.parent_id = t.task_id and st.task_status <> 408) as tasks_ids,
    (select concat(sb.sub_cat_name, ',' ,sb.sub_cat_description) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status,
    (select st2.task_status as primary_task_status from  tasks as st2  where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status_id,
    (select group_concat(sb.sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id and st2.task_status <> 408)  as sub_task_status_name,
    (select group_concat(st2.task_status order by st2.task_id desc) as sub_task_status_name_ids from tasks as st2 where st2.parent_id = t.task_id)  as sub_task_status_name_ids,
    (select count(*) as doc_count from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id ) and note_type = 0) as doc_count,(select count(*) as notes_count from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id ) and note_type = 1) as notes_count
    from tasks as t
    left join sub_categories as sc on t.task_category = sc.sub_cat_id
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id
    left join clusters as cl on INSTR(cl.pincodes,t.task_pincode)
    left join tasks as st_id on st_id.parent_id = t.task_id
    WHERE 1 = 1 ${qry} ${qry2} ${qry3}`;
	/*var QRY_TO_EXEC = `select t.*,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name,  
    e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    c.city as circuit_city, c.pincode as circuit_pincode, cl.cluster_name as cluster_name, 
    
    (select group_concat(e.emp_name order by st.task_id desc) as call_attended_name from employees as e join tasks as st on st.parent_id = t.task_id where e.emp_id = st.call_attend_by and st.task_status != 408) as call_attended_name,
    (select group_concat(service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id and st.task_status != 408) as sub_task_no,
    (select group_concat(st.task_id) as primary_task_id from tasks as st where st.parent_id = t.task_id  and primary_flag = 1) as primary_task_id,
    (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st where st.parent_id = t.task_id and st.task_status != 408) as tasks_ids,
    (select group_concat(sub_cat_name, ',' ,sub_cat_description) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status,
    (select group_concat(st2.task_status) as primary_task_status from  tasks as st2  where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status_id,
    (select group_concat(sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id and st2.task_status != 408)  as sub_task_status_name,
    (select group_concat(st2.task_status order by st2.task_id desc) as sub_task_status_name_ids from tasks as st2 where st2.parent_id = t.task_id)  as sub_task_status_name_ids,
    (select count(*) as doc_count from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id) and note_type = 0) as doc_count,
	(select count(*) as notes_count from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id) and note_type = 1) as notes_count
    from tasks as t 
    left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id 
    left join clusters as cl on INSTR(cl.pincodes,t.task_pincode) 
    left join tasks as st_id on st_id.parent_id = t.task_id 
    where 1 = 1 ${qry} ${qry2} ${qry3}; `; */
    //c.cluster_id = cl.cluster_id
	// var QRY_TO_EXEC = `select t.*,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name,  
    // e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    // c.city as circuit_city, c.pincode as circuit_pincode, cl.cluster_name as cluster_name, 
    
    // (select group_concat(e.emp_name order by st.task_id desc) as call_attended_name from employees as e join tasks as st on st.parent_id = t.task_id where e.emp_id = st.call_attend_by) as call_attended_name,
    // (select group_concat(service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id ) as sub_task_no,
    // (select group_concat(st.task_id) as primary_task_id from tasks as st where st.parent_id = t.task_id  and primary_flag = 1) as primary_task_id,
    // (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st where st.parent_id = t.task_id) as tasks_ids,
    // (select group_concat(sub_cat_name) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status,
    // (select group_concat(st2.task_status) as primary_task_status from  tasks as st2  where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status_id,
    // (select group_concat(sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id)  as sub_task_status_name,
    // (select group_concat(st2.task_status order by st2.task_id desc) as sub_task_status_name_ids from tasks as st2 where st2.parent_id = t.task_id)  as sub_task_status_name_ids,
    // sum(case when tdocs.note_type = 0 then 1 else 0 end) as doc_count ,
    // sum(case when tdocs.note_type = 1 then 1 else 0 end) as notes_count 
    // from tasks as t 
    // left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    // left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    // left join employees as e2 on t.task_owner = e2.emp_id
    // left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    // left join circuits as c on t.circuit_id = c.circuit_id 
    // left join clusters as cl on  c.cluster_id = cl.cluster_id
    // left join tasks_documents_notes as tdocs on tdocs.task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id)
    // left join tasks as st_id on st_id.parent_id = t.task_id 
    // where 1 = 1 ${qry} ${qry2} ${qry3}; `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

// exports.taskfilterMdl = function (data, user, callback) {
//     var fnm = 'taskfilterMdl';
//     let qry = ``
//     let count = 0

//     // if(data.column_name){

//     if(data.fromDate){
//         count = 1
//         qry = ` date(${data.column_name}) between date('${data.fromDate}')`
//     }
//     if(data.toDate){
//         count = 1
//         qry = qry + ` and date('${data.toDate}')`
//     }

//     // }

//     if(count === 0){
//         qry = qry + "1 = 1"
//     }
//     if(data.call_attend_by){
//         qry = qry + ` and FIND_IN_SET(${data.call_attend_by}, t.call_attend_by)`
//     }
//     if(data.task_priority){
//         qry = qry + ` and t.task_priority = '${data.task_priority}'`
//     }

//     if(data.cluster_id){
//         qry = qry + ` and c.cluster_id = ${data.cluster_id}`
//     }

//     if(data.task_category && data.task_category != 0){
// 		qry = qry + ` and  t.task_category= ${data.task_category} `   
// 	}
// 	if(data.task_status && data.task_status != 0){
// 		qry = qry + ` and t.task_status= ${data.task_status} `   
// 	}

//     if(data.order_by){
//         qry = qry + ` and t.parent_id is null order by t.task_id ${data.order_by} `
//     }else{
//         qry = qry + ` and t.parent_id is null  order by t.task_id desc`
//     }

// 	var QRY_TO_EXEC = `select t.*,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name,  
//     e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
//     c.city as circuit_city, c.pincode as circuit_pincode, cl.cluster_name as cluster_name, 
    
//     (select group_concat(e.emp_name) as call_attended_name from employees as e join tasks as st on st.parent_id = t.task_id where (e.emp_id = st.call_attend_by and st.task_status != 271 ) or (e.emp_id = st.call_attend_by and st.task_status = 271 and st.primary_flag = 1)) as call_attended_name,
//     (select count(*) as doc_count from tasks_documents_notes as tdocs where tdocs.task_id = t.task_id and tdocs.note_type = 0) as doc_count, 
//     (select count(*) as notes_count from tasks_documents_notes as tdocs where tdocs.task_id = t.task_id and tdocs.note_type = 1) as notes_count, 
//     (select group_concat(service_no) as sub_task_no from tasks as st where (st.parent_id = t.task_id and st.task_status != 271 ) or  (st.parent_id = t.task_id and st.task_status = 271 and st.primary_flag = 1)) as sub_task_no,
//     (select group_concat(st.task_id) as primary_task_id from tasks as st where st.parent_id = t.task_id  and primary_flag = 1) as primary_task_id,
//     (select group_concat(st.task_id) as tasks_ids from tasks as st where (st.parent_id = t.task_id and st.task_status != 271) or (st.parent_id = t.task_id and st.primary_flag = 1 and st.task_status = 271)) as tasks_ids,
//     (select group_concat(sub_cat_name) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where (st2.parent_id = t.task_id and st2.task_status != 271 and st2.primary_flag = 1) or (st2.parent_id = t.task_id and st2.task_status = 271 and st2.primary_flag = 1)) primary_task_status,
//     (select group_concat(sub_cat_name) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where (st2.parent_id = t.task_id and st2.task_status != 271 ) or (st2.parent_id = t.task_id and st2.task_status = 271 and st2.primary_flag = 1)) as sub_task_status_name
//     from tasks as t 
//     join sub_categories as sc on t.task_category = sc.sub_cat_id 
//     join complaint_categories as cc on t.task_type = cc.comp_cat_id
    
//     join employees as e2 on t.task_owner = e2.emp_id
//     join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
//     join circuits as c on t.circuit_id = c.circuit_id 
//     join clusters as cl on  c.cluster_id = cl.cluster_id
    
//     where ${qry}; `;
    
//     console.log(QRY_TO_EXEC);
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
// }

/**************************************************************************************
* Controller     : gettaskbystatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getemproleMdl = function (data, user, callback) {
    var fnm = 'getemproleMdl';
   
	var QRY_TO_EXEC = `select * from employees where emp_id = ${data.emp_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : gettaskbystatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
* 05/05/2023 - Ramesh Patlola - where condition adding
***************************************************************************************/  
exports.gettaskbystatusandcategoryMdl = function (data, user, callback) {

    var fnm = 'gettaskbystatusandcategoryMdl';
    /*let qry = ``
	let qry2 = ``
    let qry3 = ``
	if(user.emp_designation == 284){
        qry = `where 1 = 1 `
    }else if (user.emp_designation == 234){
        if(data.task_status == 217){
			qry = `where (cl.cluster_id in (${user.cluster_id}))`
		} else {
			//qry = `where (e.cluster_id in (${user.cluster_id}))`
			qry = `where (cl.cluster_id in (${user.cluster_id}))`
		}
    }else{
        qry = `where (t.call_attend_by in (${data.emp_id}) or t.task_owner=${data.emp_id})`
    } 

	// if(data.task_category && data.task_category != 0){
	// 	qry = qry + ` and  t.task_category= ${data.task_category} `   
	// }
	// if(data.task_status && data.task_status != 0){
	// 	qry = qry + ` and st_id.task_status= ${data.task_status} `   
	// }

    if(data.search_like){
        let qry4 = ``
        if(data.task_status && data.task_status != 0 && data.task_status != 217){
            qry4 = ` and st_id.task_status = ${data.task_status}`
        }else if(data.task_status == 217){
            qry4 = `and t.task_status = ${data.task_status} and t.mngr = 1`
        }
        qry = qry + `and ((t.task_no like '%${data.search_like}%' or t.service_no like '%${data.search_like}%') and t.parent_id is null) ${qry4}`
    }else{
        if(data.task_category && data.task_category != 0){
            qry3 = qry3 + ` and  st_id.task_category= ${data.task_category}`   
        }
        if(data.task_status && data.task_status != 0){
            qry3 = qry3 + ` and st_id.task_status= ${data.task_status}`   
        }
        qry = qry + `and ((t.parent_id is null and st_id.primary_flag = 1) ${qry3}
        and (t.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}' 
        and (t.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}')`
    }
    if((data.task_status == 217 || (data.task_status == 0)) && !data.search_like){
        qry3 = ``
        if(data.task_category && data.task_category != 0){
            qry3 = qry3 + ` and  t.task_category= ${data.task_category} `   
        }
        if(user.emp_designation == 284){
			qry2 = `or ((t.mngr = 1) ${qry3}  
			and (t.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}' 
			and (t.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}')`
		} else {
			qry2 = `or ((t.mngr = 1) ${qry3} and cl.cluster_id in (${user.cluster_id}) 
			and (t.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}' 
			and (t.task_created_date) <= '${data.toDate}')`
		}
    }
  
    var QRY_TO_EXEC = ` select t.*,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name,  
    e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, sc2.sub_cat_description as status_bg_colour, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    c.city as circuit_city, c.pincode as circuit_pincode, cl.cluster_name as cluster_name, 
    (select group_concat(e.emp_name order by st.task_id desc) as call_attended_name from employees as e join tasks as st on st.parent_id = t.task_id where e.emp_id = st.call_attend_by and st.task_status != 408) as call_attended_name,
    (select group_concat(service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id and t.task_status != 408) as sub_task_no,
    (select group_concat(sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id and st2.task_status != 408)  as sub_task_status_name,
    (select group_concat(st2.task_status order by st2.task_id desc) as sub_task_status_name_ids from tasks as st2 where st2.parent_id = t.task_id)  as sub_task_status_name_ids,
    (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st where st.parent_id = t.task_id and st.task_status != 408) as tasks_ids,
    (select group_concat(st.task_id) as primary_task_id from tasks as st where st.parent_id = t.task_id  and primary_flag = 1) as primary_task_id,
    (select group_concat(sub_cat_name, ',' ,sub_cat_description) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status,
    (select group_concat(st2.task_status) as primary_task_status from  tasks as st2  where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status_id,
    (select count(*) as countss from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id) and note_type = 0) as doc_count,
	(select count(*) as countss from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id) and note_type = 1) as notes_count
    from tasks as t  
    left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
   
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id 
    #left join clusters as cl on  c.cluster_id = cl.cluster_id
    #left join clusters as cl on  find_in_set(t.task_pincode, cl.pincodes)
    left join clusters as cl on  INSTR(cl.pincodes,t.task_pincode)
    left join tasks as st_id on st_id.parent_id = t.task_id 
    left join employees as e on e.emp_id = st_id.call_attend_by
    ${qry} ${qry2} group by t.task_id order by t.task_id desc`;*/
	
	let qry = ``
	let qry2 = ``
    let qry3 = ``
	let join = ``
	if(user.emp_designation == 284){
        qry = ` 1 = 1 `
    }else if (user.emp_designation == 234){
		join = `left join employees as e on e.emp_id = st_id.call_attend_by`
		if(data.task_status == 217){
			qry = ` (cl.cluster_id in (${user.cluster_id}))`
		} else {
			qry = ` (e.cluster_id in (${user.cluster_id}))`
		}
    }else{
        qry = ` (t.call_attend_by in (${data.emp_id}) or t.task_owner=${data.emp_id})`
    } 


    if(data.search_like){
        let qry4 = ``
        let firstThreeCharOfSearchTerm = data.search_like.slice(0,3)
        if(firstThreeCharOfSearchTerm == 'STT' || firstThreeCharOfSearchTerm == 'INC' || firstThreeCharOfSearchTerm.slice(0,2) == 'CS'){
            const ischildtaskornot =  data.search_like.indexOf('_') 
            if(ischildtaskornot != -1){
                data.search_like = data.search_like.slice(0,ischildtaskornot)
            }
        }
        if(data.task_status && data.task_status != 0 && data.task_status != 217){
            qry4 = ` and st_id.task_status = ${data.task_status}`
        }else if(data.task_status == 217){
            qry4 = `and t.task_status = ${data.task_status} and t.mngr = 1`
        }
        qry = qry + `and ((t.task_no like '%${data.search_like}%' or t.service_no like '%${data.search_like}%') and t.parent_id is null) ${qry4}`
    }else{
        if(data.task_category && data.task_category != 0){
            qry3 = qry3 + ` and  st_id.task_category= ${data.task_category}`   
        }
        if(data.task_status && data.task_status != 0){

				qry3 = qry3 + ` and st_id.task_status= ${data.task_status}`   

        }
        qry = qry + `and ((t.parent_id is null and st_id.primary_flag = 1) ${qry3}
        and (t.task_created_date) >= '${data.fromDate}' 
        and (t.task_created_date) <= '${data.toDate}')`
    }
    if((data.task_status == 217 || (data.task_status == 0)) && !data.search_like){
        qry3 = ``
        if(data.task_category && data.task_category != 0){
            qry3 = qry3 + ` and  t.task_category= ${data.task_category} `   
        }
		if(user.emp_designation == 284){
			qry2 = `or ((t.mngr = 1) ${qry3}  
			and (t.task_created_date) >= '${data.fromDate}' 
			and (t.task_created_date) <= '${data.toDate}')`
		} else {
			qry2 = `or ((t.mngr = 1) ${qry3} and cl.cluster_id in (${user.cluster_id}) 
			and (t.task_created_date) >= '${data.fromDate}' 
			and (t.task_created_date) <= '${data.toDate}')`
		}
    }
	
	var QRY_TO_EXEC =`select t.task_id,t.circuit_id,t.task_no,t.service_no,t.auto_assgn,t.parent_id,t.call_attend_by,t.mngr,t.primary_flag,t.travel_change, t.travel_distance,t.call_type,t.task_type,t.task_status,t.travel_flg,t.task_category,t.task_other_issue,t.task_owner, t.task_message,t.task_created_date,t.eng_reached_time,t.task_resolved_time,t.last_updated_time,t.task_closed_time, t.task_reopen_time,t.total_time,t.resolve_time,t.emp_id,t.resolved_through,t.issue_found,t.remarks,t.task_priority, t.emp_department_id,t.task_latitude,t.task_longitude,t.start_coordinates,t.start_address,t.start_time,t.end_coordinates, t.end_address,t.end_time,t.Approver,t.return_distance,t.Approver_id,t.Approver_reason,t.task_assigned_date, t.task_appointment_date,t.taskAddress,t.task_pincode,t.formId,t.slaTime,sc.sub_cat_name as task_main_category_name, cc.comp_cat_name as task_type_name,
    e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark,
    c.city as circuit_city, c.pincode as circuit_pincode, cl.cluster_name as cluster_name,

    (SELECT GROUP_CONCAT(e.emp_name ORDER BY st.task_id DESC) AS call_attended_name
       FROM employees e
       INNER JOIN tasks st on st.parent_id = t.task_id
       WHERE e.emp_id = st.call_attend_by and st.task_status <> 408) as call_attended_name,

    (select group_concat(st.service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id and st.task_status <> 408) as sub_task_no,
    (select st.task_id as primary_task_id from tasks as st where st.parent_id = t.task_id  and primary_flag = 1) as primary_task_id,
    (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st where st.parent_id = t.task_id and st.task_status <> 408) as tasks_ids,
    (select concat(sb.sub_cat_name, ',' ,sb.sub_cat_description) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status,
    (select st2.task_status as primary_task_status from  tasks as st2  where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status_id,
    (select group_concat(sb.sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id and st2.task_status <> 408)  as sub_task_status_name,
    (select group_concat(st2.task_status order by st2.task_id desc) as sub_task_status_name_ids from tasks as st2 where st2.parent_id = t.task_id)  as sub_task_status_name_ids,
    (select count(*) as doc_count from tasks_documents_notes where (task_id in (select task_id from tasks where parent_id= t.task_id ) ) and note_type = 0) as doc_count,
	(select count(*) as notes_count from tasks_documents_notes where (task_id in (select task_id from tasks where parent_id= t.task_id ) ) and note_type = 1) as notes_count
    from tasks as t
    left join sub_categories as sc on t.task_category = sc.sub_cat_id
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id
    left join clusters as cl on INSTR(cl.pincodes,t.task_pincode)
    left join tasks as st_id on st_id.parent_id = t.task_id
	${join}
    WHERE ${qry} ${qry2} GROUP BY t.task_id order by t.task_id desc`
	
	//var QRY_TO_EXEC = `CALL GETwebTASKDTLS("${qry} ${qry2}")`
	
    /*var QRY_TO_EXEC = `WITH CallAttendedNames AS (
	  SELECT parent_id, GROUP_CONCAT(DISTINCT e.emp_name ORDER BY st.task_id DESC) AS call_attended_name
	  FROM tasks AS st
	  JOIN employees AS e ON st.call_attend_by = e.emp_id
	  WHERE st.task_status != 408
	  GROUP BY parent_id
	),

	SubTaskNos AS (
	  SELECT parent_id, GROUP_CONCAT(DISTINCT service_no ORDER BY st.task_id DESC) AS sub_task_no
	  FROM tasks AS st
	  WHERE st.task_status != 408
	  GROUP BY parent_id
	),

	SubTaskStatusNames AS (
	  SELECT parent_id, GROUP_CONCAT(sb.sub_cat_name ORDER BY st2.task_id DESC) AS sub_task_status_name
	  FROM tasks AS st2
	  JOIN sub_categories AS sb ON sb.sub_cat_id = st2.task_status
	  WHERE st2.task_status != 408
	  GROUP BY parent_id
	),

	SubTaskStatusIds AS (
	  SELECT parent_id, GROUP_CONCAT(st2.task_status ORDER BY st2.task_id DESC) AS sub_task_status_name_ids
	  FROM tasks AS st2
	  WHERE st2.task_status != 408
	  GROUP BY parent_id
	),

	TasksIds AS (
	  SELECT parent_id, GROUP_CONCAT(DISTINCT st.task_id ORDER BY st.task_id DESC) AS tasks_ids
	  FROM tasks AS st
	  WHERE st.task_status != 408
	  GROUP BY parent_id
	),

	PrimaryTaskInfo AS (
	  SELECT parent_id, 
			 GROUP_CONCAT(DISTINCT st.task_id) AS primary_task_id,
			 GROUP_CONCAT(DISTINCT CONCAT(sb.sub_cat_name, ',', sb.sub_cat_description)) AS primary_task_status,
			 GROUP_CONCAT(DISTINCT st.task_status) AS primary_task_status_id
	  FROM tasks AS st
	  JOIN sub_categories AS sb ON sb.sub_cat_id = st.task_status
	  WHERE st.primary_flag = 1
	  GROUP BY parent_id
	),

	DocCount AS (
	  SELECT parent_id, COUNT(*) AS countss
	  FROM tasks_documents_notes as tdc
	  join tasks as t on t.task_id=tdc.task_id
	  WHERE note_type = 0
	  GROUP BY parent_id
	),

	NotesCount AS (
	  SELECT parent_id, COUNT(*) AS countss
	  FROM tasks_documents_notes as tdc
	  join tasks as t on t.task_id=tdc.task_id
	  WHERE note_type = 1
	  GROUP BY parent_id
	)

	SELECT t.*, 
		   sc.sub_cat_name AS task_main_category_name, 
		   cc.comp_cat_name AS task_type_name,
		   e2.emp_name AS task_owner_name, 
		   sc2.sub_cat_name AS task_status_name, 
		   sc2.sub_cat_description AS status_bg_colour, 
		   c.circuit_name AS circuit_name, 
		   c.landmark AS circuit_landmark, 
		   c.city AS circuit_city, 
		   c.pincode AS circuit_pincode, 
		   cl.cluster_name AS cluster_name, 
		   can.call_attended_name,
		   stn.sub_task_no,
		   stsn.sub_task_status_name,
		   stsi.sub_task_status_name_ids,
		   tids.tasks_ids,
		   pt.primary_task_id,
		   pt.primary_task_status,
		   pt.primary_task_status_id,
		   ifnull(dc.countss,0) as doc_count,
			ifnull(nc.countss,0) as notes_count
	FROM tasks AS t
	LEFT JOIN sub_categories AS sc ON t.task_category = sc.sub_cat_id
	LEFT JOIN complaint_categories AS cc ON t.task_type = cc.comp_cat_id
	LEFT JOIN employees AS e2 ON t.task_owner = e2.emp_id
	LEFT JOIN sub_categories AS sc2 ON t.task_status = sc2.sub_cat_id
	LEFT JOIN circuits AS c ON t.circuit_id = c.circuit_id 
	LEFT JOIN clusters AS cl ON INSTR(cl.pincodes,t.task_pincode)
	LEFT JOIN tasks AS st_id ON st_id.parent_id = t.task_id 
	LEFT JOIN employees AS e ON e.emp_id = st_id.call_attend_by
	LEFT JOIN CallAttendedNames AS can ON t.task_id = can.parent_id
	LEFT JOIN SubTaskNos AS stn ON t.task_id = stn.parent_id
	LEFT JOIN SubTaskStatusNames AS stsn ON t.task_id = stsn.parent_id
	LEFT JOIN SubTaskStatusIds AS stsi ON t.task_id = stsi.parent_id
	LEFT JOIN TasksIds AS tids ON t.task_id = tids.parent_id
	LEFT JOIN PrimaryTaskInfo AS pt ON t.task_id = pt.parent_id
	LEFT JOIN DocCount AS dc ON t.task_id = dc.parent_id
	LEFT JOIN NotesCount AS nc ON t.task_id = nc.parent_id
	${qry} ${qry2}
	GROUP BY t.task_id`;*/


    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/

exports.gettaskbystatuscountMdl = function (data, user, callback) {
    var fnm = 'gettaskbystatuscountMdl';
   
	var QRY_TO_EXEC = `select count(*) as count from tasks where task_status = ${data.task_status} and emp_id = ${data.emp_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : updateattdnceofemolyeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/

exports.updateattdnceofemolyeeMdl = function (data, user, callback) {
    var fnm = 'updateattdnceofemolyeeMdl';
   
	var QRY_TO_EXEC = `update attendence set utilization_count=utilization_count+1 where attendence_id = ${data.emp_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : gettasklistbystatus_Mobile_Mdl
* Parameters     : req,res()
* Description    : this api is used to show tasks based on emp_id and current, previous and completed status
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklistbystatus_Mobile_Mdl = function (data, user, callback) {
    var fnm = 'gettasklistbystatus_Mobile_Mdl';
    let qry = ``
	
	if(data.task_status == 0){
        qry = ` (date(t.task_closed_time) < curdate() and t.task_status > 225) and t.call_attend_by=${user.emp_id} 
                  AND t.parent_id IS NOT NULL 
                  AND t.task_status not in (408,271) 
                  AND ((t.task_assigned_date) >= NOW() - INTERVAL 4 DAY)`
    }
    if(data.task_status == 1){
        qry = ` (date(t.task_closed_time) = curdate() or date(t.task_closed_time) is null or t.task_status < 226) and t.call_attend_by=${user.emp_id} 
                  AND t.parent_id IS NOT NULL 
                  AND t.task_status not in (408,271) 
                  AND ((t.task_assigned_date) >= NOW() - INTERVAL 4 DAY)`
    }
    if(data.task_status == 2){
		qry = ` date(t.task_appointment_date) > curdate() and t.call_attend_by=${user.emp_id} 
                  AND t.parent_id IS NOT NULL 
                  AND t.task_status not in (408,271) 
                  AND ((t.task_assigned_date) >= NOW() - INTERVAL 4 DAY)`
    }
	
	var QRY_TO_EXEC = `SELECT t.task_id, t.circuit_id, t.task_no, t.service_no, t.parent_id, t.call_attend_by, t.cluster_id, t.primary_flag, t.travel_distance, t.call_type, t.task_status, t.travel_flg, t.task_category, t.task_other_issue, t.task_created_date, t.emp_id, t.resolved_through, t.issue_found, t.remarks, t.task_priority, t.emp_department_id, t.task_latitude, t.task_longitude,  t.return_distance, t.approved_time,
 t.task_appointment_date, t.taskAddress, t.task_pincode, t.formId, DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date,
	DATE_FORMAT(t.task_appointment_date,'%Y-%m-%d %H:%i:%S') as task_appointment_date,
	sc.sub_cat_name, sc.sub_cat_description as sub_cat_description, e2.emp_username as task_owner_username,
	#sc2.sub_cat_name as next_sub_cat_name, 
   e2.emp_name as task_owner_name, c.circuit_name as circuit_name,c.mobile_no as circuit_mobileno, c.city as circuit_city, c.pincode as circuit_pincode, st.state_name,
   (select group_concat(e.emp_name) as call_attendedby_name from employees as e join tasks as st2 on e.emp_id= st2.call_attend_by where st2.parent_id = t.parent_id and st2.task_status <> 408) as call_attendedby_name,
   (select group_concat(st2.service_no) as sub_task_status_name from tasks as st2 where st2.task_id  = t.parent_id  and st2.task_status <> 271) as main_service_no,
   (select group_concat(st2.task_no) as sub_task_status_name from tasks as st2 where st2.task_id  = t.parent_id  and st2.task_status <> 271) as main_task_no,
   (select group_concat(sub_cat_name) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.parent_id and st2.task_status <> 408) as sub_task_status_name,
   (select st2.task_status as sub_task_status_name from tasks as st2  where st2.parent_id = t.parent_id and primary_flag=1 ) as sub_task_status_id,
   (select e.emp_name as primary_name from employees as e join tasks as t2 on t2.parent_id=t.parent_id where e.emp_id= t2.call_attend_by and primary_flag=1 ) as primary_name,
      (select count(*) as doc_count from tasks_documents_notes where (task_id in (select task_id from tasks where parent_id= t.parent_id)) and note_type = 0) as doc_count,
   (select count(*) as notes_count from tasks_documents_notes where (task_id in (select task_id from tasks where parent_id= t.parent_id)) and note_type = 1) as notes_count,
   e2.emp_name as reporting_name,e2.emp_mobile as reporting_mobile,e2.emp_email as reporting_email
   from tasks as t
   #left join task_logs as tl on tl.task_id=t.task_id
   left join sub_categories as sc on t.task_status = sc.sub_cat_id
   #left join sub_categories as sc2 on t.task_status + 1 = sc2.sub_cat_id
   left join employees as e on e.emp_id=t.call_attend_by
   left join employees as e2 on t.task_owner = e2.emp_id
   left join circuits as c on t.circuit_id = c.circuit_id
   left join states as st on c.state = st.state_id
   #left join tasks_documents_notes as tdocs on tdocs.task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id)
    where ${qry}
	group by t.task_id,t.call_attend_by order by t.task_id desc`
	

    /*if(data.task_status == 0){
        qry = ` (date(t.task_closed_time) < curdate() and t.task_status > 225) and `
    }
    if(data.task_status == 1){
        qry = ` (date(t.task_closed_time) = curdate() or date(t.task_closed_time) is null or t.task_status < 226) and `
    }
    if(data.task_status == 2){
		qry = ` date(t.task_appointment_date) > curdate() and `
    }

	var QRY_TO_EXEC = `WITH main_task_info AS (
			SELECT task_id,
                                   GROUP_CONCAT(DISTINCT service_no) AS main_service_no,
                                   GROUP_CONCAT(DISTINCT task_no) AS main_task_no
                        FROM tasks
                        WHERE task_status <> 271 and parent_id is null
                        GROUP BY task_id
		),
		sub_task_status_info AS (
			SELECT parent_id, 
				   MAX(task_status) AS sub_task_status_id
			FROM tasks
			WHERE primary_flag = 1
			GROUP BY parent_id
		),
		doc_counts AS (
			SELECT parent_id, 
				   COUNT(*) AS doc_count
			FROM tasks_documents_notes as tdc
			join tasks as t on t.task_id=tdc.task_id
			WHERE note_type = 0
			GROUP BY parent_id
		),
		notes_counts AS (
			SELECT parent_id, 
				   COUNT(*) AS notes_count
			FROM tasks_documents_notes as tdc
			join tasks as t on t.task_id=tdc.task_id
			WHERE note_type = 1
			GROUP BY parent_id
		),
		empnames AS (
				SELECT parent_id,GROUP_CONCAT(e.emp_name ORDER BY t.task_id DESC) as emp_name FROM employees as e
				join tasks as t on t.call_attend_by=e.emp_id and t.task_status <> 408
				GROUP BY parent_id
		),
		subcategoryName AS (
				SELECT parent_id,GROUP_CONCAT(sb.sub_cat_name ORDER BY t.task_id DESC) as sub_cat_name FROM sub_categories as sb
				join tasks as t on t.task_status=sb.sub_cat_id and t.task_status <> 408
				GROUP BY parent_id
		),
		primaryempnames AS (
				SELECT parent_id,emp_name as emp_name FROM employees as e
				join tasks as t on t.call_attend_by=e.emp_id and t.task_status <> 408 and t.primary_flag =1
				GROUP BY parent_id 
		)
		SELECT t.*, 
			   DATE_FORMAT(t.task_created_date, '%Y-%m-%d %H:%i:%S') as task_created_date,
			   DATE_FORMAT(t.task_appointment_date, '%Y-%m-%d %H:%i:%S') as task_appointment_date,
			   sc.sub_cat_name, 
			   sc.sub_cat_description as sub_cat_description, 
			   sc2.sub_cat_name as next_sub_cat_name, 
			   e2.emp_username as task_owner_username,
			   e2.emp_name as task_owner_name,
			   c.circuit_name as circuit_name,
			   c.mobile_no as circuit_mobileno, 
			   c.email_id  as circuit_email,
			   c.landmark as circuit_landmark, 
			   c.city as circuit_city, 
			   c.pincode as circuit_pincode, 
			   st.state_name,
			   e.emp_name as call_attendedby_name,
			   mti.main_service_no,
			   mti.main_task_no,
			   sb.sub_cat_name as sub_task_status_name,
			   stsi.sub_task_status_id,
			   prme.emp_name as primary_name,
			   ifnull(dc.doc_count,0) as doc_count,
				ifnull(nc.notes_count,0) as notes_count,
			   e2.emp_name as reporting_name,
			   e2.emp_mobile as reporting_mobile,
			   e2.emp_email as reporting_email
		FROM tasks AS t
		LEFT JOIN task_logs AS tl ON tl.task_id = t.task_id
		LEFT JOIN sub_categories AS sc ON t.task_status = sc.sub_cat_id
		LEFT JOIN sub_categories AS sc2 ON t.task_status + 1 = sc2.sub_cat_id
		#LEFT JOIN employees AS e ON FIND_IN_SET(e.emp_id, t.call_attend_by)
		LEFT JOIN empnames AS e ON e.parent_id=t.parent_id
		LEFT JOIN employees AS e2 ON t.task_owner = e2.emp_id
		LEFT JOIN primaryempnames AS prme ON t.parent_id = prme.parent_id
		LEFT JOIN circuits AS c ON t.circuit_id = c.circuit_id
		LEFT JOIN states AS st ON c.state = st.state_id
		LEFT JOIN main_task_info AS mti ON mti.task_id = t.parent_id
		LEFT JOIN sub_task_status_info AS stsi ON stsi.parent_id = t.parent_id
		LEFT JOIN employees AS primary_task_owner ON primary_task_owner.emp_id = t.call_attend_by AND primary_flag = 1
		LEFT JOIN doc_counts AS dc ON dc.parent_id = t.parent_id
		LEFT JOIN notes_counts AS nc ON nc.parent_id = t.parent_id
		#LEFT JOIN sub_categories AS sb ON sb.sub_cat_id = t.task_status  -- Add this line to define the sb alias
		LEFT JOIN subcategoryName AS sb ON sb.parent_id = t.parent_id 
		WHERE ${qry} 
			  FIND_IN_SET(${user.emp_id}, t.call_attend_by) 
			  AND t.parent_id IS NOT NULL 
			  AND t.task_status <> 408 
			  AND ((t.task_assigned_date) >= NOW() - INTERVAL 4 DAY)
		GROUP BY t.parent_id, t.call_attend_by 
		ORDER BY t.task_id DESC;`*/
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.getreportingdetailsMdl = function (data,user, callback) {
    var fnm = 'getreportingdetailsMdl';
   
   var QRY_TO_EXEC = ` select 
   (select group_concat(emp_name) as reporting_name from employees where FIND_IN_SET(emp_id, e.emp_reporting)) as reporting_name,
   (select group_concat(emp_mobile) as reporting_name from employees where FIND_IN_SET(emp_id, e.emp_reporting)) as reporting_mobile,
   (select group_concat(emp_email) as reporting_name from employees where FIND_IN_SET(emp_id, e.emp_reporting)) as reporting_email
   from employees as e where e.emp_id = ${data.emp_id};`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : gettaskbystatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/

exports.gettaskcomplientslistMdl = function (data, user, callback) {
    var fnm = 'gettaskcomplientslistMdl';
    let qry = ``
    if(data.comp_status == 0){
        qry = ` where comp_status = ${data.comp_status}`
    }
    if(data.comp_status == 1){
        qry = qry + ` where comp_status = ${data.comp_status}`
    }
    if(data.comp_status == 2){
        qry = ``
    }
   
	var QRY_TO_EXEC = `select * from complaint_categories ${qry} order by comp_cat_id desc;`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.insertnotifyMdl = function (data,task_no,user, text, callback) {
    var fnm = 'insertnotifyMdl';
   
    //var text = 'task created, task id is : '+ task_no+ '' ;
    var kind= 'Notifications';
   var title = 'task';
	
   var QRY_TO_EXEC = ` insert into notification_log (emp_id,task_category,bodyMsg,message,dateCreated,status) values(${data.emp_id},'${data.task_category}','${text}','${kind}',current_timestamp(),1) `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.gettasknotificationslistMdl = function (data,task_no,user, callback) {
    var fnm = 'gettasknotificationslistMdl';
   
   var QRY_TO_EXEC = ` select * from notification_log  `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasklogsdetails_task_Mdl = function (data,user, callback) {
    var fnm = 'gettasklogsdetails_task_Mdl';

    var QRY_TO_EXEC = `select t.*, DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date, DATE_FORMAT(t.task_appointment_date,'%Y-%m-%d %H:%i:%S') as task_appointment_date, sc.sub_cat_name as task_main_category_name, 
    sc.sub_cat_description as sub_cat_description, cc.comp_cat_name as task_type_name, cc.service_time as comp_service_time, e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    c.city as circuit_city, c.pincode as circuit_pincode, c.mobile_no as circuit_mobile_number, cl.cluster_name as cluster_name, 
     (select group_concat(emp_name) as call_attended_name from employees as e join tasks as st on st.parent_id = t.parent_id where e.emp_id = st.call_attend_by and st.task_status != 408) as call_attended_name,
    (select group_concat(service_no) as sub_task_no from tasks as st where st.parent_id = t.parent_id and st.task_status != 408) as sub_task_no,
     #(select group_concat(st.task_id) as tasks_ids from tasks as st where st.parent_id = t.task_id and st.task_status != 271 and st.task_status != 408) as tasks_id,
     (select group_concat(sub_cat_name) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.parent_id and st2.task_status != 408) as sub_task_status_name,
     (select st.service_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_service_no,
     (select st.task_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_task_no,
     (select st2.task_status  as sub_task_status_name from tasks as st2  where st2.parent_id = t.parent_id and primary_flag=1) as sub_task_status_id,
     (select e.emp_name as primary_name from employees as e join tasks as t2 on t2.parent_id=t.parent_id where e.emp_id= t2.call_attend_by and primary_flag=1) as primary_name,
     (select group_concat( ts.travel_distance/1000 , " km" ) as combined_distance 
     from tasks as ts where ts.parent_id=t.parent_id and ts.parent_id is not null and ts.task_status != 408) as combined_distance from tasks as t  
    left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id 
    left join clusters as cl on  c.cluster_id = cl.cluster_id 
    where t.task_id = ${data.task_id};`;
    // in travel sub query order by ts.task_id desc
    // in (st2.task_status order by st2.task_id desc) sub_task_status_id,
    // var QRY_TO_EXEC = `select t.*, DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date, sc.sub_cat_name as task_main_category_name, 
    // sc.sub_cat_description as sub_cat_description, cc.comp_cat_name as task_type_name, cc.service_time as comp_service_time, e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    // c.city as circuit_city, c.pincode as circuit_pincode, c.mobile_no as circuit_mobile_number, cl.cluster_name as cluster_name, 
    //  (select group_concat(emp_name) as call_attended_name from employees as e join tasks as st on st.parent_id = t.parent_id where e.emp_id = st.call_attend_by and st.task_status != 271) as call_attended_name,
    // (select group_concat(service_no) as sub_task_no from tasks as st where st.parent_id = t.parent_id and st.task_status != 271) as sub_task_no,
    //  #(select group_concat(st.task_id) as tasks_ids from tasks as st where st.parent_id = t.task_id and st.task_status != 271) as tasks_id,
    //  (select group_concat(sub_cat_name) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.parent_id and st2.task_status != 271) as sub_task_status_name,
    //  (select st2.task_status as sub_task_status_name from tasks as st2  where st2.parent_id = t.parent_id and primary_flag=1  and st2.task_status != 271) as sub_task_status_id,
    //  (select st.service_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_service_no,
    //  (select st.task_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_task_no,
    //  (select e.emp_name as primary_name from employees as e join tasks as t2 on t2.parent_id=t.parent_id where e.emp_id= t2.call_attend_by and primary_flag=1  and t.task_status != 271) as primary_name,
    //  (select group_concat(case when tl.distance is null then 0 else distance/1000 end, " km") as dst 
    //  from tasks as t 
    //  left join task_logs as tl on tl.task_id=t.task_id and t.call_attend_by= tl.call_attend_by and (tl.task_status=221 or (tl.task_status=271 and travel_flg=1)) 
    //  where (t.parent_id= ${data.parent_id} and t.task_status != 271) or (t.parent_id = ${data.parent_id} and travel_flg=1 and t.task_status = 271) or (t.parent_id = ${data.parent_id} and travel_flg=0 and t.task_status = 271)) as combined_distance from tasks as t  
    // left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    // left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    // left join employees as e2 on t.task_owner = e2.emp_id
    // left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    // left join circuits as c on t.circuit_id = c.circuit_id 
    // left join clusters as cl on  c.cluster_id = cl.cluster_id 
    // where t.task_id = ${data.task_id};`;
   
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/**************************************************************************************
* Controller     : gettasklogsdetails_task_web_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasklogsdetails_task_web_Mdl = function (data,user, callback) {
    var fnm = 'gettasklogsdetails_task_web_Mdl';

    var QRY_TO_EXEC = `select t.*, DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date, sc.sub_cat_name as task_main_category_name, 
    sc.sub_cat_description as sub_cat_description, cc.comp_cat_name as task_type_name, cc.service_time as comp_service_time, e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    c.city as circuit_city, c.pincode as circuit_pincode, c.mobile_no as circuit_mobile_number, cl.cluster_name as cluster_name, 
    (select group_concat(e.emp_name order by st.task_id desc) as call_attended_name from employees as e join tasks as st on st.parent_id = t.task_id  where e.emp_id = st.call_attend_by  and st.task_status != 408) as call_attended_name,
    (select group_concat(st.call_attend_by order by st.task_id desc) as call_attended_ids from tasks as st where st.parent_id = t.task_id and st.task_status != 408) as call_attended_ids,
    (select group_concat(service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id and st.task_status != 408) as sub_task_no,
    (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st  where st.parent_id = t.task_id and st.task_status != 408) as tasks_id,
    (select group_concat(sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id and st2.task_status != 408) as sub_task_status_name,
     (select st.service_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_service_no,
     (select st.task_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_task_no,
     (select group_concat(sub_cat_id order by st2.task_id desc) as sub_task_status_id from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id and st2.task_status != 408) as sub_task_status_id,
     (select e.emp_name as primary_name from employees as e join tasks as t2 on t2.parent_id=t.parent_id where e.emp_id= t2.call_attend_by and primary_flag=1) as primary_name,
     (select group_concat(st.task_id) as primary_task_id from tasks as st where st.parent_id = t.task_id and primary_flag = 1 ) as primary_task_id,
     (select group_concat(st2.task_status) as primary_task_status from  tasks as st2  where st2.parent_id = t.task_id  and st2.primary_flag = 1) as primary_task_status_id,
     (select group_concat(sub_cat_name, ',' ,sub_cat_description) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status  where st2.parent_id = t.task_id and st2.primary_flag = 1) primary_task_status,
     (select count(*) as countss from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id) and note_type = 0) as doc_count,
     (select count(*) as countss from tasks_documents_notes where task_id in (select task_id from tasks where parent_id= t.task_id or task_id = t.task_id) and note_type = 1) as notes_count,
     (select group_concat( ts.travel_distance/1000 , " km" order by ts.task_id desc) as combined_distance 
     from tasks as ts where (ts.task_id=t.task_id or ts.parent_id=t.parent_id or ts.parent_id=t.task_id) and ts.parent_id is not null and ts.task_status != 408) as combined_distance from tasks as t  
     left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    left join employees as e2 on t.task_owner = e2.emp_id
    left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    left join circuits as c on t.circuit_id = c.circuit_id 
    left join clusters as cl on INSTR(cl.pincodes,t.task_pincode) 
    where t.task_id = ${data.task_id};`;
    //c.cluster_id = cl.cluster_id 
    // var QRY_TO_EXEC = `select t.*, DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date, sc.sub_cat_name as task_main_category_name, 
    // sc.sub_cat_description as sub_cat_description, cc.comp_cat_name as task_type_name, cc.service_time as comp_service_time, e2.emp_name as task_owner_name, sc2.sub_cat_name as task_status_name, c.circuit_name as circuit_name, c.landmark as circuit_landmark, 
    // c.city as circuit_city, c.pincode as circuit_pincode, c.mobile_no as circuit_mobile_number, cl.cluster_name as cluster_name, 
    // (select group_concat(e.emp_name order by st.task_id desc) as call_attended_name from employees as e join tasks as st on st.parent_id = t.task_id  where e.emp_id = st.call_attend_by) as call_attended_name,
    // (select group_concat(service_no order by st.task_id desc) as sub_task_no from tasks as st where st.parent_id = t.task_id) as sub_task_no,
    // (select group_concat(st.task_id order by st.task_id desc) as tasks_ids from tasks as st  where st.parent_id = t.task_id) as tasks_id,
    // (select group_concat(sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.task_id) as sub_task_status_name,
    //  (select st.service_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_service_no,
    //  (select st.task_no as primary_task_id from tasks as st where st.task_id = t.parent_id ) as main_task_no,
    //  (select e.emp_name as primary_name from employees as e join tasks as t2 on t2.parent_id=t.parent_id where e.emp_id= t2.call_attend_by and primary_flag=1) as primary_name,
    //  (select group_concat(st.task_id) as primary_task_id from tasks as st where st.parent_id = t.task_id and primary_flag = 1 ) as primary_task_id,
    //  (select group_concat(sub_cat_name) as primary_task_status from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status  where st2.parent_id = t.task_id and st2.primary_flag = 1) primary_task_status,
    //  (select group_concat( ts.travel_distance/1000 , " km" order by ts.task_id desc) as combined_distance 
    //  from tasks as ts where (ts.task_id=t.task_id or ts.parent_id=t.parent_id or ts.parent_id=t.task_id) and ts.parent_id is not null) as combined_distance from tasks as t  
    //  left join sub_categories as sc on t.task_category = sc.sub_cat_id 
    // left join complaint_categories as cc on t.task_type = cc.comp_cat_id
    // left join employees as e2 on t.task_owner = e2.emp_id
    // left join sub_categories as sc2 on t.task_status = sc2.sub_cat_id
    // left join circuits as c on t.circuit_id = c.circuit_id 
    // left join clusters as cl on  c.cluster_id = cl.cluster_id 
    // where t.task_id = ${data.task_id};`;
    

    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}
/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasklogsdetails_tasklogs_Mdl = function (data,user, callback) {
    var fnm = 'gettasklogsdetailsMdl';
   
   
//    var QRY_TO_EXEC = ` select tlogs.*, tlogs.distance/1000 as travel_distance, em.emp_username as task_owner_username, em.emp_name as task_owner_name,  sc.sub_cat_name as task_status_name,
//     sc.sub_cat_description as sub_cat_description, sc2.sub_cat_name as next_task_status_name, DATE_FORMAT(tlogs.tl_date_created,'%Y-%m-%d %H:%i:%S') as tl_date_created, 
//     (select group_concat(emp_name) as call_attended_name from sify.employees where FIND_IN_SET(emp_id,tlogs.call_attend_by)) as call_attendedby_name  
//     from task_logs as tlogs 
//       join employees as em on tlogs.emp_id = em.emp_id 
//       join sub_categories as sc on tlogs.task_status = sc.sub_cat_id
//       left join sub_categories as sc2 on tlogs.task_status + 1= sc2.sub_cat_id
//       where tlogs.task_id = ${data.task_id}; `;

    var QRY_TO_EXEC = `select tlogs.*, em2.emp_username as task_owner_username, em2.emp_name as task_owner_name,  sc.sub_cat_name as task_status_name, em3.emp_name as assigned_by_name,
    sc.sub_cat_description as sub_cat_description, sc2.sub_cat_name as next_task_status_name, DATE_FORMAT(tlogs.tl_date_created,'%Y-%m-%d %H:%i:%S') as tl_date_created, 
    sc.sub_cat_description as status_bg_colour, em4.emp_name as assigned_name,
    case when tlogs.task_status = 219 then concat(tlogs.distance/1000," km away from service location")
    when tlogs.task_status <> 218 then concat(tlogs.distance/1000," km away from service location")
    when tlogs.task_status <> 271 then concat(tlogs.distance/1000," km away from service location")
    end as 'travel_distance',
    em.emp_name as call_attendedby_name
    from task_logs as tlogs 
    left join employees as em on FIND_IN_SET(em.emp_id,tlogs.call_attend_by)
    left join tasks as t on t.task_id = tlogs.task_id
    left join employees as em2 on em2.emp_id = t.task_owner
     left join employees as em3 on em3.emp_id = t.emp_id
     left join employees as em4 on em4.emp_id = tlogs.emp_id
    left join sub_categories as sc on tlogs.task_status = sc.sub_cat_id
    left join sub_categories as sc2 on tlogs.task_status + 1= sc2.sub_cat_id
    where tlogs.task_id IN (select task_id from tasks where parent_id = ${data.task_id} or task_id = ${data.task_id}) group by tl_id order by tl_id ASC;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : gettasklogsdetails_tasklogs_m_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  Ramesh patlola - Initial Function
*
***************************************************************************************/

exports.gettasklogsdetails_tasklogs_m_Mdl = function (data,user, callback) {
    var fnm = 'gettasklogsdetails_tasklogs_m_Mdl';
   
    var QRY_TO_EXEC = `select tlogs.*, em2.emp_username as task_owner_username, em2.emp_name as task_owner_name,  sc.sub_cat_name as task_status_name, em3.emp_name as assigned_by_name,
    sc.sub_cat_description as sub_cat_description, sc2.sub_cat_name as next_task_status_name, DATE_FORMAT(tlogs.tl_date_created,'%Y-%m-%d %H:%i:%S') as tl_date_created, 
    sc.sub_cat_description as status_bg_colour, em4.emp_name as assigned_name,
    case when tlogs.task_status = 219 then concat(tlogs.distance/1000," km away from service location")
    when tlogs.task_status != 218 then concat(tlogs.distance/1000," km away from service location")
    when tlogs.task_status != 271 then concat(tlogs.distance/1000," km away from service location")
    end as 'travel_distance',
    em.emp_name as call_attendedby_name
    from task_logs as tlogs 
    left join employees as em on FIND_IN_SET(em.emp_id,tlogs.call_attend_by)
    left join tasks as t on t.task_id = tlogs.task_id
    left join employees as em2 on em2.emp_id = t.task_owner
     left join employees as em3 on em3.emp_id = t.emp_id
     left join employees as em4 on em4.emp_id = tlogs.emp_id
    left join sub_categories as sc on tlogs.task_status = sc.sub_cat_id
    left join sub_categories as sc2 on tlogs.task_status + 1= sc2.sub_cat_id
    where tlogs.task_id = ${data.parent_id} OR tlogs.task_id IN (select task_id from tasks where parent_id = ${data.parent_id}) group by tl_id order by tl_id asc;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasklogsdetails_tasksection_Mdl = function (data,user, callback) {
    var fnm = 'gettasklogsdetails_tasksection_Mdl';
   
   var QRY_TO_EXEC = `select tsec.* from task_section as tsec  where tsec.task_id = ${data.task_id}; `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : gettasksessnColsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasksessnColsMdl = function (data,user, callback) {
    var fnm = 'gettasksessnColsMdl';
   
   var QRY_TO_EXEC = `select * from task_section_cols where task_id = ${data.task_id};`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : gettasksessnColsGrpMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasksessnColsGrpMdl = function (data,user, callback) {
    var fnm = 'gettasksessnColsGrpMdl';
   
   var QRY_TO_EXEC = `select ts.section_name,tc.task_section_col_id,tc.section_id,tc.task_id,section_col_name,section_col_value from task_section_cols as tc
				join task_section as ts on ts.section_id=tc.section_id and ts.task_id=ts.task_id where ts.task_id = ${data.parent_id}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : gettasksessnColsGrpwebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.gettasksessnColsGrpwebMdl = function (data,user, callback) {
    var fnm = 'gettasksessnColsGrpwebMdl';
   
   var QRY_TO_EXEC = `select ts.section_name,tc.task_section_col_id,tc.section_id,tc.task_id,section_col_name,section_col_value from task_section_cols as tc
				join task_section as ts on ts.section_id=tc.section_id and ts.task_id=ts.task_id where ts.task_id = ${data.task_id}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  Shaik - Initial Function
*
***************************************************************************************/

exports.gettasklogsdetails_tasksectionlogs_Mdl = function (data, sectionids, user, callback) {
    var fnm = 'gettasklogsdetails_tasksection_Mdl';
   let qry = ``
  let datafilter = function(index){
        //for(let i = 0; i<sectionids.length; i++){
            qry = qry + `select tseccols.task_section_col_id, tseccols.section_id, tseccols.task_id, tseccols.section_col_name, 
                tseccols.section_col_value from task_section_cols as  tseccols 
                join task_section as tsec on tseccols.task_id = tsec.task_id and tseccols.section_id = tsec.section_id 
                where tsec.task_id = ${data.task_id} and tsec.section_id= ${sectionids[index]}; `;
				if(index == sectionids.length -1){
					console.log("ompleted")
				} else {
					datafilter(index + 1)
				}
        //}
			} 
			datafilter(0) 
     
    let QRY_TO_EXEC = `${qry}`

    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : chcktaskcallbyinsrtMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.chcktaskcallbyinsrtMdl = function (data,user, callback) {
    var fnm = 'chcktaskcallbyinsrtMdl';

   var QRY_TO_EXEC = `select * from tasks where task_id = '${data.task_id}'; `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : chcklisttaskcallbyinsrtMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.chcklisttaskcallbyinsrtMdl = function (data,user, callback) {
    var fnm = 'chcklisttaskcallbyinsrtMdl';

   var QRY_TO_EXEC = `select *,(select service_no as serviceno from tasks as t where (t.task_id = tt.task_id or t.task_id = tt.parent_id) and parent_id is null) as serviceno,
(select task_no as taskno from tasks as t where (t.task_id = tt.task_id or t.task_id = tt.parent_id) and parent_id is null) as taskno
 from tasks as tt where tt.task_id = '${data.task_id}' ;`
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : checkcountoftaskidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.checkcountoftaskidMdl = function(data){
	var fnm = 'checkcountoftaskidMdl';
	var QRY_TO_EXEC = `select count(*) as ct from tasks where parent_id=${data.task_id}`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.inserttaskcallattendedbyMdl = function (data,  user, callback) {
    var fnm = 'inserttaskcallattendedbyMdl';


    // var QRY_TO_EXEC = [`update tasks set task_appointment_date = '${data.task_appointment_date}'  ${qry} where task_id = ${data.task_id}; `
    // `update tasks set task_appointment_date = '${data.task_appointment_date}'  ${qry} where parent_id = ${data.task_id}; `,
    // `insert into task_logs (task_id,task_status,call_attend_by,tl_date_created,emp_id) values (${data.task_id},218,'${call_attend_by}',current_timestamp(),${user.emp_id})`]
    //  console.log(QRY_TO_EXEC);
    var QRY_TO_EXEC = `update tasks set mngr=0  where task_id = ${data.task_id};`
    console.log(QRY_TO_EXEC);

	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
    // return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

// /**************************************************************************************
// * Controller     : insrttaskchilddatafrservicenowMdl
// * Parameters     : req,res()
// * Description    : get details of all EntrpeCstmrTyp
// * Change History :
// * 21/04/2023   -  Ramesh Patlola - Initial Function
// *
// ***************************************************************************************/
// exports.insrttaskchilddatafrservicenowMdl = function(data, taskdata, task_tckt, srvc_tckt, call_attend_by, user){
// 	var fnm = 'insrttaskchilddatafrservicenowMdl';
// 	var taskStatusTimestamp = moment(taskdata.task_created_date).format("YYYY-MM-DD HH:mm:ss");
// 	// var taskappntStatusTimestamp = moment(taskdata.task_appointment_date).format("YYYY-MM-DD HH:mm:ss");
// 	var QRY_TO_EXEC = `insert into tasks (mngr,circuit_id, task_no, service_no, parent_id, call_attend_by, call_type, task_type, task_status, task_category, task_other_issue, task_owner, task_message, task_created_date, emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
// 	(0,'${taskdata.circuit_id}','${task_tckt}','${srvc_tckt}','${taskdata.task_id}','${call_attend_by}','${taskdata.call_type}','${taskdata.task_type}',218,'${taskdata.task_category}','${taskdata.task_other_issue}','${taskdata.task_owner}','${taskdata.task_message}','${taskStatusTimestamp}','${taskdata.emp_id}','${taskdata.remarks}','${taskdata.task_priority}','${taskdata.emp_department_id}','${taskdata.task_latitude}','${taskdata.task_longitude}',current_timestamp(),'${data.task_appointment_date}','${taskdata.taskAddress}',${taskdata.task_pincode},'${taskdata.formId}',${taskdata.slaTime});`;
//     console.log(QRY_TO_EXEC);
// 	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
// }
/**************************************************************************************
* Controller     : insrttaskchilddatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.insrttaskchilddatafrservicenowMdl = function(data, taskdata, task_tckt, srvc_tckt, call_attend_by, primary, second_primary, user){
	var fnm = 'insrttaskchilddatafrservicenowMdl';
	var taskStatusTimestamp = moment(taskdata.task_created_date).format("YYYY-MM-DD HH:mm:ss");
	// var taskappntStatusTimestamp = moment(taskdata.task_appointment_date).format("YYYY-MM-DD HH:mm:ss");
	if(primary == 1){
        var QRY_TO_EXEC = `insert into tasks (auto_assgn,primary_flag, mngr,circuit_id, task_no, service_no, parent_id, call_attend_by, call_type, task_type, task_status, task_category, task_other_issue, task_owner, task_message, task_created_date, emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
	(${taskdata.auto_assgn},1,0,'${taskdata.circuit_id}','${task_tckt}','${srvc_tckt}','${taskdata.task_id}','${call_attend_by}','${taskdata.call_type}','${taskdata.task_type}',218,'${taskdata.task_category}','${taskdata.task_other_issue}','${taskdata.task_owner}','${taskdata.task_message}','${taskStatusTimestamp}','${user.emp_id}','${taskdata.remarks}','${taskdata.task_priority}','${taskdata.emp_department_id}','${taskdata.task_latitude}','${taskdata.task_longitude}',current_timestamp(),'${data.task_appointment_date}','${taskdata.taskAddress}',${taskdata.task_pincode},'${taskdata.formId}',${taskdata.slaTime});`;
    }else if(primary == 2){
        //var QRY_TO_EXEC = `update tasks set primary_flag = 1 where parent_id = '${taskdata.task_id}' and call_attend_by = ${call_attend_by} and task_status != 271 order by task_id desc limit 1`
		if(second_primary == 1){
            console.log(second_primary,"in model second_primary")
            var QRY_TO_EXEC = `update tasks set primary_flag = 0 where parent_id = '${taskdata.task_id}' and call_attend_by = ${call_attend_by} and task_status != 271 order by task_id desc limit 1;
			`
			/*#update sub_tasks set primary_flag = 0 where parent_id = '${taskdata.task_id}' and call_attend_by = ${call_attend_by} and task_status != 271 order by task_id desc #limit 1;*/
        }else{
            console.log(second_primary,"in model else second_primary")
            var QRY_TO_EXEC = `update tasks set primary_flag = 1 where parent_id = '${taskdata.task_id}' and call_attend_by = ${call_attend_by} and task_status != 271 order by task_id desc limit 1;
			`
			/*#update sub_tasks set primary_flag = 1 where parent_id = '${taskdata.task_id}' and call_attend_by = ${call_attend_by} and task_status != 271 order by task_id desc #limit 1;*/
        }
    }else{
        var QRY_TO_EXEC = `insert into tasks (auto_assgn,primary_flag,mngr,circuit_id, task_no, service_no, parent_id, call_attend_by, call_type, task_type, task_status, task_category, task_other_issue, task_owner, task_message, task_created_date, emp_id, remarks, task_priority, emp_department_id, task_latitude, task_longitude, task_assigned_date, task_appointment_date, taskAddress, task_pincode, formId, slaTime) values 
	(${taskdata.auto_assgn},0,0,'${taskdata.circuit_id}','${task_tckt}','${srvc_tckt}','${taskdata.task_id}','${call_attend_by}','${taskdata.call_type}','${taskdata.task_type}',218,'${taskdata.task_category}','${taskdata.task_other_issue}','${taskdata.task_owner}','${taskdata.task_message}','${taskStatusTimestamp}','${user.emp_id}','${taskdata.remarks}','${taskdata.task_priority}','${taskdata.emp_department_id}','${taskdata.task_latitude}','${taskdata.task_longitude}',current_timestamp(),'${data.task_appointment_date}','${taskdata.taskAddress}',${taskdata.task_pincode},'${taskdata.formId}',${taskdata.slaTime});`;
    }
    
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insertintotasklogscallattendedbyMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.insertintotasklogscallattendedbyMdl = function(data, call_attend_by, task_id, user){
	var fnm = 'insertintotasklogscallattendedbyMdl';
	var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,tl_date_created,emp_id) values (${task_id},218,'${call_attend_by}',current_timestamp(),${user.emp_id});`;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}
// exports.insertintotasklogscallattendedbyMdl = function(data, call_attend_by, user){
// 	var fnm = 'insertintotasklogscallattendedbyMdl';
// 	var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,tl_date_created,emp_id) values (${data.task_id},218,'${call_attend_by}',current_timestamp(),${user.emp_id});`;
//     console.log(QRY_TO_EXEC);
// 	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
// }

/**************************************************************************************
* Controller     : empdsgnchckMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 09/05/2023  -  Ramesh - Initial Function
*
***************************************************************************************/

exports.empdsgnchckMdl = function (empid,user, callback) {
    var fnm = 'empdsgnchckMdl';
   
var QRY_TO_EXEC = ` select count(*) as ct from employees where emp_id in (${empid}) and emp_designation=231`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : gettaskbystatuscount
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  durga - Initial Function
*
***************************************************************************************/

exports.getcomplientsbymaincatidMdl = function (data,user, callback) {
    var fnm = 'gettasknotificationslistMdl';
   
   var QRY_TO_EXEC = ` select * from complaint_categories where main_cat_id = ${data.main_cat_id} and comp_status = 1`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : getstatuscountbycategoryMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik Allabaksh - Initial Function
*
***************************************************************************************/

exports.getstatuscountbycategoryMdl = function (data,user, callback) {
    var fnm = 'getstatuscountbycategoryMdl';
    /*if(data.task_category == 0){
        var QRY_TO_EXEC = `select count(t.task_id) as all_task_status_count,
        sum(case when t.task_status = 217  and t.parent_id is null  THEN 1 ELSE 0 END) as 'Open_217',
        sum(case when t.task_status = 218  and t.parent_id is null  THEN 1 ELSE 0 END) as 'Assigned_218',
        sum(case when t.task_status = 219   and t.parent_id is null THEN 1 ELSE 0 END) as 'Acknowledged_219',
        sum(case when t.task_status = 220  and t.parent_id is null THEN 1 ELSE 0 END) as 'Travel_220',
        sum(case when t.task_status = 221   and t.parent_id is null THEN 1 ELSE 0 END) as 'Onsite_Waiting_for_Access_221',
        sum(case when t.task_status = 222    and t.parent_id is null THEN 1 ELSE 0 END) as 'Access_Available_WIP_222',
        sum(case when t.task_status = 223   and t.parent_id is null THEN 1 ELSE 0 END) as 'Checklist_Submited_223',
        sum(case when t.task_status = 224    and t.parent_id is null THEN 1 ELSE 0 END) as 'UAT_224',
        sum(case when t.task_status = 225   and t.parent_id is null THEN 1 ELSE 0 END) as 'UAT-Accepted_225',
        sum(case when t.task_status = 226    and t.parent_id is null THEN 1 ELSE 0 END) as 'Complete_226',
        sum(case when t.task_status = 227   and t.parent_id is null THEN 1 ELSE 0 END) as 'Approved_227',
        sum(case when t.task_status = 271   and t.parent_id is null THEN 1 ELSE 0 END) as 'Field_Cancel_271',
        sum(case when t.task_status = 272   and t.parent_id is null THEN 1 ELSE 0 END) as 'Incomplete_272'
        from tasks as t where t.parent_id is null;`
       }else{
        var QRY_TO_EXEC = `select count(t.task_id) as all_task_status_count,
        sum(case when st_id.task_status = 217  and t.task_category = ${data.task_category} and t.parent_id is null  THEN 1 ELSE 0 END) as 'Open_217',
        sum(case when st_id.task_status = 218  and t.task_category = ${data.task_category} and t.parent_id is null  THEN 1 ELSE 0 END) as 'Assigned_218',
        sum(case when st_id.task_status = 219  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Acknowledged_219',
        sum(case when st_id.task_status = 220  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Travel_220',
        sum(case when st_id.task_status = 221  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Onsite_Waiting_for_Access_221',
        sum(case when st_id.task_status = 222 and t.task_category = ${data.task_category}  and t.parent_id is null THEN 1 ELSE 0 END) as 'Access_Available_WIP_222',
        sum(case when st_id.task_status = 223  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Checklist_Submited_223',
        sum(case when st_id.task_status = 224  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'UAT_224',
        sum(case when st_id.task_status = 225 and t.task_category = ${data.task_category}  and t.parent_id is null THEN 1 ELSE 0 END) as 'UAT_Accepted_225',
        sum(case when st_id.task_status = 226  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Complete_226',
        sum(case when st_id.task_status = 227  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Approved_227',
        sum(case when st_id.task_status = 271  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Field_Cancel_271',
        sum(case when st_id.task_status = 272  and t.task_category = ${data.task_category} and t.parent_id is null THEN 1 ELSE 0 END) as 'Incomplete_272'
        from tasks as t inner join tasks as st_id on st_id.parent_id = t.task_id where t.parent_id is null and st_id.primary_flag = 1;`;
       }*/
	   var cndtcn = ``
	   var taskchck = ``
	   if(data.task_category == 0){
		   cndtcn = ``
	   } else {
		   cndtcn = ` and t.task_category = ${data.task_category} `
	   }
	   var qry = ``
       let qry2 = ``
	   	if(user.emp_designation == 284){
			qry = ` `
		}else if (user.emp_designation == 234){

            /*let ids = user.cluster_id.split(',')
            if(ids.length == 1){
                qry = `  find_in_set(${ids[0]}, e.cluster_id)`
            }else{
                ids.forEach((id, i)=> {
                    qry = qry + `find_in_set(${id}, e.cluster_id)`
                    if(i <= (ids.length - 2)) qry = qry + ` or `
                })
            }
            qry = `and ` + `(` + qry + `)` */
			qry = `and (e.cluster_id in (${user.cluster_id}))`
			taskchck = `and (t.cluster_id in (${user.cluster_id}))`
		}else{
			qry = ` and (t.call_attend_by in (${user.emp_id}) or t.task_owner=${user.emp_id}) `
		} 

        if(data.search_like && data.search_like != ''){
            let firstThreeCharOfSearchTerm = data.search_like.slice(0,3)
        if(firstThreeCharOfSearchTerm == 'STT' || firstThreeCharOfSearchTerm == 'INC' || firstThreeCharOfSearchTerm.slice(0,2) == 'CS'){
            const ischildtaskornot =  data.search_like.indexOf('_') 
            if(ischildtaskornot != -1){
                data.search_like = data.search_like.slice(0,ischildtaskornot)
            }
        }
            qry2 = ` (t.parent_id is not null and t.primary_flag=1)  and (t.service_no like '%${data.search_like}%' or t.task_no like '%${data.search_like}%') ${qry}`
        }else{
            qry2 = ` ((t.parent_id is not null and t.primary_flag=1) or (t.parent_id is null and t.mngr = 1)) and 
            ((t.task_created_date) >= '${data.fromDate}' 
            and (t.task_created_date) <= '${data.toDate}')  ${qry}`
        }
		var QRY_TO_EXEC = `select count(t.task_id) as all_task_status_count,
        ifNull(sum(case when t.task_status = 217 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Open_217',
        ifNull(sum(case when t.task_status = 218 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Assigned_218',
        ifNull(sum(case when t.task_status = 219 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Acknowledged_219',
        ifNull(sum(case when t.task_status = 220 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Travel_220',
        ifNull(sum(case when t.task_status = 221 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Onsite_Waiting_for_Access_221',
        ifNull(sum(case when t.task_status = 222 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Access_Available_WIP_222',
        ifNull(sum(case when t.task_status = 223 ${cndtcn} THEN 1 ELSE 0 END),0) as 'UAT_223',
        ifNull(sum(case when t.task_status = 224 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Checklist_Submited_224',
        ifNull(sum(case when t.task_status = 225 ${cndtcn} THEN 1 ELSE 0 END),0) as 'UAT_Accepted_225',
        ifNull(sum(case when t.task_status = 226 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Complete_226',
        ifNull(sum(case when t.task_status = 227 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Approved_227',
        ifNull(sum(case when t.task_status = 271 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Field_Cancel_271',
        ifNull(sum(case when t.task_status = 272 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Incomplete_272',
        ifNull(sum(case when t.task_status = 407 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Rejected_from_SN_407',
        ifNull(sum(case when t.task_status = 402 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Access_Not_Available_402',
        ifNull(sum(case when t.task_status = 416 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Reject_416'
        from tasks as t
        left join employees as e on e.emp_id=t.call_attend_by
		#left join clusters as cl on  INSTR(cl.pincodes,t.task_pincode)
        left join circuits AS c ON t.circuit_id = c.circuit_id 
        where ${qry2} and t.task_status not in (408)`;
        /*var QRY_TO_EXEC = `select count(t.task_id) as all_task_status_count,
        ifNull(sum(case when t.task_status = 217 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Open_217',
        ifNull(sum(case when t.task_status = 218 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Assigned_218',
        ifNull(sum(case when t.task_status = 219 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Acknowledged_219',
        ifNull(sum(case when t.task_status = 220 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Travel_220',
        ifNull(sum(case when t.task_status = 221 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Onsite_Waiting_for_Access_221',
        ifNull(sum(case when t.task_status = 222 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Access_Available_WIP_222',
        ifNull(sum(case when t.task_status = 223 ${cndtcn} THEN 1 ELSE 0 END),0) as 'UAT_223',
        ifNull(sum(case when t.task_status = 224 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Checklist_Submited_224',
        ifNull(sum(case when t.task_status = 225 ${cndtcn} THEN 1 ELSE 0 END),0) as 'UAT_Accepted_225',
        ifNull(sum(case when t.task_status = 226 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Complete_226',
        ifNull(sum(case when t.task_status = 227 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Approved_227',
        ifNull(sum(case when t.task_status = 271 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Field_Cancel_271',
        ifNull(sum(case when t.task_status = 272 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Incomplete_272',
        ifNull(sum(case when t.task_status = 407 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Rejected_from_SN_407',
        ifNull(sum(case when t.task_status = 402 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Access_Not_Available_402'
        from tasks as t
        #join employees as e on e.emp_id=t.call_attend_by
		#left join clusters as cl on  INSTR(t.task_pincode,cl.pincodes)
		left join clusters as cl on  INSTR(cl.pincodes,t.task_pincode)
        where ${qry2} `;*/

	//    var cndtcn = ``
	//    if(data.task_category == 0){
	// 	   cndtcn = ``
	//    } else {
	// 	   cndtcn = ` and t.task_category = ${data.task_category} `
	//    }
	//    var qry = ``
	//    	if(user.emp_designation == 284){
	// 		qry = ` `
	// 	}else if (user.emp_designation == 234){

    //         let ids = user.cluster_id.split(',')
    //         if(ids.length == 1){
    //             qry = `  find_in_set(${ids[0]}, e.cluster_id)`
    //         }else{
    //             ids.forEach((id, i)=> {
    //                 qry = qry + `find_in_set(${id}, e.cluster_id)`
    //                 if(i <= (ids.length - 2)) qry = qry + ` or `
    //             })
    //         }
    //         qry = `and ` + `(` + qry + `)` 

	// 		//qry = `and (e.cluster_id in (${user.cluster_id}))`
	// 	}else{
	// 		qry = ` and (t.call_attend_by in (${user.emp_id}) or t.task_owner=${user.emp_id}) `
	// 	} 
    //     var QRY_TO_EXEC = `select count(t.task_id) as all_task_status_count,
    //     ifNull(sum(case when t.task_status = 217 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Open_217',
    //     ifNull(sum(case when t.task_status = 218 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Assigned_218',
    //     ifNull(sum(case when t.task_status = 219 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Acknowledged_219',
    //     ifNull(sum(case when t.task_status = 220 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Travel_220',
    //     ifNull(sum(case when t.task_status = 221 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Onsite_Waiting_for_Access_221',
    //     ifNull(sum(case when t.task_status = 222 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Access_Available_WIP_222',
    //     ifNull(sum(case when t.task_status = 223 ${cndtcn} THEN 1 ELSE 0 END),0) as 'UAT_223',
    //     ifNull(sum(case when t.task_status = 224 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Checklist_Submited_224',
    //     ifNull(sum(case when t.task_status = 225 ${cndtcn} THEN 1 ELSE 0 END),0) as 'UAT_Accepted_225',
    //     ifNull(sum(case when t.task_status = 226 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Complete_226',
    //     ifNull(sum(case when t.task_status = 227 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Approved_227',
    //     ifNull(sum(case when t.task_status = 271 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Field_Cancel_271',
    //     ifNull(sum(case when t.task_status = 272 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Incomplete_272',
    //     ifNull(sum(case when t.task_status = 407 ${cndtcn} THEN 1 ELSE 0 END),0) as 'Rejected_from_SN_407'
    //     from tasks as t
    //     join employees as e on e.emp_id=t.call_attend_by
    //     where ((t.parent_id is not null and t.primary_flag=1) or (t.parent_id is null and t.mngr = 1)) and 
    //     ((t.task_created_date) >= '${data.fromDate}' 
    //     and (t.task_created_date) <= '${data.toDate}') ${qry}`;

	   
	   
  
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : taskremainderMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.taskremainderMdl = function (data,user, callback) {
    var fnm = 'taskremainderMdl';
    let qry = ``

    if(data.emp_id){
        qry = qry + ` emp_id=${data.emp_id},`
    }

    if(data.emp_name){
        qry = qry + ` emp_name= '${data.emp_name}',`
    }
    if(data.emp_mobile){
        qry = qry + ` emp_mobile = ${data.emp_mobile},`
    }
    if(data.emp_email){
        qry = qry + ` emp_email = '${data.emp_email}'`
    }
   
    const cron_time = moment(data.appointment_date).subtract(parseInt(data.next_remainder_time), 'minutes').format("YYYY-MM-DD HH:mm:ss");
  
   var QRY_TO_EXEC = ` insert into task_remainder set i_ts = current_timestamp(), task_id = ${data.task_id},  fcm_id='${data.fcm_id}', 
   appointment_date= '${data.appointment_date}', next_remainder_time = '${data.next_remainder_time}', cron_time = '${cron_time}', 
   email_noti = ${data.email_noti}, sms_noti=${data.sms_noti},app_noti = ${data.app_noti}, ${qry}`;

    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : insertremaindernotifyMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.insertremaindernotifyMdl = function (data, user, callback) {
    var fnm = 'insertremaindernotifyMdl';
   
    var text = 'task remainder, task id is : '+ data.task_no+ '' ;
    var kind= 'Notifications';
	
   var QRY_TO_EXEC = ` insert into notification_log (emp_id,task_category,bodyMsg,message,dateCreated,status, notifi_type) values(${data.emp_id},'${data.task_category}','${text}','${kind}',current_timestamp(),1, 1) `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : sendtaskremainderMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function 21-04-2023
*
***************************************************************************************/

exports.sendtaskremainderMdl = function (data,user, callback) {
    var fnm = 'sendtaskremainderMdl';
   
   var QRY_TO_EXEC = `select tr.*, t.task_category, t.task_no from task_remainder as tr 
        join tasks as t  on t.task_id = tr.task_id 
        where (tr.cron_time) between now() and now() + interval ${data} minute;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : insertremaindernotifyMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/
// status 0 means notification has been seen
exports.taskremainderstatusupdateMdl = function (notificationid, user, callback) {
    var fnm = 'taskremainderstatusupdateMdl';
   
   var QRY_TO_EXEC = ` update notification_log set dateUpdated = current_timestamp(), status = 0 where id = ${notificationid}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : getcallattendednamesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/
exports.getcallattendednamesMdl = function (ids, user, callback) {
    var fnm = 'getcallattendednamesMdl';

   
   var QRY_TO_EXEC = `select group_concat(emp_name) as names, group_concat(emp_username) as user_name from employees where emp_id in (${ids});`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : getcallattendednamesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/
exports.statusfieldcancelledMdl = function (data, call_attend_by, user, callback) {
    var fnm = 'statusfieldcancelledMdl';

   var QRY_TO_EXEC = `update tasks set task_status = 408, primary_flag = 0 where parent_id = ${data.task_id} and call_attend_by = ${call_attend_by};`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : tasklogsstatusfieldcancelledMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/
exports.tasklogsstatusfieldcancelledMdl = function (data, call_attend_by, task_id,user) {
    var fnm = 'tasklogsstatusfieldcancelledMdl';

   var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,tl_date_created,emp_id) values (${task_id},408,'${call_attend_by}',current_timestamp(),${user.emp_id});`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
// exports.tasklogsstatusfieldcancelledMdl = function (data, call_attend_by, user, callback) {
//     var fnm = 'tasklogsstatusfieldcancelledMdl';

//    var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,tl_date_created,emp_id) values (${data.task_id},271,'${call_attend_by}',current_timestamp(),${user.emp_id});`;
//     console.log(QRY_TO_EXEC);
	
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

// };

/**************************************************************************************
* Controller     : getstatusfieldcancelledtaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/
exports.getstatusfieldcancelledtaskMdl = function (data, call_attend_by, user, callback) {
    var fnm = 'getstatusfieldcancelledtaskMdl';

   var QRY_TO_EXEC = `select * from tasks where parent_id = ${data.task_id} and call_attend_by = ${call_attend_by} and task_status = 408;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : childupatetaskdatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/05/2023   -  Ramesh - Initial Function
*
***************************************************************************************/

exports.childupatetaskdatafrservicenowMdl = function( task_id, task_status, main_task_id){
	var fnm = 'childupatetaskdatafrservicenowMdl';
    console.log("In model")
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.parent_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',SUBSTRING(service_no,1,length(service_no)-2) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						#(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e2.emp_mobile) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id where t2.parent_id=t.parent_id) as 'assignedToIDs',
						#for web assign members don't change this query
						concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select t2.service_no from tasks as t2 where t2.parent_id = t.parent_id and t2.primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then t.travel_distance else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						left join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${task_status}
						left join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						left join vendors as v on v.vendor_id=e.vendor_name
						where t.task_id='${task_id}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : childtaskdatafrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/05/2023   -  shaik Allabaksh - Initial Function
*
***************************************************************************************/

exports.childtaskdatafrservicenowMdl = function( task_id, task_status, main_task_id, cnt){
	var fnm = 'childtaskdatafrservicenowMdl';
    console.log("In model") 
	var evntid = ` s.sub_cat_name `
	if(cnt == 1){
		evntid = ` s.sub_cat_name `
	} else {
		evntid = ` 'Assignment Changed' `
	}
	var QRY_TO_EXEC = `select ${evntid} as 'eventId',t.parent_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',v2.vendor_name,'|',v.vendor_code,'|',e2.emp_mobile) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id left join vendors as v2 on v2.vendor_id=e2.vendor_name where t2.parent_id=t.parent_id and t2.task_status not in (271,408)) as 'assignedToIDs',
						#for web assign members don't change this query
						#concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where parent_id = ${main_task_id} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then t.travel_distance else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						left join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${task_status}
						left join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						left join vendors as v on v.vendor_id=e.vendor_name
						where t.task_id='${task_id}'`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : taskdatafrservicenowmngrapprlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrservicenowmngrapprlMdl = function(data,user){
	var fnm = 'taskdatafrservicenowmngrapprlMdl';
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.task_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						#(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e2.emp_mobile) from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id where t2.parent_id=t.parent_id) as 'assignedToIDs',
						concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
						(select service_no from tasks where parent_id = ${data.perent_task_id} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,c.submitted_tabs as checklistData,null as reasonCde,'' as attachments,
						e2.emp_id as modifiedBy,e2.emp_role as userRole,e2.emp_code as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then t.travel_distance else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${data.task_status}
						join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						left join checklist_submitted as c on c.checkListSysId=t.formId  and c.task_id=t.task_id
						join employees as e2 on e2.emp_id=${user.emp_id}
						left join vendors as v on v.vendor_id=e.vendor_name
						where t.task_id='${data.task_id}' order by c.chck_sub_id desc limit 1`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : mngrapprvetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/05/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.mngrapprvetaskMdl = function (data, user, callback) {
    var fnm = 'mngrapprvetaskMdl';
    let qry2 = ``
	var qry = ``;
	var primaryflag = ``;
    if(data.task_status == 227){
        qry2 = `update tasks set last_updated_time = current_timestamp(),approved_time= current_timestamp(), travel_change = 1, Approver ='${user.emp_name}', Approver_id = ${user.emp_id}, Approver_reason= '${data.comments}' where parent_id = ${data.perent_task_id};`
    }
	if(data.task_status == 271){
		primaryflag = ` ,primary_flag=0 `
	}

	var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp() , task_status = ${data.task_status} ${primaryflag} where task_id = ${data.task_id}; 
                        ${qry2}`;

	// var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp() , task_status = ${data.task_status} where task_id = ${data.task_id};`;
 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : mngrapprvetasklogMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/05/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.mngrapprvetasklogMdl = function (data, user, callback) {
    var fnm = 'mngrapprvetasklogMdl';

    let qry = ``
    if(data.comments){
        qry = ` ,comments = '${data.comments}'`
    }
    if(data.log_type){
        qry = qry + ` ,log_type = ${data.log_type}`
    }
    if(data.task_status){
        qry = qry + ` ,task_status = '${data.task_status}'`
    }
    if(data.call_attend_by){
        qry = qry + ` ,call_attend_by = '${data.call_attend_by}'`
    }

	var QRY_TO_EXEC = `insert into task_logs set task_id = ${data.task_id}, tl_date_created = current_timestamp(),distance =0, emp_id = ${user.emp_id} ${qry}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getnextstatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 10-05-23 - Initial Function
*
***************************************************************************************/

exports.getnextstatusMdl = function (data,user, callback) {
    var fnm = 'getnextstatusMdl';
   /*
    var QRY_TO_EXEC = `select sub_cat_name,sub_cat_id from sub_categories as sb join tasks as t on t.task_status + 1 = sb.sub_cat_id where t.task_id = ${data.task_id} and t.call_attend_by = ${user.emp_id} ; `;

	 */

    let qry = ``
	let casechck = (data.main_task_no).substring(0, 2);
	var prmytkt = 0;
	if(casechck.toUpperCase() == 'CS' && data.old_task_status == 222 && data.primary_flag == 1){
		prmytkt = 1
	}

    if(data.primary_flag == 0 && data.old_task_status == 225){
        qry = ` tn.primary_tkt = 1 and `
    }else{
        qry = ` tn.primary_tkt = 0 and `
        // qry = ` #tn.primary_tkt=${prmytkt} and `
    }

	var QRY_TO_EXEC = `select tn.task_id,tn.task_name from task_next_status as tn
	join tasks as t on FIND_IN_SET(t.task_status,tn.next_id) and t.task_id=${data.task_id}
	 where ${qry}
	 t.parent_id is not null ;`;
	 
	console.log(QRY_TO_EXEC);
    
	// let casechck = (data.main_task_no).substring(0, 2);
	// var prmytkt = 0;
	// if(casechck.toUpperCase() == 'CS' && data.old_task_status == 222 && data.primary_flag == 1){
	// 	prmytkt = 1
	// }
	// var QRY_TO_EXEC = `select tn.task_id,tn.task_name from task_next_status as tn
	// join tasks as t on FIND_IN_SET(t.task_status,tn.next_id) and t.task_id=${data.task_id}
	//  where #tn.primary_tkt=${prmytkt} and 
	//  t.parent_id is not null ;`;
	 
	// console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : getnextstatuswebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 10-05-23 - Initial Function
*
***************************************************************************************/

exports.getnextstatuswebMdl = function (data,user, callback) {
    var fnm = 'getnextstatuswebMdl';
   
    var QRY_TO_EXEC = `select sub_cat_name from sub_categories as sb join tasks as t on t.task_status + 1 = sb.sub_cat_id where t.parent_id = ${data.task_id} and t.emp_id = ${data.emp_id}  `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
	
/**************************************************************************************
* Controller     : getsecondary_to_primary_id
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.getsecondary_to_primary_id = function (data, call_attend_by, user, callback) {
    var fnm = 'getsecondary_to_primary_id';
  
    var QRY_TO_EXEC = `select * from tasks where primary_flag = 1 and parent_id = '${data.task_id}' and call_attend_by = ${call_attend_by} and task_status != 271`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : getsecondary_to_primary_id
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.update_task_appointment_dateMdl = function (data,  user, callback) {
    var fnm = 'update_task_appointment_date';
  
    var QRY_TO_EXEC = `update tasks set task_appointment_date = '${data.task_appointment_date}' where (parent_id = '${data.task_id}' or task_id = ${data.task_id}) and task_status not in (271,408)`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : get_primary_task_idMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.get_primary_task_idMdl = function (data,  user, callback) {
    var fnm = 'get_primary_task_idMdl';
  
    var QRY_TO_EXEC = `select * from tasks  where parent_id = '${data.task_id}' and primary_flag = 1 and task_status not in (271,408)`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
// mobile
/**************************************************************************************
* Controller     : make_secondary_to_primaryMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.make_secondary_to_primaryMdl = function (data,  user, callback) {
    var fnm = 'make_secondary_to_primaryMdl';
	var prmyflg = ``
	if(data.task_status == 271){
		prmyflg = `,primary_flag=0`
	}
    // var QRY_TO_EXEC = `select * from tasks where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id}
                                // and primary_flag = 1 and task_status = 271;`;
		var QRY_TO_EXEC = `update tasks set  last_updated_time = current_timestamp(), task_status = ${data.task_status} ${prmyflg} where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id};`						
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : make_secondaryid_to_primaryidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.make_secondaryid_to_primaryidMdl = function (data, task, user, callback) {
    var fnm = 'make_secondaryid_to_primaryidMdl';
  
    var QRY_TO_EXEC = `update tasks set primary_flag = 0, task_status = 271 where parent_id = ${data.parent_id} and call_attend_by=${user.emp_id} and primary_flag = 1;
                       update tasks set primary_flag  = 1 where task_id = ${task.task_id} and task_status not in (271,408,407) order by task_id asc limit 1;`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : make_secondary_to_primaryMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.arethere_secondary_Mdl = function (data,  user, callback) {
    var fnm = 'arethere_secondary_Mdl';
  
    var QRY_TO_EXEC = `select * from tasks where parent_id = ${data.parent_id}
                                and primary_flag = 0 and task_status not in (271,408,407)`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : make_secondary_to_primaryMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.getnew_primary_Mdl = function (data,  user, callback) {
    var fnm = 'getnew_primary_Mdl';
  
    var QRY_TO_EXEC = `select * from tasks where parent_id = ${data.parent_id}
    and primary_flag = 0 and task_status not in (271,408,407) order by task_id asc limit 1;`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};
/**************************************************************************************
* Controller     : childtaskdatafrservicenow_for_secondary_to_primary_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/05/2023   -  shaik Allabaksh - Initial Function
*
***************************************************************************************/
exports.childtaskdatafrservicenow_for_secondary_to_primary_Mdl = function(data, parent_id, task_id, task_status, service_no){
        var fnm = 'childtaskdatafrservicenow_for_secondary_to_primary_Mdl';
    console.log("In model")

    var QRY_TO_EXEC = `select  'Assignment Changed' as 'eventId',t.parent_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
                            null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
                            unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
                            '${service_no}' as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
                            null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
                            t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,0 as travelledDistance,null as identity,'false' as isAutoAssigned,
                            '' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
                            left join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${task_status}
                            left join employees as e on find_in_set(e.emp_id,t.call_attend_by)
                            left join vendors as v on v.vendor_id=e.vendor_name
                            where t.task_id='${task_id}'`
    console.log(QRY_TO_EXEC);
        return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : childtaskdatafrservicenow_for_old_primary_field_cancel_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/05/2023   -  shaik Allabaksh - Initial Function
*
***************************************************************************************/
exports.childtaskdatafrservicenow_for_old_primary_field_cancel_Mdl = function(data,user){
    var fnm = 'childtaskdatafrservicenow_for_old_primary_field_cancel_Mdl';
console.log("In model")

var QRY_TO_EXEC = `select s.sub_cat_name  as 'eventId',t.parent_id as id,t.task_latitude as 'taskLatitude',t.task_longitude as 'taskLongitude',null as 'taskType',null as 'priority',
                        null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
                        unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',v.vendor_name,'|',v.vendor_code,'|',e.emp_mobile) as 'assignedToIDs',
                        (select service_no from tasks where parent_id = ${data.task_id} and primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
                        null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
                        t.emp_id as modifiedBy,null as userRole,null as managerId,null as deviceIdentity,null as recordedHardware,0 as travelledDistance,null as identity,'false' as isAutoAssigned,
                        '' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
                        left join sub_categories as s on s.cat_id=9 and s.sub_cat_id=${data.task_status}
                        left join employees as e on find_in_set(e.emp_id,t.call_attend_by)
                        left join vendors as v on v.vendor_id=e.vendor_name
                        where t.task_id='${data.task_id}'`
console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/******************************
* Controller     : taskdatanotesfrservicenowMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/05/2023   -  Ramesh patlola  - Initial Function
*
*****************************/
exports.taskdatanotesfrservicenowMdl = function (data, user, callback) {
    var fnm = 'taskdatanotesfrservicenowMdl';

	var QRY_TO_EXEC = `select note from tasks_documents_notes where task_id =  ${data.task_id} and note_type=1 order by task_doc_id desc limit 1;`;
 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : is_user_in_travel_status_for_another_taskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/

exports.is_user_in_travel_status_for_another_taskMdl = function (data,  user, callback) {
    var fnm = 'is_user_in_travel_status_for_another_taskMdl';
    var QRY_TO_EXEC = `select * from tasks as t 
                        where t.task_status=220 and t.call_attend_by = ${user.emp_id} and travel_change=0;`;
   
    // var QRY_TO_EXEC = `select * from tasks where call_attend_by = ${user.emp_id} and task_status = 220;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : is_user_in_travel_status_for_another_task_web_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 25-05-23 - Initial Function
*
***************************************************************************************/

exports.is_user_in_travel_status_for_another_task_web_Mdl = function (data,  user, callback) {
    var fnm = 'is_user_in_travel_status_for_another_task_web_Mdl';
    
    var QRY_TO_EXEC = `select * from tasks as t 
    where t.task_status=220 and t.call_attend_by = ${data.call_attend_by} and travel_change=0;`;
   
    // var QRY_TO_EXEC = `select * from tasks where call_attend_by = ${data.call_attend_by} and task_status = 220;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : gettrvldstnceMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettrvldstnceMdl = function (data, user, callback) {
    var fnm = 'gettrvldstnceMdl';
	if(data.task_status == 221 || data.task_status == 271 ){
		var QRY_TO_EXEC = `SELECT concat(task_log_lat,'%2C',task_log_long) as lat_long,task_status, ROW_NUMBER() OVER (PARTITION BY task_id ORDER BY task_status asc) AS n
    FROM task_logs where task_id=${data.task_id} and (task_status =220 or task_status=221 or task_status=271)  group by task_status`
		/*var QRY_TO_EXEC = `select group_concat(task_log_lat,'%2C',task_log_long) as lat_long,task_status from task_logs 
		where task_id=${data.task_id} and (task_status =220 or task_status=221 or task_status=271) group by task_status order by task_status asc`*/
		/*var QRY_TO_EXEC = `select ifNull(sum(tg.distance),0) as dst from travel_emp_gps_info as tg where tg.emp_id=${data.call_attend_by} and tg.dateCreated between 
						(select tl_date_created from tasks as tt
						join task_logs as tl on tt.task_id=tl.task_id
						where tl.task_status=220 and (tt.parent_id=${data.task_id} or tt.task_id=${data.task_id} ) and tt.call_attend_by=${data.call_attend_by}) 
						and (select tl_date_created from tasks as tt
						join task_logs as tl on tt.task_id=tl.task_id
						where tl.task_status=221 and (tt.parent_id=${data.task_id} or tt.task_id=${data.task_id} ) and tt.call_attend_by=${data.call_attend_by})`;*/
	} else { 
		return new Promise((resolve, reject) => {
			resolve(true)
		})
	}
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : get_sub_tasks_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 31-05-23 - Initial Function
*
***************************************************************************************/

exports.get_sub_tasks_web_Mdl = function (data, user) {
    var fnm = 'get_sub_tasks_Mdl';
   
    var QRY_TO_EXEC = `select * from tasks where parent_id in (select parent_id from tasks where task_id = ${data.task_id}) and primary_flag = 0 and task_status not in (408, 407, 271)`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : insert_into_task_logs_when_field_canceled_web_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 31-05-23 - Initial Function
*
***************************************************************************************/
exports.insert_into_task_logs_when_field_canceled_web_Mdl = function (data, tasks, user) {
    var fnm = 'insert_into_task_logs_when_field_canceled_web_Mdl';
   
    var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp(),primary_flag=1  where task_id = ${tasks.task_id} ;`
    
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*exports.insert_into_task_logs_when_field_canceled_web_Mdl = function (data, tasks, user) {
    var fnm = 'insert_into_task_logs_when_field_canceled_web_Mdl';
    var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,emp_id,tl_date_created,log_type)`;
    var counter = 0;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
        let datafilter = function(index){
       //for(let i = 0; i<tasks.length; i++){
        counter ++
        if(tasks.length == counter){
            dlmtr = `;`
        }
        valQry += `(${tasks[index].task_id},271,'${tasks[i].call_attend_by}',
                '${data.emp_id}',CURRENT_TIMESTAMP(),
                1)${dlmtr}`;
				if(index == tasks.length -1){
                        console.log("ompleted")
                    } else {
                        datafilter(index + 1)
                    }
            //}
                } 
                datafilter(0)
   
       QRY_TO_EXEC = QRY_TO_EXEC + valQry + ` 
       update tasks set last_updated_time = current_timestamp(), task_status = 271 where parent_id = ${data.perent_task_id} and primary_flag = 0 and task_status != 271 and task_status != 408 and task_status != 407;`
    
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};*/

/**************************************************************************************
* Controller     : get_sub_tasks_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

exports.get_sub_tasks_Mdl = function (data, user) {
    var fnm = 'get_sub_tasks_Mdl';
   
    var QRY_TO_EXEC = `select * from tasks where parent_id = ${data.parent_id} and task_status != 271 and primary_flag = 0 and task_status != 408 and task_status != 407`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : get_sub_tasks_logs_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

exports.get_sub_tasks_logs_Mdl = function (tasks, user) {
    var fnm = 'get_sub_tasks_logs_Mdl';
    let QRY_TO_EXEC = []
    let datafilter = function(index){
    //for(let i = 0; i<tasks.length; i++){
        QRY = `select * from task_logs where task_id = ${tasks[index].task_id} and task_status = ${tasks[index].task_status};`
        QRY_TO_EXEC.push(QRY)
		if(index == tasks.length -1){
            console.log("ompleted")
        } else {
            datafilter(index + 1)
        }
    //}
    } 
    datafilter(0) 
    console.log(QRY_TO_EXEC);
	
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : get_emp_gps_info_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

exports.get_emp_gps_info_Mdl = function (tasks, user) {
    var fnm = 'get_emp_gps_info_Mdl';
    let QRY_TO_EXEC = []
    console.log("in get_emp_gps_info_Mdl")
    let datafilter = function(index){
    //for(let i = 0; i<tasks.length; i++){
        QRY = `select * from emp_gps_info where emp_id = ${tasks[index].call_attend_by} order by gps_id desc limit 1;`
        QRY_TO_EXEC.push(QRY)
		if(index == tasks.length -1){
            console.log("ompleted")
        } else {
            datafilter(index + 1)
        }
//}
    } 
    datafilter(0)
    console.log(QRY_TO_EXEC);
	
    return dbutil.execTrnsctnQuery(sqldb.BatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

// exports.get_emp_gps_info_Mdl = function (task_logs, user) {
//     var fnm = 'get_emp_gps_info_Mdl';
//     let QRY_TO_EXEC = []
//     console.log("in get_emp_gps_info_Mdl")
//     for(let i = 0; i<task_logs.length; i++){
//         QRY = `select * from emp_gps_info where emp_id = ${task_logs[i][0].call_attend_by} order by gps_id desc limit 1;`
//         QRY_TO_EXEC.push(QRY)
//     }
//     console.log(QRY_TO_EXEC);
	
//     return dbutil.execTrnsctnQuery(sqldb.BatchConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

// };


/**************************************************************************************
* Controller     : insert_into_task_logs_when_field_canceled
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

/**************************************************************************************
* Controller     : insert_into_task_logs_when_field_canceled_web_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 31-05-23 - Initial Function
*
***************************************************************************************/
exports.insert_into_task_logs_when_field_canceled = function (data,distance, tasks, emp_gps_info, user) {
    var fnm = 'insert_into_task_logs_when_field_canceled';
   
    var fnm = 'insert_into_task_logs_when_field_canceled';
    var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,emp_id,tl_date_created,log_type,task_log_lat,task_log_long,distance,full_addr)`;
    var counter = 0;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
       let datafilter = function(index){
       //for(let i = 0; i<tasks.length; i++){
        counter ++
        if(tasks.length == counter){
            dlmtr = `;`
        }
        valQry += `(${tasks[index].task_id},271,'${tasks[index].call_attend_by}',
                '${user.emp_id}',CURRENT_TIMESTAMP(),
                2, 
                ${emp_gps_info[index][0].gps_lat}, 
                ${emp_gps_info[index][0].gps_lang},
                '${distance[index]}','${JSON.stringify(data.full_addr).replace(/'/g, "''")}')${dlmtr}`;
				if(index == tasks.length -1){
                    console.log("ompleted")
                } else {
                    datafilter(index + 1)
                }
        //}
            } 
            datafilter(0)
   
       QRY_TO_EXEC = QRY_TO_EXEC + valQry + `update tasks set last_updated_time = current_timestamp(),primary_flag=1  where task_id = ${tasks.task_id} ;`
    
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/*exports.insert_into_task_logs_when_field_canceled = function (data,distance, tasks, emp_gps_info, user) {
    var fnm = 'insert_into_task_logs_when_field_canceled';
    var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,emp_id,tl_date_created,log_type,task_log_lat,task_log_long,distance,full_addr)`;
    var counter = 0;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
       let datafilter = function(index){
       //for(let i = 0; i<tasks.length; i++){
        counter ++
        if(tasks.length == counter){
            dlmtr = `;`
        }
        valQry += `(${tasks[index].task_id},271,'${tasks[index].call_attend_by}',
                '${user.emp_id}',CURRENT_TIMESTAMP(),
                2, 
                ${emp_gps_info[index][0].gps_lat}, 
                ${emp_gps_info[index][0].gps_lang},
                '${distance[index]}','${JSON.stringify(data.full_addr).replace(/'/g, "''")}')${dlmtr}`;
				if(index == tasks.length -1){
                    console.log("ompleted")
                } else {
                    datafilter(index + 1)
                }
        //}
            } 
            datafilter(0)
   
       QRY_TO_EXEC = QRY_TO_EXEC + valQry + ` 
       update tasks set last_updated_time = current_timestamp(), task_status = 271 where parent_id = ${data.parent_id} and primary_flag = 0 and task_status != 271 and task_status != 408 and task_status != 407;`
    
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};*/
// exports.insert_into_task_logs_when_field_canceled = function (data,distance, taskLog, emp_gps_info, user) {
//     var fnm = 'insert_into_task_logs_when_field_canceled';
//     var QRY_TO_EXEC = `insert into task_logs (task_id,task_status,call_attend_by,emp_id,tl_date_created,log_type,task_log_lat,task_log_long,distance,full_addr)`;
//     var counter = 0;
//     var dlmtr = ', ';
//     var valQry = ' VALUES ';
//        for(let i = 0; i<taskLog.length; i++){
//         counter ++
//         if(taskLog.length == counter){
//             dlmtr = `;`
//         }
//         valQry += `(${taskLog[i][0].task_id},271,'${taskLog[i][0].call_attend_by}',
//                 '${user.emp_id}',CURRENT_TIMESTAMP(),
//                 2, 
//                 ${emp_gps_info[i][0].gps_lat}, 
//                 ${emp_gps_info[i][0].gps_lang},
//                 '${distance[i]}',"${data.full_addr}")${dlmtr}`;

//        }
   
//        QRY_TO_EXEC = QRY_TO_EXEC + valQry + ` 
//        update tasks set last_updated_time = current_timestamp(), task_status = 271 where parent_id = ${data.parent_id} and primary_flag = 0 and task_status != 271 and task_status != 408 and task_status != 407;`
    
//     console.log(QRY_TO_EXEC);
	
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

// };


/**************************************************************************************
* Controller     : returndistance_get_employee_ids_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 24-05-23 - Initial Function
*
***************************************************************************************/

exports.returndistance_get_employee_ids_Mdl = function (data,  user, callback) {
    var fnm = 'returndistance_get_employee_ids_Mdl';
    let qry = ``
    let todaysstartTime 
    let todaysendTime
    if(data.todaysstartTime  && data.todaysendTime && data.todaysstartTime != '' && data.todaysendTime != ''){
        todaysstartTime = data.todaysstartTime
        todaysendTime = data.todaysendTime
    }else{
        todaysstartTime = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
        todaysendTime =  moment().endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    }

    if(data.call_attend_by && data.call_attend_by != '' && data.call_attend_by != null && data.call_attend_by != undefined){
        qry = ` and call_attend_by = ${data.call_attend_by}`
    }

    var QRY_TO_EXEC = `select distinct(call_attend_by) as employee_ids from tasks where parent_id is not null
    and ( (task_created_date) <= '${todaysendTime}' 
    and (task_created_date) >= '${todaysstartTime}') ${qry}`;
    
    // var QRY_TO_EXEC = `select distinct(call_attend_by) as employee_ids from tasks where  
    //  (task_created_date) <= '${todaysendTime}' 
    // and (task_created_date) >= '${todaysstartTime}'`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : returndistance_getMissemployee_ids_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20-07-23  -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/

exports.returndistance_getMissemployee_ids_Mdl = function (data,  user, callback) {
    var fnm = 'returndistance_getMissemployee_ids_Mdl';
    let qry = ``
    let todaysstartTime 
    let todaysendTime
    /*if(data.todaysstartTime  && data.todaysendTime && data.todaysstartTime != '' && data.todaysendTime != ''){
        todaysstartTime = data.todaysstartTime
        todaysendTime = data.todaysendTime
    }else{*/
        todaysstartTime = moment().subtract(1, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
        todaysendTime =  moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    /*}

    if(data.call_attend_by && data.call_attend_by != '' && data.call_attend_by != null && data.call_attend_by != undefined){
        qry = ` and call_attend_by = ${data.call_attend_by}`
    }*/
   
    
    var QRY_TO_EXEC = `select distinct(call_attend_by) as 'employee_ids' from task_logs where (task_status = 226 or task_status=221) and (tl_date_created) between  '${todaysstartTime}' and '${todaysendTime}'
	and call_attend_by not in (select call_attend_by from task_logs where comments = 'Return Distance' and date(tl_date_created) = curdate() - interval 1 day ) and (comments not in ('Return Distance') or comments is null)
     group by call_attend_by order by tl_date_created desc`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : returndistancetaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 24-05-23 - Initial Function
*
***************************************************************************************/

exports.returndistance_task_logsMdl = function (data, call_attend_by, user) {
    var fnm = 'returndistance_task_logsMdl';
    let todaysstartTime 
    let todaysendTime

    if(data.todaysstartTime  && data.todaysendTime && data.todaysstartTime != '' && data.todaysendTime != ''){
        todaysstartTime = data.todaysstartTime
        todaysendTime = data.todaysendTime
    }else{
        todaysstartTime = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
        todaysendTime =  moment().endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    }
   
    var QRY_TO_EXEC = `select * from task_logs where call_attend_by = '${call_attend_by}'
    and ((tl_date_created) <= '${todaysendTime}' 
    and (tl_date_created) >= '${todaysstartTime}') and (task_status = 221 or task_status=226)
    and task_log_lat is not null order by tl_id desc limit 1;`;
    console.log(QRY_TO_EXEC);
	console.log("oooooooooooooo")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : returnMissdistance_task_logsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 24-05-23 - Initial Function
*
***************************************************************************************/

exports.returnMissdistance_task_logsMdl = function (data, call_attend_by, user) {
    var fnm = 'returnMissdistance_task_logsMdl';
    let todaysstartTime 
    let todaysendTime

    /*if(data.todaysstartTime  && data.todaysendTime && data.todaysstartTime != '' && data.todaysendTime != ''){
        todaysstartTime = data.todaysstartTime
        todaysendTime = data.todaysendTime
    }else{*/
        todaysstartTime = moment().subtract(1, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
        todaysendTime =  moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    //}
   
    var QRY_TO_EXEC = `select * from task_logs where call_attend_by = '${call_attend_by}'
    and ((tl_date_created) <= '${todaysendTime}' 
    and (tl_date_created) >= '${todaysstartTime}') and (task_status = 221 or task_status=226)
    and task_log_lat is not null order by tl_id desc limit 1;`;
    console.log(QRY_TO_EXEC);
	console.log("oooooooooooooo")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : returndistanceNullTasklogsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 31-07-2023  -  Ramesh patlola  - Initial Function
*
***************************************************************************************/

exports.returndistanceNullTasklogsMdl = function (data, call_attend_by, user) {
    var fnm = 'returndistanceNullTasklogsMdl';
    let todaysstartTime 
    let todaysendTime

    if(data.todaysstartTime  && data.todaysendTime && data.todaysstartTime != '' && data.todaysendTime != ''){
        todaysstartTime = data.todaysstartTime
        todaysendTime = data.todaysendTime
    }else{
        todaysstartTime = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
        todaysendTime =  moment().endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    }
   
    var QRY_TO_EXEC = `select * from task_logs where call_attend_by = '${call_attend_by}'
    and ((tl_date_created) <= '${todaysendTime}' 
    and (tl_date_created) >= '${todaysstartTime}') and (task_status = 221 or task_status=226) order by tl_id desc limit 1;`;
    console.log(QRY_TO_EXEC);
	console.log("oooooooooooooo")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : returndistanceMissNullTasklogsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 31-07-2023  -  Ramesh patlola  - Initial Function
*
***************************************************************************************/

exports.returndistanceMissNullTasklogsMdl = function (data, call_attend_by, user) {
    var fnm = 'returndistanceMissNullTasklogsMdl';
    let todaysstartTime 
    let todaysendTime

    /*if(data.todaysstartTime  && data.todaysendTime && data.todaysstartTime != '' && data.todaysendTime != ''){
        todaysstartTime = data.todaysstartTime
        todaysendTime = data.todaysendTime
    }else{*/
        todaysstartTime = moment().subtract(1, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
        todaysendTime =  moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    //}
   
    var QRY_TO_EXEC = `select * from task_logs where call_attend_by = '${call_attend_by}'
    and ((tl_date_created) <= '${todaysendTime}' 
    and (tl_date_created) >= '${todaysstartTime}') and (task_status = 221 or task_status=226) order by tl_id desc limit 1;`;
    console.log(QRY_TO_EXEC);
	console.log("oooooooooooooo")
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : getemployeebaselocationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 25-05-23 - Initial Function
*
***************************************************************************************/

exports.getemployeebaselocationMdl = function (call_attend_by, user) {
    var fnm = 'getemployeebaselocationMdl';
   
    var QRY_TO_EXEC = `select emp_latitude as emp_latitude, emp_longitude as emp_longitude from employees where emp_id = ${call_attend_by}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};



/**************************************************************************************
* Controller     : insertdistanceintotask_logs_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

exports.insertdistanceintotask_logs_Mdl = function (data, distance, taskLog, user) {
    var fnm = 'insertdistanceintotask_logs_Mdl';

    let qry = ``
    if(data.tl_date_created && data.tl_date_created != ''){
     qry = `tl_date_created = '${data.tl_date_created}'`
    }else{
     qry = `tl_date_created = current_timestamp()`
    }
     var QRY_TO_EXEC = `insert into task_logs set task_id = ${taskLog.task_id}, 
     task_status=${taskLog.task_status}, call_attend_by=${taskLog.call_attend_by}, 
     comments= 'Return Distance', ${qry}, distance = '${distance}';
     update tasks set return_distance = ${distance} where task_id = ${taskLog.task_id};`;
     console.log(QRY_TO_EXEC);
   
    // var QRY_TO_EXEC = `insert into task_logs set task_id = ${taskLog.task_id}, 
    // task_status=${taskLog.task_status}, call_attend_by=${taskLog.call_attend_by}, 
    // comments= 'Return Distance', tl_date_created = current_timestamp(), distance = '${distance}'`;
    // console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : insertMissdistanceintotask_logs_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

exports.insertMissdistanceintotask_logs_Mdl = function (data, distance, taskLog, user) {
    var fnm = 'insertMissdistanceintotask_logs_Mdl';

    let qry = ``
	let todaysendTime =  moment().subtract(1, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()
    /*if(data.tl_date_created && data.tl_date_created != ''){
     qry = `tl_date_created = '${data.tl_date_created}'`
    }else{*/
     qry = `tl_date_created = '${todaysendTime}'`
    //}
     var QRY_TO_EXEC = `insert into task_logs set task_id = ${taskLog.task_id}, 
     task_status=${taskLog.task_status}, call_attend_by=${taskLog.call_attend_by}, 
     comments= 'Return Distance', ${qry}, distance = '${distance}';
     update tasks set return_distance = ${distance} where task_id = ${taskLog.task_id};`;
     console.log(QRY_TO_EXEC);
   
    // var QRY_TO_EXEC = `insert into task_logs set task_id = ${taskLog.task_id}, 
    // task_status=${taskLog.task_status}, call_attend_by=${taskLog.call_attend_by}, 
    // comments= 'Return Distance', tl_date_created = current_timestamp(), distance = '${distance}'`;
    // console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : gettasks
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/


exports.gettasks = function (data, user) {
    var fnm = 'gettasks';
   
    var QRY_TO_EXEC = `select * from tasks where parent_id is not null and (task_created_date)  between '${data.fromdate}' and '${data.todate}' order by task_id asc;`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : gettasktrvldstnceMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/


exports.gettasktrvldstnceMdl = function (task_id, user, callback) {
    var fnm = 'gettasktrvldstnceMdl';
	
    var QRY_TO_EXEC = `select group_concat(task_log_lat,'%2C',task_log_long) as lat_long,task_status from task_logs 
    where task_id=${task_id} and (task_status =220 or task_status=221 or task_status=271) group by task_status order by task_status asc`

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : updatetask_distance_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 26-05-23 - Initial Function
*
***************************************************************************************/

exports.updatetask_distance_Mdl = function (task_id, user, distance, callback) {
    var fnm = 'updatetask_distance_Mdl';
    // let qry = ``
    // let qry2 = ``;

    // if(data.task_status || data.task_status == 0){
    //     qry = qry + `, task_status = ${data.task_status}`
    // }


    // if(data.task_status == 226){
    //     qry = qry + `, task_closed_time = current_timestamp()`
    // }

    // if(data.task_status == 220){
    //     qry = qry + `,travel_flg = 1`
    // }
   

	var QRY_TO_EXEC = `update tasks set travel_distance = ${distance}  where task_id = ${task_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : utilizationWebReduceCountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.utilizationWebReduceCountMdl = function(data,empassgnId ){
	var fnm = 'utilizationWebReduceCountMdl';
    if(data.task_status == 271 || data.task_status == 226){
		var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count - 1 where date(i_ts)=curdate() and emp_id in (${empassgnId}) and utilization_count>0`
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
    }else{
        return new Promise((resolve, reject) => {
			resolve(true)
		})
    }

}

/**************************************************************************************
* Controller     : utilizationUserReduceCountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.utilizationUserReduceCountMdl = function(empassgnId ){
	var fnm = 'utilizationUserReduceCountMdl';
	var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count - 1 where date(i_ts)=curdate() and emp_id in (${empassgnId}) and utilization_count>0`
	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);

}

/**************************************************************************************
* Controller     : childtaskriggerdatafrutilizationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.childtaskriggerdatafrutilizationMdl = function(data){
	var fnm = 'childtaskriggerdatafrutilizationMdl'; 
	var QRY_TO_EXEC = `select group_concat(distinct(call_attend_by)) as call_attnd from tasks where task_id='${data.task_id}' and task_status not in (271,408,407) ;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : utilizationReduceCountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.utilizationReduceCountMdl = function(empassgnId ){
	var fnm = 'utilizationReduceCountMdl';
	var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count - 1 where date(i_ts)=curdate() and emp_id in (${empassgnId}) and utilization_count>0`
	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);

}

/**************************************************************************************
* Controller     : childtaskdatafrutilizationMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.childtaskdatafrutilizationMdl = function(data, taskdata){
	var fnm = 'childtaskdatafrutilizationMdl';
	var QRY_TO_EXEC = `select group_concat(distinct(call_attend_by)) as call_attnd from tasks where parent_id='${data.parent_id}' and task_status not in (271,408,407) ;`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : updateAddattdnceWebofemolyeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.updateAddattdnceWebofemolyeeMdl = function(empassgnId ){
	var fnm = 'updateAddattdnceWebofemolyeeMdl';
	var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count + 1 where date(i_ts)=curdate() and emp_id in (${empassgnId})`
	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);

}

/**************************************************************************************
* Controller     : updateattdnceWebofemolyeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.updateattdnceWebofemolyeeMdl = function(empassgnId ){
	var fnm = 'updateattdnceWebofemolyeeMdl';
	var QRY_TO_EXEC = `update attendence set utilization_count = utilization_count - 1 where date(i_ts)=curdate() and emp_id in (${empassgnId}) and utilization_count>0`
	console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);

}


/**************************************************************************************
* Controller     : getemployeesspecifictomanagerMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik - Initial Function
*
***************************************************************************************/

exports.getemployeesspecifictomanagerMdl = function (data,user) {
    var fnm = 'getemployeesspecifictomanagerMdl';
    let qry = ``

    const yesterdayMidnightTime = moment().subtract(1, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss").toString()      
    const todaysMidNightTime =  moment().endOf('day').format("YYYY-MM-DD HH:mm:ss").toString()

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
        qry =  `(` + qry + `)` + ` and e.emp_designation not in (234,284) and e.emp_status = 1 and e.lock_user=1  group by e.emp_id order by emp_name asc`    
    }else if(user.emp_designation == 284){
        qry =   `  e.emp_designation not in (234,284) and e.emp_status = 1 and e.lock_user=1  group by e.emp_id order by emp_name asc`    
    }
   
    var QRY_TO_EXEC = `select e.*, count(distinct(t.task_id)) as task_count,
    ifnull(a.emp_sts,1) as attendence_status from employees as e 
    left join tasks as t on e.emp_id = t.call_attend_by and ((t.task_created_date) between '${yesterdayMidnightTime}'and '${todaysMidNightTime}') 
    left join attendence as a on a.emp_id = e.emp_id and date(a.punch_in_time) = curdate()
    where ${qry};`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/**************************************************************************************
* Controller     : gettaskhardwareuseddataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Shaik  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwareuseddataMdl = function(data, user){
	var fnm = 'gettaskhardwareuseddataMdl';
	var QRY_TO_EXEC = `select hw_partcode,no_of_units_used,hw_desc, id from task_hw_used where task_id = ${data.task_id}  OR task_id IN (select task_id from tasks where parent_id = ${data.task_id});`;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}



/**************************************************************************************
* Controller     : updatetaskhardwareMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/07/2023   -  Shaik  - Initial Function
*
***************************************************************************************/
exports.updatetaskhardwareMdl = function(data, user){
	var fnm = 'updatetaskhardwareMdl';
    let qry =``

    if(data.hw_partcode){
        qry = qry + ` ,hw_partcode = '${data.hw_partcode}'`
    }
    if(data.no_of_units_used){
        qry = qry + ` ,no_of_units_used = ${data.no_of_units_used} `
    }
    if(data.hw_desc){
        qry = qry + ` ,hw_desc = '${data.hw_desc}' `
    }
    if(data.hw_id){
        qry = qry + ` ,hw_id = '${data.hw_id}' `
    }
    if(data.cat_id){
        qry = qry + ` ,cat_id = '${data.cat_id}' `
    }
	var QRY_TO_EXEC = `update task_hw_used set u_ts = current_timestamp() ${qry} where id = ${data.id};`;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}


/**************************************************************************************
* Controller     : gettaskhardwarebyidMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 27/07/2023   -  Shaik  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwarebyidMdl = function(id, user){
	var fnm = 'gettaskhardwarebyidMdl';
	var QRY_TO_EXEC = `select hw_partcode,no_of_units_used,hw_desc, id, cat_id, hw_id from task_hw_used where id = ${id};`;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : gettaskhardwarebypartcodeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 31/07/2023   -  Shaik  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwarebypartcodeMdl = function(data, user){
	var fnm = 'gettaskhardwarebypartcodeMdl';
	var QRY_TO_EXEC = `select id, cat_id, part_code, hw_desc from hard_ware where part_code = '${data.part_code}';`;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}


/**************************************************************************************
* Controller     : prmyScndChckMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/08/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.prmyScndChckMdl = function (data, user, callback) {
    var fnm = 'prmyScndChckMdl'; 
 
	var QRY_TO_EXEC = `SELECT primary_flag from tasks where task_id=${data.task_id}`;
     
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : gettaskhardwarebycallattendedbyMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 31/07/2023   -  Shaik  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwarebycallattendedbyMdl = function(data, user){
	var fnm = 'gettaskhardwarebycallattendedbyMdl';
	var QRY_TO_EXEC = `select hw_partcode,no_of_units_used,hw_desc, id from task_hw_used 
            where task_id IN (select task_id from tasks where parent_id = ${data.parent_id}  and call_attend_by = ${data.call_attend_by});`;
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}


/**************************************************************************************
* Controller     : taskhardwarelogMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/08/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.taskhardwarelogMdl = function (data,user) {
    var fnm = 'taskhardwarelogMdl';
	 
	var QRY_TO_EXEC = `insert into task_logs(task_id,emp_id,call_attend_by,comments,tl_date_created) values(${data.task_id},${data.emp_id},${data.emp_id},'${data.comments}',current_timestamp())`;
	 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : taskhardwarelogMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 01/08/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.gettaskticketsnamesMdl = function (data,user) {
    var fnm = 'gettaskticketsnamesMdl';
	 
	var QRY_TO_EXEC = `select task_no, service_no, task_other_issue, task_category, emp_username from tasks as t join employees as e on t.call_attend_by = e.emp_id where task_id = ${data.task_id};`;
	 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : taskupdatesmsnotitomngrMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/08/2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.taskupdatesmsnotitomngrMdl = function (data,user) {
    var fnm = 'taskupdatesmsnotitomngrMdl';

    let clusters = user.cluster_id.split(',')
    let qry = ``
    if(clusters.length == 1){
        qry = `  find_in_set(${clusters[0]}, cluster_id)`
       // qry = ` INSTR(${clusters[0]},cluster_id)`
    }else{
		//qry = ` INSTR(${clusters[0]},cluster_id)`
        clusters.forEach((id, i)=> {
            qry = qry + ` find_in_set(${id},cluster_id)`
            if(i <= (clusters.length - 2)) qry = qry + ` or `
        })
    }
	 
	var QRY_TO_EXEC = `select group_concat(emp_mobile) as emp_mobile from employees where ${qry} and emp_designation = 234 and sms_flag = 0;`;
	 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : taskChckEmplyeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 22/09/2023  -  Ramesh - Initial Function
*
***************************************************************************************/

exports.taskChckEmplyeeMdl = function (attdby, data,user, callback) {
    var fnm = 'taskChckEmplyeeMdl';

   var QRY_TO_EXEC = `select task_id from tasks where parent_id = '${data.task_id}' and call_attend_by=${attdby} and task_status not in (271,408); `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}


/**************************************************************************************
* Controller     : taskPrimaryChckEmplyeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/09/2023  -  Ramesh - Initial Function
*
***************************************************************************************/

exports.taskPrimaryChckEmplyeeMdl = function (attdby, data,user, callback) {
    var fnm = 'taskPrimaryChckEmplyeeMdl';

   var QRY_TO_EXEC = `select task_id from tasks where parent_id = '${data.task_id}' and primary_flag=1 and task_status not in (271,408); `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

}

/**************************************************************************************
* Controller     : getprimary_to_secondary_id
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 16-05-23 - Initial Function
*
***************************************************************************************/
exports.getprimary_to_secondary_id = function (data, call_attend_by, user, callback) {
    var fnm = 'getprimary_to_secondary_id';
  
    var QRY_TO_EXEC = `select * from tasks where parent_id = '${data.task_id}' and call_attend_by = ${call_attend_by} and task_status not in (271,408)`;
    console.log(QRY_TO_EXEC);
        
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
};

/**************************************************************************************
* Controller     : mngrapprvedupdttaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 03/10/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.mngrapprvedupdttaskMdl = function (data, lngth, user, callback) {
    var fnm = 'mngrapprvedupdttaskMdl';
    let qry2 = ``
	var qry = ``;
	var prmyflg = ``;
	if(lngth == 0){
		prmyflg = ` ,primary_flag = 1 `
	}
    if(data.task_status == 227){
        qry2 = `update tasks set last_updated_time = current_timestamp(),approved_time = current_timestamp(), travel_change = 1, Approver ='${user.emp_name}', Approver_id = ${user.emp_id}, Approver_reason= '${data.comments}' where parent_id = ${data.perent_task_id};`
    }

	var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp() , task_status = ${data.task_status} ${prmyflg} where task_id = ${data.task_id}; 
                        ${qry2}`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : taskdatalengthfrservicenowmngrapprlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 03/10/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.taskdatalengthfrservicenowmngrapprlMdl = function (data, lngth, user, callback) {
    var fnm = 'taskdatalengthfrservicenowmngrapprlMdl';

	var QRY_TO_EXEC = `select * from tasks where task_id = ${data.perent_task_id} and task_status not in (271,407,408)	and primary_flag=1`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : updateprmyfieldcanceltaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 03/10/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateprmyfieldcanceltaskMdl = function (data, distance, user, callback) {
    var fnm = 'updateprmyfieldcanceltaskMdl';
    
	var QRY_TO_EXEC = `update tasks set last_updated_time = current_timestamp(),primary_flag = 0 where task_id = ${data.task_id};`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}