var legislatorsDAO = require('./DAO/legislators.js');
var activeBillsDAO = require('./DAO/activeBills.js');
var newBillsDAO = require('./DAO/newBills.js');
var committeesDAO = require('./DAO/committees.js');
var targetCommitteesDAO = require('./DAO/targetCommittees.js');

var legislators;
var activeBills;
var newBills;
var committees;
var targetCommittees;
legislatorsDAO.get(function(result) { legislators = result; });
activeBillsDAO.get(function(result) { activeBills = result; });
newBillsDAO.get(function(result) { newBills = result; });
committeesDAO.get(function(result) { committees = result; });

// host api
const express = require('express');
const app = express();
app.use(express.static('../../'));

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

app.get('/committees/:member_id/:num', function(req, res) {
    var member_id = req.params.member_id;
    var num = req.params.num;
    targetCommitteesDAO.get(member_id, num, function(targetCommittees) {
        res.send({
            count: targetCommittees.length,
            results: targetCommittees
        });
    });
});

app.listen(3000);
