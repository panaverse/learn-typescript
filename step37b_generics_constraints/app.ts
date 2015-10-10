//Generic Constraints
//You may sometimes want to write a generic that works only on a set of types where you have some knowledge about what capabilities

class MyObject {
    name: string
}


class Container<T extends MyObject>
{
    private _array: T[];
    
    constructor(){
        this._array = [];
    }
    
    add(item: T){
        this._array.push(item);
        console.log(item.name);
    }
    
    print(){
        this._array.forEach((value: T)=>console.log(value.name));
    }
}

//let c = new Container<string>();//Error
//let c1 = new Container<number>();//Error

class MyObject2 extends MyObject{
    doSomething(){
        console.log(this.name + " did it");
    }
}

let obj = new MyObject2();
obj.name = "Hira";

let cont = new Container<MyObject2>();
cont.add(obj);



