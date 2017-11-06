// This script is a testrunner! It writes data to file system instead of MongoDB.
// -------- start to fetch congress data --------
console.log('---start to fetch congress data---');
var theKey = 'VyvCcQyPRe88ZvWJnmNby17eabJxPsXalZPiGOOZ';
var request = require('request');
var fs = require('fs');
var all_members_with_chamber_senate;
var all_members_with_chamber_house;
var recent_20_active_bills_of_house;
var recent_20_active_bills_of_senate;
var recent_20_new_bills_of_house;
var recent_20_new_bills_of_senate;
var all_committees_of_senate;
var all_committees_of_house;
var all_committees_of_joint;
request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/senate/members.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/all-members-with-chamber-senate", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                all_members_with_chamber_senate = body;
                console.log("all-members-with-chamber-senate was saved!");
                fetchSpecificMember(all_members_with_chamber_senate);
                fetchSpecificMemberBills(all_members_with_chamber_senate);
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/house/members.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/all-members-with-chamber-house", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                all_members_with_chamber_house = body;
                console.log("all-members-with-chamber-house was saved!");
                fetchSpecificMember(all_members_with_chamber_house);
                fetchSpecificMemberBills(all_members_with_chamber_house);
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/house/bills/active.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/recent-20-active-bills-of-house", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                recent_20_active_bills_of_house = body;
                console.log("recent-20-active-bills-of-house was saved!");
                fetchSpecificBill(recent_20_active_bills_of_house);
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/senate/bills/active.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/recent-20-active-bills-of-senate", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                recent_20_active_bills_of_senate = body;
                console.log("recent-20-active-bills-of-senate was saved!");
                fetchSpecificBill(recent_20_active_bills_of_senate);
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/house/bills/introduced.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/recent-20-new-bills-of-house", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                recent_20_new_bills_of_house = body;
                console.log("recent-20-new-bills-of-house was saved!");
                fetchSpecificBill(recent_20_new_bills_of_house);
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/senate/bills/introduced.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/recent-20-new-bills-of-senate", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                recent_20_new_bills_of_senate = body;
                console.log("recent-20-new-bills-of-senate was saved!");
                fetchSpecificBill(recent_20_new_bills_of_senate);
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/senate/committees.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/all-committees-of-senate", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                all_committees_of_senate = body;
                console.log("all-committees-of-senate was saved!");
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/house/committees.json'
    },
    function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/all-committees-of-house", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                all_committees_of_house = body;
                console.log("all-committees-of-house was saved!");
            });
        }
    });

request({
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': theKey
        },
        url: 'https://api.propublica.org/congress/v1/115/joint/committees.json'
    },
    function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("writting to file...");
            fs.writeFile("./raw_data/all-committees-of-joint", body, function(err) {
                if (err) {
                    return console.log(err);
                }
                all_committees_of_joint = body;
                console.log("all-committees-of-joint was saved!");
            });
        }
    });

/*
all_members_with_chamber_senate = JSON.parse(all_members_with_chamber_senate);
all_members_with_chamber_house = JSON.parse(all_members_with_chamber_house);
recent_20_active_bills_of_house = JSON.parse(recent_20_active_bills_of_house);
recent_20_active_bills_of_senate = JSON.parse(recent_20_active_bills_of_senate);
recent_20_new_bills_of_house = JSON.parse(recent_20_new_bills_of_house);
recent_20_new_bills_of_senate = JSON.parse(recent_20_new_bills_of_senate);
all_committees_of_senate = JSON.parse(all_committees_of_senate);
all_committees_of_house = JSON.parse(all_committees_of_house);
all_committees_of_joint = JSON.parse(all_committees_of_joint);
*/
function fetchSpecificMember(members_raw) {
    var oMembers = JSON.parse(members_raw);
    for (var i = 0; i < oMembers.results[0].num_results; i++) {
        fetchSpecificMemberHelper(oMembers, i);
    }
}

function fetchSpecificMemberHelper(oMembers, i) {
    var id = oMembers.results[0].members[i].id;
    request({
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': theKey
            },
            url: 'https://api.propublica.org/congress/v1/members/' + id + '.json'
        },
        function(err, res, body) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile("./raw_data/specific_members/" + id, body, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("member " + id + "'s info was saved!");
                });
            }
        });
}

function fetchSpecificBill(bills_raw) {
    var oBills = JSON.parse(bills_raw);
    for (var i = 0; i < oBills.results[0].num_results; i++) {
        fetchSpecificBillHelper(oBills, i);
    }
}

function fetchSpecificBillHelper(oBills, i) {
    var id = oBills.results[0].bills[i].bill_slug;
    request({
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': theKey
            },
            url: 'https://api.propublica.org/congress/v1/115/bills/' + id + '.json'
        },
        function(err, res, body) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile("./raw_data/specific_bills/" + id, body, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("bill " + id + "'s info was saved!");
                });
            }
        });
}

function fetchSpecificMemberBills(members_raw) {
    var oMembers = JSON.parse(members_raw);
    for (var i = 0; i < oMembers.results[0].num_results; i++) {
        fetchSpecificMemberBillsHelper(oMembers, i);
    }
}
function fetchSpecificMemberBillsHelper(oMembers, i) {
    var id = oMembers.results[0].members[i].id;
    request({
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': theKey
            },
            url: 'https://api.propublica.org/congress/v1/members/' + id + '/bills/updated.json'
        },
        function (err, res, body) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile("./raw_data/specific_member_bills/" + id, body, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("member " + id + "'s bills was saved!");
                });
            }
        }
    );
}
