var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var employeesMdl = require(appRoot + '/server/modules/employees/models/employeesMdl');
const fs = require('fs');
const mime = require('mime');
moment = require('moment');
var request = require('request');
var axios = require('axios')


/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
function getPassword() {
    var randPassword = Array(8).fill("1234567890").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
}

exports.insertemployeeCtrl = (req, res) => {
    console.log("i'm in insert employee CTRL ---------------------------------------------------------------xcv------------",req.body)
	employeesMdl.chckemployeeDtlsMdl(req.body, req.user).then(function (duplicateData) {
		console.log(duplicateData,"duplicateDataaaaaaaaaaaaaaaaaa")
		if (duplicateData && duplicateData.length != 0) {
            // Return an error response indicating the duplicate
           let error = "Employee with the same username already exists.";
			console.log(error, "errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
			return df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "700", err_message: error });
        } else {
			employeesMdl.getemployeeSteZneMdl(req.body, req.user).then(function (zoneStateData) {
				const randomPassword = getPassword()
				employeesMdl.insertemployeeMdl(req.body, req.user, zoneStateData[0], randomPassword).then(function (results) {
					employeesMdl.getappshorturl().then(function (appurl) {
						var data = {
								"mobileNo":req.body.emp_mobile,
								///"textMsg":`Dear ${req.body.emp_username}, Sify Technologies has added you to Sify application as manager. To download the sify app application, please open link below on the mobile phone with registered mobile number ${req.body.emp_mobile}. \nDownload Link http://sify.digitalrupay.com:8080/Welcome \nPlease use below credentials to access your account \nUsername:${req.body.emp_username} Password:${req.body.emp_mobile}`
								//"textMsg":`Dear ${req.body.emp_username} , Sify Technologies has added you to Sify application as manager, You can login and manage your tasks and members by accessing http://sify.digitalrupay.com:8080/Welcome use below credentials to access your account Username: ${req.body.emp_username} Password: ${req.body.emp_mobile}`,
								"textMsg":`Dear ${req.body.emp_username}, Sify Technologies has added you to Sify application. To download the sify application, please open link below on the mobile phone with registered mobile number ${req.body.emp_mobile}. Download Link ${appurl[0].app_short_url} Please use below credentials to access your account Username: ${req.body.emp_username} Password: ${randomPassword}`,
							}
							console.log("sms data",data)
						var sms = {
							method: 'post',
							json: true,
							url: as.url_servicenow.smsManagement.urlApi,
							headers: {
								'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
								'content-type': 'application/json'
							},
							data : null,
						}
						sms.data = data
						console.log("only sms",sms)
						//request(sms, function (err, resp, body) {
						return axios(sms).then((body)=> {
							console.log("body",body.data);
							if(body.data['result'].status=='success'){
								df.formatSucessRes(req, res, results, cntxtDtls, '', {});
							} else {
								df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
							}
						}).catch(function (error) {
							console.log("error 68", error);
							df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
						});
						//df.formatSucessRes(req, res, results, cntxtDtls, '', {});
					}).catch(function (error) {
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
			}).catch(function (error) {
				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
			});
		}
	})
}
// exports.insertemployeeCtrl = (req, res) => {
//     console.log("i'm in insert employee CTRL ---------------------------------------------------------------xcv------------",req.body)
//     employeesMdl.getemployeeSteZneMdl(req.body, req.user).then(function (zoneStateData) {
// 		employeesMdl.insertemployeeMdl(req.body, req.user, zoneStateData[0]).then(function (results) {
// 			employeesMdl.getappshorturl().then(function (appurl) {
// 				var data = {
// 						"mobileNo":req.body.emp_mobile,
// 						///"textMsg":`Dear ${req.body.emp_username}, Sify Technologies has added you to Sify application as manager. To download the sify app application, please open link below on the mobile phone with registered mobile number ${req.body.emp_mobile}. \nDownload Link http://sify.digitalrupay.com:8080/Welcome \nPlease use below credentials to access your account \nUsername:${req.body.emp_username} Password:${req.body.emp_mobile}`
// 						//"textMsg":`Dear ${req.body.emp_username} , Sify Technologies has added you to Sify application as manager, You can login and manage your tasks and members by accessing http://sify.digitalrupay.com:8080/Welcome use below credentials to access your account Username: ${req.body.emp_username} Password: ${req.body.emp_mobile}`,
// 						"textMsg":`Dear ${req.body.emp_username}, Sify Technologies has added you to Sify application. To download the sify application, please open link below on the mobile phone with registered mobile number ${req.body.emp_mobile}. Download Link ${appurl[0].app_short_url} Please use below credentials to access your account Username: ${req.body.emp_username} Password: ${req.body.emp_mobile}`,
// 					}
// 					console.log("sms data",data)
// 				var sms = {
// 					method: 'post',
// 					json: true,
// 					url: as.url_servicenow.smsManagement.urlApi,
// 					headers: {
// 						'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
// 						'content-type': 'application/json'
// 					},
// 					body : data,
// 				}
// 				console.log("only sms",sms)
// 				request(sms, function (err, resp, body) {
// 					console.log("body",body);
// 					if(body['result'].status=='success'){
// 						//df.formatSucessRes(req, res, results, cntxtDtls, '', {});
// 					} else {
// 						df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
// 					}
// 				})
// 				df.formatSucessRes(req, res, results, cntxtDtls, '', {});
// 			}).catch(function (error) {
// 				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 			});
// 		}).catch(function (error) {
// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 		});
// 	}).catch(function (error) {
// 		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 	});

// }



/**************************************************************************************
* Controller     : AddBulkEmplyeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/07/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.AddBulkEmplyeeCtrl = (req, res) => {
	var fnm = `AddBulkEmplyeeCtrl`
	var request_body = req.body;
	var counter = 0;
	if(request_body && request_body.length > 0){
		req.body.filter((req_body) => {
			employeesMdl.chckemployeeDtlsMdl(req_body, req.user).then(function (empdata) {
				if(empdata.length == 0){
					if(req_body.emp_designation == 'Rigger'){
						req_body.emp_designation = 232
						req_body.emp_role = 2
					} else if(req_body.emp_designation == 'Engineer'){
						req_body.emp_designation = 231
						req_body.emp_role = 3
					} else if(req_body.emp_designation == 'Manager'){
						req_body.emp_designation = 234
						req_body.emp_role = 4
					} else {
						req_body.emp_designation = 0
						req_body.emp_role = 0
					}
					if(req_body.member_type == 'On Roll'){
						req_body.member_type = 286
					} else if(req_body.member_type == 'Contract'){
						req_body.member_type = 288
					} else if(req_body.member_type == 'Outsourced'){
						req_body.member_type = 287
					} else {
						req_body.member_type = 0
					}
					employeesMdl.chckclstremployeeMdl(req_body, req.user).then(function (zoneIdData) {
						req_body.cluster_id = zoneIdData[0].cluster_id
						employeesMdl.chckVndremployeeMdl(req_body, req.user).then(function (VndrIdData) {
							req_body.vendor_name = VndrIdData[0].vendor_id
							employeesMdl.chckTaskTypeemployeeMdl(req_body, req.user).then(function (TaskTypeIdData) {
								req_body.skill_type = TaskTypeIdData[0].comp_cat_id
								employeesMdl.chckshiftemployeeMdl(req_body, req.user).then(function (shiftIdData) {
									req_body.shift_type_id = shiftIdData[0].shift_id
									console.log("req_body after",req_body)
									employeesMdl.getemployeeSteZneMdl(req_body, req.user).then(function (zoneStateData) {
										const randomPassword = getPassword()
										employeesMdl.insertBulkemployeeMdl(req_body, req.user, zoneStateData[0], randomPassword).then(function (results) {
											employeesMdl.getappshorturl().then(function (appurl) {
												var data = {
														"mobileNo":req_body.emp_mobile,
														"textMsg":`Dear ${req_body.emp_username}, Sify Technologies has added you to Sify application. To download the sify application, please open link below on the mobile phone with registered mobile number ${req_body.emp_mobile}. Download Link ${appurl[0].app_short_url} Please use below credentials to access your account Username: ${req_body.emp_username} Password: ${randomPassword}`,
													}
													console.log("sms data",data)
												var sms = {
													method: 'post',
													json: true,
													url: as.url_servicenow.smsManagement.urlApi,
													headers: {
														'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
														'content-type': 'application/json'
													},
													data : null,
												}
												sms.data=data
												console.log("only sms",sms)
												//request(sms, function (err, resp, body) {
												return axios(sms).then((body)=> {
													console.log("body",body.data,req_body.emp_mobile);
													if(body.data['result'].status=='success'){
														// df.formatSucessRes(req, res, results, cntxtDtls, '', {});
													} else {
														if (request_body.length == ++counter)
														df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
													}
												}).catch(function (error) {
													console.log("error 208", error);
													df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
												});
												console.log("request_body.length,counter",request_body.length,counter)
												if (request_body.length == ++counter)
												df.formatSucessRes(req, res, results, cntxtDtls, '', {});
											}).catch(function (error) {
												if (request_body.length == ++counter)
												df.formatErrorRes(req, res, error, cntxtDtls, '', {});
											});
										}).catch(function (error) {
											if (request_body.length == ++counter)
											df.formatErrorRes(req, res, error, cntxtDtls, '', {});
										});
									}).catch(function (error) {
										if (request_body.length == ++counter)
										df.formatErrorRes(req, res, error, cntxtDtls, '', {});
									});
								})
							})
						})
					})
				} else {
					let error = `already user exists ${req_body.emp_username}`
					if (request_body.length == ++counter)
					df.formatErrorAppRes(req, res, error, cntxtDtls, '', {});
				}
			})
		})
	} else {
		let error = "No Data To Insert";
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	}
}

/**************************************************************************************
* Controller     : getemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.getemployeeCtrl = (req, res) => {

    employeesMdl.getemployeeMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getbyemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.getbyemployeeCtrl = (req, res) => {

    employeesMdl.getbyemployeeMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : updateemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.updateemployeeCtrl = (req, res) => {

	employeesMdl.chckeditemployeeDtlsMdl(req.body, req.user).then(function (duplicateData) {
		if (duplicateData && duplicateData.length != 0) {
            //Return an error response indicating the duplicate
            let error = "Employee with the same username already exists.";
			console.log(error, "errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
			return df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "700", err_message: error });
		}else{
			employeesMdl.updateemployeeMdl(req.body, req.user).then(function (results) {
				df.formatSucessRes(req, res, results, cntxtDtls, '', {});
			}).catch(function (error) {
				error = "Please Try Again.";
				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
			});
		}
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});

}
/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.insertedemployeeCtrl = (req, res) => {
	console.log("req.data",req.body)
	function img_upload(img, filename, callback) {
        var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
			console.log("i'm in matches!")
            callback(false, res)
        }
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var date = new Date();
		console.log("date in employee  ---",date)
		var month = monthNames[date.getMonth()];
		var formatdate = moment(date).format( "DD-MM-YYYY");
		console.log("formatdate in water sample --- ",formatdate)
		var formatdatetime = moment(date).format( "DD-MM-YYYY-HHmmss");
		console.log("formatdatetime in water sample -- ",formatdatetime)
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
		console.log(response.data,"response.data-----")
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
		console.log(imageBuffer,"image buffer---")
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = filename+"_"+ formatdatetime + "." + extension;
        var dir = '/gvmc/filestore/watersample/uploads'+month+'/'+formatdate+'' ;
		console.log("i'm down of all declarations!")
        console.log(fs.existsSync(dir))
        if (!fs.existsSync(dir)) {
            //fs.mkdirSync(dir);
			console.log("i'm in files if first!")
			fs.mkdirSync(dir, { recursive: true })
            //fs.mkdir(dir, { recursive: true }, (err) => {
			  //if (err){ throw err;
			  	try {
						fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
						res['Location'] = `${dir}/${fileName}`;
						// var location = 'http://waterworks.digitalrupay.com/images/'+month+'/'+formatdate+'/'+fileName+'';
						var location = 'http://202.53.92.34:22/images/'+month+'/'+formatdate+'/'+fileName+'';
						callback(false, location)
				} catch (e) {
					console.log(e)
				}

			//});

        } else {

			try {
					console.log("i'm in files if second!")
					fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
					res['Location'] = `${dir}/${fileName}`;
					// var location = 'http://waterworks.digitalrupay.com/images/'+month+'/'+formatdate+'/'+fileName+'';
					var location = 'http://202.53.92.34:22/images/'+month+'/'+formatdate+'/'+fileName+'';
					callback(false, location)
			} catch (e) {
				console.log(e)
			}
		}

    }
	
	// function video_upload(video, filename, callback){
	// 	callback(false, 'true')
	// }
	
	if(req.body.img && req.body.img != undefined && req.body.img != null  ){
		console.log("i'm in body!")
	
				
						var filename2 = 'image_sample_'+req.body.wardid+'_'+req.body.hno+'';
						img_upload(req.body.img, filename2, (err, imgpath) => {
							console.log("i'm in images!")
							if (!err) {

    employeesMdl.insertedemployeeMdl(req.body,imgpath, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

} else {
								let error = 'error occured, please try again'
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							}
						})		
		
					}
}
/**************************************************************************************
* Controller     : deleteemployestatus
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.deleteemployestatusCtrl = (req, res) => {

    employeesMdl.deleteemployestatusMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : deleteemployestatus
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.categorieslistCtrl = (req, res) => {

    employeesMdl.categorieslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getbyemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.categorieslistbyidCtrl = (req, res) => {

    employeesMdl.categorieslistbyidMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : subcategorieslistbyidCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.subcategorieslistbyidCtrl = (req, res) => {

    employeesMdl.subcategorieslistbyidMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : deleteemployestatus
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.subcategorieslistCtrl = (req, res) => {

    employeesMdl.subcategorieslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : employeenameslistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.employeenameslistCtrl = (req, res) => {

    employeesMdl.employeenameslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getengnrandriggerlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.getengnrandriggerlistCtrl = (req, res) => {

    employeesMdl.getengnrandriggerlistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : addmanagersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.addmanagersCtrl = (req, res) => {
	const randomManagerPassword = getPassword()
    employeesMdl.addmanagersMdl(req.body, req.user, randomManagerPassword).then(function (results) {
		console.log("results------------------------------------------------------",results)
		employeesMdl.getwebshorturl().then(function (weburl) {
			
		var data = {
					"mobileNo":req.body.emp_mobile,
					"textMsg":`Dear ${req.body.emp_username} , Sify Technologies has added you to Sify application as manager, You can login and manage your tasks and members by accessing ${weburl[0].web_short_url} Please use below credentials to access your account Username: ${req.body.emp_username} Password: ${randomManagerPassword}`,
				}
				console.log("sms data",data)
			var sms = {
				method: 'post',				json: true,
				url: as.url_servicenow.smsManagement.urlApi,
				headers: {
					'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
					'content-type': 'application/json'
				},
				data : null,
			}
			sms.data = data
			console.log("only sms",sms)
			//request(sms, function (err, resp, body) {
			return axios(sms).then((body)=> {
				console.log("body",body);
				console.log("body",body.data);
				console.log("body",body.data.result);
				if(body.data['result'].status=='success'){
					//console.log("enters if conditionssssss") 
					df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	
				} else {
					df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
				}
			}).catch(function (error) {
				console.log("error 573", error);
				df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
			});
			
           // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});

}
// exports.addmanagersCtrl = (req, res) => {

    // employeesMdl.addmanagersMdl(req.body, req.user).then(function (results) {
		// console.log("results------------------------------------------------------",results)
		// employeesMdl.getwebshorturl().then(function (weburl) {
			// var data = {
					// "mobileNo":req.body.emp_mobile,
					// "textMsg":`Dear ${req.body.emp_username} , Sify Technologies has added you to Sify application as manager, You can login and manage your tasks and members by accessing ${weburl[0].web_short_url} Please use below credentials to access your account Username: ${req.body.emp_username} Password: ${req.body.emp_mobile}`,
				// }
				// console.log("sms data",data)
			// var sms = {
				// method: 'post',
				// json: true,
				// url: as.url_servicenow.smsManagement.urlApi,
				// headers: {
					// 'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
					// 'content-type': 'application/json'
				// },
				// body : data,
			// }
			// console.log("only sms",sms)
			// request(sms, function (err, resp, body) {
				// console.log("body",body);
				// if(body['result'].status=='success'){
				//df.formatSucessRes(req, res, results, cntxtDtls, '', {});
				// } else {
					// df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
				// }
			// })
            // df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		// }).catch(function (error) {
			// df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		// });
	// }).catch(function (error) {
		// df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	// });

// }
/**************************************************************************************
* Controller     : editmanagersdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.editmanagersdataCtrl = (req, res) => {

    employeesMdl.editmanagersdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : clustersbymembersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 04/-4/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.clustersbymembersCtrl = (req, res) => {

    employeesMdl.clustersbymembersMdl(req.body.cluster_ids, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : resetemplyeedeviceIdCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.resetemplyeedeviceIdCtrl = (req, res) => {

    employeesMdl.resetemplyeedeviceIdMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : employeereinviteCtrl
* Parameters     : req,res()
* Description    : employeereinviteMdl
* Change History :
* 17/07/2023   -  Durga  - Initial Function
*
**************************************************************************************/


exports.employeereinviteCtrl = (req, res) => {
	
	const randomPassword = getPassword()

    employeesMdl.employeereinviteMdl(req.body,req.user)
        .then(function (results_emp) {
			console.log("results",results_emp)
			console.log("results[0]",results_emp[0])
				employeesMdl.getappshorturl().then(function (appurl) {
					
					employeesMdl.updaterandompwdemployeeMdl(req.body, req.user,randomPassword).then(function (results) {
						if(results_emp[0].emp_designation == 234) {
							
							var data = {
										"mobileNo": `${results_emp[0].emp_mobile}`,
										"textMsg": `Dear ${results_emp[0].emp_username}, Sify Technologies has added you to Sify application as manager. You can login and manage your tasks and members by accessing ${appurl[0].web_short_url} Please use below credentials to access your account Username: ${results_emp[0].emp_username} Password: ${randomPassword}`,
									};
						}else{

							var data = {
								"mobileNo":`${results_emp[0].emp_mobile}`,
								"textMsg":`Dear ${results_emp[0].emp_username}, Sify Technologies has added you to Sify application. To download the sify application, please open link below on the mobile phone with registered mobile number ${results_emp[0].emp_mobile}. Download Link ${appurl[0].app_short_url} Please use below credentials to access your account Username: ${results_emp[0].emp_username} Password: ${randomPassword}`,
							}

						}
						
				  
				console.log("sms data",data)
				var sms = {
					method: 'post',
					json: true,
					url: as.url_servicenow.smsManagement.urlApi,
					headers: {
						'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
						'content-type': 'application/json'
					},
					data : null,
				}
				sms.data = data
				console.log("only sms",sms)
				//request(sms, function (err, resp, body) {
				return axios(sms).then((body)=> {
					console.log("body",body.data);
					if(body.data['result'].status=='success'){
						df.formatSucessRes(req, res, results, cntxtDtls, '', {});
					} else {
						df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
					}
				}).catch(function (error) {
					console.log("error 735", error);
					df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
				});
				
				 }).catch(function (error) {
          df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
		}).catch(function (error) {
          df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
    })
    .catch(function (error) {
      df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    });
	 
};



/**************************************************************************************
* Controller     : createnewflashnewsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.createnewflashnewsCtrl = (req, res) => {
	let fnm = 'createnewflashnewsCtrl'
	function img_upload(img, flname, callback) {
        //var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        //if (matches.length !== 3) {
            //callback(false, res)
        //}

        response.type = 'jpeg';
        response.data = new Buffer.from(img, 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
		//mime.define({
			//'png': ['png']
		//})
        //let extension = mime.extension(type);
        var name = 'offr_img_' + Date.now();
        //let fileName = flname + "." + extension;
        let fileName = flname + "_" + name + ".jpg";
        var dir = '/home/centos/glits/flashnews/images';
		var url = 'http://sifydev.digitalrupay.com/flashnewsimagesProd'
       console.log(fs.existsSync(dir))
        if (!fs.existsSync(dir)) {
            //fs.mkdirSync(dir);
			fs.mkdirSync(dir, { recursive: true })

        }

        try {
            fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
            res['Location'] = `${dir}/${fileName}`;
			res['url'] = `${url}/${fileName}`
			console.log("Location",res['Location']);
			console.log("url",res['url'])
            callback(false, res.url)
        } catch (e) {
            console.log(e)
        }

    }
	if(req.body.news_image != '' && req.body.news_image != null && req.body.news_image != undefined){
		var filename2 = 'image_sample';
		img_upload(req.body.news_image, filename2,(err, attKycChres) => {
			if (!err) {
				console.log("attKycChres",attKycChres)
				req.body.attKycChres = attKycChres
				employeesMdl.createnewflashnewsMdl(req.body,  req.user)
				.then(function (results) {
					df.formatSucessRes(req, res, results, cntxtDtls, '', {});
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
				
			} else {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert image" });
			}
		});

	}else{
		req.body.attKycChres = ''
		employeesMdl.createnewflashnewsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
	}

}

/**************************************************************************************
* Controller     : updateflashnews
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateflashnewsCtrl = (req, res) => {
	let fnm = 'updateflashnewsCtrl'
	function img_upload(img, flname, callback) {
        //var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        //if (matches.length !== 3) {
            //callback(false, res)
        //}

        response.type = 'jpeg';
        response.data = new Buffer.from(img, 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
		//mime.define({
			//'png': ['png']
		//})
        //let extension = mime.extension(type);
        var name = 'offr_img_' + Date.now();
        //let fileName = flname + "." + extension;
        let fileName = flname + "_" + name + ".jpg";
        var dir = '/home/centos/glits/flashnews/images';
		var url = 'http://sifydev.digitalrupay.com/flashnewsimagesProd'
       console.log(fs.existsSync(dir))
        if (!fs.existsSync(dir)) {
            //fs.mkdirSync(dir);
			fs.mkdirSync(dir, { recursive: true })

        }

        try {
            fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
            res['Location'] = `${dir}/${fileName}`;
			res['url'] = `${url}/${fileName}`
			console.log("Location",res['Location']);
			console.log("url",res['url'])
            callback(false, res.url)
        } catch (e) {
            console.log(e)
        }

    }
	if(req.body.news_image != '' && req.body.news_image != null && req.body.news_image != undefined){
		var filename2 = 'image_sample';
		img_upload(req.body.news_image, filename2,(err, attKycChres) => {
			if (!err) {
				console.log("attKycChres",attKycChres)
				req.body.attKycChres = attKycChres
				employeesMdl.updateflashnewsMdl(req.body, req.user)
				.then(function (results) {
					df.formatSucessRes(req, res, results, cntxtDtls, '', {});
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
				
			} else {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert image" });
			}
		});

	}else{
		req.body.attKycChres = ''
		employeesMdl.updateflashnewsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
	}

}

/**************************************************************************************
* Controller     : updateflashnews
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.deactivateflashnewsCtrl = (req, res) => {

    employeesMdl.deactivateflashnewsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : updateflashnews
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getflashnewsbyidCtrl = (req, res) => {

    employeesMdl.getflashnewsbyidMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : updateflashnews
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getflashnewsCtrl = (req, res) => {

    employeesMdl.getflashnewsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getbyemployeeroleCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/-9/2023   -  Durga  - Initial Function
*
***************************************************************************************/
exports.getbyemployeeroleCtrl = (req, res) => {

    employeesMdl.getbyemployeeroleMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getbyemployeeimageprofileCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getbyemployeeimageprofileCtrl = (req, res) => {
	let fnm = 'getbyemployeeimageprofileCtrl'
	console.log("req.data app",req.body)
	function img_upload(img, filename, callback) {
        var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
			console.log("i'm in matchessssssssssssssssssssssssssssssss!")
            callback(false, res)
        }
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var date = new Date();
		console.log("date in   ------------------------------- ",date)
		var month = monthNames[date.getMonth()];
		var formatdate = moment(date).format( "DD-MM-YYYY");
		console.log("formatdate in water sample ------------------------------- ",formatdate)
		var formatdatetime = moment(date).format( "DD-MM-YYYY-HHmmss");
		console.log("formatdatetime  ------------------------------- ",formatdatetime)
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
		console.log(response.data,"response.data----------------------")
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
		console.log(imageBuffer,"image buffer----------------")
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = filename+"_"+ formatdatetime + "." + extension;
        var dir = '/home/centos/glits/profile/images/' ;
		console.log("i'm down of all declarations!")
        console.log(fs.existsSync(dir))
        if (!fs.existsSync(dir)) {
            //fs.mkdirSync(dir);
			console.log("i'm in files if first!")
			fs.mkdirSync(dir, { recursive: true })
            //fs.mkdir(dir, { recursive: true }, (err) => {
			  //if (err){ throw err;
			  	try {
						fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
						res['Location'] = `${dir}/${fileName}`;
						var location = 'http://sifydev.digitalrupay.com/profileimagesProd/'+fileName+'';
						callback(false, location)
				} catch (e) {
					console.log(e)
				}

			//});

        } else {

			try {
					console.log("i'm in files if second!")
					fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
					res['Location'] = `${dir}/${fileName}`;
					var location = 'http://sifydev.digitalrupay.com/profileimagesProd/'+fileName+'';
					callback(false, location)
			} catch (e) {
				console.log(e)
			}
		}

    }

	if(req.body.image_url != '' && req.body.image_url != null && req.body.image_url != undefined){
		var filename2 = 'image_sample';
		img_upload(req.body.image_url, filename2,(err, image_url) => {
			if (!err) {
				console.log("image_url",image_url)
				req.body.image_url = image_url
				employeesMdl.getbyemployeeimageprofileMdl(req.body, req.user)
				.then(function (results) {
					var imgeurl=results.image_url
					df.formatSucessRes(req, res,image_url, cntxtDtls, '', {});
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
				
			} else {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert image" });
			}
		});

	}else{
		req.body.image_url = ''
		employeesMdl.getbyemployeeimageprofileMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
	}

}

/**************************************************************************************
* Controller     : updateflashnews
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07/07/2023   -  rajkumar  - Initial Function
*
***************************************************************************************/
exports.managerlockemployestatusCtrl = (req, res) => {

	employeesMdl.managerlockemployestatusMdl(req.body, req.user).then(function (results1) {
		if(req.body.lock_user==0){
			employeesMdl.empolyetokenupdateMdl(req.body, req.user).then(function (results2) {			
				df.formatSucessRes(req, res, results2, cntxtDtls, '', {});
			}).catch(function (error) {
				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
			})
	    } else {
			df.formatSucessRes(req, res, results1, cntxtDtls, '', {});
		}
	}).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

