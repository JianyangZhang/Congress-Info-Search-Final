const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('../../'));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/congressDB";

var legislators;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("legislators").find().toArray(function(err, result) {
    if (err) { throw err; }
    legislators = result;
    db.close();
  });
});

var activeBills;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("bills").find({active:true}).toArray(function(err, result) {
    if (err) { throw err; }
    activeBills = result;
    db.close();
  });
});

var newBills;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("bills").find({active:false}).toArray(function(err, result) {
    if (err) { throw err; }
    newBills = result;
    db.close();
  });
});

var committees;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("committees").find().toArray(function(err, result) {
    if (err) { throw err; }
    committees = result;
    db.close();
  });
});

// host api
app.get('/', function(req, res) {
    res.send('congress api is running');
});
app.get('/legislators', function(req, res) {
    res.send({
        count: legislators.length,
        results: legislators
    });
});

app.get('/newBills', function(req, res) {
    res.send({
        count: newBills.length,
        results: newBills
    });
});

app.get('/activeBills', function(req, res) {
    res.send({
        count: activeBills.length,
        results: activeBills
    });
});

app.get('/committees', function(req, res) {
    res.send({
        count: committees.length,
        results: committees
    });
});

app.listen(3000);
