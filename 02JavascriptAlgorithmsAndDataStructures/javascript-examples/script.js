// Examples of Javascript

const userName = "Matthew";  //Cannot be overwritten or reassigned
let occupation = "Advisor";  //Cannot be overwritten but can be re assigned
var userAge = 33; //Can be easily overwritten

function getRemainder(num, num2) {  //How to check th remainder of a number with a function
    return num % num2;
}

function evenOrOdd(num) {  //How to check if a number is even or odd using remainder
    return num % 2 == 0 ? "Even" : "Odd";
}

let greeting = "What\'s up";  //The backslash allows for quotes without causing syntax errors
let message = "She said, \"Goodbye cruel world\".";  // Other escape sequences
                                                     // \n newline   \t tab    \r carriage return    \b word boundary    \f form feed

let contacts = {    //Objects and object munipulating
    Matthew: {
        id: "Matthew",
        number: 9546126590,
        greeting() {
          console.log("Hello bitch");
         }
    },
    Sonja: {
        id: "Sonja",
        number: 9545555555
    }
};

contacts["Matthew"]["note"] = "Matt Money";
console.log(contacts["Matthew"]);
delete contacts["Matthew"]["note"];
console.log(contacts["Matthew"]);

if (contacts["Matthew"].hasOwnProperty("note")) {
    console.log(contacts["Matthew"]["id"]);
} else {
    console.log("Nope");
}

//    function multiply(arr, n) {
//        let product = 1;
//        for (let i = 0; i < n; 1++) {
//            product *= arr[i];
//        }
//        return product;
//    }

let numbers = [1, 2, 3, 4, 5];

function multiply(arr, n) { // Recursion functions
    if (n <= 0) {
        return  1;
    } else {
        return multiply(arr, n - 1) * arr[n - 1];
    }
}

console.log(multiply(numbers, 4));

function sum(arr, n) {
    if (n <= 0) {
        return 0;
    } else {
        return sum(arr, n - 1) + arr[n - 1];
    }
}

console.log(sum(numbers, 4));

function subtract(arr, n) {
    if (n <= 0) {
        return 0;
    } else {
        return subtract(arr, n - 1) - arr[n - 1];
    }
}

console.log(subtract(numbers, 4));

let i = 1;
let numbers2 = [];
do {
    numbers2.push(i);
    i++;
} while (i <= 3);

console.log(numbers2);  // Do while loop

function countdown(n) {
    if (n < 1) {
      return [];
    } else {
      const countArray = countdown(n - 1);
      countArray.unshift(n);
      return countArray;
    }
}
console.log(countdown(3));  // Recursion call

function rangeNumbers(startNum, endNum) {
    let arrH = [];
    for (let i = startNum; i <= endNum; i++) {
        arrH.push(i);
    }
    return console.log(arrH);
}

rangeNumbers(5, 10);

function rangeOfNumbers(startNum, endNum) {
    if (endNum < startNum) {
        return [];
    } else {
        const arrG = rangeOfNumbers(startNum, endNum - 1);
        arrG.push(endNum);
        return arrG;
    }
}

console.log(rangeOfNumbers(10, 16));

Object.freeze(contacts); //Prevent object Mutation

const doubleIt = num => num * 2; //Arrow function

console.log(doubleIt(10));

let a = [1, 2, 3];
let b = [0, 3, 4];
console.log(a.concat(b)); // Add two items together

const triple = (num = 1) => num * 3;

console.log(triple());
console.log("Bye hoe");

const howMany = (...hoes) => hoes.length; // ...args use to condense values into an array
console.log(howMany(1, 2, 3, 4, 5, 6));

let these = [1, 2];
const bitch = (x, y) => x + y;
console.log(bitch(...these)); // ...these use to seperate arrays

const user = { alias: 'John Doe', age: 34, color: "white", grad: false };  // Class

const alias = user.alias;                // Destructuring above class
const age = user.age;

const { color, grad } = user;          //Another way to destructure class

console.log(alias, age, color, grad);

const sixes = [1, 2, 3, 4, 5, 6];     // Assign variables from arrays
const [e, f,, c] = sixes;
console.log(e, f, c);

const [s, t, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(s, t);
console.log(arr);

// const profileUpdate = (profileData) => {
//  const { name, age, nationality, location } = profileData;
//
//}

const profileUpdate = ({ name, age, nationality, location }) => {

}
let quoteSample = "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/ig; 
let result = quoteSample.match(vowelRegex); 
console.log(result);

let quoteSample2 = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z0-9]/gi;
let result2 = quoteSample2.match(alphabetRegex); 
console.log(result2);

let quoteSample3 = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex2 = /[^aeiou0-9]/gi;
let result3 = quoteSample3.match(alphabetRegex2);
console.log(result3);

console.log(userName.match(/^Matt/i)); // ^ Matches if in the beginning
console.log(userName.match(/hew$/i));// $ Matches if at the end
console.log(/\w+/.test(userName));
contacts["Matthew"].greeting();
console.log(contacts["Matthew"]["id"]);

let username2 = "JackOfAllTrades";
let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/gi; // \d all numbers  \D all non numbers
let result4 = userCheck.test(username2);           // * looks for 0 or more inputs

// \s checkd for whitespace
// \S checks for all non whitespace

let myString = "Franklin D. Roosevelt";
let myRegex = /^(Eleanor|Franklin)\s.*Roosevelt/; // Change this line
let answer = myString.match(myRegex); // Change this line
console.log(answer);// After passing the challenge experiment with myString and see how the grouping work

function filteredArray(arr, elem) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(elem) == -1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
}
console.log(filteredArray([[3, 2, 3], [1, 6, 4], [3, 13, 26], [19, 3, 9]], 3));

let countUp = 0;
for (let contact in contacts) {
    for (let info in contacts[contact]) {
        console.log(contacts[contact][info]);
        countUp++;
    }
}
console.log(countUp);
console.log(message);
console.log(words);