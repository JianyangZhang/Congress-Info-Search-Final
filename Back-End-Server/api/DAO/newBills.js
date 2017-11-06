var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/congressDB";

module.exports = {
  get: function (callback) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("bills").find({active:false}).toArray(function(err, result) {
          if (err) { throw err; }
          callback(result);
          db.close();
        });
      });
  }
};
