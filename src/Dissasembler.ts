import { INSTRUCTIONS_SET } from "./constants/instructionsSet";
import { InstructionNotFound } from "./errors/InstructionNotFound";
import { DissasembledInstruction } from "./types";

export class Dissasembler {
    public dissasemble(opcode : number) : DissasembledInstruction {
        const instruction = INSTRUCTIONS_SET.find(inst => (opcode & inst.mask) == inst.pattern);
        if(instruction == null) throw new InstructionNotFound(opcode);
        const args = instruction.params.map(param => (opcode & param.mask) >> param.shift);
        return {
            instruction,
            args
        }
    }
}