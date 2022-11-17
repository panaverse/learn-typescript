//In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is 'generics', that is,
//being able to create a component that can work over a variety of types rather than a single one. 
//This allows users to consume these components and use their own types.


class Container<T>
{
    private _array: T[];
    
    constructor(){
        this._array = [];
    }
    
    add(item: T){
        this._array.push(item);
    }
}

let c = new Container<string>();
let c1 = new Container<number>();



