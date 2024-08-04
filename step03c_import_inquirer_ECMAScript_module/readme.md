# Using Native ECMAScript Modules in Node.js

# Using Inquirer Package

The latest version (9+) of [Inquirer](https://github.com/SBoudrias/Inquirer.js/) has start using Native ECMA Script Packages. In most of our projects and assignment we will use this package.
Note: Inquirer versions 10+ are incompatible with how we use inquirer.prompt(). Version 10.0.0 gives error on using prompted variable as it has type unknown, and 10.1.0+ do not support our prompt usage entirely.
Give the following command:

        npm i inquirer@9.0.0

        npm i --save-dev @types/inquirer

Add .gitignore file and Write your code in app.ts file.

Give the following commands:

        tsc

        node app.js
