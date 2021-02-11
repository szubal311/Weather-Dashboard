var searchBtn = $(".searchBtn")

var apiKey = "9456cfa0bbb7e0a925219b8372cea5db"

for (let i = 0; i < localStorage.length; i++) {
    
    var city = localStorage.getItem(i);

    var cityName = $(".groupData").addClass("listItem");
    
    cityName.append("<li>" + city + "</li>");
    
}

searchBtn.click(function () {

    var searchData = $(".searchData").val();

    
    var currentTempUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchData + "&Appid=" + apiKey + "&units=imperial";
    
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchData + "&Appid=" + apiKey + "&units=imperial";


    if (searchData == "") {
        console.log(searchData);
    } else {
        $.ajax({
            url: currentTempUrl,
            method: "GET"
        }).then(function (response) {
           
            var cityName = $(".groupData").addClass("listItem");
            cityName.append("<li>" + response.name + "</li>");
            
            var currentTempCard = $(".currentCard").append("<div>").addClass("card-body");
            currentTempCard.empty();
            var currentCityName = currentTempCard.append("<p>");
            
            currentTempCard.append(currentCityName);
            
            var timeInUTC = new Date(response.dt * 1000);
            currentCityName.append(response.name + " " + timeInUTC.toLocaleDateString("en-US"));
            currentCityName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            
            var tempCurrent = currentCityName.append("<p>");
            
            currentCityName.append(tempCurrent);
            tempCurrent.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            
            tempCurrent.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
             
            tempCurrent.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            tempCurrent
            
            var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
           
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {

                var uvCurrent = tempCurrent.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                uvCurrent.addClass("UV");
                tempCurrent.append(uvCurrent);
                
            });

        });
        
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function (response) {
            
            var day = [0, 8, 16, 24, 32];
            
            var fiveDayDiv = $(".forecastOneDay").addClass("card-text");
            fiveDayDiv.empty();
           
            day.forEach(function (i) {
                var timeFiveDay = new Date(response.list[i].dt * 1000);
                timeFiveDay = timeFiveDay.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=forecastColor>" + "<p>" + timeFiveDay + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});


