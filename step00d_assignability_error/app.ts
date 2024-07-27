//An assignability error in TypeScript occurs when you attempt to assign a value to a variable or property in a way that does not conform to its declared type.

let myName: string
myName = 22 // Here, trying to assign the number 22 to myName. Since myName is declared to hold only string values, TypeScript throws an assignability error: Type 'number' is not assignable to type 'string'

console.log(myName);
