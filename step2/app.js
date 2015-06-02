//use const where veriable values do not change
var a = 5;
var b = 33;
var c = "best";
//I suggest use let instead of var everywhere, becuase let has blocked scope
if (true) {
    var a_1 = 4;
}
else {
    var a_2 = "string";
}
console.log("let: " + a); // Error: a is not defined in this scope
//# sourceMappingURL=app.js.map