"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
var inputHandler_1 = require("./inputHandler");
var Engine = /** @class */ (function () {
    function Engine() {
        this.inputHandler = new inputHandler_1.InputHandler();
    }
    Engine.prototype.start = function () {
        this.inputHandler.inputEventListener();
    };
    return Engine;
}());
exports.Engine = Engine;
