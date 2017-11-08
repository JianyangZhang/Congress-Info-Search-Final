// manipulate data
var theKey = 'VyvCcQyPRe88ZvWJnmNby17eabJxPsXalZPiGOOZ';
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

function MainController($scope) {
	/*
	var dt = new Date()
	alert(dt.getFullYear()+"_"+(dt.getMonth() + 1)+"_"+dt.getDate());
	*/
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
	$scope.targetContactForm = "-------";
	$scope.targetChamber = "-------";
	$scope.targetContact = "-------";
	$scope.targetParty = "-------";
	$scope.targetVotes = "-------";
	$scope.targetEndTerm = "-------";
	$scope.termPercent = "-------";
	$scope.targetOffice = "-------";
	$scope.targetState = "-------";
	$scope.targetStateRank = "-------";
	$scope.targetFax = "-------";
	$scope.targetTwitter = "-------";
	$scope.targetFacebook = "-------";
	$scope.targetYoutube = "------"

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
	// $scope.iframeURL = "-------";

	$.ajaxSetup({async: true});
	$scope.generateDetails_l = function () {
		$scope.targetInfo = this.info;
		$scope.targetID = this.info.bioguide_id;
		$scope.targetPhoto = "http://theunitedstates.io/images/congress/225x275/" + this.info.bioguide_id + ".jpg";
		$scope.targetName = this.info.title + ". " + this.info.last_name + ", " + this.info.first_name;
		$scope.targetContactForm = this.info.contact_form;
		$scope.targetChamber = this.info.chamber;
		$scope.targetBirth = this.info.date_of_birth;
		if ($scope.targetChamber == "house") {
			$scope.targetChamber == "House";
		} else {
			$scope.targetChamber == "Senate";
		}
		$scope.targetContact = this.info.phone;
		$scope.targetParty = this.info.party;
		$scope.targetVotes = this.info.total_votes;
		$scope.targetEndTerm = this.info.next_election;
		var oDate = new Date();
		if ($scope.targetChamber == "Senate") {
			$scope.termPercent = parseInt((($scope.targetEndTerm - oDate.getFullYear()) / 6) * 100);
		} else {
			$scope.termPercent = parseInt((($scope.targetEndTerm - oDate.getFullYear()) / 2) * 100);
		}
		$scope.targetOffice = this.info.office;
		$scope.targetState = this.info.state_name;
		if (this.info.state_rank && this.info.state_rank != null) {
			$scope.targetStateRank = this.info.state_rank;
		} else {
			$scope.targetStateRank = "N.A";
		}
		if (this.info.fax && this.info.fax != null) {
			$scope.targetFax = this.info.fax;
		} else {
			$scope.targetFax = "N.A";
		}
		if (this.info.twitter_account && this.info.twitter_account != null) {
			$scope.targetTwitter = "http://twitter.com/" + this.info.twitter_account;
		} else {
			$scope.targetTwitter = "N.A";
		}
		if (this.info.facebook_account && this.info.facebook_account != null) {
			$scope.targetFacebook = "http://facebook.com/" + this.info.facebook_account;
		} else {
			$scope.targetFacebook = "N.A";
		}
		if (this.info.youtube_account && this.info.youtube_account != null) {
			$scope.targetYoutube = "http://youtube.com/" + this.info.youtube_account;
		} else {
			$scope.targetYoutube = "N.A";
		}

		$scope.targetCommittees = [];
		$.get("http://localhost:3000/committees/" + $scope.targetID + "/5", {}, function (receive_data) {
			$scope.oJson_3 = receive_data;
			for (var i = 0; i < $scope.oJson_3.count; i++) {
				$scope.targetCommittees.push($scope.oJson_3.results[i]);
			}
			$scope.$apply();
		});

		$scope.targetBills = [];
		$.get("http://localhost:3000/bills/" + $scope.targetID + "/5", {}, function (receive_data) {
			$scope.oJson_4 = receive_data;
			for (var i = 0; i < $scope.oJson_4.count; i++) {
				$scope.targetBills.push($scope.oJson_4.results[i]);
			}
			$scope.$apply();
		});

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
		$scope.selectedBillType = this.info.bill_type;
		$scope.selectedTitle = this.info.title;
		$scope.selectedShortTitle = this.info.short_title;
		$scope.selectedSponsor = this.info.sponsor_title + " " + this.info.sponsor_name;
		$scope.selectedCommittee = this.info.committees;
		$scope.selectedParty = this.info.sponsor_party;
		if (this.info.chamber == "house") {
			$scope.selectedChamber = "House";
		} else {
			$scope.selectedChamber = "Senate";
		}
		if (this.info.active) {
			$scope.selectedActivity = "Active";
		} else {
			$scope.selectedActivity = "New";
		}
		$scope.selectedIntroducedOn = this.info.introduced_date;
		$scope.selectedCongressUrl = this.info.congressdotgov_url;
		$scope.selectedGovUrl = this.info.govtrack_url;
		$scope.selectedState = this.info.sponsor_state;
		$scope.selectedLastMajorAction = this.info.latest_major_action;
		$scope.selectedLastMajorActionDate = this.info.latest_major_action_date;

		if (localStorage.getItem($scope.selectedBillID)) {
			$("#favIcon_bills").attr("class", "fa fa-star fa-lg setYellow");
		} else {
			$("#favIcon_bills").attr("class", "fa fa-star-o fa-lg");
		}
	}
	$scope.followup_bills = function () {
		$('#btn_b').click();
	}

	$.get("http://localhost:3000/legislators", {}, function (receive_data) {
		$scope.oJson = receive_data;
		for (var i = 0; i < $scope.oJson.count; i++) {
			$scope.congressInfo.push($scope.oJson.results[i]);
		}
		$scope.$apply();
	});
	$.get("http://localhost:3000/committees", {}, function (receive_data) {
		$scope.oJson_2 = receive_data;
		for (var i = 0; i < $scope.oJson_2.count; i++) {
			$scope.committeesInfo.push($scope.oJson_2.results[i]);
		}

	});

	$.get("http://localhost:3000/activeBills", {}, function (receive_data) {
		$scope.oJson_5 = receive_data;
		for (var i = 0; i < $scope.oJson_5.count; i++) {
			$scope.activeBillsInfo.push($scope.oJson_5.results[i]);
		}
		$scope.$apply();
	});
	$.get("http://localhost:3000/newBills", {}, function (receive_data) {
		$scope.oJson_6 = receive_data;
		for (var i = 0; i < $scope.oJson_6.count; i++) {
			$scope.newBillsInfo.push($scope.oJson_6.results[i]);
		}
		$scope.$apply();
	});

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
		if (!localStorage.getItem(this.info.id)) {
			localStorage.setItem(this.info.id, JSON.stringify(this.info));
			$(concateId).attr("class", "fa fa-star fa-lg setYellow");
		} else {
			localStorage.removeItem(this.info.id);
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
		if (localStorage.getItem(this.info.id)) {
			localStorage.removeItem(this.info.id);
			pushFavCommittees();
		}
	}

	$("#btn_f").on("click", function () {
		pushFavLegislators();
		pushFavBills();
		pushFavCommittees();
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
			if (typeof jsonObj.id != "undefined") {
				$scope.favCommitteesInfo.push(jsonObj);
			}
		}
	}

	$scope.isCommitteeInFav = function () {
		for (var i = 0; i < localStorage.length; i++) {
			if(this.info.id == localStorage.key(i)) {
				return true;
			}
		}
		return false;
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
