var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
var h = a1; //no explicit casting needed because has same methods and properties (structural type)
var s1 = a; //explicit casting needed because Snake has an additional method bite()
var h1 = new Cat("Kitten"); //why is this allowed? Because it has same properties and methods (structural type) not because of inheritance
//# sourceMappingURL=app.js.map