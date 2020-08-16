const COORDS = "coords",
  weather = document.querySelector(".js-w");
API_KEY = "2a518571a0b628f6be5919c1c9678349";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
    `)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp,
        place = json.name;
      weather.innerText = `${temp}℃ at ${place}`;
    });
}
function saveCoords(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords));
}
function geoSuccess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude,
    coordsObj = {
      latitude,
      longitude,
    };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function geoError() {}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
