
var express = require('express');
var router = express.Router();
var authCtrl = require('../modules/auth/controllers/authCtrl');
var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var checkUser = require('../modules/auth/controllers/accessCtrl');


router.use('/clusters', require(appRoot + '/server/routes/clusters/clusterRtr'));

router.use('/state', require(appRoot + '/server/routes/state/stateRtr'));
router.use('/task', require(appRoot + '/server/routes/task/taskRtr'));
router.use('/tasksections', require(appRoot + '/server/routes/tasksections/tasksectionsRtr'));
//router.use('/state', require(appRoot + '/server/routes/state/stateRtr'));
router.use('/employees', require(appRoot + '/server/routes/employees/employeesRtr'));
router.use('/zone', require(appRoot + '/server/routes/zone/zoneRtr'));
router.use('/categories', require(appRoot + '/server/routes/categories/categoriesRtr'));
router.use('/attendence', require(appRoot + '/server/routes/attendence/attendenceRtr'));

router.use('/kibana', require(appRoot + '/server/routes/kibana/kibanaRtr'));

router.use('/leaverequest', require(appRoot + '/server/routes//leavereqest/leavereqRtr'));

router.use('/circuits', require(appRoot + '/server/routes/circuits/circuitsRtr'));

router.use('/vender', require(appRoot + '/server/routes/vender/venderRtr'));
router.use('/dashboard', require(appRoot + '/server/routes/dashboard/dashboardRtr'));
router.use('/reports', require(appRoot + '/server/routes/reports/reportsRtr'));

router.use('/checklist', require(appRoot + '/server/routes/checklist/checklistRtr'));
router.use('/hardware', require(appRoot + '/server/routes/hardware/hardwareRtr'));
router.use('/complaintcategories', require(appRoot + '/server/routes/complaintcategories/complaintcategoriesRtr'));
//******************************** service now api's **************************//
router.use('/servicenow', require(appRoot + '/server/routes/servicenow/servicenowRtr'));

//******************************** GPS api's ********************************//
router.use('/gps', require(appRoot + '/server/routes/gps/gpsRtr'));

// **************** with out Authentication api's *************************//

router.post("/login", authCtrl.login_sess);
router.post("/login_web", authCtrl.login_sess_web);
router.post("/auth/login", authCtrl.web_login_sess);
router.get("/login/capcha", authCtrl.capchalgndtlsCtrl);
router.get("/auth/profile/:id", authCtrl.emplyeerledtlsCtrl);

router.get("stored_procedures", authCtrl.storedprocedureCtrl);
router.put("/logout", checkUser.hasToken, authCtrl.logoutSessCtrl);
router.post("/gpsinfo", checkUser.hasToken, authCtrl.gpsinfoCtrl);
router.post("/insertapppermissions", checkUser.hasToken, authCtrl.insertapppermissionsCtrl);
router.post("/getapppermissions", checkUser.hasToken, authCtrl.getapppermissionsCtrl);
router.get("/checkemployeetokenstatus", checkUser.hasToken, authCtrl.checkemployeetokenCtrl);
//router.post("/forget_password", checkUser.hasToken, authCtrl.forgetpasswordCtrl);

router.post("/change_password", authCtrl.change_pwd);

module.exports = router;