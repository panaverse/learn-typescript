//User defined type guards in 1.6
function isCat(a) {
    return true;
}
var x;
if (isCat(x)) {
    x.meow(); // OK, x is Cat in this block
}
//This allows you to work with not only typeof and instanceof checks, which need a type that JavaScript understands, 
//but now you can work with interfaces and do custom analysis.  Guard functions are denoted by their “a is X” return type, 
//which returns boolean and signals to the compiler if what the expected type now is.
