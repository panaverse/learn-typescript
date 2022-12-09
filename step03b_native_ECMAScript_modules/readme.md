# Using Native ECMAScript Modules in Node.js

Now we want our JavaScript Node.js files to use the [ECMAScript modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules)

[ECMAScript Modules in Node.js](https://www.typescriptlang.org/docs/handbook/esm-node.html)

[Watch Video: How to Setup Node.js with TypeScript in 2023](https://www.youtube.com/watch?v=H91aqUHn8sE)

Before we transpile the program we will have make some changes.

In the tsconfig.json set [module](https://www.typescriptlang.org/tsconfig#module) and [moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution):

        "module": "nodenext",
        "moduleResolution": "NodeNext", 
        "target": "es2020",     

In the package.json add:

        "type": "module"

In the import use .js file extension instead of just using "./second":

        import {b, c} from "./second.js";

Additional Reading:

[Understanding TypeScript 4.7 and ECMAScript module support](https://blog.logrocket.com/typescript-4-7-ecmascript-module-support/)

[TypeScript and native ESM on Node.js](https://2ality.com/2021/06/typescript-esm-nodejs.html)

Note: Give the following command to transpile the code:

        tsc 

If you give the following command to transpile the code, the js file will not run:

        tsc app.ts

You will get the following error when you run the code:

node app.js

file:///Users/ZiaKhan/Documents/GitHub/learn-typescript/step03b_native_ECMAScript_modules/app.js:2

exports.__esModule = true;
^

ReferenceError: exports is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '/Users/ZiaKhan/Documents/GitHub/learn-typescript/step03b_native_ECMAScript_modules/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///Users/ZiaKhan/Documents/GitHub/learn-typescript/step03b_native_ECMAScript_modules/app.js:2:1
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)

Node.js v19.1.0

