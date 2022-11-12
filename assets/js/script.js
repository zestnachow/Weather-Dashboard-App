// variable declarations
const submitButton = $("#submit-btn");
const APIKey = "63eb4bcc2085291b819482f284bc9b49";




// functions
function getCity() {
    let userInput = $("#user-input").val(); 
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey,
    }).then(function (res) {
        console.log(res);
    })
}


// event listeners

submitButton.on("click", function() {
    getCity()
})

