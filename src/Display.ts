import { BG_COLOR, DISPLAY_HEIGHT, DISPLAY_SCALAR, DISPLAY_WIDTH, PIXEL_COLOR } from "./constants/displayConstants";
import { Memory } from "./Memory";

export class Display {

    private _memory : Memory
    private _screen : HTMLCanvasElement;
    private _context : CanvasRenderingContext2D;
    private _frameBuffer : Array<Array<number>> = [];

    constructor(memory : Memory) {
        this._memory = memory;
        const screen = document.querySelector("canvas");
        if(screen == null) throw new Error("Canvas not found");
        this._screen = screen;
        this._screen.width = DISPLAY_WIDTH * DISPLAY_SCALAR;
        this._screen.height = DISPLAY_HEIGHT * DISPLAY_SCALAR;
        this._context = this._screen.getContext("2d")!;
        this._context.fillStyle = BG_COLOR;
        this.clear();
    }

    public clear() {
        this._frameBuffer = [];
        for (let i = 0; i < DISPLAY_WIDTH; i++) {
            this._frameBuffer.push([]);
            for (let j = 0; j < DISPLAY_HEIGHT; j++) {
                this._frameBuffer[i].push(0);
            }
        }
        this._context.fillRect(0, 0, this._screen.width, this._screen.height);
        this._drawBuffer();
    }

    private _drawBuffer() {
        for (let w = 0; w < DISPLAY_WIDTH; w++) {
            for (let h = 0; h < DISPLAY_HEIGHT; h++) {
                this.drawPixel(w, h, this._frameBuffer[w][h]);
            }
        }
    }

    public drawPixel(w : number, h : number, value : number) {
        this._context.fillStyle = value > 0 ? PIXEL_COLOR : BG_COLOR;
        this._context.fillRect(w * DISPLAY_SCALAR, h * DISPLAY_SCALAR, DISPLAY_SCALAR, DISPLAY_SCALAR);
    }
}