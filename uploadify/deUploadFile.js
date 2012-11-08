	//Dement.ru				 
var deUploadFile = jQuery.Class.create({		
	init: function(deParentDiv_id,				// родительский див в который вставится весь HTML код 
				   deUpload_id,                 // id главного дива
                   dePath,
                   deUploader,
                   deScript,
                   deCheck,
                   deCancel,
                   deFileDesc,
                   deFileExt,
                   deFunction
				   ){	


$(document).ready(function () {


		deCode='<div id="'+deUpload_id+'">';
        deCode+='<div id="'+deUpload_id+'Upload">';
        deCode+='<input type="file" name="nm'+deUpload_id+'" id="id'+deUpload_id+'" />';
        deCode+='<div id="'+deUpload_id+'file"></div>';

        deCode+='<div id="'+deUpload_id+'Cancel">';
        deCode+="<p><a href=\"javascript:jQuery('#id"+deUpload_id+"').uploadifyClearQueue()\">Отменить загрузку</a></p>";
		deCode+='</div>';

        //deCode+='<div id="'+deUpload_id+'Start"><span class="clCloseDlg">';
        //deCode+="<a class=\""+deUpload_id+"Link\" href=\"javascript:$('#uploadify').uploadifyUpload();\">Загрузить</a>";
		//deCode+='</span></div>';

        deCode+='<div id="'+deUpload_id+'Buttons">';								// див с инпутами 
		deCode+='<input id="id'+deUpload_id+'Click"               name="nm'+deUpload_id+'Click" type="hidden">';
		deCode+='<input id="id'+deUpload_id+'name"                name="nm'+deUpload_id+'name" type="hidden">';
		deCode+='<input id="id'+deUpload_id+'size"                name="nm'+deUpload_id+'size" type="hidden">';
		deCode+='<input id="id'+deUpload_id+'type"                name="nm'+deUpload_id+'type" type="hidden">';
		deCode+='<input id="id'+deUpload_id+'creationDate"        name="nm'+deUpload_id+'creationDate" type="hidden">';
		deCode+='<input id="id'+deUpload_id+'modificationDate"    name="nm'+deUpload_id+'modificationDate" type="hidden">';
		deCode+='</div>';

		deCode+='</div>';
				
	   deParentDiv=document.getElementById(deParentDiv_id);				 
	   deParentDiv.innerHTML=deParentDiv.innerHTML+deCode;
       
       deQueue=deUpload_id+'file';
		
		deUpload_css(); 							 




    $("#id"+deUpload_id).uploadify({
    'uploader' : deUploader,
    'script' : deScript,
    'checkscript' : deCheck,
    'cancelImg' : deCancel,
    'queueID' : deQueue,
    'auto' : true,
    'multi' : false,
    'fileDesc' : deFileDesc,
    'fileExt' : deFileExt,
    'folder' : dePath,
    'buttonText': ' ',
    'buttonImg': 'http://www.dement.ru/!php/upload/select.png',
    'onComplete' : function(event,queueID,fileObj,response,data) {
                    $('#response').append(response);

                    document.getElementById('id'+deUpload_id+'Click').value=fileObj.filePath;
                    document.getElementById('id'+deUpload_id+'name').value=fileObj.name;
                    document.getElementById('id'+deUpload_id+'size').value=fileObj.size;
                    document.getElementById('id'+deUpload_id+'type').value=fileObj.type;
                    document.getElementById('id'+deUpload_id+'creationDate').value=fileObj.creationDate;
                    document.getElementById('id'+deUpload_id+'modificationDate').value=fileObj.modificationDate;

                    setTimeout(deFunction,10);
                    }
    });


});



function deUpload_css() {
	
	$('#'+deUpload_id).css({'display': 'block'});		
	$('#'+deUpload_id).css({'float': 'left'});
	$('#'+deUpload_id).css({'height': 'auto'});
	$('#'+deUpload_id).css({'background': '#ffffff'});

	$('#'+deUpload_id+'Cancel a').css({'display': 'none'});

	$('#'+deUpload_id+'Start a').css({'font-family': 'Verdana, Arial, Helvetica, sans-serif'});
	$('#'+deUpload_id+'Start a').css({'font-weight': 'bold'});
	$('#'+deUpload_id+'Start a').css({'font-size': 'small'});
	$('#'+deUpload_id+'Start a').css({'color': '#333333'});
	$('#'+deUpload_id+'Start a').css({'text-decoration': 'underline'});



}

	return "Dement.ru";
					// 2010 НВП "Стандарт-Н"
	}
});
									 




