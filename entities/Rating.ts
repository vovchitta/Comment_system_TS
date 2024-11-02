class Rating {
    private minusBtns!: NodeListOf<HTMLElement>;
    private plusBtns!: NodeListOf<HTMLElement>;
    private storageLogic: StorageLogic;
    private inputHandler: InputHandler;
    private currentMinusBtn: HTMLElement | null | undefined;
    private currentPlusBtn: HTMLElement | null | undefined;

    constructor() {
        this.storageLogic = new StorageLogic();
        this.inputHandler = new InputHandler();
    }

    private decreaseRating(event: Event): void {
        const target = <HTMLElement>event.currentTarget;
        const ratingContainer: HTMLElement | null = target.closest('.content__actions_score')?.querySelector('.action__score_score-rate') || null;
        const message = <HTMLElement>ratingContainer?.closest('.user-message__origin_content')?.closest('.comments__user-message_origin') || <HTMLElement>ratingContainer?.closest('.user-message__replied_content')?.closest('.comments__user-message_replied');
        if (ratingContainer) {
            let currentRating = Number(message.getAttribute('data-rating'));
            let userRating = Number(message.getAttribute('data-user-rating') || '0');
            if (userRating === 0) {
                userRating = -1;
                currentRating--;
            } else if (userRating === 1) {
                userRating = 0;
                currentRating--;
            } else if (userRating === -1) {
                userRating = -1;
            }
            message.setAttribute('data-user-rating', `${userRating}`);
            message.dataset.rating = `${currentRating}`;
            ratingContainer.textContent = `${Math.abs(currentRating)}`;
            this.updateRatingColor(ratingContainer, currentRating);
            this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
        }
    }

    private increaseRating(event: Event): void {
        const target = <HTMLElement>event.currentTarget;
        const ratingContainer: HTMLElement | null = target.closest('.content__actions_score')?.querySelector('.action__score_score-rate') || null;
        const message = <HTMLElement>ratingContainer?.closest('.user-message__origin_content')?.closest('.comments__user-message_origin') || <HTMLElement>ratingContainer?.closest('.user-message__replied_content')?.closest('.comments__user-message_replied');
        if (ratingContainer) {
            let currentRating = Number(message.getAttribute('data-rating'));
            let userRating = Number(message.getAttribute('data-user-rating') || '0');
            if (userRating === 0) {
                userRating = 1;
                currentRating++;
            } else if (userRating === 1) {
                userRating = 1;
            } else if (userRating === -1) {
                userRating = 0;
                currentRating++;
            }
            message.setAttribute('data-user-rating', `${userRating}`);
            message.dataset.rating = `${currentRating}`;
            ratingContainer.textContent = `${Math.abs(currentRating)}`;
            this.updateRatingColor(ratingContainer, currentRating);
            this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
        }
    }

    private updateRatingColor(ratingContainer: HTMLElement, currentRating: number): void {
        if (currentRating < 0) {
            ratingContainer.style.color = '#FF0000';
        } else {
            ratingContainer.style.color = '#8AC540';
        }
    }

    public addAllRatingListeners(): void {
        this.minusBtns = document.querySelectorAll('.actions__score_minus-btn');
        this.plusBtns = document.querySelectorAll('.actions__score_plus-btn');
        this.minusBtns.forEach((btn) => btn.addEventListener('click', (e) => this.decreaseRating(e)));
        this.plusBtns.forEach((btn) => btn.addEventListener('click', (e) => this.increaseRating(e)));
        document.querySelectorAll('.action__score_score-rate').forEach((elem) => {
            const message = <HTMLElement>elem?.closest('.user-message__origin_content')?.closest('.comments__user-message_origin') || <HTMLElement>elem?.closest('.user-message__replied_content')?.closest('.comments__user-message_replied');
            let rating = Number(message.getAttribute('data-rating'));
            this.updateRatingColor(<HTMLElement>elem, rating);
            message.setAttribute('data-user-rating', '0');
        });
    }

    public addCurrentRatingListener(elem: Element | null | undefined): void {
        this.currentMinusBtn = elem?.querySelector('.actions__score_minus-btn');
        this.currentPlusBtn = elem?.querySelector('.actions__score_plus-btn');
        this.currentMinusBtn?.addEventListener('click', (e) => this.decreaseRating(e));
        this.currentPlusBtn?.addEventListener('click', (e) => this.increaseRating(e));
    }
}
