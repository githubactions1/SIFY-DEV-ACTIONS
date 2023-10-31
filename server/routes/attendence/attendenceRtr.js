var attendenceRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/attendence/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const attendenceCtrl = require(modRoot + 'controllers/attendenceCtrl');
console.log("success")
attendenceRtr.post('/punchin',checkUser.hasToken, attendenceCtrl.punchinCtrl);
attendenceRtr.post('/punchout',checkUser.hasToken, attendenceCtrl.punchoutCtrl);
attendenceRtr.post('/punchinoutlist',checkUser.hasToken, attendenceCtrl.punchinoutlistCtrl);

attendenceRtr.get('/todaypunchin',checkUser.hasToken, attendenceCtrl.todaypunchinCtrl);
attendenceRtr.get('/todaypunchoutcount',checkUser.hasToken, attendenceCtrl.todaypunchoutcountCtrl);
attendenceRtr.get('/todayabsent',checkUser.hasToken, attendenceCtrl.todayabsentCtrl);
//attendenceRtr.get('/idlecount',checkUser.hasToken, attendenceCtrl.idlecountCtrl);
attendenceRtr.get('/idlecount',checkUser.hasToken, attendenceCtrl.idlecountCtrl);
attendenceRtr.get('/todaypunchinlist',checkUser.hasToken, attendenceCtrl.todaypunchinlistCtrl);

attendenceRtr.post('/todaypunchinbyfilters',checkUser.hasToken, attendenceCtrl.todaypunchinbyfiltersCtrl);

attendenceRtr.post('/notificationcount',checkUser.hasToken, attendenceCtrl.notificationcountCtrl);

attendenceRtr.post('/absentinsertion',checkUser.hasToken, attendenceCtrl.absentinsertionCtrl);
attendenceRtr.post('/notavailable',checkUser.hasToken, attendenceCtrl.notavailableCtrl);
attendenceRtr.post('/available',checkUser.hasToken, attendenceCtrl.availableCtrl);
attendenceRtr.post('/startbreak',checkUser.hasToken, attendenceCtrl.startbreakCtrl);
attendenceRtr.post('/endbreak',checkUser.hasToken, attendenceCtrl.endbreakCtrl);
attendenceRtr.post('/totalpunchintime',checkUser.hasToken, attendenceCtrl.totalpunchintimeCtrl);
attendenceRtr.post('/totalcurntandbrktime',checkUser.hasToken, attendenceCtrl.totalcurntandbrktimeCtrl);
attendenceRtr.get('/totalattendencecount',checkUser.hasToken, attendenceCtrl.totalattendencecountCtrl);
attendenceRtr.get('/onleavecount',checkUser.hasToken, attendenceCtrl.onleavecountCtrl);
attendenceRtr.post('/getteamuseremployeelist',checkUser.hasToken, attendenceCtrl.getteamuseremployeelistCtrl);
attendenceRtr.get('/ontimeandlatecount',checkUser.hasToken, attendenceCtrl.ontimeandlatecountCtrl);
attendenceRtr.post('/apppermissionlogdata',checkUser.hasToken, attendenceCtrl.apppermissionlogdataCtrl);

attendenceRtr.post('/gettasklog',checkUser.hasToken, attendenceCtrl.gettasklogCtrl);
attendenceRtr.post('/punchinweb',checkUser.hasToken, attendenceCtrl.punchinwebCtrl);
attendenceRtr.post('/punchoutweb',checkUser.hasToken, attendenceCtrl.punchoutwebCtrl);
attendenceRtr.post('/punchinbasedonstatuslist',checkUser.hasToken, attendenceCtrl.punchinbasedonstatuslistCtrl);



attendenceRtr.post('/gettasklog',checkUser.hasToken, attendenceCtrl.gettasklogCtrl);
attendenceRtr.post('/editattendencestatus',checkUser.hasToken, attendenceCtrl.editattendencestatusCtrl);
attendenceRtr.post('/insertattendenceweb',checkUser.hasToken, attendenceCtrl.insertattendencewebCtrl);



module.exports = attendenceRtr;