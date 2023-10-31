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
   exports.punchinMdl = function (data,distance,user, callback) {

     console.log("success", data)

	 
	 let newlatlong = data.punch_in_lat + " " + data.punch_in_lang

	//var QRY_TO_EXEC = ` insert into attendence (emp_id,username,punch_in_time,punch_in_latlang,punch_in_km,punch_status,emp_sts,utilization_count,i_ts) values(${data.emp_id},'${data.username}',current_timestamp(),'${newlatlong}','${distance}',1,0,0,current_timestamp())`;
    var QRY_TO_EXEC = ` update attendence set u_ts=current_timestamp(),username='${data.username}',punch_in_time=current_timestamp(),punch_in_latlang='${newlatlong}',punch_in_km='${distance}',punch_status=1,emp_sts=0,utilization_count=0 where emp_id=${data.emp_id} and date(i_ts)=curdate()`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : insertclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchinselectMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` select date_format(punch_in_time,'%d-%m-%Y %H:%i:%S') as 'punch_in_time' from attendence where emp_id='${data.emp_id}' order by attendence_id desc limit 1`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchoutMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchoutMdl = function (data, distance,user, callback) {

     console.log("success", data)
	 
	  let newlatlong = data.punch_out_lat + "," + data.punch_out_lang

	var QRY_TO_EXEC = ` update attendence set punch_out_time = current_timestamp(),punch_status=0,punch_out_km='${distance}',punch_out_location='${data.punch_out_location}',punch_out_latlang='${newlatlong}' where emp_id = ${data.emp_id} and punch_out_time is null and punch_in_time is not null`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchoutMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchoutselectMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` select date_format(punch_out_time,'%d-%m-%Y %H:%i:%S') as 'punch_out_time' from attendence where emp_id=${data.emp_id} order by attendence_id desc limit 1 `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/**************************************************************************************
* Controller     : punchoutMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchinoutlistMdl = function (data, user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `select date_format(a.i_ts,'%a %b %e %Y') as 'date',date_format(a.punch_in_time,'%d-%m-%Y %H:%i:%S') as 'punchin',date_format(punch_out_time,'%d-%m-%Y %H:%i:%S') as 'punchout',b.brk_sts,punch_status,
	(SELECT token_status FROM employee_tokens as et WHERE et.emp_id = a.emp_id ORDER BY created_at DESC LIMIT 1) AS token_status,
	    (SELECT image_url FROM employees as et WHERE et.emp_id = a.emp_id ) AS image_url,
	CASE WHEN a.emp_sts=0 then 'present' 
                WHEN a.emp_sts=1 then 'Absent' 
                WHEN a.emp_sts=2 then 'Weekly off' 
                WHEN  a.emp_sts=3 then 'Not available'  end as 'Status'
	 from attendence as a
     left join break_dtl_t as b on b.emp_id=a.emp_id where a.emp_id =${data.emp_id} and a.i_ts between   now() -interval 8 day and now()  group by a.emp_id,date_format(a.i_ts,'%Y-%m-%d') order by a.i_ts desc  `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchoutMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.geofencingMdl = function (data, user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `update attendence set punch_in_km ='${data.punch_in_km}',punch_out_km='${data.punch_out_km}' where emp_id = ${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : emplatlangMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.emplatlangMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `select emp_latitude,emp_longitude from employees where emp_id=${data.emp_id} `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : todaypunchinMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
* 27-07-2023	-	Ramesh Patlola - query optimization
***************************************************************************************/
   exports.todaypunchinMdl = function (data,user, callback) {

     console.log("success", data)
	  let qry= ``;
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

}

	/*var QRY_TO_EXEC = `select count(distinct(a.emp_id)) as count
         from attendence as a
        JOIN employees AS e ON e.emp_id = a.emp_id
   where date_format(i_ts,'%Y-%m-%d')=curdate() and punch_status=1 and emp_role not in (4) ${qry}  ; `*/
      var QRY_TO_EXEC = `select count(distinct(a.emp_id)) as count from attendence as a
		JOIN employees AS e ON e.emp_id = a.emp_id ${qry}
	   where a.i_ts >= CURDATE()
	  AND a.i_ts < CURDATE() + INTERVAL 1 DAY and a.punch_status=1 and e.emp_role <> 4 ;`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : todaypunchinMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
* 27-07-2023	-	Ramesh Patlola - query optimization
***************************************************************************************/
   exports.todaypunchoutcountMdl = function (data,user, callback) {

     console.log("success", data)
	 let qry= ``;
	 
	  if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

         }
	 

	/*var QRY_TO_EXEC = `select count(distinct(a.emp_id)) as 'count' from attendence as a
	join employees as e on e.emp_id=a.emp_id
	where date_format(punch_out_time,'%Y-%m-%d')=curdate() and punch_status=0 and emp_role not in (4) ${qry} ; ; `*/
		var QRY_TO_EXEC = `select count(distinct(a.emp_id)) as count from attendence as a
		JOIN employees AS e ON e.emp_id = a.emp_id ${qry}
	   where a.i_ts >= CURDATE()
	  AND a.i_ts < CURDATE() + INTERVAL 1 DAY and a.punch_status=0 and e.emp_role <> 4;`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : todayabsentMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
* 27-07-2023	-	Ramesh Patlola - query optimization
***************************************************************************************/
   exports.todayabsentMdl = function (data,user, callback) {

     console.log("success", data)
	  let qry= ``;
	 
	  if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

         }

	/*var QRY_TO_EXEC = `select count(distinct(e.emp_id)) as 'absent' from employees as e
     #left JOIN attendence AS a ON a.emp_id = e.emp_id
     #LEFT JOIN tasks AS t ON t.call_attend_by = e.emp_id
   where  e.emp_id NOT IN (
    SELECT emp_id
    FROM attendence
    WHERE DATE(i_ts) = CURDATE() AND emp_sts = 0
) AND e.emp_role IN (2, 3) and emp_status=1 ${qry}`;*/
	
		var QRY_TO_EXEC = `select count(distinct(e.emp_id)) as 'absent' from employees as e
   where  e.emp_id NOT IN (SELECT emp_id FROM attendence WHERE DATE(i_ts) = CURDATE() AND emp_sts = 0 ) AND e.emp_role IN (2, 3) and emp_status=1 ${qry}`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : idlecountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
* 27-07-2023	-	Ramesh Patlola - query optimization
***************************************************************************************/
   exports.idlecountMdl = function (data,user, callback) {

     console.log("success", data)
	 let qry= ``;
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

         }

	/*var QRY_TO_EXEC = `select count(distinct(a.emp_id)) as count from attendence AS a
	 JOIN employees as e ON a.emp_id =e.emp_id
      #left JOIN tasks AS t ON t.call_attend_by=a.emp_id
      where  a.emp_id NOT IN (
    SELECT call_attend_by
    FROM tasks 
    WHERE DATE(task_created_date) = CURDATE() ) 
	AND e.emp_role IN (2,3)
	 and date_format(a.i_ts,'%Y-%m-%d') =curdate() and emp_sts=0 and punch_status=1 ${qry}  `*/
      var QRY_TO_EXEC = `SELECT COUNT(DISTINCT a.emp_id) AS count
		FROM attendence AS a
		JOIN employees AS e ON a.emp_id = e.emp_id ${qry}
		LEFT JOIN tasks AS t ON t.call_attend_by = a.emp_id AND DATE(t.task_created_date) = CURDATE()
		WHERE t.call_attend_by IS NULL
		  AND e.emp_role IN (2, 3)
		  AND DATE(a.i_ts) = CURDATE()
		  AND a.emp_sts = 0
		  AND a.punch_status = 1  ;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : idlecountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
* 27-07-2023	-	Ramesh Patlola - query optimization
***************************************************************************************/
   exports.todaypunchinlistMdl = function (data,user, callback) {

     console.log("success", data)
	 let qry= ``;
	 
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

         }

	/*var QRY_TO_EXEC = `select e.emp_username,sc.sub_cat_name as 'member_type_name',e.emp_name,e.emp_mobile,e.emp_id,e.emp_code,
		#COUNT(DISTINCT t.task_id) AS tasks,app_permissions  AS app_permissions,app_version AS app_version,punch_in_time  AS punch_in_time,punch_out_time  AS punch_out_time,
		  (SELECT punch_status FROM attendence WHERE emp_id = e.emp_id ORDER BY attendence_id DESC LIMIT 1) AS punch_status,
		   (SELECT emp_sts FROM attendence WHERE emp_id = e.emp_id ORDER BY attendence_id DESC LIMIT 1) AS emp_sts,
		e.member_type,t.task_status,e.emp_code,a.punch_in_location,
		IFNULL(SUM(CASE WHEN t.task_status = 218 THEN 1 ELSE 0 END), 0) AS 'assigned',
		IFNULL(SUM(CASE WHEN t.task_status = 226 THEN 1 ELSE 0 END), 0) AS 'complete',
		IFNULL(SUM(CASE WHEN t.task_status = 227 THEN 1 ELSE 0 END), 0) AS 'Approved',
		CASE
			WHEN a.emp_sts = 0 THEN 'present'
			WHEN a.emp_sts = 1 THEN 'Absent'
			WHEN a.emp_sts = 2 THEN 'Weekly off'
			WHEN a.emp_sts = 3 THEN 'Not available'
		END AS 'Status' ,
		(SELECT COUNT(t2.task_id) FROM tasks t2 WHERE t2.call_attend_by = e.emp_id AND date_format(t2.task_created_date,'%Y-%m-%d') = (CURDATE()- INTERVAL 1 DAY)) AS 'previous_date_tasks' from employees as e
		left join attendence as a on a.emp_id=e.emp_id
		 LEFT JOIN tasks AS t ON t.call_attend_by = e.emp_id
		 left join sub_categories as sc on sc.sub_cat_id=e.member_type
		where emp_status=1 and emp_role in (2,3) ${qry} group by e.emp_id order by a.attendence_id desc;`*/
		
		var QRY_TO_EXEC = `WITH latest_attendance AS (
			SELECT emp_id, punch_status, emp_sts ,punch_in_time ,punch_out_time, punch_in_location, attendence_id
			FROM attendence
			WHERE DATE(i_ts) = CURDATE()
		)
		, task_counts AS (
			SELECT call_attend_by,
				   SUM(task_status = 218) AS assigned,
				   SUM(task_status = 226) AS complete,
				   SUM(task_status = 227) AS Approved,
				   COUNT(task_id) AS tasks
			FROM tasks
			WHERE DATE(task_created_date) = CURDATE()
			GROUP BY call_attend_by
		)
		, previous_date_tasks AS (
			SELECT call_attend_by, COUNT(task_id) AS previous_date_tasks
			FROM tasks
			WHERE DATE(task_created_date) = (CURDATE() - INTERVAL 1 DAY)
			GROUP BY call_attend_by
		)
		SELECT e.emp_username,
			   sc.sub_cat_name AS 'member_type_name',
			   e.emp_name,
			   e.emp_mobile,
			   e.emp_id,
			   e.emp_code,
			   a.attendence_id,
			   IFNULL(tc.tasks, 0) AS tasks,
			   e.app_permissions AS app_permissions,
			   e.app_version AS app_version,
			   a.punch_in_time,
			   a.punch_out_time,
			   a.punch_status,
			   a.emp_sts,
			   e.member_type,
               e.updated_on,
			   t.task_status,
			   e.emp_code,
			   a.punch_in_location,
			   IFNULL(tc.assigned, 0) AS 'assigned',
			   IFNULL(tc.complete, 0) AS 'complete',
			   IFNULL(tc.Approved, 0) AS 'Approved',
			   CASE
				   WHEN a.emp_sts = 0 THEN 'present'
				   WHEN a.emp_sts = 1 THEN 'Absent'
				   WHEN a.emp_sts = 2 THEN 'Weekly off'
				   WHEN a.emp_sts = 3 THEN 'Not available'
				    WHEN a.emp_sts = 5 THEN 'Comp-off'
		   WHEN a.emp_sts = 6 THEN 'Holiday'
		   WHEN a.emp_sts is null THEN 'Absent'
			   END AS 'Status',
			   IFNULL(pdt.previous_date_tasks, 0) AS 'previous_date_tasks'
		FROM employees AS e
		LEFT JOIN latest_attendance AS a ON a.emp_id = e.emp_id
		LEFT JOIN tasks AS t ON t.call_attend_by = e.emp_id
		LEFT JOIN sub_categories AS sc ON sc.sub_cat_id = e.member_type
		LEFT JOIN task_counts AS tc ON tc.call_attend_by = e.emp_id
		LEFT JOIN previous_date_tasks AS pdt ON pdt.call_attend_by = e.emp_id
		WHERE e.emp_status = 1 AND e.emp_role IN (2, 3) ${qry} group by e.emp_id
		ORDER BY a.attendence_id DESC;`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : todaypunchinbyfiltersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.todaypunchinbyfiltersMdl = function (data,user, callback) {

     let whr = ``;
     let typ = ``;
	 let qry = ``;
		if(data.id  == 1){
       
        whr =  ` `;
    } else if (data.id  == 2 ) {
        whr = ` date(a.i_ts)=curdate() `;
    } else if (data.id  == 3) {
        
		whr = `
	e.emp_role IN (2, 3)
    AND DATE(a.i_ts) = CURDATE()
    AND a.emp_sts = 0
    AND a.punch_status = 1
    AND e.emp_status = 1
    and t.task_id is NULL`;
    } else if (data.id  == 4) {
        whr = ` date(a.punch_out_time)= curdate() and punch_status=0 and e.emp_role not in (4)`;
    } else if (data.id  == 5) {
        whr = `  date(punch_in_time)=curdate() and a.emp_sts=0 and punch_status=1 and e.emp_role not in (4)`;
    } else if (data.id  == 6) {
        whr = `   e.emp_id NOT IN (
    SELECT emp_id
    FROM attendence
    WHERE DATE(i_ts) = CURDATE() AND emp_sts  in (0,2,3,4,5,6)
) AND e.emp_role IN (2, 3) and emp_status=1`;
    } else if (data.id  == 7) {
        whr = ` a.emp_sts = 4 and date(i_ts)= curdate()`;
    } 
	/*if(data.id  == 1){
       
        whr =  ` `;
    } else if (data.id  == 2 ) {
        whr = ` date_format(a.i_ts,'%Y-%m-%d')=curdate() `;
    } else if (data.id  == 3) {
        whr = `a.emp_id NOT IN (
    SELECT call_attend_by
    FROM tasks 
    WHERE DATE(task_created_date) = CURDATE() ) 
AND e.emp_role IN (2,3)
 and date_format(a.i_ts,'%Y-%m-%d') =curdate() and emp_sts=0 and punch_status=1 `;
    } else if (data.id  == 4) {
        whr = ` date_format(a.punch_out_time,'%Y-%m-%d ')= curdate() and punch_status=0 and e.emp_role not in (4)`;
    } else if (data.id  == 5) {
        whr = `  date_format(punch_in_time,'%Y-%m-%d')=curdate() and a.emp_sts=0 and e.emp_role not in (4)`;
    } else if (data.id  == 6) {
        whr = `  e.emp_id NOT IN (
    SELECT emp_id
    FROM attendence
    WHERE DATE(i_ts) = CURDATE() AND emp_sts = 0
) AND e.emp_role IN (2, 3) and emp_status=1`;
    } else if (data.id  == 7) {
        whr = ` curdate() between date_format(leave_from_date,'%Y-%m-%d') and date_format(leave_to_date,'%Y-%m-%d') and leave_status=1`;
    } */
  // if(data.type  == 1){
       
        // typ =   `and e.member_type=1  `;
    // } else if (data.type  == 2 ) {
        // typ =  ` and e.member_type=2 `;
    // } else if (data.type  == 3) {
        // typ =   `and e.member_type=3`;
    // } 
	if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

         }
		  //if(data.type != '' ){
       
             //typ =   `and e.cluster_id in (${data.typ}) `;
		  //}

	var QRY_TO_EXEC = `SELECT e.emp_username,a.attendence_id,sc.sub_cat_name AS 'member_type_name',e.emp_name,a.emp_sts,e.emp_mobile,e.updated_on,e.emp_id,e.emp_code,a.punch_status,
  COALESCE(previous_date_tasks, 0) AS 'previous_date_tasks',app_version AS app_version,punch_in_time AS punch_in_time,punch_out_time AS punch_out_time,
  e.member_type,t.task_status,e.emp_code,a.punch_in_location,
  CASE
    WHEN t.task_status = 218 THEN 1
    ELSE 0
  END AS 'assigned',
  CASE
    WHEN t.task_status = 226 THEN 1
    ELSE 0
  END AS 'complete',
  CASE
    WHEN t.task_status = 227 THEN 1
    ELSE 0
  END AS 'Approved',
  CASE
    WHEN a.emp_sts = 0 THEN 'present'
    WHEN a.emp_sts = 1 THEN 'Absent'
    WHEN a.emp_sts = 2 THEN 'Weekly off'
    WHEN a.emp_sts = 3 THEN 'Not available'
	WHEN a.emp_sts = 5 THEN 'Comp-off'
		WHEN a.emp_sts = 6 THEN 'Holiday'
		WHEN a.emp_sts is null THEN 'Absent'
  END AS 'Status'
FROM employees AS e
LEFT JOIN attendence AS a ON a.emp_id = e.emp_id and date(i_ts)=curdate()
LEFT JOIN tasks AS t ON t.call_attend_by = e.emp_id AND DATE(t.task_created_date) = CURDATE()
#LEFT JOIN leave_requests AS l ON l.emp_id = e.emp_id
LEFT JOIN sub_categories AS sc ON sc.sub_cat_id = e.member_type
LEFT JOIN (
  SELECT call_attend_by, COUNT(task_id) AS previous_date_tasks
  FROM tasks
  WHERE date(task_created_date)
  GROUP BY call_attend_by
) AS subq ON e.emp_id = subq.call_attend_by
  where ${whr} ${typ} ${qry}  group by e.emp_id;`
    /*var QRY_TO_EXEC = `select e.emp_username,a.attendence_id,sc.sub_cat_name as 'member_type_name',e.emp_name,a.emp_sts,e.emp_mobile,e.updated_on, e.app_permissions AS app_permissions, e.emp_id,e.emp_code,a.punch_status,
    #COUNT(DISTINCT t.task_id) AS tasks,app_permissions  AS app_permissions,app_version AS app_version,punch_in_time  AS punch_in_time,punch_out_time  AS punch_out_time,
    e.member_type,t.task_status,e.emp_code,a.punch_in_location,
    IFNULL(SUM(CASE WHEN t.task_status = 218 THEN 1 ELSE 0 END), 0) AS 'assigned',
    IFNULL(SUM(CASE WHEN t.task_status = 226 THEN 1 ELSE 0 END), 0) AS 'complete',
    IFNULL(SUM(CASE WHEN t.task_status = 227 THEN 1 ELSE 0 END), 0) AS 'Approved',
    CASE
        WHEN a.emp_sts = 0 THEN 'present'
        WHEN a.emp_sts = 1 THEN 'Absent'
        WHEN a.emp_sts = 2 THEN 'Weekly off'
        WHEN a.emp_sts = 3 THEN 'Not available'
    END AS 'Status' ,
    (SELECT COUNT(t2.task_id) FROM tasks t2 WHERE t2.call_attend_by = e.emp_id AND date_format(t2.task_created_date,'%Y-%m-%d') = (CURDATE()- INTERVAL 1 DAY)) AS 'previous_date_tasks'
    from employees as e
     left JOIN attendence AS a ON a.emp_id = e.emp_id
     LEFT JOIN tasks AS t ON t.call_attend_by = e.emp_id
 LEFT JOIN leave_requests AS l ON l.emp_id = e.emp_id
  left join sub_categories as sc on sc.sub_cat_id=e.member_type
 where ${whr} ${typ} ${qry}  group by e.emp_id; `*/
	
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : notificationcountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.notificationcountMdl = function (data,user, callback) {

    console.log("success", data)

   var QRY_TO_EXEC = `select *, DATE_FORMAT(dateCreated,'%Y-%m-%d %H:%i:%S') as dateCreated  from notification_log where emp_id =${data.emp_id} order by dateCreated desc`
   
   console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : absentinsertionMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.absentinsertionMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `update attendence set u_ts=current_timestamp(),emp_sts=1 where emp_id =${data.emp_id}  `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : notavailableMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.notavailableMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `update attendence set emp_sts=2 where emp_id =${data.emp_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : availableMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.availableMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `update attendence set emp_sts=0 where emp_id =${data.emp_id}  `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : startbreakMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.startbreakMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` insert into break_dtl_t(emp_id,brk_strt_time,brk_sts,i_ts) values (${data.emp_id},current_timestamp(),1,current_timestamp()) `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : endbreakMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.endbreakMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` update break_dtl_t set u_ts= current_timestamp(),brk_end_time= current_timestamp(),brk_sts=0 where emp_id=${data.emp_id}`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : totalpunchintimeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.totalpunchintimeMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `SELECT timediff(current_timestamp() , punch_in_time )  AS 'difference'
FROM attendence where emp_id=${data.emp_id} order by attendence_id desc limit 1;`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : insertempgpsinfoMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.insertempgpsinfoMdl = function (data,user, callback) {


	var QRY_TO_EXEC = ` insert into emp_gps_info (emp_id,gps_lat,gps_lang,full_addr,dateCreated) values(${data.emp_id},'${data.gps_lat}','${data.gps_lang}','${JSON.stringify(data.full_addr).replace(/'/g, "''")}',current_timestamp())`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.BatchConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : gettasklogMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.gettasklogMdl = function (data,user, callback) {

	var QRY_TO_EXEC = `select es.full_addr as 'place',t.comments,t.task_status as 'task_status_name',t.task_id,sb.sub_cat_name ,task_log_lat,task_log_long,date_format(t.tl_date_created,'%Y-%m-%d') from task_logs as t
join sify_logs.emp_gps_info as es on  es.emp_id= t.emp_id 
join sub_categories as sb on sb.sub_cat_id= t.task_status where t.task_id=${data.task_id} and t.emp_id=${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : totalbreaktimeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.totalbreaktimeMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `SELECT 
	timediff(brk_end_time ,brk_strt_time ) AS 'diff_time',brk_id
FROM break_dtl_t where emp_id=${data.emp_id}  order by brk_id desc ;`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : totalbreaktimeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.updatetimediffMdl = function (data,timediff,breakid,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` update break_dtl_t set diff_time='${timediff}' where brk_id= ${breakid} ;`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : totalcurntandbrktimeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.totalcurntandbrktimeMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = [` SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(diff_time))) AS 'breakcount' from break_dtl_t where date_format(i_ts,'%Y-%m-%d')= curdate() and emp_id= ${data.emp_id};`,
`SELECT timediff(current_timestamp() ,punch_in_time ) AS 'totalpunchtime'
    FROM attendence where emp_id= ${data.emp_id} and date_format(i_ts,'%Y-%m-%d')= curdate() order by attendence_id desc limit 1;`]
    
    console.log(QRY_TO_EXEC);
    return dbutil.execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : totalcurntandbrktimeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
  
   exports.totalattendencecountMdl = function (data,user, callback) {

     console.log("success", data)
	  let qry = ``;
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

}

	var QRY_TO_EXEC = `select count(distinct(a.emp_id)) as count from attendence as a 
	join employees as e on e.emp_id=a.emp_id
	where date_format(i_ts,'%Y-%m-%d') = curdate() ${qry}  `
    
    console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : onleavecountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
  
   exports.onleavecountMdl = function (data,user, callback) {

     console.log("success", data)
	 let qry= ``;
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

         }

	var QRY_TO_EXEC = `SELECT COUNT(distinct(l.emp_id)) AS leave_count
FROM employees AS e
LEFT JOIN leave_requests AS l ON l.emp_id = e.emp_id
WHERE curdate() between date(leave_from_date) and date(leave_to_date) ${qry}
and leave_status=1;`
    
    console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : getteamuseremployeelistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
  
   exports.getteamuseremployeelistMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = `select battery_percent  AS battery_percent, app_version  AS app_version,
    emp_designation,e.emp_email,e.emp_mobile,e.address,e.emp_username,e.emp_id,e.emp_code,sub_cat_name
from employees as e
 join sub_categories as sc on sc.sub_cat_id=emp_designation
 where e.emp_id=${data.emp_id} group by emp_id`
    
    console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : ontimeandlatecountMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
  
   exports.ontimeandlatecountMdl = function (data,user, callback) {

     console.log("success", data)
	 
	  let qry = ``;
	 
	 if (user.emp_designation == 234){
        qry = ` and e.cluster_id in (${user.cluster_id})`

}

	var QRY_TO_EXEC = ` SELECT
  COUNT(CASE WHEN TIME(punch_in_time) <= '09:30:00' THEN 1 END)  AS ontime_count,
  COUNT(CASE WHEN TIME(punch_in_time) > '09:30:00' THEN 1 END) AS late_count
 FROM attendence as a  
join employees as e on e.emp_id=a.emp_id
 WHERE DATE(punch_in_time) = CURDATE() and e.emp_role not in (4) and a.emp_sts = 0  ${qry};`
    
    console.log(QRY_TO_EXEC);
   return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : apppermissionlogdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.apppermissionlogdataMdl = function (data,user, callback) {

    console.log("success", data)
    var QRY_TO_EXEC = `select ap.*,date_format(date_created,'%Y-%m-%d %H:%i:%S') as 'date_created' from app_permission_log as ap where emp_id=${data.emp_id} order by date_created desc limit 10;  `
	//var QRY_TO_EXEC = `select ap.*,date_format(date_created,'%Y-%m-%d %h:%m:%s') as 'date_created' from app_permission_log as ap where emp_id=${data.emp_id} order by date_created desc limit 10;  `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchinwebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchinwebMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` insert into attendence (emp_id,username,punch_in_time,punch_status,emp_sts,i_ts) values(${data.emp_id},'${data.username}',current_timestamp(),1,0,current_timestamp())`;
    //var QRY_TO_EXEC = ` update attendence set u_ts=current_timestamp(),username='${data.username}',punch_in_time=current_timestamp(),punch_status=1,emp_sts=0,utilization_count=0 where emp_id=${data.emp_id} and date(i_ts)=curdate()`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchinselectwebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchinselectwebMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` select date_format(punch_in_time,'%d-%m-%Y %H:%i:%S') as 'punch_in_time' from attendence where emp_id='${data.emp_id}' order by attendence_id desc limit 1`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
// /**************************************************************************************
// * Controller     : insertempgpswebinfoMdl
// * Parameters     : req,res()
// * Description    : get details of all EntrpeCstmrTyp
// * Change History :
// * 21/11/2022   -  durga  - Initial Function
// *
// ***************************************************************************************/
// exports.insertempgpswebinfoMdl = function (data,user, callback) {


	// var QRY_TO_EXEC = ` insert into emp_gps_info (emp_id,gps_lat,gps_lang,full_addr,dateCreated) values(${data.emp_id},'${data.gps_lat}','${data.gps_lang}','${data.full_addr}',current_timestamp())`;
    
    // console.log(QRY_TO_EXEC);
    // return dbutil.execQuery(sqldb.BatchConPool, QRY_TO_EXEC, cntxtDtls, user);
// }
/**************************************************************************************
* Controller     : punchoutwebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchoutwebMdl = function (data,user, callback) {

     console.log("success", data)
	 
	  

	var QRY_TO_EXEC = ` update attendence set punch_out_time = current_timestamp(),punch_status=0 where emp_id = ${data.emp_id} and punch_out_time is null `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchoutwebselectMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchoutwebselectMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` select date_format(punch_out_time,'%d-%m-%Y %H:%i:%S') as 'punch_out_time' from attendence where emp_id=${data.emp_id} order by attendence_id desc limit 1 `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : punchinbasedonstatuslistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.punchinbasedonstatuslistMdl = function (data,user, callback) {

     console.log("success", data)

	var QRY_TO_EXEC = ` select date_format(punch_in_time,'%d-%m-%Y %H:%i:%S') as 'punch_in_time',punch_status from attendence where emp_id=${data.emp_id} order by attendence_id desc limit 1 `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : editattendencestatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.editattendencestatusMdl = function (data,user, callback) {

     console.log("success", data)
	 
	 
	let qry =``

    if(data.emp_sts){
        qry = qry + ` ,emp_sts = '${data.emp_sts}'`
    }
    if(data.punch_status){
        qry = qry + ` ,punch_status = ${data.punch_status} `
    }
	if(data.punch_in_time){
        qry = qry + ` ,punch_in_time = current_timestamp() `
    }
	if(data.punch_out_time){
        qry = qry + ` ,punch_out_time = current_timestamp() `
    }
	 
	 
	var QRY_TO_EXEC = ` update attendence set u_ts = current_timestamp() ${qry} where attendence_id=${data.attendence_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}
/**************************************************************************************
* Controller     : insertattendencewebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.insertattendencewebMdl = function (data,user, callback) {

     console.log("success", data)
	
	 
	 let qry1 = ``;
	 let qry12 = ``;
	 let qry2 = ``;
	 let qry22 = ``;
	 let qry3 = ``;
	 let qry32 = ``;
	 if(data.punch_in_time){
        qry1 = ` ,punch_in_time `
        qry12 = ` ,current_timestamp()`
    }
    if(data.punch_out_time){
        qry2 = ` ,punch_out_time`
        qry22 = ` ,current_timestamp()`
    }
    if(data.punch_status){
        qry3 = ` ,punch_status`
        qry32 = ` ,${data.punch_status}`
    }
	 
	 //var QRY_TO_EXEC = ` insert into attendence set emp_id = ${data.emp_id},username = '${data.username}',punch_status = ${data.punch_status},emp_sts = ${data.emp_sts} ,i_ts = current_timestamp() ${qry} `;
	 var QRY_TO_EXEC = ` insert into attendence ( emp_id,username,emp_sts,i_ts ${qry1} ${qry2} ${qry3}) values ( ${data.emp_id},'${data.username}',${data.emp_sts} , current_timestamp() ${qry12} ${qry22} ${qry32} ) `;
	
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}







