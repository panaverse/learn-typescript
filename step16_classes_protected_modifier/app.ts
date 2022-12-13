//protected keyword allows subclasses to gain visibility into the
// parent class without exposing this API to other parts of the code.

class ListString {
    private contents: string[];
    constructor() {
        this.contents = [];
    }
    protected setElement(index: number, item: string) {
        this.contents[index] = item;
    }

}

class StackString extends ListString {
    currentIndex: number;

    constructor() {
        super();
        this.currentIndex = 0;
    }

    public push(item: string) {
        this.setElement(this.currentIndex, item);
        this.currentIndex++;
    }
}

var stack = new StackString();
//stack.setElement(0, 1); // error 'setElement' is protected and only visible to subclasses 