<?php class text extends sn {
	
public static $status;
public static $links;

function __construct() {
		
}

function addTextInfo() {
	self::addLinksToMenu();
	assign('publish',publish);
	assign('links',self::$links);
	return fetch("text.tpl");
}

function addLinksToMenu() {
	self::$links=array(); $i=-1;
	chdir("../".publish."/content/".ajax::$url->region."");
	$dir=opendir(".");
	while ($d=readdir($dir)) { $i++;
		if (is_file($d)) { if (preg_match("/[0-9a-z]+\.html/i",$d)) {
			$nm=str_replace('.html','',$d);
			switch (strtolower($nm)) {
			case "apteki":
				$caption="Аптеки";
			break;
			case "dealers":
				$caption="Оптовики";
			break;
			case "news":
				$caption="Новости";
			break;
			case "main":
				$caption="Главная";
			break;
			case "orders":
				$caption="Законодательство";
			break;
			case "contacts":
				$caption="Контакты";
			break;				
			default: $caption=$nm;	
			}
			self::$links[$i]['name']=$nm;
			self::$links[$i]['caption']=$caption;
			self::$links[$i]['file']=$nm.".html";
		} }
	}
	closedir($dir);
	chdir("../../../".upload."");
}

function loadText() { $j=array(); $f="";
	if (file_exists("../".publish."/content/".ajax::$url->region."/".ajax::$url->file)) {
		$f=file_get_contents("../".publish."/content/".ajax::$url->region."/".ajax::$url->file);
		$f=stripcslashes($f);
		$j['text']=$f;
		$j['name']=str_replace(".html","",ajax::$url->file);
		$j['callback']="afterLoadText";
		self::$status="Файл ".ajax::$url->file." загружен...";
	} else {
		self::$status="Файл ".ajax::$url->file." не найден...";
	}
	$j['file']=ajax::$url->file;
	$j['status']=self::$status;
	echo json_encode($j);
}

function saveText() { $j=array(); $t=ajax::$url->text;
	if (file_exists("../".publish."/content/".ajax::$url->region."/".ajax::$url->file)) {
		$t=stripcslashes($t);
		file_put_contents("../".publish."/content/".ajax::$url->region."/".ajax::$url->file,$t);
		$j['text']=ajax::$url->text;
		$j['name']=str_replace(".html","",ajax::$url->file);
		$j['callback']="afterLoadText";
		self::$status="Файл ".ajax::$url->file." сохранен...";
	} else {
		self::$status="Файл ".ajax::$url->file." не найден...";
	}
	$j['file']=ajax::$url->file;
	$j['status']=self::$status;
	echo json_encode($j);
}


} ?>
