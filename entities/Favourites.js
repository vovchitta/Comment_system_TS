"use strict";
class Favourites {
    constructor() {
        this.storageLogic = new StorageLogic();
        this.inputHandler = new InputHandler();
    }
    changeStatus(event) {
        var _a, _b;
        const target = event.currentTarget;
        const heartContainer = target.closest('.content__actions_favourites');
        const message = (_b = (_a = heartContainer === null || heartContainer === void 0 ? void 0 : heartContainer.closest('.origin__content_actions')) === null || _a === void 0 ? void 0 : _a.closest('.user-message__origin_content')) === null || _b === void 0 ? void 0 : _b.closest('.comments__user-message_origin');
        const logo = heartContainer === null || heartContainer === void 0 ? void 0 : heartContainer.querySelector('.actions__favourites_heart');
        const text = heartContainer === null || heartContainer === void 0 ? void 0 : heartContainer.querySelector('.actions__favourites_text');
        const isMessageInFavourites = logo.src.includes('heart_black');
        const blackHeartSource = './images/actions__favourites_heart_black.jpg';
        const whiteHeartSource = './images/actions__favourites_heart_white.jpg';
        if (isMessageInFavourites) {
            logo.src = whiteHeartSource;
            text.textContent = 'В Избранное';
            message.dataset.favourites = '0';
        }
        else {
            logo.src = blackHeartSource;
            text.textContent = 'В Избранном';
            message.dataset.favourites = '1';
        }
        this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
    }
    addAllFavouritesListeners() {
        this.favouritesBtn = document.querySelectorAll('.actions__favourites_heart');
        this.favouritesBtn.forEach((btn) => { btn.addEventListener('click', (e) => { this.changeStatus(e); }); });
    }
    addCurrentFavouritesListener(elem) {
        let btn = elem === null || elem === void 0 ? void 0 : elem.querySelector('.actions__favourites_heart');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', (e) => { this.changeStatus(e); });
    }
    favouritesBtnListener() {
        const favouritesBtn = document.querySelector('.filters__favourites');
        let isSorted = false;
        favouritesBtn === null || favouritesBtn === void 0 ? void 0 : favouritesBtn.addEventListener('click', () => {
            const messageContainer = document.querySelector('.comments__user-message');
            if (!isSorted) {
                for (let i = 0; i < messageContainer.children.length; i++) {
                    if (Number(messageContainer.children[i].getAttribute('data-favourites')) < 1) {
                        let currentChild = messageContainer.children[i];
                        currentChild.style.display = 'none';
                    }
                }
                isSorted = true;
            }
            else {
                for (let i = 0; i < messageContainer.children.length; i++) {
                    let currentChild = messageContainer.children[i];
                    currentChild.style.display = 'flex';
                }
                isSorted = false;
            }
        });
    }
}
