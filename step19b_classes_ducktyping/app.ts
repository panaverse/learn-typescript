//A confusion about Structural Typing:

class Human {
    
    name: string;
    
    constructor(name: string){
        this.name = name;
    }
}

class Animal {
    name: string;
    age: number;
    
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    eat(){
        console.log(this.name + " is a Human and is eating");
    }
}

let h1 = new Human("");
let a1 = new Animal("world", 50);
h1 = new Animal("test", 25);//this is working, but it should not because it is a fresh object with extra properties
a1 = new Human("zeeshan");//ERROR

//my common sense is saying this is correct, but?

let a = {name: "Zia"};
a = {name: "Zeeshan", age: 22};//ERROR

//It seems that for object literals there is a rule for fresh objects
//but this rules does not apply to normal objects derived from classes 