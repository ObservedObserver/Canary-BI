const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

app.post('/mysql/query', function (req, res) {
   const {config, sql} = req.body
   const {host, port, user, password, database} = config
   try {
      let connection = mysql.createConnection({
        host,
        user,
        port,
        password,
        database
      })
      connection.connect()
      connection.query(sql, (err, result) => {
        res.send(JSON.stringify({
          success: true,
          result
        }))
      })
   } catch (error) {
      res.send({
        success: false,
        result: error
      })
   }
})

app.post('/mysql/connect', function (req, res) {
  const {host, user, port, password} = req.body
  const sql = `show databases;`
  console.log(req.body)
  try {
     let connection = mysql.createConnection({
       host,
       user,
       port,
       password
     })
     connection.connect()
     connection.query(sql, (err, result) => {
       console.log('connected, err', result)
       res.send(JSON.stringify({
         success: true,
         result
       }))
     })
  } catch (error) {
    console.log(error)
     res.send(JSON.stringify({
       success: false,
       result: error
     }))
  }
})
 
var server = app.listen(1999, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})