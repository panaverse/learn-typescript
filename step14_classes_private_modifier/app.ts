//In TypeScript, each member is public by default.

class Animal {
    private name:string;
    constructor(theName: string) { this.name = theName; }
    move(meters: number) {
        alert(this.name + " moved " + meters + "m.");
    }
}

var a = new Animal("cat").name;
console.log(a);