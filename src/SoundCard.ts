export class SoundCard {

    private _soundEnabled : boolean = false;
    private _oscilator! : OscillatorNode;
    private _masterGain! : GainNode;
    private _audioContext! : AudioContext;

    constructor() {
        if("AudioContext" in window || "webkitAudioContext" in window) {
            this._audioContext = new (AudioContext || (window as any).webkitAudioContext as AudioContext)();
            this._masterGain = new GainNode(this._audioContext);
            this._masterGain.gain.value = 0.3;
            this._masterGain.connect(this._audioContext.destination);
            this._oscilator = new OscillatorNode(this._audioContext, {
                type: "square"
            });
        }
    }

    public enableSound() {
        if(this._soundEnabled) return;
        this._soundEnabled = true;
        this._oscilator.connect(this._masterGain);
        this._oscilator.start();
    }

    public disableSound() {
        if(!this._soundEnabled) return;
        this._oscilator.stop();
    }

}