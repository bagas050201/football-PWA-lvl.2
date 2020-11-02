var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOEFCOdHkXD3JNTQLAshixW6d3zrwcKMUUe7_m8LiJNrkXOd0ky_jZ6x1-zgCMvY5SkdvAYFVQXEBwMxZYKfU3I",
   "privateKey": "p7BN611x2r2KU5iBHQNJL2788Rgfp_Q4jemhGr8vZO0"
};
 
 
webPush.setVapidDetails(
   'mailto:bagaspradana1011@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cxjmmubcShI:APA91bEIrLv-qspDLgy4zcx970fvuiJDvvNmxCGiMNTw4GDX3qUZSHreXOSJL4KS7krPwdVvqZWbG74mLfrcJUDEWXEQckRU5_8b8z4Ypbz9wA4jnRrsKdZ0NJQTtX2gCB-1_qU9sPpP",
   "keys": {
       "p256dh": "BA3eLJQcti2+wv6XQoY4+xHlshr1uO3qRSt0UJmfig2kziQAE+ZH1IdbsY/GFnlO8yYQsZsZLA2ESbi/wYCywvw=",
       "auth": "xgmNxPK1RisdaqYTHflhVw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '406622448484',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
