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