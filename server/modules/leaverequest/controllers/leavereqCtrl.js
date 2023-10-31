var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var leavereqMdl = require(appRoot + '/server/modules/leaverequest/models/leavereqMdl');
const fs = require('fs');
const mime = require('mime');
moment = require('moment');
var request = require('request');
var axios = require('axios')

/**************************************************************************************
* Controller     : insertleavereqCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.insertleavereqCtrl = (req, res) => {

	leavereqMdl.getleavebydatesanduserMdl(req.body, req.user)
		.then(function (existingLeave) {
			console.log(existingLeave, "existingLeave............................................1")
			if (existingLeave && existingLeave.length != 0) {
				console.log("notcame-------------------------------------");
				let error = 'Leave request with the same dates already exists.'
				console.log(error, "errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
				return df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "700", err_message: error });

			} else {

				leavereqMdl.insertleavereqMdl(req.body, req.user)
					.then(function (insrtresults) {
						console.log(insrtresults, "insrtresults------------------0")
						console.log(insrtresults[0], "insrtresults[0]------------------0")
						leavereqMdl.getmanagersmobileMdl(req.body, req.user)
							.then(function (managersmbl) {
								console.log(managersmbl, "managersmbl---------------------1");
								console.log(managersmbl[0], "managersmbl---------------------2");
								leavereqMdl.getemployeeleavedtlMdl(req.body, req.user)
									.then(function (results) {
										console.log(results, "results---------------------3");
										console.log(results[0], "results[0]---------------------4");

										const text = results[0].emp_name + ' Your Leave request is applied : ' + req.body.leave_from_date + ', ' + req.body.leave_to_date + '';
										console.log(text, "texttttttttttttttttttttttt")
										leavereqMdl.insertnotifyMdl(req.body, req.body.emp_id, req.user, text)
											.then(function (ntfcn) {
												console.log("results in dtls", results);
												const newtitle = 'Leave Appiled';
												let taskkind = 'Leave'
												var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from leave_requests as l
                                                                              join employees as e on e.emp_id=l.emp_id where l.emp_id= '${req.body.emp_id}' and e.sms_flag = 0 limit 1`;
												console.log(QRY_TO_EXEC, "QRY_TO_EXECQRY_TO_EXECQRY_TO_EXECQRY_TO_EXECQRY_TO_EXECQRY_TO_EXECQRY_TO_EXEC")

												leavereqMdl.sendPushNotificationMdl(req.body, req.body.emp_id, req.user, text, newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {
												})

											})


										let mngr_mobile_no = managersmbl[0].emp_mobile

										var data = {
											mobileNo: mngr_mobile_no,
											textMsg: `${results[0].emp_name}(${results[0].emp_code}) has requested leave from ${req.body.leave_from_date} to ${req.body.leave_to_date}.`
										}
										console.log("sms data", data)

										// Send SMS to each phone number

										const sms = {
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

										//request(sms, function (err, resp, body) {
										return axios(sms).then((body)=> {
											console.log("body", body.data);
											if (body.data['result'].status == 'success') {
												df.formatSucessRes(req, res, results, cntxtDtls, '', {});
											} else {
												df.formatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to sent SMS." });
											}
										})

									})
							})

					}).catch(function (error) {
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
			}
		})
}
/**************************************************************************************
* Controller     : insertleavereqCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.updateleavereqCtrl = (req, res) => {

    leavereqMdl.updateleavereqMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : leavereqlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.leavereqlistCtrl = (req, res) => {

    leavereqMdl.leavereqlistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : leavereqlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.leavereqlistbyidCtrl = (req, res) => {

    leavereqMdl.leavereqlistbyidMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : yeartotalleavesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.yeartotalleavesCtrl = (req, res) => {

    leavereqMdl.yeartotalleavesMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : requestedleaveslistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.requestedleaveslistCtrl = (req, res) => {

    leavereqMdl.requestedleaveslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : leavereqdataweblistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.leavereqdataweblistCtrl = (req, res) => {

    leavereqMdl.leavereqdataweblistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : leaverequestcountweblistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.leaverequestcountweblistCtrl = (req, res) => {

    leavereqMdl.leaverequestcountweblistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : rejectleaveCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.rejectleaveCtrl = (req, res) => {

	leavereqMdl.rejectleaveMdl(req.body, req.user)
		.then(function (results) {
			emp_id = req.body.emp_id
			leavereqMdl.getemployeenameMdl(req.body, emp_id, req.user)
				.then(function (results) {

					console.log(results, "results[0]");
					const text = ' Your Leave request is rejected : ' + results[0].leave_from_date + ', ' + results[0].leave_to_date + '';
					leavereqMdl.insertnotifyMdl(req.body, emp_id, req.user, text)
						.then(function (ntfcn) {
							console.log("results in dtls", results);

							const newtitle = 'Leave Rejected';
							let taskkind = 'Leave'
							var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from leave_requests as l
                 join employees as e on e.emp_id=l.emp_id where l.emp_id= '${emp_id}' and e.sms_flag = 0 limit 1`;

							leavereqMdl.sendPushNotificationMdl(req.body, emp_id, req.user, text, newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {

							})

						})

					var data = {
						"mobileNo": `${results[0].emp_mobile}`,
						"textMsg": `${results[0].emp_name}(${results[0].emp_code}) your leave request for leave from ${results[0].leave_from_date} to ${results[0].leave_to_date} has been rejected.`,
					}
					console.log("sms data", data)
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
					console.log("only sms", sms)
					//request(sms, function (err, resp, body) {
					return axios(sms).then((body)=> {
						console.log("body", body.data);
						if (body.data['result'].status == 'success') {
							df.formatSucessRes(req, res, results, cntxtDtls, '', {});
						} else {
							df.formatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to sent SMS." });
						}
					})
					// df.formatSucessRes(req, res, results, cntxtDtls, '', {});
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
		})

}
/**************************************************************************************
* Controller     : approvedleaveCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.approvedleaveCtrl = (req, res) => {

	leavereqMdl.approvedleaveMdl(req.body, req.user)
		.then(function (results) {

			console.log(results, "results........1");
			leavereqMdl.getleavedataMdl(req.body, req.user)
				.then(function (results) {

					var leave_from_date = results[0].leave_from_date
					var leave_to_date = results[0].leave_to_date

					console.log(leave_from_date, "leave_from_date.........")
					console.log(leave_to_date, "leave_to_date.........")

					leavereqMdl.insertleaverecordMdl(req.body, leave_from_date, leave_to_date, req.user)
						.then(function (results) {
							console.log(results, "results........2");
							console.log(results[0], "results........2");
							leavereqMdl.getemployeenameMdl(req.body, req.user)
								.then(function (empdtl) {
									console.log(empdtl, "empdtl----------------3");
									console.log(empdtl[0], "empdtl[0]----------------4");

									const text = ' Your Leave request is Approved : ' + empdtl[0].leave_from_date + ', ' + empdtl[0].leave_to_date + '';
									console.log(text, "texttexttexttexttexttexttext")
									leavereqMdl.insertnotifyMdl(req.body, empdtl[0].emp_id, req.user, text)
										.then(function (ntfcn) {
											console.log("results in dtls", results);

											const newtitle = 'Leave Approved';
											let taskkind = 'Leave'
											var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from leave_requests as l
                                    join employees as e on e.emp_id=l.emp_id where l.emp_id= '${empdtl[0].emp_id}' and e.sms_flag = 0 limit 1`;

											leavereqMdl.sendPushNotificationMdl(req.body, empdtl[0].emp_id, req.user, text, newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {

											})

										})
									var data = {
										"mobileNo": `${empdtl[0].emp_mobile}`,
										"textMsg": `${empdtl[0].emp_name}(${empdtl[0].emp_code}) your leave request for leave from ${empdtl[0].leave_from_date} to ${empdtl[0].leave_to_date} has been approved.`,
									}
									console.log("sms data", data)
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
									console.log("only sms", sms)
									//request(sms, function (err, resp, body) {
									return axios(sms).then((body)=> {
										console.log("body", body.data);
										if (body.data['result'].status == 'success') {
											df.formatSucessRes(req, res, results, cntxtDtls, '', {});
										} else {
											df.formatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to sent SMS." });
										}
									})


									// df.formatSucessRes(req, res, results, cntxtDtls, '', {});
								}).catch(function (error) {
									console.log(error, "error")
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
								});
						}).catch(function (error) {
							console.log(error, "error")
							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
						});
				}).catch(function (error) {
					console.log(error, "error")
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
		})
}
/**************************************************************************************
* Controller     : cancelleaveappCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.cancelleaveappCtrl = (req, res) => {

    leavereqMdl.cancelleaveappMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : countleavelistappMdl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.countleavelistappCtrl = (req, res) => {

    leavereqMdl.countleavelistappMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : weekoffinsertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.weekoffinsertCtrl = (req, res) => {
	leavereqMdl.getemployeesMdl(req.body, req.user).then(function (results) {			  
		 leavereqMdl.weekoffinsertMdl(req.body,results,req.user).then(function (results) {
					 df.formatSucessRes(req, res, results, cntxtDtls, '', {});
			 leavereqMdl.getnullemployeesMdl(req.body,results,req.user).then(function (nullres) {
				  if(nullres.length > 0) {
						 df.formatSucessRes(req, res, nullres, cntxtDtls, '', {});
				 leavereqMdl.updatenullemployeesMdl(req.body,nullres,req.user).then(function (nullresponse) {
							df.formatSucessRes(req, res, nullres, cntxtDtls, '', {});
				 
				 }).catch(function (error) {
					 df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				 });
				}
			 })
		 })
	 })
 }



/**************************************************************************************
* Controller     : weekoffinsertCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga - Initial Function
*
***************************************************************************************/
exports.absentinsertCtrl = (req, res) => {
   leavereqMdl.absentinsertMdl(req.body, req.user).then(function (results) {			  
		leavereqMdl.absentinsertattendenceMdl(req.body,results,req.user).then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
	})

}
