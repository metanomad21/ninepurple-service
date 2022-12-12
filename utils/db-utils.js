const mysql = require('mysql');

var pool = null;

let init = function (host, user, password, database){
  if(!host){
    host = 'localhost';
  }
  if(!user){
    user = 'root';
  }
  if(!password){
    password = '123456';
  }
  if(!database){
    database = 'mg-server';
  }

  if(pool == null){
    pool = mysql.createPool({
      connectionLimit: 50,
      host: host,
      user: user,
      password: password,
      database: database,
      multipleStatements: true
    });
  }
}

let query = function (sql, values) {
  if(!pool){
    return null;
  }
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query,
  init
}