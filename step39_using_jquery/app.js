/// <reference path="typings/tsd.d.ts" />
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
})();
function greeter(person) {
    return "Hello " + person.name + ", now you are using jQuery with TypeScript";
}
var person = new Person("Zeeshan");
$(document).ready(function () {
    var message = greeter(person);
    $("#status")[0].innerHTML = message;
});
