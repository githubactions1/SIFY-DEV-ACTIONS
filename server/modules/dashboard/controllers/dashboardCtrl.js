var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var dashboardMdl = require(appRoot + '/server/modules/dashboard/models/dashboardMdl');
const fs = require('fs')
const mime = require('mime');
moment = require('moment');


/**************************************************************************************
* Controller     : attendanceprcsntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendanceprcsntCtrl = (req, res) => {
	dashboardMdl.attendanceprcsntMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : attendancebackprcsntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 19/06/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendancebackprcsntCtrl= (req, res) => {
	dashboardMdl.attendancebackprcsntMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : atdnceemplyprcsntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.atdnceemplyprcsntCtrl = (req, res) => {
	dashboardMdl.atdnceemplyprcsntMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : atndncChrtengregprcsntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.atndncChrtengregprcsntCtrl = (req, res) => {
	dashboardMdl.atndncChrtengregprcsntMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : atndnceVndrprcsntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.atndnceVndrprcsntCtrl = (req, res) => {
	dashboardMdl.atndnceVndrprcsntMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : utliztnsmryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.utliztnsmryCtrl = (req, res) => {
	dashboardMdl.utliztnsmryMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : utliztnClstrsmryCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.utliztnClstrsmryCtrl = (req, res) => {
	dashboardMdl.utliztnClstrsmryMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : notutlizdmembrCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.notutlizdmembrCtrl = (req, res) => {
	dashboardMdl.notutlizdmembrMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : utilztntaskcntCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.utilztntaskcntCtrl = (req, res) => {
	dashboardMdl.utilztntaskcntMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : taskstsrprtCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.taskstsrprtCtrl = (req, res) => {
	dashboardMdl.taskstsrprtMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : taskstsGrprprtCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 15/04/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.taskstsGrprprtCtrl = (req, res) => {
	dashboardMdl.taskstsGrprprtMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryallTaskCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryallTaskCtrl = (req, res) => {
	dashboardMdl.todaysummaryallTaskMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryIndvdlallTaskCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryIndvdlallTaskCtrl = (req, res) => {
	dashboardMdl.todaysummaryIndvdlallTaskMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryallDocsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryallDocsCtrl = (req, res) => {
	dashboardMdl.todaysummaryallDocsMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryallTaskAssignCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryallTaskAssignCtrl = (req, res) => {
	dashboardMdl.todaysummaryallTaskAssignMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryIndvdlallTaskAssignCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryIndvdlallTaskAssignCtrl = (req, res) => {
	dashboardMdl.todaysummaryIndvdlallTaskAssignMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryIndvdlallTasklistAssignCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryIndvdlallTasklistAssignCtrl = (req, res) => {
	dashboardMdl.todaysummaryIndvdlallTasklistAssignMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryCnsolidateStsEngCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryCnsolidateStsEngCtrl = (req, res) => {
	dashboardMdl.todaysummaryCnsolidateStsEngMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryCnsolidateStsRegCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryCnsolidateStsRegCtrl = (req, res) => {
	dashboardMdl.todaysummaryCnsolidateStsRegMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : todaysummaryLastTskStsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.todaysummaryLastTskStsCtrl = (req, res) => {
	dashboardMdl.todaysummaryLastTskStsMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : PerformancetaskNdassignCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.PerformancetaskNdassignCtrl = (req, res) => {
	dashboardMdl.PerformancetaskNdassignMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : PerformanceAssignStsCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.PerformanceAssignStsCtrl = (req, res) => {
	dashboardMdl.PerformanceAssignStsMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : attendecedashboardgridoneCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridoneCtrl = (req, res) => {
	dashboardMdl.attendecedashboardgridoneMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : attendecedashboardgridtwoCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridtwoCtrl = (req, res) => {
	dashboardMdl.attendecedashboardgridtwoMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : attendecedashboardgridthreeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridthreeCtrl = (req, res) => {
	dashboardMdl.attendecedashboardgridthreeMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : attendecedashboardgridfiveCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridfiveCtrl = (req, res) => {
	dashboardMdl.attendecedashboardgridfiveMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : attendecedashboardgridfourCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridfourCtrl = (req, res) => {
	dashboardMdl.attendecedashboardgridfourMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : attendecedashboardgridfourCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.attendecedashboardgridsixCtrl = (req, res) => {
	dashboardMdl.attendecedashboardgridsixMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : totalengineersandriggersactivedeactive(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 18/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.totalengriggeractivedeactiveCtrl = (req, res) => {
	dashboardMdl.totalengriggeractivedeactiveMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : vendorwiseattendanceCtrl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 29/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.vendorwiseattendanceCtrl = (req, res) => {
	dashboardMdl.vendorwiseattendanceMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : vendorwiseattendancedatefilterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.vendorwiseattendancedatefilterCtrl = (req, res) => {
	dashboardMdl.vendorwiseattendancedatefilterMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : zonewiseattendanceCtrl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 29/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.zonewiseattendanceCtrl = (req, res) => {
	dashboardMdl.zonewiseattendanceMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : zonewiseattendancedatefilterCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 29/05/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.zonewiseattendancedatefilterCtrl = (req, res) => {
	dashboardMdl.zonewiseattendancedatefilterMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : clusterwisevendorattendanceCtrl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 29/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.clusterwisevendorattendanceCtrl = (req, res) => {
	dashboardMdl.clusterwisevendorattendanceMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : clusterwiseattendancedatefilterCtrl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 29/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.clusterwiseattendancedatefilterCtrl = (req, res) => {
	dashboardMdl.clusterwiseattendancedatefilterMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : PanIndiaProductivityReportCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/08/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
// exports.PanIndiaProductivityReportCtrl = (req, res) => {
	// dashboardMdl.PanIndiaemplyeeCntMdl(req.body,req.user).then(function (emplyeecnt) {
		// dashboardMdl.PanIndiaAttndnceCntMdl(req.body,req.user).then(function (attndcnt) {
			// dashboardMdl.PanIndiaTaskCntMdl(req.body,req.user).then(function (taskcnt) {
				// var data = {}
				// var avrgcnt = []
				// var attndcntfilter = false;
				// var taskcntfilter = false;
				// emplyeecnt.filter((k) => {
					// attndcnt.filter((l) => {
						// console.log("attndcntfilter state_name",k.state_name)
						// if(k.state_id == l.state_id){
							// console.log("attndcntfilter state_name",k.state_name)
							// console.log("attndcntfilter state_id",k.state_id)
							// attndcntfilter = true;
						// }
					// })
					// taskcnt.filter((m) => {
						// if(k.state_id == m.state_id){
							// taskcntfilter = true
						// }
					// })
					// if(!attndcntfilter){
						// console.log("attndcntfilter state_name",k.state_name)
						// console.log("attndcntfilter state_id",k.state_id)
						// attndcntfilter = false
						// attndcnt.push({
							// "total_attnd": 0,
							// "T1_attnd_count": 0,
							// "T2_attnd_count": 0,
							// "T3_attnd_count": 0,
							// "T4_attnd_count": 0,
							// "date_time" : k.date_time,
							// "zone_name" : k.zone_name,
							// "state_name": k.state_name,
							// "state_id": k.state_id
						// })
					// }
					// if(!taskcntfilter){
						// console.log("taskcntfilter state_name",k.state_name)
						// console.log("taskcntfilter state_id",k.state_id)
						// taskcntfilter = false 
						// taskcnt.push({
							// "total_task": 0,
							// "T1_task_count": 0,
							// "T2_task_count": 0,
							// "T3_task_count": 0,
							// "T4_task_count": 0,
							// "date_time" : k.date_time,
							// "zone_name" : k.zone_name,
							// "state_name": k.state_name,
							// "state_id": k.state_id
						// })
					// }
					// attndcntfilter=false;
					// taskcntfilter=false;
				// })
				// attndcnt.filter((l) => {
					// taskcnt.filter((m) => {
						// if(l.state_id == m.state_id){
							// ml = m.total_task/l.total_attnd
							// ml = ml || 0
							// ml = (ml === null) ? 0 : ml;
							// ml = (ml === Infinity) ? 0 : ml;
							// ml1 = m.T1_task_count/l.T1_attnd_count
							// ml1 = ml1 || 0
							// ml1 = (ml1 === null) ? 0 : ml1;
							// ml1 = (ml1 === Infinity) ? 0 : ml1;
							// ml2 = m.T2_task_count/l.T2_attnd_count
							// ml2 = ml2 || 0
							// ml2 = (ml2 === null) ? 0 : ml2;
							// ml2 = (ml2 === Infinity) ? 0 : ml2;
							// ml3 = m.T3_task_count/l.T3_attnd_count
							// ml3 = ml3 || 0
							// ml3 = (ml3 === null) ? 0 : ml3;
							// ml3 = (ml3 === Infinity) ? 0 : ml3;
							// ml4 = m.T4_task_count/l.T4_attnd_count
							// ml4 = ml4 || 0
							// ml4 = (ml4 === null) ? 0 : ml4;
							// ml4 = (ml4 === Infinity) ? 0 : ml4;
							// avrgcnt.push({
								// "total_AVGTASK/DAY": parseFloat(ml.toFixed(2)),
								// "T1_AVGTASK/DAY_count": parseFloat(ml1.toFixed(2)),
								// "T2_AVGTASK/DAY_count": parseFloat(ml2.toFixed(2)),
								// "T3_AVGTASK/DAY_count": parseFloat(ml3.toFixed(2)),
								// "T4_AVGTASK/DAY_count": parseFloat(ml4.toFixed(2)),
								// "date_time" : l.date_time,
								// "zone_name" : l.zone_name,
								// "state_name": l.state_name,
								// "state_id": l.state_id
							// })
						// }
					// })
				// })
				// data['emplyeecnt']=emplyeecnt;
				// data['attndcnt']=attndcnt;
				// data['taskcnt']=taskcnt;
				// data['avrgcnt']=avrgcnt;
				// df.formatSucessRes(req, res, data, cntxtDtls, '', {});
			// })
		// })
	// })
// }

/**************************************************************************************
* Controller     : sifyemplyeeStaticDataCtrl
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 14/09/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.sifyemplyeeStaticDataCtrl = (req, res) => {
	dashboardMdl.PanIndiaemplyeeCntMdl(req.body,req.user).then(function (emplyeecnt) {
		dashboardMdl.sifyemplyeeDataMdl(req.body,req.user).then(function (results) {
			var data = {}
			data['emplyeecnt']=emplyeecnt;
			data['sifyemplyeecnt']=attndcnt;
			df.formatSucessRes(req, res, data, cntxtDtls, '', {});
		})
	})
}

/**************************************************************************************
* Controller     : sifyemplyeeDataCtrl
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 16/08/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.sifyemplyeeDataCtrl = (req, res) => {
	dashboardMdl.sifyemplyeeDataMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}

/**************************************************************************************
* Controller     : circleattendancedatefilterCtrl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 29/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.circleattendancedatefilterCtrl = (req, res) => {
	dashboardMdl.circleattendancedatefilterMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}
/**************************************************************************************
* Controller     : southemployeesengineerriggersCtrl(sifydashboard)
* Parameters     : req,res()
* Description    : get details 
* Change History :
* 29/07/2023   -  durga   - Initial Function
*
***************************************************************************************/
exports.southemployeesengineerriggersCtrl = (req, res) => {
	dashboardMdl.southemployeesengineerriggersMdl(req.body,req.user).then(function (results) {
		df.formatSucessRes(req, res, results, cntxtDtls, '', {});
	})
}


/**************************************************************************************
* Controller     : PanIndiaProductivityReportCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/08/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
// exports.PanIndiaProductivityoneDecimalReportCtrl = (req, res) => {
	// dashboardMdl.PanIndiaemplyeeCntMdl(req.body,req.user).then(function (emplyeecnt) {
		// dashboardMdl.PanIndiaAttndnceCntMdl(req.body,req.user).then(function (attndcnt) {
			// dashboardMdl.PanIndiaTaskCntMdl(req.body,req.user).then(function (taskcnt) {
				// var data = {}
				// var avrgcnt = []
				// var attndcntfilter = false;
				// var taskcntfilter = false;
				// emplyeecnt.filter((k) => {
					// attndcnt.filter((l) => {
						// console.log("attndcntfilter state_name",k.state_name)
						// if(k.state_id == l.state_id){
							// console.log("attndcntfilter state_name",k.state_name)
							// console.log("attndcntfilter state_id",k.state_id)
							// attndcntfilter = true;
						// }
					// })
					// taskcnt.filter((m) => {
						// if(k.state_id == m.state_id){
							// taskcntfilter = true
						// }
					// })
					// if(!attndcntfilter){
						// console.log("attndcntfilter state_name",k.state_name)
						// console.log("attndcntfilter state_id",k.state_id)
						// attndcntfilter = false
						// attndcnt.push({
							// "total_attnd": 0,
							// "T1_attnd_count": 0,
							// "T2_attnd_count": 0,
							// "T3_attnd_count": 0,
							// "T4_attnd_count": 0,
							// "date_time" : k.date_time,
							// "zone_name" : k.zone_name,
							// "state_name": k.state_name,
							// "state_id": k.state_id
						// })
					// }
					// if(!taskcntfilter){
						// console.log("taskcntfilter state_name",k.state_name)
						// console.log("taskcntfilter state_id",k.state_id)
						// taskcntfilter = false 
						// taskcnt.push({
							// "total_task": 0,
							// "T1_task_count": 0,
							// "T2_task_count": 0,
							// "T3_task_count": 0,
							// "T4_task_count": 0,
							// "date_time" : k.date_time,
							// "zone_name" : k.zone_name,
							// "state_name": k.state_name,
							// "state_id": k.state_id
						// })
					// }
					// attndcntfilter=false;
					// taskcntfilter=false;
				// })
				// attndcnt.filter((l) => {
					// taskcnt.filter((m) => {
						// if(l.state_id == m.state_id){
							// ml = m.total_task/l.total_attnd
							// ml = ml || 0
							// ml = (ml === null) ? 0 : ml;
							// ml = (ml === Infinity) ? 0 : ml;
							// ml1 = m.T1_task_count/l.T1_attnd_count
							// ml1 = ml1 || 0
							// ml1 = (ml1 === null) ? 0 : ml1;
							// ml1 = (ml1 === Infinity) ? 0 : ml1;
							// ml2 = m.T2_task_count/l.T2_attnd_count
							// ml2 = ml2 || 0
							// ml2 = (ml2 === null) ? 0 : ml2;
							// ml2 = (ml2 === Infinity) ? 0 : ml2;
							// ml3 = m.T3_task_count/l.T3_attnd_count
							// ml3 = ml3 || 0
							// ml3 = (ml3 === null) ? 0 : ml3;
							// ml3 = (ml3 === Infinity) ? 0 : ml3;
							// ml4 = m.T4_task_count/l.T4_attnd_count
							// ml4 = ml4 || 0
							// ml4 = (ml4 === null) ? 0 : ml4;
							// ml4 = (ml4 === Infinity) ? 0 : ml4;
							// avrgcnt.push({
								// "total_AVGTASK/DAY": parseFloat(ml.toFixed(2)),
								// "T1_AVGTASK/DAY_count": parseFloat(ml1.toFixed(2)),
								// "T2_AVGTASK/DAY_count": parseFloat(ml2.toFixed(2)),
								// "T3_AVGTASK/DAY_count": parseFloat(ml3.toFixed(2)),
								// "T4_AVGTASK/DAY_count": parseFloat(ml4.toFixed(2)),
								// "date_time" : l.date_time,
								// "zone_name" : l.zone_name,
								// "state_name": l.state_name,
								// "state_id": l.state_id
							// })
						// }
					// })
				// })
				// data['emplyeecnt']=emplyeecnt;
				// data['attndcnt']=attndcnt;
				// data['taskcnt']=taskcnt;
				// data['avrgcnt']=avrgcnt;
				// df.formatSucessRes(req, res, data, cntxtDtls, '', {});
			// })
		// })
	// })
// }

/**************************************************************************************
* Controller     : PanIndiaProductivityReportCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 16/08/2023   -  ramesh   - Initial Function
*
***************************************************************************************/
exports.PanIndiaProductivityoneDecimalReportCtrl = (req, res) => {
	dashboardMdl.PanIndiaemplyeeCntMdl(req.body,req.user).then(function (emplyeecnt) {
		dashboardMdl.PanIndiaAttndnceCntMdl(req.body,req.user).then(function (attndcnt) {
			dashboardMdl.PanIndiaTaskCntMdl(req.body,req.user).then(function (taskcnt) {
				var data = {}
				var avrgcnt = []
				var attndcntfilter = false;
				var taskcntfilter = false;
				emplyeecnt.filter((k) => {
					attndcnt.filter((l) => {
						console.log("attndcntfilter state_name",k.state_name)
						if(k.state_id == l.state_id){
							console.log("attndcntfilter state_name",k.state_name)
							console.log("attndcntfilter state_id",k.state_id)
							attndcntfilter = true;
						}
					})
					taskcnt.filter((m) => {
						if(k.state_id == m.state_id){
							taskcntfilter = true
						}
					})
					if(!attndcntfilter){
						console.log("attndcntfilter state_name",k.state_name)
						console.log("attndcntfilter state_id",k.state_id)
						attndcntfilter = false
						attndcnt.push({
							"total_attnd": 0,
							"T1_attnd_count": 0,
							"T2_attnd_count": 0,
							"T3_attnd_count": 0,
							"T4_attnd_count": 0,
							"date_time" : k.date_time,
							"zone_name" : k.zone_name,
							"state_name": k.state_name,
							"state_id": k.state_id
						})
					}
					if(!taskcntfilter){
						console.log("taskcntfilter state_name",k.state_name)
						console.log("taskcntfilter state_id",k.state_id)
						taskcntfilter = false 
						taskcnt.push({
							"total_task": 0,
							"T1_task_count": 0,
							"T2_task_count": 0,
							"T3_task_count": 0,
							"T4_task_count": 0,
							"date_time" : k.date_time,
							"zone_name" : k.zone_name,
							"state_name": k.state_name,
							"state_id": k.state_id
						})
					}
					attndcntfilter=false;
					taskcntfilter=false;
				})
				attndcnt.filter((l) => {
					taskcnt.filter((m) => {
						if(l.state_id == m.state_id){
							ml = m.total_task/l.total_attnd
							ml = ml || 0
							ml = (ml === null) ? 0 : ml;
							ml = (ml === Infinity) ? 0 : ml;
							ml1 = m.T1_task_count/l.T1_attnd_count
							ml1 = ml1 || 0
							ml1 = (ml1 === null) ? 0 : ml1;
							ml1 = (ml1 === Infinity) ? 0 : ml1;
							ml2 = m.T2_task_count/l.T2_attnd_count
							ml2 = ml2 || 0
							ml2 = (ml2 === null) ? 0 : ml2;
							ml2 = (ml2 === Infinity) ? 0 : ml2;
							ml3 = m.T3_task_count/l.T3_attnd_count
							ml3 = ml3 || 0
							ml3 = (ml3 === null) ? 0 : ml3;
							ml3 = (ml3 === Infinity) ? 0 : ml3;
							ml4 = m.T4_task_count/l.T4_attnd_count
							ml4 = ml4 || 0
							ml4 = (ml4 === null) ? 0 : ml4;
							ml4 = (ml4 === Infinity) ? 0 : ml4;
							avrgcnt.push({
								"total_AVGTASK/DAY": parseFloat(ml.toFixed(2)),
								"T1_AVGTASK/DAY_count": parseFloat(ml1.toFixed(2)),
								"T2_AVGTASK/DAY_count": parseFloat(ml2.toFixed(2)),
								"T3_AVGTASK/DAY_count": parseFloat(ml3.toFixed(2)),
								"T4_AVGTASK/DAY_count": parseFloat(ml4.toFixed(2)),
								"date_time" : l.date_time,
								"zone_name" : l.zone_name,
								"state_name": l.state_name,
								"state_id": l.state_id
							})
						}
					})
				})
				data['emplyeecnt']=emplyeecnt;
				data['attndcnt']=attndcnt;
				data['taskcnt']=taskcnt;
				data['avrgcnt']=avrgcnt;
				df.formatSucessRes(req, res, data, cntxtDtls, '', {});
			})
		})
	})
}

// exports.PanIndiaProductivityoneDecimalReportCtrl = (req, res) => {
	// dashboardMdl.PanIndiaemplyeeCntMdl(req.body,req.user).then(function (results) {
			// df.formatSucessRes(req, res, results, cntxtDtls, '', {});	
	 // dashboardMdl.PanIndiaAttndnceCntMdl(req.body,req.user).then(function (attndcnt)	{
				// df.formatSucessRes(req, res, attndcnt, cntxtDtls, '', {});	
		 // dashboardMdl.PanIndiaTaskCntMdl(req.body,req.user).then(function (taskcnt){		
				// df.formatSucessRes(req, res, taskcnt, cntxtDtls, '', {});
		 // })
	 // })
	// })
			
// }