interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

var square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.a = 5;//Error


//An interface can extend multiple interfaces, creating a combination of all of the interfaces:

interface PenStroke {
    penWidth: number;
}

interface Square1 extends Shape, PenStroke {
    sideLength: number;
}

var square1 = {} as Square1;//Alternative syntax for casting
square1.color = "blue";
square1.sideLength = 10;
square1.penWidth = 5.0;







