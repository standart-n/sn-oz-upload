<?php class text extends sn {
	
public static $status;
public static $links;

function __construct() {
		
}

function addTextInfo() {
	self::addLinksToMenu();
	assign('links',self::$links);
	return fetch("text.tpl");
}

function addLinksToMenu() {
	self::$links=array(); $i=-1;
	chdir("../publish/content/".ajax::$region."");
	$dir=opendir(".");
	while ($d=readdir($dir)) { $i++;
		if (is_file($d)) { if (preg_match("/[0-9a-z]+\.html/i",$d)) {
			$nm=str_replace('.html','',$d);
			self::$links[$i]['name']=$nm;
			self::$links[$i]['file']=$nm.".html";
		} }
	}
	closedir($dir);
	chdir("../../../upload-dev"); 
}

} ?>
