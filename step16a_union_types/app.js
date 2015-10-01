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
/*Note on Type Guards:
A common pattern in JavaScript is to use typeof or instanceof to examine the type of an expression at runtime.
TypeScript now understands these conditions and will change type inference accordingly when used in an if block.
This is called a type guard.*/
var x = "Tom"; //Line A
if (typeof x === 'string') {
    console.log(x.lengthX); // Error, 'lengthX' does not exist on 'string' but 'lenght' does
}
// x is still any here
x.unknown(); // OK
