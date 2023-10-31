var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var FCM = require('fcm-node');
var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : insertemployeeMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.insertleavereqMdl = function (data, user, callback) {
    var fnm = 'insertleavereqMdl';

	var QRY_TO_EXEC = `insert into leave_requests ( type, emp_id, req_emp_id, leave_from_date, leave_to_date, leave_reason, no_of_days, dateCreated, leave_status, approved_by, approved_remarks)
	values('${data.type}',${data.emp_id},${data.req_emp_id},'${data.leave_from_date}','${data.leave_to_date}','${data.leave_reason}',${data.no_of_days},current_timestamp(),0,${data.approved_by},'${data.approved_remarks}')`;
    
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
exports.updateleavereqMdl = function (data, user, callback) {
    var fnm = 'updateleavereqMdl';

	var QRY_TO_EXEC = ` update leave_requests set updatedOn = current_timestamp(),type=${data.type},req_emp_id=${data.req_emp_id},leave_from_date='${data.leave_from_date}',leave_to_date='${data.leave_to_date}',leave_reason='${data.leave_reason}',no_of_days=${data.no_of_days},leave_status=${data.leave_status},approved_by=${data.approved_by},approved_remarks='${data.approved_remarks}' where emp_id = ${data.emp_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : leavereqlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.leavereqlistMdl = function (data, user, callback) {
    var fnm = 'leavereqlistMdl';
	let qry = ``
	 if(data.fromDate){
       
        qry = ` date_format(leave_from_date,'%Y-%m-%d') >= '${data.fromDate}'`
    }
    if(data.toDate){
        
        qry = qry + ` and date_format(leave_to_date,'%Y-%m-%d ') <= '${data.toDate}'`
    }
	


	var QRY_TO_EXEC =`select * from leave_requests where ${qry} and emp_id=${data.emp_id}`;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : leavereqlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.leavereqlistbyidMdl = function (id, user, callback) {
    var fnm = 'leavereqlistbyidMdl';

	var QRY_TO_EXEC =`select *,date_format(leave_from_date,'%d-%m-%Y %H:%i:%S') as 'leave_from_date',date_format(leave_to_date,'%d-%m-%Y %H:%i:%S') as 'leave_to_date',date_format(dateCreated,'%d-%m-%Y %H:%i:%S') as 'dateCreated' from leave_requests where emp_id = ${id}`;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : leavereqlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.yeartotalleavesMdl = function (data, user, callback) {
    var fnm = 'yeartotalleavesMdl';

	var QRY_TO_EXEC =`  SELECT 
(e.total_leaves - IFNULL(l.approved_by,0)) AS balance,
IFNULL(l.approved_by, 0) as 'taken',
IFNULL(l.no_of_days, 0) as 'applied'
 FROM employees as e
 left join leave_requests as l on e.emp_id=l.emp_id 
 where e.emp_id= ${data.emp_id} group by l.emp_id `;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : leavereqlistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.requestedleaveslistMdl = function (data, user, callback) {
    var fnm = 'requestedleaveslistMdl';
    var whr =``;
	
	if(data.id == 0) {
		whr= `and leave_status=${data.id}`
	}
	if (data.id == 1) {
		whr= `and leave_status=${data.id}`
	}
	

	var QRY_TO_EXEC =` SELECT l.*
 FROM employees as e
 left join leave_requests as l on e.emp_id=l.emp_id 
 where e.emp_id=${data.emp_id} ${whr} order by l_req_id desc `;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : leavereqdataweblistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.leavereqdataweblistMdl = function (data, user, callback) {
    var fnm = 'leavereqdataweblistMdl';
	


	var QRY_TO_EXEC =`select l.*,e.emp_name as 'approved_by_name'
	  from leave_requests as l 
      left join employees as e on e.emp_id=l.approved_by 
      #left join roles as r on r.role_id=l.approved_by 
      where l.emp_id=${data.emp_id} order by l_req_id desc` ;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : leaverequestcountweblistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.leaverequestcountweblistMdl = function (data, user, callback) {
    var fnm = 'leaverequestcountweblistMdl';
	


	var QRY_TO_EXEC =`SELECT 
    e.total_leaves - COALESCE(SUM(CASE WHEN l.leave_status = 1 THEN 1 ELSE 0 END), 0) 
    AS balance,
    COALESCE(SUM(CASE WHEN l.leave_status = 1 THEN 1 ELSE 0 END), 0) AS taken,
    COALESCE(SUM(CASE WHEN l.leave_status = 0 THEN 1 ELSE 0 END), 0) AS applied,
    COALESCE(SUM(CASE WHEN l.leave_status = 2 THEN 1 ELSE 0 END), 0) AS rejected,
    e.total_leaves
FROM employees AS e
LEFT JOIN leave_requests AS l ON l.emp_id = e.emp_id
WHERE e.emp_id =${data.emp_id} GROUP BY
        e.emp_id;`;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : rejectleaveMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.rejectleaveMdl = function (data, user, callback) {
    var fnm = 'rejectleaveMdl';
	


	var QRY_TO_EXEC =`update leave_requests set leave_status=${data.leave_status},approved_by =${data.approved_by} where l_req_id=${data.l_req_id} and emp_id=${data.emp_id} `;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : approvedleaveMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.approvedleaveMdl = function (data, user, callback) {
    var fnm = 'approvedleaveMdl';
	


	var QRY_TO_EXEC =`update leave_requests set leave_status=${data.leave_status},emp_id=${data.emp_id},approved_by =${data.approved_by},updatedOn=current_timestamp() where l_req_id=${data.l_req_id} `;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : cancelleaveappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.cancelleaveappMdl = function (data, user, callback) {
    var fnm = 'cancelleaveappMdl';
	


	var QRY_TO_EXEC =`update leave_requests set leave_status=${data.leave_status} where l_req_id=${data.l_req_id} `;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : appliedleavelistappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.countleavelistappMdl = function (data, user, callback) {
    var fnm = 'appliedleavelistappMdl';



	var QRY_TO_EXEC =` SELECT 
    e.total_leaves - COALESCE(SUM(CASE WHEN l.leave_status = 1 THEN 1 ELSE 0 END), 0) 
    AS balance,
    COALESCE(SUM(CASE WHEN l.leave_status = 1 THEN 1 ELSE 0 END), 0) AS taken,
    COALESCE(SUM(CASE WHEN l.leave_status = 0 THEN 1 ELSE 0 END), 0) AS applied,
    COALESCE(SUM(CASE WHEN l.leave_status = 2 THEN 1 ELSE 0 END), 0) AS rejected,
	COALESCE(SUM(CASE WHEN l.leave_status = 2 THEN 1 ELSE 0 END), 0) AS cancel,
    e.total_leaves
FROM employees AS e
LEFT JOIN leave_requests AS l ON l.emp_id = e.emp_id
WHERE e.emp_id =${data.emp_id} GROUP BY
        e.emp_id; `;
	console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : weekoffinsertMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
 exports.getemployeesMdl = function (data, user, callback) {
     var fnm = 'getemployeesMdl';
	
    var QRY_TO_EXEC = `select * from employees where emp_id not in (
select emp_id from attendence where date(i_ts)=curdate() and emp_sts not in (0,1,2,3,4,5,6) and emp_sts is null) and emp_status=1
`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/**************************************************************************************
* Controller     : weekoffinsertMdl
* Parameters     : req,res()
* Description    : cron job for weekoff employee insert
* Change History :
*    -  durga  - Initial Function
*  5-7-2023
*
***************************************************************************************/
 exports.weekoffinsertMdl = function (data,results, user, callback) {
     var fnm = 'weekoffinsertMdl';

  //console.log("success", data);


  var QRY_TO_EXEC = `insert into attendence (emp_id, emp_sts, i_ts) `;
  var dlmtr = ', ';
  var valQry = 'VALUES';

  if (results.length > 0) {
    console.log(results, "results");
    var counter = 0;
    results.forEach((emp) => {
      if (results.length == ++counter) {
        dlmtr = ';';
      }
      valQry += `(
        '${emp.emp_id}',
        2,
        CURRENT_TIMESTAMP()
      )${dlmtr}`;
    });
  }

  QRY_TO_EXEC = QRY_TO_EXEC + valQry;

  console.log(QRY_TO_EXEC);
  return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/**************************************************************************************
* Controller     : absentinsertMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
 exports.absentinsertMdl = function (data, user, callback) {
     var fnm = 'absentinsertMdl';
	
    var QRY_TO_EXEC = `select * from employees where emp_id  not in (select emp_id from attendence where date_format(i_ts,'%Y-%m-%d') = CURDATE() - INTERVAL 1 DAY );`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/**************************************************************************************
* Controller     : absentinsertattendenceMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
 exports.absentinsertattendenceMdl = function (data,results, user, callback) {
     var fnm = 'absentinsertattendenceMdl';
	 
	 var date = new Date();
	date.setDate(date.getDate() - 1);
	date=moment(date).format('YYYY-MM-DD');
	var datetime = `${date} 23:59:59`
	
      var QRY_TO_EXEC = `insert into attendence (emp_id, emp_sts, i_ts) `;
  var dlmtr = ', ';
  var valQry = 'VALUES';

  if (results.length > 0) {
    console.log(results, "results");
    var counter = 0;
    results.forEach((emp) => {
      if (results.length == ++counter) {
        dlmtr = ';';
      }
      valQry += `(
        '${emp.emp_id}',
        1,
        '${datetime}'
      )${dlmtr}`;
    });
  }

  QRY_TO_EXEC = QRY_TO_EXEC + valQry;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/**************************************************************************************
* Controller     : getleavedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
 exports.getleavedataMdl = function (data, user, callback) {
     var fnm = 'getleavedataMdl';
	


	 // var QRY_TO_EXEC =`select * from leave_requests where leave_status=1`;
	 var QRY_TO_EXEC =`select * from leave_requests where leave_status=1 and emp_id=${data.emp_id} and l_req_id=${data.l_req_id}`;
	 console.log(QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
 }
/**************************************************************************************
* Controller     : insertleaverecordMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
// exports.insertleaverecordMdl = function (data, leave_from_date, leave_to_date, user) {
  // var fnm = 'insertleaverecordMdl';
  // var fromDate = leave_from_date;
  // var toDate = leave_to_date;

  // var daysDiff =  Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24));

  // var timestamps = [];
  // for (var i = 0; i < daysDiff; i++) {
    // var currentDate = new Date(fromDate);
    // currentDate.setDate(currentDate.getDate() + i);
    // var timestamp = currentDate.toISOString();
    // timestamps.push(timestamp);
  // }

  // var insertPromises = timestamps.map(function (timestamp) {
    // return insertAttendanceRecord(data.emp_id, timestamp, user,daysDiff);
  // });

  // return Promise.all(insertPromises);
// };

// function insertAttendanceRecord(emp_id, timestamp, user) {
  // return new Promise(function (resolve, reject) {
    // const fnm = "insertleaverecordMdl";
	// var formattedTimestamp = new Date(timestamp).toISOString().replace("T", " ").slice(0, 19);
    // var QRY_TO_EXEC = `INSERT INTO attendence (emp_id, punch_in_time, punch_out_time, emp_sts, i_ts) VALUES (${emp_id}, 'N/A', 'N/A', 4, '${formattedTimestamp}')`;
    // console.log(QRY_TO_EXEC);

    // dbutil
      // .execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm)
      // .then(function (results) {
        // resolve(results);
      // })
      // .catch(function (error) {
        // reject(error);
      // });
  // });
// }
exports.insertleaverecordMdl = function (data, leave_from_date, leave_to_date, user) {
  var fnm = 'insertleaverecordMdl';
  var fromDate = leave_from_date; 
  fromDate = new Date(fromDate)
  var toDate = leave_to_date; 
   toDate = new Date(toDate)

  var daysDiff = Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24));
console.log(daysDiff,"daysDiff")
  var insertPromises = [];
  let datafilter = function(index){
  //for (var i = 0; i <= daysDiff; i++) {
    var currentDate = new Date(fromDate);
	console.log(currentDate,"currentDate")
    currentDate.setDate(currentDate.getDate() + index);
	console.log(currentDate,"currentDateiiiiii")
   var timestamp = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')
	console.log(timestamp,"timestamp")
	
    insertPromises.push(insertAttendanceRecord(data.emp_id, timestamp, user));
	 if(index == daysDiff){
		console.log("ompleted")
	} else {
		datafilter(index + 1)
	}
  }
	datafilter(0) 
  return Promise.all(insertPromises);
};

function insertAttendanceRecord(emp_id, timestamp, user) {
  return new Promise(function (resolve, reject) {
    const fnm = "insertleaverecordMdl";
    //var formattedTimestamp = new Date(timestamp).toISOString().replace("T", " ").slice(0, 19);
	//console.log(formattedTimestamp,"formattedTimestamp")
    var QRY_TO_EXEC = `INSERT INTO attendence (emp_id, punch_in_time, punch_out_time, emp_sts, i_ts) VALUES (${emp_id}, 'N/A', 'N/A', 4, '${timestamp}')`;
    console.log(QRY_TO_EXEC);

    dbutil
      .execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm)
      .then(function (results) {
        resolve(results);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
/**************************************************************************************
 * Controller     : getleavebydatesanduserMdl
 * Parameters     : req,res()
 * Description    : get details of all EntrpeCstmrTyp
 * Change History :
 * 21/11/2022   -  Ramesh  - Initial Function
 *
 ***************************************************************************************/
  exports.getleavebydatesanduserMdl = function (data, user, callback) {
      var fnm = 'getleavebydatesanduserMdl';

	  var QRY_TO_EXEC = ` SELECT * 
         FROM leave_requests 
         WHERE emp_id = ${data.emp_id}
         AND leave_from_date ='${data.leave_from_date}' 
         AND leave_to_date = '${data.leave_to_date}'  `;
    
      console.log(QRY_TO_EXEC);
      return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
  }
  /**************************************************************************************
* Controller     : getmanagersmobileMdl
* Parameters     : req,res()
* Description    : get dmanagers mobile
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
 exports.getmanagersmobileMdl = function (data, user, callback) {
     var fnm = 'getmanagersmobileMdl';

	 // var QRY_TO_EXEC = `select e.* from employees as e
 // left join clusters as c on c.cluster_id=e.cluster_id where e.emp_designation=234 and c.cluster_id in (${user.cluster_id}) `;
    
     // console.log(QRY_TO_EXEC);
     // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
 // }
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
	 
	var QRY_TO_EXEC = `select group_concat(emp_mobile) as emp_mobile,emp_id  from employees where ${qry} and emp_designation = 234;`;
	 
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getemployeeleavedtlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
 exports.getemployeeleavedtlMdl = function (data, user, callback) {
     var fnm = 'getemployeeleavedtlMdl';

	 var QRY_TO_EXEC = `select e.emp_name,e.emp_code,e.emp_mobile,date_format(l.leave_from_date,'%Y-%m-%d') as leave_from_date,date_format(l.leave_to_date,'%Y-%m-%d') as leave_to_date from leave_requests as l
                     join employees as e on e.emp_id=l.emp_id where l.emp_id=${data.emp_id} and e.sms_flag = 0  `;
    
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

exports.insertnotifyMdl = function (data,emp_id,user, text, callback) {
    var fnm = 'insertnotifyMdl';
   
    //var text = 'task created, task id is : '+ task_no+ '' ;
    var kind= 'Notifications';
   var title = 'Leave Reject';
	
   var QRY_TO_EXEC = ` insert into notification_log (emp_id,bodyMsg,message,dateCreated,status) values(${data.emp_id},'${text}','${kind}',current_timestamp(),1) `;
    console.log(QRY_TO_EXEC);
	
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user,fnm);

};
/*****************************************************************************
* Function       : cllattndbyMdl
* Description    : 
* Arguments      : callback function
* Change History :
*    - durga - Initial Function
****************************************************fcmmodel************************************************************** */
exports.sendPushNotificationMdl = function (data,emp_id, user, text, newtitle, QRY_TO_EXEC,taskkind,noti_log_id, callback) {
	console.log("iam in pushnotify log",text)
    var serverKey = 'AAAAtTJND5Q:APA91bEB_muFMrCJHYzXSB3ulvT_5EWmqKvvWVzyZNRnHoucJqm_rVGQW9-OeI1nHG6_BxYlwA5Q1rXokv9656DYPqXyJ2sJNe1WNOLAdZV112-R9E1d3Le_PijIjuBImNT3qFAhNQtd';
    var fcm = new FCM(serverKey);
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
                    empId: emp_id,
                    kind: taskkind,
					date: nowdate,
					empID:emp_id,
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
           
        });
    });
}
/**************************************************************************************
* Controller     : getemployeenameMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
 exports.getemployeenameMdl = function (data, user, callback) {
     var fnm = 'getemployeenameMdl';

	 var QRY_TO_EXEC = `select e.emp_name,e.emp_code,e.emp_id,e.emp_mobile,date_format(l.leave_from_date,'%Y-%m-%d') as leave_from_date,date_format(l.leave_to_date,'%Y-%m-%d') as leave_to_date from leave_requests as l
                     join employees as e on e.emp_id=l.emp_id where l.emp_id=${data.emp_id} and l.l_req_id =${data.l_req_id}  and e.sms_flag = 0 `;
    
     console.log(QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
 }
 /**************************************************************************************
* Controller     : getnullemployeesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
 exports.getnullemployeesMdl = function (data, user, callback) {
     var fnm = 'getnullemployeesMdl';
	
    var QRY_TO_EXEC = `select * from employees where emp_id  in (
select emp_id from attendence where date(i_ts)=curdate() and emp_sts is null) and emp_status=1`;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};
/**************************************************************************************
* Controller     : updatenullemployeesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
 exports.updatenullemployeesMdl = function (data,nullres, user, callback) {
     var fnm = 'updatenullemployeesMdl';

  //console.log("success", data);


  // var QRY_TO_EXEC = `update attendence set emp_sts=2 and i_ts=current_timestamp() where emp_id=${data.l_req_id}`;
  // var dlmtr = ', ';
  // var valQry = 'VALUES';

  if (nullres.length > 0) {
    console.log(nullres, "nullres");
    var counter = 0;
    nullres.forEach((emp) => {
      if (nullres.length == ++counter) {
        
      }
      var QRY_TO_EXEC = `update attendence set emp_sts=2 and i_ts=current_timestamp() where emp_id=${emp.emp_id}`;
	  
     console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
    });
	
  }


  // console.log(QRY_TO_EXEC);
  // return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
};