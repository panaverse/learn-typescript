//TypeScript doesn’t require strict datatype matching, either. 
//TypeScript uses what the specification calls “structural subtyping” to determine compatibility. 
//This is similar to what’s often called “duck typing.” 

let myType = { name: "Zia", id: 1 };
myType = { id: 2,  name: "Tom" };// can only assign a type which has the atleast the same properties
myType = { id: 3,  name: "Mike", gender: false };//Error after 1.6 cannot even add a property

let anotherType = {name: "Zed", age: 32};
anotherType = {name: "Zed"};//Type Error

