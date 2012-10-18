<?php class ajax extends sn {
	
public static $action;
public static $region;
public static $content;
public static $lastPacket;

function __construct() {
	if (self::getUrl()) {
		switch (self::$action){
			case "build":
				self::build();
			break;
			case "showContent":
				self::showContent();
			break;
		}
	}	
}

function getUrl() {
	if (!isset($_REQUEST['action'])) return false;
	self::$action=trim(strval($_REQUEST['action']));
	switch (self::$action){
		case "build":
			if (!isset($_REQUEST['region'])) return false;
			self::$region=trim(strval($_REQUEST['region']));
			if (self::$region=="") return false;
		break;
		case "showContent":
			if (!isset($_REQUEST['region'])) return false;
			self::$region=trim(strval($_REQUEST['region']));
			if (self::$region=="") return false;

			if (!isset($_REQUEST['content'])) return false;
			self::$content=trim(strval($_REQUEST['content']));
			if (self::$content=="") return false;
		break;
		default:return false;
	}
	return true;
}

function build() { $j=array();
	if (self::getLastPacketInfo()) {
		//$j['alert']=self::$lastPacket->id;
		$j=self::$lastPacket;
	}
	echo json_encode($j);
}

function getLastPacketInfo() {
	if (query(array(
		"sql"=>"select * from zcom_test where (1=1) order by id Desc Limit 1 ",
		"connection"=>self::$region
		),$ms)) 
	{
		foreach ($ms as $r) {
			self::$lastPacket=$r;
			return true;
		}
	}
	return false;
}

function showContent() {
	switch (self::$content){
		case "all":
			load("balloon/form.tpl");
			innerHTML("#balloon-content","balloon/packets.tpl");
		break;
		case "packets":
			load("balloon/packets.tpl");
		break;
		case "files":
			load("balloon/files.tpl");
		break;
		case "text":
			load("balloon/text.tpl");
		break;
	}
	echo html();			
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
