var categoriesRtr = require('express').Router();
var appRoot = '/home/centos/glits/code/nodejs/SIFY_server'
var modRoot = appRoot + '/server/modules/categories/'
var SnModRoot = appRoot + '/server/modules/auth/'
var checkUser = require(SnModRoot + 'controllers/accessCtrl');

const categoriesCtrl = require(modRoot + 'controllers/categoriesCtrl');

categoriesRtr.get('/getcategories',checkUser.hasToken, categoriesCtrl.getcategoriesCtrl);
categoriesRtr.post('/getsubcategories',checkUser.hasToken, categoriesCtrl.getsubcategoriesCtrl);

categoriesRtr.post('/insertcomplaintcategories',checkUser.hasToken, categoriesCtrl.insertcomplaintcategoriesCtrl);
categoriesRtr.post('/editcomplaintcategories',checkUser.hasToken, categoriesCtrl.editcomplaintcategoriesCtrl);
categoriesRtr.post('/deletecomplaintcategories',checkUser.hasToken, categoriesCtrl.deletecomplaintcategoriesCtrl);
categoriesRtr.post('/getcomplaintcategories',checkUser.hasToken, categoriesCtrl.getcomplaintcategoriesCtrl);
categoriesRtr.post('/gettasksubcategoriescount',checkUser.hasToken, categoriesCtrl.getsubcategoriescountCtrl);
categoriesRtr.post('/getsubcategoriesbytaskstatusandcategory',checkUser.hasToken, categoriesCtrl.getsubcategoriesbytaskstatusandcategorycountCtrl);
categoriesRtr.get('/gethardwarelist',checkUser.hasToken, categoriesCtrl.gethardwarelistCtrl);

module.exports = categoriesRtr;