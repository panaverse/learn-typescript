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

class WildAnimal {
    title: string;
    
    constructor(title: string){
        this.title = title;
    }
    
    eat(){
        console.log(this.title + " is a Wild Animal and is eating");
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


/* TypeScript is a structural type system which is different from 
Java, C#, etc. When we compare two different types, 
regardless of where they came from, if the types of each member 
are compatible, then we say the types themselves are compatible. */
let h2 = h;
h = a;//both have same properties and methods therefore are compatible
h.eat();

let r2 = r;
r = a;//Animal has a name, Robot also has a name
// "a" is a stale object therefore extra eat() method in "a" is ok

//a = r2;//Error, Robot does not have eat method



let hum : Human = new Animal("Dog");//Fresh Object
// But Fresh or stale both have same properties and methods
// therefore compatible


//let wild : Animal = new WildAnimal("Deer");//Fresh Object
// But Fresh or stale both have different property names
// therefore not compatible



let r0: Robot = new Animal("Donkey");//how is this possible?
//another issue is that Donkey is a fresh object
// therefore why is it allowing extra eat function in Robot type
//without giving an error? I dont know must be missing something

var isItRobot = r0 instanceof Robot;
console.log("Is Donkey a Robot: " + isItRobot);//false, giving the right results

var isItAnimal = r0 instanceof Animal;
console.log("Is Donkey a Animal: " + isItAnimal);//true, giving the right results

//Now it is your reposibility to figure out 
//why the above code is not giving an Error?



