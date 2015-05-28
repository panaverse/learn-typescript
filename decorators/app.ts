///<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>

import "reflect-metadata";

function MyClassDecorator(value: string) {
  return function (target: Function) {
      Reflect.defineMetadata("MyClassDecorator", value, target);
  }
}

@MyClassDecorator("my metadata")
class MyClass { }

var myClass = new MyClass();
let value: string = Reflect.getMetadata("MyClassDecorator", myClass.constructor);
console.log(value); // outputs "my metadata"