let myname: unknown = "Zia";
console.log((myname as string).length);
console.log((<string> myname).length)

