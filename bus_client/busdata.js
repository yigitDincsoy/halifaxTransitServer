let routesAddedToList = false;
let arr_markers = [];
let arr_routemarkers = [];
let arr_additions = [];
let busdata = {};
let limitedObject = {};
let icon_dynamic;
let selectedBusId;

function deletePrevious() { //Deletes all previous dat

    for (let i = 0; i < arr_markers.length; i++) {
        map.removeLayer(arr_markers[i]);
    }

    for (let i = 0; i < arr_routemarkers.length; i++) {
        map.removeLayer(arr_routemarkers[i]);
    }

}

function createMarkers(busDataToCreate) { //Adds a marker on the map for each bus
    
    for (let i = 0; i < busDataToCreate.length; i++) {
        const currentX = Number(busDataToCreate[i].vehicle.position.latitude);
        const currentY = Number(busDataToCreate[i].vehicle.position.longitude);
       
        let rotation = 0;
            if (busDataToCreate[i].vehicle.position.bearing != undefined) {
                rotation = busDataToCreate[i].vehicle.position.bearing ;
            }

        let specificDirection = `Main Route` 
            if (busDataToCreate[i].vehicle.trip.directionId == 1) {
                specificDirection = `Secondary Route`
            }

    

        arr_markers[i] = L.marker([currentX, currentY], {icon: icon_rotatingbus, rotationAngle: rotation}).addTo(map).bindPopup(specificDirection);
     
        
    }


}

function busRender() { //Get JSON data & call other functions
    
    //Get the required JSON Data from NSCC API
    fetch('http://localhost:3000/')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        //Delete any leftover markers before starting
        deletePrevious();

        //Create a `limited object` that only includes the route ids
        limitedObject = json.entity.map(x =>({routeId: x.vehicle.trip.routeId}));
       
        const myData_id = document.getElementById("busoptions");
        const myData_value = myData_id.value;
        selectedBusId = myData_value;
        selectedBusData = json.entity.filter(x=>x.vehicle.trip.routeId === myData_value);
       
        createMarkers(selectedBusData);
        
        if (!routesAddedToList) {
        listRoutes(); }
    })

    setTimeout(busRender,2000);
}

function listRoutes() { //Dynamicially populates the selection list of buses
    routesAddedToList = true;
    const whatToAddArray = [];

    for (let i = 0; i < limitedObject.length; i++) {
        if (whatToAddArray.includes(limitedObject[i][`routeId`]) === false) 
        {
            whatToAddArray.push(limitedObject[i][`routeId`]);
        }
    }

    whatToAddArray.sort();
    
    for (let i = 0; i < whatToAddArray.length; i++) {
        const selectBox = document.getElementById('busoptions');
        const option = document.createElement('option');   
        let whatToAdd = whatToAddArray[i];
        option.value = whatToAdd;
        option.innerHTML = whatToAdd;
        selectBox.appendChild(option);  
    }




}


busRender();

