export type Instruction = {
    id: string,
    name: string,
    mask: number,
    pattern: number,
    params: Mask[],
}

export type Mask = {
    mask: number,
    shift: number
}

export type DissasembledInstruction = {
    instruction: Instruction,
    args: number[]
}

export type ConfigObject = {
    canvas: string,
    instructionsPerIteration: number,
    pixelOnColor: string,
    pixelOffColor: string,
}

export type PartialConfigObject = Partial<ConfigObject>