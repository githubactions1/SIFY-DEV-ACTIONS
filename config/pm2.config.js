// pm2.config.js
module.exports = {
    apps: [
      {
        name: 'devsifynode',
        script: 'devsifynode.js',
        // Other options...
       // watch: true, // Enable file watching for automatic restarts
        //ignore_watch: ['node_modules', 'logs'], // Folders/files to ignore for watching
       // instances: 1, // Number of instances to run
       //max_memory_restart: '1G', // Restart if memory usage exceeds 1GB
      //  exec_mode: 'cluster', // Run in cluster mode
       autorestart: true, // Automatically restart on failure
        max_handles: 1, // Set the threshold for active handles
      //  restart_delay: 85, // Delay (in milliseconds) between restart attempts
      },
    ],
  };
  
// console.log("up")
// const pm2 = require('pm2');
// console.log("down")

// // Connect to the PM2 daemon
// pm2.connect((err) => {
//   if (err) {
//     console.error('PM2 connection error:', err);
//     process.exit(1);
//   }

//   // Check handles count periodically
//   setInterval(() => {
//     pm2.describe('devsifynode.js', (err, appInfo) => {
//       if (err) {
//         console.error('PM2 app info error:', err);
//         return;
//       }

//       const maxHandlesThreshold = 75;

//       // Check if handles count exceeds the threshold
//       if (appInfo[0].monit.max_handles > maxHandlesThreshold) {
//         console.log('Handles exceeded threshold, reloading...');
//         pm2.reload('devsifynode.js', (reloadErr) => {
//           if (reloadErr) {
//             console.error('PM2 reload error:', reloadErr);
//           } else {
//             console.log('Application reloaded successfully.');
//           }
//         });
//       }
//     });
//   }, 60000); // Check every minute
// });
