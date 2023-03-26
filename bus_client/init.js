    
//Leaflet Initilization    
    const map = L.map('map').setView([44.63, -63.58], 14);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 16,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);



//Adding the NSCC metro area campuses as markers
    const marker_it = L.marker([44.66882719416163, -63.61297736096283]).addTo(map);
    const marker_ivany = L.marker([44.65474640243424, -63.55114384611795]).addTo(map);
    const marker_akerley = L.marker([44.683138774997325, -63.52662364409727]).addTo(map);
    
    marker_it.bindPopup("<b>NSCC IT Campus</b>")
    marker_ivany.bindPopup("<b>NSCC Ivany Campus</b>")
    marker_akerley.bindPopup("<b>NSCC Akerley Campus</b>")


//Add the generic bus icon
icon_rotatingbus = L.icon({
    iconUrl: `image.png`,
    iconSize: [32, 32],
 
 });

  


  

  
        

