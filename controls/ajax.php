<?php class ajax extends sn {
	
public static $action;
public static $region;
public static $content;
public static $status;
public static $sql;
public static $zipName;
public static $lastPacket;
public static $newPacket;

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

function build() { $j=array(); $rt=false;
	if (!self::getLastPacketInfo()) { 
		self::$status="Не получилось создать архив";
		self::genNewPacketInfo();
	}
	if (!self::buildZipArchive()) { self::$status="Не получилось создать архив"; } else {
		if (!self::buildNewPacket()) { self::$status="Не удалось внести изменения в базу данных"; } else {
			self::$status='<a href="http://oz.st-n.ru/'.self::$zipName.'" target="_blank">Можете скачать архив</a>';
		}
	}
	$j['status']=self::$status;
	echo json_encode($j);
}

function genNewPacketInfo() {
	self::$lastPacket->packet=1;
	self::$lastPacket->post_id=0;
	self::$lastPacket->status=0;
}

function buildNewPacket() {
	self::$newPacket=self::$lastPacket;
	self::$newPacket->packet++;
	self::$newPacket->actualdt=self::unixTimeToDateTime(time());
	self::$newPacket->caption=iconv("UTF8","cp1251","Обновление от ".date("d.m.Y"));
	self::$newPacket->content="http://oz.st-n.ru/".self::$zipName;
	if (query(array(
		"sql"=>"insert into zcom_test ".
				"(`post_id`,`content`,`packet`,`status`,`actualdt`,`caption`) values ".
				"(".
					"".self::$newPacket->post_id.",".
					"'".self::$newPacket->content."',".
					"".self::$newPacket->packet.",".
					"".self::$newPacket->status.",".
					"".self::$newPacket->actualdt.",".
					"'".self::$newPacket->caption."'".
				") ",
		"connection"=>self::$region
		))) 
	{
		return true;
	}
	return false;
}

function getLastPacketInfo() {
	if (query(array(
		"sql"=>"select * from zcom_test where (1=1) order by id desc limit 1 ",
		"connection"=>self::$region
		),$ms)) 
	{
		foreach ($ms as $r) {
			if (!intval($r->id)>0) { return false; }
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

function buildZipArchive() {
	$rg=self::$region;
	$p="../publish/";
	self::$zipName="packets/".$rg."/".date("YmdHis").".zip";
	if (file_exists("../".self::$zipName)) { unlink("../".self::$zipName); }
	zip("../".self::$zipName);
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
	return true;
}

function dateTimeToUnixTime($dt) {
	$SecPerDay=86400;
	$Offset1970=25569;
	return abs(($dt-$Offset1970)*$SecPerDay);
} 

function unixTimeToDateTime($dt) {
	$SecPerDay=86400;
	$Offset1970=25569;
	return abs(($dt/$SecPerDay)+$Offset1970);
}

} ?>
