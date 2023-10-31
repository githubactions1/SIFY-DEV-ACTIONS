

// Standard Inclusions
var appRoot ='/home/centos/glits/code/nodejs/SIFY_server'
var log = require(appRoot + '/utils/logmessages');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jsSHA = require('jssha');
// Import Modules
//var nodemailer = require('nodemailer');
//var ses = require('nodemailer-ses-transport');
//var smtpTransport = require('nodemailer-smtp-transport');

var request = require('request');
//var parseString = require('xml2js').parseString;

//Account- 1
var SID = "SIFY"
var TOKEN = "399e2e1a090e35f5dfd989c95b150968ca9d3aab"
var EXOPHONE = "09513886363"

//079-336-85900   <- landline, so 0 need to be used as the first digit

//Account- 2 created by sony
// var SID = "dreamstep1"
// var TOKEN = "aaf7ba0b3873b6f952d36980e8c09c8869f607ae"
// var EXOPHONE = "09513886363"



//var awstransporter = nodemailer.createTransport(ses({
   // accessKeyId: 'AWSACCESSKEY',
    //secretAccessKey: 'AWS/Secret/key'
//}));

// create reusable transporter object using the default SMTP transport 
// const mailTransport = nodemailer.createTransport(`smtps://${auth.eml}:${auth.pwd}@smtp.gmail.com`);

var mailDt = {};
mailDt.host = 'mail.apsfl.co.in';
mailDt.port = 25;
mailDt.auth = {
    user: 'apfiber@apsfl.co.in',
    pass: 'f!bergr!d'
};
mailDt.transport = { protocol: 'smtp' };
mailDt.smtp = { auth: false };
mailDt.debug = true;
// mail.logger = true;
// mail.secure = false;
// console.log(mailDt);
//var mailTrmailTr = nodemailer.createTransport(smtpTransport(mailDt));

/**************************************************************************************
* Controller     : sendMail
* Parameters     : req,res()
* Description    : send mail with defined transport object
* Change History :
* 07/09/2016    - Sunil Mulaga - Initial Function
* 09/20/2016    - Sony Angel   
***************************************************************************************/
exports.sendMail = function (mailOptions, callback) {
    // if (!mailOptions.from) mailOptions.from = auth.eml;
    // mailOptions.html = `<table cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td align="center" valign="top" width="640" class="m_9089412924928323771bodywrap"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;padding:20px 0">&nbsp;</td><td width="600" valign="middle" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:bold;text-align: center;padding: 20px 0 10px; border-bottom: 3px solid #3F51B5"> <img src="../client/src/assets/images/APSFL.png" width="160" height="50" alt="APSFLs" border="0" class="CToWUd"></td></tr></tbody></table>` + mailOptions.html || mailOptions.text + `<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="640" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:20px 0"><table width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td><td width="460" colspan="2" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> This message was sent from an unmonitored e-mail address. Please do not reply to this message.<a href="" title="" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl=""></a><br> <a href="" title="Privacy" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Privacy</a> | <a href="" title="Legal" style="color:#0072c6;text-decoration:underline" target="_blank" data-saferedirecturl="">Legal</a></p><p> <span dir="ltr">Dreamstep Office<br>Rajahmundry, AP<br>9133313567 IN</span></p></td><td width="40" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0" class="m_9089412924928323771mobileHidden">&nbsp;</td><td width="100" align="left" valign="bottom" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;line-height:16px;padding:0" class="m_9089412924928323771mobileBlock"><p> <img src="../client/src/assets/images/APSFL.png" width="100" height="22" alt="Smart Cards" border="0" class="CToWUd"></p></td><td width="20" valign="middle" bgcolor="#f2f2f2" style="color:#000000;font-family:'Segoe UI',Arial,sans-serif;font-size:12px;padding:0">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`
    // mailTransport.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         // console.log(error);
    //         return callback(error, null);
    //     }
    //     console.log('Message sent: ' + info.response);
    //     callback(null, info.response);
    //     return;
    // });
	mailTr.sendMail({
		from: 'apfiber@apsfl.co.in',
		to: mailOptions.to,
		subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
        attachments: [{  
          filename: mailOptions.filename,
          path: mailOptions.path 
      },]
	}, function (err, info) {
		if (err) {
			console.log(err);
			return callback(err, null);
		}
		console.log(info);
        return callback({}, info.response);
	})
}

/**************************************************************************************
* Controller     : sendAWSMail
* Parameters     : req,res()
* Description    : send mail with defined transport object 
* Change History :
* 07/09/2016    - Sunil Mulaga - Initial Function
* 09/20/2016    - Sony Angel   
***************************************************************************************/
exports.sendAWSMail = function (mailOptions, callback) {
    if (!mailOptions.from) mailOptions.from = auth.eml;
    awstransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


/**************************************************************************************
* Controller     : sendDSMS
* Parameters     : req,res()
* Description    : To send sms using Dreamstep
* Change History :
* 07/09/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.sendDSMS = function (toNumber, message, tmplt_id, callback) {

    //var postData = {
        //"outboundSMSMessageRequest": {
            //"address": ["tel:" + toNumber],
            //"senderAddress": "tel:DRMSTP",
            //"outboundSMSTextMessage": { "message": message },
            //"clientCorrelator": "",
            //"messageType": "0",
            //"receiptRequest": { "notifyURL": "", "callbackData": "" },
            //"senderName": "", "category": ""
        //}
    //}
    var options = {
        method: 'get',
        rejectUnauthorized: false,
        //body: postData, // Javascript object
        //json: true, // Use,If you are sending JSON data
        //url: 'http://api-openhouse.imimobile.com/smsmessaging/1/outbound/tel%3A%2BDRMSTP/requests',
        url : 'https://smsgw.sms.gov.in/failsafe/MLink?username=fibernet.sms&pin=V@7e%233Ty&message='+message+'&mnumber=91'+toNumber+'&signature=APFIBR&dlt_entity_id=1101379100000041570&dlt_template_id='+tmplt_id
        //headers: {
          //"Key": "4360645b-e9c4-49f7-b746-e045bacbb29b",
            //"Content-Type": "application/json",
            //"Accept": "application/json"
        //}
    }

    request(options, function (err, res, body) {
        if (err) { callback(err, null); console.log('Error :', err); return; }

        if (res.body.outboundSMSMessageRequest)
            resUID = (typeof res.body.outboundSMSMessageRequest.resourceURL !== 'undefined') ? res.body.outboundSMSMessageRequest.resourceURL.substring(res.body.outboundSMSMessageRequest.resourceURL.indexOf("uuid") + 6) : null;

        if (toNumber) {
            callback(null, { "usr_mbl": toNumber });
        }
    });
}


/**************************************************************************************
* Controller     : sendESMS
* Parameters     : req,res()
* Description    : To send sms using exotel
* Change History :
* 07/09/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.sendESMS = function (toNumber, message, callback) {
    var fnm = "sendESMS";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var url = 'https://' + SID + ':' + TOKEN + '@twilix.exotel.in/v1/Accounts/' + SID + '/Sms/send';

    var params = {
        From: EXOPHONE,
        To: toNumber,
        Body: message,
    }

    makeRequest(url, params, function (error, response) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, response.TwilioResponse.SMSMessage);
        }
    });
}

/**************************************************************************************
* Controller     : connectCall
* Parameters     : req,res()
* Description    : To connet call
* Change History :
* 07/09/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.connectCall = function (firstNumber, secondNumber, callback) {
    var fnm = "connectCall";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var url = 'https://' + SID + ':' + TOKEN + '@twilix.exotel.in/v1/Accounts/' + SID + '/Calls/connect';

    var params = {
        From: firstNumber,
        To: secondNumber,
        CallerId: EXOPHONE,
        CallType: 'trans',
    }

    makeRequest(url, params, function (error, response) {
        console.log(response)
        if (error) {
            callback(error, null);
        } else {
            callback(null, response.TwilioResponse.Call);
        }
    });
}

/**************************************************************************************
* Controller     : getCallDetails
* Parameters     : req,res()
* Description    : To connet call
* Change History :
* 07/09/2016    - Sony Angel - Initial Function
*
***************************************************************************************/
exports.getCallDetails = function (id, callback) {
    var fnm = "getCallDetails";
    log.message("INFO", cntxtDtls, 100, `In ${fnm}`);
    var url = 'https://' + SID + ':' + TOKEN + '@twilix.exotel.in/v1/Accounts/' + SID + '/Calls/' + id;
    request.get(url, function (error, response, body) {
        if (error) {
            callback(error, response);
        } else {
            parseString(response.body, { explicitArray: false }, function (err, result) {
                callback(null, result.TwilioResponse.Call);
            });
        }
    });
}

function makeRequest(url, params, callback) {
    request.post(url, { form: params }, function (error, response, body) {
        console.log(response.body)
        if (error) {
            callback(error, response);
        } else {
            parseString(response.body, { explicitArray: false }, function (err, result) {
                callback(null, result);
            });
        }
    });
}
