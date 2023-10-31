var circuitsRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/circuits/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const circuitsCtrl = require(modRoot + 'controllers/circuitsCtrl');

circuitsRtr.post('/getcircuitsbyuserstatus',checkUser.hasToken, circuitsCtrl.getcircuitdetailsbyuserstatusCtrl);


module.exports = circuitsRtr;