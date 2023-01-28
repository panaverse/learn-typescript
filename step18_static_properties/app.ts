//Please note that in each instance accesses this static value 
//through prepending the name of the class. 
//Similarly to prepending 'this.' in front of instance accesses, 
//here we prepend 'MyClass.' in front of static accesses.
//Static values belog to the class (only one value) not the instances.

class MyClass {
    static x = 0;
    static printX() {
      console.log(MyClass.x);
    }
  }
  console.log(MyClass.x);
  MyClass.printX();