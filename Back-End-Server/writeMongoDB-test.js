var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/CongressTrackerDB';

var insertOneDocument = function(db, oCollection, oDocument, callback) { // actually an upsert operation
   db.collection(oCollection).updateOne({_id:oDocument._id}, oDocument, {upsert:true}, function(err, result) {
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

function abbrState(input, to){
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
}

/* write to MongoDB */
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
  for (var i = 0; i < all_members_with_chamber_senate.results[0].num_results; i++) {
      var oDocument = all_members_with_chamber_senate.results[0].members[i];
      oDocument.chamber = "Senate";
      oDocument.bioguide_id = oDocument.id;
      oDocument.state_name = abbrState(oDocument.state, "name");
      oDocument._id = oDocument.id;
      insertOneDocument(db, "legislators", oDocument, function() {});
  }
  for (var i = 0; i < all_members_with_chamber_house.results[0].num_results; i++) {
      var oDocument = all_members_with_chamber_house.results[0].members[i];
      oDocument.chamber = "House";
      oDocument.bioguide_id = oDocument.id;
      oDocument.state_name = abbrState(oDocument.state, "name");
      oDocument._id = oDocument.id;
      insertOneDocument(db, "legislators", oDocument, function() {});
  }
  for (var i = 0; i < recent_20_active_bills_of_house.results[0].num_results; i++) {
      var oDocument = recent_20_active_bills_of_house.results[0].bills[i];
      oDocument.chamber = "House";
      oDocument._id = oDocument.bill_id;
      oDocument.sponsor_state = abbrState(oDocument.sponsor_state, "name");
      insertOneDocument(db, "bills", oDocument, function() {});
  }
  for (var i = 0; i < recent_20_active_bills_of_senate.results[0].num_results; i++) {
      var oDocument = recent_20_active_bills_of_senate.results[0].bills[i];
      oDocument.chamber = "Senate";
      oDocument._id = oDocument.bill_id;
      oDocument.sponsor_state = abbrState(oDocument.sponsor_state, "name");
      insertOneDocument(db, "bills", oDocument, function() {});
  }
  for (var i = 0; i < recent_20_new_bills_of_house.results[0].num_results; i++) {
      var oDocument = recent_20_new_bills_of_house.results[0].bills[i];
      oDocument.chamber = "House";
      oDocument._id = oDocument.bill_id;
      oDocument.sponsor_state = abbrState(oDocument.sponsor_state, "name");
      insertOneDocument(db, "bills", oDocument, function() {});
  }
  for (var i = 0; i < recent_20_new_bills_of_senate.results[0].num_results; i++) {
      var oDocument = recent_20_new_bills_of_senate.results[0].bills[i];
      oDocument.chamber = "Senate";
      oDocument._id = oDocument.bill_id;
      oDocument.sponsor_state = abbrState(oDocument.sponsor_state, "name");
      insertOneDocument(db, "bills", oDocument, function() {});
  }
  for (var i = 0; i < all_committees_of_senate.results[0].num_results; i++) {
      var oDocument = all_committees_of_senate.results[0].committees[i];
      oDocument.chamber = "Senate";
      oDocument.state_name = abbrState(oDocument.chair_state, "name");
      oDocument._id = oDocument.id;
      insertOneDocument(db, "committees", oDocument, function() {});
  }
  for (var i = 0; i < all_committees_of_house.results[0].num_results; i++) {
      var oDocument = all_committees_of_house.results[0].committees[i];
       oDocument.chamber = "House";
       oDocument.state_name = abbrState(oDocument.chair_state, "name");
       oDocument._id = oDocument.id;
      insertOneDocument(db, "committees", oDocument, function() {});
  }
  for (var i = 0; i < all_committees_of_joint.results[0].num_results; i++) {
      var oDocument = all_committees_of_joint.results[0].committees[i];
       oDocument.chamber = "Joint";
       oDocument.state_name = abbrState(oDocument.chair_state, "name");
       oDocument._id = oDocument.id;
      insertOneDocument(db, "committees", oDocument, function() {});
  }
  db.close();
});

/* specific info */
var specific_members = [];
var specific_bills = [];
var specific_member_bills = [];
function readFiles(dirname, oCollection) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            console.log(err);
            return;
        }
        filenames.forEach(function(filename) {
            var oDocument = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'));
            if (oCollection == "legislators-sp") {
                specific_members.push(oDocument.results[0]);
            } else if (oCollection == "bills-sp") {
                specific_bills.push(oDocument.results[0]);
            } else if (oCollection = "member-bills-sp") {
                specific_member_bills.push(oDocument.results[0]);
            }
        });
    });
}

readFiles('./raw_data/specific_members/', "legislators-sp");
readFiles('./raw_data/specific_bills/', "bills-sp");
readFiles('./raw_data/specific_member_bills/', "member-bills-sp");

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  for (var i = 0; i < specific_members.length; i++) {
      var oDocument = specific_members[i];
      oDocument._id = oDocument.member_id;
      insertOneDocument(db, "legislators-sp", oDocument, function() {});
  }
  for (var i = 0; i < specific_bills.length; i++) {
      var oDocument = specific_bills[i];
      oDocument._id = oDocument.bill_id;
      insertOneDocument(db, "bills-sp", oDocument, function() {});
  }
  for (var i = 0; i < specific_member_bills.length; i++) {
      var oDocument = specific_member_bills[i];
      oDocument._id = oDocument.id;
      insertOneDocument(db, "member-bills-sp", oDocument, function() {});
  }
  db.close();
});

console.log("大约legislators有547个，bills有76个, committees大约47个");
