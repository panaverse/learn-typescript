function addWithUnion(arg1: string | number | boolean, arg2: string | number | boolean): string | number | boolean {
    if (typeof arg1 === "string") {///This is known as a type guard and means that the type of x will be treated as a string within the if statement block
        // arg1 is treated as a string here
        return arg1 + "is a string";
    }
    if (typeof arg1 === "number") {
        // arg1 is treated as a number here
        return arg1 + 10;
    }
    if (typeof arg1 === "boolean") {
        // arg1 is treated as a boolean here
        return arg1 && false;
    }
}



function f(x: number | number[]) {
  if (typeof x === "number") { //This is known as a type guard and means that the type of x will be treated as a number within the if statement block
    return x + 10;
  }
  else {
    // return sum of numbers
  }
}



class Dog { woof() { } }
class Cat { meow() { } }
var pet: Dog|Cat = new Dog();
if(pet instanceof Dog) {//this is also a type guard
   pet.woof(); // OK
} else {
   pet.woof(); // Error
}


/*Note on Type Guards:
A common pattern in JavaScript is to use typeof or instanceof to examine the type of an expression at runtime. 
TypeScript now understands these conditions and will change type inference accordingly when used in an if block.
This is called a type guard.*/

var x: any = "Tom"; //Line A
if(typeof x === 'string') { //Line B
   console.log(x.lengthX);// Error, 'lengthX' does not exist on 'string'
}
// x is still any here
x.unknown();// OK
