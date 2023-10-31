var jwt = require('jsonwebtoken');
var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var authMdl = require('../models/authMdl');
var df = require( '../../../../utils/dflower.utils');
var mailUtls = require(appRoot + '/utils/communication.utils');
var svgCaptcha = require('svg-captcha');
var crypto = require('crypto');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/******************************************************************************************************
 * Controller : Login
 * Description : To check if session with user details created or not
 * 04/04/2023 - Shaik Allabaksh 
 * 
 *******************************************************************************************************/
exports.login_sess = function (req, res) {
    fnm = "login_sess" 
    var privateKey = 'sifywaterDev101222';
    var req_body = req.body ? req.body : req.body.data;
	let ip =req.socket.remoteAddress;
	console.log("ip address",ip)
    console.log("first")
	authMdl.loginMdl(req_body).then(function (usrDeviceDtls) {
		if(usrDeviceDtls && usrDeviceDtls.length == 0) {
			let error = 'Please Check Your Credentials'
			return df.formatErrorAppRes(req, res, error, cntxtDtls, fnm, {});
		} else {
			if(usrDeviceDtls[0].device_id != null){
				authMdl.loginAppMdl(req_body).then(function (usrDtls) {
					if (usrDtls && usrDtls.length == 0) {

						let error = 'This Device is Not Registered in TrackOn. Please Contact Your Manager.'
						return df.formatErrorAppRes(req, res, error, cntxtDtls, fnm, {});
					} else {
						return usrDtls;
					}
				}).then((usrDtls) => {

					if (!usrDtls || usrDtls == undefined) return

					authMdl.loginhistryMdl(req_body, usrDtls[0], ip).then(function (results) {
						authMdl.chckattendenceMdl(req_body, usrDtls[0]).then(function (chckattnddata) {
							authMdl.attendenceMdl(req_body, usrDtls[0], chckattnddata).then(function (results) {
								if (chckattnddata[0].count == 0) {
									usrDtls[0].loginhistoryId = results.insertId
								} else {
									usrDtls[0].loginhistoryId = results[0].attendence_id
								}
								authMdl.insrtemplyeetokenMdl(req_body, usrDtls[0]).then(function (result) {
									usrDtls[0].tokenId = result.insertId
									console.log(usrDtls[0].tokenId, "-----------------------tokenID--------------------tokenid")
									if (req_body.app == "mobile") {
										req_body.emp_id = usrDtls[0].emp_id
										authMdl.gpsinfoMdl(req_body)
											.then(function (results) {

											}).catch(function (error) {
												df.formatErrorRes(req, res, error, cntxtDtls, '', {});
											});
									}

									var data = {};
									//console.log(usrDtls)
									let payload;
									payload = Object.assign({}, usrDtls[0], {
										app: req_body.app,
										cmpnt_id: req_body.cmpnt_id,
										//prt_in: usrDtls.login_details.prt_in,
										//caf_in: usrDtls.login_details.caf_in,
										//user_id: usrDtls.login_details.mrcht_usr_id,
									});
									data.user = payload;
									var accessToken = jwt.sign(payload, privateKey, { expiresIn: '2h', algorithm: 'HS256' }); //{ algorithm: 'HS256'});
									req.user = payload;
									data.token = accessToken;
									res.setHeader('x-access-token', accessToken);

									console.log(usrDtls[0], "------------sdfffffffffff---------dddddddddddddddd")
									authMdl.updatetokenemplyeeMdl(req_body, result.insertId, accessToken, usrDtls[0])
									authMdl.updateemplyeetokenMdl(req_body, usrDtls[0])

									df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
								}).catch(function (error) {
									console.log(error)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
								});
								//})

							}).catch(function (error) {
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
						})
					})

				})
			} else {
				authMdl.loginhistryMdl(req_body, usrDeviceDtls[0], ip).then(function (results) {
						authMdl.chckattendenceMdl(req_body, usrDeviceDtls[0]).then(function (chckattnddata) {
							authMdl.attendenceMdl(req_body, usrDeviceDtls[0], chckattnddata).then(function (results) {
								if (chckattnddata[0].count == 0) {
									usrDeviceDtls[0].loginhistoryId = results.insertId
								} else {
									usrDeviceDtls[0].loginhistoryId = results[0].attendence_id
								}
								authMdl.insrtemplyeetokenMdl(req_body, usrDeviceDtls[0]).then(function (result) {
									usrDeviceDtls[0].tokenId = result.insertId
									console.log(usrDeviceDtls[0].tokenId, "-----------------------tokenID--------------------tokenid")
									if (req_body.app == "mobile") {
										req_body.emp_id = usrDeviceDtls[0].emp_id
										authMdl.gpsinfoMdl(req_body)
											.then(function (results) {

											}).catch(function (error) {
												df.formatErrorRes(req, res, error, cntxtDtls, '', {});
											});
									}

									var data = {};
									//console.log(usrDeviceDtls)
									let payload;
									payload = Object.assign({}, usrDeviceDtls[0], {
										app: req_body.app,
										cmpnt_id: req_body.cmpnt_id,
										//prt_in: usrDeviceDtls.login_details.prt_in,
										//caf_in: usrDeviceDtls.login_details.caf_in,
										//user_id: usrDeviceDtls.login_details.mrcht_usr_id,
									});
									data.user = payload;
									var accessToken = jwt.sign(payload, privateKey, { expiresIn: '2h', algorithm: 'HS256' }); //{ algorithm: 'HS256'});
									req.user = payload;
									data.token = accessToken;
									res.setHeader('x-access-token', accessToken);

									console.log(usrDeviceDtls[0], "------------sdfffffffffff---------dddddddddddddddd")
									authMdl.updatetokenemplyeeMdl(req_body, result.insertId, accessToken, usrDeviceDtls[0])
									authMdl.updateemplyeetokenMdl(req_body, usrDeviceDtls[0])

									df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
								}).catch(function (error) {
									console.log(error)
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
								});
								//})

							}).catch(function (error) {
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
						})
					})
			}
		}	
    })
    /*authMdl.loginMdl(req_body) .then(function (usrDtls) { 
            if (usrDtls && usrDtls.length == 0) {
               
			    let error = 'no data found'
                return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {});
            } else {
            return usrDtls;
            }
        }).then((usrDtls) => {	
           
            if (!usrDtls || usrDtls == undefined) return
                
            authMdl.loginhistryMdl(req_body,usrDtls[0],ip)
                .then(function (results) {
					authMdl.chckattendenceMdl(req_body,usrDtls[0]).then(function (chckattnddata) {
					authMdl.attendenceMdl(req_body,usrDtls[0], chckattnddata).then(function (results) {
					if(chckattnddata[0].count == 0){
						usrDtls[0].loginhistoryId = results.insertId
					} else {
						usrDtls[0].loginhistoryId = results[0].attendence_id
					}
                    authMdl.insrtemplyeetokenMdl(req_body,usrDtls[0]).then( function (result) {
						usrDtls[0].tokenId = result.insertId
                        console.log(usrDtls[0].tokenId,"-----------------------tokenID--------------------tokenid")
					   if(req_body.app == "mobile"){
							req_body.emp_id = usrDtls[0].emp_id
							authMdl.gpsinfoMdl(req_body)
								.then(function (results) {
								
								}).catch(function (error) {
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					   }
						
					   var data = {};
					   //console.log(usrDtls)
					   let payload;
					   payload = Object.assign({}, usrDtls[0], {
						   app: req_body.app,
						   cmpnt_id: req_body.cmpnt_id,
						   //prt_in: usrDtls.login_details.prt_in,
						   //caf_in: usrDtls.login_details.caf_in,
						   //user_id: usrDtls.login_details.mrcht_usr_id,
					   });
					   data.user = payload;
					   var accessToken = jwt.sign(payload, privateKey, { expiresIn: '1d' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
					   req.user = payload;
					   data.token = accessToken;
					   res.setHeader('x-access-token', accessToken);
						   
					   console.log(usrDtls[0],"------------sdfffffffffff---------dddddddddddddddd")
					   authMdl.updatetokenemplyeeMdl(req_body,result.insertId,accessToken,usrDtls[0])
					   authMdl.updateemplyeetokenMdl(req_body,usrDtls[0])
					   
						df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
					}).catch(function (error) {
						console.log(error)
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
					//})
  
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
		})
				})
            
        })
      */ 
}

/******************************************************************************************************
 * Controller : Login
 * Description : To check if session with user details created or not
 * 04/04/2023 - Shaik Allabaksh 
 * 
 *******************************************************************************************************/
exports.login_sess_web = function (req, res) {
    fnm = "login_sess"
    var privateKey = 'sifywaterDev101222';
    var req_body = req.body ? req.body : req.body.data;
	let ip =req.socket.remoteAddress;
	console.log("ip address",ip)
    console.log("first")
    authMdl.loginwebMdl(req_body) 
        .then(function (usrDtls) { 
            if (usrDtls && usrDtls.length == 0) {
               
			    let error = 'no data found'
                return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {});
            } else {
            return usrDtls;
            }
        }).then((usrDtls) => {
           
            if (!usrDtls || usrDtls == undefined) return
                
            authMdl.loginhistryMdl(req_body,usrDtls[0],ip)
                .then(function (results) {
					
                
                    usrDtls[0].loginhistoryId = results.insertId
                    authMdl.insrtemplyeetokenMdl(req_body,usrDtls[0]).then( function (result) {
						usrDtls[0].tokenId = result.insertId
                        console.log(usrDtls[0].tokenId,"-----------------------tokenID--------------------tokenid")
					//    if(req_body.app == "mobile"){
						req_body.emp_id = usrDtls[0].emp_id
					// 		authMdl.gpsinfoMdl(req_body)
					// 			.then(function (results) {
								
					// 			}).catch(function (error) {
					// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					// 		});
					//    }
						
					   var data = {};
					   //console.log(usrDtls)
					   let payload;
					   //var accessToken = jwt.sign(payload, privateKey, { expiresIn: '3h' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
					   payload = Object.assign({}, usrDtls[0], {
						   app: req_body.app,
						   cmpnt_id: req_body.cmpnt_id,
						   //prt_in: usrDtls.login_details.prt_in,
						   //caf_in: usrDtls.login_details.caf_in,
						   //user_id: usrDtls.login_details.mrcht_usr_id,
					   });
					   //data.user = payload;
					   data.user = {}
					   var accessToken = jwt.sign(payload, privateKey, { expiresIn: '1d' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
					   req.user = payload;
					   data.token = accessToken;
					   data['user']['token'] = accessToken;
					   data['user']['emp_id'] = usrDtls[0].emp_id;
					   data['user']['emp_username'] = usrDtls[0].emp_username;
					   data['user']['emp_designation'] = usrDtls[0].emp_designation;
					   data['user']['fcm_id'] = usrDtls[0].fcm_id;
					   data['user']['emp_code'] = usrDtls[0].emp_code;
					   data['user']['emp_mobile'] = usrDtls[0].emp_mobile;
					   data['user']['emp_email'] = usrDtls[0].emp_email;
					   data['user']['emp_role'] = usrDtls[0].emp_role;
					
					   res.setHeader('x-access-token', accessToken);
						   
					   console.log(usrDtls[0],"------------sdfffffffffff---------dddddddddddddddd")
					   authMdl.updatetokenemplyeeMdl(req_body,result.insertId,accessToken,usrDtls[0])
					   authMdl.updateemplyeetokenMdl(req_body,usrDtls[0])
					//    authMdl.chckattendenceMdl(req_body,usrDtls[0]).then(function (chckattnddata) {
					// 	   if(chckattnddata[0].count == 0){
					// 		   authMdl.attendenceMdl(req_body,usrDtls[0]).then(function (results) {
					// 			})
					// 	   }
					//    })
					   //authMdl.flgpunchinMdl(req_body,usrDtls[0])
					   //.then( function (results) {
					     // data.punch_flg = results.punch_flg
						 //  console.log("results",results.punch_flg)
						  // console.log("results",results[0].punch_flg)
								   
					   //operations.record('lgn_ct');
						df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
					}).catch(function (error) {
						console.log(error)
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
					//})
				})
            
        })
       
}

/**************************************************************************************
* Controller     : insertwatrrlsecategryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/04/2023 - Shaik Allabaksh   
*
***************************************************************************************/
exports.gpsinfoCtrl = (req, res) => {

    authMdl.gpsinfoMdl(req.body, req.user).then(function (results) {
		authMdl.updtgpsAttndinfoMdl(req.body, req.user).then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});

}

/******************************************************************************************************
 * Controller : Login
 * Description : To check if session with user details created or not
 * 04/04/2023 - Shaik Allabaksh 
 * 
 *******************************************************************************************************/
exports.logoutSessCtrl = async (req, res) => {
    const fnm = "logout_sess"
    const reqUser = req.user
    const reqBody = req.body ? req.body : req.body.data
 
    authMdl.logoutHistryMdl(reqBody,reqUser).then(function (results) {

         df.formatSucessRes(req, res, results, cntxtDtls, fnm, {success_msg: "logout successful"});
 
     }).catch(function (error) {
         df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
 }).then(function ()  {
    if (sessionStore) sessionStore.close();
     req.session.destroy()
 })
 }


           
/******************************************************************************************************
 * Controller : captcha Login
 * Description : To check if session with user details created or not
 * 15/11/2022 - Ramesh Patlola 
 * 
 *******************************************************************************************************/

exports.web_login_sess = function(req, res){
     fnm = "web_login_sess"
    var privateKey = 'sifywaterDev101222';
    req_body = req.body ? req.body : req.body.data;
	let ip =req.socket.remoteAddress;
	console.log("ip address",ip)
    console.log("first")
    authMdl.loginMdl(req_body) 
        .then(function (usrDtls) { 
            if (usrDtls && usrDtls.length == 0) {
               
			    let error = 'no data found'
                return df.formatloginErrorRes(req, res, error, cntxtDtls, fnm, {});
            } else {
            return usrDtls;
            }
        }).then((usrDtls) => {
           
            if (!usrDtls || usrDtls == undefined) return
                
            authMdl.loginhistryMdl(req_body,usrDtls[0],ip)
                .then(function (results) {
					authMdl.attendenceMdl(req_body,usrDtls[0])
                .then(function (results) {
                
                    usrDtls[0].loginhistoryId = results.insertId
                    authMdl.insrtemplyeetokenMdl(req_body,usrDtls[0]).then( function (result) {
						usrDtls[0].tokenId = result.insertId
                        console.log(usrDtls[0].tokenId,"-----------------------tokenID--------------------tokenid")
					   if(req_body.app == "mobile"){
							req_body.emp_id = usrDtls[0].emp_id
							authMdl.gpsinfoMdl(req_body)
								.then(function (results) {
								
								}).catch(function (error) {
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
					   }
						
					   var data = {};
					   let payload;
					   payload = Object.assign({}, usrDtls[0], {
						   app: req_body.app,
						   cmpnt_id: req_body.cmpnt_id,
					   });
					   data.user = payload;
					   var accessToken = jwt.sign(payload, privateKey, { expiresIn: '1d' , algorithm: 'HS256'} ); //{ algorithm: 'HS256'});
					   req.user = payload;
					   data.token = accessToken;
					   res.setHeader('x-access-token', accessToken);
						   
					   console.log(usrDtls[0],"------------sdfffffffffff---------dddddddddddddddd")
					   authMdl.updatetokenemplyeeMdl(req_body,result.insertId,accessToken,usrDtls[0])
					   authMdl.updateemplyeetokenMdl(req_body,usrDtls[0])
						df.formatSucessRes(req, res, data, cntxtDtls, fnm, {});
					}).catch(function (error) {
						console.log(error)
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
					//})
  
            }).catch(function (error) {
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
				})
            
        })
}

/**************************************************************************************
* Controller     : validateCaptch
* Parameters     : req,res()
* Description    : 
* Change History : Ramesh - Initial Function
*
***************************************************************************************/
validateCaptch = function (cptch_txt, cptch_id, calbck) {
    var fnm = "validateCaptch";

    authMdl.validateCaptchaMdl(cptch_txt, cptch_id).then(function (results) {
        if (results && results.length) {
            var cptchSltKey = results[0]['cptch_slt_ky']
            calbck(false, cptchSltKey);
        }
        else {
            calbck(true, "Invalid Captcha");
        }
    }, function (error) {
		calbck(true, "Invalid Captcha");
    });
}

/**************************************************************************************
* Controller     : capchalgndtlsCtrl
* Parameters     : req,res()
* Description    : 
* Change History : Ramesh - Initial Function
*
***************************************************************************************/

var genSaltKey = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

exports.capchalgndtlsCtrl = function (req, res) {
    var fnm = "capchalgndtlsCtrl";
    var captcha = svgCaptcha.create(
        {
            Size: 4,
            Width: 100,
            Height: 50,
            Noise: 2,
            fontSize: 35,
            Color: true
        }
    );
    var salt_ky = genSaltKey(16);
    authMdl.insrtCpatchaTxtMdl(captcha.text, salt_ky).then(function (results) {
        if (results && results['insertId']) {
            var img_src = `data:image/svg+xml;base64,` + Buffer.from(captcha.data).toString('base64');
            res.type('svg');
			df.formatSucessRes(req, res, { data: img_src, cptch_id: results['insertId'], salt_ky: salt_ky }, cntxtDtls, fnm, {});
            //res.status(200).send({ data: img_src, text: results['insertId'], salt_ky : salt_ky });
        }
        else {
			df.formatErrorRes(res, null, cntxtDtls, fnm, {});
            //res.status(500).send({ data: null, text: null });
        }
    }, function (error) {
        df.formatErrorRes(res, error, cntxtDtls, fnm, {});
    });
}

/**************************************************************************************
* Controller     : generateCaptchaCntrl
* Parameters     : req,res()
* Description    : 
* Change History : Ramesh - Initial Function
*
***************************************************************************************/
exports.validateCaptchaCntrl = function (req, res) {
    var fnm = "validateCaptchaCntrl";
    var cptch_txt = req.params.cptch_txt;
    var cptch_id = req.params.cptch_id;
    authMdl.validateCaptchaMdl(cptch_txt, cptch_id).then(function (results) {
        if (results && results.length) {
            df.formatSucessRes(req, res, "valid", cntxtDtls, fnm, {});
        }
        else {
            df.formatErrorRes(res, "error", cntxtDtls, fnm, {
                error_status: 500,
                err_message: "invalid captcha"
            });
        }
    }, function (error) {
        df.formatErrorRes(res, error, cntxtDtls, fnm, {
            error_status: 500,
            err_message: "invalid captcha"
        });
    });
}

/**************************************************************************************
* Controller     : emplyeerledtlsCtrl
* Parameters     : req,res()
* Description    : 
* Change History : Ramesh - Initial Function
*
***************************************************************************************/
exports.emplyeerledtlsCtrl = function (req, res){
	authMdl.emplyeerledtlsMdl(req.params.id).then(function (usrDtls) {
		df.formatSucessRes(req, res, usrDtls, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : storedprocedureCtrl
* Parameters     : req,res()
* Description    : 
* Change History : Ramesh - Initial Function
*
***************************************************************************************/
exports.storedprocedureCtrl = function (req, res){
	authMdl.storedprocedureMdl(req.body).then(function (usrDtls) {
		df.formatSucessRes(req, res, usrDtls, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
	})
}
/**************************************************************************************
* Controller     : storedprocedureCtrl
* Parameters     : req,res()
* Description    : 
* Change History : Ramesh - Initial Function
*
***************************************************************************************/
exports.punchoutCtrl = function (req, res){
	var fnm = "punchoutCtrl"
	authMdl.punchoutMdl(req.body).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
	})
}

/**************************************************************************************
* Controller     : insertapppermissionsCtrl
* Parameters     : req,res()
* Description    : 
* Change History : shaik Allabaksh - Initial Function
*
***************************************************************************************/
exports.insertapppermissionsCtrl = function (req, res){
	var fnm = "insertapppermissionsCtrl"
	authMdl.insertapppermissionsMdl(req.body).then(function (result) {
		authMdl.updtemplyeeapppermissionsMdl(req.body).then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
		}).catch((err)=> {
			df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
		})
	}).catch((err)=> {
		df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
	})
}
/**************************************************************************************
* Controller     : getapppermissionsCtrl
* Parameters     : req,res()
* Description    : 
* Change History : shaik Allabaksh - Initial Function
*
***************************************************************************************/
exports.getapppermissionsCtrl = function (req, res){
	var fnm = "getapppermissionsCtrl"
	authMdl.getapppermissionsMdl(req.body).then(function (results) {

		df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
	})
}
/**************************************************************************************
* Controller     : forgetpasswordCtrl
* Parameters     : None
* Description    : To change password
* Change History :
* 27/06/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.forgetpasswordCtrl = function (req, res) {
    var fnm = "forgetpasswordCtrl";
    //log.info(`In ${fnm}`, 0, cntxtDtls);
	var genPwd = getPassword() ;
    //var genPwd = secConfig.pwdComplexity.auto_generated_pwd();
    var data = req.body;

    // Model gets called Here
    authMdl.checkemplyeusrMdl(data)
        .then(function (result) {
			console.log("result",result);
			console.log("length",result.length);
			
			if(result.length == 1){
				console.log("came in if");
				
				if(result[0]['emp_status'] != 0  ) {
					console.log("noactive");
					let error = {};
					// df.formatAppErrorRes(req, res, error, cntxtDtls, fnm, {});
				}
				var message = `Your+OTP+for+Password+reset+is+${genPwd}+`;
				console.log("message", message);
				mailUtls.sendDSMS(result[0].emp_mobile, message, '1107161838506775395', function (err, response) {
					if (err) {
						console.log("i'm in if err------------------------------------------------")
						return df.formatErrorRes(req, res, err, cntxtDtls, fnm, {});
					} else {
						authMdl.updpwdcheckemplyeusrMdl(data, result[0], genPwd)
						
							.then(function (updpwd) {
								console.log("otp data", result[0]);
								 var datas ={};
								datas['otp']=genPwd;
								datas['emp_mobile']=result[0].mbl_nu;
								datas['emp_id']=result[0].emp_id;
								datas['emp_username']=result[0].emp_username;
								df.formatSucessRes(req, res, datas, cntxtDtls, fnm, {});
							}).catch(function (error) {
								console.log("error");
								df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
							})
					}
				})
				//return result;	
			} else if(result.length > 1) {
				let error = {};
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			} else {
				let error = {};
				console.log("came first");
				df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
			}
        }).catch(function (error) {
			console.log("came second");
           df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

function getPassword() {
    /*var randPassword = Array(8).fill("abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789@").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');*/ //old password generation
	
	var chars = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","01234567890", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"];
	var randPassword = [1,1,6].map(function(len, i) { return Array(len).fill(chars[i]).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('') }).concat().join('').split('').sort(function(){return 0.5-Math.random()}).join('');
	console.log("passwrod", randPassword); //new passwrod code for huawei format
	
    return randPassword;
}

/**************************************************************************************
* Controller     : checkemployeetokenCtrl
* Parameters     : req,res()
* Description    : 
* Change History : shaik Allabaksh - Initial Function
*
***************************************************************************************/
exports.checkemployeetokenCtrl = function (req, res){
	var fnm = "checkemployeetokenCtrl"
	authMdl.checkemployeetokenMdl(req.body, req.user).then(function (results) {

		df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, false, cntxtDtls, fnm, {});
	})
}
/**************************************************************************************
* Controller     : change_pwd
* Parameters     : None
* Description    : To change password
* Change History :
* 17/07/2023   - durga - Initial Function
*
***************************************************************************************/
exports.change_pwd = function (req, res) {

    var fnm = "change_pwd";
    //log.info(`In ${fnm}`, 0, cntxtDtls);
    // //console.log(req.body);

    // Model gets called Here
    authMdl.check_pwdMdl(req.body)
        .then(function (results) {
           if ( results.length == 0) {
                df.formatSucessRes(req, res, false, cntxtDtls, fnm, {});
            }
            else {
                // Model gets called Here
                authMdl.change_pwdMdl(req.body, 0)
                    .then(function (results) {
						df.formatSucessRes(req, res, results, cntxtDtls, fnm, {});
                     
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
                    });
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

