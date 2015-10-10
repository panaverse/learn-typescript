///<reference path="node_modules\reflect-metadata\reflect-metadata.d.ts"/>

//http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4
//Teaches how to allow developers to pass arguments to a decorator when it is consumed.


import "reflect-metadata";

function logType(target : any, key : string) {
      var t = Reflect.getMetadata("design:type", target, key);
      console.log(`${key} type: ${t.name}`);
    }


class Demo{ 
      @logType // apply property decorator
      public attr1 : string;
    }