var kibanaRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server';
var modRoot = appRoot + '/server/modules/kibana/';

const kibanaCtrl = require(modRoot + 'controllers/kibanaCtrl');

function checkKey(req, res, next) {
    var key = 'bbe5befacfede-01288919058-db1a7c32f-0446564';
    if (req.headers['access-key'] == key)
        return next();
    else
        return res.send({ status: 500, message: 'authentication failed' });
}


kibanaRtr.get('/getregion', checkKey, kibanaCtrl.getregionCtrl);
kibanaRtr.post('/getcircle', checkKey, kibanaCtrl.getcircleCtrl);
kibanaRtr.post('/getCluster', checkKey, kibanaCtrl.getClusterCtrl);
kibanaRtr.post('/getVendor', checkKey, kibanaCtrl.getVendorCtrl);
kibanaRtr.get('/getEmploymentType', checkKey, kibanaCtrl.getEmploymentTypeCtrl);
kibanaRtr.post('/getEmploymeedetails', checkKey, kibanaCtrl.getEmployeeDtlsCtrl);


module.exports = kibanaRtr; 