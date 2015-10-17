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
    Animal.prototype.eat = function () {
        console.log(this.name + " is a Human and is eating");
    };
    return Animal;
})();
var h1 = new Human("");
var a1 = new Animal("world", 50);
h1 = new Animal("test", 25); //this is working, but it should not because it is a fresh object with extra properties
a1 = new Human("zeeshan"); //ERROR
//my common sense is saying this is correct, but?
var a = { name: "Zia" };
a = { name: "Zeeshan", age: 22 }; //ERROR
//It seems that for object literals there is a rule for fresh objects
//but this rules does not apply to normal objects derived from classes  
