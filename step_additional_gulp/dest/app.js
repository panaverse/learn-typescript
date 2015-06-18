var Hello = (function () {
    function Hello() {
    }
    Hello.prototype.print = function () {
        console.log("Hello Gulp");
    };
    return Hello;
})();
var h = new Hello();
h.print();
