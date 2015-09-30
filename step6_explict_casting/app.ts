let myType = <any> { name: "Zia", id: 1 };
myType = { id: 2,  name: "Tom" };// can only assign a type which has the at least the same properties
myType = { id: 3,  name: "Mike", gender: false };//can add a property
myType = { name: "Mike", gender: false };//can even reduce the properties because of initial any explict casting

let myType1 = { name: "Zia", id: 1 } as any;//this is an alternative syntax for casting
myType1 = { id: 2,  name: "Tom" };// can only assign a type which has the at least the same properties
myType1 = { id: 3,  name: "Mike", gender: false };//can add a property
myType1 = { name: "Mike", gender: false };//can even reduce the properties because of initial any explict casting

let a = 2;
let b = a as string;//Error

