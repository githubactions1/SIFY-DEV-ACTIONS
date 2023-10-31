var hardwareRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/hardware/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const hardwareCtrl = require(modRoot + 'controllers/hardwareCtrl');

hardwareRtr.post('/inserthardware', checkUser.hasToken,hardwareCtrl.inserthardwareCtrl);
hardwareRtr.get('/gethardwaredata', checkUser.hasToken,hardwareCtrl.gethardwaredataCtrl);
hardwareRtr.post('/gethardwareidbaseddata', checkUser.hasToken,hardwareCtrl.gethardwareidbaseddataCtrl);
hardwareRtr.get('/gethelpdeskvideos', checkUser.hasToken,hardwareCtrl.gethelpdeskvideosCtrl);



module.exports = hardwareRtr