var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : attendanceprcsntMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendanceprcsntMdl = function (data, user, callback) {
	var fnm = "attendanceprcsntMdl"
    var QRY_TO_EXEC = `select *,case when diff=0 then emplyee_ct else emplyee_ct end as present_diff,date_format(curdate()-interval 1 day,'%Y-%m-%d') as timedate,
case when diff=0 then (emplyee_ct-Present-Weekoff) else ((diff)*emplyee_ct-Present-Weekoff) end as absent_diff,
case when diff=0 then ROUND(Present/emplyee_ct*100,2) else ROUND((Present/((diff)*emplyee_ct))*100,2) end as prsnt_prsnt
,case when diff=0 then ROUND((emplyee_ct-Present-Weekoff)/emplyee_ct*100,2) else ROUND((((diff)*emplyee_ct-Present-Weekoff)/((diff)*emplyee_ct))*100,2) end as absnt_prsnt,
case when diff=0 then ROUND(Weekoff/emplyee_ct*100,2) else ROUND(Weekoff/((diff)*emplyee_ct)*100,2) end as wekoff_prsnt
 from (select count(distinct(e.emp_id)) as emplyee_ct,datediff(max(a.i_ts),min(a.i_ts)) as diff,a.i_ts,
sum(case when a.emp_sts = 0 THEN 1 ELSE 0 END) as 'Present',
sum(case when a.emp_sts = 1 THEN 1 ELSE 0 END) as 'Absent',
sum(case when a.emp_sts = 2 THEN 1 ELSE 0 END) as 'Weekoff'
 from employees as e
left join attendence as a on a.emp_id=e.emp_id 
and a.i_ts between '${data.frmdate}:00' and '${data.todate}:00') as a;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : attendancebackprcsntMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancebackprcsntMdl = function (data, user, callback) {
	var fnm = "attendancebackprcsntMdl"
    var QRY_TO_EXEC = `select *,case when diff=0 then emplyee_ct else emplyee_ct end as present_diff,date_format('${data.frmdate}:00','%Y-%m-%d') as timedate,
case when diff=0 then (emplyee_ct-Present-Weekoff) else ((diff)*emplyee_ct-Present-Weekoff) end as absent_diff,
case when diff=0 then ROUND(Present/emplyee_ct*100,2) else ROUND((Present/((diff)*emplyee_ct))*100,2) end as prsnt_prsnt
,case when diff=0 then ROUND((emplyee_ct-Present-Weekoff)/emplyee_ct*100,2) else ROUND((((diff)*emplyee_ct-Present-Weekoff)/((diff)*emplyee_ct))*100,2) end as absnt_prsnt,
case when diff=0 then ROUND(Weekoff/emplyee_ct*100,2) else ROUND(Weekoff/((diff)*emplyee_ct)*100,2) end as wekoff_prsnt
 from (select count(distinct(e.emp_id)) as emplyee_ct,datediff(max(a.i_ts),min(a.i_ts)) as diff,a.i_ts,
sum(case when a.emp_sts = 0 THEN 1 ELSE 0 END) as 'Present',
sum(case when a.emp_sts = 1 THEN 1 ELSE 0 END) as 'Absent',
sum(case when a.emp_sts = 2 THEN 1 ELSE 0 END) as 'Weekoff'
 from employees as e
left join attendence as a on a.emp_id=e.emp_id 
and a.i_ts between '${data.frmdate}:00' and '${data.todate}:00') as a;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : atdnceemplyprcsntMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.atdnceemplyprcsntMdl = function (data, user, callback) {
	var fnm = "atdnceemplyprcsntMdl"
    var QRY_TO_EXEC = `select *,date_format(i_ts,'%Y-%m-%d') as timedate,
 case when diff=0 then ifnull(ROUND((Present_eng+Present_reg)/(ttl_eng+ttl_reg)*100,2),0) else ifnull(ROUND((Present_eng+Present_reg)/(diff*(ttl_eng+ttl_reg))*100,2),0) end as prsnt_prsnt,
 case when diff=0 then ifnull(ROUND((Present_eng)/(ttl_eng_utl)*100,2),0) else ifnull(ROUND((Present_eng)/(diff*(ttl_eng_utl))*100,2),0) end as utlized_eng_prsnt,
 case when diff=0 then ifnull(ROUND((Present_reg)/(ttl_reg_utl)*100,2),0) else ifnull(ROUND((Present_reg)/(diff*(ttl_reg_utl))*100,2),0) end as utlized_reg_prsnt,
 case when diff=0 then ifnull(ROUND((Present_reg+Present_eng)/(ttl_reg_utl+ttl_eng_utl)*100,2),0) else ifnull(ROUND((Present_reg+Present_eng)/(diff*(ttl_reg_utl+ttl_eng_utl))*100,2),0) 
 end as ttl_utlized_prsnt,
 case when diff=0 then ifnull(ROUND((Present_eng+Present_reg)/(ttl_eng_n_utl+ttl_reg_n_utl)*100,2),0) else ifnull(ROUND((Present_eng+Present_reg)/(diff*(ttl_eng_n_utl+ttl_reg_n_utl))*100,2),0) end as ttl_n_utlized_prsnt,
 case when diff=0 then ifnull(ROUND((Present_eng)/(ttl_eng_n_utl)*100,2),0) else ifnull(ROUND((Present_eng)/(diff*(ttl_eng_n_utl))*100,2),0) end as n_utlized_eng_prsnt,
 case when diff=0 then ifnull(ROUND((Present_reg)/(ttl_reg_n_utl)*100,2),0) else ifnull(ROUND((Present_reg)/(diff*(ttl_reg_n_utl))*100,2),0) end as n_utlized_reg_prsnt
 ,case when diff=0 then ifnull(ROUND(((ttl_eng+ttl_reg)-Present_eng-Present_reg-Weekoff_eng-Weekoff_reg)/(ttl_eng+ttl_reg)*100,2),0) else
 ifnull(ROUND((diff*(ttl_eng+ttl_reg)-Present_eng-Present_reg-Weekoff_eng-Weekoff_reg)/(diff*(ttl_eng+ttl_reg))*100,2),0) end as absnt_prsnt,
 case when diff=0 then ifnull(ROUND((Weekoff_eng+Weekoff_reg)/(ttl_eng+ttl_reg)*100,2),0) else ifnull(ROUND((Weekoff_eng+Weekoff_reg)/(diff*(ttl_eng+ttl_reg))*100,2),0) end as wekoff_prsnt,
  ttl_eng as present_eng_diff,
  case when diff=0 then ifnull((ttl_eng-Present_eng-Weekoff_eng),0) else ifnull((diff*ttl_eng-Present_eng-Weekoff_eng),0) end as absent_diff_eng,
 case when diff=0 then ifnull(ROUND(Present_eng/ttl_eng*100,2),0) else ifnull(ROUND(Present_eng/(diff*ttl_eng)*100,2),0) end as prsnt_prsnt_eng
 ,case when diff=0 then ifnull(ROUND((ttl_eng-Present_eng-Weekoff_eng)/(ttl_eng)*100,2),0) else ifnull(ROUND(((diff*ttl_eng)-Present_eng-Weekoff_eng)/(diff*ttl_eng)*100,2),0) end as absnt_prsnt_eng,
 case when diff=0 then ifnull(ROUND(Weekoff_eng/ttl_eng*100,2),0) else ifnull(ROUND(Weekoff_eng/(diff*ttl_eng)*100,2),0) end as wekoff_prsnt_eng,
 ttl_reg as present_reg_diff,
 case when diff=0 then ifnull((ttl_reg-Present_reg-Weekoff_reg),0) else ifnull(((diff*ttl_reg)-Present_reg-Weekoff_reg),0) end as absent_diff_reg,
 case when diff=0 then ifnull(ROUND(Present_reg/ttl_reg*100,2),0) else ifnull(ROUND(Present_reg/(diff*ttl_reg)*100,2),0) end as prsnt_prsnt_reg
 ,case when diff=0 then ifnull(ROUND((ttl_reg-Present_reg-Weekoff_reg)/ttl_reg*100,2),0) else ifnull(ROUND(((diff*ttl_reg)-Present_reg-Weekoff_reg)/(diff*ttl_reg)*100,2),0) end as absnt_prsnt_reg,
 case when diff=0 then ifnull(ROUND(Weekoff_reg/ttl_reg*100,2),0) else ifnull(ROUND(Weekoff_reg/(diff*ttl_reg)*100,2),0) end as wekoff_prsnt_reg,
 (ttl_eng+ttl_reg) as present_diff
  from (
 select count((b.emp_id)) as emplyee_ct,
 sum(case when b.emp_sts = 0 and b.emp_designation=231 THEN 1 ELSE 0 END) as 'Present_eng',
 sum(case when b.emp_sts = 1 and b.emp_designation=231 THEN 1 ELSE 0 END) as 'Absent_eng',
 sum(case when b.emp_sts = 2 and b.emp_designation=231 THEN 1 ELSE 0 END) as 'Weekoff_eng',
 sum(case when b.emp_sts = 0 and b.emp_designation=232 THEN 1 ELSE 0 END) as 'Present_reg',
 sum(case when b.emp_sts = 1 and b.emp_designation=232 THEN 1 ELSE 0 END) as 'Absent_reg',
 sum(case when b.emp_sts = 2 and b.emp_designation=232 THEN 1 ELSE 0 END) as 'Weekoff_reg',
 sum(case when b.emp_designation=231 THEN 1 ELSE 0 END) as 'ttl_eng',
 sum(case when b.emp_designation=232 THEN 1 ELSE 0 END) as 'ttl_reg',
sum(case when b.emp_designation=231 and b.utilization_count <> 0 THEN 1 ELSE 0 END) as 'ttl_eng_utl',
sum(case when b.emp_designation=232 and b.utilization_count <> 0 THEN 1 ELSE 0 END) as 'ttl_reg_utl',
sum(case when b.emp_designation=231 and b.utilization_count = 0 THEN 1 ELSE 0 END) as 'ttl_eng_n_utl',
sum(case when b.emp_designation=232 and b.utilization_count = 0 THEN 1 ELSE 0 END) as 'ttl_reg_n_utl',
 datediff(max(b.i_ts),min(b.i_ts)) as diff,i_ts
 from 
(select e.emp_id,e.emp_designation,a.i_ts,a.emp_sts,a.utilization_count from employees as e
join attendence as a on a.emp_id=e.emp_id and a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
where e.emp_designation in (231,232)) as b) as a`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : atndncChrtengregprcsntMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.atndncChrtengregprcsntMdl = function (data, user, callback) {
	var fnm = "atndncChrtengregprcsntMdl"
    var QRY_TO_EXEC = `select sum(case when e.emp_designation=231 and a.emp_sts=0 then 1 else 0 end) as 'present_eng',
 sum(case when e.emp_designation=232 and a.emp_sts=0 then 1 else 0 end) as 'present_reg',
 sum(case when e.emp_designation=231 and a.emp_sts=1 then 1 else 0 end) as 'absent_eng',
 sum(case when e.emp_designation=232 and a.emp_sts=1 then 1 else 0 end) as 'absent_reg',
 sum(case when e.emp_designation=231 and a.emp_sts=2 then 1 else 0 end) as 'weekoff_eng',
 sum(case when e.emp_designation=232 and a.emp_sts=2 then 1 else 0 end) as 'weekoff_reg',
  sum(case when e.emp_designation=231 and a.emp_sts is null then 1 else 0 end) as 'punchmiss_eng',
  sum(case when e.emp_designation=232 and a.emp_sts is null then 1 else 0 end) as 'punchmiss_reg',s.state_name,c.cluster_name,v.vendor_name,
count(*) as ct,date_format(a.i_ts,'%Y-%m-%d') as timedate,z.zone_name from employees as e
join attendence as a on a.emp_id=e.emp_id
join zones as z on z.zone_id=e.zone_id and z.zone_status=1
join states as s on s.state_id=e.state
join clusters as c on c.cluster_id=e.cluster_id
join vendors as v on v.vendor_id=e.vendor_name
where e.emp_designation in (231,232) and a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
 group by date_format(a.i_ts,'%Y-%m-%d'),e.zone_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : atndnceVndrprcsntMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.atndnceVndrprcsntMdl = function (data, user, callback) {
	var fnm = "atndnceVndrprcsntMdl"
    var QRY_TO_EXEC = `select v.vendor_name,c.cluster_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,sum(case when a.emp_sts=0 then 1 else 0 end) as 'present',
sum(case when a.emp_sts=1 then 1 else 0 end) as 'absent',
sum(case when a.emp_sts=2 then 1 else 0 end) as 'weeklyoff',
count(a.emp_id) as ttl_days,count(distinct(e.emp_id)) as emply_ct,z.zone_name,s.state_name from attendence as a 
join employees as e on e.emp_id=a.emp_id
join vendors as v on v.vendor_id=e.vendor_name
join clusters as c on c.cluster_id=e.cluster_id #on c.state_id=e.state and c.zone_id=e.zone_id
join zones as z on z.zone_id=e.zone_id and z.zone_status=1
join states as s on s.state_id=e.state
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by c.cluster_id,v.vendor_id; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : utliztnsmryMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.utliztnsmryMdl = function (data, user, callback) {
	var fnm = "utliztnsmryMdl"
    var QRY_TO_EXEC = `select z.zone_name,s.state_name,date_format(a.i_ts,'%Y-%m-%d') timedate,sum(case when a.emp_sts=0 and a.utilization_count=0 then 1 else 0 end) as 'not_utilized',
sum(case when a.emp_sts=0 and a.utilization_count>0 then 1 else 0 end) as 'utilized',c.cluster_name,v.vendor_name,
sum(case when a.emp_sts=1 then 1 else 0 end) as 'absent',
sum(case when a.emp_sts=2 then 1 else 0 end) as 'weeklyoff',
sum(case when a.emp_sts <> 0 and a.utilization_count>0 then 1 else 0 end) as 'punch_miss'
 from attendence as a
join employees as e on e.emp_id=a.emp_id
join zones as z on z.zone_id=e.zone_id
join states as s on s.state_id=e.state
join clusters as c on c.cluster_id=e.cluster_id
join vendors as v on v.vendor_id=e.vendor_name
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by z.zone_id,date_format(a.i_ts,'%Y-%m-%d');`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : utliztnClstrsmryMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.utliztnClstrsmryMdl = function (data, user, callback) {
	var fnm = "utliztnClstrsmryMdl"
    var QRY_TO_EXEC = `select z.zone_name,s.state_name,c.cluster_name,date_format(a.i_ts,'%Y-%m-%d') timedate,sum(case when a.emp_sts=0 and a.utilization_count=0 then 1 else 0 end) as 'not_utilized',
sum(case when a.emp_sts=0 and a.utilization_count>0 then 1 else 0 end) as 'utilized',v.vendor_name,
sum(case when a.emp_sts=1 then 1 else 0 end) as 'absent',
sum(case when a.emp_sts=2 then 1 else 0 end) as 'weeklyoff',
sum(case when a.emp_sts <> 0 and a.utilization_count>0 then 1 else 0 end) as 'punch_miss' from attendence as a
join employees as e on e.emp_id=a.emp_id
join clusters as c on c.cluster_id=e.cluster_id #on c.state_id=e.state and c.zone_id=e.zone_id
join zones as z on z.zone_id=c.zone_id
join states as s on s.state_id=c.state_id
join vendors as v on v.vendor_id=e.vendor_name
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by c.cluster_id,date_format(a.i_ts,'%Y-%m-%d')`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : notutlizdmembrMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.notutlizdmembrMdl = function (data, user, callback) {
	var fnm = "notutlizdmembrMdl"
    var QRY_TO_EXEC = `select z.zone_name,s.state_name,date_format(a.i_ts,'%Y-%m-%d') timedate,sum(case when a.emp_sts=0 and a.utilization_count=0 then 1 else 0 end) as 'not_utilized'
,sc.sub_cat_name,c.cluster_name,v.vendor_name
 from attendence as a
join employees as e on e.emp_id=a.emp_id
join zones as z on z.zone_id=e.zone_id
join states as s on s.state_id=e.state
join sub_categories as sc on sc.sub_cat_id=e.emp_designation and sub_cat_id in (231,232)
join clusters as c on c.cluster_id=e.cluster_id
join vendors as v on v.vendor_id=e.vendor_name
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by z.zone_id,date_format(a.i_ts,'%Y-%m-%d'),e.emp_designation;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : utilztntaskcntMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.utilztntaskcntMdl = function (data, user, callback) {
	var fnm = "utilztntaskcntMdl"
    var QRY_TO_EXEC = `select z.zone_name ,s.state_name ,c.cluster_name ,v.vendor_name ,e.emp_name,sc.sub_cat_name as designation,datediff(max(a.i_ts),min(a.i_ts)) as duration,
sum(case when a.emp_sts=0 then 1 else 0 end) as 'present',
sum(case when a.emp_sts=1 then 1 else 0 end) as 'absent',
sum(case when a.emp_sts=2 then 1 else 0 end) as 'weeklyoff', 
sum(case when t.task_status in (218,219) then 1 else 0 end) as tsk_asgn,
sum(case when t.task_status=218 then 1 else 0 end) as task_atnd,date_format(a.i_ts,'%Y-%m-%d') as timedate,
sum(case when t.task_status=219 then 1 else 0 end) as task_cmplt
from attendence as a 
join employees as e on e.emp_id=a.emp_id
join tasks as t on t.emp_id=e.emp_id
join zones as z on z.zone_id=e.zone_id
join states as s on s.state_id=e.state
join sub_categories as sc on sc.cat_id=2 and sc.sub_cat_id=e.emp_designation
join vendors as v on v.vendor_id=e.vendor_name
join clusters as c on c.cluster_id=e.cluster_id #on c.state_id=e.state and c.zone_id=e.zone_id
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by c.cluster_id,sc.sub_cat_id,z.zone_id;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : taskstsrprtMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.taskstsrprtMdl = function (data, user, callback) {
	var fnm = "taskstsrprtMdl"
    var QRY_TO_EXEC = `select sum(case when e.emp_designation=231 then 1 else 0 end) as ttl_eng,
sum(case when e.emp_designation=232 then 1 else 0 end) as ttl_reg,
sum(case when e.emp_designation=231 and t.task_status not in (218,217,408,407) then 1 else 0 end) as task_atnd_eng,
sum(case when e.emp_designation=232 and t.task_status not in (218,217,408,407) then 1 else 0 end) as task_atnd_reg,
sum(case when e.emp_designation=231 and t.task_status not in (217,408,407) then 1 else 0 end) as task_assgn_eng,
sum(case when e.emp_designation=232 and t.task_status not in (217,408,407) then 1 else 0 end) as task_assgn_reg,
sum(case when e.emp_designation=231 and t.task_status=226 then 1 else 0 end) as task_cmplt_eng,date_format(task_created_date,'%Y-%m-%d') as timedate,
sum(case when e.emp_designation=232 and t.task_status=226 then 1 else 0 end) as task_cmplt_reg
 from employees as e 
join tasks as t on t.emp_id=e.emp_id
where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : taskstsGrprprtMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.taskstsGrprprtMdl = function (data, user, callback) {
	var fnm = "taskstsGrprprtMdl"
    var QRY_TO_EXEC = `select sum(case when e.emp_designation=231 then 1 else 0 end) as ttl_eng,
		sum(case when e.emp_designation=232 then 1 else 0 end) as ttl_reg,
		sum(case when e.emp_designation=231 and t.task_status not in (218,217,408,407) then 1 else 0 end) as task_atnd_eng,
		sum(case when e.emp_designation=232 and t.task_status not in (218,217,408,407) then 1 else 0 end) as task_atnd_reg,
		sum(case when e.emp_designation=231 and t.task_status not in (217,408,407) then 1 else 0 end) as task_assgn_eng,
		sum(case when e.emp_designation=232 and t.task_status not in (217,408,407) then 1 else 0 end) as task_assgn_reg,
		sum(case when e.emp_designation=231 and t.task_status=226 then 1 else 0 end) as task_cmplt_eng,
		sum(case when e.emp_designation=232 and t.task_status=226 then 1 else 0 end) as task_cmplt_reg,date_format(task_created_date,'%Y-%m-%d') as timedate,
		z.zone_name,e.emp_designation,s.state_name,c.cluster_name,v.vendor_name
		 from employees as e 
		join tasks as t on t.emp_id=e.emp_id
		join zones as z on z.zone_id=e.zone_id
		join states as s on s.state_id=e.state
		join clusters as c on c.cluster_id=e.cluster_id
		join vendors as v on v.vendor_id=e.vendor_name
		where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232)
		group by e.zone_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}


///////////////////////////////////////////// Today Summary Report //////////////////////////////////////////////

/**************************************************************************************
* Controller     : todaysummaryallTaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryallTaskMdl = function (data, user, callback) {
	var fnm = "todaysummaryallTaskMdl"
    var QRY_TO_EXEC = `select count(*) as cnt,date_format(task_created_date,'%Y-%m-%d') as timedate from employees as e 
		join tasks as t on t.emp_id=e.emp_id
		where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232) and t.parent_id is null`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryIndvdlallTaskMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryIndvdlallTaskMdl = function (data, user, callback) {
	var fnm = "todaysummaryIndvdlallTaskMdl"
    var QRY_TO_EXEC = ` select format(COUNT(CASE
        WHEN task_status = 217 THEN 1
        ELSE NULL
    END), 'NO') as 'Open',format(COUNT(CASE
        WHEN task_status = 218 THEN 1
        ELSE NULL
    END), 'NO') as 'Assigned',format(COUNT(CASE
        WHEN task_status = 219 THEN 1
        ELSE NULL
    END), 'NO') as 'Acknowledged',format(COUNT(CASE
        WHEN task_status = 220 THEN 1
        ELSE NULL
    END), 'NO') as 'Travel',format(COUNT(CASE
        WHEN task_status = 221 THEN 1
        ELSE NULL
    END), 'NO') as 'Onsite - Waiting for Access',format(COUNT(CASE
        WHEN task_status = 222 THEN 1
        ELSE NULL
    END), 'NO') as 'Access Available - WIP',format(COUNT(CASE
        WHEN task_status = 223 THEN 1
        ELSE NULL
    END), 'NO') as 'UAT',format(COUNT(CASE
        WHEN task_status = 224 THEN 1
        ELSE NULL
    END), 'NO') as 'Checklist Submited',format(COUNT(CASE
        WHEN task_status = 225 THEN 1
        ELSE NULL
    END), 'NO') as 'UAT-Success',format(COUNT(CASE
        WHEN task_status = 226 THEN 1
        ELSE NULL
    END), 'NO') as 'Complete',format(COUNT(CASE
        WHEN task_status = 227 THEN 1
        ELSE NULL
    END), 'NO') as 'Approved',format(COUNT(CASE
        WHEN task_status = 271 THEN 1
        ELSE NULL
    END), 'NO') as 'Field Cancelled',format(COUNT(CASE
        WHEN task_status = 272 THEN 1
        ELSE NULL
    END), 'NO') as 'Incomplete',format(COUNT(CASE
        WHEN task_status = 401 THEN 1
        ELSE NULL
    END), 'NO') as 'Request for Reschedule',format(COUNT(CASE
        WHEN task_status = 407 THEN 1
        ELSE NULL
    END), 'NO') as 'Rejected(ServiceNow)',format(COUNT(CASE
        WHEN task_status = 402 THEN 1
        ELSE NULL
    END), 'NO') as 'Access Not Avilable',date_format(task_created_date,'%Y-%m-%d') as timedate from employees as e
  join tasks as t on t.emp_id=e.emp_id 
 join sub_categories as sc on sc.sub_cat_id=t.task_status and cat_id=9
		where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232) group by t.task_status`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryallDocsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryallDocsMdl = function (data, user, callback) {
	var fnm = "todaysummaryallDocsMdl"
    var QRY_TO_EXEC = `select sum(case when a.emp_sts=0 then 1 else 0 end) as 'present',
	 sum(case when a.emp_sts in (1,2) and a.emp_sts in (1,2) then 1 else 0 end) as 'Absent/On_Leave',
	count(*) as ct,date_format(a.i_ts,'%Y-%m-%d') as timedate,sc.sub_cat_name from employees as e
	join attendence as a on a.emp_id=e.emp_id
    join sub_categories as sc on sc.sub_cat_id= e.emp_designation
		where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232) group by e.emp_designation`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryallTaskAssignMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryallTaskAssignMdl = function (data, user, callback) {
	var fnm = "todaysummaryallTaskAssignMdl"
    var QRY_TO_EXEC = `select count(*) as cnt,date_format(task_created_date,'%Y-%m-%d') as timedate from employees as e 
		join tasks as t on t.emp_id=e.emp_id
		where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryIndvdlallTaskAssignMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryIndvdlallTaskAssignMdl = function (data, user, callback) {
	var fnm = "todaysummaryIndvdlallTaskAssignMdl"
    var QRY_TO_EXEC = `select format(COUNT(CASE
        WHEN task_status = 217 THEN 1
        ELSE NULL
    END), 'NO') as 'Open',format(COUNT(CASE
        WHEN task_status = 218 THEN 1
        ELSE NULL
    END), 'NO') as 'Assigned',format(COUNT(CASE
        WHEN task_status = 219 THEN 1
        ELSE NULL
    END), 'NO') as 'Acknowledged',format(COUNT(CASE
        WHEN task_status = 220 THEN 1
        ELSE NULL
    END), 'NO') as 'Travel',format(COUNT(CASE
        WHEN task_status = 221 THEN 1
        ELSE NULL
    END), 'NO') as 'Onsite - Waiting for Access',format(COUNT(CASE
        WHEN task_status = 222 THEN 1
        ELSE NULL
    END), 'NO') as 'Access Available - WIP',format(COUNT(CASE
        WHEN task_status = 223 THEN 1
        ELSE NULL
    END), 'NO') as 'UAT',format(COUNT(CASE
        WHEN task_status = 224 THEN 1
        ELSE NULL
    END), 'NO') as 'Checklist Submited',format(COUNT(CASE
        WHEN task_status = 225 THEN 1
        ELSE NULL
    END), 'NO') as 'UAT-Success',format(COUNT(CASE
        WHEN task_status = 226 THEN 1
        ELSE NULL
    END), 'NO') as 'Complete',format(COUNT(CASE
        WHEN task_status = 227 THEN 1
        ELSE NULL
    END), 'NO') as 'Approved',format(COUNT(CASE
        WHEN task_status = 271 THEN 1
        ELSE NULL
    END), 'NO') as 'Field Cancelled',format(COUNT(CASE
        WHEN task_status = 272 THEN 1
        ELSE NULL
    END), 'NO') as 'Incomplete',format(COUNT(CASE
        WHEN task_status = 401 THEN 1
        ELSE NULL
    END), 'NO') as 'Request for Reschedule',format(COUNT(CASE
        WHEN task_status = 402 THEN 1
        ELSE NULL
    END), 'NO') as 'Access Not Avilable',format(COUNT(CASE
        WHEN task_status = 407 THEN 1
        ELSE NULL
    END), 'NO') as 'Rejected(ServiceNow)',date_format(task_created_date,'%Y-%m-%d') as timedate from employees as e 
		join tasks as t on t.emp_id=e.emp_id
		join sub_categories as sc on sc.sub_cat_id=t.task_status and cat_id=9
		where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryIndvdlallTasklistAssignMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryIndvdlallTasklistAssignMdl = function (data, user, callback) {
	var fnm = "todaysummaryIndvdlallTasklistAssignMdl"
    var QRY_TO_EXEC = `select z.zone_name,z.zone_name,s.state_name,cs.cluster_name,e.emp_name as 'Name',
	sc.sub_cat_name as 'Designation',v.vendor_name as 'Vendor',t.service_no as 'Task_Id',date_format(last_updated_time,'%Y-%m-%d %H:%i:%s') as 'Updated_On',
	sc2.sub_cat_name as 'Status',1 as 'Assign_Count',date_format(task_created_date,'%Y-%m-%d') as timedate
	 from tasks as t
	 join employees as e on e.emp_id = t.call_attend_by
	 join vendors as v on v.vendor_id=e.vendor_name
	 join sub_categories as sc on sc.sub_cat_id=e.emp_designation and sc.cat_id=2
	 join zones as z on z.zone_id=e.zone_id
	 join states as s on s.state_id=e.state
	 join sub_categories as sc2 on sc2.sub_cat_id=t.task_status and sc2.cat_id=9
	join clusters as cs on cs.cluster_id=v.cluster_ids
		where t.task_created_date  between '${data.frmdate}:00' and '${data.todate}:00' group by t.task_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryCnsolidateStsEngMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryCnsolidateStsEngMdl = function (data, user, callback) {
	var fnm = "todaysummaryCnsolidateStsEngMdl"
    var QRY_TO_EXEC = `select sum(case when e.emp_designation=231 and a.emp_sts=0 then 1 else 0 end) as 'present_eng',
	 sum(case when e.emp_designation=231 and a.emp_sts=1 then 1 else 0 end) as 'absent_eng',
	 sum(case when e.emp_designation=231 and a.emp_sts=2 then 1 else 0 end) as 'weekoff_eng',
	count(*) as ct,date_format(i_ts,'%Y-%m-%d') as timedate from employees as e
	join attendence as a on a.emp_id=e.emp_id
		where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231) group by e.emp_designation`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryCnsolidateStsRegMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryCnsolidateStsRegMdl = function (data, user, callback) {
	var fnm = "todaysummaryCnsolidateStsRegMdl"
    var QRY_TO_EXEC = `select sum(case when e.emp_designation=232 and a.emp_sts=0 then 1 else 0 end) as 'present_reg',
	 sum(case when e.emp_designation=232 and a.emp_sts=1 then 1 else 0 end) as 'absent_reg',
	 sum(case when e.emp_designation=232 and a.emp_sts=2 then 1 else 0 end) as 'weekoff_reg',
	count(*) as ct,date_format(i_ts,'%Y-%m-%d') as timedate from employees as e
	join attendence as a on a.emp_id=e.emp_id
		where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (232) group by e.emp_designation`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : todaysummaryLastTskStsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.todaysummaryLastTskStsMdl = function (data, user, callback) {
	var fnm = "todaysummaryLastTskStsMdl"
    var QRY_TO_EXEC = `select z.zone_name,s.state_name,cs.cluster_name,e.emp_name as 'Name',
	sc.sub_cat_name as 'Designation',v.vendor_name as 'Vendor','' as 'Attendance',sc2.sub_cat_name as 'Last_Task_&_Status',1 as 'Count',date_format(task_created_date,'%Y-%m-%d') as timedate
	 from tasks as t
	 join employees as e on e.emp_id = t.call_attend_by
	 join vendors as v on v.vendor_id=e.vendor_name
	 join sub_categories as sc on sc.sub_cat_id=e.emp_designation and sc.cat_id=2
	 join zones as z on z.zone_id=e.zone_id
	 join states as s on s.state_id=e.state
	 join sub_categories as sc2 on sc2.sub_cat_id=t.task_status and sc2.cat_id=9
	join clusters as cs on cs.cluster_id=v.cluster_ids
		where t.task_created_date  between '${data.frmdate}:00' and '${data.todate}:00' group by t.task_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

//////////////////////////////////////////////// Performance Reports

/**************************************************************************************
* Controller     : PerformancetaskNdassignMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PerformancetaskNdassignMdl = function (data, user, callback) {
	var fnm = "PerformancetaskNdassignMdl"
    var QRY_TO_EXEC = `select count(*) as 'Assigned_Tasks',date_format(task_created_date,'%Y-%m-%d') as timedate from tasks where parent_id is null and task_created_date between '${data.frmdate}:00' and '${data.todate}:00';
	select count(*) as 'Assignments' from tasks where task_created_date between '${data.frmdate}:00' and '${data.todate}:00';
	select count(*) as 'Engg/Riggers_Count' from employees where emp_designation in (231,232)`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : PerformanceAssignStsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PerformanceAssignStsMdl = function (data, user, callback) {
	var fnm = "PerformanceAssignStsMdl"
    var QRY_TO_EXEC = `select count(*) as cnt,sc.sub_cat_name,date_format(task_created_date,'%Y-%m-%d') as timedate from employees as e 
		join tasks as t on t.emp_id=e.emp_id
		join sub_categories as sc on sc.sub_cat_id=t.task_status and cat_id=9
		where t.task_created_date between '${data.frmdate}:00' and '${data.todate}:00' and e.emp_designation in (231,232) group by t.task_status`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : attendecedashboardgridoneMdl --- FSM Groupwise Attendance Status
* Parameters     : req,res()
* Description    : FSM Groupwise Attendance Status
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridoneMdl = function (data, user, callback) {
	var fnm = "attendecedashboardgridoneMdl"
    var QRY_TO_EXEC = `select c.cluster_name,s.state_name,z.zone_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,
 sum(case when a.emp_sts = 0 AND e.emp_role = 2 then 1 else 0 end) AS e_present,
  sum(case when a.emp_sts = 1 AND e.emp_role = 2 then 1 else 0 end) AS e_absent,
  sum(case when a.emp_sts = 2 AND e.emp_role = 2 then 1 else 0 end) AS e_weeklyoff,
  sum(case when a.emp_sts = 4 AND e.emp_role = 2 then 1 else 0 end) AS e_onleave,
  sum(case when a.emp_sts IN (0, 1, 2, 4) AND e.emp_role = 2 then 1 else 0 end) AS engineerstotal,
  sum(case when a.emp_sts = 0 AND e.emp_role = 3 then 1 else 0 end) AS r_present,
  sum(case when a.emp_sts = 1 AND e.emp_role = 3 then 1 else 0 end) AS r_absent,
  sum(case when a.emp_sts = 2 AND e.emp_role = 3 then 1 else 0 end) AS r_weeklyoff,
  sum(case when a.emp_sts =  4 AND e.emp_role = 3 then 1 else 0 end) AS r_onleave,
  sum(case when a.emp_sts IN (0, 1, 2, 4) AND e.emp_role = 3 then 1 else 0 end) AS riggerstotal
  from clusters as c
join employees as e on e.cluster_id=c.cluster_id
join attendence as a on a.emp_id=e.emp_id
join states as s on s.state_id=c.state_id
left join zones as z on z.zone_id=e.zone_id
where a.i_ts BETWEEN  '${data.frmdate}:00' and '${data.todate}:00'
group by c.cluster_id `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : attendecedashboardgridtwoMdl
* Parameters     : req,res()
* Description    : Circle Wise Punchin Punchout Status
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridtwoMdl = function (data, user, callback) {
	var fnm = "attendecedashboardgridtwoMdl"
    var QRY_TO_EXEC = `select s.state_name,c.cluster_name,z.zone_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,
  sum(case when a.punch_status = 1  AND e.emp_role = 2 then 1 else 0 end) AS e_punchin,
  sum(case when a.punch_status = 0   AND e.emp_role = 2 then 1 else 0 end) AS e_punchout,
  sum(case when a.punch_status IN (0, 1) AND e.emp_role = 2 then 1 else 0 end) AS e_total,
  sum(case when a.punch_status = 1  AND e.emp_role = 3 then 1 else 0 end) AS r_punchin,
  sum(case when a.punch_status = 0   AND e.emp_role = 3 then 1 else 0 end) AS r_punchout,
  sum(case when a.punch_status IN (0, 1) AND e.emp_role = 3 then 1 else 0 end) AS r_total
  from states as s
  join clusters as c on c.state_id=s.state_id
join employees as e on e.cluster_id=c.cluster_id
join attendence as a on a.emp_id=e.emp_id
join zones as z on z.zone_id=e.zone_id
where a.i_ts BETWEEN '${data.frmdate}:00' and '${data.todate}:00'
group by s.state_name `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : attendecedashboardgridthreeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridthreeMdl = function (data, user, callback) {
	var fnm = "attendecedashboardgridthreeMdl"
    var QRY_TO_EXEC = `select distinct(c.cluster_id) ,c.cluster_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,
COUNT(CASE WHEN TIME(a.punch_in_time) <= '09:30:00' THEN 1 END)  AS ontime_count,
  COUNT(CASE WHEN TIME(a.punch_in_time) > '09:30:00' THEN 1 END) AS late_count,
  (COUNT(CASE WHEN TIME(a.punch_in_time) <= '09:30:00' THEN 1 END) + COUNT(CASE WHEN TIME(a.punch_in_time) > '09:30:00' THEN 1 END)) AS total_count,
z.zone_name,s.state_name from attendence as a 
join employees as e on e.emp_id=a.emp_id
join vendors as v on v.vendor_id=e.vendor_name
join clusters as c on c.cluster_id=e.cluster_id 
join zones as z on z.zone_id=e.zone_id and z.zone_status=1
join states as s on s.state_id=e.state
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by v.vendor_id; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : attendecedashboardgridfiveMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridfiveMdl = function (data, user, callback) {
	var fnm = "attendecedashboardgridfiveMdl"
    var QRY_TO_EXEC = `
	select distinct(c.cluster_id),v.vendor_name,c.cluster_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,sum(case when a.emp_sts=0 then 1 else 0 end) as 'present',
sum(case when a.emp_sts=1 then 1 else 0 end) as 'absent',
SUM((CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) + (CASE WHEN a.emp_sts = 1 THEN 1 ELSE 0 END)) as total,
z.zone_name,s.state_name from attendence as a 
join employees as e on e.emp_id=a.emp_id
join vendors as v on v.vendor_id=e.vendor_name
join clusters as c on c.cluster_id=e.cluster_id #on c.state_id=e.state and c.zone_id=e.zone_id
join zones as z on z.zone_id=e.zone_id and z.zone_status=1
join states as s on s.state_id=e.state
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by v.vendor_id; `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : attendecedashboardgridfourMdl
* Parameters     : req,res()
* Description    : Circle Wise Daily Attendance live
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridfourMdl = function (data, user, callback) {
	var fnm = "attendecedashboardgridfourMdl"
    var QRY_TO_EXEC = `
	   select s.state_name,c.cluster_name,z.zone_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,
 sum(case when a.emp_sts=0 AND e.emp_role =2 then 1 else 0 end) as 'e_present',
 sum(case when a.emp_sts=1 AND e.emp_role =2 then 1 else 0 end) as 'e_absent',
 sum(case when a.emp_sts=2 AND e.emp_role =2 then 1 else 0 end) as 'e_weeklyoff',
 sum(case when a.emp_sts=4 AND e.emp_role =2 then 1 else 0 end) as 'e_onleave',
  SUM(CASE WHEN a.emp_sts IN (0, 1, 2, 4) AND e.emp_role = 2 THEN 1 ELSE 0 END) as engineerstotal,
 sum(case when a.emp_sts=0 AND e.emp_role =3 then 1 else 0 end) as 'r_present',
 sum(case when a.emp_sts=1 AND e.emp_role =3 then 1 else 0 end) as 'r_absent',
 sum(case when a.emp_sts=2 AND e.emp_role =3 then 1 else 0 end) as 'r_weeklyoff',
 sum(case when a.emp_sts=4 AND e.emp_role =3 then 1 else 0 end) as 'r_onleave',
 SUM((case when a.emp_sts=0 AND e.emp_role =3 then 1 else 0 end) + (case when a.emp_sts=1 AND e.emp_role =3 then 1 else 0 end) + (case when a.emp_sts=2 AND e.emp_role =3 then 1 else 0 end)+(case when a.emp_sts=4 AND e.emp_role =3 then 1 else 0 end)) as riggerstotal
 from states as s
  join clusters as c on c.state_id=s.state_id
join employees as e on e.cluster_id=c.cluster_id
join attendence as a on a.emp_id=e.emp_id
join zones as z on z.zone_id=e.zone_id
where a.i_ts between '${data.frmdate}:00' and '${data.todate}:00'
group by s.state_name`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : attendecedashboardgridsixMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridsixMdl = function (data, user, callback) {
	var fnm = "attendecedashboardgridsixMdl"
    var QRY_TO_EXEC = `
			select z.zone_name,c.cluster_name,s.state_name,date_format(a.i_ts,'%Y-%m-%d') as timedate,
sum(case when a.emp_sts=0 AND e.emp_role =2 then 1 else 0 end) as 'e_present',
sum(case when a.emp_sts=1 AND e.emp_role =2 then 1 else 0 end) as 'e_absent',
sum(case when a.emp_sts=2 AND e.emp_role =2 then 1 else 0 end) as 'e_weeklyoff',
sum(case when a.emp_sts=4 AND e.emp_role =2 then 1 else 0 end) as 'e_onleave',
SUM((case when a.emp_sts=0 AND e.emp_role =2 then 1 else 0 end) + (case when a.emp_sts=1 AND e.emp_role =2 then 1 else 0 end) + (case when a.emp_sts=2 AND e.emp_role =2 then 1 else 0 end) + (case when a.emp_sts=4 AND e.emp_role =2 then 1 else 0 end)) as engineerstotal,
sum(case when a.emp_sts=0 AND e.emp_role =3 then 1 else 0 end) as 'r_present',
sum(case when a.emp_sts=1 AND e.emp_role =3 then 1 else 0 end) as 'r_absent',
sum(case when a.emp_sts=2 AND e.emp_role =3 then 1 else 0 end) as 'r_weeklyoff',
sum(case when a.emp_sts=4 AND e.emp_role =3 then 1 else 0 end) as 'r_onleave',
SUM((case when a.emp_sts=0 AND e.emp_role =3 then 1 else 0 end) + (case when a.emp_sts=1 AND e.emp_role =3 then 1 else 0 end) + (case when a.emp_sts=2 AND e.emp_role =3 then 1 else 0 end)+(case when a.emp_sts=4 AND e.emp_role =3 then 1 else 0 end)) as riggerstotal
from zones as z
join employees as e on e.zone_id=z.zone_id
join attendence as a on a.emp_id=e.emp_id
join clusters as c on c.zone_id=z.zone_id
join states as s on s.state_id=c.state_id
where (a.i_ts) BETWEEN '${data.frmdate}:00' and '${data.todate}:00'
and e.emp_status=1  group by z.zone_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : totalengineersandriggersactivedeactive(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.totalengriggeractivedeactiveMdl = function (data, user, callback) {
	var fnm = "totalengriggeractivedeactiveMdl"
    var QRY_TO_EXEC = `select 
c.state_id,e.emp_role,
z.zone_name,s.state_name,r.role_name,
sum(case when e.emp_status=1 AND e.emp_role =2 then 1 else 0 end) as 'enginners-active',
sum(case when e.emp_status=0 AND e.emp_role =2 then 1 else 0 end) as 'engineers-deactive',
sum(case when e.emp_status=1 AND e.emp_role =3 then 1 else 0 end) as 'riggers-active',
sum(case when e.emp_status=0 AND e.emp_role =3 then 1 else 0 end) as 'riggers-deactive'
from employees as e
left join zones as z on z.zone_id=e.zone_id 
left join clusters as c on c.cluster_id=e.cluster_id 
join states as s on s.state_id=c.state_id
left join roles as r on r.role_id=e.emp_role where emp_status not in (2) and emp_designation in (231,232) group by c.state_id ;`
    console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : vendorwiseattendanceMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.vendorwiseattendanceMdl = function (data, user, callback) {
	var fnm = "vendorwiseattendanceMdl"
    var QRY_TO_EXEC = `SELECT  DISTINCT(s.state_name) AS 'state_name',z.zone_name,c.cluster_name,
date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date', v.vendor_name,
    SUM(CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) AS 'present'
FROM attendence AS a
JOIN employees AS e ON e.emp_id = a.emp_id
JOIN vendors AS v ON v.vendor_id = e.vendor_name
JOIN clusters AS c ON e.cluster_id = c.cluster_id
JOIN states AS s ON s.state_id = c.state_id
Join zones as z on z.zone_id=c.zone_id
WHERE e.emp_designation IN (231, 232)
    AND a.emp_sts = 0
GROUP BY DATE(a.punch_in_time), c.state_id, v.vendor_id
ORDER BY DATE(a.punch_in_time) DESC `;
 
 console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : vendorwiseattendancedatefilterMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.vendorwiseattendancedatefilterMdl = function (data, user, callback) {
	var fnm = "vendorwiseattendancedatefilterMdl"
    var QRY_TO_EXEC = `
			SELECT  DISTINCT(s.state_name) AS 'state_name',z.zone_name,c.cluster_name,
date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date', v.vendor_name,
    SUM(CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) AS 'present'
FROM attendence AS a
JOIN employees AS e ON e.emp_id = a.emp_id
JOIN vendors AS v ON v.vendor_id = e.vendor_name
JOIN clusters AS c ON e.cluster_id = c.cluster_id
JOIN states AS s ON s.state_id = c.state_id
Join zones as z on z.zone_id=c.zone_id
WHERE e.emp_designation IN (231, 232)
    AND a.emp_sts = 0 and (a.i_ts) BETWEEN '${data.frmdate}:00' and '${data.todate}:00'
GROUP BY DATE(a.punch_in_time), c.state_id, v.vendor_id
ORDER BY DATE(a.punch_in_time) DESC `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : zonewiseattendanceMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.zonewiseattendanceMdl = function (data, user, callback) {
	var fnm = "zonewiseattendanceMdl"
	
	
    var QRY_TO_EXEC = ` SELECT  DISTINCT(z.zone_name) AS 'zone_name',s.state_name,c.cluster_name,
date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date', v.vendor_name,
    SUM(CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) AS 'present'
FROM attendence AS a
JOIN employees AS e ON e.emp_id = a.emp_id
JOIN vendors AS v ON v.vendor_id = e.vendor_name
JOIN clusters AS c ON e.cluster_id = c.cluster_id
JOIN zones AS z ON z.zone_id = c.zone_id
JOIN states AS s ON s.state_id = c.state_id
WHERE e.emp_designation IN (231, 232)
    AND a.emp_sts = 0 
GROUP BY  z.zone_id  `;
 
 console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : zonewiseattendancedatefilterMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.zonewiseattendancedatefilterMdl = function (data, user, callback) {
	var fnm = "zonewiseattendancedatefilterMdl"
	
	
    var QRY_TO_EXEC = ` SELECT  DISTINCT(z.zone_name) AS 'zone_name',s.state_name,c.cluster_name,
date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date', v.vendor_name,
    SUM(CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) AS 'present'
FROM attendence AS a
JOIN employees AS e ON e.emp_id = a.emp_id
JOIN vendors AS v ON v.vendor_id = e.vendor_name
JOIN clusters AS c ON e.cluster_id = c.cluster_id
JOIN zones AS z ON z.zone_id = c.zone_id
JOIN states AS s ON s.state_id = c.state_id
WHERE e.emp_designation IN (231, 232)
    AND a.emp_sts = 0 and (a.i_ts) BETWEEN '${data.frmdate}:00' and '${data.todate}:00'
GROUP BY  z.zone_id `;
 
 console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : clusterwisevendorattendanceMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.clusterwisevendorattendanceMdl = function (data, user, callback) {
	var fnm = "clusterwisevendorattendanceMdl"
	
	
    var QRY_TO_EXEC = `  SELECT  DISTINCT(c.cluster_name) AS 'cluster_name',z.zone_name as 'zone_name',s.state_name,
 date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date', v.vendor_name,
     SUM(CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) AS 'present'
 FROM attendence AS a
 JOIN employees AS e ON e.emp_id = a.emp_id
 JOIN vendors AS v ON v.vendor_id = e.vendor_name
 JOIN clusters AS c ON e.cluster_id = c.cluster_id
 JOIN zones AS z ON z.zone_id = c.zone_id
 JOIN states AS s ON s.state_id = c.state_id
 WHERE e.emp_designation IN (231, 232)
     AND a.emp_sts = 0 
 GROUP BY  c.cluster_id`;
 
 console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : clusterwiseattendancedatefilterMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.clusterwiseattendancedatefilterMdl = function (data, user, callback) {
	var fnm = "clusterwiseattendancedatefilterMdl"
	
	
    var QRY_TO_EXEC = `  SELECT  DISTINCT(c.cluster_name) AS 'cluster_name',z.zone_name as 'zone_name',s.state_name,
 date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date', v.vendor_name,
     SUM(CASE WHEN a.emp_sts = 0 THEN 1 ELSE 0 END) AS 'present'
 FROM attendence AS a
 JOIN employees AS e ON e.emp_id = a.emp_id
 JOIN vendors AS v ON v.vendor_id = e.vendor_name
 JOIN clusters AS c ON e.cluster_id = c.cluster_id
 JOIN zones AS z ON z.zone_id = c.zone_id
  JOIN states AS s ON s.state_id = c.state_id
 WHERE e.emp_designation IN (231, 232)
     AND a.emp_sts = 0 and (a.i_ts) BETWEEN '${data.frmdate}:00' and '${data.todate}:00'
 GROUP BY  c.cluster_id `;
 
 console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : PanIndiaemplyeeCntMdl
* Parameters     : req,res()
* Description    : Circle Wise Punchin Punchout Status
* Change History :
* 16/08/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PanIndiaemplyeeCntMdl = function (data, user, callback) {
	var fnm = "PanIndiaemplyeeCntMdl"
	// var QRY_TO_EXEC = `select date_format('${data.frm_date}','%Y-%m-%d') as frm_date,date_format('${data.to_date}','%Y-%m-%d') as to_date,
	// T1 as 'T1_emplyee_count',T2 as 'T2_emplyee_count',
	// T3 as 'T3_emplyee_count',T4 as 'T4_emplyee_count',Total as 'total_emplyee',Zone as 'zone_name',Circle as 'state_name',state_id
	 // from PAN_INDIA_VENDOR_MANPOWER_DETAILS 
// where a.emp_sts=0 and date_format(a.i_ts,'%Y-%m-%d') between '${data.frm_date,'%Y-%m-%d'}' and '${data.to_date,'%Y-%m-%d'}' and s.state_name='${data.state_name}' and z.zone_name='${data.zone_name}'	 ;`
    /*var QRY_TO_EXEC = `select count(*) as total_emplyee,z.zone_name,date_format('${data.date}','%Y-%m-%d') as frm_date,date_format('${data.date}','%Y-%m-%d') as to_date,COUNT(CASE
							WHEN e.city_type like '%T1%' THEN 1
							ELSE NULL
						END) as T1_emplyee_count,
						COUNT(CASE
							WHEN e.city_type like '%T2%' THEN 1
							ELSE NULL
						END) as T2_emplyee_count,
						COUNT(CASE
							WHEN e.city_type like '%T3%' THEN 1
							ELSE NULL
						END) as T3_emplyee_count,
						COUNT(CASE
							WHEN e.city_type like '%T4%' THEN 1
							ELSE NULL
						END) as T4_emplyee_count,s.state_name,s.state_id from employees as e
						join zones as z on z.zone_id=e.zone_id and e.vendor_name not in (21,7)
					join clusters as c on c.cluster_id=e.cluster_id
					join states as s on s.state_id=c.state_id
					where emp_designation in (231,232) and emp_status=1 and date(e.date_created)<='${data.date}'

					group by s.state_id order by s.state_id,city_type asc;`;*/
				let where_condition = "1=1";

if (data.state_name) {
    where_condition += ` AND s.state_name = '${data.state_name}'`;
}

if (data.zone_name) {
    where_condition += ` AND z.zone_name = '${data.zone_name}'`;
}
					
	var QRY_TO_EXEC = `select date_format('${data.frm_date}','%Y-%m-%d') as frm_date,date_format('${data.to_date}','%Y-%m-%d') as to_date,
	T1 as 'T1_emplyee_count',T2 as 'T2_emplyee_count',
	T3 as 'T3_emplyee_count',T4 as 'T4_emplyee_count',Total as 'total_emplyee',Zone as 'zone_name',Circle as 'state_name',pi.state_id
	 from PAN_INDIA_VENDOR_MANPOWER_DETAILS as pi 
     join zones as z on z.zone_name=pi.Zone
	 join states as s on s.state_id=pi.state_id 
     where ${where_condition}	 ;`				
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : PanIndiaAttndnceCntMdl
* Parameters     : req,res()
* Description    : Circle Wise Punchin Punchout Status
* Change History :
* 16/08/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PanIndiaAttndnceCntMdl = function (data, user, callback) {
	var fnm = "PanIndiaAttndnceCntMdl"
    // var QRY_TO_EXEC = `select count(*) as total_attnd,z.zone_name,date_format('${data.date}','%Y-%m-%d') as frm_date,date_format('${data.date}','%Y-%m-%d') as to_date,COUNT(CASE
							// WHEN e.city_type like '%T1%' THEN 1
							// ELSE NULL
						// END) as T1_attnd_count,
						// COUNT(CASE
							// WHEN e.city_type like '%T2%' THEN 1
							// ELSE NULL
						// END) as T2_attnd_count,
						// COUNT(CASE
							// WHEN e.city_type like '%T3%' THEN 1
							// ELSE NULL
						// END) as T3_attnd_count,
						// COUNT(CASE
							// WHEN e.city_type like '%T4%' THEN 1
							// ELSE NULL
						// END) as T4_attnd_count,s.state_name,s.state_id from attendence as a
					// join employees as e on e.emp_id=a.emp_id and emp_designation in (231,232) and emp_status=1 and e.vendor_name not in (21,7)
					// join zones as z on z.zone_id=e.zone_id
					// join clusters as c on c.cluster_id=e.cluster_id
					// join states as s on s.state_id=c.state_id
					// where a.emp_sts=0 and date(a.i_ts)='${data.date}'#curdate() - interval 1 day
					// group by s.state_id order by s.state_id,city_type asc;`;
					let where_condition = "1=1";

if (data.state_name) {
    where_condition += ` AND s.state_name = '${data.state_name}'`;
}

if (data.zone_name) {
    where_condition += ` AND z.zone_name = '${data.zone_name}'`;
}


					
					var QRY_TO_EXEC = `select count(*) as total_attnd,z.zone_name,date_format('${data.frm_date}','%Y-%m-%d') as frm_date,date_format('${data.to_date}','%Y-%m-%d') as to_date,state_name,zone_name,COUNT(CASE
							WHEN e.city_type like '%T1%' THEN 1
							ELSE NULL
						END) as T1_attnd_count,
						COUNT(CASE
							WHEN e.city_type like '%T2%' THEN 1
							ELSE NULL
						END) as T2_attnd_count,
						COUNT(CASE
							WHEN e.city_type like '%T3%' THEN 1
							ELSE NULL
						END) as T3_attnd_count,
						COUNT(CASE
							WHEN e.city_type like '%T4%' THEN 1
							ELSE NULL
						END) as T4_attnd_count,s.state_name,s.state_id from attendence as a
					join employees as e on e.emp_id=a.emp_id and emp_designation in (231,232) and emp_status=1 and e.vendor_name not in (21,7)
					join zones as z on z.zone_id=e.zone_id
					join clusters as c on c.cluster_id=e.cluster_id
					join states as s on s.state_id=c.state_id
					where ${where_condition} and a.emp_sts=0 and date_format(a.i_ts,'%Y-%m-%d') between '${data.frm_date,'%Y-%m-%d'}' and '${data.to_date,'%Y-%m-%d'}'  
					group by s.state_id order by s.state_id,city_type asc;`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : PanIndiaTaskCntMdl
* Parameters     : req,res()
* Description    : Circle Wise Punchin Punchout Status
* Change History :
* 16/08/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.PanIndiaTaskCntMdl = function (data, user, callback) {
	var fnm = "PanIndiaTaskCntMdl"
     /* var QRY_TO_EXEC = `select count(*) as total_task,z.zone_name,date_format('${data.date}','%Y-%m-%d') as frm_date,date_format('${data.date}','%Y-%m-%d') as to_date,COUNT(CASE
							WHEN e.city_type like '%T1%' THEN 1
							ELSE NULL
						END) as T1_task_count,
						COUNT(CASE
							WHEN e.city_type like '%T2%' THEN 1
							ELSE NULL
						END) as T2_task_count,
						COUNT(CASE
							WHEN e.city_type like '%T3%' THEN 1
							ELSE NULL
						END) as T3_task_count,
						COUNT(CASE
							WHEN e.city_type like '%T4%' THEN 1
							ELSE NULL
						END) as T4_task_count,s.state_name,s.state_id from tasks as t 
					join task_logs as tl on t.task_id=tl.task_id
					join employees as e on e.emp_id=t.call_attend_by and emp_designation in (231,232) and emp_status=1 and e.vendor_name not in (21,7)
					join zones as z on z.zone_id=e.zone_id
					join clusters as c on c.cluster_id=e.cluster_id
					join states as s on s.state_id=c.state_id
					where tl.task_status=220 and date(tl.tl_date_created) = '${data.date}'#curdate()-interval 1 day
					and (comments not like '%Return Distance%' or comments is null)
					group by s.state_id order by s.state_id asc;`;*/
					let where_condition = "1=1";

if (data.state_name) {
    where_condition += ` AND s.state_name = '${data.state_name}'`;
}

if (data.zone_name) {
    where_condition += ` AND z.zone_name = '${data.zone_name}'`;
}

					var QRY_TO_EXEC = `select count(*) as total_task,z.zone_name,date_format('${data.frm_date}','%Y-%m-%d') as frm_date,date_format('${data.to_date}','%Y-%m-%d') as to_date,
sum(case when e.city_type like '%T1%'  then 1 else 0 end) as  'T1_task_count',
sum(case when e.city_type like '%T2%'  then 1 else 0 end) as  'T2_task_count',
sum(case when e.city_type like '%T3%'  then 1 else 0 end) as  'T3_task_count',
sum(case when e.city_type like '%T4%'  then 1 else 0 end) as  'T4_task_count',
s.state_name,s.state_id from tasks as t 
					join task_logs as tl on t.task_id=tl.task_id
					join employees as e on e.emp_id=t.call_attend_by and emp_designation in (231,232) and emp_status=1 and e.vendor_name not in (21,7)
					join zones as z on z.zone_id=e.zone_id
					join clusters as c on c.cluster_id=e.cluster_id
					join states as s on s.state_id=c.state_id
					where ${where_condition} and tl.task_status=220 and date_format(tl.tl_date_created,'%Y-%m-%d') between '${data.frm_date,'%Y-%m-%d'}' and '${data.to_date,'%Y-%m-%d'}' 
					
					and (comments not like '%Return Distance%' or comments is null)
					group by s.state_id order by s.state_id asc;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : sifyemplyeeDataMdl
* Parameters     : req,res()
* Description    : Circle Wise Punchin Punchout Status
* Change History :
* 17/08/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.sifyemplyeeDataMdl = function (data, user, callback) {
	var fnm = "sifyemplyeeDataMdl"
    var QRY_TO_EXEC = `select z.zone_name,s.state_name,count(*) as total_count,sum(case when emp_designation in (231,232) and emp_status = 1 then 1 else 0 end) as act_ttl_count,date_format('${data.date}','%Y-%m-%d') as frm_date,date_format('${data.date}','%Y-%m-%d') as to_date
				,sum(case when emp_designation = 232 then 1 else 0 end) as rigger_count
				,sum(case when emp_designation in (231,234) then 1 else 0 end) as engneer_count
				,sum(case when emp_designation = 232 and emp_status = 1 then 1 else 0 end) as rigger_act_count
				,sum(case when emp_designation = 232 and emp_status <> 1 then 1 else 0 end) as rigger_inact_count
				,sum(case when emp_designation = 231 and emp_status = 1 then 1 else 0 end) as engneer_act_count
				,sum(case when emp_designation = 231 and emp_status <> 1 then 1 else 0 end) as engneer_inact_count
				,sum(case when emp_designation = 234 then 1 else 0 end) as back_end_count
				from employees as e
				join zones as z on z.zone_id=e.zone_id
				join states as s on s.state_id=e.state
				where emp_designation not in (284) and date(e.date_created)<='${data.date}'
				group by z.zone_id,s.state_id`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}

/**************************************************************************************
* Controller     : circleattendancedatefilterMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.circleattendancedatefilterMdl = function (data, user, callback) {
	var fnm = "circleattendancedatefilterMdl"
	
	
    var QRY_TO_EXEC = `  SELECT  DISTINCT(s.state_name) AS 'state_name',z.zone_name,c.cluster_name,
date_format(a.i_ts,'%Y-%m-%d %H:%i:%s') AS 'attendance_date',
    format(COUNT(CASE
		WHEN a.emp_sts =0 THEN 1
		ELSE NULL
		END), 'NO') AS 'present'
FROM attendence AS a
JOIN employees AS e ON e.emp_id = a.emp_id
JOIN vendors AS v ON v.vendor_id = e.vendor_name
JOIN clusters AS c ON e.cluster_id = c.cluster_id
JOIN states AS s ON s.state_id = c.state_id
Join zones as z on z.zone_id=c.zone_id
WHERE e.emp_designation IN (231, 232)
    AND a.emp_sts = 0 and (a.i_ts) BETWEEN '${data.frmdate}:00' and '${data.todate}:00'
 group by c.state_id
`;
 
 console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}
/**************************************************************************************
* Controller     : southemployeesengineerriggersMdl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.southemployeesengineerriggersMdl = function (data, user, callback) {
	var fnm = "southemployeesengineerriggersMdl"
    var QRY_TO_EXEC = `select s.state_name,z.zone_name,
sum(case when e.emp_designation = 231 THEN 1 ELSE 0 END) as 'Engineers',
sum(case when e.emp_designation = 232 THEN 1 ELSE 0 END) as 'Riggers',
sum(case when e.emp_designation IN (231,232) then 1 else 0 end) as 'Total',
sum(case when e.emp_designation = 231 and e.emp_status=1 THEN 1 ELSE 0 END) as 'EngineersActive',
sum(case when e.emp_designation = 231 and e.emp_status=0 THEN 1 ELSE 0 END) as 'EngineersInactive',
sum(case when e.emp_designation = 231 and e.emp_status in (0,1) THEN 1 ELSE 0 END) as 'totalengineers',
sum(case when e.emp_designation = 232 and e.emp_status=1 THEN 1 ELSE 0 END) as 'RiggersActive',
sum(case when e.emp_designation = 232 and e.emp_status=0 THEN 1 ELSE 0 END) as 'RiggersInactive',
sum(case when e.emp_designation = 232 and e.emp_status in (0,1) THEN 1 ELSE 0 END) as 'TotalRiggers'
from employees as e
 join clusters as c on c.cluster_id = e.cluster_id
 join zones as z on z.zone_id=c.zone_id 
join states as s on s.state_id=c.state_id where z.zone_id in (1,2,3,4)  and emp_designation  in (231,232) and emp_status not in (2) group by c.state_id`;
    console.log(QRY_TO_EXEC); 
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);
}





