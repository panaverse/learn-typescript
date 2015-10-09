//Please note that here we are using the standard ES2015 (ES6) syntax for modules, this standard was adopted in version 1.5. 
//In TypeScript there are other module syntax also available but I suggest not to use them unless for 
//working with legacy code.
//It is very important to understand the syntax and concepts of ES2015 modules soon they will be adopted in all browsers:
//http://www.2ality.com/2014/09/es6-modules-final.html
var math_1 = require("./math");
var Human_1 = require("./Human");
var addResult = math_1.add(2, 3);
var subResult = math_1.sub(3, 2);
console.log(addResult);
console.log(subResult);
var h = new Human_1["default"]();
console.log(h.name);
//If VS Code is giving an error compile with this command:
//tsc -target es5 -module commonjs app.ts 
