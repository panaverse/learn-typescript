let myType : any = { name: "Zia", id: 1 };
myType = { id: 2,  name: "Tom" };// can only assign a type which has the at least the same properties
myType = { id: 3,  name: "Mike", gender: false };//becuase of any it assign a different type
myType = { name: "Mike", gender: false };//can even reduce the properties because of any type

myType = "Even a sring can be assigned";

myType = function(){ console.log("Even a function can be assigned to any")};

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;