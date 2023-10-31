var servicenowRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server';
var modRoot = appRoot + '/server/modules/servicenow/';

var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const servicenowCtrl = require(modRoot + 'controllers/servicenowCtrl');

function checkKey(req, res, next) {
    var key = 'bbe5befacfede-01288919058-db1a7c32f-0446564';
    if (req.headers['access-key'] == key)
        return next();
    else
        return res.send({ status: 500, message: 'authentication failed' });
}

servicenowRtr.post('/createtask', checkKey, servicenowCtrl.srvcnowcreatetaskCtrl);
servicenowRtr.post('/processnotification', checkKey, servicenowCtrl.taskdatafrservicenowCtrl);

servicenowRtr.post('/parentchildtask', servicenowCtrl.taskchilddatafrservicenowCtrl);

servicenowRtr.post('/uatFailRetry', checkUser.hasToken, servicenowCtrl.taskdataCasefrservicenowCtrl);

servicenowRtr.post('/postmanuatFailRetry', servicenowCtrl.taskdataCasefrservicenowCtrl);

servicenowRtr.post('/status/uat-success', checkKey, servicenowCtrl.uatsuccessserviceNowCtrl);

servicenowRtr.get('/appversioncheck', servicenowCtrl.appVersioncheckCtrl);

servicenowRtr.post('/getpunchindata', checkKey, servicenowCtrl.getattendencedataforservicenowCtrl);

module.exports = servicenowRtr;