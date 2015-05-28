///<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
function MyClassDecorator(value) {
    return function (target) {
        Reflect.defineMetadata("MyClassDecorator", value, target);
    };
}
var MyClass = (function () {
    function MyClass() {
    }
    MyClass = __decorate([
        MyClassDecorator("my metadata in class decorator"), 
        __metadata('design:paramtypes', [])
    ], MyClass);
    return MyClass;
})();
var myClass = new MyClass();
var value = Reflect.getMetadata("MyClassDecorator", myClass.constructor);
console.log(value); // outputs "my metadata"
