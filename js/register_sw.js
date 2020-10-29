/** 
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }

  document.addEventListener("DOMContentLoaded", function() {
    getAllStandings();
  });

**/



  if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
  } else {
    registerServiceWorker();
    requestPermission();

    document.addEventListener("DOMContentLoaded", function() {
      getAllStandings();
  });
  };
  function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
      .then(function (registration) {
        console.log('Registrasi service worker berhasil.');
        return registration;
      })
      .catch(function (err) {
        console.error('Registrasi service worker gagal.', err);
      });
    }
  function requestPermission() {
if ('Notification' in window) {
Notification.requestPermission().then(function (result) {
  if (result === "denied") {
    console.log("Fitur notifikasi tidak diijinkan.");
    return;
  } else if (result === "default") {
    console.error("Pengguna menutup kotak dialog permintaan ijin.");
    return;
  }
  
  navigator.serviceWorker.getRegistration().then(function(reg) {
    reg.showNotification('Notifikasi diijinkan!');
  });
});
}
  }
