class InputHandler {
    private input: HTMLTextAreaElement | null;
    public sendBtn: HTMLButtonElement | null;
    private limit: HTMLElement | null;
    private userForm: HTMLElement | null;
    public messageContainer: HTMLElement;
    public userName: HTMLElement | null;
    public userPicture: HTMLImageElement | null;
    public heartLogo!: HTMLImageElement | null;
    public favouriteText!: HTMLElement | null;
    public currentMessage!: HTMLElement | null;

    constructor() {
        this.input = document.querySelector('.user-form__inputs_input');
        this.sendBtn = document.querySelector('.user-form__inputs_send-button');
        this.limit = document.querySelector('.user-form__labels_character-limit');
        this.userForm = document.querySelector('.user-form__labels');
        this.messageContainer = <HTMLElement>document.querySelector('.comments__user-message');
        this.userName = document.querySelector('.user-form__labels_name');
        this.userPicture = document.querySelector('.comments__user-form_user-picture');
    }

    public inputSettings(input: HTMLTextAreaElement | null, sendBtn: HTMLButtonElement | null, limit: HTMLElement | null): void {
        if(input && sendBtn && limit) {
            input.style.height = '61px';
            input.style.height = input.scrollHeight + 'px';

            if (input.value.length > 0) {
                input.style.opacity = '1';
                sendBtn.disabled = false;
                sendBtn.style.backgroundColor = '#ABD873';
                sendBtn.style.opacity = '1';
                sendBtn.style.cursor = 'pointer';
                limit.textContent = `${input.value.length}/1000`;
            } else {
                input.style.opacity = '0.4';
                sendBtn.style.backgroundColor = '#A1A1A1';
                sendBtn.style.opacity = '0.4';
                sendBtn.style.cursor = 'default';
                sendBtn.disabled = true;
                limit.textContent = 'Макс. 1000 символов';
            }

            if (input.value.length > 1000) {
                sendBtn.style.backgroundColor = '#A1A1A1';
                sendBtn.style.opacity = '0.4';
                sendBtn.style.cursor = 'default';
                sendBtn.disabled = true;
                limit.style.color = '#FF0000';
                limit.style.opacity = '1';
                let limitAlert: HTMLElement | null = document.querySelector('.user-form__labels_limit-alert');

                if (!limitAlert && this.userForm) {
                this.userForm.insertAdjacentHTML('beforeend', `<div class='user-form__labels_limit-alert'>Слишком длинное сообщение</div>`);
                }
            } else {
                limit.style.color = '#000000';
                limit.style.opacity = '0.4';
                let limitAlert: HTMLElement | null = document.querySelector('.user-form__labels_limit-alert');
                if (limitAlert) {
                    limitAlert.remove();
                }
            }
        }
    }

    public inputSettingsListener(): void {
        if(this.input && this.sendBtn && this.limit) {
            this.input.addEventListener('input', () => this.inputSettings(this.input, this.sendBtn, this.limit));
        }
    }

    public setBasicSettings(input: HTMLTextAreaElement | null, sendBtn: HTMLButtonElement | null, limit: HTMLElement | null): void {
        if(input && sendBtn && limit) {
            input.value = '';
            input.style.height = '61px';
            sendBtn.style.backgroundColor = '#A1A1A1';
            sendBtn.style.opacity = '0.4';
            sendBtn.style.cursor = 'default';
            sendBtn.disabled = true;
            limit.textContent = 'Макс. 1000 символов';
        }
    }

    public addMessage(): void {
        const date: Date = new Date();
        const currentDate: string = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
        const dateYear = date.getFullYear();
        const dateMonth = date.getMonth() + 1;
        const dateDay = date.getDate();
        const dateHours = date.getHours();
        const dateMinutes = date.getMinutes();
        if(this.userPicture && this.userName && this.input) {
            this.messageContainer.insertAdjacentHTML('afterbegin', `
                <div class="comments__user-message_origin">
                    <img src="${this.userPicture.src}" class="user-message__origin_picture" alt="user_picture"/>
                    <div class="user-message__origin_content">
                        <div class="origin__content_parameter">
                            <div class="content__parameter_user-name">${this.userName.textContent}</div>
                            <div class="contant__parameter_date">${currentDate}</div>
                        </div>
                        <div class="origin__content_text-content">${this.input.value.trim()}</div>
                        <div class="origin__content_actions">
                            <div class="content__actions_reply">
                                <div class="actions__reply_reply-logo"></div>
                                <div class="actions__reply_reply-btn">Ответить</div>
                            </div>
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
                    <div class="user-message__reply-container"></div>
                </div>
        `)}
        this.currentMessage = this.messageContainer.querySelector('.comments__user-message_origin');
        if (this.currentMessage) {
            this.currentMessage.dataset.rating = '0';
            this.currentMessage.dataset.favourites = '0';
            this.currentMessage.dataset.dateYear = `${dateYear}`;
            this.currentMessage.dataset.dateMonth = `${dateMonth}`;
            this.currentMessage.dataset.dateDay = `${dateDay}`;
            this.currentMessage.dataset.dateHours = `${dateHours}`;
            this.currentMessage.dataset.dateMinutes = `${dateMinutes}`;
            this.currentMessage.dataset.replies = '0';
        }
        this.setBasicSettings(this.input, this.sendBtn, this.limit);
    }

}