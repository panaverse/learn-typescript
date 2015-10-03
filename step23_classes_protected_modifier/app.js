//protected keyword allows subclasses to gain visibility into the parent class without exposing this API to other parts of the code.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListString = (function () {
    function ListString() {
        this.contents = [];
    }
    ListString.prototype.setElement = function (index, item) {
        this.contents[index] = item;
    };
    return ListString;
})();
var StackString = (function (_super) {
    __extends(StackString, _super);
    function StackString() {
        _super.call(this);
        this.currentIndex = 0;
    }
    StackString.prototype.push = function (item) {
        this.setElement(this.currentIndex, item);
        this.currentIndex++;
    };
    return StackString;
})(ListString);
var stack = new StackString();
//stack.setElement(0, 1); // error 'setElement' is protected and only visible to subclasses  
