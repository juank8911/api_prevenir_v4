let mysql =require('mysql');
let config = require('../config');
var OneSignal = require('onesignal-node');

connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let pushoModule = {};


pushoModule.sendPush = (info,callback) => {

  console.log('creando cliente');
  console.log(info);
  var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: config.AuthKey, appId: config.appId }
});

console.log(info);
console.log('creando notificacion');
var firstNotification = new OneSignal.Notification(info);

// Add a new target after creating initial notification body
// firstNotification.postBody["include_player_ids"].push["3aa608f2-c6a1-11e3-851d-000c2940e62c"]
console.log('enviando notificacion');
myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
   if (err) {
       throw err;
   } else {
       console.log(data);
       callback(null,true);
   }
});

};

module.exports = pushoModule;
