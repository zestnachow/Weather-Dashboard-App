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
        getForecast(cityId);
    })
}

function getForecast(cityId) {
    $.ajax({
        url:  "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + APIKey + "&units=imperial",
    }).then(function (res) {
        console.log(res);
    })
}

function convertTemp(K) {
    return ((K-273.15)*9)/5 + 32;
}


// event listeners

submitButton.on("click", function(event) {
    event.preventDefault();
    getWeather();
})

