import * as myFunc from "./script3.js";

console.log(myFunc.add(2, 3));
console.log(myFunc.subtract(10, 100));
console.log(myFunc.add(5, 4));
console.log(myFunc.name);
let line = myFunc.phrase;
console.log(line);
let search = /hoes/gi; // g - all matches,  i - any (upper, lower)case match
let search2 = /.oats/gi; // . random character
console.log(line.match(search));
console.log(line.match(search2));
console.log(search.test(line));
console.log(myFunc);