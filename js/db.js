let dbPromised = idb.open("bola-spanyol", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("detail-info", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
  });

  function saveForLater(information) {
    console.log(information)
    dbPromised
      .then(db => {
        let tx = db.transaction("detail-info", "readwrite");
        let store = tx.objectStore("detail-info");
        console.log(information);
        store.add(information);
        return tx.complete;
      })
      .then(() => {
        console.log("information berhasil di simpan.");
      });
  }

  //add getAll 29 october 2020
  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("detail-info", "readonly");
          let store = tx.objectStore("detail-info");
          return store.getAll();
        })
        .then(information => {
          console.log(information);
          resolve(information);
        });
    });
  }
