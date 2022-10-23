fetch("https://swapi.dev/api/species")
	.then((response) => response.json())
	.then((data) => console.log(data));
