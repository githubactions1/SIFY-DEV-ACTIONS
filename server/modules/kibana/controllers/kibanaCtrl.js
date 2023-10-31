var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
//var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var request = require("request");
var kibanaMdl = require('../models/kibanaMdl');


/**************************************************************************************
* Controller     : getregionCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getregionCtrl = (req, res) => {
	var fnm = `getregionCtrl`

	kibanaMdl.getregionMdl(req.body).then(function(tskdata){
		df.formatSucessRes(req, res, tskdata, cntxtDtls, '', {});
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : getcircleCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getcircleCtrl = (req, res) => {
	var fnm = `getcircleCtrl`

	kibanaMdl.getcircleMdl(req.body).then(function(tskdata){
		df.formatSucessRes(req, res, tskdata, cntxtDtls, '', {});
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : getClusterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getClusterCtrl = (req, res) => {
	var fnm = `getClusterCtrl`

	kibanaMdl.getClusterMdl(req.body).then(function(tskdata){
		df.formatSucessRes(req, res, tskdata, cntxtDtls, '', {});
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : getEmploymentTypeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getEmploymentTypeCtrl = (req, res) => {
	var fnm = `getEmploymentTypeCtrl`

	kibanaMdl.getEmploymentTypeMdl(req.body).then(function(tskdata){
		df.formatSucessRes(req, res, tskdata, cntxtDtls, '', {});
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : getVendorCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 02/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getVendorCtrl = (req, res) => {
	var fnm = `getVendorCtrl`

	kibanaMdl.getVendorMdl(req.body).then(function(tskdata){
		df.formatSucessRes(req, res, tskdata, cntxtDtls, '', {});
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : getEmployeeDtlsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 06/06/2023   -  Ramesh Patlola - Initial Function
*
***************************************************************************************/
exports.getEmployeeDtlsCtrl = (req, res) => {
	var fnm = `getEmployeeDtlsCtrl`

	kibanaMdl.getEmployeeDtlsMdl(req.body).then(function(tskdata){
		df.formatSucessRes(req, res, tskdata, cntxtDtls, '', {});
	}).catch((error) => { 
		console.log("error",error)
		df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	})
}