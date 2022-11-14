# Syntax Error

		tsc app.ts

The Output:

		app.ts:2:9 - error TS2551: Property 'loger' does not exist on type 'Console'. Did you mean 'log'?

		2 console.loger(message);
          ~~~~~

  		../../../../../../usr/local/lib/node_modules/typescript/lib/lib.dom.d.ts:17095:5
    	17095     log(...data: any[]): void;
              ~~~~~~~~~~~~~~~~~~~~~~~~~~
    	'log' is declared here.


		Found 1 error in app.ts:2




Note that .js file has been generated but it is not valid.

