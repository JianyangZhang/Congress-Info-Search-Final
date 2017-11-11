var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/CongressTrackerDB";

module.exports = {
  get: function (id, num, callback) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("member-bills-sp").find({_id:id}).toArray(function(err, result) {
          if (err) { throw err; }
          callback(dispose(result[0].bills, num));
          db.close();
        });
      });
  }
};

function dispose(result, num) {
    var disposedResult = [];
    for (var i = 0; i < result.length; i++) {
        disposedResult.push({
            id: result[i].bill_id,
            type: result[i].bill_type,
            subject: result[i].primary_subject,
            desc: result[i].title,
            link: result[i].congressdotgov_url
        });
        if (disposedResult.length == num) {
            return disposedResult;
        }
    }
    return disposedResult;
}
