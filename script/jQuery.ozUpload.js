(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
				$(this).data('ozUpload',{});
				$(this).ozUploadConf();
				var sn=$(this).data('ozUpload');
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
