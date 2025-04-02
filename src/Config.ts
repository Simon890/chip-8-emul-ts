import { BG_COLOR, PIXEL_COLOR } from "./constants/displayConstants";
import { ConfigObject, PartialConfigObject } from "./types";

export class Config {
    
    private static _configObject : ConfigObject

    public static init(configObject : PartialConfigObject) {
        this._configObject = {
            canvas: "canvas",
            instructionsPerIteration: 3,
            pixelOnColor: PIXEL_COLOR,
            pixelOffColor: BG_COLOR,
            ...configObject
        };
    }

    public static get values() {
        return this._configObject;
    }


}