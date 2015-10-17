//A confusion about Structural Typing:
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
