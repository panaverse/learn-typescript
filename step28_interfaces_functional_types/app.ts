//We can use interfaces to describe function types, please note this is different from Java or C# 
//where we can only use interfaces to describe class types.

//We are defining a interface with a single function, any function with the same signature will have this type 

interface SearchFunc {
  (source: string, subString: string): boolean;
}


var mySearch: SearchFunc = function(src: string, sub: string) {
                              var result = src.search(sub);
                              if (result == -1) {
                                return false;
                              }
                              else {
                                return true;
                              }
                           };
                           
  //For function types to correctly type-check, the name of the parameters do not need to match. 
  //Function parameters are checked one at a time, with the type in each corresponding parameter position checked against each other. 

