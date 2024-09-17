var InputHandler = /** @class */ (function () {
    function InputHandler() {
        var _this = this;
        this.input = document.querySelector('.user-form__inputs_input');
        this.sendBtn = document.querySelector('.user-form__inputs_send-button');
        this.limit = document.querySelector('.user-form__labels_character-limit');
        this.userForm = document.querySelector('.user-form__labels');
        this.inputHandlerCheck = function (event) {
            _this.input.style.height = '61px';
            _this.input.style.height = _this.input.scrollHeight + 'px';
            if (_this.input.value.length > 0) {
                _this.sendBtn.disabled = false;
                _this.sendBtn.style.backgroundColor = '#ABD873';
                _this.sendBtn.style.opacity = '1';
                _this.sendBtn.style.cursor = 'pointer';
                _this.limit.textContent = "".concat(_this.input.value.length, "/1000");
            }
            else {
                _this.sendBtn.style.backgroundColor = '#A1A1A1';
                _this.sendBtn.style.opacity = '0.4';
                _this.sendBtn.style.cursor = 'default';
                _this.sendBtn.disabled = true;
                _this.limit.textContent = 'Макс. 1000 символов';
            }
            if (_this.input.value.length > 1000) {
                _this.sendBtn.style.backgroundColor = '#A1A1A1';
                _this.sendBtn.style.opacity = '0.4';
                _this.sendBtn.style.cursor = 'default';
                _this.sendBtn.disabled = true;
                _this.limit.style.color = '#FF0000';
                _this.limit.style.opacity = '1';
                var limitAlert = document.querySelector('.user-form__labels_limit-alert');
                if (!limitAlert) {
                    _this.userForm.insertAdjacentHTML('beforeend', "<div class='user-form__labels_limit-alert'>\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</div>");
                }
            }
            else {
                _this.limit.style.color = '#000000';
                _this.limit.style.opacity = '0.4';
                var limitAlert = document.querySelector('.user-form__labels_limit-alert');
                if (limitAlert) {
                    limitAlert.remove();
                }
                console.log(_this.input.value.length);
            }
        };
    }
    InputHandler.prototype.inputEventListener = function () {
        this.input.addEventListener('input', this.inputHandlerCheck);
    };
    return InputHandler;
}());
