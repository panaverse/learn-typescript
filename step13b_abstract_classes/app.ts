//*********************************
//Object oriented Theory: http://rachelappel.com/write-object-oriented-javascript-with-typescript
/*The following are the primary object oriented programming techniques:
a.	Encapsulation
b.	Inheritance
c.	Abstraction
d.	Polymorphism
*/



//The version 1.6 now implements Abstract classes: https://github.com/Microsoft/TypeScript/issues/3578

abstract class Base {
    foo(): number { return this.bar(); }
    abstract bar() : number;
}

class E extends Base { // okay -- implements abstract method
    bar() { return 1; }
}

var obj1 = new Base();//Error, cannnot create a instance of a Abstract class

console.log(obj1.foo());
