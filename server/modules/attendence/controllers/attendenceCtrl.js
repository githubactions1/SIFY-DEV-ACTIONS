var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var std = require( appRoot + '/utils/standardMessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var attendenceMdl = require(appRoot + '/server/modules/attendence/models/attendenceMdl');
const fs = require('fs')
const mime = require('mime');
moment = require('moment');


/**************************************************************************************
* Controller     : punchinCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.punchinCtrl = (req, res) => {
	console.log("req.body",req.body)
	 attendenceMdl.emplatlangMdl(req.body,req.user)
        .then(function (results) {
			console.log("results",results)

	var R = 6371; // km
	 var dLat = toRad(parseFloat(results[0].emp_latitude)-req.body.lat1);
	 var dLon = toRad(parseFloat(results[0].emp_longitude)-req.body.lon1);
	var lat1 = toRad(req.body.lat1);
	var lat2 = toRad(parseFloat(results[0].emp_latitude));
	console.log("dLat",dLat)
	console.log("dLon",dLon)
	console.log("lat1",lat1)
	console.log("lat2",lat2)

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var distance = R * c * 1000;
	distance = distance.toFixed(0)
	console.log("distance",distance)
  attendenceMdl.punchinMdl(req.body,distance,req.user)
        .then(function (results) {
			//var attendence_id=results.attendence_id
				//console.log("attendence_id",attendence_id)
			attendenceMdl.punchinselectMdl(req.body,req.user)
        .then(function (result) {
			attendenceMdl.insertempgpsinfoMdl(req.body,req.user)
        .then(function (results) {
			df.formatSucessRes(req, res, result, cntxtDtls, '', {});
		}).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	
 
        })
		})
        });
	
		})
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

/**************************************************************************************
* Controller     : punchinCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.punchoutCtrl = (req, res) => {
	console.log("req.body",req.body)
	 attendenceMdl.emplatlangMdl(req.body,req.user)
        .then(function (results) {
	var R = 6371; // km
	 var dLat = toRad(parseFloat(results[0].emp_latitude)-req.body.lat1);
	 var dLon = toRad(parseFloat(results[0].emp_longitude)-req.body.lon1);
	var lat1 = toRad(req.body.lat1);
	var lat2 = toRad(parseFloat(results[0].emp_latitude));
	console.log("dLat",dLat)
	console.log("dLon",dLon)
	console.log("lat1",lat1)
	console.log("lat2",lat2)

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var distance = R * c * 1000;
	distance = distance.toFixed(0)
	console.log("distance",distance)
  attendenceMdl.punchoutMdl(req.body,distance,req.user)
        .then(function (results) {
			attendenceMdl.punchoutselectMdl(req.body,req.user)
        .then(function (results) {
			 df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	
        })
        });
	
		})
}

function toRad(Value) {
    return Value * Math.PI / 180;
}
/**************************************************************************************
* Controller     : punchinCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.punchinoutlistCtrl = (req, res) => {
	
  attendenceMdl.punchinoutlistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : punchinCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.todaypunchinCtrl = (req, res) => {
	
  attendenceMdl.todaypunchinMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : punchinCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.todaypunchoutcountCtrl = (req, res) => {
	
  attendenceMdl.todaypunchoutcountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : punchinCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.todayabsentCtrl = (req, res) => {
	
  attendenceMdl.todayabsentMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : idlecountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.idlecountCtrl = (req, res) => {
	
  attendenceMdl.idlecountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : todaypunchinlistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.todaypunchinlistCtrl = (req, res) => {
	
  attendenceMdl.todaypunchinlistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : todaypunchinbyfiltersCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.todaypunchinbyfiltersCtrl = (req, res) => {
	
  attendenceMdl.todaypunchinbyfiltersMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : notificationcountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.notificationcountCtrl = (req, res) => {
	
  attendenceMdl.notificationcountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : absentinsertionCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.absentinsertionCtrl = (req, res) => {
	
  attendenceMdl.absentinsertionMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : notavailableCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.notavailableCtrl = (req, res) => {
	
  attendenceMdl.notavailableMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : notavailableCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.availableCtrl = (req, res) => {
	
  attendenceMdl.availableMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : startbreakCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.startbreakCtrl = (req, res) => {
	
  attendenceMdl.startbreakMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : endbreakCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.endbreakCtrl = (req, res) => {
	
  attendenceMdl.endbreakMdl(req.body, req.user)
        .then(function (result) {
			attendenceMdl.totalbreaktimeMdl(req.body, req.user)
        .then(function (results) {
			var timediff = results[0].diff_time;
			var breakid = results[0].brk_id;
			attendenceMdl.updatetimediffMdl(req.body,timediff,breakid,req.user)
        .then(function (results) {
			
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        })
		})
		});

}
/**************************************************************************************
* Controller     : totalpunchintimeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.totalpunchintimeCtrl = (req, res) => {
	
  attendenceMdl.totalpunchintimeMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : gettasklogCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.gettasklogCtrl = (req, res) => {
	
  attendenceMdl.gettasklogMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : totalcurntandbrktimeCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.totalcurntandbrktimeCtrl = (req, res) => {
	
  attendenceMdl.totalcurntandbrktimeMdl(req.body, req.user)
        .then(function (results) {
			 //attendenceMdl.totalbrktimeMdl(req.body, req.user)
       // .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
       // })
		});

}
/**************************************************************************************
* Controller     : totalattendencecountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.totalattendencecountCtrl = (req, res) => {
	console.log("success")
  attendenceMdl.totalattendencecountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : onleavecountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.onleavecountCtrl = (req, res) => {
	console.log("success")
  attendenceMdl.onleavecountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : getteamuseremployeelistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.getteamuseremployeelistCtrl = (req, res) => {
	console.log("success")
  attendenceMdl.getteamuseremployeelistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : ontimeandlatecountCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.ontimeandlatecountCtrl = (req, res) => {
	console.log("success")
  attendenceMdl.ontimeandlatecountMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : apppermissionlogdataCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.apppermissionlogdataCtrl = (req, res) => {
	console.log("success")
  attendenceMdl.apppermissionlogdataMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : punchinwebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.punchinwebCtrl = (req, res) => {
	console.log("req.body",req.body)
	 
  attendenceMdl.punchinwebMdl(req.body,req.user)
        .then(function (results) {
			attendenceMdl.punchinselectwebMdl(req.body,req.user)
        .then(function (result) {
			//attendenceMdl.insertempgpswebinfoMdl(req.body,req.user)
        //.then(function (results) {
			df.formatSucessRes(req, res, result, cntxtDtls, '', {});
		}).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	
 
        })
		//})
        });
	
		
}
/**************************************************************************************
* Controller     : punchoutwebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.punchoutwebCtrl = (req, res) => {
	console.log("req.body",req.body)
	 
  attendenceMdl.punchoutwebMdl(req.body,req.user)
        .then(function (results) {
			attendenceMdl.punchoutwebselectMdl(req.body,req.user)
        .then(function (results) {
			 df.formatSucessRes(req, res, results, cntxtDtls, '', {});
		}).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
	
       
        })
		
        });
	
		
}
/**************************************************************************************
* Controller     : punchinbasedonstatuslistCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.punchinbasedonstatuslistCtrl = (req, res) => {
	
  attendenceMdl.punchinbasedonstatuslistMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : editattendencestatusCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.editattendencestatusCtrl = (req, res) => {
	
  attendenceMdl.editattendencestatusMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}
/**************************************************************************************
* Controller     : insertattendencewebCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
*    -  durga  - Initial Function
*
***************************************************************************************/
exports.insertattendencewebCtrl = (req, res) => {
	
  attendenceMdl.insertattendencewebMdl(req.body, req.user)
        .then(function (results) {
            df.formatSucessRes(req, res, results, cntxtDtls, '', {});
        }).catch(function (error) {
            df.formatErrorRes(req, res, error, cntxtDtls, '', {});
        });

}





