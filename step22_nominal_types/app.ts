//When comparing types that have 'private' members, we treat these differently. For two types to be considered compatible, 
//if one of them has a private member, then the other must have a private member that originated in the same declaration. 
//This allows us to implement Nominative types in TypeScript 

class Human {
    private name: string;
    
    constructor(name: string){
        this.name = name;
    }
    
    eat(){
        console.log(this.name + " is a Human and is eating");
    }
}

class Animal {
    private name: string;
    
    constructor(name: string){
        this.name = name;
    }
    
    eat(){
        console.log(this.name + " is a Animal and is eating");
    }
}

class Robot {
    private name: string;
    
    constructor(name: string){
        this.name = name;
    }
    
}




let h: Human = new Human("Tom");
let a: Animal = new Animal("Goat");
let r: Robot = new Robot("R2-D2");

//let r0: Robot = new Animal("Donkey");//now because of pivate variable this is not possible

let h2 = h;
//h = a;//both have same properties and methods therefore are compatible but because of private variable not same type
h.eat();
let a2 = a;

let r2 = r;
//r = a;//Animal has a name, Robot also has a name, but now it is an Error
//a = r2;//Error, Robot does not have eat method


//*********************************************************

//Example 2
//Because 'BigAnimal' and 'Rhino' share the private side of their shape from the same declaration of 'private name: string' in 'BigAnimal', 
//they are compatible. However, this is not the case for 'Employee'. When we try to assign from an 'Employee' to 'Animal' we get an error that these types
//are not compatible. Even though 'Employee' also has a private member called 'name', it is not the same one as the one created in 'BigAnimal'. 

class BigAnimal {
    private name:string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends BigAnimal {
	constructor() { super("Rhino"); }
}

class Employee {
    private name:string;
    constructor(theName: string) { this.name = theName; }	
}

var animal = new BigAnimal("Elephant");
var rhino = new Rhino();
var employee = new Employee("Bob");

animal = rhino;
//animal = employee; //error: BigAnimal and Employee are not compatible
