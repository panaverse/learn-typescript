let myType = <any> { name: "Zia", id: 1 };
myType = { id: 2,  name: "Tom" };// can only assign a type which has the at least the same properties
myType = { id: 3,  name: "Mike", gender: false };//can add a property
myType = { name: "Mike", gender: false };//can even reduce the properties because of initial any explict casting