<?php class files extends sn {
	
public static $status;
public static $links;

function __construct() {
		
}

function addFileInfo() {
	self::addLinksToMenu();
	assign('publish',publish);
	assign('links',self::$links);
	return fetch("files.tpl");
}

function addLinksToMenu() {
	self::$links=array(); $i=-1;
	chdir("../".publish."/files/".ajax::$region."");
	$dir=opendir(".");
	while ($d=readdir($dir)) { $i++;
		if (is_dir($d)) { if (preg_match("/[0-9a-z]+/i",$d)) {
			$nm=str_replace('','',strval($d));
			$caption=dt::getDateFromDirName($nm);
			self::$links[$i]['name']=$nm;
			self::$links[$i]['caption']=$caption;
			self::$links[$i]['file']=$nm;
		} }
	}
	closedir($dir);
	chdir("../../../".upload."");
}


} ?>
