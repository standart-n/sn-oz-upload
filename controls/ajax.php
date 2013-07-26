<?php class ajax extends sn {
	
public static $conf;
public static $options;
public static $url;

function __construct() {
	if (self::getControls()) {
		if (self::getSettings()) {
			if (self::getOptions()) {
				if (self::getUrl()) {
					switch (self::$url->action){
						case "build":
							packets::build();
						break;
						case "reloadPacketsTable":
							packets::reloadPacketsTable();
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
						case "readFolder":
							files::readFolder();
						break;
					}
				}
			}
		}
	}
}

function getControls() {
	foreach (array("packets","text","files","uchet","dt","upload","console") as $key) {
		if (!file_exists(project."/controls/".$key.".php")) return false;
		require_once(project."/controls/".$key.".php");
		sn::cl($key);
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
	define("host",self::$options->path->host);
	define("folder",self::$options->path->folder);
	return true;
}

function getUrl() {
	self::$url=new def;
	if (self::checkParams(array("action"))) {
		switch (self::$url->action){
		case "build":
			return self::checkParams(array("region","theme"));
		break;
		case "reloadPacketsTable":
			return self::checkParams(array("region","theme"));
		break;
		case "preview":
			return self::checkParams(array("region","theme"));
		break;
		case "showContent":
			return self::checkParams(array("region","theme","content"));
		break;
		case "loadText":
			return self::checkParams(array("region","theme","file"));
		break;
		case "saveText":
			return self::checkParams(array("region","theme","file","text"));
		break;
		case "readFolder":
			return self::checkParams(array("region","theme","folder"));
		break;
		default: return false;
		}
	}
	return true;
}

function checkParams($ms) {
	foreach ($ms as $key) {
		if (!isset($_REQUEST[$key])) return false;
		self::$url->$key=trim(strval($_REQUEST[$key]));
		if (self::$url->$key=="") return false;
	}
	return true;
}

function showContent() { $j=array();
	switch (self::$url->content){
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
			upload::makeActualFolder();
			$j['token']=files::getToken();
			$j['folder']=date("Ymd");
			$j['upload']=date("Ymd");
			load(files::addFileInfo());
		break;
		case "text":
			load(text::addTextInfo());
		break;
		default: return false;
	}
	$j['content']=html();
	echo json_encode($j);
}


} ?>
