function add(x: number, y: number): number {//Named function
    return x+y;
}

var myAdd1 = function(x: number, y: number): number { //Anonymous function
				return x+y; 
			};

var myAdd2: (x:number, y:number)=>number = 	function(x: number, y: number): number { //Anonymous function with type
												return x+y; 
											};
											
var myAdd3: (baseValue:number, increment:number)=>number = 	function(x: number, y: number): number { //type names dont matter
																return x+y; 
															};
											
						