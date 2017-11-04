// manipulate data

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

function MainController($scope) {
	$scope.oJson = ""; //legislators
	$scope.oJson_2 = ""; // committees
	$scope.oJson_3 = ""; // targetCommittees
	$scope.oJson_4 = ""; // targetBills
	$scope.oJson_5 = ""; // activeBills
	$scope.oJson_6 = ""; // newBills

	$scope.congressInfo = [];
	$scope.committeesInfo = [];
	$scope.activeBillsInfo = [];
	$scope.newBillsInfo = [];
	$scope.favLegislatorsInfo = [];
	$scope.favBillsInfo = [];
	$scope.favCommitteesInfo = [];

	$scope.targetInfo = "-------";
	$scope.targetID = "-------";
	$scope.targetPhoto = "-------";
	$scope.targetName = "-------";
	$scope.targetEmail = "-------";
	$scope.targetChamber = "-------";
	$scope.targetContact = "-------";
	$scope.targetParty = "-------";
	$scope.targetStartTerm = "-------";
	$scope.targetEndTerm = "-------";
	$scope.termPercent = "-------";
	$scope.targetOffice = "-------";
	$scope.targetState = "-------";
	$scope.targetFax = "-------";
	$scope.targetBirthday = "-------";
	$scope.targetTwitter = "-------";
	$scope.targetFacebook = "-------";

	$scope.selectedBillID = "-------";
	$scope.selectedTitle = "-------";
	$scope.selectedBillType = "-------";
	$scope.selectedSponsor = "-------";
	$scope.selectedChamber = "-------";
	$scope.selectedActivity = "-------";
	$scope.selectedIntroducedOn = "-------";
	$scope.selectedCongressUrl = "-------";
	$scope.selectedVersionName = "-------";
	$scope.selectedPDF = "-------";

	$.ajaxSetup({async: false});
	$scope.generateDetails_l = function () {
		$scope.targetInfo = this.info;
		$scope.targetID = this.info.bioguide_id;
		$scope.targetPhoto = "http://theunitedstates.io/images/congress/225x275/" + this.info.bioguide_id + ".jpg";
		$scope.targetName = this.info.title + ". " + this.info.last_name + ", " + this.info.first_name;
		if (this.info.oc_email && this.info.oc_email != null) {
			$scope.targetEmail = this.info.oc_email;
		} else {
			$scope.targetEmail = "N.A";
		}
		$scope.targetChamber = this.info.chamber;
		if ($scope.targetChamber == "house") {
			$scope.targetChamber == "House";
		} else {
			$scope.targetChamber == "Senate";
		}
		$scope.targetContact = this.info.phone;
		$scope.targetParty = this.info.party;
		$scope.targetStartTerm = formatDate(this.info.term_start);
		$scope.targetEndTerm = formatDate(this.info.term_end);
		var oDate = new Date();
		$scope.termPercent = (oDate.getTime() - Date.parse(this.info.term_start)) / (Date.parse(this.info.term_end) - Date.parse(this.info.term_start)) * 100;
		$scope.termPercent = parseInt($scope.termPercent);
		$scope.targetOffice = this.info.office;
		$scope.targetState = this.info.state_name;
		if (this.info.fax && this.info.fax != null) {
			$scope.targetFax = this.info.fax;
		} else {
			$scope.targetFax = "N.A";
		}
		$scope.targetBirthday = formatDate(this.info.birthday);
		if (this.info.twitter_id && this.info.twitter_id != null) {
			$scope.targetTwitter = "http://twitter.com/" + this.info.twitter_id;
		} else {
			$scope.targetTwitter = "N.A";
		}
		if (this.info.facebook_id && this.info.facebook_id != null) {
			$scope.targetFacebook = "http://facebook.com/" + this.info.facebook_id;
		} else {
			$scope.targetFacebook = "N.A";
		}
		if (this.info.website && this.info.website != null) {
			$scope.targetWebsite = this.info.website;
		} else {
			$scope.targetWebsite = "N.A";
		}
		var send_data_3 = {"dataBase": "committees", "flag_3": $scope.targetID};
		$.get("http://localhost/myhw8/loadInfo.php", send_data_3, function (receive_data) {
			$scope.oJson_3 = eval("(" + receive_data + ")");
		});
		$scope.targetCommittees = [];
		for (var i = 0; i < $scope.oJson_3.count; i++) {
			$scope.targetCommittees.push($scope.oJson_3.results[i]);
		}
		var send_data_4 = {"dataBase": "bills", "flag_4": $scope.targetID};
		$.get("http://localhost/myhw8/loadInfo.php", send_data_4, function (receive_data) {
			$scope.oJson_4 = eval("(" + receive_data + ")");
		});
		$scope.targetBills = [];
		for (var i = 0; i < $scope.oJson_4.count; i++) {
			$scope.targetBills.push($scope.oJson_4.results[i]);
		}
		if (localStorage.getItem($scope.targetID)) {
			$("#favIcon_legislators").attr("class", "fa fa-star fa-lg setYellow");
		} else {
			$("#favIcon_legislators").attr("class", "fa fa-star-o fa-lg");
		}
	}
	$scope.followup_legislators = function () {
		$('#btn_l').click();
	}
	$scope.generateDetails_b = function () {
		$scope.selectedInfo = this.info;
		$scope.selectedBillID = this.info.bill_id;
		$scope.selectedTitle = this.info.official_title;
		$scope.selectedBillType = this.info.bill_type;
		$scope.selectedSponsor = this.info.sponsor.title + ". " + this.info.sponsor.last_name + ", " + this.info.sponsor.first_name;
		if (this.info.chamber == "house") {
			$scope.selectedChamber = "House";
		} else {
			$scope.selectedChamber = "Senate";
		}
		if (this.info.history.active) {
			$scope.selectedActivity = "Active";
		} else {
			$scope.selectedActivity = "New";
		}
		$scope.selectedIntroducedOn = formatDate(this.info.introduced_on);
		$scope.selectedCongressUrl = this.info.urls.congress;
		$scope.selectedVersionName = this.info.last_version.version_name;
		$scope.selectedPDF = this.info.last_version.urls.pdf;

		if (localStorage.getItem($scope.selectedBillID)) {
			$("#favIcon_bills").attr("class", "fa fa-star fa-lg setYellow");
		} else {
			$("#favIcon_bills").attr("class", "fa fa-star-o fa-lg");
		}
	}
	$scope.followup_bills = function () {
		$('#btn_b').click();
	}

	var send_data = {"dataBase": "legislators"};
	$.get("http://localhost/myhw8/loadInfo.php", send_data, function (receive_data) {
		$scope.oJson = eval("(" + receive_data + ")");
	});
	var send_data_2 = {"dataBase": "committees"};
	$.get("http://localhost/myhw8/loadInfo.php", send_data_2, function (receive_data) {
		$scope.oJson_2 = eval("(" + receive_data + ")");
	});
	var send_data_5 = {"dataBase": "bills", "flag_5": "true"};
	$.get("http://localhost/myhw8/loadInfo.php", send_data_5, function (receive_data) {
		$scope.oJson_5 = eval("(" + receive_data + ")");
	});
	var send_data_6 = {"dataBase": "bills", "flag_6": "false"};
	$.get("http://localhost/myhw8/loadInfo.php", send_data_6, function (receive_data) {
		$scope.oJson_6 = eval("(" + receive_data + ")");
	});


	for (var i = 0; i < $scope.oJson.count; i++) {
		$scope.congressInfo.push($scope.oJson.results[i]);
	}
	for (var i = 0; i < $scope.oJson_2.count; i++) {
		$scope.committeesInfo.push($scope.oJson_2.results[i]);
	}
	for (var i = 0; i < 50; i++) {
		$scope.activeBillsInfo.push($scope.oJson_5.results[i]);
	}
	for (var i = 0; i < 50; i++) {
		$scope.newBillsInfo.push($scope.oJson_6.results[i]);
	}

	$("#favBtn_legislators").on("click", function () {
		if (!localStorage.getItem($scope.targetID)) {
			localStorage.setItem($scope.targetID, JSON.stringify($scope.targetInfo));
			$("#favIcon_legislators").attr("class", "fa fa-star fa-lg setYellow");
		} else {
			localStorage.removeItem($scope.targetID);
			$("#favIcon_legislators").attr("class", "fa fa-star-o fa-lg");
		}

	});

	$("#favBtn_bills").on("click", function () {
		if (!localStorage.getItem($scope.selectedBillID)) {
			localStorage.setItem($scope.selectedBillID, JSON.stringify($scope.selectedInfo));
			$("#favIcon_bills").attr("class", "fa fa-star fa-lg setYellow");
		} else {
			localStorage.removeItem($scope.selectedBillID);
			$("#favIcon_bills").attr("class", "fa fa-star-o fa-lg");
		}
	});

	$scope.favBtn_committees = function () {
		var concateId = "#favIcon_committees_" + this.$index;
		if (!localStorage.getItem(this.info.committee_id)) {
			localStorage.setItem(this.info.committee_id, JSON.stringify(this.info));
			$(concateId).attr("class", "fa fa-star fa-lg setYellow");
		} else {
			localStorage.removeItem(this.info.committee_id);
			$(concateId).attr("class", "fa fa-star-o fa-lg");
		}
	}

	$scope.deleteLegislator = function () {
		if (localStorage.getItem(this.info.bioguide_id)) {
			localStorage.removeItem(this.info.bioguide_id);
			pushFavLegislators();
		}
	}
	$scope.deleteBill = function () {
		if (localStorage.getItem(this.info.bill_id)) {
			localStorage.removeItem(this.info.bill_id);
			pushFavBills();
		}
	}

	$scope.deleteCommittee = function () {
		if (localStorage.getItem(this.info.committee_id)) {
			localStorage.removeItem(this.info.committee_id);
			pushFavCommittees();
		}
	}

	$("#btn_f").on("click", function () {
		pushFavLegislators();
		pushFavBills();
		pushFavCommittees();
		// console.log($scope.favCommitteesInfo);
		$scope.$apply();
	});

	function pushFavLegislators() {
		$scope.favLegislatorsInfo = [];
		for (var i = 0; i < localStorage.length; i++) {
			var jsonObj = eval("(" + localStorage.getItem(localStorage.key(i)) + ")");
			if (typeof jsonObj.bioguide_id != "undefined") {
				$scope.favLegislatorsInfo.push(jsonObj);
			}
		}
	}
	function pushFavBills() {
		$scope.favBillsInfo = [];
		for (var i = 0; i < localStorage.length; i++) {
			var jsonObj = eval("(" + localStorage.getItem(localStorage.key(i)) + ")");
			if (typeof jsonObj.bill_id != "undefined") {
				$scope.favBillsInfo.push(jsonObj);
			}
		}
	}
	function pushFavCommittees() {
		$scope.favCommitteesInfo = [];
		for (var i = 0; i < localStorage.length; i++) {
			var jsonObj = eval("(" + localStorage.getItem(localStorage.key(i)) + ")");
			if (typeof jsonObj.committee_id != "undefined") {
				$scope.favCommitteesInfo.push(jsonObj);
			}
		}
	}


	$scope.isCommitteeInFav = function () {
		for (var i = 0; i < localStorage.length; i++) {
			if(this.info.committee_id == localStorage.key(i)) {
				return true;
			}
		}
		return false;
	}

	for (var i = 0; i < $scope.oJson.count; i++) {
		if ($scope.congressInfo[i].district == null) {
			$scope.congressInfo[i].district = "N.A";
		}
		if ($scope.congressInfo[i].chamber == "senate") {
			$scope.congressInfo[i].chamber = "Senate";
		} else {
			$scope.congressInfo[i].chamber = "House";
		}
	}
	for (var i = 0; i < $scope.oJson_2.count; i++) {
		if ($scope.committeesInfo[i].chamber == "senate") {
			$scope.committeesInfo[i].chamber = "Senate";
		} else if ($scope.committeesInfo[i].chamber == "house") {
			$scope.committeesInfo[i].chamber = "House";
		} else {
			$scope.committeesInfo[i].chamber = "Joint";
		}
	}


	function formatDate(iso8601) {
		var MM = ["Jan.", "Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.", "Dec."]
		var dateSegments = iso8601.split("-");
		dateSegments[1] = MM[parseInt(dateSegments[1]) - 1];
		var desiredDate = dateSegments[1] + " " + dateSegments[2] + ", " + dateSegments[0];
		return desiredDate;
	}

	$scope.stateOptions = [
		"Alabama",
		"Alaska",
		"Arizona",
		"Arkansas",
		"California",
		"Colorado",
		"Connecticut",
		"Delaware",
		"Florida",
		"Georgia",
		"Hawaii",
		"Idaho",
		"Illinois",
		"Indiana",
		"Iowa",
		"Kansas",
		"Kentucky",
		"Louisiana",
		"Maine",
		"Maryland",
		"Massachusetts",
		"Michigan",
		"Minnesota",
		"Mississippi",
		"Missouri",
		"Montana",
		"Nebraska",
		"Nevada",
		"New Hampshire",
		"New Jersey",
		"New Mexico",
		"New York",
		"North Carolina",
		"North Dakota",
		"Ohio",
		"Oklahoma",
		"Oregon",
		"Pennsylvania",
		"Rhode Island",
		"South Carolina",
		"South Dakota",
		"Tennessee",
		"Texas",
		"Utah",
		"Vermont",
		"Virginia",
		"Washington",
		"West Virginia",
		"Wisconsin",
		"Wyoming"
	];
}

function MyController($scope, $filter) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.col = 'state_name';
	$scope.col_2 = 'committee_id'
    $scope.desc = 0;
	$scope.h = "House";
	$scope.s = "Senate";

	$scope.pageChangeHandler = function (num) {
		console.log('congressInfo page changed to ' + num);
	}
}

function OtherController($scope) {
	$scope.pageChangeHandler = function (num) {
		console.log('going to page ' + num);
	}
}

function ProgressDemoCtrl($scope) {
	$scope.max = 100;
	$scope.random = function() {
		var value = Math.floor(Math.random() * 100 + 1);
		var type;
		if (value < 25) {
			type = 'success';
		} else if (value < 50) {
			type = 'info';
		} else if (value < 75) {
			type = 'warning';
		} else {
			type = 'danger';
		}
		$scope.showWarning = type === 'danger' || type === 'warning';
		$scope.dynamic = value;
		$scope.type = type;
	};
	$scope.randomStacked = function() {
		$scope.stacked = [];
		var types = ['success', 'info', 'warning', 'danger'];
		for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
			var index = Math.floor(Math.random() * 4);
			$scope.stacked.push({
			  value: Math.floor(Math.random() * 30 + 1),
			  type: types[index]
			});
		}
	}
}

myApp.controller('MainController', MainController);
myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);
myApp.controller('ProgressDemoCtrl', ProgressDemoCtrl);

$("#switch_l").css('display', 'block');
$("#switch_b").css('display', 'none');
$("#switch_c").css('display', 'none');
$("#switch_f").css('display', 'none');

$(document).ready(function() {
	$("#toggleBtn").on("click", function (e) {
		e.preventDefault();
		$("#main").toggleClass("toggleDisplay");
	});
	$("#btn_l").on("click", function () {
		$("#switch_f").css('display', 'none');
		$("#switch_b").css('display', 'none');
		$("#switch_c").css('display', 'none');
		$("#switch_l").fadeIn("slow");
	});
	$("#btn_b").on("click", function () {
		$("#switch_f").css('display', 'none');
		$("#switch_l").css('display', 'none');
		$("#switch_c").css('display', 'none');
		$("#switch_b").fadeIn("slow");
	});
	$("#btn_c").on("click", function () {
		$("#switch_f").css('display', 'none');
		$("#switch_l").css('display', 'none');
		$("#switch_b").css('display', 'none');
		$("#switch_c").fadeIn("slow");
	});
	$("#btn_f").on("click", function () {
		$("#switch_c").css('display', 'none');
		$("#switch_l").css('display', 'none');
		$("#switch_b").css('display', 'none');
		$("#switch_f").fadeIn("slow");
	});
});
