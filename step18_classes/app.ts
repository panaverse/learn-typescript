class Human {
    name: string;
    
    constructor(name: string){
        this.name = name;
    }
    
    eat(){
        console.log(this.name + " is a Human and is eating");
    }
}

class Animal {
    name: string;
    
    constructor(name: string){
        this.name = name;
    }
    
    eat(){
        console.log(this.name + " is a Animal and is eating");
    }
}

class Robot {
    name: string;
    
    constructor(name: string){
        this.name = name;
    }
    
}




let h: Human = new Human("Tom");
let a: Animal = new Animal("Goat");
let r: Robot = new Robot("R2-D2");
let r0: Robot = new Animal("Donkey");//how is this possible?

var isItRobot = r0 instanceof Robot;
console.log("Is Donkey a Robot: " + isItRobot);


/* TypeScript is a structural type system which is different from Java, C#, etc. When we compare two different types, regardless of where they came from, 
if the types of each member are compatible, then we say the types themselves are compatible. */
let h2 = h;
h = a;//both have same properties and methods therefore are compatible
h.eat();
let a2 = a;

let r2 = r;
r = a;//Animal has a name, Robot also has a name
//a = r2;//Error, Robot does not have eat property
