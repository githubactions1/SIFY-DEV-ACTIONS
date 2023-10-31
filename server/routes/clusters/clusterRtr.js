var clustersRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/clusters/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const clustersCtrl = require(modRoot + 'controllers/clustersCtrl');

clustersRtr.post('/insertclusters',checkUser.hasToken, clustersCtrl.insertclustersCtrl);
clustersRtr.get('/getclusters',checkUser.hasToken, clustersCtrl.getclustersCtrl);
clustersRtr.post('/updateclusters',checkUser.hasToken, clustersCtrl.updateclustersCtrl);
clustersRtr.get('/getclustersbyid/:id',checkUser.hasToken, clustersCtrl.getclustersbyidCtrl);
clustersRtr.post('/deleteclusters',checkUser.hasToken, clustersCtrl.deleteclustersCtrl);
clustersRtr.post('/getvenderbycluster',checkUser.hasToken, clustersCtrl.getvenderbyclustersCtrl);
clustersRtr.post('/getclustersbystateidandzoneid',checkUser.hasToken, clustersCtrl.getclustersbystateidandzoneidCtrl);
clustersRtr.post('/geclusterbymanager',checkUser.hasToken, clustersCtrl.getclustersbymanagerCtrl);
module.exports = clustersRtr;