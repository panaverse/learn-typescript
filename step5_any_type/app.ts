let myType : any = { name: "Zia", id: 1 };
myType = { id: 2,  name: "Tom" };// can only assign a type which has the at least the same properties
myType = { id: 3,  name: "Mike", gender: false };//can add a property
myType = { name: "Mike", gender: false };//can even reduce the properties because of any type

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;