var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var circuitsMdl = require(appRoot + '/server/modules/circuits/models/circuitsMdl');
const fs = require('fs');
const { forEach } = require('lodash');
const mime = require('mime');
moment = require('moment');

/**************************************************************************************
* Controller     : gettasklogsdetailsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 14-04-2023   -  shaik Allabaksh  - Initial Function
*
***************************************************************************************/
exports.getcircuitdetailsbyuserstatusCtrl = (req, res) => {
    
    circuitsMdl.getcircuitdetailsbyuserstatusMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}