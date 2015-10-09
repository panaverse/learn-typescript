If VS Code is giving an error compile with this command:
tsc -target es5 -module commonjs app.ts

Read this:

http://blogs.msdn.com/b/typescript/archive/2015/03/27/announcing-typescript-1-5-alpha.aspx

http://www.2ality.com/2014/09/es6-modules-final.html


If your target is ES2015 then you will also have to use System.js:
https://github.com/systemjs/systemjs