//In TypeScript, each member is public by default.
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (meters) {
        alert(this.name + " moved " + meters + "m.");
    };
    return Animal;
})();
var a = new Animal("cat").name;
console.log(a);
