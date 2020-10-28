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
