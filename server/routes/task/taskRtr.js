var taskRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/task/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const taskCtrl = require(modRoot + 'controllers/taskCtrl');

taskRtr.post('/inserttask', checkUser.hasToken,taskCtrl.taskcreationCtrl); 
taskRtr.put('/updatetask', checkUser.hasToken,taskCtrl.updatetaskCtrl);
taskRtr.put('/updatetask_mobile', checkUser.hasToken,taskCtrl.updatetask_mobile_Ctrl);
taskRtr.get('/gettasklist', checkUser.hasToken,taskCtrl.gettasklistCtrl);
taskRtr.get('/getactivetask', checkUser.hasToken,taskCtrl.getactivetaskCtrl);
taskRtr.get('/gettaskby/:id', checkUser.hasToken,taskCtrl.gettaskbyidCtrl);
// taskRtr.post('/getassignedtask', checkUser.hasToken,taskCtrl.getcallattendedandtaskownerCtrl);
// taskRtr.post('/getassignedtaskcount', checkUser.hasToken,taskCtrl.getcallattendedandtaskownercountCtrl);
taskRtr.post('/gettaskfilter', checkUser.hasToken,taskCtrl.taskfilterCtrl);
taskRtr.post('/gettaskbystatusandctgry', checkUser.hasToken,taskCtrl.gettaskbystatusandcategoryCtrl);
taskRtr.post('/gettaskstatuscount', checkUser.hasToken,taskCtrl.gettaskbystatuscountCtrl);
taskRtr.post('/gettaskbystatus_m', checkUser.hasToken,taskCtrl.gettasklistbystatus_Mobile_Ctrl);
taskRtr.post('/gettaskcomplientslist', checkUser.hasToken,taskCtrl.gettaskcomplientslist);
taskRtr.get('/gettasknotificationslist', checkUser.hasToken,taskCtrl.gettasknotificationslistCtrl);
taskRtr.post('/gettasklogsdetails', checkUser.hasToken,taskCtrl.gettasklogsdetailsCtrl);
taskRtr.post('/gettasklogsdetailsweb', checkUser.hasToken,taskCtrl.gettasklogsdetails_web_Ctrl);

taskRtr.post('/inserttaskcallattendedby', checkUser.hasToken,taskCtrl.inserttaskcallattendedbyCtrl);
taskRtr.post('/gettaskstatuscountbycategory', checkUser.hasToken,taskCtrl.getstatuscountbycategoryCtrl);
taskRtr.post('/getcomplientsbymaincatid', checkUser.hasToken,taskCtrl.getcomplientsbymaincatidCtrl);
taskRtr.post('/gettaskremainder', checkUser.hasToken,taskCtrl.taskremainderCtrl);
taskRtr.get('/cronjobfortaskremainder/:cron_time',taskCtrl.sendtaskremainderCtrl);
taskRtr.post('/taskremainderupdate', checkUser.hasToken,taskCtrl.taskremainderstatusupdateCtrl);
taskRtr.post('/getnextstatus', checkUser.hasToken,taskCtrl.getnextstatusCtrl);
taskRtr.post('/getnextstatusweb', checkUser.hasToken,taskCtrl.getnextstatuswebCtrl);
taskRtr.get('/calculatereturndistance', taskCtrl.calculatereturndistanceCtrl);
taskRtr.get('/calculateMissreturndistance', taskCtrl.calculateMissreturndistanceCtrl);
//taskRtr.get('/calculatedistance', taskCtrl.getalltasks);
taskRtr.post('/calculatedistance', taskCtrl.getalltasks);
taskRtr.get('/getemployeesspecifictomanager', checkUser.hasToken, taskCtrl.getemployeesspecifictomanagerCtrl);

taskRtr.post('/updatetaskhardware', checkUser.hasToken, taskCtrl.updatetaskhardwareCtrl);
taskRtr.get('/gettaskhardwarebyid/:id', checkUser.hasToken, taskCtrl.gettaskhardwarebyidCtrl);
taskRtr.post('/gettaskhardwarebypartcode', checkUser.hasToken, taskCtrl.gettaskhardwarebypartcodeCtrl);
taskRtr.post('/gettaskhardwareapp', checkUser.hasToken, taskCtrl.gettaskhardwarebycallattendedby_app_Ctrl);
module.exports = taskRtr