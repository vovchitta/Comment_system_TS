class Engine {
    private storageLogic: StorageLogic;
    private inputHandler: InputHandler;
    private replyInputHandler: ReplyInputHandler;
    private favourites: Favourites;
    private rating: Rating;
    private sorting: Sorting;
    private xhr: XMLHttpRequest;

    constructor() {
        this.storageLogic = new StorageLogic();
        this.inputHandler = new InputHandler();
        this.replyInputHandler = new ReplyInputHandler();
        this.favourites = new Favourites();
        this.rating = new Rating();
        this.sorting = new Sorting();
        this.xhr = new XMLHttpRequest();
    }

    private getUserData(callback: (data: any)=> void): void {
        this.xhr.open('GET', 'https://randomuser.me/api/');
        this.xhr.onload = () => {
            if (this.xhr.status !== 200) {
                console.error('Статус ответа:', this.xhr.status);
            } else {
                const result = JSON.parse(this.xhr.response);
                callback(result);
            }
        };
        this.xhr.onerror = () => {
            console.error('Ошибка! Статус ответа:', this.xhr.status);
        };
        this.xhr.send();
    }

    private getNewUser(): void {
        this.getUserData((data) => {
            if(this.inputHandler.userName && this.inputHandler.userPicture) {
                this.inputHandler.userName.textContent = `${data.results[0].name.first} ${data.results[0].name.last}`;
                this.inputHandler.userPicture.src = `${data.results[0].picture.large}`;
            }
        });
    }

    public loop(): void {
        this.storageLogic.messageLoader(this.inputHandler.messageContainer);
        this.getNewUser();
        this.sorting.triangleListener();
        this.sorting.sort();
        this.inputHandler.inputSettingsListener();
        this.replyInputHandler.addAllReplyEventListeners();
        this.favourites.addAllFavouritesListeners();
        this.favourites.favouritesBtnListener();
        this.rating.addAllRatingListeners();
        this.inputHandler.sendBtn?.addEventListener("click", (event: Event)=> {
            event.preventDefault();
            this.inputHandler.addMessage();
            this.replyInputHandler.addReplyCurrentEventListener();
            this.favourites.addCurrentFavouritesListener(this.inputHandler.currentMessage);
            this.rating.addCurrentRatingListener(this.inputHandler.currentMessage);
            this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
        })
    }
}