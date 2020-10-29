var webPush = require('web-push');
 
 //you can get publickey and private key from web-push generate-vapid-keys --json in terminal. you should install web-push from global and local , and then install npm init -y before generate vapid keys
const vapidKeys = {
   "publicKey": "BHVSp_vS5A_4p39B9C7BpSqkeeNM-tdgaWYyV1N63BZg2wimYfd_cIFZAOKbybhA_mZU_UPQF2I5Un2ZcZVF6kA",
   "privateKey": "BnzoVCpwfw1tmAY0DkvdOAgxhLD2C1hpGZ2RDiqBLK0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

//you can get endpoint, p256dh,auth from inspect element and get data in console. if you generate success a vapid key before this, you can see this data in your console
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/csUU02m46kQ:APA91bGhWTh_MvcPJ-wf8Mv_rQBwKlKgiDhBgUrbcNw4upDNC2_zKtByA1zwv5GyzLacUPge2wsIvJRGeC7YdNwJcQsmouiqHQfSwqFvo8kzRtBjmpYz1q9HhxSkxwnOIVj4e-KgW0yo",
   "keys": {
       "p256dh": "BILsc18mx5modMoJcEXtVh8dMB7KwqnQHqj9hk0U3jLN64RLM81DsD9hH/aeWC5RNJSaygPeKdk+70mGSjTsaiU=",
       "auth": "ljF7P+JCAkpVVcrUPi8L0g=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 //get the gcmAPIKey from manifest.json
var options = {
   gcmAPIKey: '292971028946',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
