//In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is 'generics', that is,
//being able to create a component that can work over a variety of types rather than a single one. 
//This allows users to consume these components and use their own types.
var Container = (function () {
    function Container() {
        this._array = [];
    }
    Container.prototype.add = function (item) {
        this._array.push(item);
    };
    return Container;
})();
var c = new Container();
var c1 = new Container();
