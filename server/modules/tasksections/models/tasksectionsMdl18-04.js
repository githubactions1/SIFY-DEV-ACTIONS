var appRoot = '/home/centos/glits/code/nodejs/dev_sify'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

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