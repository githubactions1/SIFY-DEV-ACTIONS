var checklistRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server/';
var checklistCtrl = require(appRoot + 'server/modules/checklist/controllers/checklistCtrl');
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

function checkKey(req, res, next) {
    var key = 'bbe5befacfede-01288919058-db1a7c32f-0446564';
    if (req.headers['access-key'] == key)
        return next();
    else
        return res.send({ status: 500, message: 'authentication failed' });
}

checklistRtr.post('/chcklistData', checkKey, checklistCtrl.updateorInsrtchcklstCtrl);

checklistRtr.post('/chcklistimageDataUrl', checkUser.hasToken, checklistCtrl.chcklistimageDataUrlCtrl);


module.exports = checklistRtr;