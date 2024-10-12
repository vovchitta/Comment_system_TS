"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
var InputHandler_1 = require("../entities/InputHandler");
var Engine = /** @class */ (function () {
    function Engine() {
        this.inputHandler = new InputHandler_1.InputHandler();
    }
    Engine.prototype.start = function () {
        this.inputHandler.inputEventListener();
    };
    return Engine;
}());
exports.Engine = Engine;
