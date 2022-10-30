fetch("https://swapi.dev/api/species")
	.then((response) => response.json())
	.then((data) => console.log(data));


// OpenWeather API One Day Forecast call
var APIKey = "655f440e2edd3fdcfbfbcd81a9465bc3";
var units = "units=imperial&";
var lat = "lat=30.2672&";
var lon = "lon=-97.7431";
var queryURL= "https://api.openweathermap.org/data/2.5/weather?" + units + lat + lon + "&APPID=" + APIKey;
// About Me Button
var aboutButton = $("#about-btn");

// Fetch data from API, throws error if issue pulling data
fetch(queryURL)
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error("NETWORK RESPONSE ERROR");
		}
	})
	.then(data => {
		console.log(data);
		displayWeather(data)
	})

// Function to Display current weather in Austin
function displayWeather(data) {
	var weatherDiv = document.getElementById("weather");
	var currentTemp = data.main.temp;
	var currentHumidity = data.main.humidity;
	var weather = data.weather[0].description;
	var heading = document.createElement("h1");
	// Creates <h1> element with weather info
	$(heading).text(`${currentTemp}° ${currentHumidity}% Humidity ${weather}`);
	weatherDiv.appendChild(heading);

}

// Modals

// Display SW API results
