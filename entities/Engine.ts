import { InputHandler } from "../entities/InputHandler";

export class Engine {
    inputHandler: InputHandler;

    constructor() {
        this.inputHandler = new InputHandler();
    }

    public start(): void {
        this.inputHandler.inputEventListener();
    }

}