//One of the most common uses of interfaces in languages like C# and Java, 
//that of explicitly enforcing that a class meets a particular contract, is also possible in TypeScript.
var Clock = (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
})();
//Interfaces describe the public side of the class, rather than both the public and private side. 
//This prohibits you from using them to check that a class also has particular types for the private side of the class instance.
