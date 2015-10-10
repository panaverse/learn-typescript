/// <reference path="typings/tsd.d.ts" />

class Person {

  constructor(name:string)
	{
		this.name=name;
	}
	name: string;
}

function greeter (person:Person){
	return "Hello "+ person.name + ", now you are using jQuery with TypeScript";
}

var person = new Person("Zeeshan");


$(document).ready(function(){
    var message = greeter(person);
    $("#status")[0].innerHTML=message;
});
