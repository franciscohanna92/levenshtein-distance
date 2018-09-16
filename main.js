var stringInputRef = document.getElementById("string-input");
var bestMatchRef = document.getElementById("best-match");
var tableRef = document.getElementById("data-table").getElementsByTagName('tbody')[0];

let data = [
	{ string: 'referral', levenshteinDistance: '-' },
	{ string: 'civilization', levenshteinDistance: '-' },
	{ string: 'continuation', levenshteinDistance: '-' },
	{ string: 'hypertext', levenshteinDistance: '-' },
	{ string: 'clarify', levenshteinDistance: '-' },
	{ string: 'reception', levenshteinDistance: '-' },
	{ string: 'implication', levenshteinDistance: '-' },
	{ string: 'ghostwriter', levenshteinDistance: '-' },
	{ string: 'brainstorm', levenshteinDistance: '-' },
	{ string: 'offend', levenshteinDistance: '-' },
	{ string: 'feminist', levenshteinDistance: '-' },
	{ string: 'logarithm', levenshteinDistance: '-' },
	{ string: 'ancestor', levenshteinDistance: '-' },
];

populateTable(data);

/**
 * Populates the table with some data
 * @param {array} data Data to populate table
 */
function populateTable(data) {
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		addRow(tableRef, i, element.string, element.levenshteinDistance);
	}
}

/**
 * Appends a new row to the table	
 * @param {object} tableRef The table to append the row to
 * @param {number} rowIndex The index where the new row will be appended
 * @param {string} stringText The text for the first cell of the new row
 * @param {string} levDistanceText The text for the second cell of the new row
 */
function addRow(tableRef, rowIndex, stringText, levDistanceText) {
	let newRow = tableRef.insertRow(rowIndex);
	newRow
	newRow
		.insertCell(0)
		.appendChild(document.createTextNode(stringText))

	newRow
		.insertCell(1)
		.appendChild(document.createTextNode(levDistanceText))
}

/**
 * Compares the input string with every element in the data array using the Levenshtein Distance algorithm
 */
function compareStrings() {
	clearTable(tableRef);
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		if (stringInputRef.value != "") {
			data[i].levenshteinDistance = levenshtein(stringInputRef.value, element.string);
		} else {
			data[i].levenshteinDistance = '-';
		}
	}
	populateTable(data);
	getBestMatch(data);
}

/**
 * Shows the string with the lowest Lev. Distance to the input string
 * @param {array} data The array to get the lowes lev. distance from
 */
function getBestMatch(data) {
	bestMatch = data[0];
	for (let i = 1; i < data.length; i++) {
		const element = data[i];
		if(element.levenshteinDistance <= bestMatch.levenshteinDistance) {
			bestMatch = element
		}
	}
	if (stringInputRef.value != "") {
		bestMatchRef.innerHTML = `Best match: <i class="text-success">${bestMatch.string}</i>`;
	}	else {
		bestMatchRef.innerText = "";
	}
}

/**
 * Removes all the data from the table
 * @param {object} tableRef The table to be cleared
 */
function clearTable(tableRef) {
	while (tableRef.firstChild) {
		tableRef.removeChild(tableRef.firstChild);
	}
}

/**
 * Adds a word to the list
 */
function addString() {
	newString = prompt("Type the new string to add to the data", "");
	if(newString) {
		data.unshift({
			string: newString ? newString : "",
			levenshteinDistance: "-"
		});
		compareStrings()
	}
}

/**
 * Compares two strings with the matrix variant of the Levenshtein Distance algorithm
 * @param {string} string1 First string for comparisson
 * @param {string} string2 Second string for comparisson
 * @return {number} The Lev. Distance between string1 and string2
 */
function levenshtein(string1, string2) {
	var length1 = string1.length;
	var length2 = string2.length;
	var matrix = [];
	var cost = 0;
	var a = 0;

	if (length1 == 0) {
		return length2;
	}

	if (length2 == 0) {
		return length1;
	}

	var matrix = new ArrayBuffer((length1 + 1) * (length2 + 1));
	a = length1 + 1;

	// Populate matrix with initial data
	for (var i = 0; i <= length1; matrix[i] = i++);
	for (var j = 0; j <= length2; matrix[j * a] = j++);

	for (var i = 1; i <= length1; i++) {
		for (var j = 1; j <= length2; j++) {
			if (string1[i - 1] == string2[j - 1])
				cost = 0;
			else
				cost = 2; // The cost is two if a substitution is nedeed
			var r = matrix[j * a + i - 1] + 1;
			var s = matrix[(j - 1) * a + i] + 1;
			var t = matrix[(j - 1) * a + i - 1] + cost;

			matrix[j * a + i] = Math.min(Math.min(r, s), t);
		}
	}

	return (matrix[length2 * a + length1]);
}