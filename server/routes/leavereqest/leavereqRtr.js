var leavereqRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/leaverequest/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const leavereqCtrl = require(modRoot + 'controllers/leavereqCtrl');

leavereqRtr.post('/insertleavereq', checkUser.hasToken, leavereqCtrl.insertleavereqCtrl);
leavereqRtr.post('/updateleavereq', checkUser.hasToken, leavereqCtrl.updateleavereqCtrl);
leavereqRtr.post('/leavereqlist', checkUser.hasToken, leavereqCtrl.leavereqlistCtrl);
leavereqRtr.get('/leavereqlistbyid/:id', checkUser.hasToken, leavereqCtrl.leavereqlistbyidCtrl);
leavereqRtr.post('/yeartotalleaves', checkUser.hasToken, leavereqCtrl.yeartotalleavesCtrl);
leavereqRtr.post('/requestedleaveslist', checkUser.hasToken, leavereqCtrl.requestedleaveslistCtrl);
leavereqRtr.post('/leavereqdataweblist', checkUser.hasToken, leavereqCtrl.leavereqdataweblistCtrl);
leavereqRtr.post('/leaverequestcountweblist', checkUser.hasToken, leavereqCtrl.leaverequestcountweblistCtrl);
leavereqRtr.post('/rejectleave', checkUser.hasToken, leavereqCtrl.rejectleaveCtrl);
leavereqRtr.post('/approvedleave', checkUser.hasToken, leavereqCtrl.approvedleaveCtrl);
leavereqRtr.post('/cancelleaveapp', checkUser.hasToken, leavereqCtrl.cancelleaveappCtrl);
leavereqRtr.post('/countleavelistapp', checkUser.hasToken, leavereqCtrl.countleavelistappCtrl);


leavereqRtr.get('/weekoffinsert',  leavereqCtrl.weekoffinsertCtrl);
leavereqRtr.get('/notpresent',  leavereqCtrl.absentinsertCtrl);

module.exports = leavereqRtr;