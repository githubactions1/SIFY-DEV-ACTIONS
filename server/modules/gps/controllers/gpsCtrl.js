var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var gpsMdl = require(appRoot + '/server/modules/gps/models/gpsMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require("request");
var axios = require('axios')

/**************************************************************************************
* Controller     : googleApiDistanceCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 18/08/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/

exports.googleApiDistanceCtrl = function(req,res){
	var fnm = "googleApiDistanceCtrl"
	let apikey = req.body.apikey
	let postcode = req.body.pincode;
	var mapoptions = {
		method: 'get',
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apikey}`,
	}
	//request(mapoptions, function (err, respnce, mapbody) {
	axios(mapoptions).then(function (response) {
		console.log(response.data)
		df.serviceNowformatSucessRes(req, res, response.data, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : googleApiCorordinatesDistanceCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 18/08/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/

exports.googleApiCorordinatesDistanceCtrl = function(req,res){
	var fnm = "googleApiCorordinatesDistanceCtrl"
	let api_key = req.body.apikey
	let postcode = req.body.pincode;
	let origin = req.body.origin;
	let destination = req.body.destination;
	var options = {
			method: 'get',
			url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api_key}`,
			headers: {}
		};
		var distance = 0;
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
							console.log("distance 63",distance)
						}
						console.log("distance 65",distance)
					}
					console.log("distance 67",distance)
				}
				console.log("distance 69",distance)
			}
			console.log("distance 71",distance)
			
		}).catch((err)=> {
			df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
		})
		console.log("distance 74",distance)
		df.formatSucessRes(req, res, distance, cntxtDtls, fnm, {});
}

/**************************************************************************************
* Controller     : getprsentemplyeegpsCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/

exports.getprsentemplyeegpsCtrl = function(req,res){
	var fnm = "getprsentemplyeegpsCtrl"
	gpsMdl.getprsentemplyeegpsMdl(req, req.user).then((result)=>{
		df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
	})
}

/**************************************************************************************
* Controller     : insrtGPSfrTravelStateCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/05/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/

function toRad(Value) {
    return Value * Math.PI / 180;
}

exports.insrtGPSfrTravelStateCtrl = function(req,res){
	var fnm = "insrtGPSfrTravelStateCtrl"
	df.formatSucessRes(req, res, 'success', cntxtDtls, fnm, {});
	/*if(req.body.task_id != 0 && req.body.task_status == 220){
		(req.body.Locations).filter((k)=>{
			gpsMdl.insrtGPSfrTravelStateMdl(k, 0, req.user).then((result)=>{
				df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
			}).catch((err)=> {
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
			})
		})
	} else {
		var count = 0;
		(req.body.Locations).filter((k)=>{
			gpsMdl.chckGPSfrTravelStateMdl(k, req.user).then((chckgpsdata)=>{
				console.log(chckgpsdata)
				var distance = 0;
				if(chckgpsdata.length > 0){
					var R = 6371; // km
					var dLat = toRad(parseFloat(chckgpsdata[0].gps_lat)-k.gps_lat);
					var dLon = toRad(parseFloat(chckgpsdata[0].gps_lang)-k.gps_lang);
					var lat1 = toRad(k.gps_lat);
					var lat2 = toRad(parseFloat(chckgpsdata[0].gps_lat));
					console.log("dLat",dLat)
					console.log("dLon",dLon)
					console.log("lat1",lat1)
					console.log("lat2",lat2)

					var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					distance = R * c * 1000;
					distance = distance.toFixed(0)
					console.log("distance",distance)
				}
				gpsMdl.insrtGPSfrTravelStateMdl(k, distance, req.user).then((result)=>{
					count ++
					if(count == req.body.Locations.length)
					df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
				}).catch((err)=> {
					if(count == req.body.Locations.length)
					df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
				})
			}).catch((err)=> {
				if(count == req.body.Locations.length)
				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
			})
		})
	}*/
}
// new
/**************************************************************************************
* Controller     : updatetasksectionsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getmonitordatalistCtrl = (req, res) => {

    gpsMdl.getmonitordatalistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getemployeedatalistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getemployeedatalistCtrl = (req, res) => {

    gpsMdl.getemployeedatalistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : gettotalemplyeegpsCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.gettotalemplyeegpsCtrl = function(req,res){
	var fnm = "gettotalemplyeegpsCtrl"
	gpsMdl.getprsentemplyeegpsMdl(req, req.user).then((result)=>{
		df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
	})
}


/**************************************************************************************
* Controller     : gettotalemplyeegpsCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 24/04/2024    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/


exports.getprsentemplyee_assigned_task_gpsCtrl = function(req,res){
	var fnm = "getprsentemplyee_assigned_task_gpsMdl"
	gpsMdl.getprsentemplyee_assigned_task_gpsMdl(req.body, res).then((result)=>{
		df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
	}).catch((err)=> {
		df.formatErrorRes(req, res, err, cntxtDtls, fnm, { error_status: "701", err_message: "Sorry, Something has gone wrong" });
	})
}


/**************************************************************************************
* Controller     : insertMoniterDataCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 19/06/2023    - shaik  - Initial Function
*
***************************************************************************************/


// exports.insertMoniterDataCtrl = function(req,res){
// 	var fnm = "insertMoniterDataCtrl"
	
// 	gpsMdl.getempdataMdl(req.body, req.user).then((emp)=>{
// 		gpsMdl.gettaskstatusnameMdl(req.body, req.user).then((task_status_name)=>{

// 			gpsMdl.getbaselat_longMdl(req.body, req.user).then((results)=>{
				
// 				var R = 6371; // km
				
// 				if(req.body.task_status != 410){
// 					console.log(results,"resultsresultsresults")
// 					dLat = toRad(parseFloat(results[0].task_log_lat) - req.body.task_lat);
// 					dLon = toRad(parseFloat(results[0].task_log_long) - req.body.task_long);
// 					lat1 = toRad(req.body.task_lat);
// 					lat2 = toRad(parseFloat(results[0].task_log_lat));
					
// 					console.log("dLat",dLat)
// 					console.log("dLon",dLon)
// 					console.log("lat1",lat1)
// 					console.log("lat2",lat2)
		   
// 					var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
// 					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
// 					var distance = R * c * 1000;
// 					distance = distance.toFixed(0)
// 					console.log("distance",distance)
// 					req.body.distance = distance
// 				}else{
// 					req.body.distance = 0	
// 				}
				
				

// 			gpsMdl.insertMoniterDataMdl(req.body, emp, task_status_name, req.user).then((final_result)=>{
	
// 				df.formatSucessRes(req, res, final_result, cntxtDtls, fnm, {});
// 			}).catch((err)=> {
// 				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { });
// 			})

// 			}).catch((err)=> {
// 				df.formatErrorRes(req, res, err, cntxtDtls, fnm, { });
// 			})
			

// 		}).catch((err)=> {
// 			df.formatErrorRes(req, res, err, cntxtDtls, fnm, { });
// 		})
// 	}).catch((err)=> {
// 		df.formatErrorRes(req, res, err, cntxtDtls, fnm, { });
// 	})
// }

/**************************************************************************************
* Controller     : punchoutEmplyeeCtrl
* Parameters     : req,res()
* Description    : Get Agentwise Caf Details
* Change History :
* 01/07/2023    - Ramesh Patlola  - Initial Function
*
***************************************************************************************/


exports.punchoutEmplyeeCtrl = function(req,res){
	var fnm = "punchoutEmplyeeCtrl"
	
	//gpsMdl.getpunchOutempdataMdl(req.body, res).then((emp)=>{
		gpsMdl.updatepunchOutempdataMdl(req.body, res).then((result)=>{			
			df.formatSucessRes(req, res, result, cntxtDtls, fnm, {});
		}).catch((err)=> {
			df.formatErrorRes(req, res, err, cntxtDtls, fnm, { });
		})
	//}).catch((err)=> {
		//df.formatErrorRes(req, res, err, cntxtDtls, fnm, { });
	//})
}
