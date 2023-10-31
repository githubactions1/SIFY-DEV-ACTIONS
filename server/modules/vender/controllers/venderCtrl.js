var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var venderMdl = require(appRoot + '/server/modules/vender/models/venderMdl');
const fs = require('fs');
const mime = require('mime');
moment = require('moment');
let jsonUtils = require(appRoot + '/utils/json.utils');
var request = require('request');


/**************************************************************************************
* Controller     : insertvenderCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28-04-2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.insertvenderCtrl = (req, res) => {

    venderMdl.insertclustersMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getvenderCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    28-04-2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.getvenderCtrl = (req, res) => {

    venderMdl.getvenderMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : updatevenderCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updatevenderCtrl = (req, res) => {

    venderMdl.updatevenderMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getvenderbyidCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  shaik  - Initial Function
*
***************************************************************************************/
exports.getvenderbyidCtrl = (req, res) => {

    venderMdl.getvenderbyidMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : deletevenderCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  shaik  - Initial Function
*
***************************************************************************************/
// status 99 for delete
exports.deletevenderCtrl = (req, res) => {

    venderMdl.deletevenderMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
