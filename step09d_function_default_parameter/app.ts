//Named function with optional and default parameters
//(Note that the parameter type will be optional when used with default value)
function buildName(firstName: string, lastName = "Khan") : string {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  //works correctly because last parameter is optional
let result2 = buildName("Bob", "Adams", "Sr.");  //error, too many parameters
let result3 = buildName("Bob", "Adams");  //correct



//anonymous function type with defult parameters 
//(Note that the parameter type will be optional when used with defult value)
let buildName1 : (firstName: string, lastName?: string) => string = 
function(firstName: string, lastName = "Khan") : string {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
											
						