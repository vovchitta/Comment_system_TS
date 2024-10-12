"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHandler = void 0;
var InputHandler = /** @class */ (function () {
    function InputHandler() {
        var _this = this;
        this.input = document.querySelector('.user-form__inputs_input');
        this.sendBtn = document.querySelector('.user-form__inputs_send-button');
        this.limit = document.querySelector('.user-form__labels_character-limit');
        this.userForm = document.querySelector('.user-form__labels');
        this.replyUserForm = document.querySelector('.comments__user-message_reply_label');
        this.userMessage = document.querySelector('.comments__user-message');
        this.userName = document.querySelector('.user-form__labels_name');
        this.userPicture = document.querySelector('.comments__user-form_user-picture');
        this.inputHandlerCheck = function (event) {
            _this.input.style.height = '61px';
            _this.input.style.height = _this.input.scrollHeight + 'px';
            if (_this.input.value.length > 0) {
                _this.input.style.opacity = '1';
                _this.sendBtn.disabled = false;
                _this.sendBtn.style.backgroundColor = '#ABD873';
                _this.sendBtn.style.opacity = '1';
                _this.sendBtn.style.cursor = 'pointer';
                _this.limit.textContent = "".concat(_this.input.value.length, "/1000");
            }
            else {
                _this.input.style.opacity = '0.4';
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
            }
        };
        this.sendMessage = function (event) {
            event.preventDefault();
            var date = new Date();
            var currentDate = "".concat(date.getDate() < 10 ? '0' + date.getDate() : date.getDate(), ".").concat((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1), " ").concat(date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), ":").concat(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            _this.userMessage.insertAdjacentHTML('afterbegin', "\n            <div class=\"comments__user-message_origin\">\n                <img src=\"".concat(_this.userPicture.src, "\" class=\"user-message__origin_picture\"></img>\n                <div class=\"user-message__origin_content\">\n                    <div class=\"origin__content_parameter\">\n                        <div class=\"content__parameter_user-name\">").concat(_this.userName.textContent, "</div>\n                        <div class=\"contant__parameter_date\">").concat(currentDate, "</div>\n                    </div>\n                    <div class=\"origin__content_text-content\">\n                        ").concat(_this.input.value.trim(), "\n                    </div>\n                    <div class=\"origin__content_actions\">\n                        <div class=\"content__actions_reply\">\n                            <div class=\"actions__reply_reply-logo\"></div>\n                            <div class=\"actions__reply_reply-btn\">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</div>\n                        </div>\n                        <div class=\"content__actions_favourites\">\n                            <img src=\"./images/actions__favourites_heart_white.jpg\" class=\"actions__favourites_heart\"></img>\n                            <div class=\"actions__favourites_text\">\u0412 \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</div>\n                        </div>\n                        <div class=\"content__actions_score\">\n                            <div class=\"actions__score_minus-btn\"></div>\n                            <div class=\"action__score_score-rate\">6</div>\n                            <div class=\"actions__score_plus-btn\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "));
            _this.input.value = '';
            _this.input.style.height = '61px';
            _this.sendBtn.style.backgroundColor = '#A1A1A1';
            _this.sendBtn.style.opacity = '0.4';
            _this.sendBtn.style.cursor = 'default';
            _this.sendBtn.disabled = true;
            _this.limit.textContent = 'Макс. 1000 символов';
            _this.addReplyEventListeners();
            var heartLogo = document.querySelector('.actions__favourites_heart');
            var favouriteText = document.querySelector('.actions__favourites_text');
            console.log(_this.addToFavourites);
            _this.addToFavourites(heartLogo, favouriteText);
        };
    }
    InputHandler.prototype.addReplyEventListeners = function () {
        var allReplyButtons = document.querySelector('.content__actions_reply');
        if (allReplyButtons) {
            allReplyButtons.addEventListener('click', this.openReplyInput);
        }
    };
    InputHandler.prototype.openReplyInput = function (event) {
        var _this = this;
        var target = event.currentTarget;
        var messageBlock = target.closest('.comments__user-message_origin');
        var replyBlock = document.querySelector('.comments__user-message_reply-block');
        if (!replyBlock) {
            messageBlock.insertAdjacentHTML('afterend', "\n                <form action=\"\" class=\"comments__user-message_reply-block\">\n                    <div class=\"comments__user-message_reply_label\">\n                        <label class=\"comments__user-message_character-limit\">\u041C\u0430\u043A\u0441. 1000 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432</label>\n                    </div>\n                    <div class=\"comments__user-message_reply-inputs\">\n                        <textarea placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F...\" class=\"user-message__reply-inputs_input\"></textarea>\n                        <button class=\"user-message__reply-inputs_send-btn\" disabled>\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n                    </div>\n                </form>\n            ");
            this.replyInput = document.querySelector('.user-message__reply-inputs_input');
            this.replyBtn = document.querySelector('.user-message__reply-inputs_send-btn');
            this.replyLimit = document.querySelector('.comments__user-message_character-limit');
            this.replyInput.addEventListener('input', function (event) {
                _this.replyInput.style.height = '61px';
                _this.replyInput.style.height = _this.replyInput.scrollHeight + 'px';
                if (_this.replyInput.value.length > 0) {
                    _this.replyInput.style.opacity = '1';
                    _this.replyBtn.disabled = false;
                    _this.replyBtn.style.backgroundColor = '#ABD873';
                    _this.replyBtn.style.opacity = '1';
                    _this.replyBtn.style.cursor = 'pointer';
                    _this.replyLimit.textContent = "".concat(_this.replyInput.value.length, "/1000");
                }
                else {
                    _this.replyInput.style.opacity = '0.4';
                    _this.replyBtn.style.backgroundColor = '#A1A1A1';
                    _this.replyBtn.style.opacity = '0.4';
                    _this.replyBtn.style.cursor = 'default';
                    _this.replyBtn.disabled = true;
                    _this.replyLimit.textContent = 'Макс. 1000 символов';
                }
                if (_this.replyInput.value.length > 1000) {
                    _this.replyBtn.style.backgroundColor = '#A1A1A1';
                    _this.replyBtn.style.opacity = '0.4';
                    _this.replyBtn.style.cursor = 'default';
                    _this.replyBtn.disabled = true;
                    _this.replyLimit.style.color = '#FF0000';
                    _this.replyLimit.style.opacity = '1';
                    var limitAlert = document.querySelector('.user-form__labels_limit-alert');
                    if (!limitAlert) {
                        _this.replyUserForm.insertAdjacentHTML('beforeend', "<div class='user-form__labels_limit-alert'>\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</div>");
                    }
                }
                else {
                    _this.replyLimit.style.color = '#000000';
                    _this.replyLimit.style.opacity = '0.4';
                    var limitAlert = document.querySelector('.user-form__labels_limit-alert');
                    if (limitAlert) {
                        limitAlert.remove();
                    }
                }
            });
            this.replyBtn.addEventListener('click', function (event) {
                event.preventDefault();
                var date = new Date();
                var currentDate = "".concat(date.getDate() < 10 ? '0' + date.getDate() : date.getDate(), ".").concat((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1), " ").concat(date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), ":").concat(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                var userPicture = document.querySelector('.comments__user-form_user-picture');
                var userName = document.querySelector('.user-form__labels_name');
                var repliedUserName = messageBlock.querySelector('.content__parameter_user-name').textContent;
                messageBlock.insertAdjacentHTML('afterend', "<div class=\"comments__user-message_replied\">\n                        <img src=\"".concat(userPicture.src, "\" class=\"user-message__replied_picture\"></img>\n                        <div class=\"user-message__replied_content\">\n                            <div class=\"replied__content_parameter\">\n                                <div class=\"content__parameter_user-name\">").concat(userName.textContent, "</div>\n                                <div class=\"content__parameter_reply-btn\"></div>\n                                <div class=\"content__parameter_replied-user\">").concat(repliedUserName, "</div>\n                                <div class=\"contant__parameter_date\">").concat(currentDate, "</div>\n                            </div>\n                            <div class=\"replied__content_text-content\">").concat(_this.replyInput.value.trim(), "</div>\n                            <div class=\"replied__content_actions\">\n                                <div class=\"replied__actions_favourites\">\n                                    <img src=\"./images/actions__favourites_heart_white.jpg\" class=\"replied__favourites_heart\"></img>\n                                    <div class=\"replied__favourites_text\">\u0412 \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</div>\n                                </div>\n                                <div class=\"content__actions_score\">\n                                    <div class=\"actions__score_minus-btn\"></div>\n                                    <div class=\"action__score_score-rate\">3</div>\n                                    <div class=\"actions__score_plus-btn\"></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                "));
                _this.replyInput.value = '';
                _this.replyInput.style.height = '61px';
                _this.replyBtn.style.backgroundColor = '#A1A1A1';
                _this.replyBtn.style.opacity = '0.4';
                _this.replyBtn.style.cursor = 'default';
                _this.replyBtn.disabled = true;
                _this.replyLimit.textContent = 'Макс. 1000 символов';
                var repliedHeartLogo = document.querySelector('.replied__favourites_heart');
                var repliedFavouriteText = document.querySelector('.replied__favourites_text');
                var isMessageInFavourites = false;
                var blackHeartSource = './images/actions__favourites_heart_black.jpg';
                var whiteHeartSource = './images/actions__favourites_heart_white.jpg';
                var counter = 0;
                repliedHeartLogo.addEventListener('click', function () {
                    counter += 1;
                    console.log(counter);
                    if (counter % 2 === 0) {
                        isMessageInFavourites = false;
                        repliedFavouriteText.textContent = 'В Избранное';
                    }
                    else {
                        isMessageInFavourites = true;
                        repliedFavouriteText.textContent = 'В Избранном';
                    }
                    if (repliedHeartLogo) {
                        if (isMessageInFavourites) {
                            repliedHeartLogo.src = blackHeartSource;
                        }
                        else {
                            repliedHeartLogo.src = whiteHeartSource;
                        }
                    }
                });
                var replyBlock = document.querySelector('.comments__user-message_reply-block');
                replyBlock.remove();
            });
        }
        else {
            replyBlock.remove();
        }
    };
    InputHandler.prototype.addToFavourites = function (logo, text) {
        var isMessageInFavourites = false;
        var blackHeartSource = './images/actions__favourites_heart_black.jpg';
        var whiteHeartSource = './images/actions__favourites_heart_white.jpg';
        var counter = 0;
        logo.addEventListener('click', function () {
            counter += 1;
            console.log(counter);
            if (counter % 2 === 0) {
                isMessageInFavourites = false;
                text.textContent = 'В Избранное';
            }
            else {
                isMessageInFavourites = true;
                text.textContent = 'В Избранном';
            }
            if (logo) {
                if (isMessageInFavourites) {
                    logo.src = blackHeartSource;
                }
                else {
                    logo.src = whiteHeartSource;
                }
            }
        });
    };
    InputHandler.prototype.inputEventListener = function () {
        this.input.addEventListener('input', this.inputHandlerCheck);
        this.sendBtn.addEventListener('click', this.sendMessage);
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;
