// variable declarations
const submitButton = $("#submit-btn");
const APIKey = "63eb4bcc2085291b819482f284bc9b49";


// functions
function getWeather() {
    let userInput = $("#user-input").val(); 
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey + "&units=imperial",
    }).then(function (res) {
        console.log(res);
        let lat = res.coord.lat;
        console.log(lat);
        let lon = res.coord.lon;
        console.log(lon);
        let cityId = res.id;
        console.log(cityId);
        getForecast(lat, lon);
    })
}

function getForecast(lat, lon) {
    $.ajax({
        url:  "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial",
    }).then(function (res) {
        console.log(res);
    })
}




// event listeners

submitButton.on("click", function(event) {
    event.preventDefault();
    getWeather();
})

