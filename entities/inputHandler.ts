export class InputHandler {
    private input: HTMLTextAreaElement = document.querySelector('.user-form__inputs_input');
    private sendBtn: HTMLButtonElement = document.querySelector('.user-form__inputs_send-button');
    private limit: HTMLElement = document.querySelector('.user-form__labels_character-limit');
    private userForm: HTMLElement = document.querySelector('.user-form__labels');
    private replyUserForm: HTMLElement = document.querySelector('.comments__user-message_reply_label');
    private userMessage: HTMLElement = document.querySelector('.comments__user-message');
    private userName: HTMLElement = document.querySelector('.user-form__labels_name');
    private userPicture: HTMLImageElement = document.querySelector('.comments__user-form_user-picture');
    private replyInput: HTMLTextAreaElement | null;
    private replyBtn: HTMLButtonElement;
    private replyLimit: HTMLElement;

    constructor() {
        
    }

    public inputHandlerCheck = (event: Event): void => {

        this.input.style.height = '61px';
        this.input.style.height = this.input.scrollHeight + 'px';

        if (this.input.value.length > 0) {
            this.input.style.opacity = '1';
            this.sendBtn.disabled = false;
            this.sendBtn.style.backgroundColor = '#ABD873';
            this.sendBtn.style.opacity = '1';
            this.sendBtn.style.cursor = 'pointer';
            this.limit.textContent = `${this.input.value.length}/1000`;
        } else {
            this.input.style.opacity = '0.4';
            this.sendBtn.style.backgroundColor = '#A1A1A1';
            this.sendBtn.style.opacity = '0.4';
            this.sendBtn.style.cursor = 'default';
            this.sendBtn.disabled = true;
            this.limit.textContent = 'Макс. 1000 символов';
        }

        if (this.input.value.length > 1000) {
            this.sendBtn.style.backgroundColor = '#A1A1A1';
            this.sendBtn.style.opacity = '0.4';
            this.sendBtn.style.cursor = 'default';
            this.sendBtn.disabled = true;
            this.limit.style.color = '#FF0000';
            this.limit.style.opacity = '1';
            let limitAlert: HTMLElement = document.querySelector('.user-form__labels_limit-alert');
            if (!limitAlert) {
                this.userForm.insertAdjacentHTML('beforeend', `<div class='user-form__labels_limit-alert'>Слишком длинное сообщение</div>`);
            }

        } else {
            this.limit.style.color = '#000000';
            this.limit.style.opacity = '0.4';
            const limitAlert: HTMLElement = document.querySelector('.user-form__labels_limit-alert');
            if (limitAlert) {
                limitAlert.remove();
            }
        }
    }

    public sendMessage = (event: Event): void => {
        event.preventDefault();
        const date: Date = new Date();
        const currentDate: string = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
        this.userMessage.insertAdjacentHTML('afterbegin', `
            <div class="comments__user-message_origin">
                <img src="${this.userPicture.src}" class="user-message__origin_picture"></img>
                <div class="user-message__origin_content">
                    <div class="origin__content_parameter">
                        <div class="content__parameter_user-name">${this.userName.textContent}</div>
                        <div class="contant__parameter_date">${currentDate}</div>
                    </div>
                    <div class="origin__content_text-content">
                        ${this.input.value.trim()}
                    </div>
                    <div class="origin__content_actions">
                        <div class="content__actions_reply">
                            <div class="actions__reply_reply-logo"></div>
                            <div class="actions__reply_reply-btn">Ответить</div>
                        </div>
                        <div class="content__actions_favourites">
                            <img src="./images/actions__favourites_heart_white.jpg" class="actions__favourites_heart"></img>
                            <div class="actions__favourites_text">В Избранное</div>
                        </div>
                        <div class="content__actions_score">
                            <div class="actions__score_minus-btn"></div>
                            <div class="action__score_score-rate">6</div>
                            <div class="actions__score_plus-btn"></div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        this.input.value = '';
        this.input.style.height = '61px';
        this.sendBtn.style.backgroundColor = '#A1A1A1';
        this.sendBtn.style.opacity = '0.4';
        this.sendBtn.style.cursor = 'default';
        this.sendBtn.disabled = true;
        this.limit.textContent = 'Макс. 1000 символов';
        
        this.addReplyEventListeners();

        const heartLogo: HTMLImageElement | null = document.querySelector('.actions__favourites_heart');
        const favouriteText:HTMLElement = document.querySelector('.actions__favourites_text');
        console.log(this.addToFavourites)
        this.addToFavourites(heartLogo, favouriteText);
    }

    public addReplyEventListeners(): void {
        const allReplyButtons = document.querySelector('.content__actions_reply');
        if(allReplyButtons) {
            allReplyButtons.addEventListener('click', this.openReplyInput);
        }
    }

    public openReplyInput(event: Event): void {

        const target = <HTMLElement>event.currentTarget;
        const messageBlock = target.closest('.comments__user-message_origin');
        const replyBlock = document.querySelector('.comments__user-message_reply-block');

        if(!replyBlock) {
            messageBlock.insertAdjacentHTML('afterend', `
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
            this.replyBtn = document.querySelector('.user-message__reply-inputs_send-btn');
            this.replyLimit = document.querySelector('.comments__user-message_character-limit');

            this.replyInput.addEventListener('input', (event)=> {
                this.replyInput.style.height = '61px';
                this.replyInput.style.height = this.replyInput.scrollHeight + 'px';

                if (this.replyInput.value.length > 0) {
                    this.replyInput.style.opacity = '1';
                    this.replyBtn.disabled = false;
                    this.replyBtn.style.backgroundColor = '#ABD873';
                    this.replyBtn.style.opacity = '1';
                    this.replyBtn.style.cursor = 'pointer';
                    this.replyLimit.textContent = `${this.replyInput.value.length}/1000`;
                } else {
                    this.replyInput.style.opacity = '0.4';
                    this.replyBtn.style.backgroundColor = '#A1A1A1';
                    this.replyBtn.style.opacity = '0.4';
                    this.replyBtn.style.cursor = 'default';
                    this.replyBtn.disabled = true;
                    this.replyLimit.textContent = 'Макс. 1000 символов';
                }

                if (this.replyInput.value.length > 1000) {
                    this.replyBtn.style.backgroundColor = '#A1A1A1';
                    this.replyBtn.style.opacity = '0.4';
                    this.replyBtn.style.cursor = 'default';
                    this.replyBtn.disabled = true;
                    this.replyLimit.style.color = '#FF0000';
                    this.replyLimit.style.opacity = '1';
                    let limitAlert: HTMLElement = document.querySelector('.user-form__labels_limit-alert');
                    if (!limitAlert) {
                        this.replyUserForm.insertAdjacentHTML('beforeend', `<div class='user-form__labels_limit-alert'>Слишком длинное сообщение</div>`);
                    }

                } else {
                    this.replyLimit.style.color = '#000000';
                    this.replyLimit.style.opacity = '0.4';
                    const limitAlert: HTMLElement = document.querySelector('.user-form__labels_limit-alert');
                    if (limitAlert) {
                        limitAlert.remove();
                    }
                }
            });

            this.replyBtn.addEventListener('click',(event) => {
                event.preventDefault();
                const date: Date = new Date();
                const currentDate: string = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
                let userPicture: HTMLImageElement = document.querySelector('.comments__user-form_user-picture');
                let userName: HTMLElement = document.querySelector('.user-form__labels_name');
                const repliedUserName = messageBlock.querySelector('.content__parameter_user-name').textContent;
                messageBlock.insertAdjacentHTML('afterend',
                    `<div class="comments__user-message_replied">
                        <img src="${userPicture.src}" class="user-message__replied_picture"></img>
                        <div class="user-message__replied_content">
                            <div class="replied__content_parameter">
                                <div class="content__parameter_user-name">${userName.textContent}</div>
                                <div class="content__parameter_reply-btn"></div>
                                <div class="content__parameter_replied-user">${repliedUserName}</div>
                                <div class="contant__parameter_date">${currentDate}</div>
                            </div>
                            <div class="replied__content_text-content">${this.replyInput.value.trim()}</div>
                            <div class="replied__content_actions">
                                <div class="replied__actions_favourites">
                                    <img src="./images/actions__favourites_heart_white.jpg" class="replied__favourites_heart"></img>
                                    <div class="replied__favourites_text">В Избранное</div>
                                </div>
                                <div class="content__actions_score">
                                    <div class="actions__score_minus-btn"></div>
                                    <div class="action__score_score-rate">3</div>
                                    <div class="actions__score_plus-btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                this.replyInput.value = '';
                this.replyInput.style.height = '61px';
                this.replyBtn.style.backgroundColor = '#A1A1A1';
                this.replyBtn.style.opacity = '0.4';
                this.replyBtn.style.cursor = 'default';
                this.replyBtn.disabled = true;
                this.replyLimit.textContent = 'Макс. 1000 символов';

                const repliedHeartLogo: HTMLImageElement | null = document.querySelector('.replied__favourites_heart');
                const repliedFavouriteText:HTMLElement = document.querySelector('.replied__favourites_text');
                
                let isMessageInFavourites: boolean = false;
                const blackHeartSource: string ='./images/actions__favourites_heart_black.jpg';
                const whiteHeartSource: string ='./images/actions__favourites_heart_white.jpg';
                let counter: number = 0;
            
                repliedHeartLogo.addEventListener('click',()=> {
                counter +=1;
            
                console.log(counter);
            
                if(counter % 2 === 0) {
                    isMessageInFavourites = false;
                    repliedFavouriteText.textContent = 'В Избранное';
                } else {
                    isMessageInFavourites = true;
                    repliedFavouriteText.textContent = 'В Избранном';
                }
            
                if (repliedHeartLogo) {
                    if (isMessageInFavourites) {
                        repliedHeartLogo.src = blackHeartSource;
                    } else {
                        repliedHeartLogo.src = whiteHeartSource;
                    }
                }
                });
            
                const replyBlock = document.querySelector('.comments__user-message_reply-block');
                replyBlock.remove();
            });
        } else {
            replyBlock.remove();
        }
    }

    public addToFavourites(logo:HTMLImageElement | null, text:HTMLElement): void {
        let isMessageInFavourites: boolean = false;
        const blackHeartSource: string ='./images/actions__favourites_heart_black.jpg';
        const whiteHeartSource: string ='./images/actions__favourites_heart_white.jpg';
        let counter: number = 0;

        logo.addEventListener('click',()=> {
            counter +=1;

        console.log(counter);

        if(counter % 2 === 0) {
            isMessageInFavourites = false;
            text.textContent = 'В Избранное';
        } else {
            isMessageInFavourites = true;
            text.textContent = 'В Избранном';
        }

        if (logo) {
            if (isMessageInFavourites) {
                logo.src = blackHeartSource;
            } else {
                logo.src = whiteHeartSource;
            }
        }
        });
    }

    public inputEventListener(): void {
        this.input.addEventListener('input', this.inputHandlerCheck);
        this.sendBtn.addEventListener('click', this.sendMessage);
    }

}
