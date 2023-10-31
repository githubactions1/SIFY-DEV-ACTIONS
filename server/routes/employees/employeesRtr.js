var employeesRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/employees/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const employeesCtrl = require(modRoot + 'controllers/employeesCtrl');


employeesRtr.post('/insertemployee', checkUser.hasToken,employeesCtrl.insertemployeeCtrl);
employeesRtr.post('/insertBulkemployee', checkUser.hasToken,employeesCtrl.AddBulkEmplyeeCtrl);
employeesRtr.get('/getemployee', checkUser.hasToken,employeesCtrl.getemployeeCtrl);
employeesRtr.get('/getbyemployee/:id', checkUser.hasToken,employeesCtrl.getbyemployeeCtrl);
employeesRtr.post('/updateemployee', checkUser.hasToken,employeesCtrl.updateemployeeCtrl);
employeesRtr.post('/deleteemployestatus', checkUser.hasToken,employeesCtrl.deleteemployestatusCtrl);

employeesRtr.get('/categorieslist', checkUser.hasToken,employeesCtrl.categorieslistCtrl);
employeesRtr.get('/categorieslistbyid/:id', checkUser.hasToken,employeesCtrl.categorieslistbyidCtrl);

employeesRtr.get('/subcategorieslistbyid/:id', checkUser.hasToken,employeesCtrl.subcategorieslistbyidCtrl);
employeesRtr.get('/subcategorieslist', checkUser.hasToken,employeesCtrl.subcategorieslistCtrl);
employeesRtr.get('/employeenameslist', checkUser.hasToken,employeesCtrl.employeenameslistCtrl);


employeesRtr.post('/insertedemployee', checkUser.hasToken,employeesCtrl.insertedemployeeCtrl);

employeesRtr.post('/resetemployeeDevice', checkUser.hasToken,employeesCtrl.resetemplyeedeviceIdCtrl);

employeesRtr.get('/getmanagerslist', checkUser.hasToken,employeesCtrl.getengnrandriggerlistCtrl);
employeesRtr.post('/addmanagers', checkUser.hasToken,employeesCtrl.addmanagersCtrl);
employeesRtr.post('/editmanagersdata', checkUser.hasToken,employeesCtrl.editmanagersdataCtrl);
employeesRtr.post('/clustersbymembers', checkUser.hasToken,employeesCtrl.clustersbymembersCtrl);
employeesRtr.post('/employeereinvite', checkUser.hasToken,employeesCtrl.employeereinviteCtrl);

employeesRtr.post('/createfashnews', checkUser.hasToken,employeesCtrl.createnewflashnewsCtrl);
employeesRtr.post('/updateflashnews', checkUser.hasToken,employeesCtrl.updateflashnewsCtrl);
employeesRtr.post('/deactivateflashnews', checkUser.hasToken,employeesCtrl.deactivateflashnewsCtrl);
employeesRtr.get('/getflashnewsbyid/:id', checkUser.hasToken,employeesCtrl.getflashnewsbyidCtrl);
employeesRtr.post('/getflashnews', checkUser.hasToken,employeesCtrl.getflashnewsCtrl);

employeesRtr.get('/getbyemployeerole/:id', checkUser.hasToken,employeesCtrl.getbyemployeeroleCtrl);

employeesRtr.post('/getbyemployeeimageprofile', checkUser.hasToken,employeesCtrl.getbyemployeeimageprofileCtrl);

employeesRtr.post('/managerlockemployestatus', checkUser.hasToken,employeesCtrl.managerlockemployestatusCtrl);

module.exports = employeesRtr;