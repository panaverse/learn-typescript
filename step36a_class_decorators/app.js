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
//http://blog.wolksoftware.com/decorators-reflection-javascript-typescript
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
function logClass(target) {
    // save a reference to the original constructor
    var original = target;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c = function () {
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        return new c();
    }
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log("New: " + original.name);
        return construct(original, args);
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // return new constructor (will override original)
    return f;
}
//apply the decorator to a method
var Person = (function () {
    function Person(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    Person = __decorate([
        logClass, 
        __metadata('design:paramtypes', [String, String])
    ], Person);
    return Person;
})();
var me = new Person("Zia", "Khan");
// New: Person
console.log(me instanceof Person);
// true 
