var appRoot = '/home/centos/glits/code/nodejs/SIFY_server/';
var checklistMdl = require(appRoot + 'server/modules/checklist/models/checklistMdl');
var df = require(appRoot + '/utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
const mime = require('mime');
var fs = require("fs");

/**************************************************************************************
* Controller     : updateorInsrtchcklstCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.updateorInsrtchcklstCtrl = function (req, res) {
	var fnm = "updateorInsrtchcklstCtrl";
    
    checklistMdl.getchcklstDtlsMdl(req.body.data, req.user)
        .then((results) => {
			var length = results[0].count;
            checklistMdl.updateorInsrtchcklstMdl(req.body.data, length, req.user)
				.then((results) => {
					df.formatSucessAppRes(req, res, JSON.stringify(req.body.data), cntxtDtls, fnm, {});
				}).catch((error) => {
					df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert/Update to DB" });
				});
        }).catch((error) => {
			console.log(error)
            df.formatErrorRes(req, res, error, cntxtDtls, fnm, {});
        });
}

/**************************************************************************************
* Controller     : chcklistimageDataUrlCtrl
* Parameters     : req,res()
* Description    : get details of all EntrpeCstmrTyp
* Change History :
* 26/04/2023   -  Ramesh Patlola  - Initial Function
*
***************************************************************************************/
exports.chcklistimageDataUrlCtrl = function (req, res) {
	var fnm = "chcklistimageDataUrlCtrl";
	
	function img_upload(img, flname, callback) {
        //var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
            response = {};

        //if (matches.length !== 3) {
            //callback(false, res)
        //}

        response.type = 'jpeg';
        response.data = new Buffer.from(img, 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
		//mime.define({
			//'png': ['png']
		//})
        //let extension = mime.extension(type);
        var name = 'offr_img_' + Date.now();
        //let fileName = flname + "." + extension;
        let fileName = flname + "_" + name + ".jpg";
        var dir = '/home/centos/glits/checklist/images';
		var url = 'http://sify.digitalrupay.com/checklistimagesProd'
        console.log(fs.existsSync(dir))
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);

        }

        try {
            fs.writeFileSync(dir + "/" + fileName, imageBuffer, 'utf8');
            res['Location'] = `${dir}/${fileName}`;
			res['url'] = `${url}/${fileName}`
			console.log("Location",res['Location']);
			console.log("url",res['url'])
            callback(false, res.url)
        } catch (e) {
            console.log(e)
        }

    }
	
	img_upload(req.body.img, req.body.stt_no,(err, attKycChres) => {
		if (!err) {
			console.log("attKycChres",attKycChres)
			df.formatSucessAppRes(req, res, attKycChres, cntxtDtls, fnm, {});
		} else {
			df.formatErrorRes(req, res, error, cntxtDtls, fnm, { error_status: "707", err_message: "Failed to Insert image" });
		}
	});
	
				
}
