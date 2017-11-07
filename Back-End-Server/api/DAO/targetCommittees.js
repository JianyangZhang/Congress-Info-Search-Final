var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/CongressTrackerDB";

module.exports = {
  get: function (id, num, callback) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("legislators-sp").find({member_id:id}).toArray(function(err, result) {
          if (err) { throw err; }
          callback(dispose(result[0], num));
          db.close();
        });
      });
  }
};

function dispose(result, num) {
    var disposedResult = [];
    for (var i = 0; i < result.roles.length; i++) {
        for (var j = 0; j < result.roles[i].committees.length; j++) {
            disposedResult.push({
                chamber: result.roles[i].chamber,
                committeeID: result.roles[i].committees[j].code,
                committeeName: result.roles[i].committees[j].name
            });
            if (disposedResult.length == num) {
                return disposedResult;
            }
        }
    }
    return disposedResult;
}
