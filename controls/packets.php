<?php class packets extends sn {
	
public static $status;
public static $zipName;
public static $lastPacket;
public static $newPacket;

function __construct() {
		
}

function preview() { $j=array();	
	if (!self::updateConfFile()) { self::$status="Не удалось получить настройки для данного пакета"; } else {
		self::$status='Выбран регион: '.ajax::$region;
	}	
	$j['status']=self::$status;
	echo json_encode($j);
}

function build() { $j=array(); $rt=false;
	if (!self::getLastPacketInfo()) { 
		self::$status="Не получилось создать архив";
		self::genNewPacketInfo();
	}
	if (!self::updateConfFile()) { self::$status="Не удалось получить настройки для данного пакета"; } else {
		if (!self::buildZipArchive()) { self::$status="Не получилось создать архив"; } else {
			if (!self::buildNewPacket()) { self::$status="Не удалось внести изменения в базу данных"; } else {
				self::$status='<a href="http://oz.st-n.ru/'.self::$zipName.'" target="_blank">Можете скачать архив</a>';
				$j['callback']="afterBuildPacket";
			}
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

function updateConfFile() {
	foreach (ajax::$conf->regions as $key) {
		if (isset($key->name)) {
			if ($key->name==ajax::$region) {
				if (isset($key->conf)) {
					if (file_exists("../".publish."/conf/main.json")) { unlink("../publish/conf/main.json"); }
					file_put_contents("../".publish."/conf/main.json",json_encode($key->conf));
					return true;
				}
			}
		}
	}
	return false;
}

function buildNewPacket() {
	self::$newPacket=self::$lastPacket;
	self::$newPacket->packet++;
	self::$newPacket->actualdt=self::unixTimeToDateTime(time());
	self::$newPacket->caption=iconv("UTF8","cp1251","Обновление от ".date("d.m.Y"));
	self::$newPacket->content="http://oz.st-n.ru/".self::$zipName;
	if (query(array(
		"sql"=>"insert into ".zcom." ".
				"(`post_id`,`content`,`packet`,`status`,`actualdt`,`caption`) values ".
				"(".
					"".self::$newPacket->post_id.",".
					"'".self::$newPacket->content."',".
					"".self::$newPacket->packet.",".
					"".self::$newPacket->status.",".
					"".self::$newPacket->actualdt.",".
					"'".self::$newPacket->caption."'".
				") ",
		"connection"=>ajax::$region
		))) 
	{
		return true;
	}
	return false;
}

function getLastPacketInfo() {
	if (query(array(
		"sql"=>"select * from zcom_test where (1=1) order by id desc limit 1 ",
		"connection"=>ajax::$region
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


function buildZipArchive() {
	$rg=ajax::$region;
	$p="../".publish."/";
	self::$zipName="packets/".$rg."/".date("YmdHis").".zip";
	if (file_exists("../".self::$zipName)) { unlink("../".self::$zipName); }
	zip("../".self::$zipName);
	addToZip($p."conf/"					,$p);
	addToZip($p."content/".$rg			,$p);
	//addToZip($p."files/".$rg			,$p);
	addToZip($p."photo/".$rg			,$p);
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

function addPacketsInfo() {
	return fetch("packets.tpl");
}

function addPacketsTable() { 
	$pc=array(); $i=-1;
	if (query(array(
		"sql"=>"select * from ".zcom." where (1=1) order by id desc limit 10 ",
		"connection"=>ajax::$region
		),$ms))
	{
		foreach ($ms as $r) {
			if (file_exists("../".str_replace("http://oz.st-n.ru/","",$r->content))) {
				$i++;		
				$pc[$i]['id']=$r->id;
				$pc[$i]['packet']=$r->packet;
				$pc[$i]['actualdt']=round(floatval($r->actualdt),2);
				$pc[$i]['content']=$r->content;
				$pc[$i]['caption']=toUTF($r->caption);
			}
		}
		assign('packets',$pc);
		return fetch("packets_table.tpl");
	}
	return false;
}

} ?>
