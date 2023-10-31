
var dbutil = require( '../../../../utils/db.utils');;
var sqldb = require('../../../../config/db.config');
var df = require( '../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var moment = require('moment')

/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/
exports.loginMdl = function (data) {
    var fnm = "loginMdl"
    var QRY_TO_EXEC = `select * from employees where emp_username='${data.usr_name}' and emp_password=md5('${data.pwd}')  and emp_designation in (231,232) and emp_status=1 and lock_user=1`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : loginwebMdl
* Description : login
* Arguments : callback function
* 14-07-2023 Ramesh Patlola
*
******************************************************************************/
exports.loginwebMdl = function (data) {
    var fnm = "loginwebMdl"
    var QRY_TO_EXEC = `select * from employees where emp_username='${data.usr_name}' and emp_password=md5('${data.pwd}') and emp_designation not in (231,232) and emp_status=1`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : loginAppMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/
exports.loginAppMdl = function (data) {
    var fnm = "loginAppMdl"
    var QRY_TO_EXEC = `select * from employees where emp_username='${data.usr_name}' and emp_password=md5('${data.pwd}') and device_id='${data.device_id}' and emp_status=1`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/

exports.loginhistryMdl = function (data,usrdata,ip) {
    let addQuery = ``
	var addr = (data.login_address).replace(/'/g,"''")
    if (data.emp_login_img){
        addQuery = `,emp_login_img = '${data.emp_login_img}', emp_login_img_status = ${data.emp_login_img_status} `
    }
    
    var QRY_TO_EXEC = `insert into login_history set emp_id = ${usrdata.emp_id}, ip='${ip}' ,username = '${usrdata.emp_username}', env_info = '${data.env_info}', 
            login_time = current_timestamp(),login_location = '${data.login_location}', login_address = '${addr}' 
			${addQuery},fcm_id='${usrdata.fcm_id}',device_id='${usrdata.device_id}',punch_in_time=current_timestamp(),punch_status=1 ;`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
* Function : attendenceMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/

exports.attendenceMdl = function (data,usrdata,attdnce) {
    
	if(attdnce[0].count == 0){
		var QRY_TO_EXEC = `insert into attendence set emp_id = ${usrdata.emp_id},i_ts=current_timestamp() ;`
	} else {
		var QRY_TO_EXEC = `select attendence_id from attendence where date_format(i_ts,'%Y-%m-%d')=curdate() and emp_id=${usrdata.emp_id} order by attendence_id desc;`
	}
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 07-04-2023 shaik Allabaksh
*
******************************************************************************/

exports.logoutHistryMdl = function (data,usrdata,ip) {
    let qry = ``
    if (data.logout_location){
        qry = `,logout_location = '${data.logout_location}'`
    }
    if(data.logout_remarks){
		var addr = (data.logout_remarks).replace(/'/g,"''")
        qry = qry + `,logout_remarks = '${addr}'`
    }
    
    var QRY_TO_EXEC = `update login_history set logout_time = current_timestamp() ${qry} where emp_id = ${data.emp_id} and login_id = ${usrdata.loginhistoryId}; 
        update employee_tokens set token_status = 0, updated_at = current_timestamp() where emp_id = ${data.emp_id} and token_id = ${usrdata.tokenId};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

// exports.emptknlogoutMdl = function (data,usrdata,ip) {
//     var QRY_TO_EXEC = `update employee_tokens set token_status = 0, updated_at = current_timestamp() where emp_id = ${data.emp_id} and token_status = 1;`
//     console.log(QRY_TO_EXEC)
//     return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }


/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/

exports.gpsinfoMdl = function (data,usrdata) {
    
    /*let qry = ``

    if(data.track_type){
        qry = qry +`,track_type = '${data.track_type}'`
    }
    if(data.full_addr){
        qry = qry +`,full_addr = '${JSON.stringify(data.full_addr).replace(/'/g, "''")}'`
    }
    if(data.description){
		var addr = (data.description).replace(/'/g,"''")
        qry = qry +`,description = '${addr}'`
    }
    
    var QRY_TO_EXEC = `insert into emp_gps_info set emp_id = ${data.emp_id}, gps_lat = '${data.gps_lat}',punchin_flag=0, gps_lang = '${data.gps_lang}',dateCreated= current_timestamp() ${qry};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BatchConPool, QRY_TO_EXEC, cntxtDtls);*/
	
	let qry11 = ``
    let qry12 = ``
    let qry21 = ``
    let qry22 = ``
    let qry31 = ``
    let qry32 = ``

    if(data.track_type){
        qry11 = `,track_type`
        qry12 = `,'${data.track_type}'`
    }
    if(data.full_addr){
        qry21 = `,full_addr`
        qry22 = `,'${JSON.stringify(data.full_addr).replace(/'/g, "''")}'`
    }
    if(data.description){
		var addr = (data.description).replace(/'/g,"''")
        qry31 = `,description`
        qry32 = `,'${addr}'`
    }
    
    var QRY_TO_EXEC = `insert into emp_gps_info (emp_id,gps_lat,punchin_flag,gps_lang,dateCreated ${qry11} ${qry21} ${qry31} ) values (${data.emp_id}, '${data.gps_lat}',0, '${data.gps_lang}',current_timestamp() ${qry12}  ${qry22} ${qry32});`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.BatchConPool, QRY_TO_EXEC, cntxtDtls);
	
}

/*****************************************************************************
* Function : updtgpsAttndinfoMdl
* Description : login
* Arguments : callback function
* 07-07-2023 Ramesh Patlola
*
******************************************************************************/

exports.updtgpsAttndinfoMdl = function (data,usrdata) {
    var fnm = "updtgpsAttndinfoMdl"
    const currentDateTime = moment();
    const d = currentDateTime.format('YYYY-MM-DD HH:mm:ss');

    // var d = new Date();
	// //d.setDate(d.getDate() - 1);
	// d=moment(d).format('YYYY-MM-DD HH:MM:ss');
    var QRY_TO_EXEC = `update attendence set latest_record='${d},${data.gps_lat},${data.gps_lang},${JSON.stringify(data.full_addr).replace(/'/g, "''")}' where emp_id = ${data.emp_id} and date_format(i_ts,'%Y-%m-%d')=curdate();`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function : storedprocedureMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/
exports.storedprocedureMdl = function (data) {
    var fnm = "storedprocedureMdl"
    var QRY_TO_EXEC = `call hmws.get_emp();`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : authloginMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/
exports.authloginMdl = function (data) {
    var fnm = "authloginMdl"
    var QRY_TO_EXEC = `select e.*,ea.zone_ids as ward_ids from employees as e 
	left join emp_to_zone as ea ON ea.emp_id=e.emp_id 
	join usr_cptch_lst_t as uc on uc.cptch_slt_ky='${data.saltKey}' and uc.cptch_txt='${data.captcha}'
	where e.emp_username='${data.usr_name}' and e.emp_password=SHA1('${data.pwd}')`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};


/*****************************************************************************
* Function      : insrtCpatchaTxtMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtCpatchaTxtMdl = function (cptch_txt, salt_ky) {
    var QRY_TO_EXEC = ` INSERT INTO usr_cptch_lst_t(cptch_txt, cptch_slt_ky, i_ts)VALUES('${cptch_txt}', '${salt_ky}', CURRENT_TIMESTAMP());`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : validateCaptchaMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.validateCaptchaMdl = function (cptch_txt, cptch_id) {
    var QRY_TO_EXEC = ` SELECT * FROM usr_cptch_lst_t WHERE cptch_id = ${cptch_id} AND SHA1(cptch_txt) = SHA1('${cptch_txt}') AND a_in=1 `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


/*****************************************************************************
* Function      : captchScheduleJobMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.captchScheduleJobMdl = function (cptch_txt, cptch_id) {
    var QRY_TO_EXEC = ` DELETE FROM usr_cptch_lst_t WHERE i_ts < CURRENT_TIMESTAMP() - INTERVAL 1 HOUR; `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : deactivateValidatedCaptchaMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.deactivateValidatedCaptchaMdl = function (cptch_id) {
    var QRY_TO_EXEC = ` UPDATE usr_cptch_lst_t 
                        SET a_in=0,u_ts=CURRENT_TIMESTAMP()
                        WHERE cptch_id=${sqldb.MySQLConPool.escape(cptch_id)} `;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : emplyeerledtlsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.emplyeerledtlsMdl = function (id) {
    var QRY_TO_EXEC = `select * from user_roles where role_id=${id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : updateemplyeetokenMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updateemplyeetokenMdl = function (data,usrdata) {
	
	fcmid=``;
	deviceid=``;
	
	if (data.fcm_id != '' && data.fcm_id != null && data.fcm_id != undefined) {
        fcmid = `,fcm_id='${data.fcm_id}'`;
    }
	if (data.device_id != '' && data.device_id != null && data.device_id != undefined) {
	
        deviceid = `,device_id='${data.device_id}'`;
	}
	
    var QRY_TO_EXEC = `update employees set udte_fcm_devic =current_timestamp() ${fcmid} ${deviceid} where emp_id =${usrdata.emp_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
/*****************************************************************************
* Function      : emplyeetokenMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.emplyeetokenMdl = function (data,usrDtls,accessToken) {
	
	
    var QRY_TO_EXEC = `insert into employee_tokens (emp_id,token,token_status,created_at) values(${usrDtls.emp_id},'${accessToken}',1,current_timestamp())`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : insrtemplyeetokenMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.insrtemplyeetokenMdl = function (data,usrDtls) {
	
	
    var QRY_TO_EXEC = `insert into employee_tokens (emp_id,token_status,created_at) values(${usrDtls.emp_id},1,current_timestamp())`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function      : updatetokenemplyeeMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updatetokenemplyeeMdl = function (data,token_id,token,usrDtls) {
	
	
    var QRY_TO_EXEC = `update employee_tokens set token='${token}' where token_id=${token_id}`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/

exports.insertapppermissionsMdl = function (data,usrdata) {
    
    let qry = ``
    if(data.battery_percent || data.battery_percent === 0){
        qry = `,battery_percent = ${data.battery_percent}`
    }
    if(data.app_permissions){
        const permissions = JSON.stringify(data.app_permissions)
        qry = qry +`,app_permissions = '${permissions}'`
    }
    if(data.app_version){
        qry = qry +`,app_version = '${data.app_version}'`
    }
    if(data.emp_id){
        qry = qry +`,emp_id = '${data.emp_id}'`
    }
    if(data.device_id){
        qry = qry +`,device_id = '${data.device_id}'`
    }
    
    var QRY_TO_EXEC = `insert into app_permission_log set date_created = current_timestamp(), last_updated = curdate() ${qry};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

/*****************************************************************************
* Function      : updtemplyeeapppermissionsMdl
* Description   : 
* Arguments     : callback function
******************************************************************************/
exports.updtemplyeeapppermissionsMdl = function (data,usrDtls) {

	let qry = ``
	if(data.battery_percent || data.battery_percent === 0){
        qry = `,battery_percent = ${data.battery_percent}`
    }
    if(data.app_permissions){
        const permissions = JSON.stringify(data.app_permissions)
        qry = qry +`,app_permissions = '${permissions}'`
    }
    if(data.app_version){
        qry = qry +`,app_version = '${data.app_version}'`
    }
    var QRY_TO_EXEC = `update employees set updated_on=current_timestamp() ${qry} where emp_id = '${data.emp_id}'`;
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

/*****************************************************************************
* Function : loginMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/

exports.getapppermissionsMdl = function (data,usrdata) {
    
    var QRY_TO_EXEC = `select * from app_permission_log where emp_id = ${data.emp_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
 * Function      : check_usrMdl
 * Description   : check user exit or not
 * Arguments     : callback function
 ******************************************************************************/
exports.checkemplyeusrMdl = function (data) {
    var fnm = "checkemplyeusrMdl"
	
	
	
    var QRY_TO_EXEC = `select *  from employees where emp_mobile='${data.emp_mobile}' AND emp_email='${data.emp_email}' AND emp_username='${data.emp_username}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : change_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.updpwdcheckemplyeusrMdl = function (data, result, genPwd) {
    var fnm = "updpwdcheckemplyeusrMdl"
	console.log("data in mdl",result);
	var QRY_TO_EXEC = `UPDATE employees SET emp_password = MD5('${genPwd}') where emp_id='${result.emp_id}'`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
 * Function      : change_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.checkemployeetokenMdl = function (data, user) {
    var fnm = "checkemployeetokenMdl"
	
	var QRY_TO_EXEC = `select * from employee_tokens where token_id = ${user.tokenId};`;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
 * Function      : change_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.flgpunchinMdl = function (data,usrdata, user) {
    var fnm = "flgpunchinMdl"
	
	var QRY_TO_EXEC = `select * from attendence where emp_id =${usrdata.emp_id};`
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};

/*****************************************************************************
* Function : chckattendenceMdl
* Description : login
* Arguments : callback function
* 15-11-2022 Ramesh Patlola
*
******************************************************************************/

exports.chckattendenceMdl = function (data,usrdata) {
    
    var QRY_TO_EXEC = `select count(*) as count from attendence where date_format(i_ts,'%Y-%m-%d')=curdate() and emp_id=${usrdata.emp_id};`
    console.log(QRY_TO_EXEC)
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
/*****************************************************************************
 * Function      : check_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.check_pwdMdl = function (data) {
    var fnm = "check_pwdMdl"
	console.log(data,"data-------------");
	
	
	
    var QRY_TO_EXEC = `select * from employees where emp_id=${data.emp_id} `;
   console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};
/*****************************************************************************
 * Function      : change_pwdMdl
 * Description   : confirm password
 * Arguments     : callback function
 ******************************************************************************/
exports.change_pwdMdl = function (data, pwd_chngd_in) {
    var fnm = "change_pwdMdl"
	console.log(data,"data-------------2");
    var QRY_TO_EXEC = `update employees set emp_password = Md5('${data.nw_pswrd}') where emp_id = ${data.emp_id} `;
    console.log(QRY_TO_EXEC);
    return dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls,'',fnm);
};