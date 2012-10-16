<?php class ajax extends sn {
	
public static $action;
public static $region;

function __construct() {
	if (self::getUrl()) {
		switch (self::$action){
			case "make":
				self::makePacket();
			break;
			case "showForm":
				self::showForm();
			break;
		}
	}	
}

function getUrl() {
	if (!isset($_REQUEST['action'])) return false;
	self::$action=trim(strval($_REQUEST['action']));
	switch (self::$action){
		case "make":
			if (!isset($_REQUEST['region'])) return false;
			self::$region=trim(strval($_REQUEST['region']));
			if (self::$region=="") return false;
		break;
		case "showForm":
			//
		break;
		default:return false;
	}
	return true;
}

function showForm() { $s="";
	$s.='<div class="balloon_form">';
	$s.='</div>';
	echo $s;
}

function makePacket() {
	$rg=self::$region;
	$p="../publish/";
	zip("../packets/".$rg."/".date("YmdHi").".zip");
	addToZip($p."conf/themes.json"		,$p);
	addToZip($p."content/".$rg			,$p);
	addToZip($p."files/".$rg			,$p);
	addToZip($p."img/"					,$p);
	addToZip($p."js/"					,$p);
	addToZip($p."layout/".$rg			,$p);
	addToZip($p."lib/"					,$p);
	addToZip($p."script/"				,$p);
	addToZip($p."style/"				,$p);
	addToZip($p."index.html"			,$p);
	addToZip($p."favicon.ico"			,$p);
}

} ?>
