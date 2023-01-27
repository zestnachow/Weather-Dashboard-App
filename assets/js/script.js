// variable declarations
const submitButton = $("#submit-btn");
const clearButton = $("#clear-btn");
const APIKey = "63eb4bcc2085291b819482f284bc9b49";
const cityName = $("#city-name");
const currentTemp = $("#current-temp");
const currentHumidity = $("#current-humidity");
const currentWind = $("#current-wind");
const currentUv = $("#current-UV");
let previousSearches = JSON.parse(localStorage.getItem("search")) || [];


// retrieve current forecast for searched city
function getWeather(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial",
    }).then(function (res) {
        console.log(res);
        let currentDate = dayjs().format("M-D-YYYY");
        cityName.text(res.name + " " + "(" + currentDate + ")");
        $("#current-weather-favicon").attr("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png").attr("alt", res.weather[0].description);
        currentTemp.text("Current temperature: " + Math.round(res.main.temp) + "\u00B0F")
        currentWind.text("Current wind speed: " + Math.round(res.wind.speed) + " MPH");
        currentHumidity.text("Current humidity: " + res.main.humidity + "%");
        let lat = res.coord.lat;
        let lon = res.coord.lon;
        let UVquery = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        $.ajax({
            url: UVquery,
        }).then(function (res) {
            console.log(res);
            currentUv.text("Current UV Index (Scale: Low (green) · Moderate (yellow) · High (orange) · Very High (red) · Extreme (purple) : " + res[0].value);
            if (res[0].value <= 2.99) {
                currentUv.css("color", "green");
            } else if (res[0].value <= 5.99) {
                currentUv.css("color", "yellow");
            } else if (res[0].value <= 7.99) {
                currentUv.css("color", "orange");
            } else if (res[0].value <= 10.99) {
                currentUv.css("color", "red");
            } else {
                currentUv.css("color", "purple");
            }
        })
        getForecast(lat, lon);
    })
}

// retrieve five day forecast for searched city
function getForecast(lat, lon) {
    $.ajax({
        url:  "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial",
    }).then(function (res) {
        console.log(res);
        const forecastBoxes = $(".fiveday");
        for (let i = 0; i < forecastBoxes.length; i++) {
            const index = i * 8 + 4;
            $("#forecast-date-day-" + i).attr("class", "text-light").text(res.list[index].dt_txt);
            $("#forecast-icon-day-" + i).attr("src", "https://openweathermap.org/img/wn/" + res.list[index].weather[0].icon + "@2x.png").attr("alt", res.list[index].weather[0].description);
            $("#forecast-temp-day-" + i).attr("class", "text-light").text("Temperature: " + Math.round(res.list[index].main.temp) + "\u00B0F").css("display", "block");
            $("#forecast-wind-day-" + i).attr("class", "text-light").text("Wind speed: " + Math.round(res.list[index].wind.speed) + " MPH").css("display", "block");
            $("#forecast-humidity-day-" + i).attr("class", "text-light").text("Humidity: " + res.list[index].main.humidity + "%").css("display", "block");
        }
    })
}

// create new buttons based on user input
function previousSearchButtons(city) {
        const previousSearchButton = $("<button>").attr("type", "button").attr("class", "btn btn-primary mt-3 history-btn").text(city).click(function() {
            getWeather(previousSearchButton.text())
        });
        $("#city-search-form").append(previousSearchButton);
}

// search button event listener
submitButton.on("click", function(event) {
    event.preventDefault();
    let city = $("#user-input").val(); 
    getWeather(city);
    previousSearches.push(city);
    localStorage.setItem("search", JSON.stringify(previousSearches));
    previousSearchButtons(city);
})

// clear search history button event listener
clearButton.on("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("search");
    $(".history-btn").remove();
})

