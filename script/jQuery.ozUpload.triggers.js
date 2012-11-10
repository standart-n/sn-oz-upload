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
			var sn=$(this).data('ozUpload');
			var oz=$(this);
			$('#file_upload').uploadify({
				'formData':
				{
					'region' : sn.region.name,
					'theme' : sn.theme.name,
					'token' : sn.result.token
				},
				'buttonText' : 'Выбрать файлы',
				'buttonClass' : 'uploadify-button',
				'queueID' : 'files-queue',
				'swf' : 'sn-project/uploadify/uploadify.swf',
				'uploader' :'index.php',
				'onUploadComplete' : function(file) {
					oz.ozUploadAjax('sendRequest',{'action':'readFolder','folder':sn.result.upload,'debug':false});
				} 
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
		linksFilesMenu:function()
		{
			var oz=$(this);
			$(".files-links-menu").on("click",function(){
				oz.ozUploadAjax('sendRequest',{'action':'readFolder','folder':$(this).data('folder')});
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
		switchFilesMenu:function(options)
		{
			if (!options) { var options={}; }
			var def={
				'link':'main'
			};
			$.extend(def,options);
			$(".files-links-menu").removeClass("files-links-menu-active").addClass("files-links-menu-normal");
			$("#files-menu-"+def.link+"").removeClass("files-links-menu-normal").addClass("files-links-menu-active").blur();
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
		},
		replaceTools:function()
		{
			var sn=$(this).data('ozUpload');
			$(".text-tools-input input").on("focus",function(){
				$(this).select();
			});
			$("#text-link-replace").on("click",function(){
				var text=$("#text-area").val();
				var t_find=new RegExp($("#text-tools-find-input input").val(),"gi")
				var t_replace=$("#text-tools-replace-input input").val();
				text=text.replace(t_find,t_replace);
				$("#text-area").val(text);
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
