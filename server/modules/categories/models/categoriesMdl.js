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
   exports.getcategoriesMdl = function (data, user, callback) {
   var fnm = 'getcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = ` select * from categories`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getsubcategoriesMdl = function (data, user, callback) {
    
	var fnm = 'getsubcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = ` select * from sub_categories where cat_id = ${data.cat_id} and sub_cat_status = ${data.sub_cat_status} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
	}
/**************************************************************************************
* Controller     : insertclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.insertcomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'insertcomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `insert into complaint_categories (main_cat_id,comp_cat_name,date_created,comp_status) values(${data.main_cat_id},'${data.comp_cat_name}',current_timestamp(),1)`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : insertclustersMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.editcomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'editcomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update complaint_categories set last_updated = current_timestamp(),comp_cat_name = '${data.comp_cat_name}',main_cat_id=${data.main_cat_id} where comp_cat_id = ${data.comp_cat_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : deletecomplaintcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.deletecomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'deletecomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `update complaint_categories set comp_status=0 where comp_cat_id = ${data.comp_cat_id} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getcomplaintcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.getcomplaintcategoriesMdl = function (data, user, callback) {
   var fnm = 'getcomplaintcategoriesMdl';

     console.log("success", data)

	var QRY_TO_EXEC = ` select * from complaint_categories where comp_status = ${data.comp_status} `;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : getcomplaintcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.getsubcategoriescountMdl = function (data, user, callback) {
    
    var fnm = 'getsubcategoriescountMdl';
 
    console.log("success", data)
    let qry = ``
    let qry2 = ``
    if(user.emp_designation == 234 ){
       let ids = user.cluster_id.split(',')
       if(ids.length == 1){
           qry = `  find_in_set(${ids[0]}, e.cluster_id)`
       }else{
           ids.forEach((id, i)=> {
               qry = qry + `find_in_set(${id}, e.cluster_id)`
               if(i <= (ids.length - 2)) qry = qry + ` or `
           })
       } 
       if(data.search_like){
        let firstThreeCharOfSearchTerm = data.search_like.slice(0,3)
        if(firstThreeCharOfSearchTerm == 'STT' || firstThreeCharOfSearchTerm == 'INC' || firstThreeCharOfSearchTerm.slice(0,2) == 'CS'){
            const ischildtaskornot =  data.search_like.indexOf('_') 
            if(ischildtaskornot != -1){
                data.search_like = data.search_like.slice(0,ischildtaskornot)
            }
        }
           qry2 = ` (${qry}) and t.${data.column_name}=sb.sub_cat_id and (t.parent_id is null and t.service_no like '%${data.search_like}%' or t.task_no like '%${data.search_like}%')`
           qry = `(${qry}) and (t1.service_no like '%${data.search_like}%' or t1.task_no like '%${data.search_like}%' and t1.parent_id is null)`
       }else{
           qry2 = ` (${qry}) and t.${data.column_name}=sb.sub_cat_id and (t.primary_flag = 1 or t.mngr = 1) and (t.task_created_date >= '${data.fromDate}'
           and  t.task_created_date <= '${data.toDate}') `
           qry = ` (${qry}) and (t1.primary_flag = 1 or t1.mngr = 1) and (t1.task_created_date >= '${data.fromDate}'
           and  t1.task_created_date <= '${data.toDate}')`
       }
       var QRY_TO_EXEC = `select sb.sub_cat_id,sb.cat_id,sb.sub_cat_name,sb.shift_in,sb.shift_out,sb.sub_cat_status,sb.sub_cat_show,date_format(sb.sub_cat_date_created,'%Y-%m-%d') as sub_cat_date_created,sb.sub_cat_description,(select count( distinct( t.task_id)) from tasks as t join  employees as e on e.emp_id = t.call_attend_by where ${qry2} ) as task_counts,
       (select count( distinct( t1.task_id)) from tasks as t1  join  employees as e on e.emp_id = t1.call_attend_by  where ${qry} ) as total_task_counts
       from  sub_categories as sb WHERE sb.cat_id=${data.cat_id} and sb.sub_cat_status = 1`
   }else{
       if(data.search_like){
        let firstThreeCharOfSearchTerm = data.search_like.slice(0,3)
        if(firstThreeCharOfSearchTerm == 'STT' || firstThreeCharOfSearchTerm == 'INC' || firstThreeCharOfSearchTerm.slice(0,2) == 'CS'){
            const ischildtaskornot =  data.search_like.indexOf('_') 
            if(ischildtaskornot != -1){
                data.search_like = data.search_like.slice(0,ischildtaskornot)
            }
        }
           qry = `  t.${data.column_name}=sb.sub_cat_id and (t.parent_id is null and t.service_no like '%${data.search_like}%' or t.task_no like '%${data.search_like}%')`
           qry2 = `  t1.service_no like '%${data.search_like}%' or t1.task_no like '%${data.search_like}%' and t1.parent_id is null`
       }else{
           qry = `t.${data.column_name}=sb.sub_cat_id and t.parent_id is null and (t.task_created_date >= '${data.fromDate}' 
           and  t.task_created_date <= '${data.toDate}') ORDER BY task_id DESC`
           qry2 = ` (t1.task_created_date >= '${data.fromDate}'
           and  t1.task_created_date <= '${data.toDate}') ORDER BY t1.task_id DESC`
       }
       var QRY_TO_EXEC = `select sb.sub_cat_id,sb.cat_id,sb.sub_cat_name,sb.shift_in,sb.shift_out,sb.sub_cat_status,sb.sub_cat_show,date_format(sb.sub_cat_date_created,'%Y-%m-%d') as sub_cat_date_created,sb.sub_cat_description,(select count(task_id) from tasks as t where ${qry}) as task_counts,
       (select count(task_id) from tasks as t1 where t1.parent_id is null and ${qry2}) as total_task_counts
       from  sub_categories as sb WHERE sb.cat_id=${data.cat_id} and sb.sub_cat_status = 1`;
   }
//    var fnm = 'getsubcategoriescountMdl';

//     console.log("success", data)
//     let qry = ``
//     if(user.emp_designation == 234){
//         // from here
//         let ids = user.cluster_id.split(',')
//         if(ids.length == 1){
//             qry = `  find_in_set(${ids[0]}, e.cluster_id)`
//         }else{
//             ids.forEach((id, i)=> {
//                 qry = qry + `find_in_set(${id}, e.cluster_id)`
//                 if(i <= (ids.length - 2)) qry = qry + ` or `
//             })
//         }
//         var QRY_TO_EXEC = `select sb.*,(select count( distinct( t.task_id)) from tasks as t join  employees as e on e.emp_id = t.call_attend_by where (${qry}) and t.${data.column_name}=sb.sub_cat_id and (t.primary_flag = 1 or t.mngr = 1) and (DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}'
//         and  DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}') ) as task_counts,
//         (select count( distinct( t1.task_id)) from tasks as t1  join  employees as e on e.emp_id = t1.call_attend_by  where (${qry}) and (t1.primary_flag = 1 or t1.mngr = 1) and (DATE_FORMAT(t1.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}'
//         and  DATE_FORMAT(t1.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}') ) as total_task_counts
//         from  sub_categories as sb WHERE sb.cat_id=${data.cat_id} and sb.sub_cat_status = 1`
//         //here is latest code 

//         // var QRY_TO_EXEC = `select sb.*,(select count( distinct( t.parent_id)) from tasks as t join  employees as e on e.emp_id = t.call_attend_by where e.cluster_id in (${user.cluster_id}) and t.${data.column_name}=sb.sub_cat_id and t.primary_flag = 1 and (DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}'
//         // and  DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}') ) as task_counts,
//         // (select count( distinct( t1.parent_id)) from tasks as t1  join  employees as e on e.emp_id = t1.call_attend_by  where e.cluster_id in (${user.cluster_id}) and t1.primary_flag = 1 and (DATE_FORMAT(t1.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}'
//         // and  DATE_FORMAT(t1.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}') ) as total_task_counts
//         // from  sub_categories as sb WHERE sb.cat_id=${data.cat_id} and sb.sub_cat_status = 1`
//     }else{
//         var QRY_TO_EXEC = `select sb.*,(select count(task_id) from tasks as t where t.${data.column_name}=sb.sub_cat_id and t.parent_id is null and (DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}' 
//         and  DATE_FORMAT(t.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}') ORDER BY task_id DESC) as task_counts,
//         (select count(task_id) from tasks as t1 where t1.parent_id is null and (DATE_FORMAT(t1.task_created_date,'%Y-%m-%d %H:%i:%S') >= '${data.fromDate}'
//         and  DATE_FORMAT(t1.task_created_date,'%Y-%m-%d %H:%i:%S') <= '${data.toDate}') ORDER BY t1.task_id DESC) as total_task_counts
//         from  sub_categories as sb WHERE sb.cat_id=${data.cat_id} and sb.sub_cat_status = 1`;
//     }

    
	// var QRY_TO_EXEC = ` select sb.*,(select count(task_id) from tasks as t where t.${data.column_name}=sb.sub_cat_id and t.parent_id is null ORDER BY task_id DESC) as task_counts 
    // from  sub_categories as sb WHERE sb.cat_id=${data.cat_id} and sb.sub_cat_status = 1`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}

/**************************************************************************************
* Controller     : getcomplaintcategoriesMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.getsubcategoriesbytaskstatusandcategorycountMdl = function (data, user, callback) {
    var fnm = 'getsubcategoriesbytaskstatusandcategorycountMdl';
 
      console.log("success", data)
 
     var QRY_TO_EXEC = `SELECT sc2.sub_cat_name, sc2.sub_cat_id, Count(task_id) as task_sub_category_count
        FROM tasks as t 
        JOIN  sub_categories as sc ON sc.sub_cat_id = t.task_category
        join sub_categories as sc2 on sc2.sub_cat_id = t.task_status
        where t.task_category = ${data.task_category}  GROUP BY sc2.sub_cat_name;`;
     
     console.log(QRY_TO_EXEC);
     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
 }
 /**************************************************************************************
* Controller     : gethardwarelistMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
   exports.gethardwarelistMdl = function (data, user, callback) {
   var fnm = 'gethardwarelistMdl';

     console.log("success", data)

	var QRY_TO_EXEC = `select hw.*,sc.sub_cat_name from hard_ware as hw
                     left join sub_categories as sc on sc.sub_cat_id=hw.cat_id`;
    
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
