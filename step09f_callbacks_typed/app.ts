function myCallBack(text: string) {
    console.log("inside myCallback " + text);
}

function callingFunction(initialText: string, callback: (text: string) => void)
{
    callback(initialText);
}

callingFunction("myText", myCallBack);

