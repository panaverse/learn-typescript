//We can use interfaces to describe an array also, please note this is different from Java or C# 
//where we can only use interfaces to describe class types.
var myArray = ["Bob", "Fred"];
var first = myArray[0];
var myDictionary = { "first": "Bob", "second": "Fred" };
var first = myDictionary["first"];
//It is possible to support both types of index, 
//with the restriction that the type returned from the numeric index must be a subtype of the type returned from the string index.
//# sourceMappingURL=app.js.map