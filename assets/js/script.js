fetch("https://swapi.dev/api/species?page=1")
	.then((response) => response.json())
	.then((data) => console.log(data));

const promises = [];

getSpeciesArray();

function getSpeciesArray() {
	for (let i = 1; i <= 4; i++) {
		const url = `https://swapi.dev/api/species?page=${i}`;

		const promise = fetch(url).then((response) => response.json());

		promises.push(promise); //find remainder
	}
	Promise.all(promises)
		.then((speciesOverallArray) => speciesOverallArray.map((x) => x.results))
		.then((speciesIndividualArrays) => console.log(speciesIndividualArrays));
}

// const arr1 = [0, 1, 2, [3, 4]];

// console.log(arr1.flat());
// // expected output: [0, 1, 2, 3, 4]

// const arr2 = [0, 1, 2, [[[3, 4]]]];

// console.log(arr2.flat(3));
// // expected output: [0, 1, 2, [3, 4]]
