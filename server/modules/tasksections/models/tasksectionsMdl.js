var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');



/**************************************************************************************
* Controller     : insrtnotesapicalldtlsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.insrtnotesapicalldtlsMdl = function(reqst, data, options, web_app, user){
	var fnm = 'insrtnotesapicalldtlsMdl';
	var emp_id=0;
	if(user){
		if(user.emp_id)
		emp_id = user.emp_id;
	}
	var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t ( service_no,web_app,task_id, task_no, url_tx, url_dta_tx, hdr_tx, crte_usr_id, a_in, i_ts) 
	values (0,${web_app},'${reqst.primary_task_id}','${data.externalID}','${JSON.stringify(options.url)}','${JSON.stringify(options.data).replace(/'/g, "''")}','${JSON.stringify(options.headers).replace(/'/g, "''")}','${emp_id}',1,current_timestamp());`
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

exports.insrtapicalldtlsMdl = function(reqst, data, options, web_app, user){
	var fnm = 'insrtapicalldtlsMdl';
	var emp_id=0;
	if(user){
		if(user.emp_id)
		emp_id = user.emp_id;
	}
	var QRY_TO_EXEC = `insert into api_rqst_cl_dtl_t ( web_app,task_id, task_no, service_no, url_tx, url_dta_tx, hdr_tx, crte_usr_id, a_in, i_ts) 
	values (${web_app},'${reqst.task_id}','${data.primaryAssignment}','${data.externalID}','${JSON.stringify(options.url)}','${JSON.stringify(options.body).replace(/'/g, "''")}','${JSON.stringify(options.headers).replace(/'/g, "''")}','${emp_id}',1,current_timestamp());`
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
* Controller     : inserttasksectionsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasksectionsMdl = function (data, user, callback) {
    var fnm = 'inserttasksectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into task_section (task_id, section_name, emp_id, status, date_created) values(${data.task_id},'${data.section_name}',${data.emp_id},1,current_timestamp())`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updatetasksectionsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetasksectionsMdl = function (data, user, callback) {
    var fnm = 'updatetasksectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update task_section set update_on = current_timestamp(),task_id =${data.task_id},emp_id=${data.emp_id},section_name='${data.section_name}',status= ${data.status} where section_id = ${data.section_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gettasksectionsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.gettasksectionsMdl = function (data, user, callback) {
    var fnm = 'gettasksectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = ` select * from task_section  `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletetasksectionsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.deletetasksectionsMdl = function (data, user, callback) {
    var fnm = 'deletetasksectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update task_section set status=0 where task_id =${data.task_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getbyidtasksectionsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getbyidtasksectionsMdl = function (data, user, callback) {
    var fnm = 'getbyidtasksectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from task_section where section_id =${data.section_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : inserttasksectionscolsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasksectionscolsMdl = function (data, user, callback) {
    var fnm = 'inserttasksectionscolsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into task_section_cols (section_id,task_id, section_col_name, section_col_value,emp_id,status,date_created) values(${data.section_id},'${data.task_id}','${data.section_col_name}','${data.section_col_value}',${data.emp_id},1,current_timestamp())`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updatetasksectionscolsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetasksectionscolsMdl = function (data, user, callback) {
    var fnm = 'updatetasksectionscolsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update task_section_cols set update_on = current_timestamp(),section_id=${data.section_id},task_id='${data.task_id}',section_col_name='${data.section_col_name}',section_col_value='${data.section_col_value}',emp_id=${data.emp_id} where task_section_col_id=${data.task_section_col_id}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getbyidtasksectionsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.gettasksectionscolsMdl = function (data, user, callback) {
    var fnm = 'gettasksectionscolsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from task_section_cols `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getbytasksectionscolsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getbytasksectionscolsMdl = function (data, user, callback) {
    var fnm = 'getbytasksectionscolsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from task_section_cols where task_section_col_id =${data.task_section_col_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletesectionscolsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.deletesectionscolsMdl = function (data, user, callback) {
    var fnm = 'deletesectionscolsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update task_section_cols set update_on=current_timestamp()  where task_id =${data.task_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletesectionscolsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.gettaskidsectionsMdl = function (data, user, callback) {
    var fnm = 'gettaskidsectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from  task_section where task_id =${data.task_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletesectionscolsMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.gettaskcolsidsectionsMdl = function (data, user, callback) {
    var fnm = 'gettaskcolsidsectionsMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from  task_section_cols where task_id =${data.task_id} and section_id=${data.section_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : taskdocumentnotesCtrlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentnotesCtrlMdl = function (data,imgpath, user, callback) {
    var fnm = 'taskdocumentnotesCtrlMdl';

     console.log("success", data)
	if(data.task_id){ 
		 img= ``;
		 note= ``;
		 
		//  if (data.note_type == 0 ) {
			  
		   
		//  img = `attachment = '${imgpath}',`
	   // } 
		//else {
			// note = `note='${data.note}',`
		//}
		 
	   if (data.img != '' && data.img != undefined) {
		   img = `attachment = '${imgpath}',`
		}
		if (data.note != '' && data.note != undefined){
			 note = `note='${data.note}',`
		 }
		 

		var QRY_TO_EXEC = `insert into tasks_documents_notes set  ${img} ${note} task_id=${data.task_id},emp_id= ${data.emp_id},note_type=${data.note_type},internal_type=${data.internal_type},created_date_time=current_timestamp() `;
		
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	 } else {
		return new Promise((resolve, reject) => {
			resolve(true)
		}) 
	 }
}

/**************************************************************************************
* Controller     : taskdocumentparentnotesCtrlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentparentnotesCtrlMdl = function (data,imgpath, user, callback) {
    var fnm = 'taskdocumentparentnotesCtrlMdl';

     console.log("success", data)
	if(data.task_id){ 
		 img= ``;
		 note= ``;

		 
	   if (data.img != '' && data.img != undefined) {
		   img = `attachment = '${imgpath}',`
		}
		if (data.note != '' && data.note != undefined){
			 note = `note='${data.note}',`
		 }
		 

		var QRY_TO_EXEC = `insert into tasks_documents_notes set  ${img} ${note} task_id=${data.primary_task_id},emp_id= ${data.emp_id},note_type=${data.note_type},internal_type=${data.internal_type},created_date_time=current_timestamp() `;
		
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	 } else {
		return new Promise((resolve, reject) => {
			resolve(true)
		}) 
	 }
}

/**************************************************************************************
* Controller     : taskdocumentnotesCtrlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasksectiontosolsMdl = function (data,insertid, user, callback) {
    var fnm = 'inserttasksectiontosolsMdl';

     console.log("success", data)
	 
	 

	var QRY_TO_EXEC = `insert into task_section_cols (section_id,task_id,section_col_name) values (${insertid},${data.task_id},'${data.section_col_name}')`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : taskdocumentnotesCtrlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getcommentslistMdl = function (data,insertid, user, callback) {
    var fnm = 'getcommentslistMdl';

     console.log("success", data)
	 
	//var QRY_TO_EXEC = `select td.*,emp_name from tasks_documents_notes  as td
	 // join employees as e on e.emp_id=td.emp_id where task_id=${data.task_id} and note_type=${data.note_type}`;
	 
	 var QRY_TO_EXEC = `select td.* from tasks_documents_notes  as td where (task_id=${data.task_id} OR task_id IN (select task_id from tasks where parent_id=${data.task_id})) and note_type=${data.note_type}`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : taskdocumentnotesappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentnotesappMdl = function (data,imgpath, user, callback) {
    var fnm = 'taskdocumentnotesappMdl';

     console.log("success", data)
	if(data.task_id){  
		 img= ``;
		 note= ``;
		 
		//  if (data.note_type == 0 ) {
			  
		   
		//  img = `attachment = '${imgpath}',`
	   // } 
		//else {
			// note = `note='${data.note}',`
		//}
		 
	   if (data.img != '' && data.img != undefined) {
		   img = `attachment = '${imgpath}',`
		}
		if (data.note != '' && data.note != undefined){
			 note = `note='${(data.note).replace(/'/g, "")}',`
		 }
		 

		var QRY_TO_EXEC = `insert into tasks_documents_notes set  ${img} ${note} task_id=${data.task_id},emp_id= ${data.emp_id},note_type='${data.note_type}',internal_type=${data.internal_type},created_date_time=current_timestamp() `;
		
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	 } else {
		return new Promise((resolve, reject) => {
			resolve(true)
		}) 
	 }
}
/**************************************************************************************
* Controller     : inserttasklogMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasklogMdl = function (data,user, callback) {
    var fnm = 'inserttasklogMdl';

     console.log("success", data)
	 
	 	   let note=``;
		   let attachment=``;
		   
	if(data.note){

        if(data.internal_type  == 0){
       
           note = `Note type internal : ${data.note}`
       } else if(data.internal_type  == 1 ) {
            
            note =  ` Note type external : ${data.note}`;
           
        }
    }
	 if(data.attachment){

        if(data.internal_type  == 0){
       
           note = `Note type internal Attachment: ${data.attachment}`
       } else if(data.internal_type  == 1 ) {
            
            note =  ` Note type external Attachment: ${data.attachment}`;
           
        }
    }
	 var QRY_TO_EXEC = `insert into task_logs(task_id,emp_id,call_attend_by,comments,tl_date_created) values(${data.task_id},${data.emp_id},${data.emp_id},'${note}',current_timestamp())`;
	 
	 
	 
	 //var QRY_TO_EXEC = `insert into task_logs(task_id,emp_id,comments,tl_date_created) values(${data.task_id},${data.emp_id},'${data.note}',current_timestamp())`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getcommentslistappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 1/5/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.getcommentslistappMdl = function (data, user, callback) {
    var fnm = 'getcommentslistappMdl';

     console.log("success", data)
	 
	 

	var QRY_TO_EXEC = `select td.task_doc_id, td.task_id, td.emp_id, td.note_type, td.internal_type, td.attachment, td.note, date_format(td.created_date_time,'%Y-%m-%d %H:%i:%s') as 'created_date_time' ,e.emp_name from tasks_documents_notes  as td 
	  join employees as e on e.emp_id=td.emp_id where task_id=${data.task_id} order by task_doc_id desc `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getcommentslistappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 1/5/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.getfamidbasedlistMdl = function (data, user, callback) {
    var fnm = 'getfamidbasedlistMdl';

     console.log("success", data)
	 
	 

	var QRY_TO_EXEC = `select c.checkListSysId,c.checkListName,c.tabs from tasks as t
                      join checklist as c on c.checkListSysId=t.formId where task_id=${data.task_id} limit 1 `; 
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : chcklistsubmitDataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   - durga  - Initial Function
*
***************************************************************************************/
exports.chcklistsubmitDataMdl = function (data, user) { 
	var fnm = "chcklistsubmitDataMdl"
	var submitted_tabs = JSON.stringify(data.submitted_tabs).replace(/"http/g, '["http');
	submitted_tabs = (submitted_tabs).replace(/.jpg"/g, '.jpg"]');
	submitted_tabs = (submitted_tabs).replace(/'/g, "''");
    var QRY_TO_EXEC = `insert into checklist_submitted(emp_id,task_id,checkListName,checkListSysId,submitted_tabs,images_tabs,form_tabs,i_ts,status) values (${data.emp_id},'${data.task_id}','${data.checkListName}','${data.checkListSysId}','${submitted_tabs}','${JSON.stringify(data.images_tabs).replace(/'/g, "''")}','${JSON.stringify(data.form_tabs).replace(/'/g, "''")}',current_timestamp(),1);`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user,fnm);
}
/**************************************************************************************
* Controller     : inserttasklogDataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   - durga  - Initial Function
*
***************************************************************************************/
exports.inserttasklogDataMdl = function (data, user) { 
	var fnm = "inserttasklogDataMdl"

    var QRY_TO_EXEC = `insert into task_logs (task_id,emp_id,task_status,call_attend_by,tl_date_created,task_log_lat,task_log_long) values(${data.task_id},${data.emp_id},224,${data.emp_id},current_timestamp(),'${data.gps_lat}','${data.gps_lang}')  ;`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user,fnm);
}
/**************************************************************************************
* Controller     : gettasktabMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   - durga  - Initial Function
*
***************************************************************************************/
exports.gettasktabMdl = function (data, user) { 
	var fnm = "gettasktabMdl"

    var QRY_TO_EXEC = `select t.task_id,cs.submitted_tabs from checklist_submitted as cs 
	join tasks as t on t.task_id=cs.task_id where cs.task_id=${data.task_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user,fnm);
}

/**************************************************************************************
* Controller     : getshiftdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getshiftdatalistMdl = function (data,user, callback) {
    var fnm = 'getshiftdatalistMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select s.*,c.cluster_name,st.state_name,z.zone_name,
             timediff( shift_end_date,shift_start_date ) AS 'diff_time' from shifts as s
                left join states as st on st.state_id=s.state_id
				left join clusters as c on c.cluster_id=s.cluster_id 
                left join zones as z on z.zone_id=s.zone_id where s.cluster_id in (${data.cluster_id})`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : deleteshiftdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.deleteshiftdataMdl = function (data,user, callback) {
    var fnm = 'deleteshiftdataMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update shifts set status=0 where shift_id=${data.shift_id}`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getshiftdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getshiftdataMdl = function (data,user, callback) {
    var fnm = 'getshiftdataMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select s.*,c.cluster_name,st.state_name,z.zone_name,
             timediff( shift_end_date,shift_start_date ) AS 'diff_time' from shifts as s
                left join states as st on st.state_id=s.state_id
				left join clusters as c on c.cluster_id=s.cluster_id 
                left join zones as z on z.zone_id=s.zone_id where s.cluster_id=${data.cluster_id} and s.status = 1`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : checklistsubmitedtaskswebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.checklistsubmitedtaskswebMdl = function (data,user, callback) {
    var fnm = 'checklistsubmitedtaskswebMdl';

     console.log("success", data)

	//var QRY_TO_EXEC = ` select t.task_id,cs.submitted_tabs from checklist_submitted as cs 
	//join tasks as t on t.task_id=cs.task_id where cs.task_id=${data.task_id} order by chck_sub_id desc limit 1 ;  `
	
	var QRY_TO_EXEC = ` SELECT * FROM checklist_submitted where task_id in (select task_id from tasks where parent_id =${data.task_id} OR task_id=${data.task_id});  `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}



/**************************************************************************************
* Controller     : updatechecklistsubmitedtaskswebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatechecklistsubmitedtaskswebMdl = function (data,imgpath,user, callback) {
    var fnm = 'updatechecklistsubmitedtaskswebMdl';

     console.log("success", data)

var QRY_TO_EXEC = ` update checklist_submitted set u_ts = current_timestamp() ,submitted_tabs ='${JSON.stringify(data.submitted_tabs).replace(/'/g,"/'")}' where task_id = ${data.task_id} ;  `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : upadtetasktablestatusMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   - durga  - Initial Function
*
***************************************************************************************/
exports.upadtetasktablestatusMdl = function (data,taskid, user) { 
	var fnm = "upadtetasktablestatusMdl"

    var QRY_TO_EXEC = `update tasks set task_status=224 where task_id=${data.task_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user,fnm);
}

/**************************************************************************************
* Controller     : taskdatafrservicenowmngrapprlMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/

exports.taskdatafrservicenowmngrapprlMdl = function(data,user){
	var fnm = 'taskdatafrservicenowmngrapprlMdl';
	var QRY_TO_EXEC = `select s.sub_cat_name as 'eventId',t.task_id as id,${data.gps_lat} as 'taskLatitude',${data.gps_lang} as 'taskLongitude',null as 'taskType',null as 'priority',
						null as 'revisionNo',(select service_no from tasks as t2 where parent_id is null and (t2.task_id = ${data.task_id} or t2.task_id= t.parent_id)) as 'externalID',task_message as 'title',unix_timestamp(task_appointment_date) as 'eventDateTime','' as 'locationGroupId',
						unix_timestamp(task_appointment_date) as 'appointmentDate',null as 'appointmentStartDateTime', null as 'appointmentEndDateTime',
						#(select group_concat(service_no,'|',e2.emp_name,'|',e2.emp_code,'|',e2.emp_mobile,'|',v.vendor_name,'|') from employees as e2 join tasks as t2 on t2.call_attend_by=e2.emp_id where t2.parent_id=t.parent_id) as 'assignedToIDs',
						concat(service_no,'|',e.emp_name,'|',e.emp_code,'|',e.emp_mobile,'|',v.vendor_name) as 'assignedToIDs',
						(select service_no from tasks as t2 where t2.parent_id = t.parent_id and t2.primary_flag = 1) as 'primaryAssignment',formId as formID,null as description,circuit_id as customerId,null as customerName,null as customerContactNo,null as customerEmail,
						null as city,null as country,null as shortURLTravel,null as customFieldGroups,null as checklistData,null as reasonCde,'' as attachments,
						e2.emp_id as modifiedBy,e2.emp_role as userRole,e2.emp_code as managerId,null as deviceIdentity,null as recordedHardware,
						case when t.task_status=221 then (Select distance as dst from task_logs where task_id='${data.task_id}' and task_status=221) else 0 end as travelledDistance,null as identity,'false' as isAutoAssigned,
						'' as state,'' as street1,'' as street2, '' as street3,task_pincode as pincode,'' as blockNo,'' as floorNo from tasks as t
						join sub_categories as s on s.cat_id=9 and s.sub_cat_id=224
						join employees as e on find_in_set(e.emp_id,t.call_attend_by)
						#join checklist_submitted as c on c.checkListSysId=t.formId
						join employees as e2 on e2.emp_id=${user.emp_id}
						left join vendors as v on v.vendor_id=e.vendor_name
						where t.task_id='${data.task_id}' #order by c.chck_sub_id desc 
						limit 1`
    console.log(QRY_TO_EXEC);
	return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, '', fnm);
}

/**************************************************************************************
* Controller     : insertchecklistimagedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.insertchecklistimagedataMdl = function (data,user, callback) {
    var fnm = 'insertchecklistimagedataMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into checklist_images (task_id,emp_id,img_encode,i_ts) values (${data.task_id},${data.emp_id},'${data.img_encode}',current_timestamp())`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getchecklistimagedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getchecklistimagedataMdl = function (data,user, callback) {
    var fnm = 'getchecklistimagedataMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select * from checklist_images where ${data.column_name}='${data.chck_img_id}'`
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : tasklisttwodaysdataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.tasklisttwodaysdataMdl = function (data,user, callback) {
    var fnm = 'tasklisttwodaysdataMdl';

     console.log("success", data)

	
    
	
	// var QRY_TO_EXEC = `  SELECT t.task_id,t.circuit_id,t.task_no,t.service_no,t.auto_assgn,t.parent_id,
        // t.call_attend_by,t.mngr,t.primary_flag,t.travel_change,t.travel_distance,t.call_type,
        // t.task_type,t.task_status,t.travel_flg,t.task_category,t.task_other_issue,
        // t.task_owner,t.task_message,t.task_created_date,t.eng_reached_time,t.task_resolved_time,
        // t.last_updated_time,t.task_closed_time,t.task_reopen_time,t.total_time,t.resolve_time,
        // t.emp_id,t.resolved_through,t.issue_found,t.remarks,t.task_priority,t.emp_department_id,
        // t.task_latitude,t.task_longitude,t.start_coordinates,t.end_coordinates,t.Approver,
        // t.Approver_id,t.Approver_reason,t.return_distance,date_format(t.task_assigned_date,'%Y-%m-%d %h:%i:%s') as 'task_assigned_date',
        // date_format(t.task_appointment_date,'%Y-%m-%d %h:%i:%s') as 'task_appointment_date',t.taskAddress,t.task_pincode,t.formId,t.slaTime,
        // t.travel_distance/1000 as 'travel_dist', DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date,td.status as 'dispuet_status',
   // CASE WHEN td.status=0 then 'Pending'
                // WHEN td.status=1 then 'Approved'
                // WHEN td.status=2 then 'Reject'
                // end as 'dispuet_Status_nm'
  // from tasks as t
      // join sub_categories as sc on t.task_status = sc.sub_cat_id
    // join employees as e2 on t.task_owner = e2.emp_id
    // left join task_dist_dispute as td on td.task_id=t.task_id
    // left join task_logs as tl on tl.task_id=t.task_id
    // where date_format(tl.tl_date_created,'%Y-%m-%d') >= curdate() - INTERVAL 5 DAY  and tl.task_status in   (226,227) and tl.emp_id=${data.emp_id}  `;
	 var QRY_TO_EXEC = ` SELECT t.task_id,t.circuit_id,t.task_no,t.service_no,t.auto_assgn,t.parent_id,
        t.call_attend_by,t.mngr,t.primary_flag,t.travel_change,t.travel_distance,t.call_type,
        t.task_type,t.task_status,t.travel_flg,t.task_category,t.task_other_issue,
        t.task_owner,t.task_message,t.task_created_date,t.eng_reached_time,t.task_resolved_time,
        t.last_updated_time,t.task_closed_time,t.task_reopen_time,t.total_time,t.resolve_time,
        t.emp_id,t.resolved_through,t.issue_found,t.remarks,t.task_priority,t.emp_department_id,
        t.task_latitude,t.task_longitude,t.start_coordinates,t.end_coordinates,t.Approver,
        t.Approver_id,t.Approver_reason,t.return_distance,date_format(t.task_assigned_date,'%Y-%m-%d %h:%i:%s') as 'task_assigned_date',
        date_format(t.task_appointment_date,'%Y-%m-%d %h:%i:%s') as 'task_appointment_date',t.taskAddress,t.task_pincode,t.formId,t.slaTime,
        t.travel_distance/1000 as 'travel_dist', DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date,td.status as 'dispuet_status',
   CASE WHEN td.status=0 then 'Pending'
                WHEN td.status=1 then 'Approved'
                WHEN td.status=2 then 'Reject'
                end as 'dispuet_Status_nm'
  from tasks as t
    left join task_dist_dispute as td on td.task_id=t.task_id 
    left join task_logs as tl on tl.task_id=t.task_id and t.task_status=tl.task_status
    where date(tl.tl_date_created) >= curdate() - INTERVAL 5 DAY  and t.task_status in (226,227) and t.call_attend_by=${data.emp_id} `
	
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : inserttaskdistdisputedataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttaskdistdisputedataMdl = function (data,user, callback) {
    var fnm = 'inserttaskdistdisputedataMdl';

   // var mgr_approve_dist = ``;
	 // var mgr_remarks = ``;

 
   // if (data.mgr_approve_dist != '' && data.mgr_approve_dist != null && data.mgr_approve_dist != undefined) {
       // mgr_approve_dist = `mgr_approve_dist = '${data.mgr_approve_dist}',`
    // }
    // if (data.mgr_remarks != ''  && data.mgr_remarks != null && data.mgr_remarks != undefined){
         // mgr_remarks = `mgr_remarks='${data.mgr_remarks}',`
     // }
    

	var QRY_TO_EXEC = `insert into task_dist_dispute set emp_id=${data.emp_id},task_id=${data.task_id},cal_dist=${data.cal_dist},actual_dist=${data.actual_dist},status=0,emp_remarks='${data.emp_remarks}',i_ts=current_timestamp()`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : listtaskdistdisputedataMdl
* Parameters     : req,res()
* Description    :  task distance dispute for web list
* Change History :
* 29/06/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.listtaskdistdisputedataMdl = function (data,user, callback) {
    var fnm = 'listtaskdistdisputedataMdl';
	
	  let qry= ``;
	 
	 if (user.emp_designation == 234){
        qry = ` where e2.cluster_id in (${user.cluster_id})`

}

	var QRY_TO_EXEC = `SELECT td.emp_id,td.task_id,td.cal_dist,td.actual_dist,td.mgr_approve_dist,td.mgr_apprved_by,td.status,td.emp_remarks,td.mgr_remarks,td.i_ts,td.u_ts,t.circuit_id,t.task_no,e3.emp_name as 'mgr_apprved_by_nm',c.cluster_name,z.zone_name,s.state_name ,t.service_no,sc.sub_cat_name as 'task_status_name',e2.emp_name, DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') as task_created_date,td.status as 'dispuet_status',td.id,
CASE WHEN td.status=0 then 'Pending' 
WHEN td.status=1 then 'Approved' 
WHEN td.status=2 then 'Reject' 
end as 'dispuet_Status_nm'
from task_dist_dispute as td
left join employees as e2 on td.emp_id = e2.emp_id 
left join tasks as t on t.task_id=td.task_id
left join clusters as c on c.cluster_id=e2.cluster_id 
left join zones as z on z.zone_id=c.zone_id 
left join states as s on s.state_id=c.state_id
left join employees as e3 on e3.emp_id=mgr_apprved_by
left join sub_categories as sc on t.task_status = sc.sub_cat_id ${qry} order by td.id desc`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updatetaskdistdisputewebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/06/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetaskdistdisputewebMdl = function (data,user, callback) {
    var fnm = 'updatetaskdistdisputewebMdl';



	var QRY_TO_EXEC = ` update task_dist_dispute set u_ts=current_timestamp(),mgr_approve_dist=${data.mgr_approve_dist},mgr_apprved_by=${data.mgr_apprved_by},mgr_remarks='${data.mgr_remarks}',status=${data.status} where task_id=${data.task_id}; `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : updatetravelempgpswebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/06/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetravelempgpswebMdl = function (data,task_id,user, callback) {
    var fnm = 'updatetravelempgpswebMdl';



	var QRY_TO_EXEC = ` update tasks set travel_distance=${data.mgr_approve_dist}*1000 where task_id=${data.task_id}; `
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : taskdisputebaseonidbasedlistwebMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/06/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdisputebaseonidbasedlistwebMdl = function (data,user, callback) {
    var fnm = 'taskdisputebaseonidbasedlistwebMdl';



	var QRY_TO_EXEC = `SELECT td.emp_id,td.task_id,td.cal_dist,t.start_address,t.end_address,td.actual_dist,td.mgr_approve_dist,td.status,td.emp_remarks,td.mgr_remarks,td.i_ts,td.u_ts,
e.emp_name,t.task_no,t.service_no
 FROM task_dist_dispute as td 
 join employees as e on e.emp_id=td.emp_id 
 join tasks as t on t.task_id=td.task_id where td.task_id=${data.task_id}`; 
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	
}


/**************************************************************************************
* Controller     : tasknotestrnfrtoservicenow_app_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/06/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.tasknotestrnfrtoservicenow_app_Mdl = function (data,user, results, callback) {
    var fnm = 'tasknotestrnfrtoservicenow_app_Mdl';

	var QRY_TO_EXEC = `select (select t2.service_no from tasks as t2 where t2.task_id = t.parent_id ) as externalID, t.service_no as  assignmentId, e.emp_name as addedBy, tdn.note as description, 
                    case when tdn.internal_type = 1 then 'External' else 'Internal' end as noteType,
                    date_format(tdn.created_date_time, '%Y-%m-%d %H:%i:%S')  as creationDateTime
                    from tasks_documents_notes as tdn 
					join employees as e on tdn.emp_id=e.emp_id
                    join tasks as t on t.task_id = tdn.task_id
                    where task_doc_id = ${results.insertId} and t.task_id = ${data.task_id};`; 
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	
}


/**************************************************************************************
* Controller     : tasknotestrnfrtoservicenow_web_Mdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/06/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.tasknotestrnfrtoservicenow_web_Mdl = function (data,user, results, callback) {
    var fnm = 'tasknotestrnfrtoservicenow_web_Mdl';
    
	var QRY_TO_EXEC = `	select (select t2.service_no from tasks as t2 where t.parent_id = t2.task_id) as externalID, t.service_no as  assignmentId, e.emp_name as addedBy, tdn.note as description, 
    case when tdn.internal_type = 1 then 'External' else 'Internal' end as noteType,
    date_format(tdn.created_date_time, '%Y-%m-%d %H:%i:%S')  as creationDateTime
    from tasks_documents_notes as tdn 
	join employees as e on tdn.emp_id=e.emp_id
    join tasks as t on t.task_id = tdn.task_id
    where task_doc_id = ${results.insertId} and t.task_id = ${data.primary_task_id} ;`; 
	// var QRY_TO_EXEC = `select (select t2.service_no from tasks as t2 where t2.parent_id = t.task_id and t2.primary_flag = 1) as assignmentId, t.service_no as  externalID, tdn.emp_id as addedBy, tdn.note as description, 
    // case when tdn.internal_type = 1 then 'External' else 'Internal' end as noteType,
    // date_format(tdn.created_date_time, '%Y-%m-%d %H:%i:%S')  as creationDateTime
    // from tasks_documents_notes as tdn 
    // join tasks as t on t.task_id = tdn.task_id
    // where task_doc_id = ${results.insertId} and t.task_id = ${data.task_id};`; 
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	
}
/**************************************************************************************
* Controller     : taskdocumentnoteswebbMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentnoteswebbMdl = function (data, user, callback) {
    var fnm = 'taskdocumentnoteswebbMdl';

     console.log("success", data)
		 attachment= ``;
		 note= ``;
		 
		 
	   if (data.attachment != '' && data.attachment != undefined) {
		   attachment = `attachment = '${data.attachment}',`
		   
		}
		if (data.note != '' && data.note != undefined){
			 note = `note='${data.note}',`
		 }
		 

		var QRY_TO_EXEC = `insert into tasks_documents_notes set  ${attachment} ${note} task_id=${data.primary_task_id},emp_id= ${data.emp_id},note_type=${data.note_type},internal_type=${data.internal_type},created_date_time=current_timestamp() `;
		
		console.log(QRY_TO_EXEC);
		return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	
}


/**************************************************************************************
* Controller     : updatechcklistsubmitDataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 03/08/2023   - shaik  - Initial Function
*
***************************************************************************************/
exports.updatechcklistsubmitDataMdl = function (data, user) { 
	var fnm = "updatechcklistsubmitDataMdl"
	var submitted_tabs = JSON.stringify(data.submitted_tabs).replace(/"http/g, '["http');
	submitted_tabs = (submitted_tabs).replace(/.jpg"/g, '.jpg"]');
	submitted_tabs = (submitted_tabs).replace(/'/g, "''");
    var QRY_TO_EXEC = `update  checklist_submitted set u_ts = current_timestamp(),  submitted_tabs = '${submitted_tabs}', images_tabs = '${JSON.stringify(data.images_tabs).replace(/'/g, "''")}' ,form_tabs = '${JSON.stringify(data.form_tabs).replace(/'/g, "''")}' where chck_sub_id = ${data.chck_sub_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC,user,fnm);
}

/**************************************************************************************
* Controller     : inserttasklogappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 12/09/2023   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasklogappMdl = function (data,user, callback) {
    var fnm = 'inserttasklogappMdl';

     console.log("success", data)
	 
	 	   let note=``;
		   let attachment=``;
	if(data.note){

        if(data.internal_type  == 0){
       
           note = `Note type internal :${(data.note).replace(/'/g, "")}`
       } else if(data.internal_type  == 1 ) {
            
            note =  ` Note type external : ${(data.note).replace(/'/g, "")}`;
           
        }
    }
	if(data.attachment){

        if(data.internal_type  == 0){
       
           note = `Note type internal Attachment: ${data.attachment}`
       } else if(data.internal_type  == 1 ) {
            
            note =  ` Note type external Attachment: ${data.attachment}`;
           
        }
    }
	 
	 var QRY_TO_EXEC = `insert into task_logs(task_id,emp_id,call_attend_by,comments,tl_date_created) values(${data.task_id},${data.emp_id},${data.emp_id},'${note}',current_timestamp())`;
	 
	 
	 
	 //var QRY_TO_EXEC = `insert into task_logs(task_id,emp_id,comments,tl_date_created) values(${data.task_id},${data.emp_id},'${data.note}',current_timestamp())`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}