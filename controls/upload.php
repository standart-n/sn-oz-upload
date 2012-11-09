<?php class upload extends sn {
	
public static $status;
public static $links;
public static $folder;
public static $fileTypes;

function __construct() {
	self::$fileTypes=array('jpg','jpeg','gif','png','xls','doc','zip','pdf','rar','css');
}

function makeActualFolder() {
	self::$folder="../".publish."/files/".ajax::$url->region."/".date("Ymd");
	if (!is_dir(self::$folder)) { @mkdir(self::$folder,0777,true); }
}

function uploadFiles() {
	console::write("action: uploadFile");
	console::write("region: ".start::$url->region);
	if (start::$url->token!=sha1(date("dj.StAndaRt-n"))) return false;
	if ((isset($_FILES['Filedata']['tmp_name'])) && (isset($_FILES['Filedata']['name']))) {
		$tempFile=$_FILES['Filedata']['tmp_name'];
		console::write("tmp: ".$tempFile);
		self::$folder="../".publish."/files/".start::$url->region."/".date("Ymd");
		if (!is_dir(self::$folder)) { @mkdir(self::$folder,0777,true); }
		$targetFile=self::$folder."/".$_FILES['Filedata']['name'];
		console::write("file: ".$targetFile);
		$fileParts=pathinfo($_FILES['Filedata']['name']);	
		if (in_array($fileParts['extension'],self::$fileTypes)) {
			console::write("ext: ".$fileParts['extension']);
			if (move_uploaded_file($tempFile,$targetFile)) {
				console::write("upload: true");
			} else {
				console::write("upload: false");
			}
		}
		console::write("error: расширение ".$fileParts['extension']." не найдено в списке доступных для загрузки");
	} else {
		console::write("error: не найдены загружаемые файлы");
	}
}
	
	

} ?>
