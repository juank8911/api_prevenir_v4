let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});


let impreModule = {};

impreModule.darDiagnosticos = (callback)=>
{
  if(connection)
  {
    var sql = 'SELECT * FROM prevenirexpres.impresion_diagnostica;';
    connection.query(sql,(err,rdiag)=>{
      if(err){throw err}
      else
      {
        callback(rdiag)
      }
    })
  }
}

module.exports = impreModule;
