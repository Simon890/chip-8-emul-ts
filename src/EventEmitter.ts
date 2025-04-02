export class EventHandler {

    private _events : Map<string, Function[]>

    private static _eventHandler : EventHandler;

    private constructor() {
        this._events = new Map();
    }

    public static get instance() {
        if(this._eventHandler == null) {
            this._eventHandler = new EventHandler();
        }
        return this._eventHandler;
    }

    public on(event : string, listener : Function) {
        if(!this._events.has(event)) {
            this._events.set(event, []);
        }
        this._events.get(event)!.push(listener);
    }

    public off(event : string, listener : Function) {
        if(this._events.has(event)) {
            this._events.set(event, this._events.get(event)!.filter(l => l != listener));
        }
    }

    public emit(event : string, ...args : any[]) {
        this._events.get(event)?.forEach(listener => listener(...args));
    }

}