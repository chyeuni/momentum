const weather = document.querySelector(".js-weather");

const API_KEY="d60ae29b643038c319cf58455343c9e6";
const COORDS ="coords";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return (response.json());
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText=`${temperature} @ ${place}`;
        console.log(temperature);
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = (position.coords.latitude);
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude:latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoFail(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();