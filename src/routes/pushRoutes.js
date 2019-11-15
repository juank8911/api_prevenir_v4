const push = require('../models/push');
const jwts = require('../models/jwt');
const pusho = require('../models/pushOs')

module.exports=function(app)
{
//actualiza token de el member
app.put('/push',(req, res)=>{
  console.log(req.body );
var token = {
  token:req.body.token,
  id:req.body.id,
  admines: req.body.admin,
  medico: req.body.medico
};
// console.log(token);

push.addtoken(token,(err,resp)=>{
  res.json(resp);
});

});


//envia una push al primer ingreso de la app
app.post('/push',(req,res)=>{
  disp={
    to:'cDN3ljN80nY:APA91bE23ly2oG-rzVAI8i_oiPMZI_CBdU59a6dVznyjdK9FyGi2oPI_sQIQJTAV-xp6YQ6F7MlYYW_7Br0nGdbTIuicwIP4oR99Mf8KysM1ZEJiCmASeyxnOHO4ajgqTDIX6prWpQpG',
    body:'Gracias por ser parte de nuestra comunidad te invitamos a llenar tu informacion y podras realizar tu primera cita',
    title:'BIENVENIDO A PREVENIR EXPRESS DESCUENTOS MEDICOS'
  };
  push.sendPush(disp,(err,resp)=>{res.json(resp)})
});

app.post('/pusho',(req,res)=>{
  console.log('push en one signal');
  console.log(req.body);
  pusho.sendPush(req.body,(err,resp)=>{
    res.json(resp);
  })
})


}
