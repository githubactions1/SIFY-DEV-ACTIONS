var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var jsonUtils = require(appRoot + '/utils/json.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var zoneMdl = require(appRoot + '/server/modules/zone/models/zoneMdl');
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
exports.insertzoneCtrl = (req, res) => {

    zoneMdl.insertzoneMdl(req.body, req.user)
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
exports.getzonelistCtrl = (req, res) => {

    zoneMdl.getzonelistMdl(req.body, req.user)
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
exports.getbyidzoneCtrl = (req, res) => {

    zoneMdl.getbyidzoneMdl(req.params.id, req.user)
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
exports.updatezoneCtrl = (req, res) => {

    zoneMdl.updatezoneMdl(req.body, req.user)
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
exports.deletezoneCtrl = (req, res) => {

    zoneMdl.deletezoneMdl(req.body, req.user)
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
* 27-04-2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.getzonesstatesandclustersCtrl = (req, res) => {

    zoneMdl.getzonesstatesandclustersMdl(req.body, req.user)
        .then(function (results) {

            var common_feilds = [''];
            var arrFeilds = ['zone_id','zone_status', 'state_id','state_name','cluster_id','cluster_name'];
            var arrName = '';
            var groupBy = 'zone_id'; 
            var sortKey = 'state_id'; 
            
            var groupres  = jsonUtils.newznegroupJsonByKey(results, common_feilds, arrFeilds, arrName, groupBy, sortKey, 'asc');
    
           console.log("groupres",groupres)
		   
		   var common_feilds1 = [''];
            var arrFeilds1 = ['cluster_name'];
            var arrName1 = ['SOUTH','EAST','NORTH','WEST'];
            var groupBy1 = 'state_name'; 
            var sortKey1 = 'state_id';  
		    
		   var newgroupres  = jsonUtils.groupcstmznesteclsJsonByKey(groupres, common_feilds1, arrFeilds1, arrName1, groupBy1, sortKey1, 'asc');

            df.formatSucessRes(req, res, groupres, cntxtDtls, '', {});
        }).catch(function (error) {
            console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}