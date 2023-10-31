var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var taskMdl = require(appRoot + '/server/modules/task/models/taskMdl');
const fs = require('fs');
const { forEach } = require('lodash');
const mime = require('mime');
moment = require('moment');
let jsonUtils = require(appRoot + '/utils/json.utils');
var request = require('request');
var axios = require('axios')
 
/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res() 
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.taskcreationCtrl = (req, res) => { 
    const req_body = req.body ? req.body : req.body.data
        taskMdl.getlasttaskMdl()
            .then(function (userdetails) {
                taskMdl.getsubcategoryMdl(req_body.task_category)
                    .then(function (taskCategory) {

            
                        let service_no =  userdetails.length > 0 ? userdetails[0].service_no : "0"
                        let task_no = userdetails.length > 0 ? userdetails[0].task_no : "0"  

                        if(!Number.isInteger(parseInt(task_no[0]))){
                            task_no = task_no.slice(3 - task_no.length)
                        }                 

                        task_no = parseInt(task_no) + 1
                        task_no = "STT"+task_no

                        if(taskCategory.length>0 && taskCategory[0].sub_cat_description != undefined 
                                                 && taskCategory[0].sub_cat_description != null){
                            console.log(taskCategory.length,"----------------------------------")

                            const category = taskCategory[0].sub_cat_description
                               
                            if(!Number.isInteger(parseInt(service_no[0]))){
                                service_no = service_no.slice(2 - service_no.length)
                                service_no = parseInt(service_no) + 1
                                service_no = category+service_no
                            }else{
                                service_no = parseInt(service_no) + 1
                                service_no = category+service_no
                            }               
                        }else{
                            
                            if(!Number.isInteger(parseInt(service_no[0]))){
                                service_no = service_no.slice(2 - service_no.length)
                                service_no = parseInt(service_no) + 1
                                service_no = service_no
                            }else{
                                service_no = parseInt(service_no) + 1
                                service_no = service_no
                            }
                           
                        }

                        taskMdl.taskcreationMdl(req_body, task_no, service_no, req.user)
                        .then(function (results) {
                          console.log(results,"results-----------resulsts-------------------------")
                            taskMdl.updatetasklogswhentaskcreatedMdl(req.body, results.insertId,  req.user)
                                .then(function (results) {

                                    taskMdl.updateattdnceofemolyeeMdl(req_body,task_no, req.user).then(function (ntfcn) {
                                    })
                                    taskMdl.insertnotifyMdl(req_body,task_no, req.user)
                                        .then(function (ntfcn) {

                                            console.log("results in dtls", results);
                                            const text = ' task created : '+ task_no +', task number : '+ task_no+ '' ;
                                            const newtitle = 'Task created' ;
                                            let taskkind = 'task'
                                            var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
                                                join employees as e on e.emp_id=t.emp_id where t.task_no= '${task_no}' and e.sms_flag = 0 limit 1`;
                                          
                                            taskMdl.sendPushNotificationMdl(req_body, task_no,req.user,text,newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {
                                       
                                            })

                                    })
                             
                                     
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });  
					
                            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
            
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});  
            })
    
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        })
    
    }
	
	
    
/**************************************************************************************
* Controller     : updatetaskCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
* 05-05-2023 - Ramesh Patlola - update code
***************************************************************************************/
exports.updatetaskCtrl = (req, res) => {
	let web_app = 1;
    taskMdl.is_user_in_travel_status_for_another_task_web_Mdl(req.body, req.user)
        .then(function (results) {
            if(req.body.task_status == 220 && results.length > 0){
                console.log("In travel for another task so can not update")
                return df.formatErrorRes(req, res, results, cntxtDtls, '',  { error_status: "400", err_message: "Sorry, you have another task in travel status." });
            }else{
                if(req.body.task_status != 224 && req.body.task_status != 227 ){
                    taskMdl.childupatetaskdatafrservicenowMdl(req.body.task_id, req.body.task_status, req.body.task_id, req.user)
                    .then(function (tskdata) {
                        console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length")
                        if(tskdata && tskdata.length > 0){
                        var data = {};
                        data['notes'] = null
                        data['tasks'] = [tskdata[0]];
            
                        console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
                        var options = {
                                    method: 'post',
                                    json: true,
                                    url: as.url_servicenow.processNotification.urlApi,

                                    headers: {
                                        'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                        'content-type': 'application/json'
                                    },
                                    data: null

                                }
                                options.data = data
                        console.log("options",options)
                        //console.log("options",options.body)
                        taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                //request(options, function (err, resp, body) {
								return axios(options).then((body) => {
                                    taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
									console.log("options",options)
									console.log("body",body.data)
									
									if( body.data ){
										let chckbody = JSON.stringify(body.data);
										if( !chckbody.includes('Error Page') ){
											if( body.data['result'].status=='success'){
												taskMdl.gettrvldstnceMdl(req.body, req.user)
													.then(function (tskdstnce) {
														console.log("updatetaskMdl tskdstnce",tskdstnce)
														taskMdl.childtaskriggerdatafrutilizationMdl(req.body).then(function (utlztnempdata) {
															console.log("utlztnempdata",utlztnempdata)
															taskMdl.utilizationWebReduceCountMdl(req.body,utlztnempdata[0].call_attnd).then(function (utlztndata) {
																taskMdl.getcall_attend_byMdl(req.body, req.user)
																	.then(function (results) {
																		console.log(results,"resultsresultsresultsresultsresultsresultsresults")
																		if(results.length > 0){
																			let call_attend_by = results[0].call_attend_by
																			req.body.call_attend_by = call_attend_by
																		}
																		taskMdl.updatetasklogsMdl(req.body, req.user)
																			.then(function (results) {
																				taskMdl.updatetaskMdl(req.body, req.user, tskdstnce)
																				.then(function (results) {
																					if(req.body.task_status == 271 && req.body.primary_flag == 1){
																						
																						taskMdl.get_sub_tasks_web_Mdl(req.body, req.user)   
																							.then(function (tasks) {
																								if(tasks.length > 0){
																									taskMdl.updateprmyfieldcanceltaskMdl(req.body, tasks[0], req.user).then(function (results) {
																										taskMdl.insert_into_task_logs_when_field_canceled_web_Mdl(req.body, tasks[0], req.user).then(function (results) {
																											df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																										}).catch(function (error) {
																											df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																										});
																									}).catch(function (error) {
																										df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																									});
																								} else {
																									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																								}
																								}).catch(function (error) {
																									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																								});
																					} else {
																						df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																					}
																				}).catch(function (error) {
																					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																				}); 
																		}).catch(function (error) {
																			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																		});   
																}).catch(function (error) {
																	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																});
															})
														})
													}).catch(function (error) {
														df.formatErrorRes(req, res, error, cntxtDtls, '', {});
													});
												} else {
													df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
												}
											} else {
												df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
											}
										} else {
											df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
										}
									}).catch(function (error) {
                                        console.log("error 223", error);
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    });
								}).catch(function (error) {
                                        console.log("error 227", error);
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    });
							}).catch(function (error) {
                                        console.log("error 231", error);
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    });
                        } else {
                            let error = 'No Tasks Found'
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        }
                        
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
                } else if(req.body.task_status == 224) {
                    taskMdl.taskdatafrservicenowmngrapprlMdl(req.body, req.user)
                    .then(function (tskdata) {
                        console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length")
                        if(tskdata && tskdata.length > 0){
                        var data = {};
                        data['notes'] = null
                        data['tasks'] = [tskdata[0]];
                        var checklistData = {}
                        //console.log("tskdata[0].formID",tskdata[0].formID)
                        checklistData[tskdata[0].formID] = [JSON.stringify(tskdata[0].checklistData)];
                        //console.log("checklistData",checklistData)
                        data['tasks'][0]['checklistData'] = checklistData;
                        console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
                        var options = {
                            method: 'post',
                            json: true,
                            url: as.url_servicenow.processNotification.urlApi,
                            headers: {
                                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                'content-type': 'application/json'
                            },
                            data: null

						}
						options.data = data
                        console.log("options",options)
                        //console.log("options",options.body)
                        taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                            //request(options, function (err, resp, body) {
                            return axios(options).then((body) => {
                                taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
									console.log("options",options)
									console.log("body",body.data)
									
									if( body.data ){
										let chckbody = JSON.stringify(body.data);
										if( !chckbody.includes('Error Page') ){
											if( body.data['result'].status=='success'){
												taskMdl.mngrapprvetaskMdl(req.body, req.user).then(function (results) {
													taskMdl.mngrapprvetasklogMdl(req.body, req.user).then(function (results) {
														df.formatSucessRes(req, res, results, cntxtDtls, '', {});
													}).catch(function (error) {
														console.log("error",error)
														df.formatErrorRes(req, res, error, cntxtDtls, '', {});
													});
												}).catch(function (error) {
													console.log("error",error)
													df.formatErrorRes(req, res, error, cntxtDtls, '', {});
												});  
											} else {
												df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
											}
										} else {
											df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
										}
									} else {
										df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
									}
								}).catch(function (error) {
                                            console.log("error 302", error);
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        });
							}).catch(function (error) {
                                            console.log("error 306", error);
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        });
						}).catch(function (error) {
                                            console.log("error 310", error);
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        });
                    } else {
                        let error = 'No Tasks Found'
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    }
                        
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
                } else {
                    taskMdl.taskdatafrservicenowmngrapprlMdl(req.body, req.user)
                    .then(function (tskdata) {
                        console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length in else part")
                        if(tskdata && tskdata.length > 0){
                            console.log("tskdata && tskdata.length>0")
                            taskMdl.taskHardwaredatafrservicenowmngrapprlMdl(req.body, req.user).then(function (tskHardwaredata) {
                                var data = {};
                                data['notes'] = null
                                data['tasks'] = [tskdata[0]];
                                var checklistData = {}
                                if(tskHardwaredata.length > 0){
                                    data['tasks'][0]['recordedHardware'] = tskHardwaredata
                                }
                                //console.log("tskdata[0].formID",tskdata[0].formID)
                                checklistData[tskdata[0].formID] = [tskdata[0].checklistData];
                                //console.log("checklistData",checklistData)
                                data['tasks'][0]['checklistData'] = checklistData;
                                console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
                                console.log("taskdatafrservicenowCtrl data.tasks.recordedHardware",data.tasks[0].recordedHardware)
                                console.log("taskdatafrservicenowCtrl data.tasks.checklistData",data.tasks[0]['checklistData'][tskdata[0].formID])
                                var options = {
                                    method: 'post',
                                    json: true,
                                    url: as.url_servicenow.processNotification.urlApi,
                                    headers: {
                                        'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                        'content-type': 'application/json'
                                    },
                                    data: null

								}
								options.data = data
                                console.log("options",options)
                                //console.log("options",options.body)
                                //console.log("options",testing)
                                taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                    //request(options, function (err, resp, body) {
                                    return axios(options).then((body) => {
                                        taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
											console.log("err,body",body.data)
											console.log("options",options)
											
											if( body.data ){
												let chckbody = JSON.stringify(body.data);
												if( !chckbody.includes('Error Page') ){
													if( body.data['result'].status=='success'){
														taskMdl.mngrapprvetaskMdl(req.body, req.user).then(function (results) {
															taskMdl.mngrapprvetasklogMdl(req.body, req.user).then(function (results) {
																df.formatSucessRes(req, res, results, cntxtDtls, '', {});
															}).catch(function (error) {
																console.log("error",error)
																df.formatErrorRes(req, res, error, cntxtDtls, '', {});
															});
														}).catch(function (error) {
															console.log("error",error)
															df.formatErrorRes(req, res, error, cntxtDtls, '', {});
														});  
													} else {
														df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
													}
												} else {
													df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
												}
											} else {
												df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
											}
										}).catch(function (error) {
                                            console.log("error 389", error);
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        });
									}).catch(function (error) {
                                            console.log("error 393", error);
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        });
								}).catch(function (error) {
                                            console.log("error 397", error);
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        });
                            }).catch(function (error) {
                                console.log("error",error)
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                        } else {
                            let error = 'No Tasks Found';
                            console.log("err",error)
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        }
                        
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
                }
                
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

// exports.updatetaskCtrl = (req, res) => {
	
// 	if(req.body.task_status != 224 && req.body.task_status != 227 ){
// 		taskMdl.childupatetaskdatafrservicenowMdl(req.body.task_id, req.body.task_status, req.body.task_id, req.user)
// 		.then(function (tskdata) {
//             console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length")
// 			if(tskdata && tskdata.length > 0){
// 			var data = {};
// 			data['notes'] = null
// 			data['tasks'] = [tskdata[0]];

// 			console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
// 			var options = {
// 				method: 'post',
// 				json: true,
// 				url: as.url_servicenow.processNotification.urlApi,
                // headers: {
                //     'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
// 					'content-type': 'application/json'
// 				},
// 				body: data,
// 			}
// 			console.log("options",options)
// 			//console.log("options",options.body)
// 			request(options, function (err, resp, body) {
// 				if( body && body['result'].status=='success'){
// 					taskMdl.updatetaskMdl(req.body, req.user)
// 						.then(function (results) {
// 							taskMdl.getcall_attend_byMdl(req.body, req.user)
// 								.then(function (results) {
// 									console.log(results,"resultsresultsresultsresultsresultsresultsresults")
// 									if(results.length > 0){
// 										let call_attend_by = results[0].call_attend_by
// 										req.body.call_attend_by = call_attend_by
// 									}
// 									taskMdl.updatetasklogsMdl(req.body, req.user)
// 										.then(function (results) {
// 											df.formatSucessRes(req, res, results, cntxtDtls, '', {});
// 										}).catch(function (error) {
// 											df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 										}); 
// 								}).catch(function (error) {
// 									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 								});   
// 						}).catch(function (error) {
// 							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 						});
// 				} else {
// 						df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
// 					}
// 				})
// 			} else {
// 				let error = 'No Tasks Found'
// 				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 			}
			
// 		}).catch(function (error) {
// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 		});
// 	} else if(req.body.task_status == 224) {
// 		taskMdl.taskdatafrservicenowmngrapprlMdl(req.body, req.user)
// 		.then(function (tskdata) {
//             console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length")
// 			if(tskdata && tskdata.length > 0){
// 			var data = {};
// 			data['notes'] = null
// 			data['tasks'] = [tskdata[0]];
// 			var checklistData = {}
// 			//console.log("tskdata[0].formID",tskdata[0].formID)
// 			checklistData[tskdata[0].formID] = [JSON.stringify(tskdata[0].checklistData)];
// 			//console.log("checklistData",checklistData)
// 			data['tasks'][0]['checklistData'] = checklistData;
// 			console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
// 			var options = {
// 				method: 'post',
// 				json: true,
// 				url: as.url_servicenow.processNotification.urlApi,
                // headers: {
                //     'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
// 					'content-type': 'application/json'
// 				},
// 				body: data,
// 			}
// 			console.log("options",options)
// 			//console.log("options",options.body)
// 			request(options, function (err, respnse, body) {
// 				if( body && body['result'].status=='success'){
// 					taskMdl.mngrapprvetaskMdl(req.body, req.user).then(function (results) {
// 						taskMdl.mngrapprvetasklogMdl(req.body, req.user).then(function (results) {
// 							df.formatSucessRes(req, res, results, cntxtDtls, '', {});
// 						}).catch(function (error) {
// 							console.log("error",error)
// 							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 						});
// 					}).catch(function (error) {
// 						console.log("error",error)
// 						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 					});  
// 				} else {
// 					df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
// 				}
// 			})
// 		} else {
// 			let error = 'No Tasks Found'
// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 		}
			
// 		}).catch(function (error) {
// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 		});
// 	} else {
// 		taskMdl.taskdatafrservicenowmngrapprlMdl(req.body, req.user)
// 		.then(function (tskdata) {
//             console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length in else part")
// 			if(tskdata && tskdata.length > 0){
// 				console.log("tskdata && tskdata.length>0")
// 				taskMdl.taskHardwaredatafrservicenowmngrapprlMdl(req.body, req.user).then(function (tskHardwaredata) {
// 					var data = {};
// 					data['notes'] = null
// 					data['tasks'] = [tskdata[0]];
// 					var checklistData = {}
// 					if(tskHardwaredata.length > 0){
// 						data['tasks'][0]['recordedHardware'] = tskHardwaredata
// 					}
// 					//console.log("tskdata[0].formID",tskdata[0].formID)
// 					checklistData[tskdata[0].formID] = [JSON.stringify(tskdata[0].checklistData)];
// 					//console.log("checklistData",checklistData)
// 					data['tasks'][0]['checklistData'] = checklistData;
// 					console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
// 					console.log("taskdatafrservicenowCtrl data.tasks.recordedHardware",data.tasks[0].recordedHardware)
// 					var options = {
// 						method: 'post',
// 						json: true,
// 						url: as.url_servicenow.processNotification.urlApi,
                        // headers: {
                        //     'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
// 							'content-type': 'application/json'
// 						},
// 						body: data,
// 					}
// 					console.log("options",options)
// 					//console.log("options",options.body)
// 					//console.log("options",testing)
// 					request(options, function (err, respnse, body) {
// 						if( body && body['result'].status=='success'){
// 							taskMdl.mngrapprvetaskMdl(req.body, req.user).then(function (results) {
// 								taskMdl.mngrapprvetasklogMdl(req.body, req.user).then(function (results) {
// 									df.formatSucessRes(req, res, results, cntxtDtls, '', {});
// 								}).catch(function (error) {
// 									console.log("error",error)
// 									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 								});
// 							}).catch(function (error) {
// 								console.log("error",error)
// 								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 							});  
// 						} else {
// 							df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
// 						}
// 					})
// 				}).catch(function (error) {
// 					console.log("error",error)
// 					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 				});
// 			} else {
// 				let error = 'No Tasks Found';
// 				console.log("err",error)
// 				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 			}
			
// 		}).catch(function (error) {
// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 		});
// 	}

// }
/**************************************************************************************
* Controller     : updatetask_mobile_Ctrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
* 28-04-2023 - Ramesh Patlola - service now api intigration
***************************************************************************************/
function toRad(Value) {
    return Value * Math.PI / 180;
}

exports.updatetask_mobile_Ctrl = (req, res) => {
    var fnm = `updatetask_mobile_Ctrl`
	let web_app = 2
    let task_update_res = res
    var dLat = 0
    var dLon = 0
    var lat1 = 0
    var lat2 = 0
    console.log(req.body,"req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body-----------req.body")
        taskMdl.is_user_in_travel_status_for_another_taskMdl(req.body, req.user)
        .then(function (results) {
            if(req.body.task_status == 220 && results.length > 0){
                console.log("In travel for another task so can not update")
                return df.formatErrorRes(req, task_update_res, results, cntxtDtls, '',  { error_status: "400", err_message: "Sorry, you have another task in travel status." });
            } else if (req.body.task_status == 226){
				taskMdl.prmyScndChckMdl(req.body, req.user).then(function (prmyScndChck) {	
					taskMdl.cmplttaskchckdatafrservicenowMdl(req.body, prmyScndChck[0].primary_flag, req.user).then(function (cmpltdata) {
						if(cmpltdata.length > 0){
							taskMdl.taskdatafrservicenowMdl(req.body, req.user).then(function (tskdata) {
								taskMdl.taskdatanotesfrservicenowMdl(req.body, req.user).then(function (tsknotesdata) {
									if(tskdata && tskdata.length > 0){
									var data = {};
									if(tsknotesdata.length == 0){
										data['notes'] = null
									} else {
										data['notes'] = tsknotesdata[0].note
									}
									data['tasks'] = [tskdata[0]];
									console.log("taskdatafrservicenowCtrl data",data)
									var options = {
										method: 'post',
										json: true,
										url: as.url_servicenow.processNotification.urlApi,
										headers: {
											'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
											'content-type': 'application/json'
										},
										data: null

									}
									options.data = data
									console.log("options",options)
									taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                        //request(options, function (err, resp, body) {
                                        return axios(options).then((body) => {
                                            taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
										console.log("err,res,body", body)
										console.log("options",options)
										//console.log("err,res,body",  body['result'].status)
										//console.log("err,res,body",err, body['result'].status=='success')
										
										if( body.data ){
											let chckbody = JSON.stringify(body.data);
											if( !chckbody.includes('Error Page') ){
												if( body.data['result'].status=='success'){
													
													taskMdl.gettrvldstnceMdl(req.body, req.user)
														.then(function (tskdstnce) {
															console.log("updatetask_mobile_Mdl ctrl tskdstnce", tskdstnce)
														taskMdl.updatetask_mobile_Mdl(req.body, req.user, tskdstnce)
														.then(function (results) {
															taskMdl.utilizationUserReduceCountMdl(req.user.emp_id ).then(function (utlztndata) {

																// taskMdl.gettaskticketsnamesMdl(req.body,req.user)
																// .then(function (task_details) {
																//     req.body.task_category = task_details[0].task_category
																	
																// const text = task_details[0].emp_username + ' task assigned to you is updated with Order Number : '+ task_details[0].service_no +'. Please refresh your task list.';
																	// taskMdl.insertnotifyMdl(req.body,task_details[0].service_no, req.user, text)
																	//     .then(function (ntfcn) {

																			
																			// const newtitle = 'taskUpdateNotification' ;
																			// let taskkind = 'task'
																			// var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
																			//     join employees as e on e.emp_id=t.call_attend_by where t.task_id = ${req.body.task_id} and e.sms_flag = 0 limit 1`;
																			
																		   //taskMdl.sendPushNotificationMdl(req.body, task_details[0].service_no , req.user,text,newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {
																				// taskMdl.taskupdatesmsnotitomngrMdl(req.body, req.user)
																				// .then(function (results_mngr) {
																				   
																				//         let mngr_mobile_no = results_mngr[0].emp_mobile
																					   
																				//             var data = {
																				//                 "mobileNo": mngr_mobile_no.toString(),
																				//                 "textMsg":`${task_details[0].emp_username} has completed the Task and Pending for approval whose task id ${task_details[0].task_no}, Title ${task_details[0].task_other_issue}, assignment id-${task_details[0].service_no} and the task Required Time-30 minutes`,
																				//             }
																				//             console.log("sms data",data)
																				//         var sms = {
																				//             method: 'post',
																				//             json: true,
																				//             url: as.url_servicenow.smsManagement.urlApi,
																				//             headers: {
																				//                 'Authorization': as.url_servicenow.smsManagement.headerDtls.Authorization,
																				//                 'content-type': 'application/json'
																				//             },
																				//             body : data,
																				//         }
																				//         console.log("only sms",sms)
																				//         request(sms, function (err, resp, body) {
																				//             console.log("body",body);
																				//             if( body && body['result'].status=='success'){
																				//                 //df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																							
																				//             } else {
																							
																				//             // df.formatErrorRes(req, res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to sent SMS." });
																				//             }
																				//         })
																				  



																				taskMdl.gettasklatlongMdl(req.body, req.user)
																				.then(function (results) {
																		
																				var R = 6371; // km
																	
																				console.log(results,"resultsresultsresults")
																				dLat = toRad(parseFloat(results[0].task_log_lat) - req.body.task_log_lat);
																				dLon = toRad(parseFloat(results[0].task_log_long) - req.body.task_log_long);
																				lat1 = toRad(req.body.task_log_lat);
																				lat2 = toRad(parseFloat(results[0].task_log_lat));
																				
																				console.log("dLat",dLat)
																				console.log("dLon",dLon)
																				console.log("lat1",lat1)
																				console.log("lat2",lat2)
																	
																				var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
																				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
																				var distance = R * c * 1000;
																				distance = distance.toFixed(0)
																				console.log("distance",distance)
																				req.body.distance = distance

																				//when primary field cancelled all sub_tickets field cancelled
																				if(req.body.task_status == 271 && req.body.primary_flag == 1){
																					let all_distances = []
																					console.log("in primary field cancelled code")
																					taskMdl.get_sub_tasks_Mdl(req.body, req.user).then(function (tasks) {
																						console.log(tasks,"taskstaskstaskstasks")
																						if(tasks.length > 0){
												
																								taskMdl.get_emp_gps_info_Mdl(tasks, req.user).then(function (emp_gps_info) {
																									let datafilter = function(index){
																									//for(let i = 0; i<tasks.length; i++){
																										dLat = toRad(parseFloat(tasks[0].task_latitude) - emp_gps_info[i][0].gps_lat);
																										dLon = toRad(parseFloat(tasks[0].task_longitude) - emp_gps_info[i][0].gps_lang);
																										lat1 = toRad(emp_gps_info[i][0].gps_lat);
																										lat2 = toRad(parseFloat(tasks[0].task_latitude));

																										console.log("dLat",dLat)
																										console.log("dLon",dLon)
																										console.log("lat1",lat1)
																										console.log("lat2",lat2)

																										var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
																										var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
																										var distance = R * c * 1000;
																										distance = distance.toFixed(0)
																										console.log("distance",distance)
																										all_distances.push(distance)
																										if(index == tasks.length - 1){
																											console.log("completed")
																										} else {
																											datafilter(index + 1)
																										}
																									}
																									datafilter(0)
																									
																									taskMdl.insert_into_task_logs_when_field_canceled(req.body,all_distances,tasks[0], emp_gps_info, req.user)
																									.then(function (results) {
																										
																									}).catch(function (error) {
																									df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																									});

																								}).catch(function (error) {
																									df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																								});
												
																						}
									
																					}).catch(function (error) {
																						df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																					});
																				}
											
																				taskMdl.updatetasklogsMdl(req.body, req.user)
																				.then(function (results) {
																					taskMdl.gettrvldstnceMdl(req.body, req.user)
																					.then(function (tskdstnce) {
																						taskMdl.updatetask_mobile_Mdl(req.body, req.user, tskdstnce).then(function (updttaskdata) {
																							taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																								//let casechck = (taskdatachck[0].task_no).substring(0, 2);
																								//if(casechck.toUpperCase() == 'CS' && req.body.task_status == 224){
																								if(req.body.task_status == 223){
																									var options = {
																										method: 'post',
																										json: true,
																										url: as.url_servicenow.processNotification.urlApi,
																										headers: {
																											'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																											'content-type': 'application/json'
																										},
																										data: null

																									}
																									options.data = data
																									taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
																												//request(options, function (err, resp, body) {
																												return axios(options).then((body) => {
																													taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
																												console.log("body",body.data)
																												console.log("options",options)
																												
																												if( body.data ){
																													let chckbody = JSON.stringify(body.data);
																													if( !chckbody.includes('Error Page') ){
																														if( body.data['result'].status=='success'){
																															var data = {};
																															data['task_status']=225;
																															data['task_id']=taskdatachck[0].task_id
																															data['parent_id']=taskdatachck[0].parent_id
																															data['call_attend_by'] = taskdatachck[0].call_attend_by
																															data['task_log_lat'] = req.body.task_log_lat
																															data['task_log_long'] = req.body.task_log_long
																															taskMdl.updatetask_mobile_Mdl(data, req.user, 'dst').then(function (updttaskdata) {
																																taskMdl.updatetasklogsMdl(data, req.user)
																																	.then(function (results) {
																																		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																																	}).catch(function (error) {
																																		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																																	});
																															// df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																															})
																														}else if( body.data['result'].status=='failure'){
																															var data = {};
																															data['task_status']=272;
																															data['parent_id']=taskdatachck[0].parent_id
																															data['task_id']=taskdatachck[0].task_id
																															data['call_attend_by'] = taskdatachck[0].call_attend_by
																															taskMdl.updatetask_mobile_Mdl(data, req.user, 'dst').then(function (updttaskdata) {
																																taskMdl.updatetasklogsMdl(data, req.user)
																																	.then(function (results) {
																																		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																																	}).catch(function (error) {
																																		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																																	});
																																// df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																															})
																														} else {
																															df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update UAT SUCCESS/FAIL to service now." });
																														}
																													} else {
																														df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update UAT SUCCESS/FAIL to service now." });
																													}
																												} else {
																													df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update UAT SUCCESS/FAIL to service now." });
																												}
																											}).catch(function (error) {
                                                                                                                        console.log("error ", error);
                                                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                                                                    });
																										}).catch(function (error) {
                                                                                                                        console.log("error ", error);
                                                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                                                                    });
																									}).catch(function (error) {
                                                                                                                        console.log("error ", error);
                                                                                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                                                                    });
																								} else {
																									df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																								}
																							}).catch(function (error) {
																								console.log("error",error)
																								df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																							});
																						}).catch(function (error) {
																							console.log("error",error)
																							df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																						});
																					}).catch(function (error) {
																						console.log("error",error)
																						df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																					});
																				}).catch(function (error) {
																					df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																				});  
											
																					
																				}).catch(function (error) {
																					df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																				});
																				

																				// }).catch(function (error) {
																				//     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																				// });
																				
																			//    })
			
																	// }).catch(function (error) {
																	//     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																	// });
																   
																// }).catch(function (error) {
																//     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																// });

														
																  
															})
														}).catch(function (error) {
															df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
														}); 
													}).catch(function (error) {
														df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
													});
												} else {
													df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
												}
										} else {
											df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
										}
										} else {
											df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
										}
									}).catch(function (error) {
										console.log("error 941",error)
														df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
													});
									}).catch(function (error) {
										console.log("error 945",error)
														df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
													});
									}).catch(function (error) {
										console.log("error 949",error)
														df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
													});
								} else {
									let error = 'No Tasks Found'
									df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
								}
									
								}).catch(function (error) {
									df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
								});   
							}).catch(function (error) {
								df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
							});
						} else {
							let error = 'Please Update the Record Hardware before Complete'
							df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', { error_status: "707", err_message: error })
						}
					}).catch(function (error) {
						df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
					});
				}).catch(function (error) {
					df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
				});
			} else if (req.body.task_status == 221 || req.body.task_status == 271) {
				//when primary field cancelled all sub_tickets field cancelled
                if (req.body.task_status == 271 && req.body.primary_flag == 1) {
                    // let all_distances = []
                    // console.log("in primary field cancelled code")
                    // taskMdl.get_sub_tasks_Mdl(req.body, req.user).then(function (tasks) {
                    //     console.log(tasks,"taskstaskstaskstasks")
                    //     if(tasks.length > 0){
                    //         taskMdl.childtaskdatafrutilizationMdl(req.body, tskdata[0]).then(function (utlztntskdata) { //01-07-23
                    //             taskMdl.utilizationReduceCountMdl(utlztntskdata[0].call_attnd ).then(function (utlztndata) { //01-07-23
                    //                 taskMdl.get_emp_gps_info_Mdl(tasks, req.user).then(function (emp_gps_info) {

                    //                     for(let i = 0; i<tasks.length; i++){
                    //                         dLat = toRad(parseFloat(tasks[0].task_latitude) - emp_gps_info[i][0].gps_lat);
                    //                         dLon = toRad(parseFloat(tasks[0].task_longitude) - emp_gps_info[i][0].gps_lang);
                    //                         lat1 = toRad(emp_gps_info[i][0].gps_lat);
                    //                         lat2 = toRad(parseFloat(tasks[0].task_latitude));

                    //                         console.log("dLat",dLat)
                    //                         console.log("dLon",dLon)
                    //                         console.log("lat1",lat1)
                    //                         console.log("lat2",lat2)

                    //                         var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
                    //                         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                    //                         var distance = R * c * 1000;
                    //                         distance = distance.toFixed(0)
                    //                         console.log("distance",distance)
                    //                         all_distances.push(distance)
                    //                     }

                    //                     taskMdl.insert_into_task_logs_when_field_canceled(req.body,all_distances,tasks, emp_gps_info, req.user)
                    //                     .then(function (results) {

                    //                     }).catch(function (error) {
                    //                     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                    //                     });

                    //                 }).catch(function (error) {
                    //                     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                    //                 });
                    //             })
                    //         })

                    //     }

                    // }).catch(function (error) {
                    //     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                    // });

                    taskMdl.arethere_secondary_Mdl(req.body, req.user)
                        .then(function (results) {
                            console.log("arethere_secondary_Mdl")
                            if (results.length > 0) {
                                taskMdl.getnew_primary_Mdl(req.body, req.user)
                                    .then(function (new_primary) {
                                        console.log("getnew_primary_Mdl")
                                        taskMdl.childtaskdatafrservicenow_for_secondary_to_primary_Mdl(req.body, new_primary[0].parent_id, new_primary[0].task_id, new_primary[0].task_status, new_primary[0].service_no, req.user)
                                            .then(function (tskdata) {
                                                console.log(tskdata, "tskdatatskdatatskdatatskdata")
                                                if (tskdata && tskdata.length > 0) {
                                                    console.log("childtaskdatafrservicenow_for_field_cancelled_Mdl")
                                                    var data = {};
                                                    data['notes'] = null
                                                    data['tasks'] = [tskdata[0]];
                                                    console.log("taskdatafrservicenowCtrl data", data)
                                                    var options = {
                                                        method: 'post',
                                                        json: true,
                                                        url: as.url_servicenow.processNotification.urlApi,
                                                        headers: {
                                                            'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                                            'content-type': 'application/json'
                                                        },
                                                        data: null

                                                    }
                                                    options.data = data
                                                    console.log("options", options)
                                                    //request(options, function (err, resp, body) {
                                                    return axios(options).then((body) => {



                                                        if (body.data['result'].status == 'success') {
                                                            // taskMdl.make_secondary_to_primaryMdl(req.body,req.user)
                                                            // .then(function (results) {
                                                            console.log("make_secondary_to_primaryMdl")
                                                            if (results.length > 0) {
                                                                taskMdl.make_secondaryid_to_primaryidMdl(req.body, new_primary[0], req.user)
                                                                    .then(function (results) {
                                                                        setTimeout(() => {
                                                                            fieldCanceledDataTransferToServiceNow();
                                                                        }, 1000)

                                                                        // taskMdl.childtaskdatafrservicenow_for_old_primary_field_cancel_Mdl(req.body,req.user)
                                                                        //     .then(function (results) {
                                                                        //         if(tskdata && tskdata.length > 0){
                                                                        //             console.log("childtaskdatafrservicenow_for_field_cancelled_Mdl")
                                                                        //             var data = {};
                                                                        //             data['notes'] = null
                                                                        //             data['tasks'] = [tskdata[0]];
                                                                        //             console.log("taskdatafrservicenowCtrl data",data)
                                                                        //             var options = {
                                                                        //                 method: 'post',
                                                                        //                 json: true,
                                                                        //                 url: as.url_servicenow.processNotification.urlApi,
                                                                        //                        headers: {
                                                                        //                            'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                                                        //                     'content-type': 'application/json'
                                                                        //                 },
                                                                        //                 body: data,
                                                                        //             }
                                                                        //             console.log("options",options)
                                                                        //             request(options, function (err, resp, body) { 
                                                                        //                 
                                                                        //                 
                                                                        //                 
                                                                        //                 if(body.data['result'].status=='success'){
                                                                        //                     console.log("successfully changed old primary status in service now")
                                                                        //                 }
                                                                        //             })
                                                                        //         }

                                                                        //     }).catch(function (error) {
                                                                        //         df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                        //     });

                                                                    }).catch(function (error) {
                                                                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                    });
                                                            }
                                                            // }).catch(function (error) {
                                                            //     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                            // });

                                                        }
                                                    }).catch(function (error) {
                                                        console.log("error 1111", error);
                                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                    });
                                                }
                                            }).catch(function (error) {
                                                df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                            });
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                    })
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                        });


                }  //when primary field cancelled all sub_tickets field cancelled if block ends

                if ((req.body.task_status == 271 && req.body.primary_flag != 1) || req.body.task_status == 221) {
                    console.log(req.body.primary_flag, "no neeeeed too dealayyyyyyyyyyyyy")
                    fieldCanceledDataTransferToServiceNow()
                }

                function fieldCanceledDataTransferToServiceNow() {
                    taskMdl.taskdatafrservicenowMdl(req.body, req.user).then(function (tskdata) {
                        taskMdl.taskdatanotesfrservicenowMdl(req.body, req.user).then(function (tsknotesdata) {
                            if (tskdata && tskdata.length > 0) {
                                var data = {};
                                if (tsknotesdata.length == 0) {
                                    data['notes'] = null
                                } else {
                                    data['notes'] = tsknotesdata[0].note
                                }
                                data['tasks'] = [tskdata[0]];
                                console.log("taskdatafrservicenowCtrl data", data)
                                var options = {
                                    method: 'post',
                                    json: true,
                                    url: as.url_servicenow.processNotification.urlApi,
                                    headers: {
                                        'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                        'content-type': 'application/json'
                                    },
                                    data: null

                                }
                                options.data = data
                                console.log("options", options)
                                taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function (apicallinsrt) {
                                    //request(options, function (err, resp, body) {
                                    return axios(options).then((body) => {
                                        taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, body, req.user).then(function (updtapicall) {



                                            if (body.data['result'].status == 'success') {

                                                //taskMdl.gettrvldstnceMdl(req.body, req.user).then(function (tskdstnce) {
                                                //console.log("updatetask_mobile_Mdl ctrl tskdstnce", tskdstnce)
                                                //taskMdl.updatetask_mobile_Mdl(req.body, req.user, tskdstnce).then(function (results) {

                                                taskMdl.gettasklatlongMdl(req.body, req.user)
                                                    .then(function (results) {

                                                        var R = 6371; // km

                                                        console.log(results, "resultsresultsresults")
                                                        dLat = toRad(parseFloat(results[0].task_log_lat) - req.body.task_log_lat);
                                                        dLon = toRad(parseFloat(results[0].task_log_long) - req.body.task_log_long);
                                                        lat1 = toRad(req.body.task_log_lat);
                                                        lat2 = toRad(parseFloat(results[0].task_log_lat));

                                                        console.log("dLat", dLat)
                                                        console.log("dLon", dLon)
                                                        console.log("lat1", lat1)
                                                        console.log("lat2", lat2)

                                                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                                                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                                        var distance = R * c * 1000;
                                                        distance = distance.toFixed(0)
                                                        console.log("distance", distance)
                                                        req.body.distance = distance

                                                        taskMdl.updatetasklogsMdl(req.body, req.user)
                                                            .then(function (results) {
                                                                taskMdl.gettrvldstnceMdl(req.body, req.user)
                                                                    .then(function (tskdstnce) {
                                                                        taskMdl.childtaskriggerdatafrutilizationMdl(req.body, tskdata[0]).then(function (utlztntskdata) { //01-07-23
                                                                            taskMdl.utilizationReduceCountMdl(utlztntskdata[0].call_attnd).then(function (utlztndata) {
                                                                                let distance = 0;

                                                                                // taskMdl.gettaskticketsnamesMdl(req.body,req.user)
                                                                                // .then(function (task_details) {
                                                                                //   req.body.task_category = task_details[0].task_category
                                                                                //   const text = task_details[0].emp_username + ' task assigned to you is updated with Order Number : ' + task_details[0].service_no + '. Please refresh your task list.';
                                                                                // taskMdl.insertnotifyMdl(req.body,task_details[0].service_no, req.user,text)
                                                                                // .then(function (ntfcn) {


                                                                                // const newtitle = 'taskUpdateNotification' ;
                                                                                // let taskkind = 'task'
                                                                                // var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
                                                                                //     join employees as e on e.emp_id=t.call_attend_by where t.task_id = ${req.body.task_id}  limit 1`;

                                                                                // taskMdl.sendPushNotificationMdl(req.body, task_details[0].service_no , req.user,text,newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, body) {
                                                                                if (tskdstnce.length == 2) {

                                                                                    if (tskdstnce[0].lat_long != null && tskdstnce[1].lat_long != null && tskdstnce[0].lat_long != '' && tskdstnce[1].lat_long != ''
                                                                                        && tskdstnce[0].lat_long != undefined && tskdstnce[1].lat_long != undefined) {
                                                                                        //let api_key = 'AIzaSyAlx1eb-uGbDhFP6rvEjhoSzeYuzTKSfm0';
                                                                                        let api_key = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs';
                                                                                        let origin = tskdstnce[0].lat_long;
                                                                                        let destination = tskdstnce[1].lat_long;
                                                                                        var options = {
                                                                                            method: 'get',
                                                                                            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`,
                                                                                            headers: {}
                                                                                        };
                                                                                        console.log("options", options)
                                                                                        //request(options, function (err, resp, body) {
                                                                                        return axios(options).then((body) => {
                                                                                            console.log("err,data", body.data)

                                                                                            if (body.data) {
                                                                                                if (body.data["status"] == "OK") {
                                                                                                    //var body = JSON.parse(body.data)
                                                                                                    if (body.data["rows"][0]["elements"][0]["distance"]) {
                                                                                                        if (body.data["rows"][0]["elements"][0]["distance"]["value"]) {
                                                                                                            console.log("distance value", body.data["rows"][0]["elements"][0]["distance"]["value"]);
                                                                                                            distance = parseFloat(body.data["rows"][0]["elements"][0]["distance"]["value"]);
																											taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																												taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																													df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																												}).catch(function (error) {
																													console.log("error 1249", error)
																													df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																												});
																											}).catch(function (error) {
																												console.log("error 1253", error)
																												df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																											});
                                                                                                        } else {
																											taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																												taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																													df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																												}).catch(function (error) {
																													console.log("error 1249", error)
																													df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																												});
																											}).catch(function (error) {
																												console.log("error 1253", error)
																												df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																											});
																										}
                                                                                                    } else {
																										taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																											taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																												df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																											}).catch(function (error) {
																												console.log("error 1249", error)
																												df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																											});
																										}).catch(function (error) {
																											console.log("error 1253", error)
																											df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																										});
																									}
                                                                                                } else {
																									taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																										taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																											df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																										}).catch(function (error) {
																											console.log("error 1249", error)
																											df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																										});
																									}).catch(function (error) {
																										console.log("error 1253", error)
																										df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																									});
																								}
                                                                                            } else {
																								taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																									taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																										df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																									}).catch(function (error) {
																										console.log("error 1249", error)
																										df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																									});
																								}).catch(function (error) {
																									console.log("error 1253", error)
																									df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																								});
																							}
                                                                                        }).catch(function (error) {
                                                                                            console.log("error 1257", error);
                                                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                                        });
                                                                                    } else {
                                                                                        taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
                                                                                            taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
                                                                                                df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
                                                                                            }).catch(function (error) {
                                                                                                console.log("error", error)
                                                                                                df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                                            });
                                                                                        }).catch(function (error) {
                                                                                            console.log("error", error)
                                                                                            df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                                        });
                                                                                    }

                                                                                } else {
                                                                                    taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
                                                                                        taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
                                                                                            df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
                                                                                        }).catch(function (error) {
                                                                                            console.log("error", error)
                                                                                            df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                                        });
                                                                                    }).catch(function (error) {
                                                                                        console.log("error", error)
                                                                                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                                    });
                                                                                }

                                                                                // })
                                                                                // }).catch(function (error) {
                                                                                //     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                                // });
                                                                                // }).catch(function (error) {
                                                                                //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                                                // });

                                                                            })
                                                                        })
                                                                    }).catch(function (error) {
                                                                        console.log("error", error)
                                                                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                                    });
                                                            }).catch(function (error) {
                                                                df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                            });


                                                    }).catch(function (error) {
                                                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                    });

                                                // }).catch(function (error) {
                                                //df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                // }); 
                                                //}).catch(function (error) {
                                                //df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                                                //});
                                            } else {
                                                df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Sorry, failed to Update service now." });
                                            }
                                        })
                                    }).catch(function (error) {
                                        console.log("error 1231", error);
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    });
                                })
                            } else {
                                let error = 'No Tasks Found'
                                df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                            }

                        }).catch(function (error) {
                            df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                        });
                    }).catch(function (error) {
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    });
                }
                /*taskMdl.taskdatafrservicenowMdl(req.body, req.user).then(function (tskdata) {
                    taskMdl.taskdatanotesfrservicenowMdl(req.body, req.user).then(function (tsknotesdata) {
                        if(tskdata && tskdata.length > 0){
                        var data = {};
                        if(tsknotesdata.length == 0){
                            data['notes'] = null
                        } else {
                            data['notes'] = tsknotesdata[0].note
                        }
                        data['tasks'] = [tskdata[0]];
                        console.log("taskdatafrservicenowCtrl data",data)
                         var options = {
                            method: 'post',
                            json: true,
                            url: as.url_servicenow.processNotification.urlApi,
                            headers: {
                                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                'content-type': 'application/json'
                            },
                            body: data,
                        }
                        console.log("options",options)
                        taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
							request(options, function (err, resp, body) {
								taskMdl.updateapicalldtlsMdl(body, apicallinsrt.insertId, req.user, resp).then(function(updtapicall){
									console.log("err,res,body", body)
									//console.log("err,res,body",  body['result'].status)
									//console.log("err,res,body",err, body['result'].status=='success')
									
									if( body ){
										let chckbody = JSON.stringify(body);
										if( !chckbody.includes('Error Page') ){
											if( body && body['result'].status=='success'){
												
												//taskMdl.gettrvldstnceMdl(req.body, req.user).then(function (tskdstnce) {
														//console.log("updatetask_mobile_Mdl ctrl tskdstnce", tskdstnce)
													//taskMdl.updatetask_mobile_Mdl(req.body, req.user, tskdstnce).then(function (results) {
													   
															taskMdl.gettasklatlongMdl(req.body, req.user)
															.then(function (results) {
															 
																	var R = 6371; // km
														   
																	console.log(results,"resultsresultsresults")
																	dLat = toRad(parseFloat(results[0].task_log_lat) - req.body.task_log_lat);
																	dLon = toRad(parseFloat(results[0].task_log_long) - req.body.task_log_long);
																	lat1 = toRad(req.body.task_log_lat);
																	lat2 = toRad(parseFloat(results[0].task_log_lat));
																	
																	console.log("dLat",dLat)
																	console.log("dLon",dLon)
																	console.log("lat1",lat1)
																	console.log("lat2",lat2)
														   
																	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
																	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
																	var distance = R * c * 1000;
																	distance = distance.toFixed(0)
																	console.log("distance",distance)
																	req.body.distance = distance

																	//when primary field cancelled all sub_tickets field cancelled
																	if(req.body.task_status == 271 && req.body.primary_flag == 1){
																		let all_distances = []
																		console.log("in primary field cancelled code")
																		taskMdl.get_sub_tasks_Mdl(req.body, req.user).then(function (tasks) {
																			console.log(tasks,"taskstaskstaskstasks")
																			if(tasks.length > 0){
																				taskMdl.childtaskdatafrutilizationMdl(req.body, tskdata[0]).then(function (utlztntskdata) { //01-07-23
																					taskMdl.utilizationReduceCountMdl(utlztntskdata[0].call_attnd ).then(function (utlztndata) { //01-07-23
																						taskMdl.get_emp_gps_info_Mdl(tasks, req.user).then(function (emp_gps_info) {

																							for(let i = 0; i<tasks.length; i++){
																								dLat = toRad(parseFloat(tasks[0].task_latitude) - emp_gps_info[i][0].gps_lat);
																								dLon = toRad(parseFloat(tasks[0].task_longitude) - emp_gps_info[i][0].gps_lang);
																								lat1 = toRad(emp_gps_info[i][0].gps_lat);
																								lat2 = toRad(parseFloat(tasks[0].task_latitude));

																								console.log("dLat",dLat)
																								console.log("dLon",dLon)
																								console.log("lat1",lat1)
																								console.log("lat2",lat2)

																								var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
																								var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
																								var distance = R * c * 1000;
																								distance = distance.toFixed(0)
																								console.log("distance",distance)
																								all_distances.push(distance)
																							}
																							
																							taskMdl.insert_into_task_logs_when_field_canceled(req.body,all_distances,tasks, emp_gps_info, req.user)
																							.then(function (results) {
																								
																							}).catch(function (error) {
																							df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																							});

																						}).catch(function (error) {
																							df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																						});
																					})
																				})
									
																			}
						
																		}).catch(function (error) {
																			df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																		});
																	}
								
																	taskMdl.updatetasklogsMdl(req.body, req.user)
																	.then(function (results) {
																		taskMdl.gettrvldstnceMdl(req.body, req.user)
																		.then(function (tskdstnce) {
																			taskMdl.childtaskriggerdatafrutilizationMdl(req.body, tskdata[0]).then(function (utlztntskdata) { //01-07-23
																				taskMdl.utilizationReduceCountMdl(utlztntskdata[0].call_attnd ).then(function (utlztndata) {
																					let distance = 0;

																					// taskMdl.gettaskticketsnamesMdl(req.body,req.user)
																					// .then(function (task_details) {
																					//    req.body.task_category = task_details[0].task_category
																					//    const text = task_details[0].emp_username + ' task assigned to you is updated with Order Number : ' + task_details[0].service_no + '. Please refresh your task list.';
																						// taskMdl.insertnotifyMdl(req.body,task_details[0].service_no, req.user,text)
																						// .then(function (ntfcn) {
																							
														 
																							//const newtitle = 'taskUpdateNotification' ;
																						   // let taskkind = 'task'
																						   // var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
																							//   join employees as e on e.emp_id=t.call_attend_by where t.task_id = ${req.body.task_id} and e.sms_flag = 0 limit 1`;
														
																								//taskMdl.sendPushNotificationMdl(req.body, task_details[0].service_no , req.user,text,newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {
																									if(tskdstnce.length == 2 ){

																										if(tskdstnce[0].lat_long != null && tskdstnce[1].lat_long != null && tskdstnce[0].lat_long != '' && tskdstnce[1].lat_long != ''
																											&& tskdstnce[0].lat_long != undefined && tskdstnce[1].lat_long != undefined){
																											//let api_key = 'AIzaSyAlx1eb-uGbDhFP6rvEjhoSzeYuzTKSfm0';
																											let api_key = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs';
																											let origin = tskdstnce[0].lat_long;
																											let destination = tskdstnce[1].lat_long;
																												var config = {
																												  method: 'get',
																												  url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`,
																												  headers: { }
																												};
																												console.log("config",config)
																											request(config, function (err, resp, data) {
																												console.log("err,data",err,data)
																												var body = JSON.parse(data)
																												if(body["status"] == "OK"){
																													console.log("distance",body["rows"][0]["elements"])
																													if(body["rows"][0]["elements"][0]["distance"]){
																														if(body["rows"][0]["elements"][0]["distance"]["value"]){
																															console.log("distance value",body["rows"][0]["elements"][0]["distance"]["value"]);
																															distance = parseFloat(body["rows"][0]["elements"][0]["distance"]["value"]);
																														}
																													}
																													
																													
																												}
																												taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																													taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																														df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																													}).catch(function (error) {
																														console.log("error",error)
																														df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																													});
																												}).catch(function (error) {
																													console.log("error",error)
																													df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																												});
																											})
																										} else {
																											taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																												taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																													df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																												}).catch(function (error) {
																													console.log("error",error)
																													df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																												});
																											}).catch(function (error) {
																												console.log("error",error)
																												df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																											});
																										}
																										
																									} else {
																										taskMdl.updatetask_distance_mobile_Mdl(req.body, req.user, distance).then(function (updttaskdata) {
																												taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																													df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																												}).catch(function (error) {
																													console.log("error",error)
																													df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																												});
																											}).catch(function (error) {
																												console.log("error",error)
																												df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																											});
																									}
																									
																								//})
																							// }).catch(function (error) {
																							//     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																							// });
																					// }).catch(function (error) {
																					//     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																					// });
								
																				})
																			})
																		}).catch(function (error) {
																			console.log("error",error)
																			df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																		});
																	}).catch(function (error) {
																		df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																	});  
								
																
															}).catch(function (error) {
																df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
															});  
												
												   // }).catch(function (error) {
														//df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
												   // }); 
												//}).catch(function (error) {
													//df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
												//});
											} else {
												df.formatErrorRes(req, task_update_res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
											}
										} else {
											df.formatErrorRes(req, task_update_res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
										}
									} else {
										df.formatErrorRes(req, task_update_res, body, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
									}
								})
							})
						})
                    } else {
                        let error = 'No Tasks Found'
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                    }
                        
                    }).catch(function (error) {
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    });   
                    }).catch(function (error) {
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    });*/

            } else{
                taskMdl.taskdatafrservicenowMdl(req.body, req.user).then(function (tskdata) {
                    taskMdl.taskdatanotesfrservicenowMdl(req.body, req.user).then(function (tsknotesdata) {
                        if(tskdata && tskdata.length > 0){
                        var data = {};
                        if(tsknotesdata.length == 0){
                            data['notes'] = null
                        } else {
                            data['notes'] = tsknotesdata[0].note
                        }
                        data['tasks'] = [tskdata[0]];
                        console.log("taskdatafrservicenowCtrl data",data)
                        var options = {
                            method: 'post',
                            json: true,
                            url: as.url_servicenow.processNotification.urlApi,
                            headers: {
                                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                                'content-type': 'application/json'
                            },
                            data: null

                            }
                            options.data = data
                        console.log("options",options)
                        taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
							//request(options, function (err, resp, body) {
							return axios(options).then((body) => {
								console.log("options",options) 
									console.log("err,res,body", body.data)
								taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
									console.log("options",options) 
									console.log("err,res,body", body.data)
									//console.log("err,res,body",  body['result'].status)
									//console.log("err,res,body",err, body['result'].status=='success')
									
									if( body.data ){
										let chckbody = JSON.stringify(body.data);
										if( !chckbody.includes('Error Page') ){
											if(body.data['result'].status=='success'){
											taskMdl.gettrvldstnceMdl(req.body, req.user)
												.then(function (tskdstnce) {
													console.log("updatetask_mobile_Mdl ctrl tskdstnce", tskdstnce)
												taskMdl.updatetask_mobile_Mdl(req.body, req.user, tskdstnce)
												.then(function (results) {


													// taskMdl.gettaskticketsnamesMdl(req.body,req.user)
													// .then(function (task_details) {
														// req.body.task_category = task_details[0].task_category
														// const text = task_details[0].emp_username + ' task assigned to you is updated with Order Number : ' + task_details[0].service_no + '. Please refresh your task list.';
														// taskMdl.insertnotifyMdl(req.body,task_details[0].service_no, req.user,text)
														// .then(function (ntfcn) {
														   
						 
															// const newtitle = 'taskUpdateNotification' ;
															// let taskkind = 'task'
															// var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
															//     join employees as e on e.emp_id=t.call_attend_by where t.task_id = ${req.body.task_id} and e.sms_flag = 0 limit 1`;
						
																//taskMdl.sendPushNotificationMdl(req.body, task_details[0].service_no , req.user,text,newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {

																	taskMdl.gettasklatlongMdl(req.body, req.user)
																	.then(function (results) {
																	 
																			var R = 6371; // km
																   
																			console.log(results,"resultsresultsresults")
																			dLat = toRad(parseFloat(results[0].task_log_lat) - req.body.task_log_lat);
																			dLon = toRad(parseFloat(results[0].task_log_long) - req.body.task_log_long);
																			lat1 = toRad(req.body.task_log_lat);
																			lat2 = toRad(parseFloat(results[0].task_log_lat));
																			
																			console.log("dLat",dLat)
																			console.log("dLon",dLon)
																			console.log("lat1",lat1)
																			console.log("lat2",lat2)
																   
																			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
																			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
																			var distance = R * c * 1000;
																			distance = distance.toFixed(0)
																			console.log("distance",distance)
																			req.body.distance = distance
						
																			//when primary field cancelled all sub_tickets field cancelled
																			if(req.body.task_status == 271 && req.body.primary_flag == 1){
																				let all_distances = []
																				console.log("in primary field cancelled code")
																				taskMdl.get_sub_tasks_Mdl(req.body, req.user).then(function (tasks) {
																					console.log(tasks,"taskstaskstaskstasks")
																					if(tasks.length > 0){
											
																							taskMdl.get_emp_gps_info_Mdl(tasks, req.user).then(function (emp_gps_info) {
						
																								//for(let i = 0; i<tasks.length; i++){
																								let datafilter = function(index){
																									dLat = toRad(parseFloat(tasks[0].task_latitude) - emp_gps_info[i][0].gps_lat);
																									dLon = toRad(parseFloat(tasks[0].task_longitude) - emp_gps_info[i][0].gps_lang);
																									lat1 = toRad(emp_gps_info[i][0].gps_lat);
																									lat2 = toRad(parseFloat(tasks[0].task_latitude));
						
																									console.log("dLat",dLat)
																									console.log("dLon",dLon)
																									console.log("lat1",lat1)
																									console.log("lat2",lat2)
						
																									var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
																									var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
																									var distance = R * c * 1000;
																									distance = distance.toFixed(0)
																									console.log("distance",distance)
																									all_distances.push(distance)
																									if(index == tasks.length - 1){
																										console.log("completed")
																									} else {
																										datafilter(index + 1)
																									}
																								}
																								datafilter(0)
																								
																								taskMdl.insert_into_task_logs_when_field_canceled(req.body,all_distances,tasks, emp_gps_info, req.user)
																								.then(function (results) {
																									
																								}).catch(function (error) {
																								df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																								});
						
																							}).catch(function (error) {
																								df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																							});
											
																					}
								
																				}).catch(function (error) {
																					df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																				});
																			}
										
																			//to make secondary user to primary when primary field cancelled after ackwnoledged
																			if(req.body.oldtaskstatus > 217 && req.body.task_status == 271){
																			     taskMdl.arethere_secondary_Mdl(req.body, req.user)
																			         .then(function (results) {
																			             console.log("arethere_secondary_Mdl")
																			             if(results.length > 0){
																			                taskMdl.getnew_primary_Mdl(req.body,req.user)
																			                     .then(function (new_primary) {
																			                         console.log("getnew_primary_Mdl")
																			                         taskMdl.childtaskdatafrservicenow_for_secondary_to_primary_Mdl(req.body, new_primary[0].parent_id, new_primary[0].task_id, new_primary[0].task_status, new_primary[0].service_no, req.user)
																			                        .then(function (tskdata) {
																			                            console.log(tskdata,"tskdatatskdatatskdatatskdata")
																			                        if(tskdata && tskdata.length > 0){
																			                            console.log("childtaskdatafrservicenow_for_field_cancelled_Mdl")
																			                            var data = {};
																			                             data['notes'] = null
																			                            data['tasks'] = [tskdata[0]];
																			                             console.log("taskdatafrservicenowCtrl data",data)
																			                            var options = {
																			                                method: 'post',
																			                                json: true,
																			                                 url: as.url_servicenow.processNotification.urlApi,
																												 headers: {
																												    'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																			                                    'content-type': 'application/json'
																			                                 },
																											 data: null
																				 
																											 }
																											 options.data = data
																			                            console.log("options",options)
																			                            //request(options, function (err, resp, body) { 
																										return axios(options).then((body) => {
																			                                console.log("err,res,body", body.data)
																			                                 console.log("err,res,body",  body.data['result'].status)
																			                                if( body.data && body.data['result'].status=='success'){
																			                                    taskMdl.make_secondary_to_primaryMdl(req.body,req.user)
																			                                    .then(function (results) {
																			                                        console.log("make_secondary_to_primaryMdl")
																			                                         if(results.length > 0){
																			                                             taskMdl.make_secondaryid_to_primaryidMdl(req.body, new_primary[0], req.user)
																			                                             .then(function (results) {
																			                                                 taskMdl.childtaskdatafrservicenow_for_old_primary_field_cancel_Mdl(req.body,req.user)
																			                                     .then(function (results) {
																			                                                       if(tskdata && tskdata.length > 0){
																			                                                           console.log("childtaskdatafrservicenow_for_field_cancelled_Mdl")
																			                                                        var data = {};
																			                                                          data['notes'] = null
																			                                                          data['tasks'] = [tskdata[0]];
																			                                                           console.log("taskdatafrservicenowCtrl data",data)
																			                                                         var options = {
																			                                                                method: 'post',
																			                                                                 json: true,
																			                                                                  url: as.url_servicenow.processNotification.urlApi,
																																					 headers: {
																																					     'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																			                                                                      'content-type': 'application/json'
																			                                                                  },
																																			  data: null
																												  
																																			  }
																																			  options.data = data
																			                                                              console.log("options",options)
																			                                                              //request(options, function (err, resp, body) { 
																																		return axios(options).then((body) => {
																			                                                                  console.log("err,res,body", body.data)
																			                                                                  console.log("err,res,body",  body.data['result'].status)
																			                                                                  console.log("err,res,body", body.data['result'].status=='success')
																			                                                                  if( body.data && body.data['result'].status=='success'){
																			                                                                      console.log("successfully changed old primary status in service now")
																			                                                                  }
																			                                                              }).catch(function (error) {
																																			console.log("error 227", error);
																																			df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
																																		});
																			                                                          }
																																	
																			                                                      }).catch(function (error) {
																			                                                          df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																			                                                      });
																															
																			                                             }).catch(function (error) {
																			                                                 df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																			                                             });
																			                                         }
																			                                     }).catch(function (error) {
																			                                         df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																			                                     });
																												
																			                                 }
																			                             }).catch(function (error) {
																											console.log("error 227", error);
																											df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
																										});
																			                         }
																			                     }).catch(function (error) {
																			                         df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																			                     });
																			                 }).catch(function (error) {
																			                 df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																			                })
																			             }
																			         }).catch(function (error) {
																			             df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																			         });
																			 }
										
																			taskMdl.updatetasklogsMdl(req.body, req.user)
																			.then(function (results) {
																				taskMdl.gettrvldstnceMdl(req.body, req.user)
																				.then(function (tskdstnce) {
																					taskMdl.updatetask_mobile_Mdl(req.body, req.user, tskdstnce).then(function (updttaskdata) {
																						taskMdl.chcklisttaskcallbyinsrtMdl(req.body, req.user).then(function (taskdatachck) {
																							//let casechck = taskdatachck[0].taskno;
																							//if(casechck.toUpperCase() == 'CS' && req.body.task_status == 224){ //commented on 15-06-23
																							if( req.body.task_status == 223){
																								var options = {
																									method: 'post',
																									json: true,
																									url: as.url_servicenow.getLinkStatusbyCase.urlApi,
																									headers: {
																										'Authorization': as.url_servicenow.getLinkStatusbyCase.headerDtls.Authorization,
																										'content-type': 'application/json'
																									},
																									data: null

																								}
																								options.data = {
																									"caseNumber": taskdatachck[0].taskno,
																									"LGTaskId": taskdatachck[0].service_no
																								}
																								taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
																									//request(options, function (err, resp, body) {
																									return axios(options).then((body) => {
																										taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
																											console.log("options",options)
																											console.log("body",body.data)
																											
																											if(body.data ){
																												let chckbody = JSON.stringify(body.data);
																												if(!chckbody.includes('Error Page') ){
																													if(body.data && body.data['result'].status=='success'){
																														var data = {};
																														data['task_status']=225;
																														data['parent_id']=taskdatachck[0].parent_id
																														data['task_id']=taskdatachck[0].task_id
																														data['call_attend_by'] = taskdatachck[0].call_attend_by
																														data['task_log_lat'] = req.body.task_log_lat
																														data['task_log_long'] = req.body.task_log_long
																														taskMdl.updatetask_mobile_Mdl(data, req.user, 'dst').then(function (updttaskdata) {
																															taskMdl.updatetasklogsMdl(data, req.user)
																																.then(function (results) {
																																	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																																}).catch(function (error) {
																																	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																																});
																														   // df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																														})
																													}else if( body.data && body.data['result'].status=='failure'){
																														var data = {};
																														data['task_status']=272;
																														data['parent_id']=taskdatachck[0].parent_id
																														data['task_id']=taskdatachck[0].task_id
																														data['call_attend_by'] = taskdatachck[0].call_attend_by
																														taskMdl.updatetask_mobile_Mdl(data, req.user, 'dst').then(function (updttaskdata) {
																															taskMdl.updatetasklogsMdl(data, req.user)
																																.then(function (results) {
																																	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																																}).catch(function (error) {
																																	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																																});
																															// df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																														})
																													} else {
																														df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update UAT SUCCESS/FAIL to service now." });
																													}
																												} else {
																													df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update UAT SUCCESS/FAIL to service now." });
																												}
																											} else {
																												df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update UAT SUCCESS/FAIL to service now." });
																											}
																										})
																									}).catch(function (error) {
																										console.log("error 1970", error);
																										df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
																									});
																							})
																							} else {
																								df.formatSucessRes(req, task_update_res, results, cntxtDtls, '', {});
																							}
																						}).catch(function (error) {
																							console.log("error",error)
																							df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																						});
																					}).catch(function (error) {
																						console.log("error",error)
																						df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																					});
																				}).catch(function (error) {
																					console.log("error",error)
																					df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																				});
																			}).catch(function (error) {
																				df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																			});  
										
																		
																	}).catch(function (error) {
																		df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
																	}); 

																	
																//})
															// }).catch(function (error) {
															//     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
															// });
													// }).catch(function (error) {
													//     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
													// }); 
											
												}).catch(function (error) {
													df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
												}); 
											}).catch(function (error) {
												df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
											});
											} else {
												df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
											}
										} else {
											df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
										}
									} else {
										df.formatErrorRes(req, task_update_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
									}
								}).catch(function (error) {
									console.log("error 1952",error)
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    }); 
							}).catch(function (error) {
								console.log("error 1956",error)
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    }); 
						}).catch(function (error) {
							console.log("error 1960",error)
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    }); 
                    } else {
                        let error = 'No Tasks Found'
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                    }
                        
                    }).catch(function (error) {
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    });   
                    }).catch(function (error) {
                        df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {})
                    });

            }
        }).catch(function (error) {
            df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
        });


}
/**************************************************************************************
* Controller     : gettasklistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklistCtrl = (req, res) => {
	
	taskMdl.gettasklistMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});

}
/**************************************************************************************
* Controller     : gettaskbyidCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskbyidCtrl = (req, res) => {
	
	taskMdl.gettaskbyidMdl(req.params.id, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});

}
/**************************************************************************************
* Controller     : getactivetaskCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getactivetaskCtrl = (req, res) => {
	
	taskMdl.getactivetaskMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});

}
    
/**************************************************************************************
* Controller     : getcallattendedandtaskownerCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
// exports.getcallattendedandtaskownerCtrl = (req, res) => {
    
//     taskMdl.getcallattendedandtaskownerMdl(req.body, req.user)
//         .then(function (results) {
//             df.formatSucessRes(req, res, results, cntxtDtls, '', {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         });

// }
/**************************************************************************************
* Controller     : getcallattendedandtaskownerCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
// exports.getcallattendedandtaskownercountCtrl = (req, res) => {
    
//     taskMdl.getcallattendedandtaskownercountMdl(req.body, req.user)
//         .then(function (results) {
//             df.formatSucessRes(req, res, results, cntxtDtls, '', {});
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         });

// }

/**************************************************************************************
* Controller     : taskfilterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.taskfilterCtrl = (req, res) => {
    
    taskMdl.taskfilterMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : taskfilterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskbystatusandcategoryCtrl = (req, res) => {

	taskMdl.gettaskbystatusandcategoryMdl(req.body, req.user)
		.then(function (results) {
			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
}


/**************************************************************************************
* Controller     : taskfilterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskbystatuscountCtrl = (req, res) => {
    
    taskMdl.gettaskbystatuscountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : taskfilterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklistbystatus_Mobile_Ctrl = (req, res) => {
    
    taskMdl.gettasklistbystatus_Mobile_Mdl(req.body, req.user)
        .then(function (results) {
            /*taskMdl.getreportingdetailsMdl(req.body,req.user)
                .then(function (reporting_results) {
                    
                    if(results.length > 0 && reporting_results.length > 0){
                        
                        let reporting_name = reporting_results[0].reporting_name
                        let reporting_mobile = reporting_results[0].reporting_mobile
                        let reporting_email = reporting_results[0].reporting_email

                        results[0].reporting_name = reporting_name
                        results[0].reporting_mobile = reporting_mobile
                        results[0].reporting_email = reporting_email
                    }*/
                    
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                /*}).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });*/
          
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskcomplientslist = (req, res) => {
    
    taskMdl.gettaskcomplientslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasknotificationslistCtrl = (req, res) => {
    
    taskMdl.gettasknotificationslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

// /**************************************************************************************
// * Controller     : gettasklogsdetailsCtrl
// * Parameters     : req,res()
// * Description    : get details of all EntrpeCstmrTyp
// * Change History :
// * 14-04-2023   -  shaik Allabaksh  - Initial Function
// *
// ***************************************************************************************/
// exports.gettasklogsdetailsCtrl = (req, res) => {
    
//     taskMdl.gettasklogsdetails_task_Mdl(req.body, req.user)
//         .then(function (results1) {
//            taskMdl.gettasklogsdetails_tasklogs_Mdl(req.body, req.user)
//                 .then(function (results2) {
//                     taskMdl.gettasklogsdetails_tasksection_Mdl(req.body, req.user)
//                         .then(function (results3) {
//                             // if conditions for result3 onlt then goto 4
                            
//                             let newresult = {}
//                             newresult.task = results1
//                             newresult.tasklogs = results2
//                             newresult.tasksectioncols = {}
//                             console.log(results3.length,"results3.length-------------------")
//                             if(results3.length > 0){
//                                 let sectionids = []
//                                 results3.forEach((eachrecord) => {
//                                     sectionids.push(eachrecord.section_id)
//                                 })
//                                 console.log(sectionids)
//                                 let sectionnames = []
//                                 results3.forEach((name) => {
//                                     sectionnames.push(name.section_name)
//                                 })
//                                 console.log(sectionnames,"sectionnames---------------------------------------------")
//                                     taskMdl.gettasklogsdetails_tasksectionlogs_Mdl(req.body, sectionids, req.user)
//                                         .then(function (results4) {
                                        
                                           
                                        
                                        
//                                             for(let i = 0; i<sectionnames.length; i++){
//                                                 console.log("in first loop")
//                                                 // for(let j = 0; j<results4.length; j++){

//                                                     console.log(results4[i],"---------------------------------------------")
//                                                     newresult.tasksectioncols[sectionnames[i]] = results4[i]
                                            
//                                                 // }
//                                             }

//                                             // newresult.tasksectionlogs = results4
                                        
//                                             df.formatSucessRes(req, res, newresult, cntxtDtls, '', {});
//                                         }).catch(function (error) {
//                                             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//                                         });

//                                 }else{
//                                     df.formatSucessRes(req, res, newresult, cntxtDtls, '', {});
//                                 }

                            
//                         }).catch(function (error) {
//                             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//                         })
//             })
//         }).catch(function (error) {
//             df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         });

// }

/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
// exports.inserttaskcallattendedbyCtrl = (req, res) => {
//     console.log("input payloads",req.body)
// 	var items = req.body.call_attend_by.split(',');
// 	var MWHSI = items.filter((e, i, a) => a.indexOf(e) === i);
// 	console.log("MWHSI",MWHSI)
// 	console.log("MWHSI.length",MWHSI.length)
// 	let count = 0;
// 	/*MWHSI.filter((k)=>{
// 		console.log("filter k",k)
// 	})*/
// 	async function newfunc(){
// 		for (let i = 0; i < MWHSI.length -1; i++) {
// 			//MWHSI.forEach(execfunction(req, req.user))
// 			await execfunction(req, req.user, i, MWHSI.length)
// 		}
// 	}
// 	newfunc();
// 	async function execfunction(req, user, i, ttlsize){
// 		console.log("count",count)
// 		console.log("ttlsize",ttlsize)
// 		taskMdl.checkcountoftaskidMdl(req.body, user).then(function (taskcnt) {
// 			console.log("taskcnt[0].ct",taskcnt[0].ct)
// 			var subvar = 1
// 			if((count == 3) || (count == 2 && ttlsize == 4))
// 				subvar = 0
// 			/*if(ttlsize - taskcnt[0].ct != 2){
// 				subvar = 0
// 			} else {
// 				subvar = 1
// 			}*/
// 			if(count <= ttlsize - taskcnt[0].ct -subvar){
// 				count++
// 				console.log("counter",count)
// 				console.log("subvar",subvar)
// 				taskMdl.chcktaskcallbyinsrtMdl(req.body, user).then(function (taskdata) {
// 					var task_no_tckt = taskdata[0].task_no + "_" + (parseInt(taskcnt[0].ct) + 1);
// 					var task_srvc_tckt = taskdata[0].service_no + "_" + (parseInt(taskcnt[0].ct) + 1);
// 					taskMdl.insrttaskchilddatafrservicenowMdl(req.body,taskdata[0],task_no_tckt,task_srvc_tckt, user).then(function (results) {
// 						taskMdl.inserttaskcallattendedbyMdl(req.body, user).then(function (results) {
// 							console.log("success",results)
// 							console.log("counter  ttlsize taskcnt[0].ct subvar",count,ttlsize,taskcnt[0].ct,ttlsize-taskcnt[0].ct-subvar)
// 							if(count == (ttlsize -1))
// 							df.formatSucessRes(req, res, results, cntxtDtls, '', {});
						
// 						}).catch(function (error) {
// 							console.log("0",error)
// 							if(count == (ttlsize -1))
// 							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 						});
// 					}).catch(function (error) {
// 						console.log("1",error)
// 						if(count == (ttlsize - 1))
// 						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 					});
// 				}).catch(function (error) {
// 					console.log("2",error)
// 					if(count == (ttlsize -1))
// 					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 				});
// 			} else {
// 				count++
// 				console.log("counter esle",count)
// 				let error = 'all done'
// 				if(count == ttlsize-1)
// 					df.formatSucessRes(req, res, error, cntxtDtls, '', {});
// 			}
// 		}).catch(function (error) {
// 			console.log("3",error)
// 			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
// 		});
// 		await new Promise((resolve) => {
// 			setTimeout(() => {
// 				resolve();
// 			}, 500);
// 		});
// 	}
// }

exports.inserttaskcallattendedbyCtrl = async (req, res) => {
    console.log("input payloads",req.body)
    let call_attend_by_primary = req.body.call_attend_by_primary
    let call_attend_by_primary_old = req.body.call_attend_by_primary_old

	var new_items = req.body.call_attend_by.split(',');
    let call_attend_by_old = req.body.call_attend_by_old.split(',')
    if(new_items.length == 1 && new_items[0] == '') new_items = []
    // here secondary i.e call_attend_by values getting added
    let items = new_items.filter(val => !call_attend_by_old.includes(val))
    let call_attend_by_primary_old_before_secondary_became_primary
    let remove_items = []
    let primary = 0
	//1 for sub_cat_name && 0 for 'Assignment Changed'
	let status_change = 1;
	//let static_status = 0;
	let second_primary = 0
    // logic for primary added and removed
    if(call_attend_by_primary != '' && call_attend_by_old.indexOf(call_attend_by_primary) != -1){
		status_change = 0 ;
        items.unshift(call_attend_by_primary)
        let index = call_attend_by_old.indexOf(call_attend_by_primary)
        call_attend_by_old.splice(index, 1);
        call_attend_by_primary_old_before_secondary_became_primary = call_attend_by_primary_old
        console.log(remove_items,"======================")
		if (items.indexOf(call_attend_by_primary_old) != -1) {
            let primaryToSecondaryIndex = new_items.indexOf(call_attend_by_primary_old)
            new_items.splice(primaryToSecondaryIndex, 1);
            console.log(new_items, "new_items")
            second_primary = 1
        }
        primary = 2 
    }else if(call_attend_by_primary != call_attend_by_primary_old && call_attend_by_primary != '' && call_attend_by_primary_old != ''){
        primary = 1
        items.unshift(call_attend_by_primary)
        // here this veriable does not store primary now before secondary but call_attend_by_primary_old value to be made 271
        call_attend_by_primary_old_before_secondary_became_primary = call_attend_by_primary_old
        console.log("in first if")
		status_change = 0 ;
    }else if(call_attend_by_primary != call_attend_by_primary_old && call_attend_by_primary_old == ''){
        primary = 1
        items.unshift(call_attend_by_primary)
        console.log("in second if")
		
    }

    // logic for secondary removed
    if(call_attend_by_old.length == 1 && call_attend_by_old[0] == ''){
        remove_items = []
        console.log("---------------------------------")
    }else{
        console.log("ininininininininininin")
        remove_items = call_attend_by_old.filter(val => !new_items.includes(val))
    }

    if(call_attend_by_primary_old_before_secondary_became_primary && call_attend_by_primary_old_before_secondary_became_primary != undefined 
        && call_attend_by_primary_old_before_secondary_became_primary != null){
        console.log("--in remove----")
        remove_items.push(call_attend_by_primary_old_before_secondary_became_primary)
    }
	// if second_primary = 1 that means primary old is in seconday id's that is swap we will remove it from remove_items list 
    if(remove_items.indexOf(call_attend_by_primary_old) != -1 && second_primary == 1){
        let SecondaryIndex = remove_items.indexOf(call_attend_by_primary_old)
        remove_items.splice(SecondaryIndex,1)
        let secdItems = items.indexOf(call_attend_by_primary_old)
        items.splice(secdItems,1)
        items.unshift(call_attend_by_primary_old)
        console.log(items,"if loop")
    }

    let count = 0
    let seccondcount = 0
    // if(items.length ==0 && remove_items.length == 0) return  df.formatSucessRes(req, res, [], cntxtDtls, '', {message: "nothing to execute"});
    if(items.length ==0 && remove_items.length == 0 && req.body.task_appointment_date) {
       let updated_task_appointment_date = await taskMdl.update_task_appointment_dateMdl(req.body, req.user)
       let get_primary_task_id = await taskMdl.get_primary_task_idMdl(req.body, req.user)
       let servicenowpushresult = await servicenowpush(get_primary_task_id[0].task_id, status_change, get_primary_task_id[0].task_status, '', '', 1, 1, req.body.task_id,  req, res)
       return
    }
    if(items.length > 0 && remove_items.length > 0){
        count = 2
    }else{
        count = 1
    }

	 console.log("new_items",new_items);
	 console.log("call_attend_by_old",call_attend_by_old);
	 console.log("items",items);
	 console.log("remove_items",remove_items);
	 console.log("req.body.mngr",req.body.mngr);
	 if(req.body.mngr == 0){
  
        async function statusfieldcancelled(){
			//for (let i = 0; i < remove_items.length; i++) {
            let datafilter = async function(index){
                await statusfieldcancelledfunction(req, req.user, index, remove_items[index])
                    .then(function(results){
                        //if(i == remove_items.length - 1) df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function(error) {
                        //df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    })
					if (index == remove_items.length - 1) {
						console.log("ompleted")
					} else {
						await datafilter(index + 1)
					
						//})
					}
            }
			if (remove_items.length > 0) {
                (async () => {
                    await datafilter(0);
                })();
            }
        }
    await statusfieldcancelled()
    async function statusfieldcancelledfunction(req, user, i, statusfiledcancelledid){

            try{
				console.log("remove_items in add", remove_items)
				console.log("remove_items.length in add", remove_items.length)
                if(i == (remove_items.length - 1)){
                    seccondcount ++ 
                    console.log(seccondcount,"seccondcount in removed", count)
                } 
                if (i < 1) {
                    let insertcallattendedbyresult = await taskMdl.inserttaskcallattendedbyMdl(req.body, user)
                }   
				let utilizationCntIncrse = await taskMdl.updateattdnceWebofemolyeeMdl(statusfiledcancelledid)
                let statusfiledcancelledresult = await taskMdl.statusfieldcancelledMdl(req.body, statusfiledcancelledid, user)
                // let tasklogsstatusfiledcancelledresult = await taskMdl.tasklogsstatusfieldcancelledMdl(req.body, statusfiledcancelledid, user)
                // let removedtask = await taskMdl.getstatusfieldcancelledtaskMdl(req.body, statusfiledcancelledid)
                let removedtask = await taskMdl.getstatusfieldcancelledtaskMdl(req.body, statusfiledcancelledid, req.user)
                let tasklogsstatusfiledcancelledresult = await taskMdl.tasklogsstatusfieldcancelledMdl(req.body, statusfiledcancelledid, removedtask[0].task_id, user)
                console.log(removedtask[0],"removedtaskremovedtask")
                //let servicenowpushresult =  await servicenowpush(removedtask[0].task_id, status_change, 271, i, items.length, count, seccondcount, req.body.task_id, req, res)
                return tasklogsstatusfiledcancelledresult
            }catch(error){
				console.log("error in remove",error)
                throw error
            }
        
        }
    
        async function newfunc(){
            //for (let i = 0; i < items.length; i++) {
			let datafilter = async function (index) {
                await execfunction(req, req.user, index, items[index])
                    .then(function(results){
                        //if(i == items.length - 1 && count == 1) df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function(error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    })
				if (index == items.length - 1) {
                    console.log("completed")
                } else {
                    //await datafilter(index + 1)
						await new Promise((resolve) => {
							setTimeout(() => {
								datafilter(index + 1);
							}, 1000);
						})
                }
            }
			if (items.length > 0) {
                (async () => {
                    await datafilter(0);
                })();
            }
        } 
        await newfunc();
        async function execfunction(req, user, i, call_attend_by){

            try{
				if( call_attend_by == call_attend_by_primary && primary != 2){
					primary = 1
				} else if( primary == 1 && call_attend_by != call_attend_by_primary ){
					primary = 0
				}
				console.log("items in add", items)
				console.log("items.length in add", items.length)
                if(i == (items.length - 1)) {
                    seccondcount ++ 
                    console.log(seccondcount, "seccondcount in add", count)
                }
                let taskcnt = await taskMdl.checkcountoftaskidMdl(req.body, user)
                let taskdata = await taskMdl.chcktaskcallbyinsrtMdl(req.body, user)
                    
                var task_no_tckt = taskdata[0].task_no + "_" + (parseInt(taskcnt[0].ct) + 1);
                var task_srvc_tckt = taskdata[0].service_no + "_" + (parseInt(taskcnt[0].ct) + 1);
                let main_task_id = taskdata[0].task_id
				let utilizationCntIncrse = await taskMdl.updateAddattdnceWebofemolyeeMdl(call_attend_by) 
                // let main_task_call_attended_by = taskdata[0].call_attend_by
                let taskChckEmplyee = await taskMdl.taskChckEmplyeeMdl(call_attend_by, req.body)
				let taskPrimaryChckEmplyee = await taskMdl.taskPrimaryChckEmplyeeMdl(call_attend_by, req.body)
				if((taskChckEmplyee.length == 0) || (taskChckEmplyee.length > 0 && primary == 2)){
					
						//if(taskPrimaryChckEmplyee.length > 0){
							//primary =0
						//}
					let insertchildtask = await taskMdl.insrttaskchilddatafrservicenowMdl(req.body,taskdata[0],task_no_tckt,task_srvc_tckt, call_attend_by, primary, second_primary, user)
					
					if(i < 1){
						// have check for call_attended by
							let inserttask_callattendedby = await taskMdl.inserttaskcallattendedbyMdl(req.body,  user)
						}
						// let insertintotasklogscallattended  = await  taskMdl.insertintotasklogscallattendedbyMdl(req.body, call_attend_by, user)
						let insertintotasklogscallattended  = await  taskMdl.insertintotasklogscallattendedbyMdl(req.body, call_attend_by,insertchildtask.insertId, user)
						
						if(primary == 2){
							if(second_primary == 1){
								second_primary = second_primary - 1
								console.log(second_primary,"second_primary")
								let primary_to_secondary_id = await taskMdl.getprimary_to_secondary_id(req.body, call_attend_by, user)
								//let servicenowpushresult = await servicenowpush(primary_to_secondary_id[0].task_id, status_change, primary_to_secondary_id[0].task_status, i, items.length, count, seccondcount, main_task_id, req, res)
							}else{
								console.log("in getsecondary_to_primary_id")
								let secondary_to_primary_id = await taskMdl.getsecondary_to_primary_id(req.body, call_attend_by, user)
								let servicenowpushresult = await servicenowpush(secondary_to_primary_id[0].task_id, status_change, secondary_to_primary_id[0].task_status, i, items.length, count, seccondcount, main_task_id, req, res)
								primary = 0
							}
						}else{
							if(i == items.length - 1){
								let servicenowpushresult = await servicenowpush(insertchildtask.insertId, status_change, 218, i, items.length, count, seccondcount, main_task_id, req, res)
							}
						}
						await new Promise((resolve) => {
							setTimeout(() => {
								resolve();
							}, 1000);
						})
						return insertintotasklogscallattended
					} else {
						return taskChckEmplyee
					}

            }catch(error){
				console.log("error in add",error)
                throw error
            }
    
        }
	 } else {
		 //var maineng = 0;
		 //var counter = 0;
		 //var insertchildtask;
        async function newaddfunc(){
            //for (let i = 0; i < items.length; i++) {
			let datafilter = async function (index) {
                await execaddfunction(req, req.user, index, items[index], items.length)
                    .then(function(results){
                        //if(i == items.length - 1 && count == 1) df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function(error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    })
				if (index == items.length - 1) {
                    console.log("ompleted")
                } else {
                    //await datafilter(index + 1)
						await new Promise((resolve) => {
							setTimeout(() => {
								datafilter(index + 1);
							}, 1000);
						})
                }
                //}
            }
            if (items.length > 0) {
                (async () => {
                    await datafilter(0);
                })();
            }
        }
        await newaddfunc();
        async function execaddfunction(req, user, i, call_attend_by, itmlngth){

            try{
				console.log("items in add", items)
				console.log("items.length in add", items.length)
                if(i == (items.length - 1)) {
                    seccondcount = 1
                    console.log(seccondcount, "seccondcount in add", count)
                }
				//if(maineng == 0 && counter == 0){
					let empcount = await taskMdl.empdsgnchckMdl(call_attend_by, user)
					//console.log(empcount[0].ct)
					//if(empcount[0].ct > 0){
						//maineng = 1
						//counter = 1
					//}
				//} else {
					//counter = 0
				//}
				let utilizationCntIncrse = await taskMdl.updateAddattdnceWebofemolyeeMdl(call_attend_by)
                let taskcnt = await taskMdl.checkcountoftaskidMdl(req.body, user)
                let taskdata = await taskMdl.chcktaskcallbyinsrtMdl(req.body, user)
                let main_task_id = taskdata[0].task_id
					/*if(maineng == 1 && counter == 1){
						var task_no_tckt = taskdata[0].task_no;
						var task_srvc_tckt = taskdata[0].service_no;
					} else {*/
						var task_no_tckt = taskdata[0].task_no + "_" + (parseInt(taskcnt[0].ct) + 1);
						var task_srvc_tckt = taskdata[0].service_no + "_" + (parseInt(taskcnt[0].ct) + 1);
					//}
					/*if(maineng == 1 && counter == 1){
						insertchildtask = {
							"insertId": req.body.task_id
						} 
					} else {*/
				let taskChckEmplyee = await taskMdl.taskChckEmplyeeMdl(call_attend_by, req.body)
				let taskPrimaryChckEmplyee = await taskMdl.taskPrimaryChckEmplyeeMdl(call_attend_by, req.body)
				if((taskChckEmplyee.length == 0) || (taskChckEmplyee.length > 0 && primary == 2)){
						//if(taskPrimaryChckEmplyee.length > 0){
							//primary =0
						//}
						let insertchildtask = await taskMdl.insrttaskchilddatafrservicenowMdl(req.body,taskdata[0],task_no_tckt,task_srvc_tckt, call_attend_by,primary, second_primary, user)
						primary =0
					//} 
					if(i < 1){
						let inserttask_callattendedby = await taskMdl.inserttaskcallattendedbyMdl(req.body, user)
					}
					let insertintotasklogscallattended  = await  taskMdl.insertintotasklogscallattendedbyMdl(req.body, call_attend_by, main_task_id, user)
					console.log("sdggsgfsdgfdgdfsgdfggfs",insertchildtask)
					console.log("sdgggfsg",insertchildtask.insertId, 218, i, items.length)
					if(count == 1 && taskcnt[0].ct == itmlngth-1){
						let servicenowpushresult = await servicenowpush(insertchildtask.insertId, status_change, 218, i, items.length, count, seccondcount, main_task_id,  req, res)
						console.log("servicenowpushresult",servicenowpushresult)
					}
					await new Promise((resolve) => {
							setTimeout(() => {
								resolve();
							}, 100);
						})
						
					return insertintotasklogscallattended
				} else {
					return taskChckEmplyee
				}

            }catch(error){
				console.log("error in add mngr 1",error)
                throw error
            }
    
        }
		 
	 }

}


async function servicenowpush(task_id, tskcnt, task_status, i, new_items_length, count, seccondcount, main_task_id, req, control_res){
    console.log("i'm in servicenow function")
	let web_app = 1
    taskMdl.childtaskdatafrservicenowMdl(task_id, task_status, main_task_id, tskcnt)
    .then(function (tskdata) {
        console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length")
        if(tskdata && tskdata.length > 0){
        var data = {};
        data['notes'] = null
        data['tasks'] = [tskdata[0]];
        console.log("taskdatafrservicenowCtrl data",data)
        var options = {
            method: 'post',
            json: true,
            url: as.url_servicenow.processNotification.urlApi,
            headers: {
                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
                'content-type': 'application/json'
            },
            data: null

                }
                options.data = data
        console.log("options",options)
		taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
            //request(options, function (err, resp, body) {
            return axios(options).then((body) => {
                taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
				console.log("options",options)
					console.log("err,res,body", body.data)
					//console.log("err,res,body",  body['result'].status)
					//console.log("err,res,body",err, body['result'].status=='success')
					
					if( body.data ){
						let chckbody = JSON.stringify(body.data);
						if( !chckbody.includes('Error Page') ){
							if(body.data['result'].status=='success'){
								console.log("success")
								console.log(count,"count",seccondcount,"secondcount")
								//return
								if(count == seccondcount) df.formatSucessRes(req, control_res, body.data, cntxtDtls, '', {});
							}else {
								if(count == seccondcount)
								return df.formatErrorRes(req, control_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
							}
						} else {
							if(count == seccondcount)
							return df.formatErrorRes(req, control_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
						}
					} else {
						if(count == seccondcount)
						return df.formatErrorRes(req, control_res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
					}
				}).catch(function (error) {
                        console.log("error 2711", error);
                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                    });
			}).catch(function (error) {
                        console.log("error 2715", error);
                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                    });
		}).catch(function (error) {
                        console.log("error 2719", error);
                        df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                    });
    } else {
        let error = 'No Tasks Found'
		if(count == seccondcount)
        df.formatErrorRes(req, control_res, error, cntxtDtls, '', {});
    }
        
    }).catch(function (error) {
		if(count == seccondcount)
        df.formatErrorRes(req, control_res, error, cntxtDtls, '', {});
    });
}


/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getcomplientsbymaincatidCtrl = (req, res) => {
    
    taskMdl.getcomplientsbymaincatidMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : gettasklogsdetailsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklogsdetailsCtrl = (req, res) => {
    var fnm = `gettasklogsdetailsCtrl`
    taskMdl.gettasklogsdetails_task_Mdl(req.body, req.user)
        .then(function (results_task) {
            console.log(results_task[0], "result-------------------------------------")
            taskMdl.gettasklogsdetails_tasklogs_m_Mdl(req.body, req.user)
                .then(function (results_logs) {
                    // console.log("result fro check logs",results_logs)
                    // if(results_logs.length > 0){ 
                    //     for(let i = 0; i<results_logs.length; i++){

                    //         if(results_logs[i].task_status == 271){
                               
                    //             let curr_callAttendedBy = results_logs[i].call_attendedby_name.split(',')
                    //             let prev_callAttendedBy = results_logs[i-1].call_attendedby_name.split(',')
                                
                    //             const isSame =
                    //                     curr_callAttendedBy.length == prev_callAttendedBy.length && curr_callAttendedBy.every((curElement) => {
                    //                         return (prev_callAttendedBy.indexOf(curElement) > -1) 
                    //                         });
                                
                    //             if(!isSame){
                    //                 let duplicate_curr_callAttendedBy = curr_callAttendedBy
                    //                 curr_callAttendedBy = curr_callAttendedBy.filter(val => !prev_callAttendedBy.includes(val))
                    //                 prev_callAttendedBy = prev_callAttendedBy.filter(val => !duplicate_curr_callAttendedBy.includes(val))
                    //                 results_logs[i].prev_names = prev_callAttendedBy.join()
                    //                 results_logs[i].curr_names = curr_callAttendedBy.join()         
                    //             }
                
                    //         }

                    //     }
                    // }


                    //  if(results_logs.length > 0){
                    //     for(let i = 0; i<results_logs.length; i++){
                    //         if(results_logs[i].task_status == 219){

                    //             // req.body.task_status = results_logs[i].task_status
                    //             // taskMdl.gettasklatlongMdl(req.body, req.user).then(function (results) {
                    //                 results_logs[i].travel_distance = results_logs[i].travel_distance + " " + "km from base location" 
                    //                 // results_logs[i].travel_distance = results_logs[i].travel_distance + " " + "km from " + results[0].address
                    //             // }).catch(function (error) {
                    //             //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    //             // });
                        
                    //         }else if(results_logs[i].task_status != 218){
                    //             results_logs[i].travel_distance = results_logs[i].travel_distance + " " + "km"
                    //         }
                    //     }
                    //  }

            
                    // taskMdl.gettasksessnColsMdl(req.body, req.user).then(function (result) {
                        // console.log("result fro check",result)
                        // console.log("result fro check",result[0])
                        // console.log("result fro check------------------",result.length)
                      
                        taskMdl.gettasksessnColsGrpMdl(req.body, req.user).then(function (results) {
                            if(results.length > 0){
                                
                                var common_feilds = [];
                                var arrFeilds = ['task_section_col_id','section_id','task_id','section_col_name','section_col_value','section_name'];
                                var arrName = results[0].section_name;
                                var groupBy = 'section_id';
                                var sortKey = 'task_section_col_id';
                                var groupres = jsonUtils.groupJsonByKeycustom(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
                                df.formatSucessRes(req, res, {"task":results_task[0], "tasklogs":results_logs,"tasksectioncols":groupres}, cntxtDtls, fnm, {});
                                // df.formatSucessRes(req, res, {"task":results_task[0], "tasklogs":result[0],"tasksection":result[1],"tasksectioncols":groupres}, cntxtDtls, fnm, {});
                                }else{
                                    var groupres = []
                                    df.formatSucessRes(req, res, {"task":results_task[0], "tasklogs":results_logs,"tasksectioncols":groupres}, cntxtDtls, fnm, {});
                                }
                            }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                            });
                    // }).catch(function (error) {
                    //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    // }); 
                    
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });

        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });         
   
}


/**************************************************************************************
* Controller     : gettasklogsdetailsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettasklogsdetails_web_Ctrl = (req, res) => {
    var fnm = `gettasklogsdetailsCtrl`
    taskMdl.gettasklogsdetails_task_web_Mdl(req.body, req.user)
        .then(function (results_task) {
            taskMdl.gettasklogsdetails_tasklogs_Mdl(req.body, req.user)
                .then(function (results_logs) {
                    console.log(results_logs,"results_logsresults_logsresults_logsresults_logs")
                     
                    taskMdl.gettaskhardwareuseddataMdl(req.body,req.user)
                    .then(function (taskhardwaredata) {
                        taskMdl.gettasksessnColsGrpwebMdl(req.body, req.user).then(function (results) {
                            if(results.length > 0){
                           
                                var common_feilds = ['section_name'];
                                var arrFeilds = ['task_section_col_id','section_id','task_id','section_col_name','section_col_value','section_name'];
                                var arrName = ['section_data']
                                var groupBy = 'section_id';
                                var sortKey = 'task_section_col_id';
                                
                                var groupres  = jsonUtils.groupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
                                df.formatSucessRes(req, res, {"task":results_task[0], "tasklogs":results_logs,"tasksectioncols":groupres,  "taskhardwareuseddata":taskhardwaredata}, cntxtDtls, fnm, {});
                                // df.formatSucessRes(req, res, {"task":results_task[0], "tasklogs":result[0],"tasksection":result[1],"tasksectioncols":groupres}, cntxtDtls, fnm, {});
                            }else{
                                var groupres = []
                                df.formatSucessRes(req, res, {"task":results_task[0], "tasklogs":results_logs,"tasksectioncols":groupres, "taskhardwareuseddata":taskhardwaredata}, cntxtDtls, fnm, {});
                            }
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });
                       
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
/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getstatuscountbycategoryCtrl = (req, res) => {
    
    taskMdl.getstatuscountbycategoryMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.taskremainderCtrl = (req, res) => {
    
    taskMdl.taskremainderMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : gettaskcomplientslist
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.sendtaskremainderCtrl = (req, res) => {
    
    taskMdl.sendtaskremainderMdl(req.params.cron_time, req.user)
        .then(function (results) {
            if(results.length > 0){
				let datafilter = function(index){
                //for(let i = 0; i<results.length; i++){
                    console.log(results[index],"result in i ------------------------------------------")
                    taskMdl.insertremaindernotifyMdl(results[index], req.user)
                        .then(function (ntfcn) {

                            let text = ' Task remainder for : '+ results[index].task_no +' ';
                           
                            // notifi_type 0 = task and 1 = taskreaminder
                            // rayudu is using taskkind as flag to differntiate btw task remainder and task
                            let newtitle = 'Task remanider' ;
                            let QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from employees as e where e.emp_id = ${results[index].emp_id}`;
                            let taskkind = 'taskremainder'
                           
                            taskMdl.sendPushNotificationMdl(req.body, req.body.task_no, req.user, text, newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {
                             
                            })
							if(index == results.length - 1){
								console.log("completed")
							} else {
								datafilter(index + 1)
							}
                           
                        }).catch(function (error) {
                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                        });

                }
				datafilter(0)
            }

            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : taskremainderstatusupdateCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 11-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.taskremainderstatusupdateCtrl = (req, res) => {
    
    taskMdl.taskremainderstatusupdateMdl(req.body.notificationid, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : taskremainderstatusupdateCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10-05-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getnextstatusCtrl = (req, res) => {
    
    taskMdl.getnextstatusMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getnextstatuswebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10-05-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getnextstatuswebCtrl = (req, res) => {
    
    taskMdl.getnextstatuswebMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}



/**************************************************************************************
* Controller     : calculatereturndistanceCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20-07-2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.calculatereturndistanceCtrl = (req, res) => {
    var fnm = "calculatereturndistanceCtrl";
	
    taskMdl.returndistance_get_employee_ids_Mdl(req.body, req.user).then(async (results) => {
		//for (let i = 0; i < results.length; i++) {
		let datafilter = function (index) {
			calReturnDistance(results[index].employee_ids, index, results.length, req, res, req.user);
            if (index == results.length - 1) {
                console.log("ompleted")
            } else {
                datafilter(index + 1)
            }
		}
		datafilter(0)
		res.status(200).send({status: true, data: results.length})
	}).catch((error) => {
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		return;
    });
}

async function calReturnDistance(employee_id, index, totalSize, req, res, user) {
	var counter = 0;
	taskMdl.returndistance_task_logsMdl(req.body, employee_id, user).then((taskLog)=>{
		if(taskLog.length > 0){
			taskMdl.getemployeebaselocationMdl(taskLog[0].call_attend_by, user).then(async(emp)=>{
				if(taskLog[0].task_log_lat != null && taskLog[0].task_log_long != null  && taskLog[0].task_log_lat != '' && taskLog[0].task_log_long != ''
				&& taskLog[0].task_log_lat != undefined && taskLog[0].task_log_long != undefined && emp[0].emp_latitude != null && emp[0].emp_longitude != null
				&& emp[0].emp_latitude != '' && emp[0].emp_longitude != ''&& emp[0].emp_latitude != undefined && emp[0].emp_longitude != undefined){
					
					//let api_key = 'AIzaSyAlx1eb-uGbDhFP6rvEjhoSzeYuzTKSfm0';
					let api_key = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs';
					let origin = taskLog[0].task_log_lat + '%2C' + taskLog[0].task_log_long
					let destination = emp[0].emp_latitude + '%2C' + emp[0].emp_longitude
					
						let distance = 0;
						//let bng_res = null;
						let resStatus = null;
						let updateStatus = null;
						try {
							distance = await return_distance_request_method(origin, destination, api_key);
							updateStatus = "SUCCESS";
						} catch (error) {
							let response = {
								distance : 0
							}
							updateStatus = "FAILED";
							resStatus = "aaa_connection_failed";
						}
						taskMdl.insertdistanceintotask_logs_Mdl(req.body, distance,taskLog[0], user).then((result) => {
								console.log("result", result);
								if(index == (totalSize - 1)) {
									console.log("----------------------____________________________--- completed ")
									//df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
								}
							}).catch((err) => {
								console.log("insertAAA_error ", err)
							})
						console.log("Current Index ===>", index + 1, "Total ===> ", totalSize, " status ====", updateStatus);
						await new Promise((resolve) => {
							setTimeout(() => {
								resolve();
							}, 500);
						});
				} else{
					console.log("Current Index ===>", index + 1, "Total ===> ", totalSize, " status ====");
					taskMdl.insertdistanceintotask_logs_Mdl(req.body, 0,taskLog[0], user).then((result) => {
						if(index == (totalSize - 1)) {
							console.log("----------------------____________________________--- completed ")
							//df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
						}
					});
				}
			})
		} else {
			console.log("Current Index ===>", index + 1, "Total ===> ", totalSize, " status ====");
			console.log("counter +++ ",counter)
			taskMdl.returndistanceNullTasklogsMdl(req.body, employee_id, user).then((taskLog)=>{
				if(taskLog.length>0){
					taskMdl.insertdistanceintotask_logs_Mdl(req.body, 0,taskLog[0], user).then((result) => {
						
					})
				}
				/*new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, 100);
				});*/
			})
		}
	})
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 500);
	});
}

async function return_distance_request_method(origin, destination,api_key){
    return new Promise((resolve, reject) => {
        var options = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`,
            headers: { }
          };
        
        return axios(options).then((body) => {
            console.log("err,data", body.data)
            //var body = JSON.parse(body.data)
			var distance = 0;
            if(body.data["status"] == "OK" ){
                console.log("distance",body.data["rows"][0]["elements"])
				if(body.data["rows"][0]["elements"][0]["distance"]){
					if(body.data["rows"][0]["elements"][0]["distance"]["value"]){
						distance = parseFloat(body.data["rows"][0]["elements"][0]["distance"]["value"]);
					}
				}
            }
            resolve(distance)
        }).catch(function (error) {
            console.log("error 2836", error);
            df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
        });
    })

}

exports.calculateMissreturndistanceCtrl = (req, res) => {
    var fnm = "calculatereturndistanceCtrl";
	
    taskMdl.returndistance_getMissemployee_ids_Mdl(req, req).then(async (results) => {
		let datafilter = function (index) {
		//for (let i = 0; i < results.length; i++) {
			calMissReturnDistance(results[index].employee_ids, index, results.length, req, res, req);
            if (index == results.length - 1) {
                console.log("ompleted")
            } else {
                datafilter(index + 1)
            }
		}
		datafilter(0)
		res.status(200).send({status: true, data: results.length})
	}).catch((error) => {
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
		//return;
    });
}

async function calMissReturnDistance(employee_id, index, totalSize, req, res, user) {
	var counter = 0;
	taskMdl.returnMissdistance_task_logsMdl(req, employee_id, user).then((taskLog)=>{
		if(taskLog.length > 0){
			taskMdl.getemployeebaselocationMdl(taskLog[0].call_attend_by, user).then(async(emp)=>{
				if(taskLog[0].task_log_lat != null && taskLog[0].task_log_long != null  && taskLog[0].task_log_lat != '' && taskLog[0].task_log_long != ''
				&& taskLog[0].task_log_lat != undefined && taskLog[0].task_log_long != undefined && emp[0].emp_latitude != null && emp[0].emp_longitude != null
				&& emp[0].emp_latitude != '' && emp[0].emp_longitude != ''&& emp[0].emp_latitude != undefined && emp[0].emp_longitude != undefined){
					
					//let api_key = 'AIzaSyAlx1eb-uGbDhFP6rvEjhoSzeYuzTKSfm0';
					let api_key = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs';
					let origin = taskLog[0].task_log_lat + '%2C' + taskLog[0].task_log_long
					let destination = emp[0].emp_latitude + '%2C' + emp[0].emp_longitude
					
						let distance = 0;
						//let bng_res = null;
						let resStatus = null;
						let updateStatus = null;
						try {
							distance = await return_distance_request_method(origin, destination, api_key);
							updateStatus = "SUCCESS";
						} catch (error) {
							let response = {
								distance : 0
							}
							updateStatus = "FAILED";
							resStatus = "aaa_connection_failed";
						}
						taskMdl.insertMissdistanceintotask_logs_Mdl(req, distance,taskLog[0], user).then((result) => {
								console.log("result", result);
								if(index == (totalSize - 1)) {
									console.log("----------------------____________________________--- completed ")
									//df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
								}
							}).catch((err) => {
								console.log("insertAAA_error ", err)
							})
						console.log("Current Index ===>", index + 1, "Total ===> ", totalSize, " status ====", updateStatus);
						await new Promise((resolve) => {
							setTimeout(() => {
								resolve();
							}, 500);
						});
				} else{
					console.log("Current Index ===>", index + 1, "Total ===> ", totalSize, " status ====");
					taskMdl.insertMissdistanceintotask_logs_Mdl(req, 0,taskLog[0], user).then((result) => {
						if(index == (totalSize - 1)) {
							console.log("----------------------____________________________--- completed ")
							//df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
						}
					});
				}
			})
		} else {
			console.log("Current Index ===>", index + 1, "Total ===> ", totalSize, " status ====");
			console.log("counter +++ ",counter)
			taskMdl.returndistanceMissNullTasklogsMdl(req, employee_id, user).then((taskLog)=>{
				if(taskLog.length > 0){
					taskMdl.insertMissdistanceintotask_logs_Mdl(req, 0,taskLog[0], user).then((result) => {
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
							}, 100);
						});
					})
				}
			})
		}
	})
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 500);
	});
}

/**************************************************************************************
* Controller     : calculatereturndistanceCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10-05-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
/*exports.calculatereturndistanceCtrl = async (req, res) => {
    console.log("in controllerr")
	taskMdl.returndistance_get_employee_ids_Mdl(req.body, req.user).then(async (employeeIds) => {
		if(employeeIds.length > 0){
		   for await (const employeeId of employeeIds){
				await calReturnDistance(employeeId.employee_ids, req.user, req, res)
		   }   
		} else {
            df.formatSucessRes(req, res, employeeIds, cntxtDtls, '', {});
			// df.formatErrorRes(req, res, 'No Data to execute', cntxtDtls, '', {});
		}
	}).then(() => {
        df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
    }).catch((error) => {
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
    })
}


async function calReturnDistance(employee_id,user, req, res){
    try{
        let insertintologs 
        let taskLog = await taskMdl.returndistance_task_logsMdl(req.body, employee_id, user)
        if(taskLog.length > 0){
            let emp = await taskMdl.getemployeebaselocationMdl(taskLog[0].call_attend_by, user)
            
            if(taskLog[0].task_log_lat != null && taskLog[0].task_log_long != null  
                && taskLog[0].task_log_lat != '' && taskLog[0].task_log_long != ''
                    && taskLog[0].task_log_lat != undefined && taskLog[0].task_log_long != undefined 
                        && emp[0].emp_latitude != null && emp[0].emp_longitude != null
                            && emp[0].emp_latitude != '' && emp[0].emp_longitude != ''
                                && emp[0].emp_latitude != undefined && emp[0].emp_longitude != undefined){
                        
                //let api_key = 'AIzaSyAlx1eb-uGbDhFP6rvEjhoSzeYuzTKSfm0';
                let api_key = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs';
                let origin = taskLog[0].task_log_lat + '%2C' + taskLog[0].task_log_long
                let destination = emp[0].emp_latitude + '%2C' + emp[0].emp_longitude
                let distance =  await return_distance_request_method(origin, destination, api_key)
                insertintologs = await taskMdl.insertdistanceintotask_logs_Mdl(req.body, distance,taskLog[0], user)
            }else{
                insertintologs = await taskMdl.insertdistanceintotask_logs_Mdl(req.body, 0,taskLog[0], user)
            }
           
        }
        // if(i == (lngth - 1)) {
        //     df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
        //     //df.formatSucessRes(req, res, insertintologs, cntxtDtls, '', {});
        // }

    }catch(error){
        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        console.log("Error:",error)
    }
}


async function return_distance_request_method(origin, destination,api_key){
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`,
            headers: { }
          };
        
        request(config, function (err, resp, data) {
            console.log("err,data",err,data)
            var body = JSON.parse(data)
			var distance = 0;
            if(body["status"] == "OK" && body["rows"][0]["elements"][0]["distance"]["value"]){
                console.log("distance",body["rows"][0]["elements"])
                distance = parseFloat(body["rows"][0]["elements"][0]["distance"]["value"]);
            }
            resolve(distance)
        })
    })

}*/

// exports.calculatereturndistanceCtrl = async (req, res) => {
//     console.log("in controllerr")
// 	taskMdl.returndistance_get_employee_ids_Mdl(req.body, req.user).then(async (employeeIds) => {
// 		if(employeeIds.length > 0){
// 		   for(let i = 0; i<employeeIds.length; i++){
// 				await calReturnDistance(employeeIds[i].employee_ids, req.user, i, employeeIds.length, req, res)
// 		   }   
// 		} else {
//             df.formatSucessRes(req, res, employeeIds, cntxtDtls, '', {});
// 			// df.formatErrorRes(req, res, 'No Data to execute', cntxtDtls, '', {});
// 		}
// 	})
// }


// async function calReturnDistance(employee_id,user, i, lngth, req, res){
//     try{
//         let insertintologs 
//         let taskLog = await taskMdl.returndistance_task_logsMdl(req.body, employee_id, user)
//         if(taskLog.length > 0){
//             let emp = await taskMdl.getemployeebaselocationMdl(taskLog[0].call_attend_by, user)
//             var R = 6371;
//             dLat = toRad(parseFloat(taskLog[0].task_log_lat) - emp[0].emp_latitude);
//             dLon = toRad(parseFloat(taskLog[0].task_log_long) - emp[0].emp_longitude);
//             lat1 = toRad(emp[0].emp_latitude);
//             lat2 = toRad(parseFloat(taskLog[0].task_log_lat));

//             console.log("dLat",dLat)
//             console.log("dLon",dLon)
//             console.log("lat1",lat1)
//             console.log("lat2",lat2)
   
//             var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//             var distance = R * c * 1000;
//             distance = distance.toFixed(0)
//             console.log("distance",distance)
//             insertintologs = await taskMdl.insertdistanceintotask_logs_Mdl(req.body, distance,taskLog[0], user)
//         }
//         if(i == (lngth - 1)) {
//             df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: "return distance for all employees calculated"});
//             //df.formatSucessRes(req, res, insertintologs, cntxtDtls, '', {});
//         }

//     }catch(error){
//         df.formatErrorRes(req, res, error, cntxtDtls, '', {});
//         console.log("Error:",error)
//     }
// }


/**************************************************************************************
* Controller     : calculatereturndistanceCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26-06-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/



exports.getalltasks = async (req, res) => {
   
	taskMdl.gettasks(req.body, req.user).then(async (totaltasks) => {
		if(totaltasks.length > 0){
			let datafilter = function(index){
		   //for(let i = 0; i < totaltasks.length; i++){
	
				console.log("i'm in getalltasks function")
				calculatetraveldistance(req,res, totaltasks[index].task_id, req.user, index, totaltasks.length)
				if(index == totaltasks.length - 1){
					console.log("ompleted")
				} else {
					datafilter(index + 1)
				}
		   }   
		   datafilter(0) 
		} else {
            df.formatSucessRes(req, res, totaltasks, cntxtDtls, '', {});
		}
	})
}



async function calculatetraveldistance (req, res, task_id, user, i, lngth )  {
    
    try{
       
       let tskdstnce = await taskMdl.gettasktrvldstnceMdl(task_id, user)
       
            if(tskdstnce.length >= 2 && (tskdstnce[0].lat_long != null && tskdstnce[1].lat_long != null)){
                let api_key = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs';
                let origin = tskdstnce[0].lat_long;
                let destination = tskdstnce[1].lat_long;

                let distance =  await request_method(origin, destination, api_key)
                console.log(distance,"distancedistancedistance")
                let result = await taskMdl.updatetask_distance_Mdl(task_id, user, distance)
                console.log("i'm in updatetask_distance_Mdl promise")     
            } 
		console.log(i,lngth)
        if(i == (lngth - 1)) {
            df.formatSucessRes(req, res, [], cntxtDtls, '', {success_msg: " distance for all employees calculated"});
           
        }

    }catch(error){
        console.log("error",error)
    }
        

}

async function request_method(origin, destination,api_key){
    return new Promise((resolve, reject) => {
        var options = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`,
            headers: { }
          };
		var distance = 0;
        //request(config, function (err, resp, data) {
		return axios(options).then((body) => {
            //var body = JSON.parse(body.data)
            if(body.data["status"] == "OK"){
                console.log("distance",body.data["rows"][0]["elements"])
                distance = parseFloat(body.data["rows"][0]["elements"][0]["distance"]["value"]);
            }
            resolve(distance)
        }).catch(function (error) {
			console.log("error 227", error);
			df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
		});
    })

}


/**************************************************************************************
* Controller     : getnextstatuswebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 10-05-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getemployeesspecifictomanagerCtrl = (req, res) => {
    
    taskMdl.getemployeesspecifictomanagerMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : updatetaskhardwareCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26-07-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatetaskhardwareCtrl = (req, res) => {
    
    taskMdl.updatetaskhardwareMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : gettaskhardwarebyidCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26-07-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwarebyidCtrl = (req, res) => {
    
    taskMdl.gettaskhardwarebyidMdl(req.params.id, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : gettaskhardwarebypartcodeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26-07-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwarebypartcodeCtrl = (req, res) => {
    
    taskMdl.gettaskhardwarebypartcodeMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}



/**************************************************************************************
* Controller     : gettaskhardwarebycallattendedby_app_Ctrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 31-07-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.gettaskhardwarebycallattendedby_app_Ctrl = (req, res) => {
    
    taskMdl.gettaskhardwarebycallattendedbyMdl(req.body, req.user)
        .then(function (results) {
                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


/**************************************************************************************
* Controller     : updatetaskhardwareCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26-07-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatetaskhardwareCtrl = (req, res) => {
    
    taskMdl.updatetaskhardwareMdl(req.body, req.user)
        .then(function (results) {
            taskMdl.taskhardwarelogMdl(req.body, req.user)
                .then(function (results) {
                    df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                }).catch(function (error) {
                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                });
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}