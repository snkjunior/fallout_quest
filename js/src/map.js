var Map = {
	defaultWidth: null,
	defaultHeight: null,
	currentZoom: 1,
	locations: [
		{id: 1, x: 3775, y: 2450, name:'Убежище 121'},
		{id: 2, x: 4310, y: 2380, name:'Лаборатория Гринкорп'},
		{id: 3, x: 3000, y: 1625, name:'Дамба Джейсона'},
	],
	
	init() {
		Map.defaultWidth = $('#mapImg').width();
		Map.defaultHeight = $('#mapImg').height();
		
		$('#mapImg').draggable({
			drag: function(e, ui) {			
				if (ui.position.left > 50) {
					ui.position.left = 50;
				}
				if (ui.position.top > 50) {
					ui.position.top = 50;						
				}					
				if (ui.position.left < -Map.getWidth() + $('#mapImg').parent().width() - 50) {
					ui.position.left = -Map.getWidth() + $('#mapImg').parent().width() - 50;
				}					
				if (ui.position.top < -Map.getHeight() + $('#mapImg').parent().height() - 50) {
					ui.position.top = -Map.getHeight() + $('#mapImg').parent().height() - 50;
				}	
				
				Map.redrawLocations();
			}
		});
		
		$('#mapImg').on('mousewheel', function(e, ui) {
			e.preventDefault(e);
			
			var mouse = {
				x: e.pageX,
				y: e.pageY
			}
							
			var isZoomIn = false;
			if (e.originalEvent.wheelDelta == 120) {
				isZoomIn = true;
			}
			
			var zoom = Map.currentZoom;
			
			if (isZoomIn) {
				zoom -= 0.5;
				if (zoom < 1) {
					zoom = 1;
				}
			} else {
				zoom += 0.5;
				if (zoom > 4) {
					zoom = 4;
				}
			}
			
			Map.setZoom(zoom);
		});
		
		Map.setZoom(4);		
		$('#mapImg').css('left', -$('#mapImg').width() / 2);
		$('#mapImg').css('top', -$('#mapImg').height() / 2);
	},
	
	show() {
		this.redrawLocations();
	},
		
	setZoom(zoom) {
		var diff = zoom / Map.currentZoom;			
		var cLeft = parseInt($('#mapImg').css('left'));
		var cTop = parseInt($('#mapImg').css('top'));
						
		Map.currentZoom = zoom;
		
		$('#mapImg').width(Map.defaultWidth / zoom);
		$('#mapImg').css('left', cLeft / diff + ($('#mapImg').parent().width() - $('#mapImg').parent().width() / diff) / 2);
		$('#mapImg').css('top', cTop / diff + ($('#mapImg').parent().height() - $('#mapImg').parent().height() / diff) / 2);
		
		$('#locations').width($('#mapImg').width());
		$('#locations').width($('#height').width());				

		Map.redrawLocations();
	},
	
	redrawLocations() {
		$('#locations').html('');
		var locationsHtml = '';
		for (var i = 0; i < Map.locations.length; i++) {
			locationsHtml += "<div style='cursor: pointer; border: 3px solid #002200; background-color: #006600; opacity: 0.8; position: absolute; width: "+(60 / Map.currentZoom)+"px; height: "+(60 / Map.currentZoom)+"px; border-radius: "+(30 / Map.currentZoom)+"px; left: "+(Map.locations[i].x / Map.currentZoom - 30 / Map.currentZoom + parseInt($('#mapImg').css('left')))+"px; top: "+(Map.locations[i].y / Map.currentZoom - 30 / Map.currentZoom + parseInt($('#mapImg').css('top')))+"px'></div>";
			locationsHtml += "<div style='cursor: pointer; text-align: center; position: absolute; width: 400px; font-size: "+(30 / Map.currentZoom)+"px; left: "+(Map.locations[i].x / Map.currentZoom - 200 + parseInt($('#mapImg').css('left')))+"px; top: "+(Map.locations[i].y / Map.currentZoom + 30 / Map.currentZoom + parseInt($('#mapImg').css('top')))+"px'>"+Map.locations[i].name+"</div>";
		}
		$('#locations').html(locationsHtml);	
	},
	
	getLocation(locationId) {
		var location = null;
		for (var i = 0; i < this.locations.length; i++) {
			if (this.locations[i].id == locationId) {
				return this.locations[i];
			}
		}
		return location;
	},
	
	getWidth() {
		return Map.defaultWidth / Map.currentZoom;
	},
	
	getHeight() {
		return Map.defaultHeight / Map.currentZoom;
	}	
};