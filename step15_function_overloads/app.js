//overloads give us type-checked calls 
//In the first example we have the same return type
function add(arg1, arg2) {
    return arg1 + arg2;
}
//Calling 'add' with any other parameter types would cause an error except for the three options
add(1, 2);
add("Hello", "World");
add(true, false);
//In the example below we have different return types for different options 
//# sourceMappingURL=app.js.map