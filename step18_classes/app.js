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
var r0 = new Animal("Donkey"); //how is this possible?
var isItRobot = r0 instanceof Robot;
console.log("Is Donkey a Robot: " + isItRobot);
/* TypeScript is a structural type system which is different from Java, C#, etc. When we compare two different types, regardless of where they came from,
if the types of each member are compatible, then we say the types themselves are compatible. */
var h2 = h;
h = a; //both have same properties and methods therefore are compatible
h.eat();
var a2 = a;
var r2 = r;
r = a; //Animal has a name, Robot also has a name
//a = r2;//Error, Robot does not have eat property
//# sourceMappingURL=app.js.map