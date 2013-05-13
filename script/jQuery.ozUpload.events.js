(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
				var def={
					'href':"none"
				};
				$.extend(def,options);
				var href=def.href;
				switch (href.replace(/(.*)#(.*)/,"$2")){
					case "autoload":
						$(this).show();
						$(this).ozUploadAjax('loadContent',{'content':'all'});
						var sn=$(this).data('ozUpload');
						$(this).html(sn.content.balloon);
						$(this).ozUploadTriggers('linksBalloon');
						$(this).ozUploadTriggers('closeBalloon');
						$(this).ozUploadTriggers('tabs');
						$(this).ozUploadTriggers('switchTabs',{'link':'packets'});
						$(this).ozUploadTriggers('switcherTabs');
						$(this).ozUploadTriggers('switchToDark');
						$(this).ozUploadAjax('sendRequest',{'action':'preview'});
					break;
					case "packets":
						$(this).ozUploadAjax('loadContent',{'content':'packets'});
						var sn=$(this).data('ozUpload');
						$('#balloon-content').html(sn.content.balloon);
						$(this).ozUploadTriggers('linksBalloon');
						$(this).ozUploadTriggers('switchTabs',{'link':'packets'});
						$(this).ozUploadTriggers('switchToDark');
						$(this).ozUploadAjax('sendRequest',{'action':'preview'});
					break;
					case "text":
						$(this).ozUploadAjax('loadContent',{'content':'text'});
						var sn=$(this).data('ozUpload');
						$('#balloon-content').html(sn.content.balloon);
						$(this).ozUploadTriggers('linksBalloon');
						$(this).ozUploadTriggers('switchTabs',{'link':'text'});
						$(this).ozUploadTriggers('switchToDark');
						$(this).ozUploadTriggers('linksTextMenu');
						$(this).ozUploadTriggers('replaceTools');
						$(this).ozUploadAjax('sendRequest',{'action':'loadText','file':'main.html'});
					break;
					case "afterLoadText":
						var sn=$(this).data('ozUpload');
						if (sn.result.text) {
							var text=sn.result.text;
							text=text.replace(/\\"/g,'"');
							text=text.replace(/\\'/g,"'");
							$("#text-wrap textarea").val(text);
						}
						if (sn.result.name) {
							$(this).ozUploadTriggers('switchTextMenu',{'link':sn.result.name});
						}
						if (sn.result.file) {
							$("#text-input-file").val(sn.result.file);
						}
					case "afterScanDirectory":
						var sn=$(this).data('ozUpload');
						if (sn.result.content) {
							$("#files-list").html(sn.result.content);
						}
						if (sn.result.folder) {
							$(this).ozUploadTriggers('switchFilesMenu',{'link':sn.result.folder});
						}
					break;
					case "saveText":
						$(this).ozUploadAjax('sendRequest',{
							'action':'saveText',
							'file':$("#text-input-file").val(),
							'text':$("#text-wrap textarea").val()
						});
					break;
					case "files":
						$(this).ozUploadAjax('loadContent',{'content':'files'});
						var sn=$(this).data('ozUpload');
						$('#balloon-content').html(sn.content.balloon);
						$(this).ozUploadTriggers('linksBalloon');
						$(this).ozUploadTriggers('switchTabs',{'link':'files'});
						$(this).ozUploadTriggers('switchToDark');
						$(this).ozUploadTriggers('uploadify');
						$(this).ozUploadTriggers('linksFilesMenu');
						$(this).ozUploadAjax('sendRequest',{'action':'readFolder','folder':sn.result.folder,'debug':false});
					break;
					case "build":
						$(this).ozUploadAjax('sendRequest',{'action':'build'});
					break;
					case "afterBuildPacket":
						var sn=$(this).data('ozUpload');
						$(this).ozUploadAjax('sendRequest',{'action':'reloadPacketsTable'});
					break;
					case "addPacketsTable":
						var sn=$(this).data('ozUpload');
						if (sn.result.table) {
							$("#packets-table").html(sn.result.table);
						}
					break;
					case "close":
						$(this).hide();
					break;
				}
			});
		}
	};

	$.fn.ozUploadEvents=function(sn){
		if (!sn) { var sn={}; }
		if ( methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}		
	};		
})(jQuery);
