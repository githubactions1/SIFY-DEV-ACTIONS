// Standard Inclusions
var log = require( './logmessages');
var std = require( './standardMessages');
var sqlParser = require( './sql.parser');
var sqldb = require( '../config/db.config');
var df = require( './dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);

/**************************************************************************************
* Controller     : execQuery
* Parameters     : None
* Description    : Execute a query
* Change History :
* 15-11-2022 Ramesh Patlola
***************************************************************************************/
exports.execQuery = function (ConPool, Qry, cntxtDtls, userDtls, fnm, callback) {
      //console.log("exutequery1",fnm)
      //console.log("executeEachQuery get data from execQuery",userDtls);
      if (Qry) {
            Qry = Qry.trim();
            // console.log(Qry);

            // Split query by semi-colon
            var multiQrs = sqlParser.multiQrs(Qry);
            // console.log(multiQrs);

            const len = multiQrs.length;
            let q = 0;
            let qry_rslts = [];
            if (callback && typeof callback == "function")
                  multiQrs.forEach(query => {
                        executeEachQuery(query, qry_rslts, ConPool, cntxtDtls, userDtls, fnm, function (err, results) {
                              //console.log("excutequery2",fnm)
                              if (err) {
                                    callback(err, results);
                                    return;
                              }
                              q++;
                              if (q == len) {
                                    if (results) len > 1 ? results : results = results[0];
                                    callback(err, results);
                              }
                        })
                  })
            else
                  return new Promise((resolve, reject) => {
                        multiQrs.forEach(query => {
                              executeEachQuery(query, qry_rslts, ConPool, cntxtDtls, userDtls, fnm, function (err, results) {
                                //console.log("excutequery3",fnm)
                                    if (err) {
                                          reject(err);
                                    }
                                    // console.log(q);
                                    q++;
                                    if (q == len) {
                                          if (results) len > 1 ? results : results = results[0];
                                          resolve(results);
                                    }
                              })
                        })

                  })

      } else console.log('No Query to execute');
}

/**************************************************************************************
* Controller     : execTrnsctnQuery
* Parameters     : None
* Description    : Execut SQL In a single Transaction
* Change History : 
* 15-11-2022 Ramesh Patlola
***************************************************************************************/
var execTrnsctnQuery = function (ConPool, Qry, cntxtDtls, userDtls,fnm, callback) {
      let qry_rslts = [];
      const len = Qry.length;
      if (len == 1) { // Single Query

            return new Promise((resolve, reject) => {
                  executeEachQuery(Qry[0], qry_rslts, ConPool, cntxtDtls, userDtls,fnm, function (err, results) {
                        if (err) {
                              reject(err);
                        } else {
                              resolve(results);
                        }
                  })
            })
      } else {
            LastQry = Qry[len - 1];
            QryRemaining = Qry.splice(0, len - 1)
            let q = 0;
            return new Promise((resolve, reject) => {
                  ConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
                        if (err) { log.db.conError(cntxtDtls, Qry, err.code, err.fatal); callback(err, null); return err; }
                        connection.beginTransaction(function (err) {
                              if (err) { throw err; }
                              QryRemaining.forEach(query => {
                                    executeEachTransQuery(connection, query, qry_rslts, ConPool, cntxtDtls, userDtls, function (err, results) {
                                          if (err) { reject(err); }
                                          q++;
                                          if (q == len - 1) { // Executing the last query after executing all the queries in QryRemaining
                                                connection.query(LastQry, function (error, results, fields) {
                                                      if (error) {
                                                            return connection.rollback(function () {
                                                                  throw error;
                                                            });
                                                      }
                                                      connection.commit(function (err) {
                                                            if (err) {
                                                                  return connection.rollback(function () {
                                                                        throw err;
                                                                  });
                                                            }
                                                            qry_rslts.push(results);
                                                            connection.release();
                                                            resolve(qry_rslts);
                                                            return;
                                                      });
                                                }); // -- Final Query End
                                          }// -- Final Query End of if
                                    }) // -- end of executeEachTransQuery
                              }) // End of for loop for QryRemaining
                        }); // Transaction End 
                  }); // -- End of Get connection
            }) // End
      } // End of else that need transaction
}
exports.execTrnsctnQuery = execTrnsctnQuery;
/*****************************************************************************
* Function      : getNxtKeyMdl
* Description   : Execute query to get Next key value generated
* Arguments     : callback function
* Change History :
*  15-11-2022 Ramesh Patlola
******************************************************************************/
var getNxtKeyMdl = (ky_hndlr_tx, user, callback) => {
      var QRY_TO_EXEC = [`SELECT ky_id from ky_sqnce_dtl_t WHERE  ky_hndlr_tx= '${ky_hndlr_tx}' FOR UPDATE`
            , `UPDATE ky_sqnce_dtl_t SET ky_id=ky_id+1 WHERE  ky_hndlr_tx= '${ky_hndlr_tx}'`];
      //console.log(QRY_TO_EXEC) 
      if (callback && typeof callback == "function")
            dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user, function (err, results) {
                  callback(err, results);
                  return;
            });
      else
            return execTrnsctnQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, user);
}

/**************************************************************************************
* Controller     : getNxtKey
* Parameters     : req,res()
* Description    : get notes
* Change History :
* 15-11-2022 Ramesh Patlola
***************************************************************************************/
exports.getNxtKey = function (hndlr_tx) {
      return new Promise((resolve, reject) => {
            // console.log(len)
            getNxtKeyMdl(hndlr_tx, { user_id: null })
                  .then(function (results) {
                        resolve(JSON.parse(JSON.stringify(results[0][0].ky_id)));
                  }).catch(function (error) {
                        reject(error);
                  });
      })
}
/**************************************************************************************
* Controller     : executeEachTransQuery
* Parameters     : req,res()
* Description    : Execute each query for a transaction
* Change History :
* 15-11-2022 Ramesh Patlola
***************************************************************************************/
function executeEachTransQuery(connection, query, qry_rslts, ConPool, cntxtDtls, userDtls, callback) {
      if (!query) { return callback(false, qry_rslts); }
      // Execute the query
      connection.query(query, function (err, rows) {
            if (err) callback(err, null);
            if (rows) qry_rslts.push(rows);
            callback(false, qry_rslts);
      });
}

function executeEachQuery(query, qry_rslts, ConPool, cntxtDtls, userDtls, fnm, callback) {
      //console.log("userDtls",userDtls)
      //console.log("excutequery4",fnm)
      let audit = false;
      // let audit = true;
      // if (!query) { return callback(false, qry_rslts); }

      //var qryEle = sqlParser.sql2ast(query);
      var qryEle = "check";
       //console.log(qryEle);

      // if(typeof audit_sqltable_lst !== 'undefined')
      // if (audit_sqltable_lst && audit_sqltable_lst.length) {
      //       for (var i = 0; i < audit_sqltable_lst.length; i++) {
      //             for (var j = 0; j < qryEle.TABLES.length; j++) {
      //                   if (audit_sqltable_lst[i].tbl_nm == qryEle.TABLES[j].name) {
      //                         audit = audit_sqltable_lst[i];
      //                   }
      //             }
      //       }
      // }
      //console.log('Audit ::: ', audit ? true : false);
      if (audit) {
            execAdtQry(qryEle, query, audit, ConPool, cntxtDtls, userDtls, (err, results) => {
                  if (err) callback(err, null);
                  if (results) qry_rslts.push(results);
                  callback(false, qry_rslts);
            })
      } else {
            conn_execSQL(qryEle, query, ConPool, cntxtDtls, userDtls, fnm, function (err, results) {
                  //console.log("excutequery5",fnm)
                  if (err) callback(err, null);
                  if (results) qry_rslts.push(results);
                  callback(false, qry_rslts);
            });
      }
}

function execAdtQry(qryEle, query, audit, ConPool, cntxtDtls, userDtls, callback) {
      // console.log('In AdtQry_fn');
      var qry_typ = qryEle.TYPE;
      var tbl_nm = qryEle.TABLES[0].name + ' ' + qryEle.TABLES[0].clauses;
      var joins = qryEle.JOINS || '';
      var where = qryEle.WHERE ? ' where ' + qryEle.WHERE : '';

      var previous_record = [];
      // console.log(qryEle);

      if (qry_typ == 'SELECT' || qry_typ == 'INSERT') {
            var get_records = `select count(*) as count from ${tbl_nm} ${joins} ${where}`;
            // console.log(get_records);

            conn_execSQL(qryEle, get_records, ConPool, cntxtDtls, function (pq_err, results) {
                  if (pq_err) {
                        callback(pq_err, results);
                        return;
                  }
                  previous_record = results;
                  // console.log('previous_record', previous_record.length);

                  if (qry_typ == 'SELECT') {
                        if (audit.max_slct && audit.max_slct < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, 0);
                              return;
                        }
                  } else if (qry_typ == 'INSERT') {
                        if (audit.max_insrt && audit.max_insrt < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, 0);
                              return;
                        }
                  }
                  // Execute actual query
                  conn_execSQL(qryEle, query, ConPool, cntxtDtls, function (err, results) {
                        if (err) {
                              callback(err, results);
                              return;
                        }
                        // console.log(audit);
                        //var adt_qry = `insert into adt_sql_dtl_t (tbl_id, prmry_ky_vl, old_rcrd, nw_rcrd, qry_tx, adt_usr_id, i_ts) VALUES //(${audit.tbl_id},null, null , null, ${JSON.stringify(query)}, ${userDtls ? userDtls.mrcht_usr_id : 0}, //current_timestamp());`;
                        // console.log(adt_qry);
                        conn_execSQL(qryEle, adt_qry, ConPool, cntxtDtls, function (adt_err, adt_results) {
                              if (adt_err) {
                                    callback(adt_err, adt_results);
                                    return;
                              }
                              callback(err, results);
                        });
                  })
            })
      }
      else if (qry_typ == 'UPDATE' || qry_typ == 'DELETE') {
            var get_records = `select * from ${tbl_nm} ${joins} ${where}`;
            // console.log(get_records);
            conn_execSQL(qryEle, get_records, ConPool, cntxtDtls, function (pq_err, results) {
                  if (pq_err) {
                        callback(pq_err, results);
                        return;
                  }
                  previous_record = results;
                  // console.log('previous_record', previous_record.length);
                  if (qry_typ == 'UPDATE') {
                        if (audit.max_updt && audit.max_updt < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, results);
                              return;
                        }
                  } else if (qry_typ == 'DELETE') {
                        if (audit.max_dlt && audit.max_dlt < previous_record.length) {
                              log.err(std.message.LIMIT_EXCEED_ERROR.message);
                              callback(true, results);
                              return;
                        }
                  }

                  // Execute actual query
                  conn_execSQL(qryEle, query, ConPool, cntxtDtls, function (err, results) {
                        if (err) {
                              callback(err, results);
                              return;
                        }
                        // console.log('query', results);

                        // Get Current Records
                        conn_execSQL(qryEle, get_records, ConPool, cntxtDtls, function (cq_err, current_record) {
                              // console.log('current_record', current_record.length);
                              if (cq_err) {
                                    callback(cq_err, results);
                                    return;
                              }

                              // Insert Current & Previous Records based on actual table primary key..
                              for (var i = 0; i < previous_record.length; i++) {
                                    let prmy_kys = [], prmy_kys_vl = '';
                                    if (audit.prmry_ky.indexOf(',') != -1) prmy_kys = audit.prmry_ky.split(',');
                                    else prmy_kys = [audit.prmry_ky];

                                    for (var p = 0; p < prmy_kys.length; p++) {
                                          prmy_kys[p] = prmy_kys[p].trim();
                                          if (!previous_record[i][prmy_kys[p]]) prmy_kys_vl = '';
                                          else prmy_kys_vl += previous_record[i][prmy_kys[p]] + ',';
                                    }

                                   // var adt_qry = `insert into adt_sql_dtl_t (tbl_id, prmry_ky_vl, old_rcrd, nw_rcrd, qry_tx, adt_usr_id, //i_ts) VALUES (${audit.tbl_id}, '${prmy_kys_vl}', '${JSON.stringify(previous_record[i])}', //'${JSON.stringify(current_record[i])}', ${JSON.stringify(query)}, ${userDtls ? userDtls.mrcht_usr_id : //0}, current_timestamp());`;
                                    // console.log(adt_qry);
                                    conn_execSQL(qryEle, adt_qry, ConPool, cntxtDtls, function (adt_err, adt_results) {
                                          if (adt_err) {
                                                callback(adt_err, adt_results);
                                                return;
                                          }
                                          callback(err, results);
                                    });
                              }
                        });
                  });
            })
      } else {
            conn_execSQL(qryEle, query, ConPool, cntxtDtls, function (err, results) {
                  if (err) return callback(err, null);
                  callback(err, results);
            });
      }
}

function conn_execSQL(qryEle, Qry, ConPool, cntxtDtls, userDtls, fnm, callback) {
      console.log("excutequery6",fnm)
      var qrychk=Qry;
      var whr = qrychk.includes('where');
      var shwdb = qrychk.toUpperCase().includes('SHOW ');
      // console.log(Qry);
      ConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
            if (err) { log.db.conError(cntxtDtls, Qry, err.code, err.fatal); callback(err, null); return err; }
            var adt_qry = `insert into sify_logs.adt_sql_dtl_t ( qry_tx, emp_id, i_ts) VALUES (${JSON.stringify(Qry)}, ${userDtls ? userDtls.emp_id : 0}, current_timestamp());`;
            console.log(adt_qry);
            connection.query(adt_qry, function (err, rows) {
                                 
            });
            connection.query(Qry, function (err, rows) {
                  connection.release();                  // Release connection back to Pool  
                  if (err) { log.db.qryError("ERROR", cntxtDtls, Qry, err.code, err.sqlMessage); callback(err, null); return; } // Handle Query Errors         
                  callback(false, rows);                 // Send the results back  
                  return;
            });
            //Execute the query


      });
};

/**************************************************************************************
* Controller     : makeRandomPassword
* Parameters     : req,res()
* Description    : Random Password Generation
* Change History :
* 15-11-2022 Ramesh Patlola
***************************************************************************************/
exports.makeRandomPassword = function () {
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*&%$#@!";
      const lengthOfCode = 8;
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
}
/**************************************************************************************
* Controller     : 
* Parameters     : req,res()
* Description    : 
* Change History :
* 15-11-2022 Ramesh Patlola
***************************************************************************************/
var sanitizeObject = (object,callback) => {
      var i=0;
      _.forIn(object, (val, key) => {
          
          if (val && typeof val == "string") {
              console.log( "Beore object[key] "+object[key])
              object[key] = sqldb.MySQLConPool.escape(object[key])
              i++;
          }
          else if (val && typeof val == "object") { 
                if(val.length==0) i++
                else
                sanitizeObject(val,(ret)=>{
                  object[key]=ret;
                  i++;
                });
          }
          else if (val && Array.isArray(val)) {
              sanitizeObject(val,(ret)=>{
                  object[key]=ret;
                  i++;
                });
          }else{
              i++;
          }
          if(i==(Object.keys(object).length)){
              callback(object);
          }
      })
      
  }
exports.sanitizeObject =sanitizeObject;

