var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : attendancedatartrMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancedatartrMdl = function (data, user, callback) {
    var fnm = 'attendancedatartrMdl';
	var frmdate = ``;
	var todate = ``;
	var dtfltr = ``
	var clstr = ``
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}:00`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}:00`
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
	
		dtfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and e.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = `and e.cluster_id in (${user.cluster_id})`
		}
	}
	// var QRY_TO_EXEC = `select ROW_NUMBER()OVER(ORDER BY a.attendence_id DESC) as s_no,z.zone_name as region,s.state_name as state,c.cluster_name as FSM,v.vendor_name as 'vendor_name'
	// ,e.emp_code as emplyee_rigger_id,e.emp_name as emplyee_rigger_name,sc2.sub_cat_name as 'designation'
	// ,concat(sh.shift_start_date,' To ',sh.shift_end_date) as shift_Time,DATE_FORMAT(a.i_ts,'%Y-%m-%d') date_time,
	// DATE_FORMAT(a.punch_in_time,'%d-%b-%Y %I:%i %p') as in_time	,DATE_FORMAT(a.punch_out_time,'%d-%b-%Y %I:%i %p') as out_time,
	// case when a.emp_sts = 0 THEN 'Present'
	 // when a.emp_sts = 1 THEN 'Absent'
	 // when a.emp_sts = 2 THEN 'Weekoff' 
	 // when a.emp_sts is null THEN 'N/A' end as attdnce_sts,
	 // '' as updatedby,'' as comments,
	// DATE_FORMAT(TIMEDIFF(punch_out_time,punch_in_time),'%H:%i') as workinghours,concat(a.punch_in_km/1000,' km away from ',e.address) as punch_in_locn,punch_in_km/1000 as punch_in_km,punch_out_km/1000 as punch_out_km,
	// concat(punch_in_latlang,',',punch_out_latlang) as coordinates
	// from employees  as e
	// join zones as z on z.zone_id=e.zone_id
	 // left join attendence as a on e.emp_id=a.emp_id
	// join states as s on s.state_id=e.state
	// join clusters as c on e.cluster_id = c.cluster_id
	// join shifts as sh on sh.shift_id=e.shift_type_id 
	// join vendors as v on v.vendor_id=e.vendor_name 
	// join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation 
	// where a.i_ts between '${frmdate}' and '${todate}' ${dtfltr} ${clstr} and e.emp_designation not in  (234,284) 	`;
    var QRY_TO_EXEC =` select ROW_NUMBER()OVER(ORDER BY a.attendence_id DESC) as s_no,z.zone_name as region,s.state_name as state,c.cluster_name as FSM,v.vendor_name as 'vendor_name'
	,e.emp_code as emplyee_rigger_id,e.emp_name as emplyee_rigger_name,sc2.sub_cat_name as 'designation',sc3.sub_cat_name as 'team_type',e.city_type as City_Type
	,concat(sh.shift_start_date,' To ',sh.shift_end_date) as shift_Time,DATE_FORMAT(a.i_ts,'%Y-%m-%d') date_time,
	date_format(e.date_created,'%d-%m-%Y') as 'Onboarding_Date',
	DATE_FORMAT(a.punch_in_time,'%d-%b-%Y %I:%i %p') as in_time	,DATE_FORMAT(a.punch_out_time,'%d-%b-%Y %I:%i %p') as out_time,
	case when a.emp_sts = 0 THEN 'Present'
	when a.emp_sts = 1 THEN 'Absent'
	when a.emp_sts = 2 THEN 'Weekoff'
	WHEN a.emp_sts = 5 THEN 'Comp-off'
	WHEN a.emp_sts = 6 THEN 'Holiday'
	when a.emp_sts is null THEN 'N/A' end as attdnce_sts,
	'' as updatedby,'' as comments,
	DATE_FORMAT(TIMEDIFF(punch_out_time,punch_in_time),'%H:%i') as workinghours,concat(a.punch_in_km/1000,' km away from ',e.address) as punch_in_locn,punch_in_km/1000 as punch_in_km,punch_out_km/1000 as punch_out_km,
	concat(punch_in_latlang,',',punch_out_latlang) as coordinates 
	from attendence as a
	join employees as e on e.emp_id=a.emp_id
	join clusters as c on e.cluster_id = c.cluster_id
	left join states as s on s.state_id=c.state_id
	join shifts as sh on sh.shift_id=e.shift_type_id 
	join vendors as v on v.vendor_id=e.vendor_name 
	join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation 
	left join sub_categories as sc3 on sc3.sub_cat_id=e.team_type 
	left join zones as z on z.zone_id=c.zone_id
	where a.i_ts between '${frmdate}' and '${todate}' ${dtfltr} ${clstr} and e.emp_designation not in  (234,284)`;
	// var QRY_TO_EXEC = `select ROW_NUMBER()OVER(ORDER BY a.attendence_id DESC) as s_no,z.zone_name as region,s.state_name as state,c.cluster_name as FSM,v.vendor_name as 'vendor_name'
	// ,e.emp_code as emplyee_rigger_id,e.emp_name as emplyee_rigger_name,sc2.sub_cat_name as 'designation'
	// ,concat(sh.shift_start_date,' To ',sh.shift_end_date) as shift_Time,DATE_FORMAT(a.i_ts,'%Y-%m-%d') date_time,
	// DATE_FORMAT(a.punch_in_time,'%d-%b-%Y %I:%i %p') as in_time	,DATE_FORMAT(a.punch_out_time,'%d-%b-%Y %I:%i %p') as out_time,
	// case when a.emp_sts = 0 THEN 'Present'
	//  when a.emp_sts = 1 THEN 'Absent'
	//  when a.emp_sts = 2 THEN 'Weekoff' 
	//  when a.emp_sts is null THEN 'N/A' end as attdnce_sts,
	//  '' as updatedby,'' as comments,
	// DATE_FORMAT(TIMEDIFF(punch_out_time,punch_in_time),'%H:%i') as workinghours,concat(a.punch_in_km/1000,' km away from ',e.address) as punch_in_locn,punch_in_km/1000 as punch_in_km,punch_out_km/1000 as punch_out_km,
	// concat(punch_in_latlang,',',punch_out_latlang) as coordinates
	// from employees  as e
	// join zones as z on z.zone_id=e.zone_id
	// left join attendence as a on e.emp_id=a.emp_id
	// join states as s on s.state_id=e.state
	// join clusters as c on e.cluster_id = c.cluster_id
	// join shifts as sh on sh.shift_id=e.shift_type_id 
	// join vendors as v on v.vendor_id=e.vendor_name 
	// join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation 
	// where a.i_ts between '${frmdate}' and '${todate}' ${dtfltr} ${clstr}
	// group by a.i_ts;`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
 
/**************************************************************************************
* Controller     : attendancedataPdfrtrMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancedataPdfrtrMdl = function (data, user, callback) {
    var fnm = 'attendancedataPdfrtrMdl';
	var frmdate = ``;
	var todate = ``;
	var dtfltr = ``
	var clstr = ``
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}:00`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}:00`
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){

		dtfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and e.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = `and e.cluster_id in (${user.cluster_id})`
		}
	}

	var QRY_TO_EXEC = `select ROW_NUMBER()OVER(ORDER BY a.attendence_id DESC) as s_no,a.attendence_id,e.emp_name,shift_name as shift_name,DATE_FORMAT(shift_start_date,'%I:%i %p') as shift_start,punch_in_time,
DATE_FORMAT(shift_end_date,'%I:%i %p') as shift_end,punch_out_time,DATE_FORMAT(a.i_ts, "%a %e-%M-%y") as timedate,case when a.emp_sts = 0 THEN 'Present'
 when a.emp_sts = 1 THEN 'Absent'
 when a.emp_sts = 2 THEN 'Weekoff'
WHEN a.emp_sts = 5 THEN 'Comp-off'
WHEN a.emp_sts = 6 THEN 'Holiday' 
when a.emp_sts is null THEN 'N/A' end as attdnce_sts,
DATE_FORMAT(a.punch_in_time,'%I:%i %p') as in_time,case when TIME_TO_SEC(a.punch_in_time) > TIME_TO_SEC(shift_start_date) then 'Late' else 'Early' end as in_time_sts
,DATE_FORMAT(a.punch_out_time,'%I:%i %p') as out_time,case when TIME_TO_SEC(a.punch_out_time) > TIME_TO_SEC(shift_end_date) then 'Late' else 'Early' end as in_time_sts,
DATE_FORMAT(TIMEDIFF(punch_out_time,punch_in_time),'%H:%i') as workinghours,concat(a.punch_in_km,' away from ',e.address) as punch_in_locn,punch_in_km,punch_out_km,
concat(punch_in_latlang,',',punch_out_latlang) as coordinates
from employees  as e
left join attendence as a on e.emp_id=a.emp_id
join shifts as sc on sc.shift_id=e.shift_type_id  
	where ( a.i_ts between '${frmdate}' and '${todate}' ${clstr} and e.emp_designation not in  (234,284) ) or ( e.emp_designation not in  (234,284) ${dtfltr} ${clstr}) 
	group by e.emp_id;`;
	
	

    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
} 

/**************************************************************************************
* Controller     : FieldManpowerDtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.FieldManpowerDtlsMdl = function (data, user, callback) {
	var fnm = 'FieldManpowerDtlsMdl';
	console.log("data",data)
	/*var frmdate = ``;
	var todate = ``;
	var dtfltr = ``;
	var empfltr = ``;
	var clstr = ``;
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}:00`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}:00`
	}
	if(frmdate != '' && todate != ''){
		dtfltr = ` and e.date_created between '${frmdate}' and '${todate}'`
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
		empfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and e.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = ` and e.cluster_id in (${user.cluster_id})`
		}
	}

	var QRY_TO_EXEC = `select emp_code as 'Employee_Id',emp_id as 'emp_db_id',emp_name as 'Name',emp_mobile as 'Mobile_Number',emp_email as 'Email_Id', c.cluster_name as 'Organization_Unit_Name'
,sc2.sub_cat_name as 'Designation',shift_name as 'Shift_Name',total_leaves as 'Leaves','' as 'Base_Address',
emp_latitude as 'Latitude',emp_longitude as 'Longitutde', sc.sub_cat_name as 'Employment_Type',v.vendor_code as 'Vendor_Code',v.vendor_name as 'Vendor_Name', emp_username as 'User_Name',
concat(e.address,' , ',address2 ,' , ' , city,pincode) as 'Address',skill_type as 'Skills','' as 'Task_Types','' as 'Privilege','' as 'Organization_Unit_Id',
date_format(date_created,'%d-%m-%Y') as 'Onboarding_Date',city as 'City_Name',city_type as 'City_Type'
 from employees as e
left join vendors as v on v.vendor_id=e.vendor_name
left join sub_categories as sc on sc.cat_id=3 and sc.sub_cat_id=e.member_type
left join shifts as s on s.shift_id=e.shift_type_id
left join clusters as c on find_in_set(c.cluster_id, e.cluster_id)
left join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation where 1 = 1 ${dtfltr} ${empfltr} ${clstr}  group by e.emp_id order by date_created asc`;
*/

	var empfltr = ``;
	var clstr = ``;

	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
	    
		empfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and e.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = `and e.cluster_id in (${user.cluster_id})`
		}
	}
	
	
    var QRY_TO_EXEC =     `select emp_code as 'Employee_Id',emp_status,emp_id as 'emp_db_id',emp_name as 'Name',emp_mobile as 'Mobile_Number',emp_email as 'Email_Id', c.cluster_name as 'Organization_Unit_Name'
	,sc2.sub_cat_name as 'Designation',shift_name as 'Shift_Name',sc3.sub_cat_name as 'team_type',total_leaves as 'Leaves','' as 'Base_Address',state_name as 'State',zone_name as 'Zone',
	emp_latitude as 'Latitude',emp_longitude as 'Longitutde', sc.sub_cat_name as 'Employment_Type',v.vendor_code as 'Vendor_Code',v.vendor_name as 'Vendor_Name', emp_username as 'User_Name',
	concat(e.address,' , ',address2 ,' , ' , city,pincode) as 'Address',skill_type as 'Skills','' as 'Task_Types','' as 'Privilege','' as 'Organization_Unit_Id',
	date_format(date_created,'%d-%m-%Y') as 'Onboarding_Date',city as 'City_Name',city_type as 'City_Type'
	 from employees as e
	left join vendors as v on v.vendor_id=e.vendor_name
	left join sub_categories as sc on sc.cat_id=3 and sc.sub_cat_id=e.member_type
	left join shifts as s on s.shift_id=e.shift_type_id
	left join clusters as c on find_in_set(c.cluster_id, e.cluster_id)
	join zones as z on z.zone_id=c.zone_id
	join states as ss on ss.state_id=c.state_id
	left join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation 
	left join sub_categories as sc3 on  sc3.sub_cat_id=e.team_type 
	where e.emp_designation in (231,232) ${empfltr} ${clstr} group by e.emp_id order by date_created asc`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : taskdumpreportdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
// have added group by t.task_id as sake task is showing multiple times
exports.taskdumpreportdataMdl = function (data, user, callback) {
    var fnm = 'taskdumpreportdataMdl';
	var frmdate = ``;
	var todate = ``;
	var dtfltr = ``;
	var clstr = ``;
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}:00`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}:00`
	}
	if(data.call_attend_by != null && data.call_attend_by != '' && data.call_attend_by != undefined){
		dtfltr = ` and t.call_attend_by=${data.emp_id} `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and cs.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = `and e.cluster_id in (${user.cluster_id})`
		}
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
		dtfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	
	var QRY_TO_EXEC = `select e.emp_name as 'Employee_Name',e.emp_code as 'Employee_Identity',c.circuit_name as 'Client_Name',concat(t.task_latitude,',',t.task_longitude) as 'Task_Coordinates',t.task_no as 'Order_Number',t.service_no as 'Service_Number',t.task_pincode as 'Pincode',cc.comp_cat_name as 'Task_Type',cs.cluster_name as 'Cluster',
	e.city_type as City_Type,t.task_created_date as 'Creation_On',t.task_priority as 'Priority',t.taskAddress as 'Address',e.emp_mobile as 'Mobile_Number',z.zone_name as 'Region',
	e2.emp_name as 'Dispatcher',v.vendor_name as 'Vendor',v.vendor_code as 'Vendor_Code',sc.sub_cat_name as 'Designation',task_assigned_date as 'Acknowledge_Time',
	task_closed_time as 'Completion_Time',st.state_name as 'Circle',CASE WHEN t.travel_flg = 1 THEN 'Yes' ELSE 'NO' END AS 'Is_Travel',
	COALESCE(start_time, 'N/A') AS 'Travel_Start_Time',start_coordinates as 'Travel_Start_Coordinates',start_address as 'Travel_Start_Address',
	COALESCE(end_time, 'N/A') AS 'Travel_End_Time',end_coordinates as 'Travel_End_Coordinates',end_address as 'Travel_End_Address',travel_distance/1000 as Distance_Travelled_Km,
	sc2.sub_cat_name as 'Status',(select group_concat(th.hw_partcode) from task_hw_used as th where th.task_id=t.task_id) as 'Recorded_Hardware',
	(select group_concat(th.no_of_units_used) from task_hw_used as th where th.task_id=t.task_id) as 'Unit_Meter',
	(select group_concat(th.hw_desc) from task_hw_used as th where th.task_id=t.task_id) as 'hw_desc',case when Approver_reason IS NULL then 'N/A' else Approver_reason end as 'reason_for_approval',Approver,CASE WHEN t.auto_assgn = 1 THEN 'No' ELSE 'Yes' END AS 'Task_was_Auto_Assigned',e.member_type as 'Resource_Type',
	CASE WHEN t.auto_assgn = 1 AND t.task_owner=10053 then 'No Manager Avilable with The given SOT Details'
	WHEN t.auto_assgn = 1 AND t.task_owner <> 10053 then 'Not found any Engineer' ELSE 'Auto Assigned' END AS 'Reason_For_Auto_assignment_not_done',
	CASE WHEN t.start_coordinates is null or t.end_coordinates is null then 'Status Changed from Backened Manager'
	when t.start_coordinates = t.end_coordinates then 'Update From Same Location'
		else 'Gps api Response'
	end as 'Reason_for_distance_not_capturing',
	case when t.start_coordinates is null or t.end_coordinates is null then 'No co-ordinates avilable'
		when t.return_distance=0 then 'this is not last task'
	end as 'Reason_for_return_distance_not_capturing',
	(select case when count(*) =0 then 'N/A' else e.emp_name end as 'Auto_assignment_Changed_By_Manager' from task_logs as tl
	join employees as e on e.emp_id=tl.emp_id where tl.task_id=t.task_id and tl.task_status=218
	and tl.emp_id not in (9999) and emp_designation not in (231,232) order by tl_id desc limit 1) as 'Auto_assignment_Changed_By_Manager',
	e2.emp_email as 'Assignment_Identity',
	return_distance/1000 as 'Return_Distance_Travelled_Km',
	task_appointment_date as 'Timestamp'
	from tasks as t
	left join task_hw_used as th on th.task_id=t.task_id
	join circuits as c on c.circuit_id=t.circuit_id
	join employees as e on e.emp_id = t.call_attend_by
	join employees as e2 on e2.emp_id=t.emp_id
	join vendors as v on v.vendor_id=e.vendor_name
	join complaint_categories as cc on cc.comp_cat_id=t.task_type
	join sub_categories as sc on sc.sub_cat_id=e.emp_designation and sc.cat_id=2
	left join zones as z on z.zone_id=e.zone_id
	join sub_categories as sc2 on sc2.sub_cat_id=t.task_status and sc2.cat_id=9
	join clusters as cs on cs.cluster_id=e.cluster_id
	left join states as st on e.state = st.state_id
	where (t.task_created_date)  between '${frmdate}' and '${todate}' ${clstr} ${dtfltr} and t.parent_id is not null group by t.task_id;`


	/*var QRY_TO_EXEC = `select e.emp_name as 'Employee_Name',e.emp_code as 'Employee_Identity',c.circuit_name as 'Client_Name',concat(t.task_latitude,',',t.task_longitude) as 'Task_Coordinates',
t.task_no as 'Order_Number',t.service_no as 'Service_Number',t.task_pincode as 'Pincode',cc.comp_cat_name as 'Task_Type',cs.cluster_name as 'Cluster',e.city_type as City_Type,
date_format(t.task_created_date,'%Y-%m-%d %H:%i:%s') as 'Creation_On',t.task_priority as 'Priority',t.taskAddress as 'Address',e.emp_mobile as 'Mobile_Number',
z.zone_name as 'Region',e2.emp_name as 'Dispatcher',v.vendor_name as 'Vendor',v.vendor_code as 'Vendor_Code',sc.sub_cat_name as 'Designation',
date_format(task_assigned_date,'%Y-%m-%d %H:%i:%s') as 'Acknowledge_Time',date_format(task_closed_time,'%Y-%m-%d %H:%i:%s') as 'Completion_Time',st.state_name as 'Circle',
case when t.travel_flg = 1 then 'Yes' else 'NO' end as 'Is_Travel',case when start_time is null then 'N/A' else date_format(start_time,'%Y-%m-%d %H:%i:%s') end as 'Travel_Start_Time',
start_coordinates as 'Travel_Start_Coordinates',start_address as 'Travel_Start_Address',case when end_time is null then 'N/A' else date_format(end_time,'%Y-%m-%d %H:%i:%s') end as 'Travel_End_Time',
end_coordinates as 'Travel_End_Coordinates',end_address as 'Travel_End_Address',travel_distance/1000 as Distance_Travelled_Km,
sc2.sub_cat_name as 'Status',(select group_concat(th.hw_partcode,'-',th.hw_desc,'-',th.no_of_units_used) from task_hw_used as th where th.task_id=t.task_id) as 'Recorded_Hardware',
(select group_concat(th.no_of_units_used) from task_hw_used as th where th.task_id=t.task_id) as 'Unit_Meter',
(select group_concat(th.hw_desc) from task_hw_used as th where th.task_id=t.task_id) as 'hw_desc',
case when Approver_reason IS NULL then 'N/A' else Approver_reason end as 'reason_for_approval',Approver as 'Approver',
case when t.auto_assgn = 1 then 'No' else 'Yes' end as 'Task_was_Auto_Assigned',e.member_type as 'Resource_Type',
case when t.auto_assgn = 1 and t.task_owner=10053 then 'No Manager Avilable with The given SOT Details' 
	when t.auto_assgn = 1 and t.task_owner !=10053 then 'Not found any Engineer' 
	else 'Auto Assigned' end as 'Reason_For_Auto_assignment_not_done',
	case when t.start_coordinates is null or t.end_coordinates is null then 'Status Changed from Backened Manager' 
	when t.start_coordinates = t.end_coordinates then 'Update From Same Location'
    else 'Gps api Response'
	end as 'Reason_for_distance_not_capturing',
	case when t.start_coordinates is null or t.end_coordinates is null then 'No co-ordinates avilable'
    when t.return_distance=0 then 'this is not last task'
	end as 'Reason_for_return_distance_not_capturing',
(select case when count(*) =0 then 'N/A' else e.emp_name end as 'Auto_assignment_Changed_By_Manager' from task_logs as tl 
join employees as e on e.emp_id=tl.emp_id where tl.task_id=t.task_id and tl.task_status=218 and tl.emp_id not in (9999) and emp_designation not in (231,232) order by tl_id desc limit 1) as 'Auto_assignment_Changed_By_Manager',
e2.emp_email as 'Assignment_Identity',return_distance/1000 as 'Return_Distance_Travelled_Km',
date_format(task_appointment_date,'%Y-%m-%d %H:%i:%s') as 'Timestamp'
	from tasks as t
	left join task_hw_used as th on th.task_id=t.task_id
	join circuits as c on c.circuit_id=t.circuit_id
	join employees as e on e.emp_id = t.call_attend_by
	#left join sub_categories as sc3 on sc3.sub_cat_id=e.member_type and sc3.cat_id=3
	join employees as e2 on e2.emp_id=t.emp_id
	join vendors as v on v.vendor_id=e.vendor_name
	join complaint_categories as cc on cc.comp_cat_id=t.task_type
	#join complaint_categories as cc1 on cc1.main_cat_id=t.task_type
	join sub_categories as sc on sc.sub_cat_id=e.emp_designation and sc.cat_id=2
	left join zones as z on z.zone_id=e.zone_id
	#left join sub_categories as sc1 on sc1.sub_cat_id=e.state and sc1.cat_id=6
	join sub_categories as sc2 on sc2.sub_cat_id=t.task_status and sc2.cat_id=9
	join clusters as cs on cs.cluster_id=e.cluster_id
	join states as st on cs.state_id = st.state_id
where (t.task_created_date  between '${frmdate}' and '${todate}' or t.start_time  between '${frmdate}' and '${todate}') ${clstr} ${dtfltr} and t.parent_id is not null group by t.task_id;`*/

    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
} 

/**************************************************************************************
* Controller     : lcnHstryreportdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/05/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.lcnHstryreportdataMdl = function (data, user, callback) {
	    var fnm = 'lcnHstryreportdataMdl';
	var frmdate = ``;
	var todate = ``;
	var dtfltr = ``;
	var clstr = ``;
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}:00`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}:00`
	}
	if(data.call_attend_by != null && data.call_attend_by != '' && data.call_attend_by != undefined){
		dtfltr = ` t.call_attend_by=${data.emp_id} `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and cs.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = `and e.cluster_id in (${user.cluster_id})`
		}
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
		dtfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	var QRY_TO_EXEC =	`SELECT z.zone_name AS Region,s.state_name as 'state',cs.cluster_name AS FSM,v.vendor_name AS Vendor_Name,e.emp_name AS Employee_Rigger_Name,
						e.emp_code AS Employee_Rigger_Id,sc.sub_cat_name AS Designation,DATE(t.task_created_date) AS Date_d,t.service_no AS Task_Id,
						t.task_other_issue AS Task_Information,c.user_name AS Customer_Name,COALESCE(complete_tasks.ct, 0) AS Complete_Tasks,
						COALESCE(assign_tasks.ct, 0) AS Assign_Tasks,'' AS Stops,'' AS Time_t,'' AS Duration,sc2.sub_cat_name AS Status,
						CASE WHEN tl2.task_status = 409 THEN tl2.distance ELSE 0 END AS Return_Distance_Travelled_Km,
						CONCAT(t.task_latitude, ',', t.task_longitude) AS Location,IFNULL(SUM(tl5.distance), 0) AS Approx_Total_Distance_Travelled_Km,
						IFNULL(SUM(tl5.distance), 0) AS Total_Travelling_Time
							FROM tasks AS t
							JOIN circuits AS c ON c.circuit_id = t.circuit_id
							JOIN employees AS e ON e.emp_id = t.call_attend_by
							JOIN vendors AS v ON v.vendor_id = e.vendor_name
							JOIN sub_categories AS sc ON sc.sub_cat_id = e.emp_designation AND sc.cat_id = 2
							LEFT JOIN sub_categories AS sc1 ON FIND_IN_SET(sc1.sub_cat_id, e.state) AND sc1.cat_id = 6
							JOIN sub_categories AS sc2 ON sc2.sub_cat_id = t.task_status AND sc2.cat_id = 9
							JOIN clusters AS cs ON cs.cluster_id = e.cluster_id
							LEFT JOIN task_logs AS tl2 ON tl2.task_id = t.task_id AND tl2.task_status = 409
							LEFT JOIN task_logs AS tl5 ON tl5.task_id = t.task_id AND tl5.emp_id = t.call_attend_by AND tl5.task_status NOT IN (271, 408)
								left join zones as z on z.zone_id=c.zone_id
							 left join states as s on s.state_id=cs.state_id
							LEFT JOIN ( SELECT t2.call_attend_by,COUNT(*) AS ct FROM tasks AS t2
								WHERE t2.task_status = 226 GROUP BY t2.call_attend_by
							) AS complete_tasks ON complete_tasks.call_attend_by = t.call_attend_by
							LEFT JOIN ( SELECT t2.call_attend_by, COUNT(*) AS ct FROM tasks AS t2
								WHERE t2.task_status NOT IN (271, 408) GROUP BY t2.call_attend_by
							) AS assign_tasks ON assign_tasks.call_attend_by = t.call_attend_by
							WHERE (t.task_created_date) between '${frmdate}' and '${todate}' ${clstr} ${dtfltr}
								AND t.parent_id IS NOT NULL GROUP BY t.task_id`;
	/*var QRY_TO_EXEC = `select z.zone_name as 'Region',sc1.sub_cat_name as 'State',cs.cluster_name as 'FSM',v.vendor_name as 'Vendor_Name',e.emp_name as 'Employee_Rigger_Name',e.emp_code as 'Employee_Rigger_Id',
sc.sub_cat_name as 'Designation',date_format(t.task_created_date,'%Y-%m-%d') as 'Date_d',t.service_no as 'Task_Id',t.task_other_issue as 'Task_Information',
c.user_name as 'Customer_Name',(select count(*) as ct from tasks as t2 where t2.call_attend_by=t.call_attend_by and task_status=226) as 'Complete_Tasks',
(select count(*) as ct from tasks as t2 where t2.call_attend_by=t.call_attend_by and task_status not in (271,408)) as 'Assign_Tasks',
'' as 'Stops','' as 'Time_t','' as 'Duration',sc2.sub_cat_name as 'Status',
(select case when tl2.task_status = 409 then tl2.distance else 0 end as distance from task_logs as tl2 where tl2.task_id=t.task_id group by t.task_id) as 'Return_Distance_Travelled_Km',
concat(t.task_latitude,',',t.task_longitude) as 'Location',
(select ifnull(sum(tl5.distance),0) as app_dst from task_logs as tl5 where tl5.task_id=t.task_id and tl5.emp_id=t.call_attend_by and tl5.task_status not in (271,408) limit 1) as 'Approx_Total_Distance_Travelled_Km'
,(select ifnull(sum(tl5.distance),0) as dst from task_logs as tl5 where tl5.task_id=t.task_id and tl5.emp_id=t.call_attend_by and tl5.task_status not in (271,408) limit 1) as 'Total_Travelling_Time'
 from tasks as t
join circuits as c on c.circuit_id=t.circuit_id
 join employees as e on e.emp_id = t.call_attend_by
 join vendors as v on v.vendor_id=e.vendor_name
 #join complaint_categories as cc1 on cc1.main_cat_id=t.task_type
 join sub_categories as sc on sc.sub_cat_id=e.emp_designation and sc.cat_id=2
 join zones as z on z.zone_id=e.zone_id
 left join sub_categories as sc1 on find_in_set(sc1.sub_cat_id,e.state) and sc1.cat_id=6
 join sub_categories as sc2 on sc2.sub_cat_id=t.task_status and sc2.cat_id=9
join clusters as cs on cs.cluster_id=e.cluster_id
	where t.task_created_date  between '${frmdate}' and '${todate}' ${clstr} ${dtfltr} and t.parent_id is not null group by t.task_id ;`*/
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}


/**************************************************************************************
* Controller     : performancereportdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/05/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.performancereportdataMdl = function (data, user, callback) {
	    var fnm = 'performancereportdataMdl';
	var frmdate = ``;
	var todate = ``;
	var dtfltr = ``;
	var clstr = ``;
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}:00`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}:00`
	}
	if(data.call_attend_by != null && data.call_attend_by != '' && data.call_attend_by != undefined){
		dtfltr = ` t.call_attend_by=${data.emp_id} `
	}
	if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		clstr = ` and cs.cluster_id in (${data.cluster_id}) `
	}else{
		console.log(user,"useruseruseruseruseruser")
		if(user.emp_designation == 234){
			clstr = `and e.cluster_id in (${user.cluster_id})`
		}
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
		dtfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	var QRY_TO_EXEC = `SELECT z.zone_name AS 'Region',st.state_name AS 'Circle',cs.cluster_name AS 'Cluster',e.emp_name AS 'Name',sc.sub_cat_name AS 'Designation',
    v.vendor_name AS 'Vendor_Name',DATE_FORMAT(t.task_created_date, '%Y-%m-%d') AS 'Task_Assigned_Days',COUNT(*) AS 'Assigned_Tasks',
    SUM(CASE WHEN t.task_status = 226 THEN 1 ELSE 0 END) AS 'Complete_Tasks',
    SUM(CASE WHEN t.task_status IN (271, 408) THEN 1 ELSE 0 END) AS 'Failed_Rej_SN_Fld_Canc_InCompl_Acc_NA_Req_Resc',
    SUM(CASE WHEN t.task_status NOT IN (226, 271, 408) THEN 1 ELSE 0 END) AS 'In_Progress_Tasks',
    ifnull(TIMEDIFF( t.task_assigned_date, t.task_created_date),'00:00:00') AS 'Avg_Assign_Time',
    ifnull(TIMEDIFF( t.task_closed_time, t.task_assigned_date),'00:00:00') AS 'Avg_Task_Time',
    ifnull(CASE WHEN t.task_status = 227 THEN TIMEDIFF(t.task_closed_time, t.task_assigned_date) ELSE '00:00:00' END,'00:00:00') AS 'Productivity_in_Hours_per_Day'
FROM tasks AS t
JOIN circuits AS c ON c.circuit_id = t.circuit_id
JOIN employees AS e ON e.emp_id = t.call_attend_by
JOIN vendors AS v ON v.vendor_id = e.vendor_name
JOIN sub_categories AS sc ON sc.sub_cat_id = e.emp_designation AND sc.cat_id = 2
JOIN clusters AS cs ON cs.cluster_id = e.cluster_id
JOIN zones AS z ON z.zone_id = cs.zone_id
JOIN states AS st ON cs.state_id = st.state_id
where t.task_created_date  between '${frmdate}' and '${todate}' ${clstr} ${dtfltr} and t.parent_id is not null 
GROUP BY z.zone_name, st.state_name, cs.cluster_name, e.emp_name, v.vendor_name, DATE_FORMAT(t.task_created_date, '%Y-%m-%d');`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : attendancedatamanagersPdfMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancedatamanagersPdfMdl = function (data, user, callback) {
        var fnm = 'attendancedatamanagersPdfMdl';
	var frmdate = ``;
	var todate = ``;
	var dtfltr = ``
	var clstr = ``
	
	if(data.frmdt != null && data.frmdt != '' && data.frmdt != undefined){
		frmdate = `${data.frmdt}`;
	}
	if(data.todt != null && data.todt != '' && data.todt != undefined){
		todate = `${data.todt}`
	}
	if(data.emp_id != null && data.emp_id != '' && data.emp_id != undefined){
		dtfltr = ` and e.emp_id in (${data.emp_id}) `
	}
	//if(data.cluster_id != null && data.cluster_id != '' && data.cluster_id != undefined){
		//clstr = ` and e.cluster_id in (${data.cluster_id}) `
	//}
	//else{
		//if(user.emp_designation == 234){
		//	clstr = ` and e.cluster_id in (${user.cluster_id} ) `
		//}
	//}
	// var QRY_TO_EXEC = `select ROW_NUMBER()OVER(ORDER BY a.attendence_id DESC) as s_no,z.zone_name as region,s.state_name as state,c.cluster_name as FSM,v.vendor_name as 'vendor_name'
	// ,e.emp_code as emplyee_rigger_id,e.emp_name as emplyee_rigger_name,sc2.sub_cat_name as 'designation'
	// ,concat(sh.shift_start_date,' To ',sh.shift_end_date) as shift_Time,DATE_FORMAT(a.i_ts,'%Y-%m-%d') date_time,
	// DATE_FORMAT(a.punch_in_time,'%d-%b-%Y %I:%i %p') as in_time	,DATE_FORMAT(a.punch_out_time,'%d-%b-%Y %I:%i %p') as out_time,
	// case when a.emp_sts = 0 THEN 'Present'
	 // when a.emp_sts = 1 THEN 'Absent'
	 // when a.emp_sts = 2 THEN 'Weekoff' 
	 // when a.emp_sts is null THEN 'N/A' end as attdnce_sts,
	 // '' as updatedby,'' as comments,
	// DATE_FORMAT(TIMEDIFF(punch_out_time,punch_in_time),'%H:%i') as workinghours,concat(a.punch_in_km/1000,' km away from ',e.address) as punch_in_locn,punch_in_km/1000 as punch_in_km,punch_out_km/1000 as punch_out_km,
	// concat(punch_in_latlang,',',punch_out_latlang) as coordinates
	// from employees  as e
	// join zones as z on z.zone_id=e.zone_id
	// left join attendence as a on e.emp_id=a.emp_id
	// join states as s on s.state_id=e.state
	// join clusters as c on e.cluster_id = c.cluster_id
	// join shifts as sh on sh.shift_id=e.shift_type_id 
	// join vendors as v on v.vendor_id=e.vendor_name 
	// join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation 
	// where a.i_ts between '${frmdate}' and '${todate}' ${dtfltr} ${clstr} and e.emp_designation not in  (284)  `;
     var QRY_TO_EXEC = `select ROW_NUMBER()OVER(ORDER BY a.attendence_id DESC) as s_no,s.state_name,e.emp_name,e.emp_id,v.vendor_name, z.zone_name as region,s.state_name as state,e.cluster_id,v.vendor_name as 'vendor_name'
,e.emp_code as emplyee_rigger_id,e.emp_name as emplyee_rigger_name,sc2.sub_cat_name as 'designation'
,concat(sh.shift_start_date,' To ',sh.shift_end_date) as shift_Time,DATE_FORMAT(a.i_ts,'%Y-%m-%d') date_time,sc3.sub_cat_name as 'team_type',
DATE_FORMAT(a.punch_in_time,'%d-%b-%Y %I:%i %p') as in_time     ,DATE_FORMAT(a.punch_out_time,'%d-%b-%Y %I:%i %p') as out_time,c.cluster_id,
(select GROUP_CONCAT(c1.cluster_name) AS cluster_names from clusters as c1 WHERE find_in_set(c1.cluster_id, e.cluster_id)) as FSM,
case when a.emp_sts = 0 THEN 'Present'
when a.emp_sts = 1 THEN 'Absent'
when a.emp_sts = 2 THEN 'Weekoff'
when a.emp_sts is null THEN 'absent' end as attdnce_sts,
'' as updatedby,'' as comments,
DATE_FORMAT(TIMEDIFF(punch_out_time,punch_in_time),'%H:%i') as workinghours,concat(a.punch_in_km/1000,' km away from ',e.address) as punch_in_locn,punch_in_km/1000 as punch_in_km,punch_out_km/1000 as punch_out_km,
concat(punch_in_latlang,',',punch_out_latlang) as coordinates from employees as e
left join clusters as c on c.cluster_id = e.cluster_id
join zones as z on z.zone_id=c.zone_id
left join attendence as a on a.emp_id=e.emp_id
join states as s on s.state_id=c.state_id
left join shifts as sh on sh.shift_id=e.shift_type_id
left join vendors as v on v.vendor_id=e.vendor_name
join sub_categories as sc2 on sc2.cat_id=2 and sc2.sub_cat_id=e.emp_designation
 left join sub_categories as sc3 on  sc3.sub_cat_id=e.team_type 
where (a.i_ts)  between '${frmdate}' and '${todate}' ${dtfltr} and e.emp_designation =234 group by   a.attendence_id
 `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
 
