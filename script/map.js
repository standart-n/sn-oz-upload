
ymaps.ready(init);

function init(){
	
	ymaps.geocode('Чебоксары',{results:1}).then(function(res){
		var city=res.geoObjects.get(0);
		var crdCity=city.geometry.getCoordinates();
		//alert(crdCity);
    });

	
    var myMap=new ymaps.Map("map",{
		center:[56.135459,47.235484],
		zoom:6,
		behaviors:['default','scrollZoom'],
		type:null
    });
    
	var osmLayer = new ymaps.Layer('http://mt0.google.com/vt/lyrs=m@176000000&hl=ru&%c', {
        projection:ymaps.projection.sphericalMercator,
        tileTransparent: true
	});
	myMap.layers.add(osmLayer);
	
	var collection=new ymaps.GeoObjectCollection();


		
	$.ajax({
		url:'sn-project/settings/main.json',
		async:false,
		cache:false,
		dataType:"json",
		success:function(s){
			if (s.regions) {
				$.each(s.regions,function(){

				var rg={
						name:"city",
						hint:"Регион",
						coordinates:[55.755773,37.617761],
						radius:170000,
						icon:
						{
							iconImageHref:"sn-project/img/icon_moscow.png",
							iconImageSize:[99,37],
							iconImageOffset:[-50,-32]
						},
						circle:
						{
							fill:true,
							geodesic:true,
							opacity:0.2,
							stroke:true,
							strokeWidth:2
						},
						conf:
						{
							region:
							{
								caption:"",
								name:""
							},
							theme:
							{
								caption:"",
								name:""
							}
						}					
					};

				$.extend(true,rg,this);
				
				if (!rg.hidden) {
				
					var cityMark=new ymaps.Placemark(rg.coordinates,{
						hintContent:rg.hint
					},
						rg.icon
					);
					cityMark.events.add('click',function(e){
						$("#balloon").ozUpload(rg.conf);
					});
    
					var cityCircle = new ymaps.Circle([rg.coordinates,rg.radius],
					{
						hintContent:rg.hint
					},
						rg.circle
					);

					cityCircle.events.add('click',function(e){
						$("#balloon").ozUpload(rg.conf);
					});
					
					collection.add(cityMark);
					collection.add(cityCircle);
					
				}
					
				});
			}			
		}
	});
	
	myMap.geoObjects.add(collection);
    
    myMap.options.set('scrollZoomSpeed',1);
    myMap.controls.add('zoomControl').add('mapTools');
    
    myMap.setBounds(collection.getBounds());
	
}

