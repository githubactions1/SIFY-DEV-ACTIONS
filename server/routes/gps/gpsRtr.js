var gpsRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var gpsCtrl = require(appRoot + '/server/modules/gps/controllers/gpsCtrl');
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

gpsRtr.get('/getprsentemplyeegps',gpsCtrl.getprsentemplyeegpsCtrl);
gpsRtr.post('/taskTrvelinsrtemployee', checkUser.hasToken, gpsCtrl.insrtGPSfrTravelStateCtrl);

gpsRtr.post('/getmonitordatalist',gpsCtrl.getmonitordatalistCtrl);
gpsRtr.post('/getemployeedatalist',gpsCtrl.getemployeedatalistCtrl);
gpsRtr.get('/gettotalemplyeegps',checkUser.hasToken,  gpsCtrl.gettotalemplyeegpsCtrl);
gpsRtr.post('/gettotalemplyeegpstasks',checkUser.hasToken,  gpsCtrl.getprsentemplyee_assigned_task_gpsCtrl);
// gpsRtr.post('/insertMoniterData',checkUser.hasToken,  gpsCtrl.insertMoniterDataCtrl);

gpsRtr.get('/punchoutEmplyee',  gpsCtrl.punchoutEmplyeeCtrl);

//*************************** google distance api mnual check 
gpsRtr.post('/googleApiDistance',  gpsCtrl.googleApiDistanceCtrl);

gpsRtr.post('/googleApiCorordinatesDistance',  gpsCtrl.googleApiCorordinatesDistanceCtrl);

module.exports = gpsRtr;