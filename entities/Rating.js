"use strict";
class Rating {
    constructor() {
        this.storageLogic = new StorageLogic();
        this.inputHandler = new InputHandler();
    }
    decreaseRating(event) {
        var _a, _b, _c;
        const target = event.currentTarget;
        const ratingContainer = ((_a = target.closest('.content__actions_score')) === null || _a === void 0 ? void 0 : _a.querySelector('.action__score_score-rate')) || null;
        const message = ((_b = ratingContainer === null || ratingContainer === void 0 ? void 0 : ratingContainer.closest('.user-message__origin_content')) === null || _b === void 0 ? void 0 : _b.closest('.comments__user-message_origin')) || ((_c = ratingContainer === null || ratingContainer === void 0 ? void 0 : ratingContainer.closest('.user-message__replied_content')) === null || _c === void 0 ? void 0 : _c.closest('.comments__user-message_replied'));
        if (ratingContainer) {
            let currentRating = Number(message.getAttribute('data-rating'));
            let userRating = Number(message.getAttribute('data-user-rating') || '0');
            if (userRating === 0) {
                userRating = -1;
                currentRating--;
            }
            else if (userRating === 1) {
                userRating = 0;
                currentRating--;
            }
            else if (userRating === -1) {
                userRating = -1;
            }
            message.setAttribute('data-user-rating', `${userRating}`);
            message.dataset.rating = `${currentRating}`;
            ratingContainer.textContent = `${Math.abs(currentRating)}`;
            this.updateRatingColor(ratingContainer, currentRating);
            this.storageLogic.messageSaver(this.inputHandler.messageContainer.innerHTML);
        }
    }
    increaseRating(event) {
        var _a, _b, _c;
        const target = event.currentTarget;
        const ratingContainer = ((_a = target.closest('.content__actions_score')) === null || _a === void 0 ? void 0 : _a.querySelector('.action__score_score-rate')) || null;
        const message = ((_b = ratingContainer === null || ratingContainer === void 0 ? void 0 : ratingContainer.closest('.user-message__origin_content')) === null || _b === void 0 ? void 0 : _b.closest('.comments__user-message_origin')) || ((_c = ratingContainer === null || ratingContainer === void 0 ? void 0 : ratingContainer.closest('.user-message__replied_content')) === null || _c === void 0 ? void 0 : _c.closest('.comments__user-message_replied'));
        if (ratingContainer) {
            let currentRating = Number(message.getAttribute('data-rating'));
            let userRating = Number(message.getAttribute('data-user-rating') || '0');
            if (userRating === 0) {
                userRating = 1;
                currentRating++;
            }
            else if (userRating === 1) {
                userRating = 1;
            }
            else if (userRating === -1) {
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
    updateRatingColor(ratingContainer, currentRating) {
        if (currentRating < 0) {
            ratingContainer.style.color = '#FF0000';
        }
        else {
            ratingContainer.style.color = '#8AC540';
        }
    }
    addAllRatingListeners() {
        this.minusBtns = document.querySelectorAll('.actions__score_minus-btn');
        this.plusBtns = document.querySelectorAll('.actions__score_plus-btn');
        this.minusBtns.forEach((btn) => btn.addEventListener('click', (e) => this.decreaseRating(e)));
        this.plusBtns.forEach((btn) => btn.addEventListener('click', (e) => this.increaseRating(e)));
        document.querySelectorAll('.action__score_score-rate').forEach((elem) => {
            var _a, _b;
            const message = ((_a = elem === null || elem === void 0 ? void 0 : elem.closest('.user-message__origin_content')) === null || _a === void 0 ? void 0 : _a.closest('.comments__user-message_origin')) || ((_b = elem === null || elem === void 0 ? void 0 : elem.closest('.user-message__replied_content')) === null || _b === void 0 ? void 0 : _b.closest('.comments__user-message_replied'));
            let rating = Number(message.getAttribute('data-rating'));
            this.updateRatingColor(elem, rating);
            message.setAttribute('data-user-rating', '0');
        });
    }
    addCurrentRatingListener(elem) {
        var _a, _b;
        this.currentMinusBtn = elem === null || elem === void 0 ? void 0 : elem.querySelector('.actions__score_minus-btn');
        this.currentPlusBtn = elem === null || elem === void 0 ? void 0 : elem.querySelector('.actions__score_plus-btn');
        (_a = this.currentMinusBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => this.decreaseRating(e));
        (_b = this.currentPlusBtn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => this.increaseRating(e));
    }
}
