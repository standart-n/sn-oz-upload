<?php class ajax extends sn {
	
public static $action;
public static $region;
public static $content;
public static $file;
public static $files;
public static $text;
public static $conf;
public static $options;

function __construct() {
	if (self::getControls()) {
		if (self::getSettings()) {
			if (self::getOptions()) {
				if (self::getUrl()) {
					switch (self::$action){
						case "build":
							packets::build();
						break;
						case "preview":
							packets::preview();
						break;
						case "loadText":
							text::loadText();
						break;
						case "saveText":
							text::saveText();
						break;
						case "showContent":
							self::showContent();
						break;
					}
				}
			}
		}
	}
}

function getControls() {
	foreach (array("packets","text","files","uchet","dt") as $key) {
		if (!file_exists(project."/controls/".$key.".php")) return false;
		require_once(project."/controls/".$key.".php");
		sn::cl("packets");
	}
	return true;	
}

function getSettings() {
	if (!file_exists(project."/settings/main.json")) return false;
	$f=file_get_contents(project."/settings/main.json");
	self::$conf=json_decode($f);
	return true;
}

function getOptions() {
	if (!file_exists(project."/conf/options.json")) return false;
	$f=file_get_contents(project."/conf/options.json");
	self::$options=json_decode($f);
	define("zcom",self::$options->tables->zcom);
	define("upload",self::$options->folders->upload);
	define("publish",self::$options->folders->publish);
	define("packets",self::$options->folders->packets);
	return true;
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
		case "preview":
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
		case "loadText":
			if (!isset($_REQUEST['region'])) return false;
			self::$region=trim(strval($_REQUEST['region']));
			if (self::$region=="") return false;

			if (!isset($_REQUEST['file'])) return false;
			self::$file=trim(strval($_REQUEST['file']));
			if (self::$file=="") return false;
		break;
		case "saveText":
			if (!isset($_REQUEST['region'])) return false;
			self::$region=trim(strval($_REQUEST['region']));
			if (self::$region=="") return false;

			if (!isset($_REQUEST['file'])) return false;
			self::$file=trim(strval($_REQUEST['file']));
			if (self::$file=="") return false;

			if (!isset($_REQUEST['text'])) return false;
			self::$text=trim(strval($_REQUEST['text']));
			if (self::$text=="") return false;
		break;
		default:return false;
	}
	return true;
}

function showContent() {
	switch (self::$content){
		case "all":
			load("form.tpl");
			innerHTML("#balloon-content",packets::addPacketsInfo());
			innerHTML("#packets-table",packets::addPacketsTable());
		break;
		case "packets":
			load(packets::addPacketsInfo());
			innerHTML("#packets-table",packets::addPacketsTable());
		break;
		case "files":
			load(files::addFileInfo());
		break;
		case "text":
			load(text::addTextInfo());
		break;
	}
	echo html();			
}


} ?>
