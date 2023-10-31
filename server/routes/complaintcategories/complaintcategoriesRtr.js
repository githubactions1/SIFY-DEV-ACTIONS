var complaintcategoriesRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/complaintcategories/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const complaintcategoriesCtrl = require(modRoot + 'controllers/complaintcategoriesCtrl');

complaintcategoriesRtr.post('/insertcomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.insertcategoriesCtrl);
complaintcategoriesRtr.post('/editcomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.editcomplaintcategoriesCtrl);
complaintcategoriesRtr.post('/deletecomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.deletecomplaintcategoriesCtrl);
complaintcategoriesRtr.get('/getcomplaintcategories',checkUser.hasToken, complaintcategoriesCtrl.getcomplaintcategoriesCtrl);



module.exports = complaintcategoriesRtr
