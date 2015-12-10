//Execution of a generator is paused till the next iteration is invoked

function *generatorFn(): string{
    //first task
    yield "firstValue";
 
    //second task
    yield "secondValue";
 
    //third task
    yield "thirdValue";
}


var generator = generatorFn();
var next = generator.next();
while(!next.done){
    console.log(next.value);
    next=generator.next();
}

