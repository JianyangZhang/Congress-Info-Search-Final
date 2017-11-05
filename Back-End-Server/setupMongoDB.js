var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/congressDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("legislators", function(err, res) {
    if (err) throw err;
    console.log("Collection legislators created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("legislators-sp", function(err, res) {
    if (err) throw err;
    console.log("Collection legislators-sp created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("bills", function(err, res) {
    if (err) throw err;
    console.log("Collection bills created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("bills-sp", function(err, res) {
    if (err) throw err;
    console.log("Collection bills-sp created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("committees", function(err, res) {
    if (err) throw err;
    console.log("Collection committees created!");
    db.close();
  });
});
