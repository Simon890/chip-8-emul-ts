import { MEMORY_SIZE } from "../constants/memoryConstants";

export class MemoryOutOfBounds extends Error {
    constructor(index : number) {
        super(`Error trying to access memory at position '${index}'. Position must be between 0 (included) and ${MEMORY_SIZE} (excluded)`)
    }
}