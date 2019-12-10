let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let pruebasModule = {};

pruebasModule.promesa = async (idc, callback) => {
  //COPIAR DESDE AQUI;
  // console.log(id);
  var sql = 'SELECT * FROM historia_clinica WHERE historia_clinica.id_historiacl = ?;';
  var sqlaf = 'SELECT * FROM antecedentes_f WHERE id_antecedentesf = ?;';
  var sqlap = 'SELECT * FROM antecedentes_p WHERE id_antecedentesp = ?;';
  var sqlop = 'SELECT * FROM historia_opt WHERE idhistoria_opt = ?';
  var promise = new Promise(async function (res,rej){
    await connection.query(sql,idc,(err,data) => {
      // console.log(data);
      return (err) ? rej(err) :  res(data);
    })
  });
  var promiseAf = new Promise(async function(resaf,rejaf){
      // await connection.query(sql,)
  });
promise.then(async(res1,rej1)=> {
            console.log(res1);
            new Promise(async function(resolve, reject) {
              res1 = res1[0];
                if(res1.id_antecedentesf != null)
                {
                  console.log('denrtro del if');
                  console.log(res1.id_antecedentesf);
                  connection.query(sqlaf,[res1.id_antecedentesf],(err,resaf)=>{
                    res1.antecedentef = resaf[0];
                    return (err) ? reject(err) :  resolve(res1);
                  })
                }
                  else{
                    res1.antecedentef = {};
                    return resolve(res1)
                  }
            }).then(async(res2,rej2)=>{
                      new Promise(function(resolve, reject) {
                        console.log('RES 2');
                              console.log(res2);
                              console.log(res2.id_antecedentesp);
                      if(res2.id_antecedentesp != null)
                      {
                        connection.query(sqlap,[res2.id_antecedentesp],(err,resap)=>{
                          console.log(resap);
                          res2.antecedentesp = resap[0];
                          return (err) ? reject(err) : resolve(res2);
                        })
                      }
                      else {
                        console.log('FUNCIONO');
                        res2.antecedentesp = {};
                        return resolve(res2)
                      }
                      }).then(async(res3,rej3)=>{
                              new Promise(function(resolve, reject) {
                                console.log('RES 3');
                                      console.log(res3);
                                      console.log(res3.id_historia_opt);
                                      if(res3.id_historia_opt != null)
                                        {
                                          connection.query(sqlop,[res3.id_historia_opt],(err,resop)=>{
                                            console.log(resop);
                                            res3.histoptica = resop[0];
                                            return (err) ? reject(err) : resolve(res3);
                                          })
                                        }
                                        else {
                                          console.log('NO OPTICA');
                                          res3.histoptica = {};
                                          return resolve(res3)
                                        }
                              }).then(async(res4,rej4)=>{
                                  new Promise(function(resolve, reject) {
                                          console.log('RES 4');
                                          console.log(res4);
                                          if(res4.id_habitosyfactores != null)
                                          {
                                            let sqlhyf = 'SELECT * FROM habitosyfactores WHERE id_habitosyfactores = ?;';
                                            connection.query(sqlhyf,[res4.id_habitosyfactores],(err,reshf)=>{
                                              res4.habitosyfactores = reshf[0];
                                              return (err) ? reject(err): resolve(res4);
                                            })
                                          }
                                          else
                                          {
                                            console.log('NO Habitos');
                                            res4.habitosyfactores = {};
                                            return resolve(res4)
                                          }

                                  }).then(async(res5,rej5)=>{
                                    new Promise(function(resolve, reject) {
                                      console.log('RES5');
                                      console.log(res5);
                                      if(res5.id_revisionpsistemas != null){
                                        let sqlrs = 'SELECT * FROM revisionpsistemas WHERE id_revisionpsistemas = ?;';
                                        connection.query(sqlrs,[res5.id_revisionpsistemas],(err,resrs)=>{
                                          console.log(resrs);
                                          res5.revisionps = resrs[0];
                                          return (err)? reject(err): resolve(res5)
                                        })
                                        }
                                        else{
                                          res5.revisionps = {};
                                          return resolve(res5)
                                        }
                                      }).then(async(res6,rej6)=>{
                                        console.log('RES6');
                                        console.log(res6);
                                        new Promise(function(resolve, reject) {
                                          if(res6.id_examenf != null)
                                        {
                                            let sqlef = 'SELECT * FROM examenf WHERE id_examenf = ?;';
                                            connection.query(sqlef,[res6.id_examenf],(err,respef)=>{
                                              res5.examenf = respef[0];
                                              return (err)? reject(err): resolve(res6);
                                            })
                                          }
                                          else
                                          {
                                            res5.examenf = {};
                                            return resolve(res6);
                                          }

                                        }).then(async(res7,rej7)=>{
                                            new Promise(function(resolve, reject) {
                                                let sqlid = 'SELECT * FROM impresion_diagnostica, historiacli_has_impresiondiag WHERE impresion_diagnostica.id_impresiondiag = historiacli_has_impresiondiag.id_impresiondiag AND historiacli_has_impresiondiag.id_historiacl = ?;';
                                                connection.query(sqlid,[res7.id_historiacl],(err,resid)=>{
                                                  console.log(resid);
                                                    if(JSON.stringify(resid)!= '[]')
                                                    {
                                                      res7.impresiondiag = resid;
                                                      console.log(res7);
                                                      return (err)? reject(err): resolve(res7);
                                                    }
                                                    else {
                                                      console.log('no existen datos');
                                                      res7.impresiondiag = [];
                                                      return resolve(res7);
                                                    }

                                                })
                                            }).then(async(resfn,rejfn)=>{
                                                console.log('then fin');
                                                console.log(resfn);
                                                callback(null,resfn)
                                              }).catch((err)=>{console.error(err);})
                                        })
                                      })
                                      });
                                    });
                                  });
                                });
                              });
//COPIAR HASTA AQUI


// .then(async(res#,rej#)=>{
//
// })

}


pruebasModule.promesa2 = async (idc,callback)=>{
    // console.log(id);
    var sql = 'SELECT * FROM historia_clinica WHERE historia_clinica.id_historiacl = ?;';
    var sqlaf = 'SELECT * FROM prevenirexpres.antecedentes_f WHERE id_antecedentesf = ?;';
    var sql
    var promise = new Promise(async function (res,rej){
      await connection.query(sql,idc,(err,data) => {
        // console.log(data);
        return (err) ? rej(err) :  res(data);
      })
    });
    var promiseAf = new Promise(async function(resaf,rejaf){
        // await connection.query(sql,)
    });
  promise.then(async(res1,rej1)=> {
              console.log(res1);
              new Promise(async function(resolve, reject) {
                res1 = res1[0];
                  if(res1.id_antecedentesf === null)
                  {
                    console.log('denrtro del if');
                    console.log(res1.id_antecedentesf);
                    connection.query(sqlaf,[res1.id_antecedentesf],(err,resaf)=>{
                      res1.antecedentef = resaf[0];
                      return (err) ? reject(err) :  resolve(res1);
                    })
                  }
                  else{ return resolve(res1)}
              }).then(async(res2,rej2)=>{
                console.log('RES 2');
                      console.log(res2);
                      console.log(res2.id_antecedentesp);
              if(res2.id_antecedentesp == null)
              {
                  console.log('ESTA COMPARADO A NULL NO FUNCION');
              }
              else {
                console.log('FUNCIONO');
              }
              }).then(async(resfn,rejfn)=>{
                console.log('then fin');
                  console.log(resfn);
                  callback(null,resfn)
              });
            });


}

module.exports = pruebasModule;
