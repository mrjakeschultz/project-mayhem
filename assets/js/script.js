fetch("https://swapi.dev/api/species?page=1")
	.then((response) => response.json())
	.then((data) => console.log(data));

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

console.log(
	"🚀 ~ file: script.js ~ line 6 ~ speciesArrays | testing calling species array",
	speciesArrays
);

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function (e) {
		var a,
			b,
			i,
			val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function (e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) {
			//up
			/*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

//function to run the autocomplete above
autocomplete(document.getElementById("myInput"), speciesArrays);
