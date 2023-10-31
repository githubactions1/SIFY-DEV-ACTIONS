var tasksectionsRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/tasksections/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const tasksectionsCtrl = require(modRoot + 'controllers/tasksectionsCtrl');

tasksectionsRtr.post('/inserttasksections', checkUser.hasToken,tasksectionsCtrl.inserttasksectionsCtrl);
tasksectionsRtr.post('/updatetasksections', checkUser.hasToken,tasksectionsCtrl.updatetasksectionsCtrl);
tasksectionsRtr.get('/gettasksections', checkUser.hasToken,tasksectionsCtrl.gettasksectionsCtrl);
tasksectionsRtr.post('/deletetasksections', checkUser.hasToken,tasksectionsCtrl.deletetasksectionsCtrl);
tasksectionsRtr.post('/getbyidtasksections', checkUser.hasToken,tasksectionsCtrl.getbyidtasksectionsCtrl);
tasksectionsRtr.post('/getbyidtasksections', checkUser.hasToken,tasksectionsCtrl.getbyidtasksectionsCtrl);
tasksectionsRtr.post('/gettaskidsections', checkUser.hasToken,tasksectionsCtrl.gettaskidsectionsCtrl);


tasksectionsRtr.post('/inserttasksectionscols', checkUser.hasToken,tasksectionsCtrl.inserttasksectionscolsCtrl);
tasksectionsRtr.post('/updatetasksectionscols', checkUser.hasToken,tasksectionsCtrl.updatetasksectionscolsCtrl);
tasksectionsRtr.get('/gettasksectionscols', checkUser.hasToken,tasksectionsCtrl.gettasksectionscolsCtrl);
tasksectionsRtr.post('/getbytasksectionscols', checkUser.hasToken,tasksectionsCtrl.getbytasksectionscolsCtrl);
tasksectionsRtr.post('/deletesectionscols', checkUser.hasToken,tasksectionsCtrl.deletesectionscolsCtrl);
tasksectionsRtr.post('/gettaskcolsidsections', checkUser.hasToken,tasksectionsCtrl.gettaskcolsidsectionsCtrl);
//tasksectionsRtr.post('/gettaskcolsidsections', checkUser.hasToken,tasksectionsCtrl.gettaskcolsidsectionsCtrl);
tasksectionsRtr.post('/taskdocumentnotes', checkUser.hasToken,tasksectionsCtrl.taskdocumentnotesCtrl);
tasksectionsRtr.post('/getcommentslist', checkUser.hasToken,tasksectionsCtrl.getcommentslistCtrl);
tasksectionsRtr.post('/taskdocumentnotesapp', checkUser.hasToken,tasksectionsCtrl.taskdocumentnotesappCtrl);
//tasksectionsRtr.post('/getcommentslistapp', checkUser.hasToken,tasksectionsCtrl.getcommentslistappCtrl);
tasksectionsRtr.post('/getcommentslistapp', checkUser.hasToken,tasksectionsCtrl.getcommentslistappCtrl);
tasksectionsRtr.post('/getfamidbasedlist', checkUser.hasToken,tasksectionsCtrl.getfamidbasedlistCtrl);
tasksectionsRtr.post('/chcklistsubmitData', checkUser. hasToken,tasksectionsCtrl.chcklistsubmitDataCtrl);
tasksectionsRtr.post('/getshiftdatalist', checkUser. hasToken,tasksectionsCtrl.getshiftdatalistCtrl);
tasksectionsRtr.post('/deleteshiftdata', checkUser. hasToken,tasksectionsCtrl.deleteshiftdataCtrl);


tasksectionsRtr.post('/checklistsubmitedtasksweb', checkUser. hasToken,tasksectionsCtrl.checklistsubmitedtaskswebCtrl);
tasksectionsRtr.post('/updatechecklistsubmitedtasksweb', checkUser. hasToken,tasksectionsCtrl.updatechecklistsubmitedtaskswebCtrl);
tasksectionsRtr.post('/insertchecklistimagedata', checkUser. hasToken,tasksectionsCtrl.insertchecklistimagedataCtrl);
tasksectionsRtr.post('/getchecklistimagedata', checkUser. hasToken,tasksectionsCtrl.getchecklistimagedataCtrl);
tasksectionsRtr.post('/tasklisttwodaysdata', checkUser. hasToken,tasksectionsCtrl.tasklisttwodaysdataCtrl);
tasksectionsRtr.post('/inserttaskdistdisputedata', checkUser. hasToken,tasksectionsCtrl.inserttaskdistdisputedataCtrl);
tasksectionsRtr.get('/listtaskdistdisputedata', checkUser. hasToken,tasksectionsCtrl.listtaskdistdisputedataCtrl);
tasksectionsRtr.post('/updatetaskdistdisputeweb', checkUser. hasToken,tasksectionsCtrl.updatetaskdistdisputewebCtrl);
tasksectionsRtr.post('/taskdisputebaseonidbasedlistweb', checkUser.hasToken,tasksectionsCtrl.taskdisputebaseonidbasedlistwebCtrl);


tasksectionsRtr.post('/taskdocumentnoteswebb', checkUser.hasToken,tasksectionsCtrl.taskdocumentnoteswebbCtrl);
tasksectionsRtr.post('/updatechcklistsubmitData', checkUser.hasToken,tasksectionsCtrl.updatechcklistsubmitDataCtrl);

module.exports = tasksectionsRtr

