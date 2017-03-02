$(document).ready(function () {
  var tempFahrenheit;
  var formatFahrenheit = true;
  // Locate User
  $.ajax({
    url: "http://ip-api.com/json",
    success: function(userData) {
      // Send info to front end
      $("#info").text(userData.city + ", " +userData.region + ', '+ userData.countryCode);
      
      // Pull up weather data from user's zip code
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + userData.zip + "," + userData.countryCode + "&units=imperial&APPID=8a365a59ba22d4185c2679c3f54fc0c8",
        success: function(data) {
          // Set temperature
          tempFahrenheit = data.main.temp;
          $("#temp").html(tempFahrenheit);
          
          // set weather conditions
          $("#weather").text(data.weather[0].main);
          var weatherIcon;
          var weatherID = Number(String(data.weather[0].id).charAt(0)); 
          
          switch (weatherID) {
            case 2:
              weatherIcon = "wi-thunderstorm";
              break;
            case 3:
              weatherIcon = "wi-sprinkle";
              break;
            case 5:
              weatherIcon = "wi-showers";
              break;
            case 6:
              weatherIcon = "wi-snow";
              break;
            case 7:
            case 8:
              weatherIcon = "wi-cloudy";
              break;
            case 9:
              weatherIcon = "wi-tsunami";
              break;
            default:
              weatherIcon = "wi-day-sunny";
                                           }
          $("#weather-icon").addClass("wi " + weatherIcon);
        },
      cache: false
      })
    }
  })
  $("#temp-format").click(function () {
    if (formatFahrenheit) { // If the temp format is currently F, change to C
      $("#temp").html(((tempFahrenheit-32) * 0.555).toFixed(2));
      $("#temp-format").html(" &#8451;");
      formatFahrenheit = false;
    } else { 
      $("#temp").html(tempFahrenheit);
      $("#temp-format").html(" &#8457;");
      formatFahrenheit = true;
    }
  })
})