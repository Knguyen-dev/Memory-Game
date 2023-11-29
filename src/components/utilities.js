/*
+ Module for utility functions.
*/

// Using Fisher-Yates or Knuff shuffle algorithm for shuffling cards
function shuffleArr(arr) {
	const shuffledArr = arr.slice();
	for (let i = shuffledArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = shuffledArr[i];
		shuffledArr[i] = shuffledArr[j];
		shuffledArr[j] = temp;
	}
	return shuffledArr;
}

// Deep copies an array
function deepCopyArr(arr) {
	return arr.map((obj) => ({ ...obj }));
}

// Returns a bad value for an http request, good for mocking an http request and behavior
async function badRequest() {
	throw new Error("Not fetching today");
}

export { shuffleArr, deepCopyArr, badRequest };
