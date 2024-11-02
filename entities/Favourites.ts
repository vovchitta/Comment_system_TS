class Favourites {
    private favouritesBtn!: NodeListOf<HTMLImageElement> | null;
    public favouritesCurrentBtn!: HTMLImageElement | null;
    private storageLogic: StorageLogic;
    private inputHandler: InputHandler;
    
    constructor() {
        this.storageLogic = new StorageLogic();
        this.inputHandler = new InputHandler();
    }

    private changeStatus(event: Event): void {
        const target = <HTMLElement>event.currentTarget;
        const heartContainer = target.closest('.content__actions_favourites');
        const message = <HTMLElement>heartContainer?.closest('.origin__content_actions')?.closest('.user-message__origin_content')?.closest('.comments__user-message_origin');
        const logo = <HTMLImageElement>heartContainer?.querySelector('.actions__favourites_heart');
        const text = <HTMLElement>heartContainer?.querySelector('.actions__favourites_text');
        const isMessageInFavourites = logo.src.includes('heart_black');
        const blackHeartSource: string = './images/actions__favourites_heart_black.jpg';
        const whiteHeartSource: string = './images/actions__favourites_heart_white.jpg';

        if (isMessageInFavourites) {
            logo.src = whiteHeartSource;
            text.textContent = 'В Избранное';
            message.dataset.favourites = '0';
        } else {
            logo.src = blackHeartSource;
            text.textContent = 'В Избранном';
            message.dataset.favourites = '1';
        }
        this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
    }

    public addAllFavouritesListeners(): void {
        this.favouritesBtn = document.querySelectorAll('.actions__favourites_heart');
        this.favouritesBtn.forEach((btn) => {btn.addEventListener('click', (e)=> {this.changeStatus(e)})});
    }

    public addCurrentFavouritesListener(elem: Element | null | undefined): void {
        let btn = elem?.querySelector('.actions__favourites_heart');
        btn?.addEventListener('click', (e)=> {this.changeStatus(e)});
    }

    public favouritesBtnListener(): void {
        const favouritesBtn = document.querySelector('.filters__favourites');
        let isSorted = false;
        favouritesBtn?.addEventListener('click', () => {
            const messageContainer = <HTMLElement>document.querySelector('.comments__user-message');
            if (!isSorted) {
                for (let i = 0; i < messageContainer.children.length; i++) {
                    if (Number(messageContainer.children[i].getAttribute('data-favourites')) < 1) {
                        let currentChild = <HTMLElement>messageContainer.children[i];
                        currentChild.style.display = 'none';
                    }
                }
                isSorted = true;
            } else {
                for (let i = 0; i < messageContainer.children.length; i++) {
                    let currentChild = <HTMLElement>messageContainer.children[i];
                    currentChild.style.display = 'flex';
                }
                isSorted = false;
            }
        });
    }
    
}