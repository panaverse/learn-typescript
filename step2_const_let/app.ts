//use const where veriable values do not change
const a = 5;
const b : number = 33;
const c ="best";

//I suggest use let instead of var everywhere, becuase let has blocked scope
if (true) {
	let a = 4;
	//use a
}
else {
	let a = "string";
	//use a
}
console.log("let: " + a);// Error: a is not defined in this scope




