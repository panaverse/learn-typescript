//Type aliases are exactly the same as their original types; they are simply alternative names.

type StringNumberOrBoolean = string | number | boolean;
type PrimitiveArray = Array<string|number|boolean>;
type MyNumber = number;
type Callback = () => void;
type CallbackWithString = (string) => void;

//You can use type aliases any where you can use a type

function work(x: StringNumberOrBoolean){
    
}

function usingCallback(f: CallbackWithString){
    f("This is a string");
}
