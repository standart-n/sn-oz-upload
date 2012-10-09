
ymaps.ready(init);

function init(){
	
	function makePacket(){
		$.ajax({
			url:'index.php',
			cache:false,
			type:'GET',
			data:{
				action:'make',
				region:'kirov'
			},
			dataType:'text',
			timeout:10000,
			success:function(s){
				alert(s);
			},
			error:function(XMLHttpRequest,textStatus,error){ alert(error); }
		});
	}

	function getBalloonContent(){
		$.ajax({
			url:'sn-project/templates/maps/balloon.tpl',
			cache:false,
			type:'GET',
			data:{
			},
			dataType:'text',
			timeout:10000,
			success:function(s){
				$('#balloon-content-kirov').html(s);
				$('.kirov-button-make').on("click",function(){ makePacket(); });
			},
			error:function(XMLHttpRequest,textStatus,error){ alert(error); }
		});
	}

	  
	ymaps.geocode('Москва',{results:1}).then(function(res){
		var city=res.geoObjects.get(0);
		var crdCity=city.geometry.getCoordinates();
		//alert(crdCity);
    });

	
    var myMap=new ymaps.Map("map",{
		center:[55.755773,37.617761],
		zoom:5,
		behaviors:['default','scrollZoom']
    });
    

	cityKirov=new ymaps.Placemark([58.581576,49.662283],{
		hintContent:'Кировский регион',
		balloonContentHeader:'Кировский регион',
		balloonContentBody:'<div id="balloon-content-kirov">*</div>'
	},{
		balloonMinWidth:300,
		balloonMinHeight:200,
		preset:'twirl#lightblueDotIcon'
	});

	cityKirov.events.add('balloonopen',function(e){
		getBalloonContent();
    });
    

	myMap.geoObjects.add(cityKirov);
    

    myMap.options.set('scrollZoomSpeed',1);
    myMap.controls.add('zoomControl').add('typeSelector').add('mapTools');

	// kirov 58.581576,49.662283
	// nijniy novgorod 56.324117,44.002672
	// moscow 55.755773,37.617761
	
	
}
