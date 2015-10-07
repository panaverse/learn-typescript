//Please note that in each instance accesses this static value through prepending the name of the class. 
//Similarly to prepending 'this.' in front of instance accesses, here we prepend 'Grid.' in front of static accesses.

class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

var grid1 = new Grid(1.0);  // 1x scale
var grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

//You can also have static methods

class MyClass{
    static foo(){
        console.log("foo");
    }
}

MyClass.foo();