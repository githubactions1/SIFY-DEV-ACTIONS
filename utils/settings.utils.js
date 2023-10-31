// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
var nconf = require('nconf');

// add multiple files, hierarchically. notice the unique key for each file
var loadConfigFiles = function () {
    nconf.file('sifyapp', './config/sifyapp.config.json');
    nconf.file('url_servicenow', './config/url.config.json');
}

/*****************************************************************************
* Function 		  : getSettings
* Description   : get all the settings
* Arguments		  : callback function
* 15-11-2022 Ramesh Patlola
******************************************************************************/
exports.getSettings =  function (callback) {
    loadConfigFiles();
    var t_settings = {
      "sifyapp": nconf.get('sifyapp'),
      "url_servicenow": nconf.get('url_servicenow')
    }
  
    return t_settings;
};