//Anonymously-typed var

declare var MyPoint: { x: number; y: number; };



//Interfaced-typed var

interface SomePoint { x: number; y: number; }
declare var MyPoint1: SomePoint;


//From a consumption side the above declarations are identical, but the type SomePoint can be extended through interface merging:

interface SomePoint { z: number; }

//Whether or not you want your declarations to be extensible in this way is a bit of a judgement call. 
//As always, try to represent the intent of the library.