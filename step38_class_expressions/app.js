//Similar to class declarations, class expressions allow you to create new classes.  
//Unlike class declarations, you can use class expressions wherever you use an expression.  
//For example, you can now create a class and use it in your extends clause.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StateHandler = (function (_super) {
    __extends(StateHandler, _super);
    function StateHandler() {
        _super.call(this);
    }
    return StateHandler;
})((function () {
    function class_1() {
    }
    class_1.prototype.reset = function () { return true; };
    return class_1;
})());
var g = new StateHandler();
g.reset();
//This class can be anonymous and still has all the same capabilities of class declarations.  
