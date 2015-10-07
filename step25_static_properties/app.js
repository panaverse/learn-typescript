//Please note that in each instance accesses this static value through prepending the name of the class. 
//Similarly to prepending 'this.' in front of instance accesses, here we prepend 'Grid.' in front of static accesses.
var Grid = (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
})();
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
//You can also have static methods
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.foo = function () {
        console.log("foo");
    };
    return MyClass;
})();
MyClass.foo();
