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

function loadText() { $j=array(); $f="";
	if (file_exists("../publish/content/".ajax::$region."/".ajax::$file)) {
		$f=file_get_contents("../publish/content/".ajax::$region."/".ajax::$file);
		$j['text']=$f;
		$j['name']=str_replace(".html","",ajax::$file);
		$j['callback']="afterLoadText";
		self::$status="Файл ".ajax::$file." загружен...";
	} else {
		self::$status="Файл ".ajax::$file." не найден...";
	}
	$j['file']=ajax::$file;
	$j['status']=self::$status;
	echo json_encode($j);
}


} ?>
