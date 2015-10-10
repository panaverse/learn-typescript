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
//http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4
//Teaches how to allow developers to pass arguments to a decorator when it is consumed.
require("reflect-metadata");
function logType(target, key) {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log(key + " type: " + t.name);
}
var Demo = (function () {
    function Demo() {
    }
    __decorate([
        logType, 
        __metadata('design:type', String)
    ], Demo.prototype, "attr1");
    return Demo;
})();
