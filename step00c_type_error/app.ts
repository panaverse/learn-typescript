// A type error in TypeScript occurs when a value is used in a way that is incompatible with its declared type.

let myName: string = "unknown person"
myName = 4 // Here, try to assign the number 4 to variable `myName`. Since `myName` is type string, TypeScript will throw a type error: Type 'number' is not assignable to type 'string'.

console.log(myName);

