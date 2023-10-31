var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var clustersMdl = require(appRoot + '/server/modules/clusters/models/clustersMdl');
const fs = require('fs')
const mime = require('mime');
moment = require('moment');


/**************************************************************************************
* Controller     : insertclustersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  ramesh  - Initial Function
*
***************************************************************************************/
exports.insertclustersCtrl = (req, res) => {

    clustersMdl.insertclustersMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getclustersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getclustersCtrl = (req, res) => {

    clustersMdl.getclustersMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getclustersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.updateclustersCtrl = (req, res) => {

    clustersMdl.updateclustersMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getclustersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getclustersbyidCtrl = (req, res) => {

    clustersMdl.getclustersbyidMdl(req.params.id, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : deleteclustersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.deleteclustersCtrl = (req, res) => {

    clustersMdl.deleteclustersMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : getclustersbystateidandzoneidCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  shaik  - Initial Function
*
***************************************************************************************/
exports.getclustersbystateidandzoneidCtrl = (req, res) => {

    clustersMdl.getclustersbystateidandzoneidMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}

/**************************************************************************************
* Controller     : deleteclustersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  shaik  - Initial Function
*
***************************************************************************************/
exports.getvenderbyclustersCtrl = (req, res) => {

    if(req.body.cluster_ids.length >= 1  && req.body.cluster_ids != ''){
        clustersMdl.getvenderbyclustersMdl(req.body.cluster_ids, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });
    }else{
        df.formatSucessRes(req, res, [], cntxtDtls, '', {err_message: "nothing to execute"});
    }

}


/**************************************************************************************
* Controller     : getclustersbymanagerCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change Hitory :
*    -  shaik  - Initial Function
*
***************************************************************************************/
exports.getclustersbymanagerCtrl = (req, res) => {

    clustersMdl.getclustersbymanagerMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}