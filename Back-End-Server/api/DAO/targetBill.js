var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/CongressTrackerDB";

module.exports = {
  get: function (id, callback) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("bills-sp").find({bill_id:id}).toArray(function(err, result) {
          if (err) { throw err; }
          callback(result[0]);
          db.close();
        });
      });
  }
};
