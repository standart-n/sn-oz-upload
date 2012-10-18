<?php class ajax extends sn {
	
public static $action;
public static $region;
public static $content;
public static $conf;

function __construct() {
	if (self::getControls()) {
		if (self::getSettings()) {
			if (self::getUrl()) {
				switch (self::$action){
					case "build":
						packets::build();
					break;
					case "preview":
						packets::preview();
					break;
					case "showContent":
						self::showContent();
					break;
				}
			}
		}
	}
}

function getControls() {
	foreach (array("packets") as $key) {
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


} ?>
