var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var tasksectionsMdl = require(appRoot + '/server/modules/tasksections/models/tasksectionsMdl');
const fs = require('fs')
const mime = require('mime');
moment = require('moment');
var request = require('request');
var axios = require('axios')

var taskMdl = require(appRoot + '/server/modules/task/models/taskMdl');

/**************************************************************************************
* Controller     : inserttasksectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasksectionsCtrl = (req, res) => {

    tasksectionsMdl.inserttasksectionsMdl(req.body, req.user)
        .then(function (results) {
		
				var insertid=results .insertId
				console.log("insertedid",insertid)
			tasksectionsMdl.inserttasksectiontosolsMdl(req.body,insertid, req.user)
		
        .then(function (results) {
			
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		})
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
		
}
/**************************************************************************************
* Controller     : updatetasksectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetasksectionsCtrl = (req, res) => {

    tasksectionsMdl.updatetasksectionsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettasksectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.gettasksectionsCtrl = (req, res) => {

    tasksectionsMdl.gettasksectionsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : deletetasksectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.deletetasksectionsCtrl = (req, res) => {

    tasksectionsMdl.deletetasksectionsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getbyidtasksectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getbyidtasksectionsCtrl = (req, res) => {

    tasksectionsMdl.getbyidtasksectionsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : inserttasksectionscolsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttasksectionscolsCtrl = (req, res) => {

    tasksectionsMdl.inserttasksectionscolsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : inserttasksectionscolsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetasksectionscolsCtrl = (req, res) => {

    tasksectionsMdl.updatetasksectionscolsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : inserttasksectionscolsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.gettasksectionscolsCtrl = (req, res) => {

    tasksectionsMdl.gettasksectionscolsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getbytasksectionscolsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getbytasksectionscolsCtrl = (req, res) => {

    tasksectionsMdl.getbytasksectionscolsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : deletesectionscolsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.deletesectionscolsCtrl = (req, res) => {

    tasksectionsMdl.deletesectionscolsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettaskidsectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.gettaskidsectionsCtrl = (req, res) => {

    tasksectionsMdl.gettaskidsectionsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettaskcolsidsectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.gettaskcolsidsectionsCtrl = (req, res) => {

    tasksectionsMdl.gettaskcolsidsectionsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettaskcolsidsectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentnotesCtrl = (req, res) => {
	let web_app = 6
	console.log("req.data web",req.body)
	function img_upload(img, filename, callback) {
        var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
			console.log("i'm in matches!")
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
        var dir = '/home/centos/glits/production/uploads/'+month+'/'+formatdate+'' ;
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
						//var location = 'http://202.53.92.34:3533/images/'+month+'/'+formatdate+'/'+fileName+'';
						var location = 'http://sify.digitalrupay.com/prodimages/'+month+'/'+formatdate+'/'+fileName+'';
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
					//var location = 'http://202.53.92.34:3533/images/'+month+'/'+formatdate+'/'+fileName+'';
					var location = 'http://sify.digitalrupay.com/prodimages/'+month+'/'+formatdate+'/'+fileName+'';
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
	
				
						var filename2 = 'image_sample_'+req.body.task_id+'_'+req.body.emp_id+'';
						img_upload(req.body.img, filename2, (err, imgpath) => {
							console.log("i'm in images!")
							if (!err) {
									 tasksectionsMdl.taskdocumentnotesCtrlMdl(req.body,imgpath, req.user)
                                          .then(function (results_notes) {
											  	tasksectionsMdl.inserttasklogMdl (req.body,req.user)
                                                   .then(function (results) {

                                                    if(req.body.note != '' && req.body.note != null && req.body.note != undefined){
                            
                                                        tasksectionsMdl.tasknotestrnfrtoservicenow_web_Mdl(req.body,req.user, results_notes).then(function(notesdatatotransfer){
                                                            let data = {}
                                                            data["notes"] = [notesdatatotransfer[0]]
                                                            console.log(data,"datadatadata")
                                                            var options = {
                                                                method: 'post',
                                                                json: true,
                                                                url: as.url_servicenow.servicenowNotesApi.urlApi,
                                                                headers: {
                                                                    'Authorization': as.url_servicenow.servicenowNotesApi.headerDtls.Authorization,
                                                                    'content-type': 'application/json'
                                                                },
                                                                data: null,
                                                            }
															options.data = data
                            
                                                            console.log("options",options)
                                                            tasksectionsMdl.insrtnotesapicalldtlsMdl(req.body, notesdatatotransfer[0], options, web_app, req.user).then(function(apicallinsrt){
																//request(options, function (err, resp, body) {
																return axios(options).then((body) => {
																	tasksectionsMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
																		console.log("err,res,body", body.data)
																		console.log("options",options)
																		//console.log("err,res,body",  body['result'].status)
																		//console.log("err,res,body",err, body['result'].status=='success')
																		if(body.data){
																			let chckbody = JSON.stringify(body.data);
																			if( !chckbody.includes('Error Page') ){
																				if(body.data['result'].status=='success'){
																					df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																				}else{
																					let error = 'unable to send to ServiceNow'
																					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																				}
																			}else{
																				let error = 'unable to send to ServiceNow'
																				df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																			}
																		}else{
																			let error = 'unable to send to ServiceNow'
																			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																		}
									
																	})
																}).catch(function (error) {
																	console.log("error 377", error);
																	df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
																});
															})
                                                        }).catch(function (error) {
                                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                        });
                                                    }else{
                                                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                                    }

                                  
                                    }).catch(function (error) {
                                  df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                  });
										  })
							} else {
								let error = 'error occured, please try again'
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							}
						})		
		
					
            }
        else {
	       tasksectionsMdl.taskdocumentparentnotesCtrlMdl(req.body, req.user)
                    .then(function (results_notes) {
							tasksectionsMdl.inserttasklogMdl (req.body,req.user)
                                    .then(function (results) {

                                        tasksectionsMdl.tasknotestrnfrtoservicenow_web_Mdl(req.body,req.user, results_notes).then(function(notesdatatotransfer){
                                            let data = {}
                                            data["notes"] = [notesdatatotransfer[0]]
                                            console.log(data,"datadatadata")
                                            var options = {
                                                method: 'post',
                                                json: true,
                                                url: as.url_servicenow.servicenowNotesApi.urlApi,
                                                headers: {
                                                    'Authorization': as.url_servicenow.servicenowNotesApi.headerDtls.Authorization,
                                                    'content-type': 'application/json'
                                                },
                                                                data: null,
                                                            }
															options.data = data
            
                                            console.log("options",options)
                                            tasksectionsMdl.insrtnotesapicalldtlsMdl(req.body, notesdatatotransfer[0], options, web_app, req.user).then(function(apicallinsrt){
                                                //request(options, function (err, resp, body) {
                                                return axios(options).then((body) => {
                                                    tasksectionsMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
														console.log("err,res,body", body.data)
														console.log("options",options)
														//console.log("err,res,body",  body['result'].status)
														//console.log("err,res,body",err, body['result'].status=='success')
														if(body.data){  
															let chckbody = JSON.stringify(body.data);
															if( !chckbody.includes('Error Page') ){	
																if(body.data['result'].status=='success'){
																	df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																}else{
																	let error = 'unable to send to ServiceNow'
																	df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																}
															} else {
																df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "402", err_message: body.data });
															}
														} else {
															df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "402", err_message: body.data });
														}
													})
												}).catch(function (error) {
													console.log("error 449", error);
													df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
												});
											})
                                        }).catch(function (error) {
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        });

                                    }).catch(function (error) {
                                df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                  });
								})
}


						
}
/**************************************************************************************
* Controller     : gettaskidsectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getcommentslistCtrl = (req, res) => {

    tasksectionsMdl.getcommentslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettaskcolsidsectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentnotesappCtrl = (req, res) => {
	let web_app = 6
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
        var dir = '/home/centos/glits/production/uploads/'+month+'/'+formatdate+'' ;
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
						//var location = 'http://202.53.92.34:3533/images/'+month+'/'+formatdate+'/'+fileName+'';
						var location = 'http://sify.digitalrupay.com/prodimages/'+month+'/'+formatdate+'/'+fileName+'';
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
					//var location = 'http://202.53.92.34:3533/images/'+month+'/'+formatdate+'/'+fileName+'';
					var location = 'http://sify.digitalrupay.com/prodimages/'+month+'/'+formatdate+'/'+fileName+'';
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
	
				
						var filename2 = 'image_sample_'+req.body.task_id+'_'+req.body.emp_id+'';
						img_upload(req.body.img, filename2, (err, imgpath) => {
							console.log("i'm in images!")
							if (!err) {
									tasksectionsMdl.taskdocumentnotesappMdl(req.body,imgpath, req.user)
                                        .then(function (results_notes) {
									tasksectionsMdl.inserttasklogappMdl (req.body,req.user)
                                        .then(function (results) {

                                            if(req.body.note != '' && req.body.note != null && req.body.note != undefined){
                                        
                                                tasksectionsMdl.tasknotestrnfrtoservicenow_app_Mdl(req.body,req.user, results_notes).then(function(notesdatatotransfer){
                                                    let data = {}
                                                    data["notes"] = [notesdatatotransfer[0]]
                                                    console.log(data,"datadatadata")
                                                    var options = {
                                                        method: 'post',
                                                        json: true,
                                                        url: as.url_servicenow.servicenowNotesApi.urlApi,
                                                        headers: {
                                                            'Authorization': as.url_servicenow.servicenowNotesApi.headerDtls.Authorization,
                                                            'content-type': 'application/json'
                                                        },
                                                                data: null,
                                                            }
															options.data = data
                    
                                                    console.log("options",options)
                                                    tasksectionsMdl.insrtnotesapicalldtlsMdl(req.body, notesdatatotransfer[0], options, web_app, req.user).then(function(apicallinsrt){
														//request(options, function (err, resp, body) {
														return axios(options).then((body) => {
															tasksectionsMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
															console.log("err,res,body", body.data)
															console.log("options",options)
															//console.log("err,res,body",  body['result'].status)
															//console.log("err,res,body",err, body['result'].status=='success')
																if(body.data){  
																	let chckbody = JSON.stringify(body.data);
																	if( !chckbody.includes('Error Page') ){
																		if(body.data['result'].status=='success'){
																			df.formatSucessRes(req, res, results, cntxtDtls, '', {});
																		}else{
																			let error = 'unable to send to ServiceNow'
																			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																		}
																	}else{
																		let error = 'unable to send to ServiceNow'
																		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
																	}
															}else{
																let error = 'unable to send to ServiceNow'
																df.formatErrorRes(req, res, error, cntxtDtls, '', {});
															}
							
															})
														}).catch(function (error) {
														console.log("error 623", error);
														df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
													});
													})
                                                }).catch(function (error) {
                                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                                });
                                            }else{
                                                df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                                            }

                                    }).catch(function (error) {
                                  df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                  });
										  })
							} else {
								let error = 'error occured, please try again'
								df.formatErrorRes(req, res, error, cntxtDtls, '', {});
							}
						})		
		
					
            }
        else {
	       tasksectionsMdl.taskdocumentnotesappMdl(req.body, req.user)
                    .then(function (results_notes) {
				tasksectionsMdl.inserttasklogappMdl (req.body,req.user)
                            .then(function (results) {

                                tasksectionsMdl.tasknotestrnfrtoservicenow_app_Mdl(req.body,req.user, results_notes).then(function(notesdatatotransfer){
                                    let data = {}
                                    data["notes"] = [notesdatatotransfer[0]]
                                    console.log(data,"datadatadata")
                                    var options = {
                                        method: 'post',
                                        json: true,
                                        url: as.url_servicenow.servicenowNotesApi.urlApi,
                                        headers: {
                                            'Authorization': as.url_servicenow.servicenowNotesApi.headerDtls.Authorization,
                                            'content-type': 'application/json'
                                        },
                                                                data: null,
                                                            }
															options.data = data
    
                                    console.log("options",options)
                                    tasksectionsMdl.insrtnotesapicalldtlsMdl(req.body, notesdatatotransfer[0], options, web_app, req.user).then(function(apicallinsrt){
										//request(options, function (err, resp, body) {
										return axios(options).then((body) => {
											tasksectionsMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
												console.log("err,res,body", body.data)
												console.log("options",options)
												//console.log("err,res,body",  body['result'].status)
												//console.log("err,res,body",err, body['result'].status=='success')
												if(body.data){  
													let chckbody = JSON.stringify(body.data);
													if( !chckbody.includes('Error Page') ){
														if(body.data['result'].status=='success'){
															df.formatSucessRes(req, res, results, cntxtDtls, '', {});
														}else{
															let error = 'unable to send to ServiceNow'
															df.formatErrorRes(req, res, error, cntxtDtls, '', {});
														}
													}else{
														let error = 'unable to send to ServiceNow'
														df.formatErrorRes(req, res, error, cntxtDtls, '', {});
													}
												}else{
													let error = 'unable to send to ServiceNow'
													df.formatErrorRes(req, res, error, cntxtDtls, '', {});
												}
			
											})
										}).catch(function (error) {
											console.log("error 697", error);
											df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
										});
									})
                                }).catch(function (error) {
                                    df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });


                        
                                }).catch(function (error) {
                                  df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                });
										  })
}


						
}
/**************************************************************************************
* Controller     : getcommentslistappCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getcommentslistappCtrl = (req, res) => {

    tasksectionsMdl.getcommentslistappMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getfamidbasedlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getfamidbasedlistCtrl = (req, res) => {
	console.log("req.data",req.body)
	
    tasksectionsMdl.getfamidbasedlistMdl(req.body, req.user)
        .then(function (results) {
		
		if(results.length > 0) {
            var str1 = JSON.stringify(results[0].tabs);
            str1 = results[0].tabs.replace(/\\/g,'');
             str1 = JSON.parse(str1);
          results[0].tabs = str1
            console.log("str1",str1)
		
		df.formatSucessRes(req, res,results[0],cntxtDtls, '', {});
		} else {
			df.formatSucessRes(req, res,[],cntxtDtls, '', {});
		}
        }).catch(function (error) {
			console.log("error",error);
            df.formatErrorRes(req, res, error, cntxtDtls, '', {error_status: "200", err_message: "no data found"});
        });
		
     // } else {
			//let error = 'No data found'
			//df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		//}

}
/**************************************************************************************
* Controller     : chcklistsubmitDataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.chcklistsubmitDataCtrl = function (req, res) {
	var fnm = "chcklistsubmitDataCtrl";
	let web_app = 2
	tasksectionsMdl.chcklistsubmitDataMdl(req.body,req.user).then((results) => {
		tasksectionsMdl.inserttasklogDataMdl(req.body,req.user).then((results) => {
			tasksectionsMdl.gettasktabMdl(req.body,req.user).then((results) => {
				var taskid = results.task_id
				tasksectionsMdl.upadtetasktablestatusMdl(req.body,taskid,req.user).then((results) => {

                    // taskMdl.gettaskticketsnamesMdl(req.body,req.user)
                    // .then(function (task_details) {
                    //     req.body.task_category = task_details[0].task_category
                    //    const text = task_details[0].emp_username + ' task assigned to you is updated with Order Number : ' + task_details[0].service_no + '. Please refresh your task list.';
                        // taskMdl.insertnotifyMdl(req.body,task_details[0].service_no, req.user, text)
                        // .then(function (ntfcn) {
                           

                            // const newtitle = 'taskUpdateNotification' ;
                            // let taskkind = 'task'
                            // var QRY_TO_EXEC = `select e.fcm_id as fcm_tkn from tasks as t
                            //     join employees as e on e.emp_id=t.call_attend_by where t.task_id = ${req.body.task_id} and e.sms_flag=0 limit 1`;

                            //    taskMdl.sendPushNotificationMdl(req.body, task_details[0].service_no , req.user,text,newtitle, QRY_TO_EXEC, taskkind, ntfcn.insertId, function (err, resp) {

                                    tasksectionsMdl.taskdatafrservicenowmngrapprlMdl(req.body, req.user).then(function (tskdata) {
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
                                            taskMdl.insrtapicalldtlsMdl(req.body, tskdata[0], options, web_app, req.user).then(function(apicallinsrt){
                                                //request(options, function (err, resp, body) {
                                                return axios(options).then((body) => {
                                                    taskMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
                                                        console.log("err, respnse, body", body.data)
														if(body.data){  
															let chckbody = JSON.stringify(body.data);
															if( !chckbody.includes('Error Page') ){
																if(body.data['result'].status=='success'){
																	df.formatSucessRes(req, res,body.data,cntxtDtls, '', {}); 
																} else {
																	df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
																}
															} else {
																df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
															}
                                                        } else {
                                                            df.formatErrorRes(req, res, body.data, cntxtDtls, '',  { error_status: "707", err_message: "Sorry, failed to Update service now." });
                                                        }
                                                    })
                                                }).catch(function (error) {
													console.log("error 848", error);
													df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
												});
                                            })
                                        } else {
                                            let error = 'No Tasks Found'
                                            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                        }
                                    }).catch(function (error) {
                                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                                    });

                                    
                               // })
                            // }).catch(function (error) {
                            //     df.formatErrorRes(req, task_update_res, error, cntxtDtls, '', {});
                            // });
                    // }).catch(function (error) {
                    //     df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    // });

				})
			})
		})
	 }).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
}

/**************************************************************************************
* Controller     : getshiftdatalistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getshiftdatalistCtrl = (req, res) => {

    tasksectionsMdl.getshiftdatalistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : deleteshiftdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.deleteshiftdataCtrl = (req, res) => {

    tasksectionsMdl.deleteshiftdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getshiftdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getshiftdataCtrl = (req, res) => {

    tasksectionsMdl.getshiftdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : checklistsubmitedtaskswebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.checklistsubmitedtaskswebCtrl = (req, res) => {

    tasksectionsMdl.checklistsubmitedtaskswebMdl(req.body, req.user)
        .then(function (results) {
            if(results.length>0){
                var str1 = JSON.stringify(results[0].submitted_tabs);
                str1 = results[0].submitted_tabs.replace(/\\/g,'');
                 //str1 = JSON.parse(str1);
              results[0].submitted_tabs = str1
                console.log("str1",str1)
                console.log("results[0]",results)
            }

		df.formatSucessRes(req, res,results,cntxtDtls, '', {});
		
        }).catch(function (error) {
			console.log("error",error);
            df.formatErrorRes(req, res, error, cntxtDtls, '', {error_status: "200", err_message: "no data found"});
        });
		
     // } else {
			//let error = 'No data found'
			//df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		//}

}





/**************************************************************************************
* Controller     : updatechecklistsubmitedtaskswebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updatechecklistsubmitedtaskswebCtrl = (req, res) => {

    tasksectionsMdl.updatechecklistsubmitedtaskswebMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : insertchecklistimagedataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.insertchecklistimagedataCtrl = (req, res) => {

    tasksectionsMdl.insertchecklistimagedataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getchecklistimagedataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getchecklistimagedataCtrl = (req, res) => {

    tasksectionsMdl.getchecklistimagedataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : tasklisttwodaysdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.tasklisttwodaysdataCtrl = (req, res) => {

    tasksectionsMdl.tasklisttwodaysdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : inserttaskdistdisputedataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.inserttaskdistdisputedataCtrl = (req, res) => {

    tasksectionsMdl.inserttaskdistdisputedataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : listtaskdistdisputedataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.listtaskdistdisputedataCtrl = (req, res) => {

    tasksectionsMdl.listtaskdistdisputedataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : updatetaskdistdisputewebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updatetaskdistdisputewebCtrl = (req, res) => {
    tasksectionsMdl.updatetaskdistdisputewebMdl(req.body, req.user)
        .then(function (results) {
            var task_id = results.task_id;
            if (req.body.status == 1) {
                tasksectionsMdl.updatetravelempgpswebMdl(req.body, task_id, req.user)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            } else if (req.body.status == 2) {
                tasksectionsMdl.updatetaskdistdisputewebMdl(req.body)
                    .then(function (results) {
                        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
                    }).catch(function (error) {
                        df.formatErrorRes(req, res, error, cntxtDtls, '', {});
                    });
            } else {
                df.formatErrorRes(req, res, "Invalid status", cntxtDtls, '', {});
            }
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
};


/**************************************************************************************
* Controller     : taskdisputebaseonidbasedlistwebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdisputebaseonidbasedlistwebCtrl = (req, res) => {

    tasksectionsMdl.taskdisputebaseonidbasedlistwebMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : taskdocumentnoteswebbCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.taskdocumentnoteswebbCtrl = (req, res) => {
	let web_app = 6
    tasksectionsMdl.taskdocumentnoteswebbMdl(req.body, req.user).then(function (results_notes) {
		tasksectionsMdl.inserttasklogMdl (req.body,req.user).then(function (results) {
			if(req.body.note != '' && req.body.note != null && req.body.note != undefined){
                            
				tasksectionsMdl.tasknotestrnfrtoservicenow_web_Mdl(req.body,req.user, results_notes).then(function(notesdatatotransfer){
                  let data = {}
					data["notes"] = [notesdatatotransfer[0]]
					console.log(data,"datadatadata")
                    var options = {
							method: 'post',
							json: true,
							url: as.url_servicenow.servicenowNotesApi.urlApi,
						   headers: {
									'Authorization': as.url_servicenow.servicenowNotesApi.headerDtls.Authorization,
									'content-type': 'application/json'
							   },
                                                                data: null,
                                                            }
															options.data = data
					
                            
					console.log("options",options)
					tasksectionsMdl.insrtnotesapicalldtlsMdl(req.body, notesdatatotransfer[0], options, web_app, req.user).then(function(apicallinsrt){
						//request(options, function (err, resp, body) {
						return axios(options).then((body) => {
							tasksectionsMdl.updateapicalldtlsMdl(body.data, apicallinsrt.insertId, req.user, body).then(function(updtapicall){
								console.log("err,res,body", body.data)
								console.log("options",options)
								if(body.data){  
									let chckbody = JSON.stringify(body.data);
									if( !chckbody.includes('Error Page') ){
										if(body.data['result'].status=='success'){
											df.formatSucessRes(req, res, results, cntxtDtls, '', {});
										}else{
											let error = 'unable to send to ServiceNow'
											df.formatErrorRes(req, res, error, cntxtDtls, '', {});
										}
									}else{
										let error = 'unable to send to ServiceNow'
										df.formatErrorRes(req, res, error, cntxtDtls, '', {});
									}
								}else{
									let error = 'unable to send to ServiceNow'
									df.formatErrorRes(req, res, error, cntxtDtls, '', {});
								}
							})		
						}).catch(function (error) {
							console.log("error 1190", error);
							df.formatErrorRes(req, res, error, cntxtDtls, '', { error_status: "402", err_message: error });
						});
					})
				}).catch(function (error) {
					df.formatErrorRes(req, res, error, cntxtDtls, '', {});
				});
			}else{
			 df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		    }
				   //df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
			df.formatErrorRes(req, res, error, cntxtDtls, '', {});
		});
	})

}



/**************************************************************************************
* Controller     : chcklistsubmitDataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  shaik   - Initial Function
*
***************************************************************************************/
exports.updatechcklistsubmitDataCtrl = function (req, res) {
	var fnm = "updatechcklistsubmitDataCtrl";
	tasksectionsMdl.updatechcklistsubmitDataMdl(req.body,req.user).then((results) => {
        df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	 }).catch(function (error) {
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	});
}























