var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var reportsMdl = require(appRoot + '/server/modules/reports/models/reportsMdl');
const fs = require('fs');
const mime = require('mime');
moment = require('moment');

/**************************************************************************************
* Controller     : attendancedatartrCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancedatartrCtrl = (req, res) => {

    reportsMdl.attendancedatartrMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : attendancedataPdfrtrCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 03/06/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancedataPdfrtrCtrl = (req, res) => {

    reportsMdl.attendancedataPdfrtrMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : FieldManpowerDtlsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.FieldManpowerDtlsCtrl = (req, res) => {

    reportsMdl.FieldManpowerDtlsMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }); 

}

/**************************************************************************************
* Controller     : taskdumpreportdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.taskdumpreportdataCtrl = (req, res) => {

    reportsMdl.taskdumpreportdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }); 

}

/**************************************************************************************
* Controller     : lcnHstryreportdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/05/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.lcnHstryreportdataCtrl = (req, res) => {

    reportsMdl.lcnHstryreportdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }); 

}

/**************************************************************************************
* Controller     : performancereportdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/05/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.performancereportdataCtrl = (req, res) => {

    reportsMdl.performancereportdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        }); 

}
/**************************************************************************************
* Controller     : attendancedatamanagersPdfCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 13/04/2023   -  ramesh  - Initial Function
*
***************************************************************************************/
exports.attendancedatamanagersPdfCtrl = (req, res) => {

    reportsMdl.attendancedatamanagersPdfMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}