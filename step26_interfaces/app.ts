//One of TypeScript's core principles is that type-checking focuses on the 'shape' that values have. 
//This is sometimes called "duck typing" or "structural subtyping". 
//In TypeScript, interfaces fill the role of naming these types

//Added new rules for TypeScript 1.6 https://github.com/Microsoft/TypeScript/pull/3823

//Example without a named interface

function printLabel(labelledObj: {label: string}) {
  console.log(labelledObj.label);
}

//Fresh Objects:
//Case 1
printLabel({label: "Size 10 Object"});//Case 1 exact properties: OK

//Case 2a 
printLabel({mylabel: "Size 10 Object"});//Case 2a missing or renamed property: Error

//Case 2b
//A type can include an index signature to explicitly indicate that excess properties are permitted in with fresh objects:
function printLabelX(labelledObj: {[x: string]:any}) {////Note now 'x' can have any name, just that the property should be of type string
  console.log(arguments[0]);
}
printLabelX({name: "Zia"});// Ok, `name` matched by index signature


//Case 3
printLabel({size: 10, label: "Size 10 Object"});//Case 3 Fresh Literal: Error no extra properties allowed





//Stale Objects:

//Case 1:
var myObj1 = {label: "Size 10 Object"};
printLabel(myObj1);//Case 1 exact properties: OK

//Case 2a:
var myObj2 = {mylabel: "Size 10 Object"};
printLabel(myObj2);//Case 2a missing or renamed property: Error

//Case 2b:
var obj3= {name: "Zia"};
printLabelX(obj3);// Ok, `name` matched by index signature

//Case 3
var myObj4 = {size: 10, label: "Size 10 Object"};
printLabel(myObj4);//Case 3 Stale Literal: extra properties allowed



//**************************************************************

//Same Example with a named interface

interface LabelledValue {
  label: string;
}

interface LabelledValue2 {
    [x: string]:any
}

function printLabelY(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

function printLabelY2(labelledObj: LabelledValue2) {
  console.log(arguments[0]);
}


//Fresh Objects

//Case 1
printLabelY({label: "Size 11 Object"});//Case 1 exact properties: OK

//Case 2a
printLabelY({mylabel: "Size 11 Object"});//Case 2a missing or renamed property: Error

//Case 2b
printLabelY2({name: "Zia"});// Ok, `name` matched by index signature

//Case 3
printLabelY({size: 11, label: "Size 11 Object"});//Case 3 Fresh Literal: Error no extra properties allowed




//Stale Objects

//Case 1
var myObjY1 = {label: "Size 11 Object"};
printLabelY(myObjY1);//Case 1 exact properties: OK

//Case 2a
var myObjY2 = {mylabel: "Size 11 Object"};
printLabelY(myObjY2);//Case 2a missing or renamed property: Error

//Case 2b
var objY3= {name: "Zia"};
printLabelY2(objY3);// Ok, `name` matched by index signature

//Case 3
var myObjY4 = {size: 11, label: "Size 11 Object"};
printLabelY(myObjY4);//Case 3 Stale Literal: extra properties allowed