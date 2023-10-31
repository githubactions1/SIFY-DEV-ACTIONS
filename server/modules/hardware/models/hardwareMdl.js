
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require(appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
//var jsonUtils = require(appRoot + '/utils/json.utils');
var sqldb = require(appRoot+'/config/db.config');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

var dbutil = require(appRoot + '/utils/db.utils');

/**************************************************************************************
* Controller     : inserthardwareMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 21/11/2022   -  durga  - Initial Function
*
***************************************************************************************/
exports.inserthardwareMdl = function (data, user, callback) {
    var fnm = 'inserthardwareMdl';

    console.log("success", data);
console.log("length",data.Hardware.length);

    var QRY_TO_EXEC = `insert into task_hw_used (emp_id,task_id,hw_id,cat_id,hw_desc,hw_partcode,useage_type,no_of_units_used,serial_number,status,i_ts)`;
    var dlmtr = ', ';
    var valQry = ' VALUES ';
  if (data && data.Hardware.length > 0) {
        var counter = 0;
        data.Hardware.filter((k) => {
            if (data.Hardware.length == ++counter ) {
                dlmtr = ' ; '
            }
            valQry += `(
			        '${data.emp_id}',
					'${data.task_id}',
					'${k.hw_id}',
                    '${k.cat_id}',
                    '${k.hw_desc}',
					'${k.hw_partcode}',
                    '${k.useage_type}',
                    '${k.no_of_units_used}',
                    '${k.serial_number}',
                          1,
                    CURRENT_TIMESTAMP()) ${dlmtr}`;
        })
    }
    QRY_TO_EXEC = QRY_TO_EXEC + valQry;

    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
};
/**************************************************************************************
* Controller     : gethardwaredataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 1/12/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.gethardwaredataMdl = function (data, user, callback) {
    var fnm = 'gethardwaredataMdl';

    console.log("success", data)

    var QRY_TO_EXEC = ` select * from sub_categories where cat_id=21 ; `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gethardwaredataMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 1/12/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.gethardwareidbaseddataMdl = function (data, user, callback) {
    var fnm = 'gethardwareidbaseddataMdl';

    console.log("success", data)

    var QRY_TO_EXEC = `select hw.* from hard_ware as hw
 join sub_categories as sc on sc.sub_cat_id=hw.cat_id where sc.sub_cat_id=${data.sub_cat_id} ; `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}
/**************************************************************************************
* Controller     : gethelpdeskvideosMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 1/12/2022   -  Ramesh  - Initial Function
*
***************************************************************************************/
exports.gethelpdeskvideosMdl = function (data, user, callback) {
    var fnm = 'gethelpdeskvideosMdl';

    console.log("success", data)

    var QRY_TO_EXEC = `select * from help_desk_videos `
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, fnm);
}