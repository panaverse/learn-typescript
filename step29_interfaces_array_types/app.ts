//We can use interfaces to describe an array also, please note this is different from Java or C# 
//where we can only use interfaces to describe class types.

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];

var first = myArray[0];

//Array types have an 'index' type that describes the types allowed to index the object, 
//along with the corresponding return type for accessing the index.

//There are two types of supported index types: string and number.
//Index signatures are a powerful way to describe the array and 'dictionary' pattern
//array pattern is demonstrated above, dictinary is as follows:

interface Dictionary {
  [index: string]: string;
} 

let myDictionary: Dictionary = {"first": "Bob", "second": "Fred"};

var first = myDictionary["first"];

//It is possible to support both types of index, 
//with the restriction that the type returned from the numeric index must be a subtype of the type returned from the string index.


