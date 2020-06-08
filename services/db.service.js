const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'verb_db',
  insecureAuth: true
});

connection.connect(err => {
  if (err) throw new Error('mySql failed connection');
  console.log('connected to SQL server');
})

function runSQL(query) {
  return new Promise((resolve, reject) => {
      connection.query(query, function (error, results, fields) {
          if (error) reject(error);
          else resolve(results);
          
      });
  })
}

module.exports = {
  runSQL
}