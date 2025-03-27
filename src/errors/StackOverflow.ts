export class StackOverflow extends Error {
    constructor(index : number) {
        super("Stack overflow. Stack has a size of 16 16-bit values. Trying to access position:" + index);
    }
}