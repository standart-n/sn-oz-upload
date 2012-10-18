(function($){

	var methods={
		init:function(options)
		{
			if (!options) { var options={}; }
			def={
				'region':'moscow',
				'content':{},
				'result':{}
			}
			$.extend(true,def,options);
			return this.each(function(){
				$(this).data('ozUpload',def);
				$(this).ozUploadConf();
				var sn=$(this).data('ozUpload');
				$(this).ozUploadEvents({'href':'#autoload'});
			});
		}
	};		

	$.fn.ozUpload=function(sn){
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
