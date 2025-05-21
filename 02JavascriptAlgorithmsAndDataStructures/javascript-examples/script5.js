let greeting = "Hello";
let sendOff = "Have a great trip";
let name = "Matthew";
let lastName = "Watson";
let phrase = "Boats & Hoes";
let topGenres = "Comedy, Comedy and Comedy";
let yearBorn = 1990;
let currentYear = 2023;
let age = currentYear - yearBorn;
let online = true;
let version = 1.0;

console.log(age);

function displayProfile(x, y, z) {
    console.log(`${x} ${y}, ${z}`);
}

function hello() {
    console.log("Hello this my score");
}

function displayStats() {
    hello();
    displayProfile(greeting, name, phrase);
}

displayStats();