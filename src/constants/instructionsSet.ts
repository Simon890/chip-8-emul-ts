import { Instruction, Mask } from "../types"

export const MASK_NNN : Mask = {
    mask: 0x0fff,
    shift: 0
}
export const MASK_N : Mask = {
    mask: 0x000f,
    shift: 0
}
export const MASK_X : Mask = {
    mask: 0x0f00,
    shift: 8
}
export const MASK_Y : Mask = {
    mask: 0x00f0,
    shift: 4
}
export const MASK_KK : Mask = {
    mask: 0x00ff,
    shift: 0,
}

export const INSTRUCTIONS_SET : Instruction[] = [
    {
        id: "CLS",
        name: "CLS",
        mask: 0xffff,
        pattern: 0x00e0,
        params: []
    },
    {
        id: "RET",
        name: "RET",
        mask: 0xffff,
        pattern: 0x00ee,
        params: []
    },
    {
        id: "SYS_ADDR",
        name: "SYS",
        mask: 0xf000,
        pattern: 0x0000,
        params: [MASK_NNN]
    },
    {
        id: "JP_ADDR",
        name: "JP",
        mask: 0xf000,
        pattern: 0x1000,
        params: [MASK_NNN]
    },
    {
        id: "CALL_ADDR",
        name: "CALL",
        mask: 0xf000,
        pattern: 0x2000,
        params: [MASK_NNN]
    },
    {
        id: "SE_VX_KK",
        name: "SE",
        mask: 0xf000,
        pattern: 0x3000,
        params: [MASK_X, MASK_KK]
    },
    {
        id: "SNE_VX_KK",
        name: "SNE",
        mask: 0xf000,
        pattern: 0x4000,
        params: [MASK_X, MASK_KK]
    },
    {
        id: "SE_VX_VY",
        name: "SE",
        mask: 0xf000,
        pattern: 0x5000,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "LD_VX_KK",
        name: "LD",
        mask: 0xf000,
        pattern: 0x6000,
        params: [MASK_X, MASK_KK]
    },
    {
        id: "ADD_VX_KK",
        name: "ADD",
        mask: 0xf000,
        pattern: 0x7000,
        params: [MASK_X, MASK_KK]
    },
    {
        id: "LD_VX_VY",
        name: "LD",
        mask: 0xf00f,
        pattern: 0x8000,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "OR_VX_VY",
        name: "OR",
        mask: 0xf00f,
        pattern: 0x8001,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "AND_VX_VY",
        name: "AND",
        mask: 0xf00f,
        pattern: 0x8002,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "XOR_VX_VY",
        name: "XOR",
        mask: 0xf00f,
        pattern: 0x8003,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "ADD_VX_VY",
        name: "ADD",
        mask: 0xf00f,
        pattern: 0x8004,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "SUB_VX_VY",
        name: "SUB",
        mask: 0xf00f,
        pattern: 0x8005,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "SHR_VX_VY",
        name: "SHR",
        mask: 0xf00f,
        pattern: 0x8006,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "SUBN_VX_VY",
        name: "SUBN",
        mask: 0xf00f,
        pattern: 0x8007,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "SHL_VX_VY",
        name: "SHL",
        mask: 0xf00f,
        pattern: 0x800e,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "SNE_VX_VY",
        name: "SNE",
        mask: 0xf00f,
        pattern: 0x9000,
        params: [MASK_X, MASK_Y]
    },
    {
        id: "LD_I_ADDR",
        name: "LD",
        mask: 0xf000,
        pattern: 0xa000,
        params: [MASK_NNN]
    },
    {
        id: "JP_V0_ADDR",
        name: "JP",
        mask: 0xf000,
        pattern: 0xb000,
        params: [MASK_NNN]
    },
    {
        id: "RND_VX_KK",
        name: "RND",
        mask: 0xf000,
        pattern: 0xc000,
        params: [MASK_X, MASK_KK]
    },
    {
        id: "DRW_VX_VY_N",
        name: "DRW",
        mask: 0xf000,
        pattern: 0xd000,
        params: [MASK_X, MASK_Y, MASK_N]
    },
    {
        id: "SKP_VX",
        name: "SKP",
        mask: 0xf0ff,
        pattern: 0xe09e,
        params: [MASK_X]
    },
    {
        id: "SKNP_VX",
        name: "SKNP",
        mask: 0xf0ff,
        pattern: 0xe0a1,
        params: [MASK_X]
    },
    {
        id: "LD_VX_DT",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf007,
        params: [MASK_X]
    },
    {
        id: "LD_VX_K",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf00a,
        params: [MASK_X]
    },
    {
        id: "LD_DT_VX",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf015,
        params: [MASK_X]
    },
    {
        id: "LD_ST_VX",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf018,
        params: [MASK_X]
    },
    {
        id: "ADD_I_VX",
        name: "ADD",
        mask: 0xf0ff,
        pattern: 0xf01e,
        params: [MASK_X]
    },
    {
        id: "LD_F_VX",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf029,
        params: [MASK_X]
    },
    {
        id: "LD_B_VX",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf033,
        params: [MASK_X]
    },
    {
        id: "LD_I_VX",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf055,
        params: [MASK_X]
    },
    {
        id: "LD_VX_I",
        name: "LD",
        mask: 0xf0ff,
        pattern: 0xf065,
        params: [MASK_X]
    }
]