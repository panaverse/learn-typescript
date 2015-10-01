//User defined type guards in 1.6

//In earlier versions of TypeScript, you could use if statements to narrow the type. For example, you could use:

//if (typeof x === "number") { … }

//This helped type information flow into common ways of working with types at runtime (inspired. 
//While this approach is powerful, TypeScript has now pushed it a bit further.  
//In 1.6, you can now create your own type guard functions:

interface Animal {name: string; }
interface Cat extends Animal { meow(); }

function isCat(a: Animal): a is Cat {
  return a.name === 'kitty';
}

var x: Animal;

if(isCat(x)) {
  x.meow(); // OK, x is Cat in this block
}

//This allows you to work with not only typeof and instanceof checks, which need a type that JavaScript understands, 
//but now you can work with interfaces and do custom analysis.  Guard functions are denoted by their “a is X” return type, 
//which returns boolean and signals to the compiler if what the expected type now is.
