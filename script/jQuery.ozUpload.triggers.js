(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
			});
		},
		linksBalloon:function()
		{
			var oz=$(this);
			$("#balloon-content a").on("click",function(){
				oz.ozUploadEvents({'href':$(this).attr("href")});
			});
			$("#packets-link-preview").on("click",function(){
				oz.ozUploadEvents({'href':"#preview"});
			});
		},
		closeBalloon:function()
		{
			var oz=$(this);
			$('#balloon-close').on("click",function(){ 
				oz.ozUploadEvents({'href':'#close'});
			});
		},
		tabs:function()
		{
			var oz=$(this);
			$(".balloon-top-link").on("click",function(){
				oz.ozUploadEvents({'href':$(this).attr("href")});
			});
		},
		uploadify:function()
		{
			$('#file_upload').uploadify({
				'formData':
				{
					'asfa'	: 'asfa',
				},
				'queueID'	: 'files-queue',
				'swf'      	: 'sn-project/uploadify/uploadify.swf',
				'uploader' 	: 'sn-project/uploadify/uploadify.php'
			});
	
		},
		switchToDark:function()
		{
			$("#balloon-content").removeClass("balloon-content-light").addClass("balloon-content-dark");
		},
		switchToLight:function()
		{
			$("#balloon-content").removeClass("balloon-content-dark").addClass("balloon-content-light");
		},
		linksTextMenu:function()
		{
			var oz=$(this);
			$(".text-links-menu").on("click",function(){
				oz.ozUploadAjax('sendRequest',{'action':'loadText','file':$(this).data('file')});
			});
		},
		switchTextMenu:function(options)
		{
			if (!options) { var options={}; }
			var def={
				'link':'main'
			};
			$.extend(def,options);
			$(".text-links-menu").removeClass("text-links-menu-active").addClass("text-links-menu-normal");
			$("#text-menu-"+def.link+"").removeClass("text-links-menu-normal").addClass("text-links-menu-active").blur();
		},		
		switchTabs:function(options)
		{
			if (!options) { var options={}; }
			var def={
				'link':'packets'
			};
			$.extend(def,options);			
			$(".balloon-top-link").removeClass("balloon-top-link-active").removeClass("balloon-top-link-hover").addClass("balloon-top-link-normal");
			$("#balloon-top-"+def.link+"").removeClass("balloon-top-link-normal").removeClass("balloon-top-link-hover").addClass("balloon-top-link-active").blur();
		},		
		switcherTabs:function()
		{
			$(".balloon-top-link").on("mouseover",function(){
				if (!$(this).hasClass("balloon-top-link-active")) {
					$(this).removeClass("balloon-top-link-normal");
					$(this).addClass("balloon-top-link-hover");
				}
			});
			$(".balloon-top-link").on("mouseleave",function(){
				if (!$(this).hasClass("balloon-top-link-active")) {
					$(this).removeClass("balloon-top-link-hover");
					$(this).addClass("balloon-top-link-normal");
				}
			});
		}
	};		

	$.fn.ozUploadTriggers=function(sn){
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
