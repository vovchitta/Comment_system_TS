class ReplyInputHandler {
    private currentUserMessage!: HTMLElement | null;
    private replyForm!: HTMLElement | null;
    private replyInput!: HTMLTextAreaElement | null;
    private replySendBtn!: HTMLButtonElement | null;
    private replyLimit!: HTMLElement | null;
    private inputHandler: InputHandler;
    private replyBtn: NodeListOf<Element> | null;
    private replyCurrentBtn!: HTMLElement | null;
    private storageLogic: StorageLogic;
    private favourites: Favourites;
    private rating: Rating;

    constructor() {
        this.inputHandler = new InputHandler();
        this.storageLogic = new StorageLogic();
        this.favourites = new Favourites();
        this.rating = new Rating();
        this.replyBtn = document.querySelectorAll('.content__actions_reply');
    }

    private openReplyInput(event: Event): void {
        const target = <HTMLElement>event.currentTarget;
        this.currentUserMessage = <HTMLElement>target.closest('.comments__user-message_origin');
        this.replyForm = document.querySelector('.comments__user-message_reply-block');
        if(!this.replyForm) {
            this.currentUserMessage?.querySelector('.user-message__reply-container')?.insertAdjacentHTML('afterbegin', `
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
            this.replyInput?.addEventListener('input', () => {this.inputHandler.inputSettings(this.replyInput, this.replySendBtn, this.replyLimit)});
            this.replySendBtn?.addEventListener('click', (event) => {this.addReplyMessage(event)});
        } else {
            this.replyForm?.remove();
        }
    }

    private addReplyMessage(event: Event): void {
        event.preventDefault();
        const date: Date = new Date();
        const currentDate: string = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
        let userPicture: HTMLImageElement | null = document.querySelector('.comments__user-form_user-picture');
        let userName: HTMLElement | null = document.querySelector('.user-form__labels_name');
        const repliedUserName = this.currentUserMessage?.querySelector('.content__parameter_user-name')?.textContent;
        const replyDiv = document.createElement('div');
        replyDiv.className = 'comments__user-message_replied';
        replyDiv.dataset.rating = '0';
        replyDiv.innerHTML = `
            <img src="${userPicture?.src}" class="user-message__replied_picture" alt="replied_user_picture"/>
            <div class="user-message__replied_content">
                <div class="replied__content_parameter">
                    <div class="content__parameter_user-name">${userName?.textContent}</div>
                    <div class="content__parameter_reply-btn"></div>
                    <div class="content__parameter_replied-user">${repliedUserName}</div>
                    <div class="contant__parameter_date">${currentDate}</div>
                </div>
                <div class="replied__content_text-content">${this.replyInput?.value.trim()}</div>
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
        this.currentUserMessage?.querySelector('.user-message__reply-container')?.prepend(replyDiv);
        let currentReplyMessage = this.currentUserMessage?.querySelector('.user-message__reply-container');
        if(this.currentUserMessage && currentReplyMessage) {
            this.currentUserMessage.dataset.replies = `${currentReplyMessage?.children.length - 1}`;
        }
        this.inputHandler.setBasicSettings(this.replyInput, this.replySendBtn, this.replyLimit);
        this.replyForm = document.querySelector('.comments__user-message_reply-block');
        this.favourites.addCurrentFavouritesListener(currentReplyMessage);
        this.rating.addCurrentRatingListener(currentReplyMessage);
        this.replyForm?.remove();
        this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
    }

    public addAllReplyEventListeners(): void {
        this.replyBtn = document.querySelectorAll('.content__actions_reply');
        this.replyBtn.forEach((btn) => {
            btn.addEventListener('click', (event) => {this.openReplyInput(event)});
        })
    }

    public addReplyCurrentEventListener(): void {
        this.replyCurrentBtn = document.querySelector('.content__actions_reply');
        this.replyCurrentBtn?.addEventListener('click', (event) => {this.openReplyInput(event)});
    }
}