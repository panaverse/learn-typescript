var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (meters) {
        if (meters === void 0) { meters = 0; }
        console.log(this.name + " moved " + meters + "m.");
    };
    return Animal;
})();
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        _super.call(this, name);
    }
    Snake.prototype.move = function (meters) {
        if (meters === void 0) { meters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, meters);
    };
    Snake.prototype.bite = function () {
        console.log("bites");
    };
    return Snake;
})(Animal);
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        _super.call(this, name);
    }
    Horse.prototype.move = function (meters) {
        if (meters === void 0) { meters = 45; }
        alert("Galloping...");
        _super.prototype.move.call(this, meters);
    };
    return Horse;
})(Animal);
var Donkey = (function (_super) {
    __extends(Donkey, _super);
    function Donkey(name, distance) {
        _super.call(this, name);
        this.distance = distance;
    }
    Donkey.prototype.move = function (meters) {
        if (meters === void 0) { meters = 45; }
        alert("Moving...");
        _super.prototype.move.call(this, meters);
    };
    return Donkey;
})(Animal);
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        _super.call(this, name);
    }
    Cat.prototype.move = function (meters) {
        if (meters === void 0) { meters = 1; }
        alert("Jumping...");
        _super.prototype.move.call(this, meters);
    };
    return Cat;
})(Animal);
var a = new Snake("Python");
a.move(5); //Snake move method is called not Animals, this is because of polymorphism
var a1 = new Horse("Rocket");
var h = a1; //explicit casting needed to up cast
var d1 = new Donkey("Worker", 200); //this is possible because of ducktypeing not because of inheritance
var d2 = d1;
var s1 = a; //explicit casting needed because Snake has an additional method bite()
var s2 = a; //alternative casting syntax
var h1 = new Cat("Kitten"); //why is this allowed? Because it has same properties and methods (structural type) not because of inheritance
//**************************************************
//http://stackoverflow.com/questions/30819663/call-an-overridden-method-from-super-class-in-typescript
var A = (function () {
    function A() {
        this.MyvirtualMethod();
    }
    A.prototype.MyvirtualMethod = function () {
        console.log("A");
    };
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
        this.testString = "B";
    }
    B.prototype.MyvirtualMethod = function () {
        console.log(this.testString); // This becomes undefined
    };
    return B;
})(A);
var obj = new B();
//*********************************
//Object oriented Theory: http://rachelappel.com/write-object-oriented-javascript-with-typescript
/*The following are the primary object oriented programming techniques:
a.	Encapsulation
b.	Inheritance
c.	Abstraction
d.	Polymorphism
*/
//The version 1.6 now implements Abstract classes: https://github.com/Microsoft/TypeScript/issues/3578
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function () { return this.bar(); };
    return Base;
})();
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    E.prototype.bar = function () { return 1; };
    return E;
})(Base);
var obj1 = new Base(); //Error, cannnot create a instance of a Abstract class
console.log(obj1.foo());
