<?php class start extends sn {

function __construct() {
	
	//innerHTML("#main","site/main.tpl");
	//echo html();	
	
	/*zip("test.zip");
	addToZip("sn-system/conf","");
	addToZip("sn-system/core/","sn-system");
	addToZip("sn-system/external/./");*/
	
	if (query("SELECT * FROM SMS_INC",$ms)) {
		/*foreach ($ms as $r) {
			echo $r->caption;
		}*/
		echo "go!";
	} else {
		echo "bad";
	}
	
	/*assign('test','это тестовая страница');
	$test=fetch("test.tpl");
	assign('title','standart-n');
	load(fetch("index.tpl"));
	innerHTML("#main",$test);
	echo html();*/
}

} ?>
