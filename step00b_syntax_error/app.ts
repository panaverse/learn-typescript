// A syntax error in TypeScript occurs when the code you write does not follow the rules and structure of the language. These errors are detected during the compilation or parsing phase before the code is executed.

let myName: string = "unknown person"

console.log(myName.toUppercase()) //TypeScript throws syntax error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?

console.loger(myName); //TypeScript throws syntax error: Property 'loger' does not exist on type 'Console'. Did you mean 'log'?
        
