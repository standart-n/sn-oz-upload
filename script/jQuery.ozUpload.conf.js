(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){
				$(this).ozUploadConf('main');
			});
		},
		main:function()
		{
			var sn=$(this).data('ozUpload');
			$.ajax({
				url:'settings/main.json',
				async:false,
				dataType:"json",
				success:function(s){
					$.extend(sn,s);
					$(this).data('ozUpload',sn);
				}
			});
		}
	};

	$.fn.ozUploadConf=function(sn){
		if (!sn) { var sn={}; }
		if (methods[sn]) {
			return methods[sn].apply(this,Array.prototype.slice.call(arguments,1));
		} else if (typeof sn==='object' || !sn) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Метод '+sn+' не существует');
		}    
		
	};		
})(jQuery);
