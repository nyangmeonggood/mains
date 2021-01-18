const WEATHER_API = "defbb093a83d487f34319af52f03b297";
const COORDS = 'coords';
const weather = document.querySelector(".js_weather")

//js를 이용해서 어떻게 다른 사이트의 정보를 꺼내올까
//js는 웹사이트로 request를 보내 응답을 통해 데이터를 얻을 수 있는데
//가져온 데이터를 새로고침안해도 적용이 가능함. 안보이는데서 계속 데이터를 가져오는 중이라

function getWeather(lat, lng){
    //``를 사용하자
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(currentweather){
        const temp = Math.floor(currentweather.main.temp);
        const place = currentweather.name;
        weather.innerHTML = `${place}, ${temp}℃`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    }//JS에서 객체의 변수의 이름과 키의 이름을 같게 저장할 경우 이렇게 적으면 된다.

    saveCoords(coordsObj)
    getWeather(latitude,longitude)
}
function handleGeoError(){
    console.log("Failed")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init();