var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var df = require(appRoot + '/utils/dflower.utils');
var sqldb = require(appRoot + '/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : getprsentemplyeegpsMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getprsentemplyeegpsMdl = function (data) {
    var fnm = "getprsentemplyeegpsMdl"
  //  var QRY_TO_EXEC = `select e.emp_name as 'name',e.emp_id,e.emp_code as emp_code,e.emp_mobile,eg.gps_lat as lat,eg.gps_lang as lng,count(distinct(t.task_id)) as tasks,t.task_id,sc.sub_cat_name as emp_dsgn from employees as e
	//left join attendence as a on a.emp_id=e.emp_id and date(i_ts)=curdate()
	//left join tasks as t on t.call_attend_by=a.emp_id and date(t.task_created_date)=curdate()
	//left join sify_logs.emp_gps_info as eg on eg.emp_id=a.emp_id and date(eg.dateCreated)=curdate()
	//join sub_categories as sc on sc.sub_cat_id=e.emp_designation
	//where a.punch_status=1  group by a.emp_id order by attendence_id,gps_id desc;`;

	 var QRY_TO_EXEC = `SELECT e.emp_name AS 'name', e.emp_id, e.emp_role, e.emp_code AS emp_code, s.shift_name as shift_name, t.task_created_date, e.emp_latitude as base_lat, e.emp_longitude as base_long, DATE_FORMAT(a.punch_in_time, '%Y-%m-%d %H:%i:%s') AS punch_in_time, t.service_no, t.taskAddress, e.emp_mobile, COUNT(DISTINCT(t.task_id)) AS total_tasks_count,
                    #(SELECT battery_percent FROM app_permission_log WHERE emp_id = e.emp_id ORDER BY app_per_id DESC LIMIT 1) AS battery_percent,
                    #COUNT(CASE WHEN t.task_status = 226 THEN 1 ELSE NULL END) AS completetask,
                    COUNT(distinct(concat( CASE WHEN t.task_status in (226,227) THEN t.task_id END))) AS completetask,
                    (select count(*) from tasks where task_status = 217 and mngr = 1 and DATE_FORMAT(task_created_date,'%Y-%m-%d') = curdate()) AS unassigned_open_task,
                    (select punch_status from attendence as aa where e.emp_id = aa.emp_id order by attendence_id desc limit 1) as punch_status,
                    (select sub_cat_name from sub_categories where sub_cat_id = e.emp_designation) as emp_designation,
                    #(select concat(DATE_FORMAT(gps.dateCreated, '%Y-%m-%d %H:%i:%s'),',',gps.gps_lat, ',', gps.gps_lang, ',', gps.full_addr) from emp_gps_info as gps where gps.emp_id = e.emp_id  ORDER BY gps.gps_id DESC LIMIT 1) AS Address
                    (select latest_record from attendence as aa where e.emp_id = aa.emp_id order by attendence_id desc limit 1) AS Address
                    FROM employees AS e
                    LEFT JOIN attendence AS a ON a.emp_id = e.emp_id
                    LEFT join shifts as s on s.shift_id = e.shift_type_id
                    LEFT JOIN tasks AS t ON t.call_attend_by = a.emp_id and date(t.task_created_date) = curdate() and t.parent_id is not null
                    WHERE e.emp_status NOT IN (2)  and e.emp_role in (2,3)
                    GROUP BY e.emp_id
                    ORDER BY e.emp_id DESC;`;
					
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : insrtGPSfrTravelStateMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.insrtGPSfrTravelStateMdl = function (data, distance, user) {
    var fnm = "insrtGPSfrTravelStateMdl"
    var QRY_TO_EXEC = `insert into travel_emp_gps_info (description,track_type,task_id,emp_id,gps_lat,gps_lang,full_addr,distance,dateCreated) values('${data.description}','${data.track_type}',${data.task_id},${user.emp_id},'${data.gps_lat}','${data.gps_lang}','${JSON.stringify(data.full_addr).replace(/'/g, "''")}','${distance}',current_timestamp())`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : chckGPSfrTravelStateMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.chckGPSfrTravelStateMdl = function (data, user) {
    var fnm = "chckGPSfrTravelStateMdl"
    var QRY_TO_EXEC = `select * from travel_emp_gps_info where emp_id=${user.emp_id} and date_format(dateCreated,'%Y-%m-%d')=curdate() order by gps_id desc`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : getmonitordatalistMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getmonitordatalistMdl = function (data) {
    var fnm = "getmonitordatalistMdl"
	
    var QRY_TO_EXEC = `select e.emp_id,e.emp_username,e.emp_password,e.emp_name,e.app_version,e.image_url,e.battery_percent,e.app_permissions, e.emp_dept,e.sms_flag,e.emp_designation,e.emp_reporting,e.city_type,e.total_leaves,e.emp_latitude,e.emp_longitude, e.member_type,e.skill_type,e.vendor_name,e.shift_type_id,e.comp_cat_id,e.emp_mobile,e.emp_email,e.emp_code,e.emp_role, e.address,e.address2,e.city,e.state,e.zone_id,e.cluster_id,e.pincode,e.date_created,e.updated_on,e.notes,e.emp_status,e.fcm_id,e.udte_fcm_devic,e.team_type,e.device_id,date_format(eg.dateCreated,'%l:%i %p') as 'datecreated',t.task_id,sc.sub_cat_name as 'task_sts_name' from employees as e
	 join attendence as a on a.emp_id=e.emp_id and date(i_ts)=curdate()
	 join sify_logs.emp_gps_info as eg on eg.emp_id=a.emp_id and date(eg.datecreated)=curdate()
     left join tasks as t on t.call_attend_by=a.emp_id and date(t.task_created_date)=curdate()
	left join sub_categories as sc on sc.sub_cat_id=e.emp_designation
    where a.punch_status=1 and eg.emp_id=${data.emp_id} order by attendence_id,gps_id desc;`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : getemployeedatalistMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getemployeedatalistMdl = function (data) {
    var fnm = "getemployeedatalistMdl"
	var date = new Date();
	let frmdate = ``
	let todate = ``
	  if (data.frmdate != '' && data.todate != '') {
        frmdate = `'${data.frmdate}'`;
        todate = `'${data.todate}'`;
    } else {
        frmdate = `curdate()`;
        todate = `curdate()`;
    }
	
    var QRY_TO_EXEC = ` SELECT e.emp_name AS 'name', e.emp_id, e.emp_code AS 'emp_code', e.emp_role as emp_role, sc.sub_cat_name as 'task_status_name' , tl.task_status as task_status_id, sc.sub_cat_description as status_colour_code, tl.task_log_lat,tl.task_log_long, DATE_FORMAT(tl.tl_date_created,'%Y-%m-%d  %H:%i:%S') as tl_date_created,t.service_no, case when tl.distance <> 'NaN' or tl.distance is not NULL then tl.distance/1000 else 0 end as total_distance,
    count(distinct(tl.task_id)) as total_tasks_count
    FROM employees AS e
    JOIN task_logs AS tl ON tl.call_attend_by = e.emp_id
    JOIN tasks AS t ON t.task_id =tl.task_id
    JOIN sub_categories AS sc ON sc.sub_cat_id = tl.task_status
    where tl.call_attend_by =${data.emp_id} AND tl.log_type = 2 AND (tl.tl_date_created) between ${frmdate} and ${todate} group by tl.tl_id`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};


/**************************************************************************************
* Controller     : getprsentemplyeegpsMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getprsentemplyeegpsMdl = function (data, user) {
    let clstr = ``
    if(user.emp_designation == 234){
        console.log(user,"useruseruseruseruseruseruseruseruseruseruseruseruser")
        clstr = `and e.cluster_id in (${user.cluster_id})`

    }
    var fnm = "getprsentemplyeegpsMdl"
    var QRY_TO_EXEC = ` SELECT e.emp_name AS 'name', e.emp_id, e.emp_role, e.emp_code AS emp_code, s.shift_name as shift_name, t.task_created_date, e.emp_latitude as base_lat, e.emp_longitude as base_long, DATE_FORMAT(a.punch_in_time, '%Y-%m-%d %H:%i:%s') AS punch_in_time, t.service_no, t.taskAddress, e.emp_mobile, COUNT(DISTINCT(t.task_id)) AS total_tasks_count,
                    #(SELECT battery_percent FROM app_permission_log WHERE emp_id = e.emp_id ORDER BY app_per_id DESC LIMIT 1) AS battery_percent,
                    #COUNT(CASE WHEN t.task_status = 226 THEN 1 ELSE NULL END) AS completetask,
                    COUNT(distinct(concat( CASE WHEN t.task_status in (226,227) THEN t.task_id END))) AS completetask,
                    (select count(*) from tasks where task_status = 217 and mngr = 1 and DATE_FORMAT(task_created_date,'%Y-%m-%d') = curdate()) AS unassigned_open_task,
                    (select punch_status from attendence as aa where e.emp_id = aa.emp_id order by attendence_id desc limit 1) as punch_status,
                    (select sub_cat_name from sub_categories where sub_cat_id = e.emp_designation) as emp_designation,
                    #(select concat(DATE_FORMAT(gps.dateCreated, '%Y-%m-%d %H:%i:%s'),',',gps.gps_lat, ',', gps.gps_lang, ',', gps.full_addr) from sify_logs.emp_gps_info as gps where gps.emp_id = e.emp_id  ORDER BY gps.gps_id DESC LIMIT 1) AS Address
                    (select latest_record from attendence as aa where e.emp_id = aa.emp_id order by attendence_id desc limit 1) AS Address
                    FROM employees AS e
                    LEFT JOIN attendence AS a ON a.emp_id = e.emp_id
                    LEFT join shifts as s on s.shift_id = e.shift_type_id
                    LEFT JOIN tasks AS t ON t.call_attend_by = a.emp_id and t.task_created_date = curdate() and t.parent_id is not null
                    WHERE e.emp_status NOT IN (2)  and e.emp_role in (2,3) ${clstr}
                    GROUP BY e.emp_id
                    ORDER BY e.emp_id DESC;`;
    // var QRY_TO_EXEC = ` SELECT e.emp_name AS 'name', e.emp_id, e.emp_role, e.emp_code AS emp_code, s.shift_name as shift_name, t.task_created_date, e.emp_latitude as base_lat, e.emp_longitude as base_long, DATE_FORMAT(a.punch_in_time, '%Y-%m-%d %H:%i:%s') AS punch_in_time, t.service_no, t.taskAddress, e.emp_mobile, COUNT(DISTINCT(t.task_id)) AS total_tasks_count,
    //                 (SELECT battery_percent FROM app_permission_log WHERE emp_id = e.emp_id ORDER BY app_per_id DESC LIMIT 1) AS battery_percent,
    //                 #COUNT(CASE WHEN t.task_status = 226 THEN 1 ELSE NULL END) AS completetask,
    //                 COUNT(distinct(concat( CASE WHEN t.task_status = 226 THEN t.task_id END))) AS completetask,
    //                 (select count(*) from tasks where task_status = 217 and mngr = 1 and DATE_FORMAT(task_created_date,'%Y-%m-%d') = curdate()) AS unassigned_open_task,
    //                 (select punch_status from attendence as aa where e.emp_id = aa.emp_id order by attendence_id desc limit 1) as punch_status,
    //                 (select sub_cat_name from sub_categories where sub_cat_id = e.emp_designation) as emp_designation,
    //                 (SELECT concat( DATE_FORMAT(tl.tl_date_created, '%Y-%m-%d %H:%i:%s'), ',' ,tl.task_log_lat,  ',' ,tl.task_log_long) FROM task_logs as tl where tl.call_attend_by = e.emp_id and tl.log_type = 2 ORDER BY tl_id DESC LIMIT 1) AS Address
    //                 FROM employees AS e
    //                 LEFT JOIN attendence AS a ON a.emp_id = e.emp_id
    //                 LEFT join shifts as s on s.shift_id = e.shift_type_id
    //                 LEFT JOIN tasks AS t ON t.call_attend_by = a.emp_id and DATE_FORMAT(t.task_created_date,'%Y-%m-%d') = curdate() and t.parent_id is not null
    //                 WHERE e.emp_status NOT IN (2)  and e.emp_role in (2,3) ${clstr}
    //                 GROUP BY e.emp_id
    //                 ORDER BY e.emp_id DESC;`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};

/**************************************************************************************
* Controller     : getprsentemplyee_assigned_task_gpsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 31-05-23 - Initial Function
*
***************************************************************************************/

exports.getprsentemplyee_assigned_task_gpsMdl = function (data, user) {
    var fnm = 'getprsentemplyee_assigned_task_gpsMdl';

    var QRY_TO_EXEC = `select t.task_id as task_id, t.call_attend_by as call_attend_by, e.emp_name as call_attend_by_name, t.taskAddress as taskAddress, t.task_priority as task_priority, t.task_other_issue as task_other_issue, t.call_type as call_type, DATE_FORMAT(t.task_appointment_date,'%Y-%m-%d  %H:%i:%S') as task_appointment_date,  cl.cluster_name as cluster_name,c.pincode as circuit_pincode,
                    (select group_concat(e.emp_name order by st.task_id desc) as call_attended_name from employees as e join tasks as st on st.parent_id = t.parent_id where e.emp_id = st.call_attend_by) as call_attended_name,
                    (select group_concat(sub_cat_name order by st2.task_id desc) as sub_task_status_name from sub_categories as sb join tasks as st2 on sb.sub_cat_id = st2.task_status where st2.parent_id = t.parent_id)  as sub_task_status_name,
                    (select e.emp_name as primary_name from employees as e join tasks as t2 on t2.parent_id=t.parent_id where e.emp_id= t2.call_attend_by and primary_flag=1) as primary_name,
                    (select service_no from tasks as st where st.task_id = t.parent_id) as service_no
                    from tasks as t
                    left join circuits as c on t.circuit_id = c.circuit_id
                    left join clusters as cl on  c.cluster_id = cl.cluster_id
                    left join employees as e on t.call_attend_by = e.emp_id
                    where (date(t.task_created_date) = curdate()) and t.parent_id is not null and t.call_attend_by = ${data.call_attend_by} and t.task_status <> 408 group by t.task_id order by t.task_id desc`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : getempdatactrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 19-06-23 - Initial Function
*
***************************************************************************************/

exports.getempdataMdl = function (data, user) {
    var fnm = 'getempdataMdl';

    var QRY_TO_EXEC = `select emp_name AS 'name', emp_code, emp_role from employees where emp_id  = ${data.call_attend_by}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : getbaselat_longMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/04/2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getbaselat_longMdl = function (data, user) {
    var fnm = 'getbaselat_longMdl';
    if(data.task_status != 410){

        var QRY_TO_EXEC = `select task_latitude as task_log_lat, task_longitude as task_log_long from tasks where parent_id = ${data.task_id} and call_attend_by=${user.emp_id};`
    }else{
        return new Promise((resolve, reject) => {
			resolve(true)
		})
    }
   
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : gettaskstatusnameMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 19-06-23 - Initial Function
*
***************************************************************************************/

exports.gettaskstatusnameMdl = function (data, user) {
    var fnm = 'gettaskstatusnameMdl';

    var QRY_TO_EXEC = `select sub_cat_name, sub_cat_description from sub_categories where sub_cat_id  = ${data.task_status}`;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};


/**************************************************************************************
* Controller     : insertMoniterDataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*   -  shaik 19-06-23 - Initial Function
*
***************************************************************************************/

exports.insertMoniterDataMdl = function (data, emp, task_status_name, user) {
    var fnm = 'insertMoniterDataMdl';
    console.log(emp,"empempemp")
    console.log(task_status_name,"task_status_name")

    if(data.task_status == 410){
        var QRY_TO_EXEC = `insert into moniter_travel_info set date_created = current_timestamp(), 
         task_status = ${data.task_status}, call_attend_by = ${data.call_attend_by}, task_lat = '${data.task_lat}', 
        task_long = "${data.task_long}", full_addr = '${JSON.stringify(data.full_addr).replace(/'/g, "''")}', sub_cat_name = '${task_status_name[0].sub_cat_name}',  emp_name = '${emp[0].name}', 
        emp_code = '${emp[0].emp_code}',  emp_role = ${emp[0].emp_role}, distance = '${data.distance}', sub_cat_description = '${task_status_name[0].sub_cat_description}';`;
    }else{

        var QRY_TO_EXEC = `insert into moniter_travel_info set date_created = current_timestamp(), task_id = ${data.task_id}, 
        task_service_no = '${data.task_service_no}', task_status = ${data.task_status}, call_attend_by = ${data.call_attend_by}, task_lat = '${data.task_lat}', 
        task_long = "${data.task_long}", full_addr = '${JSON.stringify(data.full_addr).replace(/'/g, "''")}', sub_cat_name = '${task_status_name[0].sub_cat_name}',  emp_name = '${emp[0].name}', 
        emp_code = '${emp[0].emp_code}',  emp_role = ${emp[0].emp_role}, distance = '${data.distance}', sub_cat_description = '${task_status_name[0].sub_cat_description}';`;
    }
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};

/**************************************************************************************
* Controller     : updatepunchOutempdataMdl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 01/07/2023    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updatepunchOutempdataMdl = function (data, user) {
    var fnm = "updatepunchOutempdataMdl"

	var d = new Date();
	d.setDate(d.getDate() - 1);
	d=moment(d).format('YYYY-MM-DD');
	var datetime = `${d} 23:59:59`
    var QRY_TO_EXEC = `update attendence set punch_status=0,punch_out_time='${datetime}',punch_out_location ='Force Punch Out' where punch_status=1 and date_format(punch_in_time,'%Y-%m-%d')=curdate() - interval 1 day;`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};