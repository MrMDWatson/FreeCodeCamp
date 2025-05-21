// Convert celsius to farenheit
function convertCtoF(celsius) {
    return celsius * 9/5;
}
//console.log(convertCtoF(30));

// Reverse a string
function reverseString(str) {
    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str[i];
    }
    return newStr;
}
//console.log(reverseString("Hello"));

// Factorialize a num
function factorialize(num) {
    let newNum = 1;
    for (let i = 1; i <= num; i++) {
        newNum *= i; 
    }
    return newNum;
}
//console.log(factorialize(5));

// Find the longest word in a string
function findLongestWordLength(str) {
    let words = str.split(" ");
    let longestWord = words[0];
    for (let i = 0; i < words.length; i++) {
        if (words[i].length >= longestWord.length) {
            longestWord = words[i];
        }
    }
    return longestWord.length;
}
//console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));

// Find the largest number in a group of arrays
function largestOfFour(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let highest = arr[i][0];
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] > highest) {
                highest = arr[i][j];
            }
        }
        newArr.push(highest);
    }
    return newArr;
}
//console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));

// Confirm string ends in
function confirmEnding(str, target) {
    return str.slice(str.length - target.length) === target;
}
//console.log(confirmEnding("Bastian", "ian"));

// Repeat string a number of times
function repeatStringNumTimes(str, num) {
    let newStr = "";
    for (let i = 0; i < num; i++) {
        newStr += str;
    }
    return newStr;
}
//console.log(repeatStringNumTimes("abc", 3));

// Truncate a string
function truncateString(str, num) {
    let newStr = "";
    if (str.length > num) {
        for (let i = 0; i < num; i++) {
            newStr += str[i];
        }
        newStr += "...";
    } else {
        newStr = str;
    }
    return newStr;
}
//console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8));

// Return first element in array to pass test
function findElement(arr, func) {
    let num;
    let newNum;
    for (let i = 0; i < arr.length; i++) {
        num = arr[i];
        if (func(num)) {
            newNum = arr[i];
            return newNum;
        }
    }
    return newNum;
}
//console.log(findElement([1, 2, 3, 4], num => num % 2 === 0));

// Check if value is bool
function booWho(bool) {
    return typeof bool === "boolean";
}
//console.log(booWho(null));

// Uppercase beginning letter
function titleCase(str) {
    let newArr = str.split(" ");
    let newStr = "";
    for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < newArr[i].length; j++) {
            if (j == 0) {
                if (i != 0) {
                    newStr += " ";
                }
                newStr += newArr[i][j].toUpperCase();
            } else {
                newStr += newArr[i][j].toLowerCase();
            }
        }
    }
    return newStr;
}
//console.log(titleCase("I'm a little tea pot"));

// Add one list to another in order, starting at
function frankenSplice(arr1, arr2, n) {
    let newArr = arr2.slice();
    for (let i = 0; i < arr1.length; i++) {
        newArr.splice(n + i, 0, arr1[i]);
    }
    return newArr;
}
//console.log(frankenSplice([1, 2, 3], [4, 5, 6], 1));

// Filter out false values
function bouncer(arr) {
    let neg = [false, null, 0, NaN, undefined, ""];
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
//console.log(bouncer([7, "ate", "", false, 9]));

// Where to index
function getIndexToIns(arr, num) {
    arr.sort((a, b) => (a - b));
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (num > arr[i]) {
            index++;
        } else {
            return `Index ${index}`;
        }
    }
    return index;
}
//console.log(getIndexToIns([40, 60], 50));

// check if letter match
function mutation(arr) {
    return arr[1]
        .toLowerCase()
        .split("")
        .every(letter => arr[0].toLowerCase().indexOf(letter) !== -1);
}
//console.log(mutation(["hello", "hey"]));

// Split array into groups
function chunkArrayInGroups(arr, size) {
    const newArr = [];
    let i = 0;
    while (i < arr.length) {
        newArr.push(arr.slice(i, i + size));
        i += size;
    }
    return newArr;
}
//console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));