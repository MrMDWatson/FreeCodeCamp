//Sum of all numbers in a range
function sumAll(arr) {
  let newArr = arr
    .slice()
    .sort((a, b) => a - b);
  let min = newArr[0];
  let max = newArr[newArr.length - 1];
  let sumBetween = 0;
  for (let i = min; i <= max; i++) {
    sumBetween += i;
  }
  return sumBetween;
}
//console.log(sumAll([1, 4]));

//Finds the different element in two arrays
function diffArray(arr1, arr2) {
  function checkUnmatched(x, y) {
    const newArr = [];
    for (let i = 0; i < y.length; i++) {
      if (!(x.indexOf(y[i]) > -1)) {
        newArr.push(y[i]);
      }
    }
    return newArr;
  } 
  return [...checkUnmatched(arr1, arr2), ...checkUnmatched(arr2, arr1)];
}
//console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));

//Seek and destroy
function destroyer(...arg) {
  let newArr = arg[0].slice();
  for (let i = 1; i < arg.length; i++) {
    newArr = newArr.filter(x => x !== (arg[i]));
  }
  return newArr;
}
//console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));

//Wherefore art thou 
function whatIsInAName(collection, source) {
  const arr = [];
  for (let i = 0; i < collection.length; i++) {
    let found = true;
    for (const sourceProp in source) {
      if (collection[i][sourceProp] !== source[sourceProp]) {
        found = false;
        break;
      }
    }
    if (found) arr.push(collection[i]);
  }
  return arr;
}
//console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));

//Spinal tap case
function spinalCase(str) {
  let newStr = str
    .replace(/([a-z])([A-Z])/, '$1 $2')
    .replace(/\s/g, "-")
    .toLowerCase();
  return newStr;
}
//console.log(spinalCase("AllThe-small Things"))
 
//Pig latin
function translatePigLatin(str) {
  let newStr = str.slice();
  if (/^[aeiou]/i.test(str)) {
    newStr += "way";
  } else if (/[aeiou]+/gi.test(str)) {
    let consonant = str.match(/^[^aeiou]*/gi);
    newStr = str.match(/[aeiou]+\w+$/i);
    newStr += consonant + "ay";
  } else {
    newStr += "ay";
  }
  return newStr;
}
//console.log(translatePigLatin("eight"));

//Search and replace
function myReplace(str, before, after) {
  let sentence = "";
  let newStr;
  let newArr = str.split(" ");
  let replace = newArr.indexOf(before);
  if (/[A-Z]/.test(before)) {
    newStr = after[0].toUpperCase() + after.slice(1);
  } else if (/[a-z]/.test(before)) {
    newStr = after[0].toLowerCase() + after.slice(1);
  }
  newArr.splice(replace, 1, newStr);
  for (let i = 0; i < newArr.length; i++) {
    if (sentence.length < 1) {
      sentence += newArr[i];
    } else {
      sentence += ` ${newArr[i]}`;
    }
  }
  return sentence;
}
//console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));

//DNA Pairing
function pairElement(str) {
  let strList = str.split("");
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (strList[i] === "A") {
      arr.push([strList[i], "T"]);
    } else if (strList[i] === "T") {
      arr.push([strList[i], "A"]);
    } else if (strList[i] === "G") {
      arr.push([strList[i], "C"]);
    } else if (strList[i] === "C") {
      arr.push([strList[i], "G"]);
    } else {
      console.log("invalid");
    }
  }
  return arr;
}
//console.log(pairElement("GCG"));

//Missing letter
function fearNotLetter(str) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let section = alphabet
    .split("")
    .filter(letter => alphabet.indexOf(letter) >= alphabet.indexOf(str[0]) && alphabet.indexOf(letter) <= alphabet.indexOf(str[str.length - 1]));
  let newStr = section.filter(x => str.indexOf(x) < 0)[0];
  return newStr;
}
//console.log(fearNotLetter("abce"));

//Sorted union
function uniteUnique(...arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (newArr.indexOf(arr[i][j]) < 0) {
        newArr.push(arr[i][j]);
      }
    }
  }
  return newArr;
}
//console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));

//Convert HTML entities
function convertHTML(str) {
  let newStr = "";
  let characters = str.split("");
  let search = ["&", "<", ">", "\"", "'"];
  let sub = ["&amp;", "&lt;", "&gt;", "&quot;", "&apos;"]
  for (let i = 0; i < characters.length; i++) {
    for (let j = 0; j < search.length; j++) {
      if (search[j] === characters[i]) {
        characters[i] = sub[j];
      }
    }
  }
  characters.map(x => newStr += x);
  return newStr;
}
//console.log(convertHTML("Dolce & Gabbana"));

//Sum all odd Fibonacci numbers
function sumFibs(num) {
  let numbers = [0, 1];
  for (let i = 0; i < num; i++) {
    numbers.push(numbers[i] + numbers[i + 1]);
  }
  let newNum = numbers
    .filter(x => x % 2 === 1 && x <= num)
    .reduce((y, z) => y + z);
  return newNum;
}
//console.log(sumFibs(3));

//Sum all primes
function sumPrimes(num) {
  let primes = [];
  for (let i = 0; i <= num; i++) {
    let checkList = [];
    for (let j = 0; j <= i; j++) {
      if (i % j === 0) {
        checkList.push(i);
      }
    }
    if (checkList.length === 2) {
      primes.push(i);
    }
  }
  let sum = primes.reduce((x, y) => x + y);
  return sum;
}
//console.log(sumPrimes(5));

//Smallest common multiple
function smallestCommons(arr) {
  const newArr = arr
    .map(x => x)
    .sort((a, b) => a - b);
  let found = false;
  let smallest;
  for (let i = newArr[0]; found !== true; i += newArr[0]) {
    smallest = Math.round(i * newArr[1]);
    let range = [];
    for (let j = newArr[0] + 1; j < newArr[1]; j++) {
      range.push(j);
    }
    if (range.every(x => (smallest % x === 0))) {
      found = true;
    }
  }
  return smallest;
}
//console.log(smallestCommons([1, 5]));

//Drop it
function dropElements(arr, func) {
  let newArr = arr.slice();
  for (let n = 0; n < arr.length; n++) {
    if (func(n)) {
      return newArr;
    } else {
      newArr.shift();
    }
  }
  return newArr;
}
//console.log(dropElements([1, 2, 3], function(n) {return n > 3;}));

//Steamroller
function steamrollArray(arr) {
  let tempArr = arr.slice();
  let newArr = [];

  for (let i = 0; i < tempArr.length; i++) {
    if (Array.isArray(tempArr[i])) {
      for (let j = 0; j < tempArr[i].length; j++) {
        tempArr.push(tempArr[i][j]);
      }
    } else {
      newArr.push(tempArr[i]);
    }
  }
  return newArr;
}
//console.log(steamrollArray([1, [2], [3, [[4]]]]));

//Binary Agents
function binaryAgent(str) {
  let biString = str.split(" ");
  let uniString = [];
  for (let i = 0; i < biString.length; i++) {
    uniString.push(String.fromCharCode(parseInt(biString[i], 2)));
  }
  return uniString.join("");
}
//console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));

//Everything be true
function truthCheck(collection, pre) {
  return collection.every(x => (x[pre]));
}
//console.log(truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot"));

//Arguments optional
function addTogether() {
  const [first, second] = arguments;

  if (typeof (first) === "number") {
    if (typeof (second) === "number") return first + second;
    if (arguments.length === 1) return (second) => addTogether(first, second);
  }
}
//console.log(addTogether(2,3));

//Make a person
const Person = function(firstAndLast) {
  let fullName = firstAndLast;

  this.getFirstName = function() {
    return fullName.split(" ")[0];
  };

  this.getLastName = function() {
    return fullName.split(" ")[1];
  };

  this.getFullName = function() {
    return fullName;
  };

  this.setFirstName = function(name) {
    fullName = name + " " + fullName.split(" ")[1];
  };

  this.setLastName = function(name) {
    fullName = fullName.split(" ")[0] + " " + name;
  };

  this.setFullName = function(name) {
    fullName = name;
  };
};

const bob = new Person("Bob Ross");
//console.log(bob.getFullName());


//Map the debris
function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  return "Solve me...";
}
//console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));