# PROGRESSIVE WEB APPS USING API,IDEXED.DB,PUSH NOTIFICATION

## Kriteria Submission ##
Berikut kriteria submission yang harus Anda penuhi:

- Menampilkan minimal 2 halaman yang mengonsumsi data dari website football-data.org.
- Tetap bisa dipakai meskipun status sedang offline (menerapkan cache).
- Memiliki fitur penyimpanan data dengan indexed db (bisa menambahkan, menampilkan, dan menghapus tim favorit, jadwal nonton, dsb.) dengan satu halaman khusus untuk menampilkan data yang disimpan (sehingga total halaman menjadi minimal 3 halaman).
- Dapat menampilkan pesan push dari server (untuk simulasi pesan push dikirim menggunakan Firebase Cloud Messaging) dengan menggunakan payload. 
- Dapat ditambahkan ke homescreen.
- Memiliki splash screen.

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

