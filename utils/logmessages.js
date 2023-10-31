/********************************************************************************************
---------------------------------------------------------------------------------------------
File              : logmessages.js
Description       : All the utility functions related to log files
---------------------------------------------------------------------------------------------
********************************************************************************************/

var moment      = require('moment');
//  import { createRequire } from 'module';
//  const require = createRequire(import.meta.url);
//var chalk = require('chalk');
//import chalk from 'chalk'
var DEBUG_MODE  = true;
//var DEBUG_LEVEL = (typeof(as.hmwsapp.debug_level) != 'undefined') ? as.hmwsapp.debug_level : "INFO";

var DEBUG_LEVEL = (typeof(as.sifyapp.debug_level) != 'undefined') ? as.sifyapp.debug_level : "INFO";


// let header     = chalk.bold.blue;
// let warn       = chalk.bold.green;
// let info       = chalk.bold.yellow
// let err        = chalk.bold.red


/**************************************************************************************
* Util Function  : Print the message to the standard output
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 15-11-2022 Ramesh Patlola
*
***************************************************************************************/
exports.message = function (category,moduleDtl,id,message) {  
    var showLog = false;  
	if (DEBUG_MODE == true) {
		if(DEBUG_LEVEL=="INFO") { showLog = true; }
		else if(DEBUG_LEVEL=="WARN" && (category == "info" || category == "err")) { showLog = true; }
		else if(DEBUG_LEVEL=="ERR" || category == "ERROR" ) { showLog = true; }
	}
	if(showLog == true){
		let printMsg ="info";
		 if(category=="WARN") printMsg="warn";
		 else if(category=="ERR" || category == "ERROR") printMsg="err";
		 else printMsg="info";
		 var contect="";
		 if( typeof(moduleDtl) != 'undefined'){
			 context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
		 }
		console.log("["+printMsg(category)+":"+context+":"+id+":"+moment().format('MM-DD-YYYY h:mm:ss')+"] "+message);
	}
}

/**************************************************************************************
* Util Function  : Print the message to the standard output
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 15-11-2022 Ramesh Patlola
*
***************************************************************************************/
exports.warns = function (message,id=0,moduleDtl=null) {  
    var showLog = false;  
	if (DEBUG_MODE == true) {
		if(DEBUG_LEVEL=="INFO"||DEBUG_LEVEL=="WARN") { showLog = true; }
	}
	if(showLog == true){
		 let printMsg ="warn";
		 var context="";
		 if( typeof(moduleDtl) != 'undefined' && moduleDtl !=null){
			 context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
		 }
		console.log("["+printMsg("WARN")+":"+context+":"+id+":"+moment().format('MM-DD-YYYY h:mm:ss')+"] "+message);
	}
}
/**************************************************************************************
* Util Function  : Print the message to the standard output
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 15-11-2022 Ramesh Patlola
*
***************************************************************************************/
exports.infos = function (message,id=0,moduleDtl=null) {  
    var showLog = false;  
	if (DEBUG_MODE == true) {
		if(DEBUG_LEVEL=="INFO") { showLog = true; }
	}
	if(showLog == true){
		 let printMsg ="info";
		 var context="";
		 if( typeof(moduleDtl) != 'undefined' && moduleDtl !=null){
			 context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
		 }
		console.log("["+printMsg("INFO")+":"+context+":"+id+":"+moment().format('MM-DD-YYYY h:mm:ss')+"] "+message);
	}
}
/**************************************************************************************
* Util Function  : Print the message to the standard output
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 15-11-2022 Ramesh Patlola
*
***************************************************************************************/
exports.errs = function (message,id=0,moduleDtl=null) {  
    var showLog = false;  
	if (DEBUG_MODE == true) {
		if(DEBUG_LEVEL=="INFO"||DEBUG_LEVEL=="WARN"||DEBUG_LEVEL=="ERROR"||DEBUG_LEVEL=="ERR") { showLog = true; }
	}
	if(showLog == true){
		 let printMsg ="err";
		 var context="";
		 if( typeof(moduleDtl) != 'undefined' && moduleDtl !=null){
			 context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
		 }
		console.log("["+printMsg("ERROR")+":"+context+":"+id+":"+moment().format('MM-DD-YYYY h:mm:ss')+"] "+message);
	}
}
/**************************************************************************************
* Util Function  : Print the message to the standard output
* Parameters     : None
* Description    : Get the list of all the Zones
* Change History :
* 15-11-2022 Ramesh Patlola
*
***************************************************************************************/
exports.db ={

	conError : function(moduleDtl,err,Qry) {
		    var category="ERROR"
		    var showLog = false;  
			var context="";
			if( typeof(moduleDtl) != 'undefined' && moduleDtl !=null){
				context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
			} 
			if (DEBUG_MODE == true) {
				if(DEBUG_LEVEL=="INFO") { showLog = true; }
				else if(DEBUG_LEVEL=="WARN" && (category == "info" || category == "err")) { showLog = true; }
				else if(DEBUG_LEVEL=="ERR" && category == "ERROR" ) { showLog = true; }
			}
			if(showLog == true){
			    let printMsg =err;
				if(category=="WARN") printMsg="warn";
				else if(category=="err" ||category=="ERR" || category == "ERROR") printMsg=err;
				else printMsg="info";
				var contect="";
				if( typeof(moduleDtl) != 'undefined'){
					context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
				}
				message=""
				if(err.code=="ENOTFOUND"){
					message="Unable to reach Database Server ::"+err.hostname
				}
				console.log("["+("ERROR")+":"+context+":"+err.code+":"+moment().format('MM-DD-YYYY h:mm:ss')+"] "+message);
			}
	},
	qryError : function(category,moduleDtl,Qry,id,message) { 
			var showLog = false;  
			var context="";
			if( typeof(moduleDtl) != 'undefined' && moduleDtl !=null){
				context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
			} 
			if (DEBUG_MODE == true) {
				if(DEBUG_LEVEL=="INFO") { showLog = true; }
				else if(DEBUG_LEVEL=="WARN" && (category == "info" || category == "err")) { showLog = true; }
				else if(DEBUG_LEVEL=="ERR" && category == "ERROR" ) { showLog = true; }
			}
			if(showLog == true){
			    let printMsg ="red";
				if(category=="WARN") printMsg="warn";
				else if(category=="ERR" || category == "ERROR") printMsg="red";
				else printMsg="info";
				var contect="";
				if( typeof(moduleDtl) != 'undefined'){
					context=moduleDtl.mod_name+"|"+moduleDtl.scriptName+"|"+moduleDtl.fcd
				}							
				console.log("["+"ERROR"+":"+context+":"+id+":"+moment().format('MM-DD-YYYY h:mm:ss')+"] "+message);
			}
	}

}



