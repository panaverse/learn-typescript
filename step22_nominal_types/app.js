//When comparing types that have 'private' members, we treat these differently. For two types to be considered compatible, 
//if one of them has a private member, then the other must have a private member that originated in the same declaration. 
//This allows us to implement Nominative types in TypeScript 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Human = (function () {
    function Human(name) {
        this.name = name;
    }
    Human.prototype.eat = function () {
        console.log(this.name + " is a Human and is eating");
    };
    return Human;
})();
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function () {
        console.log(this.name + " is a Animal and is eating");
    };
    return Animal;
})();
var Robot = (function () {
    function Robot(name) {
        this.name = name;
    }
    return Robot;
})();
var h = new Human("Tom");
var a = new Animal("Goat");
var r = new Robot("R2-D2");
var r0 = new Animal("Donkey"); //now because of pivate variable this is not possible
var h2 = h;
h = a; //both have same properties and methods therefore are compatible but because of private variable not same type
h.eat();
var a2 = a;
var r2 = r;
r = a; //Animal has a name, Robot also has a name, but now it is an Error
a = r2; //Error, Robot does not have eat method
//*********************************************************
//Example 2
//Because 'BigAnimal' and 'Rhino' share the private side of their shape from the same declaration of 'private name: string' in 'BigAnimal', 
//they are compatible. However, this is not the case for 'Employee'. When we try to assign from an 'Employee' to 'Animal' we get an error that these types
//are not compatible. Even though 'Employee' also has a private member called 'name', it is not the same one as the one created in 'BigAnimal'. 
var BigAnimal = (function () {
    function BigAnimal(theName) {
        this.name = theName;
    }
    return BigAnimal;
})();
var Rhino = (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        _super.call(this, "Rhino");
    }
    return Rhino;
})(BigAnimal);
var Employee = (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
})();
var animal = new BigAnimal("Elephant");
var rhino = new Rhino();
var employee = new Employee("Bob");
animal = rhino;
animal = employee; //error: BigAnimal and Employee are not compatible
