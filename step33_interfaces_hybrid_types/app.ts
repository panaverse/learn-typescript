//An example of hybrid type is an object that acts as both a function and an object, with additional properties:

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

var c: Counter;
c(10);
c.reset();
c.interval = 5.0;


//When interacting with 3rd-party JavaScript, you may need to use patterns like the above to fully-describe the shape of the type.