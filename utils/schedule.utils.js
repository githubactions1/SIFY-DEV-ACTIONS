var schedule = require("node-schedule");
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var log = require(appRoot + '/utils/logmessages');
var taskCtrl = require(appRoot + '/server/modules/task/controllers/taskCtrl');
var scheduleJobsCtrl = require(appRoot + '/server/modules/scheduleJobs/controllers/scheduleJobsCtrl');

var moduoleNm = "UTIL-SCHEDULER";

exports.scheduleScripts = function (callback) {

	schedule.scheduleJob('*/15 * * * *', function () {
		//log_schedule(0, "Running Every 15 minutes");
	});


	schedule.scheduleJob('0 * * * *', function () {
		//log_schedule(0, "Running Every 1 hour");
	});

	// Running Every Day at 4 Hour 5 mins return distance calculate
	//schedule.scheduleJob('5 4 * * *', function () {
	schedule.scheduleJob('10 58 * * *', function () {
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		console.log("___________________________-----------------------------_______________________________________")
		//taskCtrl.calculateMissreturndistanceCtrl();
	});
	schedule.scheduleJob('25 0 * * *', function () {
		scheduleJobsCtrl.tokenexpiryCtrl();
		//log_schedule(0, "Running Every 1 hour");
	});
};
