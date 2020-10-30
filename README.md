# PROGRESSIVE WEB APPS USING API,IDEXED.DB,PUSH NOTIFICATION

## BACKEND ##

1. Create Google Firebase Project : https://console.firebase.google.com/u/0/
2. Get ID Sender from option project
3. Paste in manifest.json
4. Create file Push.js
5. install global : npm install web-push -g 
6. generate Vapid keys --json
7. paste public key in applicationServerKey: urlBase64ToUint8Array("your public vapid key")
8. generate local : npm init -y and npm install web-push
9. run program, paste your data output in console like "end-point","p256dh","auth" in push.js
10. dont forget too paste your id sender in push.js
11. npm push.js
12. done
