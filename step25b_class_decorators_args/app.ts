///<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>

//Configurable decorators
//http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-3
//Teaches how to allow developers to pass arguments to a decorator when it is consumed.




/*
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
}*/

function logClassWithArgs(filter: Object) {
    return (target: Object) => {
        // implement class decorator here, the class decorator 
        // will have access to the decorator arguments (filter) 
        // because they are  stored in a closure 
        console.log(target, filter);
    }
}




//apply the decorator to a class
@logClassWithArgs({ when : { name : "Zeeshan"} })
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