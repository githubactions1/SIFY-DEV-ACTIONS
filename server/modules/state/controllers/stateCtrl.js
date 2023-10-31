var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var stateMdl = require(appRoot + '/server/modules/state/models/stateMdl');
const fs = require('fs');
const mime = require('mime');
moment = require('moment');

/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.insertstateCtrl = (req, res) => {

    stateMdl.insertstateMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getstatelistCtrl = (req, res) => {

    stateMdl.getliststateMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getbyidstateCtrl = (req, res) => {

    stateMdl.getbyidstateMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.updatestateCtrl = (req, res) => {

    stateMdl.updatestateMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : insertemployeeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 05-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.deletestateCtrl = (req, res) => {

    stateMdl.deletestateMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getstatebyzoneCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 07-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getstatebyzoneCtrl = (req, res) => {

    stateMdl.getstatebyzoneMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}