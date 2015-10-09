class Animal {
    name:string;
    constructor(theName: string) { 
        this.name = theName; 
    }
    move(meters: number = 0) {
        console.log(this.name + " moved " + meters + "m.");
    }
}

class Snake extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(meters = 5) {
        console.log("Slithering...");
        super.move(meters);
    }
    bite(){
        console.log("bites");
    }
}

class Horse extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(meters = 45) {
        alert("Galloping...");
        super.move(meters);
    }
}

class Donkey extends Animal {
    distance: number;
    constructor(name: string, distance: number) { 
        super(name); 
        this.distance = distance;
    }
    move(meters = 45) {
        alert("Moving...");
        super.move(meters);
    }
}

class Cat extends Animal {
    constructor(name: string) { 
        super(name); 
    }
    move(meters = 1) {
        alert("Jumping...");
        super.move(meters);
    }
}

let a: Animal = new Snake("Python");
a.move(5);//Snake move method is called not Animals, this is because of polymorphism

let a1: Animal = new Horse("Rocket");
let h: Horse = a1 as Horse;//explicit casting needed to up cast

let d1: Horse = new Donkey("Worker", 200);//this is possible because of ducktypeing not because of inheritance
let d2: Donkey = d1 as Donkey;

let s1: Snake = <Snake> a;//explicit casting needed because Snake has an additional method bite()
let s2: Snake = a as Snake;//alternative casting syntax

let h1 : Horse = new Cat("Kitten");//why is this allowed? Because it has same properties and methods (structural type) not because of inheritance



//**************************************************

//http://stackoverflow.com/questions/30819663/call-an-overridden-method-from-super-class-in-typescript
class A
{
    constructor()
    {
        this.MyvirtualMethod();
    }

    protected MyvirtualMethod(): void
    {
           console.log("A")
    }
}

class B extends A
{
    private testString: string = "B";

    public MyvirtualMethod(): void
    {
        console.log(this.testString); // This becomes undefined
    }
}

let obj = new B();


//*******************************
//checking types
class Foo{}
class Bar extends Foo{}
class Bas{}

var bar = new Bar();

console.log(bar instanceof Bar); // true
console.log(bar instanceof Foo); // true
console.log(bar instanceof Object); // true

console.log(bar instanceof Bas); // false



//**************************
//Type Guards
//http://blogs.msdn.com/b/typescript/archive/2014/11/18/what-s-new-in-the-typescript-type-system.aspx
//Using instanceof with classes:
/*
class Dog { woof() { } }
class Cat { meow() { } }
var pet: Dog|Cat = ... ;
if(pet instanceof Dog) {
   pet.woof(); // OK
} else {
   pet.woof(); // Error
}
*/
