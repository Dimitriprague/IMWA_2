function initMap() {
	
	return new google.maps.Map($('#gmap')[0], {
		zoom: 15,
		center: {lat: 50.087544, lng: 14.420890},
		scrollwheel: false
	});
	
}

function initMarkers(map) {
	
	var markers = [];
	
	markers[0] = new google.maps.Marker({
		map: map,
		position: {lat: 50.078756, lng: 14.440135},
		animation: google.maps.Animation.DROP,
		title: 'Prague College'
	});
	

	
	return markers;
	
}


function initInfo(map, markers) {
	
	var html = [];
	
	html[0] = '<div>' +
		'<h2>Prague College</h2>' +
		'<p> THIS IS WHERE YOU ASK UBER TO TAKE YOU </p>' +
		'</div>';
	

	
	
	function addInfo(html, marker, map) {
		
		var iw = new google.maps.InfoWindow({
			content: html,
			maxWidth: 500
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			
			if(isInfoOpen(iw)) {
				iw.close();
			} else {
				closeAllInfo(info);
				iw.open(map, this);	
			}
			
		});
		
		return iw;
		
	}
	
	function isInfoOpen(iw) {
		var map = iw.getMap();
		return (map !== null && typeof map !== 'undefined');
	}
	
	var info = [];
	
	info[0] = addInfo(html[0], markers[0], map);
	info[1] = addInfo(html[1], markers[1], map);
	info[2] = addInfo(html[2], markers[2], map);
	info[3] = addInfo(html[3], markers[3], map);
	
	return info;
	
}


function closeAllInfo(info) {
	
	for(var i = 0; i < info.length; i++) {
		info[i].close();
	}
	
}

function openInfo(index, map, info, markers) { 
    
    info[index].open(map, markers[index]);
}


$(document).ready(function() {
	
	var map = initMap();
	var markers = initMarkers(map);
	var info = initInfo(map, markers);
    
    
    $('a[href="#gmap"]').click(function() {
      
    var id = $(this).data('map');
    
    closeAllInfo(info);
   openInfo(id, map, info, markers);                              
   });
	
	
	$('.smooth').smoothScroll({speed:800});
	
	$('header').parallax();
	
	
	$('.speakers').each(function() {
		
		new Waypoint.Inview({
			element: this,
			entered: function() {
				$(this.element).addClass('scaleup');
			},
			exited: function() {
				$(this.element).removeClass('scaleup');
			}
		});
		
	});
	
	
	
	$('section h1').each(function() {
		
		new Waypoint.Inview({
			element: this,
			entered: function() {
				$(this.element).addClass('center');
			},
			exited: function() {
				$(this.element).removeClass('center');
			}
		});
		
	});
	
	
	
	
	
	
	var lastTop = 0;
	
	$(window).scroll(function() {
		
		var top = $(this).scrollTop();
		
		if( Math.abs(lastTop - top) >= 5 ) {
			
			if(top > lastTop) {
				$('nav').css('top', '-' + $('nav').height() + 'px');
			} else {
				$('nav').css('top', 0);
			}

			lastTop = top;
		}
		
	});

	
	
});


