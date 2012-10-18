(function($){

	var methods={
		init:function(options)
		{
			return this.each(function(){

			});
		},
		loadContent:function(options)
		{
			if (!options) { var options={}; }
			var def={
				'content':''
			};
			$.extend(true,def,options);
			var sn=$(this).data('ozUpload');
			$.ajax({
				url:'index.php',
				async:false,
				cache:false,
				type:'GET',
				data:{
					action:'showContent',
					region:sn.region,
					content:def.content
				},
				dataType:'text',
				timeout:10000,
				success:function(s){
					sn.content.balloon=s;
					$(this).data('ozUpload',sn);
				},
				error:function(XMLHttpRequest,textStatus,error){ alert(error); }
			});
		},
		sendRequest:function(options)
		{
			if (!options) { var options={}; }
			var def={
				'action':'build',
				'content':''
			};
			$.extend(true,def,options);
			var sn=$(this).data('ozUpload');
			$.ajax({
				url:'index.php',
				async:false,
				cache:false,
				type:'GET',
				data:{
					action:def.action,
					region:sn.region,
					content:def.content
				},
				dataType:'json',
				timeout:10000,
				beforeSend:function(){
					$("#ajax-status").html('<img src="sn-project/img/loader.gif">').addClass("loading");
				},
				success:function(s){
					sn.result=s;
					$("#ajax-status").empty().removeClass("loading");
					if (sn.result.status) { $("#ajax-status").html(sn.result.status); }
					$(this).data('ozUpload',sn);
				},
				error:function(XMLHttpRequest,textStatus,error){ alert(error); }
			});
		}
	};

	$.fn.ozUploadAjax=function(sn){
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
