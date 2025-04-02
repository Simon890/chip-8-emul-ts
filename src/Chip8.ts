import { Config } from "./Config";
import { EVENT_INSTRUCTION, EVENT_KEY_PRESSED, EVENT_MEMORY_UPDATED } from "./constants/eventsConstants";
import { START_PROGRAM_ADDRESS, STRIPE_HEIGHT } from "./constants/memoryConstants";
import { Display } from "./Display";
import { Dissasembler } from "./Dissasembler";
import { EventHandler } from "./EventEmitter";
import { Keyboard } from "./Keyboard";
import { Memory } from "./Memory";
import { Register } from "./Register";
import { PartialConfigObject } from "./types";

export class Chip8 {
    
    private _memory : Memory;

    private _display : Display;

    private _keyboard : Keyboard;

    private _register: Register;

    private _dissasembler : Dissasembler;

    private _isPaused : boolean;

    private _eventHandler : EventHandler;

    constructor(config : PartialConfigObject) {
        Config.init(config);
        this._eventHandler = EventHandler.instance;
        this._memory = new Memory();
        this._display = new Display(this._memory);
        this._register = new Register();
        this._keyboard = new Keyboard();
        this._dissasembler = new Dissasembler();
        this._isPaused = false;
    }

    public loadRom(rom : ArrayLike<number>) {
        this._memory.loadRom(rom);
        this._register.PC = START_PROGRAM_ADDRESS;
    }

    public run() {
        this._asyncRun();
    }

    private async _asyncRun() {
        while(true) {
            for (let i = 0; i < Config.values.instructionsPerIteration; i++) {
                this._runOpcode();
            }
            await this._sleep();
        }
    }

    private _sleep() {
        return new Promise((resolve) => setTimeout(resolve, 0.05));
    }

    private _runOpcode() {
        if(this._isPaused) {
            return;
        }
        if(this._register.delayTimer > 0) {
            this._register.delayTimer--;
        }
        if(this._register.soundTimer > 0) {
            this._register.soundTimer--;
        }
        const opcode = this.memory.getOpcode(this._register.PC);
        this._register.advance();
        const {instruction, args} = this._dissasembler.dissasemble(opcode);
        
        this._eventHandler.emit(EVENT_INSTRUCTION, opcode, instruction, args, this._register.PC);

        if(instruction.id == "CLS") {
            this.display.clear();
        }
        if(instruction.id == "RET") {
            this._register.PC = this._register.stack.pop();
        }
        if(instruction.id == "SYS_ADDR") {
            this._register.PC = args[0];
        }
        if(instruction.id == "JP_ADDR") {
            this._register.PC = args[0];
        }
        if(instruction.id == "CALL_ADDR") {
            this._register.stack.push(this._register.PC);
            this._register.PC = args[0];
        }
        if(instruction.id == "SE_VX_KK") {
            const vx = this._register.V[args[0]];
            const kk = args[1];
            if(vx == kk) {
                this._register.advance();
            }
        }
        if(instruction.id == "SNE_VX_KK") {
            const vx = this._register.V[args[0]];
            const kk = args[1];
            if(vx != kk) {
                this._register.advance();
            }
        }
        if(instruction.id == "SE_VX_VY") {
            const vx = this._register.V[args[0]];
            const vy = this._register.V[args[1]];
            if(vx == vy) {
                this._register.advance();
            }
        }
        if(instruction.id == "LD_VX_KK") {
            this._register.V[args[0]] = args[1];
        }
        if(instruction.id == "ADD_VX_KK") {
            this._register.V[args[0]] += args[1];
        }
        if(instruction.id == "LD_VX_VY") {
            this._register.V[args[0]] = this._register.V[args[1]];
        }
        if(instruction.id == "OR_VX_VY") {
            this._register.V[args[0]] |= this._register.V[args[1]];
        }
        if(instruction.id == "AND_VX_VY") {
            this._register.V[args[0]] &= this._register.V[args[1]];
        }
        if(instruction.id == "XOR_VX_VY") {
            this._register.V[args[0]] ^= this._register.V[args[1]];
        }
        if(instruction.id == "ADD_VX_VY") {
            const vx = this._register.V[args[0]];
            const vy = this._register.V[args[1]];
            const sum = vx + vy;
            this._register.V[args[0]] = sum & 0xff;
            if(sum > 0xff) {
                this._register.V[0x0f] = 1;
            } else {
                this._register.V[0x0f] = 0;
            }
        }
        if(instruction.id == "SUB_VX_VY") {
            const vx = this._register.V[args[0]];
            const vy = this._register.V[args[1]];
            const sub = vx - vy;
            this._register.V[args[0]] = sub;
            if(vx > vy) {
                this._register.V[0x0f] = 1;
            } else {
                this._register.V[0x0f] = 0;
            }
        }
        if(instruction.id == "SHR_VX_VY") {
            const vx = this._register.V[args[0]];
            const leastBit = vx & 0x01;
            this._register.V[0x0f] = leastBit;
            this._register.V[args[0]] >>= 1;
        }
        if(instruction.id == "SUBN_VX_VY") {
            const vx = this._register.V[args[0]];
            const vy = this._register.V[args[1]];
            const sub = vy - vx;
            if(vy > vx) {
                this._register.V[0x0f] = 1;
            } else {
                this._register.V[0x0f] = 0;
            }
            this._register.V[args[0]] = sub;
        }
        if(instruction.id == "SHL_VX_VY") {
            const vx = this._register.V[args[0]];
            const leastBit = (vx & 0x80) >> 7;
            this._register.V[0x0f] = leastBit;
            this._register.V[args[0]] <<= 1;
        }
        if(instruction.id == "SNE_VX_VY") {
            const vx = this._register.V[args[0]];
            const vy = this._register.V[args[1]];
            if(vx != vy) {
                this._register.advance();
            }
        }
        if(instruction.id == "LD_I_ADDR") {
            this._register.I = args[0];
        }
        if(instruction.id == "JP_V0_ADDR") {
            this._register.PC = args[0] + this._register.V[0];
        }
        if(instruction.id == "RND_VX_KK") {
            const rand = Math.floor(Math.random() * 255) & args[1];
            this._register.V[args[0]] = rand;
        }
        if(instruction.id == "DRW_VX_VY_N") {
            const vx = this._register.V[args[0]];
            const vy = this._register.V[args[1]];
            const spriteAddress = this._register.I;
            const count = args[2];
            const collision = this.display.drawSprite(
                vx, vy, spriteAddress, count
            );
            this._register.V[0x0f] = collision;
        }
        if(instruction.id == "SKP_VX") {
            const vx = this._register.V[args[0]];
            if(this._keyboard.isKeyDown(vx)) {
                this._register.advance();
                this._eventHandler.emit(EVENT_KEY_PRESSED, vx);
            }
        }
        if(instruction.id == "SKNP_VX") {
            const vx = this._register.V[args[0]];
            if(!this.keyboard.isKeyDown(vx)) {
                this._register.advance();
            }
        }
        if(instruction.id == "LD_VX_DT") {
            this._register.V[args[0]] = this._register.delayTimer;
        }
        if(instruction.id == "LD_VX_K") {
            this._isPaused = true;
            this._keyboard.addListener("keydown", (key : number) => {
                if(this._isPaused) {
                    this._register.V[args[0]] = key;
                    this._isPaused = false;
                    this._eventHandler.emit(EVENT_KEY_PRESSED, key);
                }
            });
        }
        if(instruction.id == "LD_DT_VX") {
            this._register.delayTimer = this._register.V[args[0]];
        }
        if(instruction.id == "LD_ST_VX") {
            this._register.soundTimer = this._register.V[args[0]];
        }
        if(instruction.id == "ADD_I_VX") {
            this._register.I += this._register.V[args[0]];
        }
        if(instruction.id == "LD_F_VX") {
            this._register.I = this._register.V[args[0]] * STRIPE_HEIGHT;
        }
        if(instruction.id == "LD_B_VX") {
            let vx = this._register.V[args[0]];
            const hundreds = Math.floor(vx / 100);
            vx = vx - hundreds * 100;
            const tens = Math.floor(vx / 10);
            const ones = vx - tens * 10;
            this._memory.setMemory(this._register.I, hundreds);
            this._memory.setMemory(this._register.I + 1, tens);
            this._memory.setMemory(this._register.I + 2, ones);
        }
        if(instruction.id == "LD_I_VX") {
            for (let i = 0; i <= args[0]; i++) {
                this._memory.setMemory(this._register.I + i, this._register.V[i]);
            }
        }
        if(instruction.id == "LD_VX_I") {
            for (let i = 0; i <= args[0]; i++) {
                this._register.V[i] = this._memory.getMemory(this._register.I + i);
            }
        }
    }

    public get events() {
        return {
            on: this._eventHandler.on.bind(this._eventHandler),
            off: this._eventHandler.off.bind(this._eventHandler)
        }
    }

    public get display() {
        return this._display;
    }

    public get memory() {
        return this._memory;
    }

    public get keyboard() {
        return this._keyboard;
    }

    public get config() {
        return Config.values;
    }
}