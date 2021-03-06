var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/CongressTrackerDB";

module.exports = {
  get: function (callback) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("committees").find().toArray(function(err, result) {
          if (err) { throw err; }
          callback(result);
          db.close();
        });
      });
  }
};
