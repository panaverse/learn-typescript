# Using Native ECMAScript Modules in Node.js

Now we want our JavaScript Node.js files to use the [ECMAScript modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules)

[ECMAScript Modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html)

Before we transpile the program we will have make some changes.

In the tsconfig.json set [module](https://www.typescriptlang.org/tsconfig#module) and [moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution):

        "module": "nodenext",
        "moduleResolution": "NodeNext", 

In the package.json add:

        "type": "module"

In the import use .js file extension instead of just using "./second":

        import {b, c} from "./second.js";


But when we transpile and run this program we get an error becuase the transpiler is still using old require syntax instead of Native ECMAScript Modules syntax. May be we are using some wrong setting in package.json or tsconfig.json


Additional Reading:

[Understanding TypeScript 4.7 and ECMAScript module support](https://blog.logrocket.com/typescript-4-7-ecmascript-module-support/)