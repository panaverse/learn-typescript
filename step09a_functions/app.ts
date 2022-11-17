//Note: All parameters are required

//Named function
function add(x: number, y: number): number {
    return x+y;
}

//Anonymous function
let myAdd1 = function(x: number, y: number): number { 
				return x+y; 
};


//Anonymous function with explict type
let myAdd2: (x:number, y:number)=>number = 	function(x: number, y: number): number { 
												return x+y; 
											};

//type names dont matter
let myAdd3: (baseValue:number, increment:number)=>number = 	function(x: number, y: number): number { 
																return x+y; 
															};
//Lambda functions															
let myAdd4 = (a : number, b : number) => a + b;
//output will be: var myAdd4 = function(a : number, b : number) {return a + b};

type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
	//....
}


											
						