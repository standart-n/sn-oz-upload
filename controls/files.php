<?php class files extends sn {
	
public static $status;
public static $links;
public static $files;

function __construct() {
		
}

function addFileInfo() {
	self::addLinksToMenu();
	assign('publish',publish);
	assign('links',self::$links);
	return fetch("files.tpl");
}

function addLinksToMenu() {
	self::$links=array();
	chdir("../".publish."/files/".ajax::$url->region."");
	$dir=opendir(".");
	while ($d=readdir($dir)) { 
		if (is_dir($d)) { if (preg_match("/[0-9a-z]+/i",$d)) {
			$nm=str_replace('','',strval($d));
			$caption=dt::getDateFromDirName($nm);
			self::$links[$nm]['name']=$nm;
			self::$links[$nm]['caption']=$caption;
			self::$links[$nm]['file']=$nm;
		} }
	}
	closedir($dir);
	chdir("../../../".upload."");
	arsort(self::$links); reset(self::$links);
}

function getToken() {
	return sha1(date("dj.StAndaRt-n"));
}

function readFolder() { $j=array();
	self::scanFolder();
	assign('files',self::$files);
	$j['files']=self::$files;
	$j['content']=fetch("files_list.tpl");
	$j['folder']=ajax::$url->folder;
	$j['status']='/'.publish.'/files/'.ajax::$url->region.'/'.ajax::$url->folder.'/..';
	$j['callback']="afterScanDirectory";
	echo json_encode($j);
}
	
function scanFolder() {
	self::$files=array();
	chdir("../".publish."/files/".ajax::$url->region."/".ajax::$url->folder);
	$dir=opendir(".");
	while ($d=readdir($dir)) { 
		if (is_file($d)) { if (preg_match("/[0-9a-z]+/i",$d)) {
			$nm=str_replace('','',strval($d));
			self::$files[$nm]['name']=$nm;
		} }
	}
	closedir($dir);
	chdir("../../../../".upload."");
	arsort(self::$files); reset(self::$files);
}


} ?>
