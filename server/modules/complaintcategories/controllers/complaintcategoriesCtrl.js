var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var complaintcategoriesMdl = require(appRoot + '/server/modules/complaintcategories/models/complaintcategoriesMdl');
const fs = require('fs')
const mime = require('mime');
moment = require('moment');


/**************************************************************************************
* Controller     : insertcategoriesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 28-04-2023   -  shaik  - Initial Function
*
***************************************************************************************/
exports.insertcategoriesCtrl = (req, res) => {

    complaintcategoriesMdl.insertcategoriesMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
}
/**************************************************************************************
* Controller     : editcomplaintcategoriesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.editcomplaintcategoriesCtrl = (req, res) => {

    complaintcategoriesMdl.editcomplaintcategoriesMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : editcomplaintcategoriesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.deletecomplaintcategoriesCtrl = (req, res) => {

    complaintcategoriesMdl.deletecomplaintcategoriesMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getcomplaintcategoriesCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getcomplaintcategoriesCtrl = (req, res) => {

    complaintcategoriesMdl.getcomplaintcategoriesMdl(req.body, req.user)
        .then(function (results) {
           df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}


