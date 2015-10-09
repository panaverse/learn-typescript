//Please note that here we are using the standard ES2015 (ES6) syntax for modules, this standard was adopted in version 1.5. 
//In TypeScript there are other module syntax also available but I suggest not to use them unless for 
//working with legacy code.

//It is very important to understand the syntax and concepts of ES2015 modules soon they will be adopted in all browsers:
//http://www.2ality.com/2014/09/es6-modules-final.html

import {add, sub} from "./math";//syntax for named imports
import Human from "./Human";//syntax for default import

var addResult = add(2, 3);
var subResult = sub(3, 2);
console.log(addResult);
console.log(subResult);

var h = new Human();
console.log(h.name);


//If VS Code is giving an error compile with this command:
//tsc -target es5 -module commonjs app.ts

//Note ES 2015 modules can used in the TypeScript src filess, as well as can be in the output js file if you set the --target to es6. 
//If it is in output js file you will have to use System.js to use it becuase right now most browsers and node.js do not support ES2015 modules. 


/*ECMAScript 6 provides the following ways of importing [4]:

    // Default exports and named exports
    import theDefault, { named1, named2 } from 'src/mylib';
    import theDefault from 'src/mylib';
    import { named1, named2 } from 'src/mylib';
    
    // Renaming: import named1 as myNamed1
    import { named1 as myNamed1, named2 } from 'src/mylib';
    
    // Importing the module as an object
    // (with one property per named export)
    import * as mylib from 'src/mylib';
    
    // Only load the module, don’t import anything
    import 'src/mylib';*/