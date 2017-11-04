var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/congressDB';

var insertOneDocument = function(db, oCollection, oDocument, callback) {
   db.collection(oCollection).insertOne(oDocument, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the " + oCollection + " collection.");
    callback();
  });
};

var insertManyDocuments = function(db, oCollection, oDocuments, callback) {
   db.collection(oCollection).insertMany(oDocuments, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + oDocuments.length + " documents into the " + oCollection + " collection.");
    callback();
  });
};


/* write to MongoDV */
/* general info */
var fs = require('fs');
var all_members_with_chamber_senate = JSON.parse(fs.readFileSync("./raw_data/all-members-with-chamber-senate", 'utf8'));
var all_members_with_chamber_house = JSON.parse(fs.readFileSync("./raw_data/all-members-with-chamber-house", 'utf8'));
var recent_20_active_bills_of_house = JSON.parse(fs.readFileSync("./raw_data/recent-20-active-bills-of-house", 'utf8'));
var recent_20_active_bills_of_senate = JSON.parse(fs.readFileSync("./raw_data/recent-20-active-bills-of-senate", 'utf8'));;
var recent_20_new_bills_of_house = JSON.parse(fs.readFileSync("./raw_data/recent-20-new-bills-of-house", 'utf8'));
var recent_20_new_bills_of_senate = JSON.parse(fs.readFileSync("./raw_data/recent-20-new-bills-of-senate", 'utf8'));
var all_committees_of_senate = JSON.parse(fs.readFileSync("./raw_data/all-committees-of-senate", 'utf8'));
var all_committees_of_house = JSON.parse(fs.readFileSync("./raw_data/all-committees-of-house", 'utf8'));
var all_committees_of_joint = JSON.parse(fs.readFileSync("./raw_data/all-committees-of-joint", 'utf8'));;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertOneDocument(db, "legislators", all_members_with_chamber_senate, function() { console.log("1"); });
  insertOneDocument(db, "legislators", all_members_with_chamber_house, function() { console.log("2"); });
  insertOneDocument(db, "bills", recent_20_active_bills_of_house, function() { console.log("3"); });
  insertOneDocument(db, "bills", recent_20_active_bills_of_senate, function() { console.log("4"); });
  insertOneDocument(db, "bills", recent_20_new_bills_of_house, function() { console.log("5"); });
  insertOneDocument(db, "bills", recent_20_new_bills_of_senate, function() { console.log("6"); });
  insertOneDocument(db, "committees", all_committees_of_senate, function() { console.log("7"); });
  insertOneDocument(db, "committees", all_committees_of_house, function() { console.log("8"); });
  insertOneDocument(db, "committees", all_committees_of_joint, function() { console.log("9"); });
  db.close();
});

/* specific info */
var specific_members = [];
var specific_bills = [];
function readFiles(dirname, oCollection) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            console.log(err);
            return;
        }
        filenames.forEach(function(filename) {
            var oDocument = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));
            if (oCollection == "legislators-sp") {
                specific_members.push(oDocument);
            } else if (oCollection == "bills-sp") {
                specific_bills.push(oDocument);
            }
        });
    });
}

readFiles('./raw_data/specific_members/', "legislators-sp");
readFiles('./raw_data/specific_bills/', "bills-sp");

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertManyDocuments(db, "legislators-sp", specific_members, function() { console.log("10"); });
  insertManyDocuments(db, "bills-sp", specific_bills, function() { console.log("11"); });
  db.close();
});

console.log("legislators应该有547个，bills应该有76个，一共11次写入操作");
