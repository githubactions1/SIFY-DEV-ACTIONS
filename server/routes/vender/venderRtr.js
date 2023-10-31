var venderRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/vender/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const venderCtrl = require(modRoot + 'controllers/venderCtrl');

venderRtr.post('/insertintovender', checkUser.hasToken,venderCtrl.insertvenderCtrl);
venderRtr.get('/getvenderdetails', checkUser.hasToken,venderCtrl.getvenderCtrl);
venderRtr.post('/updatevenderdetails', checkUser.hasToken,venderCtrl.updatevenderCtrl);
venderRtr.get('/getvenderdetailsbyid/:id', checkUser.hasToken,venderCtrl.getvenderbyidCtrl);
venderRtr.post('/deletevenderdetails', checkUser.hasToken,venderCtrl.deletevenderCtrl);

module.exports = venderRtr