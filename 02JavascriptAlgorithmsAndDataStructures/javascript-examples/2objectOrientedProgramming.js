//Basic Javascript object
let dog = {
    name: "Spot",
    numLegs: 4,
    sayLegs: function() {return `This dog has ${this.numLegs} legs.`;}
};
console.log("Basic dog object");
console.log(dog.name);
console.log(dog.numLegs);
console.log(dog.sayLegs());

//Constructor function to create object
function Animal() {}
Animal.prototype.constructor = Animal;
Animal.prototype.describe = function() {
    return `My name is ${this.name}`;
};
Animal.prototype.getOwner = function() {
    let owner = "Matthew";
    return owner;
}


function Bird(name, color) { //Subtype Bird
    this.name = name;  //Bird props
    this.color = color;
};
Bird.prototype = Object.create(Animal.prototype); //Bird inherit Animal
Bird.prototype.constructor = Bird;  //Bird setting own prototype props
Bird.prototype.numLegs = 2;   

function Dog(name, color) {  //Subtype Dog
    this.name = name;  //Dog props - Props unique to this Dog
    this.color = color;;
}
Dog.prototype = Object.create(Animal.prototype);  //Dog inherit Animal props
Dog.prototype.constructor = Dog;   //Dog setting own prototype props - Props all dogs have
Dog.prototype.numLegs = 4;

function eatMixin(obj) {  //Mixed prop
    obj.eat = function() {
        return "nom nom nom";
    }
};
let motionModule = (function () { //Using IIFE
    return {
      runMixin: function(obj) {
        obj.run = function() {
          return "Running on grass";
        };
      },
      flyMixin: function(obj) {
        obj.fly = function() {
          return "Flying, wooosh!";
        };
      }
    }
  })();

function objectProperties(obj) {
  let ownProps = [];
  let prototypeProps = [];
  let properties = [];
  for (let property in whiteBird) {
    if(whiteBird.hasOwnProperty(property)) {
      ownProps.push(property);
    } else {
      prototypeProps.push(property);
    }
  };
  properties.push(ownProps);
  properties.push(prototypeProps);
  return properties;
}

let whiteBird = new Bird("Yo mom", "white");
let blackDog = new Dog("Yo dad", "black");
eatMixin(whiteBird);
eatMixin(blackDog);
motionModule.flyMixin(whiteBird);
motionModule.runMixin(blackDog);
let whiteBirdProperties = objectProperties(whiteBird);
let whiteBirdOwnProps = whiteBirdProperties[0];
let whiteBirdPrototypeProps = whiteBirdProperties[1];

console.log("");
console.log("Bird constructor")
console.log(whiteBird);
console.log(`Props: ${whiteBirdOwnProps}`);
console.log(`Prototypes: ${whiteBirdPrototypeProps}`);
console.log(`Name: ${whiteBird.name}`);
console.log(`Legs: ${whiteBird.numLegs}`);
console.log(whiteBird.eat());
console.log(whiteBird.describe());
console.log(blackDog.describe());
console.log(whiteBird.getOwner());
console.log(blackDog.getOwner());
console.log(whiteBird.fly());
console.log(blackDog.run());
console.log(whiteBird instanceof Bird);  //Checks if object was created by constructor
console.log(whiteBird.constructor === Bird);  //Check the constructor of an object
console.log(Bird.prototype.isPrototypeOf(whiteBird));
console.log(Object.prototype.isPrototypeOf(Bird.prototype));


function Person(birthname) {
    this.name = birthname;
}

class Soldier {
  constructor() {
    this.name = "chuck";
  }
  greeting = (age) => {
    console.log(age + ", my name is " + this.name);
  }
  flyAway = () => {
    console.log("woosh");
  }
}

class SuperHero extends Soldier {
  constructor(name, age) {
    super();
    this.age = age;
  }
}
let blp = new Person("Dave");
console.log(blp.name);

let gijoe = new Soldier();
let george = new SuperHero(43);
gijoe.age = 43;
console.log(gijoe.name, gijoe.age);
gijoe.greeting();
gijoe.name = "Bert";
console.log(gijoe.name);
gijoe.greeting();

gijoe.goodbye = () => {
  console.log("Say " + gijoe.name);
}
gijoe.name = "Earnie";
gijoe.goodbye();
gijoe.greeting("hey");
console.log(gijoe);
console.log(blp);
gijoe.flyAway();

console.log(george.age);
console.log(george.name);
george.greeting("hey");