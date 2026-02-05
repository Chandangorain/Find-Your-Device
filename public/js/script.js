const socket=io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{                   //position comes
        const{latitude,logitude}=position.coords;  //calculate coordinates from position
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

L.map("map").setView([0,0],10)