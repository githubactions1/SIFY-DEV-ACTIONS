
var mysql = require('mysql');

var MySQLConPool = {};

var USER = 'sifyuat';
var PWD = 'S!fyuat@trackON#123';
var DATABASE = 'sify_trackon';
var DB_HOST_NAME = '3.6.78.214';
var DB_PORT = '3306';

var MAX_POOL_SIZE = 800;
var MIN_POOL_SIZE = 200;

var MySQLConPool = mysql.createPool({
       host: DB_HOST_NAME,
       user: USER,
       password: PWD,
       port: DB_PORT,
       database: DATABASE,
       acquireTimeout: 5000,
       connectionLimit: MAX_POOL_SIZE,
       debug: false,
       multipleStatements: false,
       supportBigNumbers: true
});


MySQLConPool.on('acquire', function (connection) {
       // log.info('Database Connection Acquired', connection.threadId);
	
});
MySQLConPool.on('release', function (connection) {
       // log.info('Database Connection Released', connection.threadId);
});
MySQLConPool.on('enqueue', function () {
       //  log.info('Waiting for available connection slot');
});

exports.MySQLConPool = MySQLConPool;

var BatchConPool = {};

var USER = 'sifyuat';
var PWD = 'S!fyuat@trackON#123';
var DATABASE = 'sify_logs';
var DB_HOST_NAME = '3.6.78.214';
var DB_PORT = '3306';


var MAX_BATCH_POOL_SIZE = 200;
var MIN_BATCH_POOL_SIZE = 100;

var BatchConPool = mysql.createPool({
       host: DB_HOST_NAME,
       user: USER,
       password: PWD,
       port: DB_PORT,
       database: DATABASE,
       acquireTimeout: 5000,
       connectionLimit: MAX_BATCH_POOL_SIZE,
       debug: false,
       multipleStatements: false,
       supportBigNumbers: true
});

BatchConPool.on('acquire', function (connection) {
       // log.info('Database Connection Acquired', connection.threadId);
});
BatchConPool.on('release', function (connection) {
       // log.info('Database Connection Released', connection.threadId);
});
BatchConPool.on('enqueue', function () {
       //  log.info('Waiting for available connection slot');
});

exports.BatchConPool = BatchConPool;