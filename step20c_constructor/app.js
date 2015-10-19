// If parent class provide constructor(with or without argument) then you must have to create constructor in child class
// and must call super()
// Below code will not work because it does not call super,
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Case 1:
// If parent class provide constructor and child class does not provide then 
// child class will use parent's constrcutor and child's object creation will required use of parent's constructor parameters 
var A = (function () {
    function A(theName, age) {
        this.name = theName;
        console.log("A constrcutor");
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
var a = new A("A", 4); // This is working as expected
var b = new B("C", 8); // This is working too as child class use parents constructor
var c = new B(); // This is not working as child class must use parents constructor
var d = new B("C"); // Thsi is also not working
// Case 2:
// If parent class does not provide constructor and child class provide constrcutor then 
// child class must call super() within child's class constructor
// call to super can be at any line in constructor unlike any other object oriented language with call to super must be as first line
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D(theName, age) {
        this.name = theName;
        console.log("D constrcutor");
        _super.call(this); // 
    }
    return D;
})(C);
var aa = new C(); // This is working as expected
var bb = new D(); // This is not working because child class has its 2 argumnet constrcutor
var cc = new D("C", 8); // This is working as expected
// Case c:
// If parent class and child class both provide constructor then child class must call super with same parameters as they are in
// parent's constructor    
// call to super can be at any line in constructor unlike any other object oriented language with call to super must be as first line
var E = (function () {
    function E(theName, age) {
        this.name = theName;
        console.log("E constrcutor");
    }
    E.prototype.displayName = function () {
        console.log(" Name = " + this.name);
    };
    return E;
})();
var F = (function (_super) {
    __extends(F, _super);
    function F(theName) {
        this.name = theName;
        console.log("F constrcutor");
        _super.call(this, theName, 4); // Must call super with two arguments
        //super("Hello",5); // Multiple supper call working, No error here -- seems to be some special case   
    }
    return F;
})(E);
var e = new E("E", 1);
var f = new F("F");
f.displayName(); // Display "F"
