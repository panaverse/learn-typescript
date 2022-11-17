///<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>


//http://blog.wolksoftware.com/decorators-reflection-javascript-typescript
//http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-ii

//Decorators can be used to annotate a class, property, method or parameter. 

//To invoke a class decorator we need to prefix the method that we wish to decorate 
//with the @ character follow by the name of the decorator. 

/*
In the case of a decorator named log, the syntax will look as follows:

@logClass
class C {
    
    foo(n: number) {
        return n * 2;
    }
}
*/


//Before we can actually use @logClass we need to declare the class decorator somewhere in our application. 
//Let’s take a look to the log class decorator implementation.

function logClass(target: any) {

  // save a reference to the original constructor
  var original = target;

  // a utility function to generate instances of a class
  function construct(constructor, args) {
    var c : any = function () {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }

  // the new constructor behaviour
  var f : any = function (...args) {
    console.log("New: " + original.name); 
    return construct(original, args);
  }

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}


//apply the decorator to a class
@logClass
class Person { 

  public name: string;
  public surname: string;

  constructor(name : string, surname : string) { 
    this.name = name;
    this.surname = surname;
  }
}


var me = new Person("Zia", "Khan");  
// New: Person

console.log(me instanceof Person); 
// true