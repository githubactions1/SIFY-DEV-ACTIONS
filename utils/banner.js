var chalk = require('chalk');
const os = require('os');


exports.startPrint = function(url) {
// style a string 

// for (i=0;i<os_cpu.length;i++)
//   console.log(os_cpu[i].model)
//console.log(as.app.audit_dir)


// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§


console.log("\n\n © Andhra Pradesh State FiberNet Ltd..\
             \n "+chalk.green("  Server URL      ")+": "+url +"\
             \n"+chalk.green("   Start Time      ")+": "+moment().format('MM-DD-YYYY h:mm:ss')+"\
             \n"+chalk.green("   App Name        ")+": "+as.app.app_name+"\
             \n"+chalk.green("   App Code        ")+": "+as.app.app_cd+"\
             \n"+chalk.green("   App Id          ")+": "+as.app.app_id+"\
             \n"+chalk.green("   Url Audit       ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   App Base        ")+": "+appRoot+"\
             \n"+chalk.green("   Audit Directory ")+": "+appRoot+"/"+as.app.audit_dir+"\
             \n"+chalk.green("   Log Directory   ")+": "+appRoot+"/"+as.app.log_dir+"\
             \n"+chalk.green("   Restart Audit   ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   API Load Audit  ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   DB Load Audit   ")+": "+(as.app.audit_requests?'Enabled':'Disbled')+"\
             \n"+chalk.green("   Server Name     ")+": "+os.hostname()+"\
             \n"+chalk.green("   Total Memory    ")+": "+os.totalmem()/(1024*1024*1024)+"\
             \n"+chalk.green("   Free Memory     ")+": "+os.freemem()/(1024*1024*1024)+"\
             \n"+chalk.green("   Platform        ")+": "+os.platform()+"\
             \n"+chalk.green("   Total CPU       ")+": "+os.cpus().length+"\
             \n"+chalk.green("   Process Id      ")+": "+process.pid+"\
             \n"+chalk.green("   App Debug Mode  ")+": "+as.app.debug_level);
};

exports.EndPrint = function(url) {

console.log("\n   GGGGGGGGGGGGGGGGG     LL          IIIIIIIIII     TTTTTTTTTTT     SSSSSSSS\
             \n   GG                    LL              II             TT          SS\
             \n   GG                    LL              II             TT          SS\
             \n   GG      GGGGGGGGG     LL              II             TT          SSSSSSSS\
             \n   GG      GG      G     LL              II             TT                SS\
             \n   GG      GG      G     LL              II             TT                SS\
             \n   GGGGGGGGGG      G     LLLLLLLL    IIIIIIIIII         TT          SSSSSSSS\
			 \n \
             \n\n greenlantern it solutions pvt ltd.\
             \n   Server      : "+url +"\
             \n   Termination Time  : "+moment().format('MM-DD-YYYY h:mm:ss'));

};
