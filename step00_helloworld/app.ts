// Before starting learning typescript, you must know two terms;
/*
01 - Implicit type annotations

    - It means rely on the compiler to infer the type of the variable.

     Here infer means that the compiler will try to figure out the type of the variable during runtime or compiling the code.

02 -  Explicit type annotations

    - It means add static types directly to variable in  codebase instead of relying on the compiler to do it for you.


*/
// Implicit Vaiable Declaration, in message variable, we have not added the type of the variable explicitly. So, take your cursor on the variable name and the tooltip will show you the type of variable.

let message = "Hello World";
                            
console.log(message);

// Explicit Vaiable Declaration, in language variable, we have added the type of the variable explicitly.

let language: string = "TypeScript";
        
