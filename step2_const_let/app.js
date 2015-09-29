//use const where veriable values do not change
var a = 5;
var b = 33;
var c = "best";
//I suggest use let instead of var everywhere, becuase let has blocked scope
if (true) {
    var z = 4;
}
else {
    var z = "string";
}
console.log("let: " + z); // Error: a is not defined in this scope
