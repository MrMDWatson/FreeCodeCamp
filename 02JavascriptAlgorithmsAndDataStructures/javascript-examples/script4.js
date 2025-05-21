class Person {
    constructor(name) {
        this.type = "Human";
        this.name = name;
        this.occupation = "Unemployed";
    }

    introduction() {
        console.log(`Hello, my name is ${this.name}`);
    }

    work() {
        if (this.occupation === "Unemployed") {
            console.log(`Looking for job`)
        } else {
            console.log(this.occupation);
        }
    }
    
}

class Soldier extends Person {
    constructor(name) {
        super(name);
        this.occupation = "Guarding the castle";
    }
    introduction() {
        console.log(`Hello, I am Private ${this.name}`);
    }

}

let matthew = new Person("Matthew");

let george = new Soldier("George");

matthew.introduction();
matthew.work();
george.introduction();
george.work();