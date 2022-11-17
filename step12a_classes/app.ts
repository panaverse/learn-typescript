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
let r0: Robot = new Animal("Donkey");//how is this possible?

var isItRobot = r0 instanceof Robot;
console.log("Is Donkey a Robot: " + isItRobot);//false, giving the right results

var isItAnimal = r0 instanceof Animal;
console.log("Is Donkey a Animal: " + isItAnimal);//true, giving the right results


/* TypeScript is a structural type system which is different from Java, C#, etc. When we compare two different types, 
regardless of where they came from, if the types of each member are compatible, then we say the types themselves are compatible. */
let h2 = h;
h = a;//both have same properties and methods therefore are compatible
h.eat();
let a2 = a;

let r2 = r;
r = a;//Animal has a name, Robot also has a name
a = r2;//Error, Robot does not have eat method
let hum : Human = new Animal("Dog");
let wild : Animal = new WildAnimal("Deer");//this is an Error in version 1.6, Please note that in 1.6 the concept of Duck Typing has changed a bit:
                                            // https://github.com/Microsoft/TypeScript/pull/3823

/*
If It's a Duck (https://visualstudiomagazine.com/articles/2015/02/01/datatyping-in-typescript.aspx)
TypeScript is a superset of JavaScript and JavaScript does not, of course, have the concept of data typing (let alone a mechanism for determining class 
compatibility). TypeScript has to figure out assignability on its own.

To determine if two classes are assignable, TypeScript uses what it calls "structural subtyping." With structural subtyping, 
TypeScript compares the properties and methods on the two objects. If the variable on the left-hand side of the equals sign has all the 
properties and the methods of the object on the right-hand side of the equals sign, then the two objects are assignable. 
This is a form of "duck typing" (from the old saying: "If it looks like a duck, walks like a duck and quacks like a duck, then it's a duck").

With structural subtyping, it's perfectly OK for the object on the left-hand side to have more properties than the object on the right, 
it just can't have fewer properties. Obviously, any class that derives from another class will have all of the properties of the base interface.

Structural subtyping lets TypeScript support extending classes defined in other libraries. 
If you extend some other class you can freely add properties and methods to your version of the class. 
When your class interacts with functions in the library from which the original class was drawn, 
TypeScript will consider your class as indistinguishable from the original class in the library: 
Thanks to the way extending works, your class will have all of the methods and properties of the original class, 
which is all structural subtyping requests.

*/
