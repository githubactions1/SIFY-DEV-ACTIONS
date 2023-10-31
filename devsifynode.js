
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSession);
var helmet = require('helmet');
var app = express();
let http = require('http');
http.globalAgent.maxSockets = 5;
//https.globalAgent.maxSockets = 5;
let socketIO = require('socket.io');

var errorhandler = require('errorhandler');
var notifier = require('node-notifier');
let ejs = require('ejs');
var fs = require('fs');
var compression = require('compression')
var moment = require('moment');
var path = require('path');
var nconf = require('nconf');
var expressValidator = require('express-validator');
var util = require('util');




var appRoot = __dirname;

as = require(appRoot + '/utils/settings.utils').getSettings();
var df = require(appRoot + '/utils/dflower.utils');

var bootstrap_load = require('./utils/bootstrap_load');
var sch = require(appRoot + '/utils/schedule.utils');
//app.use(helmet());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// app.use(express.static(path.join(__dirname, '/algtHst')));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use('/prodimages', express.static('/home/centos/glits/production/uploads'));
app.use('/staticimgs', express.static('/gvmc/filestore/assests/images'));
app.use('/checklistimagesProd', express.static('/home/centos/glits/checklist/images'));
app.use('/httpschecklistimagesProd', express.static('/home/centos/glits/checklist/images'));
app.use('/flashnewsimagesProd', express.static('/home/centos/glits/flashnews/images'));
app.use('/profileimagesProd', express.static('/home/centos/glits/profile/images'));

var sqldb = require(appRoot + '/config/db.config');
//import MySQLConPool from './config/db.config.js';
// Load session options from settings
//console.log(as);
var session_options = as.sifyapp.session_info;

sessionStore = '';
sqldb.MySQLConPool.getConnection(function (err, connection) { // get connection from Connection Pool
  if (err) {
    //log.db.conError(cntxtDtls, err, err.fatal);
    //metric.incriment('db_contn_err');
    //log.err("Can not get the connection for Session Datastore", 0, cntxtDtls)
    console.log(err)
    return err;
  } else {
    sessionStore = new MySQLStore(session_options, connection);
  }

});

app.use(expressSession({
  key: '69Atu22GZTSyDGW4sf4mMJdJ42436gAs',
  secret: '3dCE84rey8R8pHKrVRedgyEjhrqGT5Hz',
  store: sessionStore,
  secure: true,
  resave: false,
  saveUninitialized: true
}));



// let activeSessions = []

// app.use((req, res, next) => {
//   if (req.session.views) {
//     req.session.views++;
//   } else {
//     req.session.views = 1;
//   }
//   console.log(`activesessions = ${req.session.views}`)
//   next();
// });



app.use(cors());
app.use(cookieParser());
app.use(compression({ threshold: 0 }));


app.use(errorhandler({
  log: errorNotification
}));

function errorNotification(err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // response headers you wish to expose
  res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Origin', 'http://103.167.216.233');
  next();
});
app.use('/apirt1/sify', require('./server/routes/sifyapproutes'));
console.log("Hello World!")

sch.scheduleScripts(function (err) {
	if (err) {
	  log.error("Issues with Scheculing :: " + err, 0, cntxtDtls);
	}
});
  
var server = app.listen(as.sifyapp.app_port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`${as.sifyapp.app_name} App Started.Listening at http://${host}:${port}`, 0, df.getModuleMetaData(__dirname, __filename))
});


// Function to get the count of open network connections
// function getOpenConnections() {
//   server.getConnections((err, count) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`Open connections: ${count}`);
//     }
//   });
// }

// getOpenConnections()
// Periodically check and log open connections count
//setInterval(getOpenConnections, 5000); // Check every 5 seconds


let connections = 0;
app.use((req, res, next) => {
   connections++;
   res.connection.timestamp = Date.now(); // Record the timestamp

   res.on('finish', () => {
     connections--;
   });
	console.log("connections ---------------------------- ",connections)
   next();
});

const MAX_CONNECTIONS = 900;

//setInterval(() => {
//  if (connections >= MAX_CONNECTIONS) {
//    console.log(`Reached ${MAX_CONNECTIONS} connections. Restarting...`);
//    process.exit(0); // Exit gracefully to let PM2 restart the app
//  }
//}, 5000);

const activeSockets = new Set();
const net = require('net');
console.log("new socket")
// Create a socket connection
const client = new net.Socket();

// Connect to a server
client.connect(3500, '3.6.78.214', () => {
    console.log('Connected to the server');
    client.lastActivity = Date.now();
    console.log(client,"clieeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnntttttttttttttttttttttttt")
    activeSockets.add(client);
    // You can now send and receive data over the connection

    // Close the connection when done
    // This properly closes the socket

    // Alternatively, you can use client.destroy() if you want to forcibly terminate the connection.
});

// Handle errors
client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
    // Handle the error appropriately, and consider closing the connection
    client.end();
});

// Handle the connection closing
client.on('close', () => {
    client.end();
    activeSockets.delete(client)
    console.log('Connection closed');
});

const SOCKET_TIMEOUT = 2000; // 60 seconds (adjust as needed)

function closeIdleSockets() {
  const now = Date.now();
  for (const socket of activeSockets) {
    const lastActivity = socket.lastActivity || 0;
    if (now - lastActivity > SOCKET_TIMEOUT) {
      console.log(socket,"sockeeeeeeeeeeeeeeeeeeeeeeeettttttttttttttttttttttttt")
      socket.end(); // Close the socket
    }
  }
}

setInterval(closeIdleSockets, 2000);
// console.log(totalConnections,"totalConnections")


// var io = socketIO(server);
// //const io = new socketIO(server);


// io.on('connection', function (socket) {
//   console.log('Socket has connected to the client.');
//   socket.on('disconnect', function () {
//     console.log('Socket has disconnected from the client.');
//   });
//   socket.on('join', function (data) {
//     socket.join(data.website); // We are using room of socket io
//   });
//   socket.on('newmessage', function () {
//     console.log('message emitted');
//   })
// });

// process.on('exit', (code) => {
// 	console.log(`Process is about to exit with code: ${code}`);
// 	process.exit(0);
//   //banner.EndPrint("http://" + server.address().address + ":" + server.address().port);
// });

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);


// // Function to handle graceful shutdown
// function gracefulShutdown() {
//   console.log("Server is shutting down gracefully...");
  
//   // Close your database connections here if applicable
//   // Example:
//   // dbConnection.close();

//   // Close the HTTP server
//   server.close(function () {
//     console.log("HTTP server closed.");
    
//     // Close other resources or perform cleanup tasks here if needed

//     // Exit the process
//     process.exit(0);
//   });

//   // Optionally, set a timeout to forcefully exit if cleanup takes too long
//   setTimeout(function () {
//     console.error("Forcing process exit after cleanup timeout...");
//     process.exit(1);
//   }, 5000); // 5 seconds
// }