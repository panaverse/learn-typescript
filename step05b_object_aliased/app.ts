// anonymous

let teacher : {name: string, exp: number} = {
    name: "Zeeshan",
    exp: 10
}

// Aliased Object Type
type Student = {
    name: string,
    age?: number
}

let student: Student = {
    name: "Hira",
    age: 30
}

console.log(student["name"]);
console.log(student.age);

// Interfaces

interface Manager {
    name: string,
    subordiates?: number
}

let storeManager: Manager = {
    name: "Bilal"
}

        
