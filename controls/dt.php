<?php class dt extends sn {
	
public static $status;
public static $links;

function __construct() {
		
}

function getDateFromDirName($dir) { $s="";
	$day=substr($dir,6,2);
	$m=substr($dir,4,2);
	$an=substr($dir,8);
	switch ($m) {
	case "01": $month="января"; break;
	case "02": $month="февраля"; break;
	case "03": $month="марта"; break;
	case "04": $month="апреля"; break;
	case "05": $month="мая"; break;
	case "06": $month="июня"; break;
	case "07": $month="июля"; break;
	case "08": $month="августа"; break;
	case "09": $month="сентября"; break;
	case "10": $month="октября"; break;
	case "11": $month="ноября"; break;
	case "12": $month="декабря"; break;
	default: $month="числа"; break;
	}
	$s=$day." ".$month;
	if ($an!="") {
		$s.=" (".$an.")";
	}
	return $s;
}

} ?>
