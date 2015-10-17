//A confusion about Structural Typing:
//Please Read https://github.com/Microsoft/TypeScript/issues/5303
//Object literals have an associated freshness before they're bound to a variable. The same doesn't apply for any other expressions.
//The idea is that object literals are often used for option bags (where the user has to manually type out each property 
//name at each use-site), and this behavior catches typos.
//If you'd like to prevent Animal from being assigned to a Human, you can add a private property to Animal, 
//since private and protected properties need to originate from the same declaration to be compatible.
var Human = (function () {
    function Human(name) {
        this.name = name;
    }
    return Human;
})();
var Animal = (function () {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    Animal.prototype.eat = function (quantity) {
        console.log(this.name + " is a Human and is eating");
    };
    return Animal;
})();
var d = { name: "Hello", age: 4 };
var h = { name: "hello" }; // This is allowed
var h1 = d; // Concept of stale object applied here
var isHuman = h instanceof Human;
console.log(isHuman);
var a1 = { name: "Cat", age: 4 }; // This is not allowed need to add all properties including functions
// This below statement is allowed 
// Note there is no parameter in function and it does not give any compilation error but you can not call
// this function without paramter, see the call below
var a2 = { name: "Dog", age: 4, eat: function () {
        console.log("Eat in object literal");
    } };
a2.eat(); // Not allowed 
a2.eat(3); // Works fine
