//use const where veriable values do not change
const a = 5;
const b : number = 33;
const c ="best";

//I suggest use let instead of var everywhere, becuase let has blocked scope
if (true) {
	let z = 4;
	//use z
}
else {
	let z = "string";
	//use z
}
console.log("let: " + z);// Error: a is not defined in this scope




