import { InputHandler } from "./inputHandler";

export class Engine {
    inputHandler: InputHandler;

    constructor() {
        this.inputHandler = new InputHandler();
    }

    public start(): void {
        this.inputHandler.inputEventListener();
    }

}