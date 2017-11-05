<?php
	header("Access-Control-Allow-Origin: *");
	header("content-type: text/html; charset = utf-8");
	
	$apiKey = "eb6dfc9cff4c446080d50c4513d41c2f";
	$dataBase = $_GET["dataBase"];
	$flag_3 = null;	
	$flag_4 = null;
	$flag_5 = null;
	$flag_6 = null;
	if (isset($_GET["flag_3"])) {
		$flag_3 = $_GET["flag_3"];
	}
	if (isset($_GET["flag_4"])) {
		$flag_4 = $_GET["flag_4"];
	}
	if (isset($_GET["flag_5"])) {
		$flag_5 = $_GET["flag_5"];
	}
	if (isset($_GET["flag_6"])) {
		$flag_6 = $_GET["flag_6"];
	}		
	
	if ($dataBase == "legislators") {
		// $dataUrl = "http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=".$apiKey;
		// $dataUrl = "http://104.198.0.197:8080/legislators?per_page=all";		
		// $jsonData = file_get_contents($dataUrl);
		$jsonData = file_get_contents('./backupData/legislators.json');
		echo $jsonData;
	}	
	if ($dataBase == "committees") {
		if ($flag_3 != null) {
			// $dataUrl = "http://congress.api.sunlightfoundation.com/committees?member_ids=".$flag_3."&apikey=".$apiKey;
			$dataUrl = "http://104.198.0.197:8080/committees?member_ids=".$flag_3;
			$jsonData = file_get_contents($dataUrl);
			echo $jsonData;
		} else {
			// $dataUrl = "http://104.198.0.197:8080/committees?per_page=all";
			// $dataUrl = "http://congress.api.sunlightfoundation.com/committees?per_page=all"."&apikey=".$apiKey;
			// $jsonData = file_get_contents($dataUrl);
			$jsonData = file_get_contents("./backupData/committees.json");
			echo $jsonData;			
		}
	}	
	if ($dataBase == "bills" ) {
		if ($flag_4 != null && $flag_5 == null && $flag_6 == null) {
			$dataUrl = "http://104.198.0.197:8080/bills?sponsor_id=".$flag_4;
			$jsonData = file_get_contents($dataUrl);
			echo $jsonData;			
		} else if ($flag_5 != null && $flag_4 == null && $flag_6 == null) {
			// $dataUrl = "http://104.198.0.197:8080/bills?history.active=true&order=introduced_on&per_page=50";
			// $jsonData = file_get_contents($dataUrl);
			$jsonData = file_get_contents("./backupData/activeBills.json");
			echo $jsonData;
		} else if ($flag_6 != null && $flag_4 == null && $flag_5 == null) {
			// $dataUrl = "http://104.198.0.197:8080/bills?history.active=false&order=introduced_on&per_page=50";
			// $jsonData = file_get_contents($dataUrl);
			$jsonData = file_get_contents("./backupData/newBills.json");
			echo $jsonData;			
		}	
	}
?>