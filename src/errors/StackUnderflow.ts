export class StackUnderflow extends Error {
    constructor(index : number) {
        super("Stack underflow. Stack has a size of 16 16-bit values. Trying to access position: " + index)
    }
}