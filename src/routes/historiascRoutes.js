const histc = require('../models/historiasClinicas');
const jwts = require('../models/jwt');
module.exports = function (app)
{

//devuelve los modulos activos de la historia clinica activos segun el servicio
app.get('/activhist/:id_s',(req,res)=> {
var id_serv = req.params.id_s;
histc.activosHisto(id_serv,(err,data)=>{
res.json(data);
});
});

//valores por nombre o por RIPS de la tabla de impresion diagnostica
app.get('/impdiagnostica/:lk',(req,res)=>{
    histc.darimpresionDiagnostica(req.params.lk,(err,imp)=>{
       res.json(imp);
    })
})

app.post('/histclinica',(req,res)=>{
  let historia = req.body;
  // console.log(req.body);
  // console.log(hitsoria);
  histc.nuevaHistoria(req.body,(err,resp)=>{
    res.json(resp);
  });

});



}
