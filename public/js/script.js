const socket=io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{                   //position comes
        const{latitude,longitude}=position.coords;  //calculate coordinates from position
        socket.emit('send-location',{latitude,longitude}); //coordinate sent to the backend

    },(error)=>{     // if error comes , print error
        console.log("error");
    },
    {enableHighAccuracy:true,   //otherwise gives this features
        timeout:5000,   // after 5ms location refresh

        maximumAge:0, //no cashing

    }
);
}

const map=L.map("map").setView([0,0],10)  //leafletmap is a library . we r using leaflet so that this functions are valid because of lealfet
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Find your device"
}).addTo(map)    //tile layer is a special url for map.Tilelayer is added to map


// object marker create . Marker that shows the live location of device
const markers={};



socket.on("receive-location",(data)=>{
    const{id,latitude,longitude}=data;
    map.setView([latitude,longitude]);  //view set in map
    if(markers[id]){                  //if markers id present then show else show only lat and lang and addTo map
        markers[id].setLatLng([latitude,longitude]);
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }

});