fetch("https://swapi.dev/api/species?page=1")
	.then((response) => response.json())
	.then((data) => console.log(data));

//Autocomplete widget for modal meds input
$("#drug_name").autocomplete({
	search: function (event, ui) {
		speciesArrays;
	},
});

// OpenWeather API One Day Forecast call
var APIKey = "655f440e2edd3fdcfbfbcd81a9465bc3";
var units = "units=imperial&";
var lat = "lat=30.2672&";
var lon = "lon=-97.7431";
var queryURL =
	"https://api.openweathermap.org/data/2.5/weather?" +
	units +
	lat +
	lon +
	"&APPID=" +
	APIKey;
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
	.then((data) => {
		console.log(data);
		displayWeather(data);
	});

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

getSpeciesArray();

let speciesArrays = [];

function getSpeciesArray() {
	const promises = [];
	for (let i = 1; i <= 4; i++) {
		const url = `https://swapi.dev/api/species?page=${i}`;

		const promise = fetch(url).then((response) => response.json());

		promises.push(promise); //find remainder
	}
	Promise.all(promises).then((speciesOverallArray) => {
		speciesArrays = speciesOverallArray
			.map((x) => x.results.map((x) => x.name))
			.flat();
		useMyVar(speciesArrays);
	});
}

function useMyVar(myParameter) {
	console.log(
		"🚀 ~ file: script.js ~ line 71 ~ callMyVar ~ myParameter",
		myParameter
	);
}

// .then((speciesIndividualArrays) =>

// console.log(speciesIndividualArrays));

// const arr1 = [0, 1, 2, [3, 4]];

// console.log(arr1.flat());
// // expected output: [0, 1, 2, 3, 4]

// const arr2 = [0, 1, 2, [[[3, 4]]]];

// console.log(arr2.flat(3));
// // expected output: [0, 1, 2, [3, 4]]git sstatu
