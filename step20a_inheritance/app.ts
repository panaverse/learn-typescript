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
let h: Horse = a1;          //explicit casting not require because Child object have same properties and fuctions
let h2: Horse = a1 as Horse; //explicit will also works but not needed


let a2: Animal = new Donkey("Worker",100);
let h3: Donkey = a2 as Donkey;    //explicit casting require because Child object have additional properties or functions
let h4: Donkey = a2; // Error -- will not work, explicit casting is required as above


let d1: Horse = new Donkey("Worker", 200);//this is possible see below link for detials,
//https://github.com/Microsoft/TypeScript/issues/5303
// object freshness applied to object literals not on class object 
// If you'd like to prevent Animal from being assigned to a Human, you can add a private property to Animal,
// since private and protected properties need to originate from the same declaration to be compatible.

let d2: Donkey = d1 as Donkey; // explicit casting is required 


let s1: Snake = <Snake> a;//explicit casting needed because Snake has an additional method bite()
let s2: Snake = a as Snake;//alternative casting syntax

let h1 : Horse = new Cat("Kitten");//why is this allowed? Because it has same properties and methods (structural type) not because of inheritance
//https://github.com/Microsoft/TypeScript/issues/5303


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


/*User defined type guards in 1.6

In earlier versions of TypeScript, you could use if statements to narrow the type. For example, you could use:

if (typeof x === "number") { … }

This helped type information flow into common ways of working with types at runtime (inspired by some of the other projects doing typechecking of JS). While this approach is powerful, we wanted to push it a bit further.  In 1.6, you can now create your own type guard functions:

interface Animal {name: string; }
interface Cat extends Animal { meow(); }

function isCat(a: Animal): a is Cat {
  return a.name === 'kitty';
}

var x: Animal;

if(isCat(x)) {
  x.meow(); // OK, x is Cat in this block
}

This allows you to work with not only typeof and instanceof checks, which need a type that JavaScript understands, but now you can work with interfaces and do custom analysis.  Guard functions are denoted by their “a is X” return type, which returns boolean and signals to the compiler if what the expected type now is
*/
