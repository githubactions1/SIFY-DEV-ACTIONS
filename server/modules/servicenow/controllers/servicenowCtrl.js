var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
//var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require("request");
var axios = require('axios')
var servicenowMdl = require('../models/servicenowMdl');


/**************************************************************************************
* Controller     : srvcnowcreatetaskCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 18/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.srvcnowcreatetaskCtrl = (req, res) => {
    var fnm = `srvcnowcreatetaskCtrl`
	let web_app = 3
    console.log("req.body", req.body)
    console.log("req.body[0].customFieldGroups", req.body[0].customFieldGroups)
    servicenowMdl.insrtservicenowfulldataMdl(req.body).then(function (pincodedata) {
    })
    if (req.body[0].taskAction == 'NEW') {
		servicenowMdl.chckpincodefrSNMdl(req.body[0]).then(function (pincodeSNdata) {
				if(pincodeSNdata.length == 0){
					df.serviceNowformatErrorRes(req, res, 'no data', cntxtDtls, '', { error_status: "400", err_message: "Invalid Department Code" });
				} else {
		var engineer = 0;
		var rigger = 0;
		var engassgn = false;
		var engassgnId ;
		var regassgn = false;
		var regassgnId ;
		(req.body[0].customFieldGroups).filter((k)=>{
			if(k.customfieldGroupName == 'requiredFieldMembers'){
				if(k.additionalProperties.rigger == 1 || k.additionalProperties.rigger == 2 || k.additionalProperties.rigger == 3 || k.additionalProperties.rigger == 4){
					rigger = 1
				}
				if(k.additionalProperties.engineer == 1 || k.additionalProperties.engineer == 2 || k.additionalProperties.engineer == 3 || k.additionalProperties.engineer == 4 ){
					engineer = 1
				}
			}
		})
        if ((req.body[0].taskLatitude == null || req.body[0].taskLatitude == '' || req.body[0].taskLongitude == null || req.body[0].taskLongitude == '') &&
            ((req.body[0].taskAddress.block != '' && req.body[0].taskAddress.block != null) || (req.body[0].taskAddress.pincode != null && req.body[0].taskAddress.pincode != ''))) {

            var postcode;
            var chckpincodemaps = 0;
            if (req.body[0].taskAddress.block != '' && req.body[0].taskAddress.block != null) {
                postcode = (req.body[0].taskAddress.block).replace(/ /g, '+');
            } else if (req.body[0].taskAddress.pincode != null && req.body[0].taskAddress.pincode != '') {
                postcode = req.body[0].taskAddress.pincode;
                chckpincodemaps = 1
            }
            console.log("postcode", postcode)
            //let apikey = 'AIzaSyAlx1eb-uGbDhFP6rvEjhoSzeYuzTKSfm0'
            let apikey = 'AIzaSyBbksroW8HWomEJzA50thSu9UEqb5OZZKs'
            /*var mapoptions = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apikey}`,
            }*/
			var config = {
			  method: 'get',
			  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apikey}`,
			  headers: { 
				'Content-Type': 'application/json'
			  }
			};
            //console.log("mapoptions", mapoptions);
            //request(mapoptions, function (err, respnce, mapbody) {
            return axios(config).then(function (body) {
                console.log("mapbody", body.data)
				var mapbody = body.data
				if(mapbody){
					//var databody = JSON.parse(mapbody)
					var databody = mapbody
					// Extract the latitude and longitude from the response
					if (databody["status"] == "OK") {
						console.log(databody.results)
						console.log("------------------___________,databody.results[0].geometry.location_____________--------------------------",databody.results[0].geometry.location)
						console.log("------------------___________,databody.results[0].geometry.location_____________--------------------------")
						console.log("------------------__________,databody.results[0].geometry.location______________--------------------------")
						console.log("------------------___________,databody.results[0].geometry.location_____________--------------------------")
						console.log("------------------__________,databody.results[0].geometry.location______________--------------------------")
						const { lat, lng } = databody.results[0].geometry.location;
						console.log(`Latitude: ${lat}`);
						console.log(`Longitude: ${lng}`);
						req.body[0]['taskLatitude'] = lat;
						req.body[0]['taskLongitude'] = lng
					}
				}
                if ((req.body[0].taskLatitude == null || req.body[0].taskLatitude == '' || req.body[0].taskLongitude == null || req.body[0].taskLongitude == '') && (chckpincodemaps == 0)) {
                    postcode = req.body[0].taskAddress.pincode;
                    var pincodemapoptions = {
                        method: 'get',
                        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apikey}`,
                    }
                    //request(pincodemapoptions, function (err, respnce, pinceodemapbody) {
                    return axios(pincodemapoptions).then(function (body) {
						var pinceodemapbody = body.data
                        console.log("pinceodemapbody", pinceodemapbody)
						if(pinceodemapbody){
							//var pincodedatabody = JSON.parse(pinceodemapbody)
							var pincodedatabody = pinceodemapbody
							// Extract the latitude and longitude from the response
							if (pincodedatabody["status"] == "OK") {
								console.log(pincodedatabody.results)
								console.log("------------------___________,pincodedatabody.results[0].geometry.location_____________--------------------------",pincodedatabody.results[0].geometry.location)
								console.log("------------------___________,pincodedatabody.results[0].geometry.location_____________--------------------------")
								console.log("------------------__________,pincodedatabody.results[0].geometry.location______________--------------------------")
								console.log("------------------___________,pincodedatabody.results[0].geometry.location_____________--------------------------")
								console.log("------------------__________,pincodedatabody.results[0].geometry.location______________--------------------------")
								const { lat, lng } = pincodedatabody.results[0].geometry.location;
								console.log(`Latitude: ${lat}`);
								console.log(`Longitude: ${lng}`);
								req.body[0]['taskLatitude'] = lat;
								req.body[0]['taskLongitude'] = lng
							}
						}
                        servicenowMdl.chckpincodeemptaskMdl(req.body[0],engineer,rigger).then(function (pincodedata) {
                            var addempdata;
                            servicenowMdl.chckNopincodeemptaskMdl(req.body[0], pincodedata.length).then(function (empdata) {
                                servicenowMdl.chcksotcodeemptaskMdl(req.body[0], empdata.length).then(function (sotempdata) { //new code
								if(empdata.length > 0 || pincodedata.length > 0 || sotempdata.length > 0){
                                    //var taskowner = empdata[0].emp_id //old code
                                    var taskowner; //new code
                                    if (empdata && empdata.length > 0) { //new code
                                        taskowner = empdata[0].emp_id //new code
                                    } else { //new code
                                        taskowner = sotempdata[0].emp_id //new code
                                    } //new code
                                    if (pincodedata && pincodedata.length > 0) {
                                        addempdata = pincodedata[0]
										engassgn = true;
										engassgnId = pincodedata[0].emp_id;
                                    } else {
                                        //addempdata = empdata[0] //old code
                                        if (empdata && empdata.length > 0) { //new code
                                            addempdata = empdata[0] //new code
                                        } else { //new code
                                            addempdata = sotempdata[0] //new code
                                        } //new code
                                    }
                                    console.log("addempdata", addempdata)
                                    //if(pincodedata && pincodedata.length > 0){ 
                                    //servicenowMdl.checkcircuitdataMdl(req.body[0]).then(function(crcktdata){
                                    servicenowMdl.gettaskcatIdMdl(req.body[0]).then(function (taskcatdata) {
                                        if (taskcatdata.length > 0) {
                                            servicenowMdl.getstateIdMdl(req.body[0]).then(function (statedata) {
                                                var statedataid = 0
                                                servicenowMdl.insrtstateIdMdl(req.body[0], statedata).then(function (insrtstsdata) {
                                                    if (statedata.length == 0 && req.body[0].taskAddress.state != '' && req.body[0].taskAddress.state != null && req.body[0].taskAddress.state != undefined) {
                                                        statedataid = insrtstsdata.insertId;
                                                    } else if (statedata.length > 0) {
                                                        statedataid = statedata[0].state_id
                                                    }
                                                    servicenowMdl.insrtcircuitdataMdl(req.body[0], 'crcktdata', addempdata, statedataid).then(function (insrtcrctdata) {
                                                        var crctid;
                                                        //if(crcktdata.length == 0){
                                                        crctid = insrtcrctdata.insertId
                                                        /*} else {
                                                            crctid = insrtcrctdata[0].circuit_id
                                                        }*/
                                                        servicenowMdl.srvcnowcreatetaskMdl(req.body[0], addempdata, crctid, taskcatdata[0], pincodedata.length, taskowner, pincodeSNdata[0]).then(function (tcktdta) {
                                                            servicenowMdl.getinsrttaskMdl(tcktdta.insertId).then(function (taskinsrtdata) {
                                                                servicenowMdl.srvcnowcreatetasksessionMdl(req.body[0], taskinsrtdata[0]).then(function (results) {
                                                                    servicenowMdl.gettaskcolssessionMdl(taskinsrtdata[0]).then(function (tasksessndata) {
                                                                        servicenowMdl.srvcnowcreatetaskcolssessionMdl(req.body[0], taskinsrtdata[0], tasksessndata).then(function (results) {
                                                                            var task_no_tckt;
                                                                            var task_srvc_tckt;
                                                                            if (pincodedata && pincodedata.length > 0) {
                                                                                task_no_tckt = taskinsrtdata[0].task_no + "_" + 1;
                                                                                task_srvc_tckt = taskinsrtdata[0].service_no + "_" + 1;
                                                                            }
                                                                            servicenowMdl.srvcnowcreateParenttaskMdl(req.body[0], addempdata, crctid, taskcatdata[0], pincodedata.length, taskowner, task_no_tckt, task_srvc_tckt, tcktdta.insertId).then(function (parenttcktdta) {
                                                                                servicenowMdl.insrtasklogsdatabyIdMdl(req.body[0], taskinsrtdata[0], pincodedata.length, parenttcktdta).then(function (results) {
                                                                                    var data = req.body;
                                                                                    data[0]['assignees'] = [];
                                                                                    data[0]['clusterIdentity'] = addempdata.cluster_name;
                                                                                    console.log("last final data", data)
                                                                                    if (pincodedata && pincodedata.length > 0) {
																						if(engineer == 1 && rigger == 1){
																							servicenowMdl.chckpincodeRiggeremptaskMdl(req.body[0],engineer,rigger).then(function (pincodeRiggerdata) {
																								var task_no_tckt_reg;
																								var task_srvc_tckt_reg;
																								if (pincodeRiggerdata && pincodeRiggerdata.length > 0) {
																									regassgn = true;
																									regassgnId = pincodeRiggerdata[0].emp_id
																									task_no_tckt_reg = taskinsrtdata[0].task_no + "_" + 2;
																									task_srvc_tckt_reg = taskinsrtdata[0].service_no + "_" + 2;
																								}
																								servicenowMdl.srvcnowcreateRiggertaskMdl(req.body[0], pincodeRiggerdata[0], crctid, taskcatdata[0], pincodeRiggerdata.length, taskowner, task_no_tckt_reg, task_srvc_tckt_reg, tcktdta.insertId).then(function (parenttcktdta) {
																									servicenowMdl.getRiggerinsrttaskMdl(task_no_tckt_reg, pincodeRiggerdata.length).then(function (RiggerTask) { 
																										servicenowMdl.insrtasklogsRiggerdatabyIdMdl(req.body[0], RiggerTask, pincodeRiggerdata.length, parenttcktdta).then(function (results) { 
																											servicenowMdl.taskdatafrservicenowpincodeMdl(tcktdta.insertId).then(function (tskdata) {
																												servicenowMdl.utilizationCountMdl(engassgn ,engassgnId ,regassgn ,regassgnId ).then(function (utlztndata) {
																													var servicenowdata = {};
																													servicenowdata['notes'] = null
																													servicenowdata['tasks'] = [tskdata[0]];
																													console.log("tskdata", tskdata[0])
																													console.log("taskdatafrservicenowCtrl data", servicenowdata)
																													var options = {
																														method: 'post',
																														json: true,
																														url: as.url_servicenow.processNotification.urlApi,
                                                                                                                        headers: {
                                                                                                                            'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																															'content-type': 'application/json'
																														},
                                                                                                                                    data: null,
                                                                                                                                }
                                                                                                                                options.data = servicenowdata
																													console.log("options", options)

																													servicenowMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                                                                                        //request(options, function (err, resp, body) {
                                                                                                                        return axios(options).then(function (body) {
                                                                                                                            servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                                                                                                console.log("err,res,body", body.result)
                                                                                                                                //console.log("err,res,body", body['result'].status)
                                                                                                                                //console.log("err,res,body", err, body['result'].status == 'success')
                                                                                                                                if (body.data) {
																																	let chckbody = JSON.stringify(body.data);
																																	if( !chckbody.includes('Error Page') ){
																																		if (body.data['result'].status == 'success') {
																																			df.serviceNowformatSucessRes(req, res, body.data, cntxtDtls, '', {});
																																		} else {
																																			df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																																		}
																																	} else {
																																		df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																																	}
																																} else {
                                                                                                                                    df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                                }
                                                                                                                            })
                                                                                                                        }).catch((err) => {
                                                                                                                        console.log("err in axios 228", err)
                                                                                                                        df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    })
                                                                                                                    })
																												})
																											})
																										})
																									})
																								})
																							})
																						} else {
																								servicenowMdl.taskdatafrservicenowpincodeMdl(tcktdta.insertId).then(function (tskdata) {
																									servicenowMdl.utilizationCountMdl(engassgn ,engassgnId ,regassgn ,regassgnId ).then(function (utlztndata) {
																										var servicenowdata = {};
																										servicenowdata['notes'] = null
																										servicenowdata['tasks'] = [tskdata[0]];
																										console.log("tskdata", tskdata[0])
																										console.log("taskdatafrservicenowCtrl data", servicenowdata)
																										var options = {
																											method: 'post',
																											json: true,
																											url: as.url_servicenow.processNotification.urlApi,
                                                                                                            headers: {
                                                                                                                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																												'content-type': 'application/json'
																											},
                                                                                                                    data: null,
                                                                                                                }
                                                                                                                options.data = servicenowdata
																										console.log("options", options)

																										servicenowMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                                                                            //request(options, function (err, resp, body) {
                                                                                                            return axios(options).then(function (body) {
                                                                                                                servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                                                                                    console.log("err,res,body", body.data)
                                                                                                                    //console.log("err,res,body", body['result'].status)
                                                                                                                    //console.log("err,res,body", err, body['result'].status == 'success')
                                                                                                                    if (body.data) {
																														let chckbody = JSON.stringify(body.data);
																														if( !chckbody.includes('Error Page') ){
																															if (body.data['result'].status == 'success') {
																																df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
																															} else {
																																df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																															}
																														} else {
																															df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																														}
																													} else {
                                                                                                                        df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    }
                                                                                                                })
                                                                                                            }).catch((err) => {
                                                                                                                        console.log("err in axios 281", err)
                                                                                                                        df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    })
                                                                                                        })
																									})
																								})
																						}
                                                                                        
                                                                                    } else {
                                                                                        df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
                                                                                    }
                                                                                })
                                                                            })
                                                                        }).catch((err) => {
                                                                            console.log("err", err)
                                                                            let error = 'Unknown owner identity'
                                                                            console.log("error", error)
                                                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                        })
                                                                    }).catch((err) => {
                                                                        console.log("err", err)
                                                                        let error = 'Unknown owner identity'
                                                                        console.log("error", error)
                                                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                    })
                                                                }).catch((err) => {
                                                                    console.log("err", err)
                                                                    let error = 'Unknown owner identity'
                                                                    console.log("error", error)
                                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                })
                                                            }).catch((err) => {
                                                                console.log("err", err)
                                                                let error = 'Unknown owner identity'
                                                                console.log("error", error)
                                                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                            })
                                                        }).catch((err) => {
                                                            console.log("err", err)
                                                            let error = 'Unknown owner identity'
                                                            console.log("error", error)
                                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                        })
                                                    }).catch((err) => {
                                                        console.log("err", err)
                                                        let error = 'Unknown owner identity'
                                                        console.log("error", error)
                                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                    })
                                                }).catch((err) => {
                                                    console.log("err", err)
                                                    let error = 'Unknown owner identity'
                                                    console.log("error", error)
                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                })
                                            }).catch((err) => {
                                                console.log("err", err)
                                                let error = 'Unknown owner identity'
                                                console.log("error", error)
                                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                            })
                                        } else {
                                            let error = 'Invalid Task Type'
                                            console.log("error", error)
                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        }
                                    }).catch((err) => {
                                        console.log("err", err)
                                        let error = 'Unknown owner identity'
                                        console.log("error", error)
                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    })
                                    /*}).catch((err) => { 
                                    console.log("err",err)
                                        let error = 'No circut data'
                                            console.log("error",error)
                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    })*/
									} else {
										let error = 'Unknown owner identity'
                                                    console.log("error", error)
                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
									}
                                }).catch((err) => { //new code
                                    console.log("err", err) //new code
                                    let error = 'Unknown owner identity' //new code
                                    console.log("error", error) //new code
                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error }); //new code
                                }) //new code
                            }).catch((err) => {
                                console.log("err", err)
                                let error = 'Unknown owner identity'
                                console.log("error", error)
                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                            })
                            /*} else {
                                let error = 'No Employee Free on This Pincode'
                                console.log("error",error)
                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                            }*/
                        }).catch((error) => {
                            console.log("error", error)
                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Invalid Department Code" });
                        })
                    }).catch((error) => {
                        console.log("error", error)
                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Invalid Department Code" });
                    })
                } else {
                    servicenowMdl.chckpincodeemptaskMdl(req.body[0],engineer,rigger).then(function (pincodedata) {
                        var addempdata;
                        servicenowMdl.chckNopincodeemptaskMdl(req.body[0], pincodedata.length).then(function (empdata) {
                            servicenowMdl.chcksotcodeemptaskMdl(req.body[0], empdata.length).then(function (sotempdata) { //new code
							if(empdata.length > 0 || pincodedata.length > 0 || sotempdata.length > 0){
                                //var taskowner = empdata[0].emp_id //old code
                                var taskowner; //new code
                                if (empdata && empdata.length > 0) { //new code
                                    taskowner = empdata[0].emp_id //new code
                                } else { //new code
                                    taskowner = sotempdata[0].emp_id //new code
                                } //new code
                                if (pincodedata && pincodedata.length > 0) {
                                    addempdata = pincodedata[0]
									engassgn = true;
									engassgnId = pincodedata[0].emp_id;
                                } else {
                                    //addempdata = empdata[0] //old code
                                    if (empdata && empdata.length > 0) { //new code
                                        addempdata = empdata[0] //new code
                                    } else { //new code
                                        addempdata = sotempdata[0] //new code
                                    } //new code
                                }
                                console.log("addempdata", addempdata)
                                //if(pincodedata && pincodedata.length > 0){ 
                                //servicenowMdl.checkcircuitdataMdl(req.body[0]).then(function(crcktdata){
                                servicenowMdl.gettaskcatIdMdl(req.body[0]).then(function (taskcatdata) {
                                    if (taskcatdata.length > 0) {
                                        servicenowMdl.getstateIdMdl(req.body[0]).then(function (statedata) {
                                            var statedataid = 0
                                            servicenowMdl.insrtstateIdMdl(req.body[0], statedata).then(function (insrtstsdata) {
                                                if (statedata.length == 0 && req.body[0].taskAddress.state != '' && req.body[0].taskAddress.state != null && req.body[0].taskAddress.state != undefined) {
                                                    statedataid = insrtstsdata.insertId;
                                                } else if (statedata.length > 0) {
                                                    statedataid = statedata[0].state_id
                                                }
                                                servicenowMdl.insrtcircuitdataMdl(req.body[0], 'crcktdata', addempdata, statedataid).then(function (insrtcrctdata) {
                                                    var crctid;
                                                    //if(crcktdata.length == 0){
                                                    crctid = insrtcrctdata.insertId
                                                    /*} else {
                                                        crctid = insrtcrctdata[0].circuit_id
                                                    }*/
                                                    servicenowMdl.srvcnowcreatetaskMdl(req.body[0], addempdata, crctid, taskcatdata[0], pincodedata.length, taskowner, pincodeSNdata[0]).then(function (tcktdta) {
                                                        servicenowMdl.getinsrttaskMdl(tcktdta.insertId).then(function (taskinsrtdata) {
                                                            servicenowMdl.srvcnowcreatetasksessionMdl(req.body[0], taskinsrtdata[0]).then(function (results) {
                                                                servicenowMdl.gettaskcolssessionMdl(taskinsrtdata[0]).then(function (tasksessndata) {
                                                                    servicenowMdl.srvcnowcreatetaskcolssessionMdl(req.body[0], taskinsrtdata[0], tasksessndata).then(function (results) {
                                                                        var task_no_tckt;
                                                                        var task_srvc_tckt;
                                                                        if (pincodedata && pincodedata.length > 0) {
                                                                            task_no_tckt = taskinsrtdata[0].task_no + "_" + 1;
                                                                            task_srvc_tckt = taskinsrtdata[0].service_no + "_" + 1;
                                                                        }
                                                                        servicenowMdl.srvcnowcreateParenttaskMdl(req.body[0], addempdata, crctid, taskcatdata[0], pincodedata.length, taskowner, task_no_tckt, task_srvc_tckt, tcktdta.insertId).then(function (parenttcktdta) {
                                                                            servicenowMdl.insrtasklogsdatabyIdMdl(req.body[0], taskinsrtdata[0], pincodedata.length, parenttcktdta).then(function (results) {
                                                                                var data = req.body;
                                                                                data[0]['assignees'] = [];
                                                                                data[0]['clusterIdentity'] = addempdata.cluster_name;
                                                                                console.log("last final data", data)
                                                                                if (pincodedata && pincodedata.length > 0) {
                                                                                    if(engineer == 1 && rigger == 1){
																						servicenowMdl.chckpincodeRiggeremptaskMdl(req.body[0],engineer,rigger).then(function (pincodeRiggerdata) {
																							var task_no_tckt_reg;
																							var task_srvc_tckt_reg;
																							if (pincodeRiggerdata && pincodeRiggerdata.length > 0) {
																								regassgn = true;
																								regassgnId = pincodeRiggerdata[0].emp_id
																								task_no_tckt_reg = taskinsrtdata[0].task_no + "_" + 2;
																								task_srvc_tckt_reg = taskinsrtdata[0].service_no + "_" + 2;
																							}
																							servicenowMdl.srvcnowcreateRiggertaskMdl(req.body[0], pincodeRiggerdata[0], crctid, taskcatdata[0], pincodeRiggerdata.length, taskowner, task_no_tckt_reg, task_srvc_tckt_reg, tcktdta.insertId).then(function (parenttcktdta) {
																								servicenowMdl.getRiggerinsrttaskMdl(task_no_tckt_reg, pincodeRiggerdata.length).then(function (RiggerTask) { 
																									servicenowMdl.insrtasklogsRiggerdatabyIdMdl(req.body[0], RiggerTask, pincodeRiggerdata.length, parenttcktdta).then(function (results) { 
																										servicenowMdl.taskdatafrservicenowpincodeMdl(tcktdta.insertId).then(function (tskdata) {
																											servicenowMdl.utilizationCountMdl(engassgn ,engassgnId ,regassgn ,regassgnId ).then(function (utlztndata) {
																												var servicenowdata = {};
																												servicenowdata['notes'] = null
																												servicenowdata['tasks'] = [tskdata[0]];
																												console.log("tskdata", tskdata[0])
																												console.log("taskdatafrservicenowCtrl data", servicenowdata)
																												var options = {
																													method: 'post',
																													json: true,
																													url: as.url_servicenow.processNotification.urlApi,
                                                                                                                    headers: {
                                                                                                                        'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																														'content-type': 'application/json'
																													},
                                                                                                                            data: null,
                                                                                                                        }
                                                                                                                        options.data = servicenowdata
																												console.log("options", options)

																												servicenowMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                                                                                    //request(options, function (err, resp, body) {
                                                                                                                    return axios(options).then(function (body) {
                                                                                                                        servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                                                                                            console.log("err,res,body", body.data)
                                                                                                                            //console.log("err,res,body", body['result'].status)
                                                                                                                            //console.log("err,res,body", err, body['result'].status == 'success')
                                                                                                                            if (body.data) {
																																let chckbody = JSON.stringify(body.data);
																																if( !chckbody.includes('Error Page') ){
																																	if (body.data['result'].status == 'success') {
																																		df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
																																	} else {
																																		df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																																	}
																																} else {
																																	df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																																}
																															} else {
                                                                                                                                df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                            }
                                                                                                                        })
                                                                                                                    }).catch((err) => {
                                                                                                                        console.log("err in axios 281", err)
                                                                                                                        df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    })
                                                                                                                })
																											})
																										})
																									})
																								})
																							})
																						})
																					} else {
																						servicenowMdl.taskdatafrservicenowpincodeMdl(tcktdta.insertId).then(function (tskdata) {
																							servicenowMdl.utilizationCountMdl(engassgn ,engassgnId ,regassgn ,regassgnId ).then(function (utlztndata) {
																								var servicenowdata = {};
																								servicenowdata['notes'] = null
																								servicenowdata['tasks'] = [tskdata[0]];
																								console.log("tskdata", tskdata[0])
																								console.log("taskdatafrservicenowCtrl data", servicenowdata)
																								var options = {
																									method: 'post',
																									json: true,
																									url: as.url_servicenow.processNotification.urlApi,
                                                                                                    headers: {
                                                                                                        'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																										'content-type': 'application/json'
																									},
                                                                                                                            data: null,
                                                                                                                        }
                                                                                                                        options.data = servicenowdata
																								console.log("options", options)

																								servicenowMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                                                                    //request(options, function (err, resp, body) {
                                                                                                    return axios(options).then(function (body) {
                                                                                                        servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                                                                            console.log("err,res,body", body.data)
                                                                                                            //console.log("err,res,body", body['result'].status)
                                                                                                            //console.log("err,res,body", err, body['result'].status == 'success')
                                                                                                            if (body.data ) {
																												let chckbody = JSON.stringify(body.data);
																												if( !chckbody.includes('Error Page') ){
																													if (body.data['result'].status == 'success') {
																														df.serviceNowformatSucessRes(req, res, body.data, cntxtDtls, '', {});
																													} else {
																														df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																													}
																												} else {
																													df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																												}
																											} else {
                                                                                                                df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                            }
                                                                                                        })
                                                                                                    }).catch((err) => {
                                                                                                                        console.log("err in axios 281", err)
                                                                                                                        df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    })
                                                                                                })
																							})
																						})
																					}
                                                                                } else {
                                                                                    df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
                                                                                }
                                                                            })
                                                                        })
                                                                    }).catch((err) => {
                                                                        console.log("err", err)
                                                                        let error = 'Unknown owner identity'
                                                                        console.log("error", error)
                                                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                    })
                                                                }).catch((err) => {
                                                                    console.log("err", err)
                                                                    let error = 'Unknown owner identity'
                                                                    console.log("error", error)
                                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                                })
                                                            }).catch((err) => {
                                                                console.log("err", err)
                                                                let error = 'Unknown owner identity'
                                                                console.log("error", error)
                                                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                            })
                                                        }).catch((err) => {
                                                            console.log("err", err)
                                                            let error = 'Unknown owner identity'
                                                            console.log("error", error)
                                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                        })
                                                    }).catch((err) => {
                                                        console.log("err", err)
                                                        let error = 'Unknown owner identity'
                                                        console.log("error", error)
                                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                    })
                                                }).catch((err) => {
                                                    console.log("err", err)
                                                    let error = 'Unknown owner identity'
                                                    console.log("error", error)
                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                })
                                            }).catch((err) => {
                                                console.log("err", err)
                                                let error = 'Unknown owner identity'
                                                console.log("error", error)
                                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                            })
                                        }).catch((err) => {
                                            console.log("err", err)
                                            let error = 'Unknown owner identity'
                                            console.log("error", error)
                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        })
                                    } else {
                                        let error = 'Invalid Task Type'
                                        console.log("error", error)
                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    }
                                }).catch((err) => {
                                    console.log("err", err)
                                    let error = 'Unknown owner identity'
                                    console.log("error", error)
                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                })
                                /*}).catch((err) => { 
                                console.log("err",err)
                                    let error = 'No circut data'
                                        console.log("error",error)
                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                })*/
								} else {
										let error = 'Unknown owner identity'
                                                    console.log("error", error)
                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
									}
                            }).catch((err) => { //new code
                                console.log("err", err) //new code
                                let error = 'Unknown owner identity' //new code
                                console.log("error", error) //new code
                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error }); //new code
                            }) //new code
                        }).catch((err) => {
                            console.log("err", err)
                            let error = 'Unknown owner identity'
                            console.log("error", error)
                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                        })
                        /*} else {
                            let error = 'No Employee Free on This Pincode'
                            console.log("error",error)
                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                        }*/
                    }).catch((error) => {
                        console.log("error", error)
                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Invalid Department Code" });
                    })
                }
            }).catch((error) => {
                        console.log("error", error)
                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Invalid Department Code" });
                    })
        } else {
            servicenowMdl.chckpincodeemptaskMdl(req.body[0],engineer,rigger).then(function (pincodedata) {
                var addempdata;
                servicenowMdl.chckNopincodeemptaskMdl(req.body[0], pincodedata.length).then(function (empdata) {
                    servicenowMdl.chcksotcodeemptaskMdl(req.body[0], empdata.length).then(function (sotempdata) { //new code
					if(empdata.length > 0 || pincodedata.length > 0 || sotempdata.length > 0){
                        //var taskowner = empdata[0].emp_id //old code
                        var taskowner; //new code
                        if (empdata && empdata.length > 0) { //new code
                            taskowner = empdata[0].emp_id //new code
                        } else { //new code
                            taskowner = sotempdata[0].emp_id //new code
                        } //new code
                        if (pincodedata && pincodedata.length > 0) {
                            addempdata = pincodedata[0]
							engassgn = true;
							engassgnId = pincodedata[0].emp_id;
                        } else {
                            //addempdata = empdata[0] //old code
                            if (empdata && empdata.length > 0) { //new code
                                addempdata = empdata[0] //new code
                            } else { //new code
                                addempdata = sotempdata[0] //new code
                            } //new code
                        }
                        console.log("addempdata", addempdata)
                        //if(pincodedata && pincodedata.length > 0){ 
                        //servicenowMdl.checkcircuitdataMdl(req.body[0]).then(function(crcktdata){
                        servicenowMdl.gettaskcatIdMdl(req.body[0]).then(function (taskcatdata) {
                            if (taskcatdata.length > 0) {
                                servicenowMdl.getstateIdMdl(req.body[0]).then(function (statedata) {
                                    var statedataid = 0
                                    servicenowMdl.insrtstateIdMdl(req.body[0], statedata).then(function (insrtstsdata) {
                                        if (statedata.length == 0 && req.body[0].taskAddress.state != '' && req.body[0].taskAddress.state != null && req.body[0].taskAddress.state != undefined) {
                                            statedataid = insrtstsdata.insertId;
                                        } else if (statedata.length > 0) {
                                            statedataid = statedata[0].state_id
                                        }
                                        servicenowMdl.insrtcircuitdataMdl(req.body[0], 'crcktdata', addempdata, statedataid).then(function (insrtcrctdata) {
                                            var crctid;
                                            //if(crcktdata.length == 0){
                                            crctid = insrtcrctdata.insertId
                                            /*} else {
                                                crctid = insrtcrctdata[0].circuit_id
                                            }*/
                                            servicenowMdl.srvcnowcreatetaskMdl(req.body[0], addempdata, crctid, taskcatdata[0], pincodedata.length, taskowner, pincodeSNdata[0]).then(function (tcktdta) {
                                                servicenowMdl.getinsrttaskMdl(tcktdta.insertId).then(function (taskinsrtdata) {
                                                    servicenowMdl.srvcnowcreatetasksessionMdl(req.body[0], taskinsrtdata[0]).then(function (results) {
                                                        servicenowMdl.gettaskcolssessionMdl(taskinsrtdata[0]).then(function (tasksessndata) {
                                                            servicenowMdl.srvcnowcreatetaskcolssessionMdl(req.body[0], taskinsrtdata[0], tasksessndata).then(function (results) {
                                                                var task_no_tckt;
                                                                var task_srvc_tckt;
                                                                if (pincodedata && pincodedata.length > 0) {
                                                                    task_no_tckt = taskinsrtdata[0].task_no + "_" + 1;
                                                                    task_srvc_tckt = taskinsrtdata[0].service_no + "_" + 1;
                                                                }
                                                                servicenowMdl.srvcnowcreateParenttaskMdl(req.body[0], addempdata, crctid, taskcatdata[0], pincodedata.length, taskowner, task_no_tckt, task_srvc_tckt, tcktdta.insertId).then(function (parenttcktdta) {
                                                                    servicenowMdl.insrtasklogsdatabyIdMdl(req.body[0], taskinsrtdata[0], pincodedata.length, parenttcktdta).then(function (results) {
                                                                        var data = req.body;
                                                                        data[0]['assignees'] = [];
                                                                        data[0]['clusterIdentity'] = addempdata.cluster_name;
                                                                        console.log("last final data", data)
                                                                        if (pincodedata && pincodedata.length > 0) {
                                                                            if(engineer == 1 && rigger == 1){
																				servicenowMdl.chckpincodeRiggeremptaskMdl(req.body[0],engineer,rigger).then(function (pincodeRiggerdata) {
																					var task_no_tckt_reg;
																					var task_srvc_tckt_reg;
																					if (pincodeRiggerdata && pincodeRiggerdata.length > 0) {
																						regassgn = true;
																						regassgnId = pincodeRiggerdata[0].emp_id
																						task_no_tckt_reg = taskinsrtdata[0].task_no + "_" + 2;
																						task_srvc_tckt_reg = taskinsrtdata[0].service_no + "_" + 2;
																					}
																					servicenowMdl.srvcnowcreateRiggertaskMdl(req.body[0], pincodeRiggerdata[0], crctid, taskcatdata[0], pincodeRiggerdata.length, taskowner, task_no_tckt_reg, task_srvc_tckt_reg, tcktdta.insertId).then(function (parenttcktdta) {
																						servicenowMdl.getRiggerinsrttaskMdl(task_no_tckt_reg, pincodeRiggerdata.length).then(function (RiggerTask) { 
																							servicenowMdl.insrtasklogsRiggerdatabyIdMdl(req.body[0], RiggerTask, pincodeRiggerdata.length, parenttcktdta).then(function (results) { 
																								servicenowMdl.taskdatafrservicenowpincodeMdl(tcktdta.insertId).then(function (tskdata) {
																									servicenowMdl.utilizationCountMdl(engassgn ,engassgnId ,regassgn ,regassgnId ).then(function (utlztndata) {
																										var servicenowdata = {};
																										servicenowdata['notes'] = null
																										servicenowdata['tasks'] = [tskdata[0]];
																										console.log("tskdata", tskdata[0])
																										console.log("taskdatafrservicenowCtrl data", servicenowdata)
																										var options = {
																											method: 'post',
																											json: true,
																											url: as.url_servicenow.processNotification.urlApi,
                                                                                                            headers: {
                                                                                                                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																												'content-type': 'application/json'
																											},
                                                                                                            data: null,
                                                                                                        }
                                                                                                        options.data = servicenowdata
																										console.log("options", options)

																										servicenowMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                                                                            //request(options, function (err, resp, body) {
                                                                                                            return axios(options).then(function (body) {
                                                                                                                servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                                                                                    console.log("err,res,body", body.data)
                                                                                                                    //console.log("err,res,body", body['result'].status)
                                                                                                                    //console.log("err,res,body", err, body['result'].status == 'success')
                                                                                                                    if (body.data) {
																														let chckbody = JSON.stringify(body.data);
																														if( !chckbody.includes('Error Page') ){
																															if (body.data['result'].status == 'success') {
																																df.serviceNowformatSucessRes(req, res, body.data, cntxtDtls, '', {});
																															} else {
																																df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																															}
																														} else {
																															df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																														}
																													} else {
                                                                                                                        df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    }
                                                                                                                })
                                                                                                            }).catch((err) => {
                                                                                                                        console.log("err in axios 281", err)
                                                                                                                        df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    })
                                                                                                        })
																									})
																								})
																							})
																						})
																					})
																				})
																			} else {
																				servicenowMdl.taskdatafrservicenowpincodeMdl(tcktdta.insertId).then(function (tskdata) {
																					servicenowMdl.utilizationCountMdl(engassgn ,engassgnId ,regassgn ,regassgnId ).then(function (utlztndata) {
																						var servicenowdata = {};
																						servicenowdata['notes'] = null
																						servicenowdata['tasks'] = [tskdata[0]];
																						console.log("tskdata", tskdata[0])
																						console.log("taskdatafrservicenowCtrl data", servicenowdata)
																						var options = {
																							method: 'post',
																							json: true,
																							url: as.url_servicenow.processNotification.urlApi,
                                                                                            headers: {
                                                                                                'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
																								'content-type': 'application/json'
																							},
                                                                                                            data: null,
                                                                                                        }
                                                                                                        options.data = servicenowdata
																						console.log("options", options)

																						servicenowMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                                                            //request(options, function (err, resp, body) {
                                                                                            return axios(options).then(function (body) {
                                                                                                servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                                                                    console.log("err,res,body", body.data)
                                                                                                    //console.log("err,res,body", body['result'].status)
                                                                                                    //console.log("err,res,body", err, body['result'].status == 'success')
                                                                                                    if (body.data) {
																										let chckbody = JSON.stringify(body.data);
																										if( !chckbody.includes('Error Page') ){
																											if (body.data['result'].status == 'success') {
																												df.serviceNowformatSucessRes(req, res, body.data, cntxtDtls, '', {});
																											} else {
																												df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																											}
																										} else {
																											df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
																										}
																									} else {
                                                                                                        df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                    }
                                                                                                })

                                                                                            }).catch((err) => {
                                                                                                                        console.log("err in axios 281", err)
                                                                                                                        df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
                                                                                                                    })
                                                                                        })
																					})
																				})
																			}
                                                                        } else {
                                                                            df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
                                                                        }
                                                                    })
                                                                })
                                                            }).catch((err) => {
                                                                console.log("err", err)
                                                                let error = 'Unknown owner identity'
                                                                console.log("error", error)
                                                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                            })
                                                        }).catch((err) => {
                                                            console.log("err", err)
                                                            let error = 'Unknown owner identity'
                                                            console.log("error", error)
                                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                        })
                                                    }).catch((err) => {
                                                        console.log("err", err)
                                                        let error = 'Unknown owner identity'
                                                        console.log("error", error)
                                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                    })
                                                }).catch((err) => {
                                                    console.log("err", err)
                                                    let error = 'Unknown owner identity'
                                                    console.log("error", error)
                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                                })
                                            }).catch((err) => {
                                                console.log("err", err)
                                                let error = 'Unknown owner identity'
                                                console.log("error", error)
                                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                            })
                                        }).catch((err) => {
                                            console.log("err", err)
                                            let error = 'Unknown owner identity'
                                            console.log("error", error)
                                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                        })
                                    }).catch((err) => {
                                        console.log("err", err)
                                        let error = 'Unknown owner identity'
                                        console.log("error", error)
                                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                    })
                                }).catch((err) => {
                                    console.log("err", err)
                                    let error = 'Unknown owner identity'
                                    console.log("error", error)
                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                                })
                            } else {
                                let error = 'Invalid Task Type'
                                console.log("error", error)
                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                            }
                        }).catch((err) => {
                            console.log("err", err)
                            let error = 'Unknown owner identity'
                            console.log("error", error)
                            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                        })
                        /*}).catch((err) => { 
                        console.log("err",err)
                            let error = 'No circut data'
                                console.log("error",error)
                                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                        })*/
						} else {
										let error = 'Unknown owner identity'
                                                    console.log("error", error)
                                                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
									}
                    }).catch((err) => { //new code
                        console.log("err", err) //new code
                        let error = 'Unknown owner identity' //new code
                        console.log("error", error) //new code
                        df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error }); //new code
                    }) //new code
                }).catch((err) => {
                    console.log("err", err)
                    let error = 'Unknown owner identity'
                    console.log("error", error)
                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                })
                /*} else {
                    let error = 'No Employee Free on This Pincode'
                    console.log("error",error)
                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                }*/
            }).catch((error) => {
                console.log("error", error)
                df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Invalid Department Code" });
            })
        }
        }
			}).catch((err)=>{
				console.log("err", err)
				df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "400", err_message: "Invalid Department Code" });
			})
    } else if (req.body[0].taskAction == 'UPDATE') {
        servicenowMdl.gettaskdetailsMdl(req.body[0]).then(function (tskdata) {
            servicenowMdl.chckNopincodeemptaskMdl(req.body[0], 1).then(function (empdata) {
                if (empdata.length > 0 && tskdata.length > 0) {
                    servicenowMdl.getSottaskScnClsdetailsMdl(tskdata[0]).then(function (sottskdata) {
                        servicenowMdl.updateSottaskScnClsdetailsMdl(tskdata[0], sottskdata, empdata[0]).then(function (updtdtls) {
                            var data = req.body;
                            df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
                        })
                    })
                } else {
                    let error = 'Unknown owner identity'
                    console.log("error", error)
                    df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
                }
            })
        })
    } else { 
        servicenowMdl.gettaskdetailsMdl(req.body[0]).then(function (tskdata) {
			if(tskdata.length > 0){
			servicenowMdl.childtaskdataMdl(req.body[0], tskdata[0]).then(function (childChktskdata) {
				if(childChktskdata.length == 0){
					servicenowMdl.childtaskdataMdl(req.body[0], tskdata[0]).then(function (childtskdata) {
						if (childtskdata.length > 0) {
							servicenowMdl.childtaskdatafrutilizationMdl(req.body[0], tskdata[0]).then(function (utlztntskdata) {
								servicenowMdl.taskdatafrRejectservicenowMdl(tskdata[0]).then(function (rejecttskdata) {
									var data = req.body;
									data[0]['assignees'] = [];
									data[0]['clusterIdentity'] = [];
									var servicenowdata = {};
									servicenowdata['notes'] = null
									servicenowdata['tasks'] = [rejecttskdata[0]];
									console.log("rejecttskdata", rejecttskdata[0])
									console.log("taskdatafrservicenowCtrl data", servicenowdata)
									var options = {
										method: 'post',
										json: true,
										url: as.url_servicenow.processNotification.urlApi,
										headers: {
											'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
											'content-type': 'application/json'
										},
                                            data: null,
                                        }
                                        options.data = servicenowdata;
									console.log("options", options)

									servicenowMdl.insrtapicalldtlsMdl(req.body, rejecttskdata[0], options, web_app, req.user).then(function(apicallinsrt){
										//request(options, function (err, resp, body) {
										return axios(options).then(function (body) {
											servicenowMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
												console.log("err,res,body", body.data)
												//console.log("err,res,body", body['result'].status)
												//console.log("err,res,body", err, body['result'].status == 'success')
												//console.log("err,res,body", check)
												if (body.data) {
													let chckbody = JSON.stringify(body.data);
													if( !chckbody.includes('Error Page') ){
														if (body.data['result'].status == 'success') {
															servicenowMdl.utilizationReduceCountMdl(utlztntskdata[0].call_attnd ).then(function (utlztndata) {
																servicenowMdl.taskcanceldatafrservicenowMdl(req.body[0], tskdata[0]).then(function (updtdata) {
																	servicenowMdl.tasklogcanceldataMdl(req.body[0], tskdata[0], childtskdata).then(function (tsklogdata) {
																		df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
																	}).catch((error) => {
																		console.log("error", error)
																		df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Error in tsk logs the ticket" });
																	})
																
																}).catch((error) => {
																	console.log("error", error)
																	df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Error in caceling the ticket" });
																})
															})
														} else {
															df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
														}
													} else {
														df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
													}
												} else {
													df.serviceNowformatErrorRes(req, res, body.data, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
												}
											})
										}).catch((err) => {
											console.log("err in axios 281", err)
											df.serviceNowformatErrorRes(req, res, err, cntxtDtls, '', { error_status: "707", err_message: "Unknown owner identity" });
										})
									})
								})
							})
						} else {
							servicenowMdl.taskcanceldatafrservicenowMdl(req.body[0], tskdata[0]).then(function (updtdata) {
								servicenowMdl.tasklogcanceldataMdl(req.body[0], tskdata[0], childtskdata).then(function (tsklogdata) {
									var data = req.body;
									data[0]['assignees'] = [];
									data[0]['clusterIdentity'] = [];
									df.serviceNowformatSucessRes(req, res, data, cntxtDtls, '', {});
								}).catch((error) => {
									console.log("error", error)
									df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Error in tsk logs the ticket" });
								})
							}).catch((error) => {
								console.log("error", error)
								df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Error in caceling the ticket" });
							})
						}
					}).catch((error) => {
						console.log("error", error)
						df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "No child Tasks ticket" });
					})
				} else {
					let error = 'FE already in Travel'
					//console.log("error", error)
					df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "FE already in Travel" });
				}
			}).catch((error) => {
				//let error = "No child Tasks ticket" 
				console.log("error", error)
				df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "No child Tasks ticket" });
			})
			} else {
				let error = "Cannot Fetch the Ticket" 
				console.log("error", error)
				df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Cannot Fetch the Ticket" });
			}
        }).catch((error) => {
			//let error = "Cannot Fetch the Ticket" 
            console.log("error", error)
            df.serviceNowformatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: "Cannot Fetch the Ticket" });
        })
    }
}

/**************************************************************************************
* Controller     : taskdatafrservicenowCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.taskdatafrservicenowCtrl = (req, res) => {
	var fnm = `taskdatafrservicenowCtrl`

	servicenowMdl.taskdatafrservicenowMdl(req.body).then(function(tskdata){
		console.log("tskdata",tskdata[0])
		if(tskdata && tskdata.length > 0){
			var data = {};
			data['notes'] = null
			data['tasks'] = [tskdata[0]];
			//Object.keys(tskdata).filter((k) => {
			//tskdata.filter((k) => {
				//console.log("filter k.length", k.length)
				//console.log("filter k", k)
				//Object.keys(k).filter((keys) => {
				//	data['tasks'].push({[keys]:k[keys]});
				//})
			//})
			console.log("taskdatafrservicenowCtrl data",data)
			df.formatSucessRes(req, res, data, cntxtDtls, '', {});
			//var options = {
				//method: 'post',
				//json: true,
				//url: 'https://mercury-uat.phonepe.com/v4/debit##',
				//headers: {
				  //'x-verify': Xverify,
				  //'content-type': 'application/json'
				//},
				//body: { request: objJsonB64 },
			//}
			//request(options, function (err, res, body) {
			
			//})
		} else {
			let error = 'No Tasks Found'
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		}
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : taskchilddatafrservicenowCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 20/04/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.taskchilddatafrservicenowCtrl = (req, res) => {
	var fnm = `taskchilddatafrservicenowCtrl` 
	servicenowMdl.checkcountoftaskidMdl(req.body, req.user).then(function(results){
		var task_no_tckt = req.body.task_no + "_" + (parseInt(results[0].ct) + 1);
		var task_srvc_tckt = req.body.service_no + "_" + (parseInt(results[0].ct) + 1);
		console.log("task_tckt",task_no_tckt)
		console.log("srvc_tckt",task_srvc_tckt)
		servicenowMdl.gettaskdatabyIdMdl(req.body, req.user).then(function(taskdata){
			servicenowMdl.insrttaskchilddatafrservicenowMdl(req.body, taskdata[0],task_no_tckt,task_srvc_tckt, req.user).then(function(results){
				df.formatSucessRes(req, res, results, cntxtDtls, '', {});
			}).catch((error) => { 
				console.log("error",error)
				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
			})
		}).catch((error) => { 
			console.log("error",error)
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		})
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : taskdataCasefrservicenowCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 25/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.taskdataCasefrservicenowCtrl = (req, res) => {
	var fnm = `taskdataCasefrservicenowCtrl`

	var options = {
		method: 'post',
		json: true,
		url: as.url_servicenow.getLinkStatusbyCase.urlApi,
		headers: {
            "Authorization" : as.url_servicenow.getLinkStatusbyCase.headerDtls.Authorization,
		  'content-type': 'application/json'
		},
        data: null,
    }
    options.data = {
        "caseNumber": req.body.caseNumber,
        "LGTaskId": req.body.LGTaskId
    }
	console.log("options",options)
	//request(options, function (err, resp, body) {
	return axios(options).then(function (body) {
		console.log("err,res,body", body.data)
		//console.log("err,res,body",  body['result'].status)
		//console.log("err,res,body",err, body['result'].status=='success')
		//if(body['result']['message'].includes('UAT Success : Connected to')){  
		if(body.data){ 
			let chckbody = JSON.stringify(body.data);
			if( !chckbody.includes('Error Page') ){
				if(body.data['result'].status=='success'){  
					var data = {};
					data['task_status']=225;
					data['service_no']= req.body.LGTaskId
					data['call_attend_by'] = req.body.call_attend_by
					servicenowMdl.updatetask_mobile_Mdl(data, req.user).then(function (updttaskdata) {
						console.log("updatetask_mobile_Mdl")
						servicenowMdl.gettaskdtlsinsrttaskMdl(data, req.user).then(function (result) {
							servicenowMdl.updatetasklogsMdl(data, result[0], req.user).then(function (results) {
								console.log("updatetasklogsMdl")
								df.formatSucessRes(req, res, updttaskdata, cntxtDtls, '', {});
							}).catch(function (error) {
								console.log("error updatetasklogsMdl",error)
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							});
						}).catch(function (error) {
							console.log("error gettaskdtlsinsrttaskMdl",error)
							df.formatErrorRes(req, res, error, cntxtDtls, '', {});
						});
						//df.formatSucessRes(req, res, updttaskdata, cntxtDtls, '', {});
					}).catch(function (error) {
						console.log("error updatetask_mobile_Mdl",error)
						df.formatErrorRes(req, res, error, cntxtDtls, '', {});
					});
				} else {
					df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "402", err_message: body.data });
				}
			} else {
				df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "402", err_message: body.data });
			}
		} else {
			df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "402", err_message: body.data });
		}
	
	}).catch(function (error) {
                console.log("error updatetask_mobile_Mdl", error)
                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            });
}

/**************************************************************************************
* Controller     : uatsuccessserviceNowCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 30/05/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.uatsuccessserviceNowCtrl = (req, res) => {
	var fnm = `uatsuccessserviceNowCtrl` 
	servicenowMdl.uatsuccessserviceNowMdl(req.body, req.user).then(function(results){ 
		if(results.length > 0){ 
			
				servicenowMdl.taskdatafrservicenowUatSuccessMdl(results[0], req.body, req.user).then(function (tskdata) {
						console.log(tskdata.length,"tskdata.lengthtskdata.lengthtskdata.lengthtskdata.length")
                        if(tskdata && tskdata.length > 0){
							var data = {};
							data['notes'] = null
							data['tasks'] = [tskdata[0]];
							var checklistData = {}
							//console.log("tskdata[0].formID",tskdata[0].formID)
							//checklistData[tskdata[0].formID] = [JSON.stringify(tskdata[0].checklistData)];
							//console.log("checklistData",checklistData)
							//data['tasks'][0]['checklistData'] = checklistData;
							console.log("taskdatafrservicenowCtrl data.tasks",data.tasks)
							var options = {
								method: 'post',
								json: true,
								url: as.url_servicenow.processNotification.urlApi,
                                headers: {
                                    'Authorization': as.url_servicenow.processNotification.headerDtls.Authorization,
									'content-type': 'application/json'
								},
                        data: null,
                    }
                    options.data = data
							console.log("options",options)
							//console.log("options",options.body)
							//request(options, function (err, respnse, body) {
							return axios(options).then(function (body) {
								console.log("err, respnse, body", body.data)
								if(body.data){
									let chckbody = JSON.stringify(body.data);
									if( !chckbody.includes('Error Page') ){
										if(body.data['result'].status=='success'){
											servicenowMdl.uatUpdatesuccessserviceNowMdl(req.body, results[0], req.user).then(function(taskdata){
												df.serviceNowUatSuccessformatSucessRes(req, res,body.data,cntxtDtls, '', {}); 
											}).catch((error) => { 
												console.log("error",error)
												var err = "Invalid task status for UAT success.";
												df.formatUatSuccessErrorRes(req, res, error, cntxtDtls, '', { error_status: "400", err_message: err });
											})
										} else {
											df.formatUatSuccessFailedErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "failed" });
										}
									} else {
										df.formatUatSuccessFailedErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "failed" });
									}
								} else {
									df.formatUatSuccessFailedErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "failed" });
								}
							}).catch(function (error) {
								console.log("error 1261",error)
                            df.formatUatSuccessErrorRes(req, res, error, cntxtDtls, '', {});
                        });
						} else {
							df.serviceNowUatSuccessformatSucessRes(req, res, results, cntxtDtls, '', {});
						}
					}).catch(function (error) {
                        df.formatUatSuccessErrorRes(req, res, error, cntxtDtls, '', {});
                    });
				//df.serviceNowUatSuccessformatSucessRes(req, res, results, cntxtDtls, '', {});
			
		} else {
			var err = "Invalid task status for UAT success.";
			df.formatUatSuccessErrorRes(req, res, err, cntxtDtls, '', { error_status: "400", err_message: err });
		}
	}).catch((error) => { 
		console.log("error",error)
		var err = "Invalid task status for UAT success."
		df.formatUatSuccessErrorRes(req, res, error, cntxtDtls, '', { error_status: "400", err_message: err });
	})
}

/**************************************************************************************
* Controller     : appVersioncheckCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.appVersioncheckCtrl = (req, res) => {
	var fnm = `appVersioncheckCtrl`
	servicenowMdl.appVersioncheckMdl(req.body, req.user).then(function(taskdata){
		df.formatSucessRes(req, res,taskdata,cntxtDtls, '', {}); 
	}).catch((error) => { 
		console.log("error",error)
		var err = "Invalid task status for UAT success.";
		df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "400", err_message: err });
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
exports.getattendencedataforservicenowCtrl = (req, res) => {
    
    servicenowMdl.getattendencedataforservicenowMdl(req.body, req.user)
        .then(function (results) {
            let newResults = {}
            newResults.date  = req.body.fromTimestamp.split(" ")[0];
            console.log(results,"resultsresultsresultsresultsresults")
            results.forEach((r) => {
               
                r['clusters'] = r['clusters'].split(',')
                if(r['punchInLatitude'] != null && r['punchInLatitude'] != undefined){
                    let lat_long = r['punchInLatitude'].split(" ")
                    
                    r['punchInLatitude'] = lat_long[0]
                    
                    r['punchInLongitude'] = lat_long[1]

                }else{
                    r['punchInLongitude'] = null
                }

            })
            newResults.users = results
           // console.log(newResults,"newResultsnewResultsnewResultsnewResults")
                df.serviceNowattendenceformatSucessRes(req, res, [newResults], cntxtDtls, '', {});
        }).catch(function (error) {
            //df.formatErrorRes(req, res, error, cntxtDtls, '', {});
            df.serviceNowattendenceformatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}