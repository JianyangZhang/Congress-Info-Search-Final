/* drop MongoDB collections, use it before setupMongoDB.js */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/CongressTrackerDB';

MongoClient.connect(url, function(err, db) {
  if (err) { throw err; }
  db.collection("legislators").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection legislators dropped");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) { throw err; }
  db.collection("legislators-sp").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection legislators-sp dropped");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) { throw err; }
  db.collection("bills").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection bills dropped");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) { throw err; }
  db.collection("bills-sp").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection bills-sp dropped");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) { throw err; }
  db.collection("committees").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection committees dropped");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) { throw err; }
  db.collection("member-bills-sp").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection member-bills-sp dropped");
    db.close();
  });
});
