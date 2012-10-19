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
					break;
					case "text":
						$(this).ozUploadAjax('loadContent',{'content':'text'});
						var sn=$(this).data('ozUpload');
						$('#balloon-content').html(sn.content.balloon);
						$(this).ozUploadTriggers('linksBalloon');
						$(this).ozUploadTriggers('switchTabs',{'link':'text'});
						$(this).ozUploadTriggers('switchToDark');
					break;
					case "files":
						$(this).ozUploadAjax('loadContent',{'content':'files'});
						var sn=$(this).data('ozUpload');
						$('#balloon-content').html(sn.content.balloon);
						$(this).ozUploadTriggers('linksBalloon');
						$(this).ozUploadTriggers('switchTabs',{'link':'files'});
						$(this).ozUploadTriggers('switchToDark');
					break;
					case "build":
						$(this).ozUploadAjax('sendRequest',{'action':'build'});
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
