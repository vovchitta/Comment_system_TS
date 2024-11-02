"use strict";
class ReplyInputHandler {
    constructor() {
        this.inputHandler = new InputHandler();
        this.storageLogic = new StorageLogic();
        this.favourites = new Favourites();
        this.rating = new Rating();
        this.replyBtn = document.querySelectorAll('.content__actions_reply');
    }
    openReplyInput(event) {
        var _a, _b, _c, _d, _e;
        const target = event.currentTarget;
        this.currentUserMessage = target.closest('.comments__user-message_origin');
        this.replyForm = document.querySelector('.comments__user-message_reply-block');
        if (!this.replyForm) {
            (_b = (_a = this.currentUserMessage) === null || _a === void 0 ? void 0 : _a.querySelector('.user-message__reply-container')) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML('afterbegin', `
                <form action="" class="comments__user-message_reply-block">
                    <div class="comments__user-message_reply_label">
                        <label class="comments__user-message_character-limit">Макс. 1000 символов</label>
                    </div>
                    <div class="comments__user-message_reply-inputs">
                        <textarea placeholder="Введите текст сообщения..." class="user-message__reply-inputs_input"></textarea>
                        <button class="user-message__reply-inputs_send-btn" disabled>Отправить</button>
                    </div>
                </form>
            `);
            this.replyInput = document.querySelector('.user-message__reply-inputs_input');
            this.replySendBtn = document.querySelector('.user-message__reply-inputs_send-btn');
            this.replyLimit = document.querySelector('.comments__user-message_character-limit');
            (_c = this.replyInput) === null || _c === void 0 ? void 0 : _c.addEventListener('input', () => { this.inputHandler.inputSettings(this.replyInput, this.replySendBtn, this.replyLimit); });
            (_d = this.replySendBtn) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => { this.addReplyMessage(event); });
        }
        else {
            (_e = this.replyForm) === null || _e === void 0 ? void 0 : _e.remove();
        }
    }
    addReplyMessage(event) {
        var _a, _b, _c, _d, _e, _f, _g;
        event.preventDefault();
        const date = new Date();
        const currentDate = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
        let userPicture = document.querySelector('.comments__user-form_user-picture');
        let userName = document.querySelector('.user-form__labels_name');
        const repliedUserName = (_b = (_a = this.currentUserMessage) === null || _a === void 0 ? void 0 : _a.querySelector('.content__parameter_user-name')) === null || _b === void 0 ? void 0 : _b.textContent;
        const replyDiv = document.createElement('div');
        replyDiv.className = 'comments__user-message_replied';
        replyDiv.dataset.rating = '0';
        replyDiv.innerHTML = `
            <img src="${userPicture === null || userPicture === void 0 ? void 0 : userPicture.src}" class="user-message__replied_picture" alt="replied_user_picture"/>
            <div class="user-message__replied_content">
                <div class="replied__content_parameter">
                    <div class="content__parameter_user-name">${userName === null || userName === void 0 ? void 0 : userName.textContent}</div>
                    <div class="content__parameter_reply-btn"></div>
                    <div class="content__parameter_replied-user">${repliedUserName}</div>
                    <div class="contant__parameter_date">${currentDate}</div>
                </div>
                <div class="replied__content_text-content">${(_c = this.replyInput) === null || _c === void 0 ? void 0 : _c.value.trim()}</div>
                <div class="replied__content_actions">
                    <div class="content__actions_favourites">
                        <img src="./images/actions__favourites_heart_white.jpg" class="actions__favourites_heart" alt="heart_icon"/>
                        <div class="actions__favourites_text">В Избранное</div>
                    </div>
                    <div class="content__actions_score">
                        <div class="actions__score_minus-btn"></div>
                        <div class="action__score_score-rate">0</div>
                        <div class="actions__score_plus-btn"></div>
                    </div>
                </div>
            </div>
        `;
        (_e = (_d = this.currentUserMessage) === null || _d === void 0 ? void 0 : _d.querySelector('.user-message__reply-container')) === null || _e === void 0 ? void 0 : _e.prepend(replyDiv);
        let currentReplyMessage = (_f = this.currentUserMessage) === null || _f === void 0 ? void 0 : _f.querySelector('.user-message__reply-container');
        if (this.currentUserMessage && currentReplyMessage) {
            this.currentUserMessage.dataset.replies = `${(currentReplyMessage === null || currentReplyMessage === void 0 ? void 0 : currentReplyMessage.children.length) - 1}`;
        }
        this.inputHandler.setBasicSettings(this.replyInput, this.replySendBtn, this.replyLimit);
        this.replyForm = document.querySelector('.comments__user-message_reply-block');
        this.favourites.addCurrentFavouritesListener(currentReplyMessage);
        this.rating.addCurrentRatingListener(currentReplyMessage);
        (_g = this.replyForm) === null || _g === void 0 ? void 0 : _g.remove();
        this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
    }
    addAllReplyEventListeners() {
        this.replyBtn = document.querySelectorAll('.content__actions_reply');
        this.replyBtn.forEach((btn) => {
            btn.addEventListener('click', (event) => { this.openReplyInput(event); });
        });
    }
    addReplyCurrentEventListener() {
        var _a;
        this.replyCurrentBtn = document.querySelector('.content__actions_reply');
        (_a = this.replyCurrentBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => { this.openReplyInput(event); });
    }
}
