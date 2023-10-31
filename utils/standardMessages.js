/********************************************************************************************
---------------------------------------------------------------------------------------------
File              : logmessages.js
Description       : All the standard messages and codes used in the application are listed here.
---------------------------------------------------------------------------------------------
********************************************************************************************/
var moment = require('moment');
var STD_DATE_FORMAT = "YYYY-MM-DD";
var message = {
	"SUCCESS": { "code": 200, "message": null }
	, "SUCCESS_EXT": { "code": 200, "message": "No Caf_id Found" }
	, "MODEL_ERR_EXT": { "code": 200, "message": "No Caf_id Found" }
	, "SUCCESS_APP": { "code": 200, "message": "success" }
	, "SUCCESS_PASS_APP": { "code": 200, "message": "Password Updated." }
	, "SUCCESS_APP_MW": { "code": 200, "message": "Already Package Exits" }
	, "LIMIT_EXCEED_ERROR": { "code": 600, "message": "Query Limit Exceeded Error" }
	, "FAILED_APP": { "code": 301, "message": "Failed" }
	, "INVALID_DATA_APP": { "code": 301, "message": "Invalid Old Password" }
	, "INVALID_DATA_Same_APP": { "code": 301, "message": "Old Password And New Password Same" }
	, "INVALID_DATA_MBLE_APP": { "code": 301, "message": "Multiple numbers found. Please try with CAF ID." }
	, "INVALID_DATA_NOT_APP": { "code": 301, "message": "No matching records found." }
	, "INVALID_PASS_NOT_APP": { "code": 301, "message": "Password Not Updated." }
	, "INVALID_QUERY_PERMS": { "code": 600, "message": "Invalid Parameters send" }
	, "INVALID_QUERY_ADD_PERMS": { "code": 600, "message": "No Customers Found" }
	, "INVALID_QUERY_CMP": { "code": 204, "message": "No Complaints" }
	, "MODEL_ERR": { "code": 700, "message": "Internal Database Error" }
	, "MODEL_LOGIN_ERR": { "code": 700, "message": "Please Check Your Credentials" }
	, "IVALID_DATA": { "code": 601, "message": "Internal Data Provided" }
	, "NO_REQ_FIELDS": { "code": 600, "message": "Not all required fields are send" }
	, "IVALID_DATE": { "code": 601, "message": "Invalid date format. All dates should be in " + STD_DATE_FORMAT + " format" }
	, "UN_REQ_FIELDS": { "code": 601, "message": "Invalid parameters send" }
	, "DB_CONNECTION_ISSUE": { "code": 700, "message": "Database Query/Connection Error" }
	, "DB_QUERY_ISSUE": { "code": 700, "message": "Database Query/Connection Error" }
	, "APP_UPDT": { "code": 48, "message": "Sorry, server unable to find app detials." }
	, "APP_LOGIN_ERROR": { "code": 401, "message": "Sorry, Customer is Terminated." }
	, "UN_AUTH_ACCESS": { "code": 406, "message": "Unauthorized access/attempt. Please check and retry" }

};

exports.message = message;
