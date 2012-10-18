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
		switchToDark:function()
		{
			$("#balloon-content").removeClass("balloon-content-light").addClass("balloon-content-dark");
		},
		switchToLight:function()
		{
			$("#balloon-content").removeClass("balloon-content-dark").addClass("balloon-content-light");
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
