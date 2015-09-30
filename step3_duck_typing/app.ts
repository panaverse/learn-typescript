//TypeScript doesn’t require strict datatype matching, either. 
//TypeScript uses what the specification calls “structural subtyping” to determine compatibility. 
//This is similar to what’s often called “duck typing.” 

//Added new rules for TypeScript 1.6 https://github.com/Microsoft/TypeScript/pull/3823

let myType = { name: "Zia", id: 1 };
myType = { id: 2,  name: "Tom" };// can only assign a type which has the atleast the same properties
myType = { id: 2,  name_person: "Tom" };//Error, renamed property
myType = { id: 2,  name: "Tom", age: 22 };//Error, excess property


var x: { foo: number };
x = { foo: 1, baz: 2 };  // Error, excess property `baz`

var y: { foo: number, bar?: number };
y = { foo: 1, baz: 2 };  // Error, excess or misspelled property `baz`

//The rationale for the above two errors above is that since the fresh types of the object literals are 
//never captured in variables, static knowledge of the excess or misspelled properties should not be silently lost. 

//No errors occur when the fresh types are captured in variables:

var a: { foo: number };
var a1 = { foo: 1, baz: 2 };
a = a1;//No Error

var z: { foo: number, bar?: number };
var z1 = { foo: 1, baz: 2 };
z = z1;//No Error

