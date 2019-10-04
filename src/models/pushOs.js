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


pushoModule.sendPush = (callback) => {

  console.log('creando cliente');
  var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'YWI5MThkYmUtZDVjMi00OGU1LWFiMTctMzA0YjdkYWYyOWNh', appId: 'e9b74f6d-cd17-4223-ab73-3b355bbf98ce' }
});

console.log('creando notificacion');
var firstNotification = new OneSignal.Notification({
    contents: {
        en: "Test notification",
        tr: "Test mesajı",
        es: "Es hora de FREE FIRE"
    },
    include_player_ids: ["b50c7a67-a03d-4349-bf52-209e28de83e4"]
});

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
