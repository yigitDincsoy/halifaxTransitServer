    
//Leaflet Initilization    
    const map = L.map('map').setView([44.63, -63.58], 14);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 16,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);



//Add the generic bus icon
icon_rotatingbus = L.icon({
    iconUrl: `image.png`,
    iconSize: [32, 32],
 
 });

  


  

  
        

