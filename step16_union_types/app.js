function addWithUnion(arg1, arg2) {
    if (typeof arg1 === "string") {
        // arg1 is treated as a string here
        return arg1 + "is a string";
    }
    if (typeof arg1 === "number") {
        // arg1 is treated as a number here
        return arg1 + 10;
    }
    if (typeof arg1 === "boolean") {
        // arg1 is treated as a boolean here
        return arg1 && false;
    }
}
function f(x) {
    if (typeof x === "number") {
        return x + 10;
    }
    else {
    }
}
var Dog = (function () {
    function Dog() {
    }
    Dog.prototype.woof = function () { };
    return Dog;
})();
var Cat = (function () {
    function Cat() {
    }
    Cat.prototype.meow = function () { };
    return Cat;
})();
var pet = new Dog();
if (pet instanceof Dog) {
    pet.woof(); // OK
}
else {
    pet.woof(); // Error
}
//# sourceMappingURL=app.js.map