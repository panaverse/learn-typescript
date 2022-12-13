//TypeScript supports getters/setters as a way of intercepting 
//accesses to a member of an object, thus allowing Encapsulation
//This gives you a way of having finer-grained control over how a 
//member is accessed on each object.

//Encapsulation is the packing of data and functions into a single 
//component. 
//It allows selective hiding of properties and methods in an 
//object by building an impenetrable wall to protect the code
// from accidental corruption.

var passcode = "secret passcode";

class Employee {
    private _fullName: string | undefined;

    get fullName(): string | undefined {
        return this._fullName;
    }
	
    set fullName(newName: string | undefined) {
        this._fullName = newName;
    }
}

var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

