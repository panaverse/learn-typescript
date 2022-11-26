[For the latest docs](https://www.typescriptlang.org/docs/)


Hello World Steps:

1. Install Node.js from https://nodejs.org/

2. Install TypeScript 4.9+ using Node Package Manager command (https://www.typescriptlang.org/download):  

			npm install -g typescript

3. Install VSCode from https://code.visualstudio.com/Download

4. Read: https://bobbyhadz.com/blog/typescript-generate-tsconfig-json

5. Read: https://www.typescripttutorial.net/typescript-tutorial/typescript-hello-world/

6. Generate tsconfig.json by giving this command:

		tsc --init

If you want to run TypeScript tsc command in Windows Powershell:

1. Open Powershell in Adminstrator mode
2. Run command: 

		Set-ExecutionPolicy RemoteSigned

Policy updated and now you can run tsc command in powershell.

[For more Details Check this out](https://islenmisveri.wordpress.com/2021/01/31/working-with-scripts-in-powershell-typescript-compiler-tsc-problem-fix/)


7. Make it a Node.js project by giving the following command:

		npm init -y

8. Install types for Node.js

		npm i @types/node -D

9. Create .gitignore file


10. Create file app.ts

We have used string type to store and print the message.

Note that the most basic types in TypeScript correspond to the seven basic kinds of primitives in JavaScript:

	1. null
	2. undefined
	3. boolean // true or false
	4. string // "", "Hello World"
	5. number // 0, 5.1, -9
	6. bigint // 0n, 5n, -10n
	7. symbol // Symbol(), Symbol("hi"),

9. Transpile JavaScript by running:

		tsc

10. Run transpiled javascript by running the following command:

		node app

		
Also Read:
https://code.visualstudio.com/Docs/languages/typescript

## [Watch Learn TypeScript – Full Video Tutorial by freeCodeCamp.org
](https://www.youtube.com/watch?v=30LWjhZzg50)
