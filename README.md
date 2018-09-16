# Levenshtein Distance string comparator

From Wikipedia:

> In information theory, linguistics and computer science, the Levenshtein distance is a string metric for measuring the difference between two sequences. Informally, the Levenshtein distance between two words is the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other.


You can read about this algorithm in the [Wikipedia page]('https://en.wikipedia.org/wiki/Levenshtein_distance')

The implementaion used in this little project, wich you can find in `main.js`, is the following:
```javascript
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
```