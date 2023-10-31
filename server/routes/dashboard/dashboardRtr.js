var dashboardRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/dashboard/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const dashboardCtrl = require(modRoot + 'controllers/dashboardCtrl');

dashboardRtr.post('/attendanceprcsnt', dashboardCtrl.attendanceprcsntCtrl);
dashboardRtr.post('/attendanceemplyeeprcsnt', dashboardCtrl.atdnceemplyprcsntCtrl);
dashboardRtr.post('/atndncChrtengregprcsnt', dashboardCtrl.atndncChrtengregprcsntCtrl);
dashboardRtr.post('/atndnceVndrprcsnt', dashboardCtrl.atndnceVndrprcsntCtrl);
dashboardRtr.post('/utliztnsmry', dashboardCtrl.utliztnsmryCtrl);
dashboardRtr.post('/utliztnClstrsmry', dashboardCtrl.utliztnClstrsmryCtrl);
dashboardRtr.post('/notutlizdmembr', dashboardCtrl.notutlizdmembrCtrl);
dashboardRtr.post('/utilztntaskcnt', dashboardCtrl.utilztntaskcntCtrl);
dashboardRtr.post('/taskstsrprt', dashboardCtrl.taskstsrprtCtrl);
dashboardRtr.post('/taskstsGrprprt', dashboardCtrl.taskstsGrprprtCtrl);


dashboardRtr.post('/taskSmryalltasks', dashboardCtrl.todaysummaryallTaskCtrl);
dashboardRtr.post('/taskSmryIndvdaltsks', dashboardCtrl.todaysummaryIndvdlallTaskCtrl);
dashboardRtr.post('/taskSmryalldocs', dashboardCtrl.todaysummaryallDocsCtrl);
dashboardRtr.post('/taskSmryalltaskassign', dashboardCtrl.todaysummaryallTaskAssignCtrl);
dashboardRtr.post('/taskSmryIndvdalassigntask', dashboardCtrl.todaysummaryIndvdlallTaskAssignCtrl);
dashboardRtr.post('/taskSmryindivdallistassign', dashboardCtrl.todaysummaryIndvdlallTasklistAssignCtrl);
dashboardRtr.post('/taskSmryconsolidateEng', dashboardCtrl.todaysummaryCnsolidateStsEngCtrl);
dashboardRtr.post('/taskSmryconsolidateReg', dashboardCtrl.todaysummaryCnsolidateStsRegCtrl);
dashboardRtr.post('/taskSmrylasttcktdata', dashboardCtrl.todaysummaryLastTskStsCtrl);

dashboardRtr.post('/prfmncetaskNdassign', dashboardCtrl.PerformancetaskNdassignCtrl);
dashboardRtr.post('/prfmnceAssignsts', dashboardCtrl.PerformanceAssignStsCtrl);
/***********************modifications attendence in dashboard*************************/
dashboardRtr.post('/attendecedashboardgridone', dashboardCtrl.attendecedashboardgridoneCtrl);
dashboardRtr.post('/attendecedashboardgridtwo', dashboardCtrl.attendecedashboardgridtwoCtrl);
dashboardRtr.post('/attendecedashboardgridthree', dashboardCtrl.attendecedashboardgridthreeCtrl);
dashboardRtr.post('/attendecedashboardgridfive', dashboardCtrl.attendecedashboardgridfiveCtrl);
dashboardRtr.post('/attendecedashboardgridfour', dashboardCtrl.attendecedashboardgridfourCtrl);
dashboardRtr.post('/attendecedashboardgridsix', dashboardCtrl.attendecedashboardgridsixCtrl);
//dashboardRtr.post('/producttivityutilization', dashboardCtrl.producttivityutilizationCtrl);


dashboardRtr.get('/totalengriggeractivedeactive', dashboardCtrl.totalengriggeractivedeactiveCtrl);

//********************** Pan India Productivity Report
//dashboardRtr.post('/PanIndiaProductivityReport', dashboardCtrl.PanIndiaProductivityReportCtrl);

//dashboardRtr.post('/PanIndiaProductivityoneDecimalReport', dashboardCtrl.PanIndiaonedecimalProductivityReportCtrl);

//********************** Sify Employee Report
dashboardRtr.post('/ReprotemplyeeData', dashboardCtrl.sifyemplyeeDataCtrl);

dashboardRtr.post('/ReprotemplyeeStaticData', dashboardCtrl.sifyemplyeeStaticDataCtrl);

//dashboardRtr.post('/emplyeeWiseProductivityData', dashboardCtrl.PanIndiaEmplyeeProductivityReportCtrl);

//dashboardRtr.post('/emplyeeAttandanceMnth', dashboardCtrl.emplyeeAttandanceMnthCtrl);

//********************** Hits Count task view web dashboard*************************/
//dashboardRtr.post('/apiRqstHitsData', dashboardCtrl.apiRqstDataCtrl);


module.exports = dashboardRtr;