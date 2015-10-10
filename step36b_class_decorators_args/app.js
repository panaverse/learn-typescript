///<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
function logClassWithArgs(filter) {
    return function (target) {
        // implement class decorator here, the class decorator 
        // will have access to the decorator arguments (filter) 
        // because they are  stored in a closure 
        console.log(target, filter);
    };
}
//apply the decorator to a class
var Person = (function () {
    function Person(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    Person = __decorate([
        logClassWithArgs({ when: { name: "Zeeshan" } }), 
        __metadata('design:paramtypes', [String, String])
    ], Person);
    return Person;
})();
var me = new Person("Zia", "Khan");
// New: Person
console.log(me instanceof Person);
// true 
