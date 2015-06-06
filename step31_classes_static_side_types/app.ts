//When working with classes and interfaces, it helps to keep in mind that a class has two types: 
//the type of the static side and the type of the instance side. 

//Lets us define a interface that defines a constructor

interface ClockInterface {
    new (hour: number, minute: number);//this defines a constructor signature
}

//Please note that the constructor sits in the static side, it cannot be implemented:

//You may notice that if you create an interface with a construct signature and try to create a class that implements this interface you get an error:

/* uncomment to see
class Clock1 implements ClockInterface  {
    currentTime: Date;
    constructor(h: number, m: number) { }
}*/

//Instead, you would need to work with the 'static' side of the class directly. In this example, we work with the class directly:

interface ClockStatic {
    new (hour: number, minute: number);
}

class Clock  {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

var cs: ClockStatic = Clock;
var newClock = new cs(7, 30);








