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
        const tx = db.transaction("detail-info", "readwrite");
        let store = tx.objectStore("detail-info");
        console.log(information);
        store.add(information);
        return tx.complete;
      })
      .then(() => {
        console.log("information berhasil di simpan.");
      });
  };

  //new line
  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("detail-info", "readonly");
          let store = tx.objectStore("detail-info");
          return store.getAll();
        })
        .then(information => {
          console.log(information);
          resolve(information);
        });
    });
  };

  //baru 
  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("detail-info", "readonly");
          let store = tx.objectStore("detail-info");
          return store.get(id);
        })
        .then(function(information) {
          resolve(information);
        });
    });
  };

  function DeleteFavorite(id){
    return new Promise(function(resolve, reject){
      dbPromised
        .then(function(db){
            const tx = db.transaction("detail-info", `readwrite`);
            let store = tx.objectStore("detail-info")
            store.delete(id);
            return tx;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            };
        });
    });
  };
