
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
				$('.balloon-content-kirov').html(s);
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
		center:[56.324117,44.002672],
		zoom:6,
		behaviors:['default','scrollZoom'],
		type:null
    });
    
    //http://mt0.google.com/vt/lyrs=m@176000000&hl=ru&%c
    //http://otile%d.mqcdn.com/tiles/1.0.0/osm/%z/%x/%y.png
	var osmLayer = new ymaps.Layer('http://mt0.google.com/vt/lyrs=m@176000000&hl=ru&%c', {
        projection:ymaps.projection.sphericalMercator,
        tileTransparent: true
	});
	myMap.layers.add(osmLayer);

	cityKirovMark=new ymaps.Placemark([58.581576,49.662283],{
		hintContent:'Кировский регион',
		balloonContentHeader:'Кировский регион',
		balloonContentBody:'<div class="balloon-content-kirov">*</div>'
	},{
		balloonMinWidth:300,
		balloonMinHeight:200,
		preset:'twirl#lightblueDotIcon'
	});

	cityKirovMark.events.add('balloonopen',function(e){
		getBalloonContent();
    });
    
    cityKirovCircle = new ymaps.Circle([
		[58.581576,49.662283],
		100000
	],
	{
		hintContent:"Кировский регион",
		balloonContentHeader:'Кировский регион',
		balloonContentBody:'<div class="balloon-content-kirov">*</div>'
	
	},
	{	
		fill:true,
		geodesic:true,
		opacity:0.3,
		stroke:true,
		strokeWidth:2,
		balloonMinWidth:300,
		balloonMinHeight:200
	
	});

	cityKirovCircle.events.add('balloonopen',function(e){
		getBalloonContent();
    });
    

	myMap.geoObjects.add(cityKirovMark);
	myMap.geoObjects.add(cityKirovCircle);
    

    myMap.options.set('scrollZoomSpeed',1);
    myMap.controls.add('zoomControl').add('typeSelector').add('mapTools');

	// kirov 58.581576,49.662283
	// nijniy novgorod 56.324117,44.002672
	// moscow 55.755773,37.617761

	/*
	function init () {
            var myMap = new ymaps.Map('map', {
                    center:[-19.69445, 127.505887],
                    zoom:3,
                    type: 'yandex#hybrid'
                }),
            
                // Создаем метку с изображением коалы
                myPlacemark = new ymaps.Placemark([-19.76, 127.505887], {
                    // Контент балуна
                    balloonContent: '<div style = "margin-top: 30px; margin-left: 20px;" ><b>Я живу тут!</b></div>'
                }, {
                    // Не скрывать иконку метки при открытии балуна
                    hideIconOnBalloonOpen: false,
                    // Изображение иконки метки
                    iconImageHref: 'http://www.ohranatruda.ru:8080/upload/resize_cache/main/746/150_150_1/koala1.jpg',
                    // Размеры изображения иконки
                    iconImageSize: [70, 80],
                    // Размеры содержимого балуна
                    balloonContentSize: [100, 100],
                    // Задаем макет балуна - пользовательская картинка с контентом
                    balloonLayout: "default#imageWithContent",
                    // Картинка балуна
                    balloonImageHref: '/maps/doc/jsapi/2.x/examples/images/thoughts.gif',
                    // Смещение картинки балуна
                    balloonImageOffset: [70, -130],
                    // Размеры картинки балуна
                    balloonImageSize: [120, 100],
                    // Балун не имеет тени
                    balloonShadow: false
                });

            // Добавляем метку на карту
            myMap.geoObjects.add(myPlacemark);
            myPlacemark.balloon.open();
	}
	*/
	
	
}
