"use strict";
class Sorting {
    constructor() {
        this.triangle = true;
    }
    sort() {
        const sortByRepliesBtn = document.querySelector('#sort-by-replies');
        const repliesMark = sortByRepliesBtn === null || sortByRepliesBtn === void 0 ? void 0 : sortByRepliesBtn.querySelector('.filters__dropdown-menu_content-checked');
        const sortByFavouritesBtn = document.querySelector('#sort-by-favourites');
        const favouritesMark = sortByFavouritesBtn === null || sortByFavouritesBtn === void 0 ? void 0 : sortByFavouritesBtn.querySelector('.filters__dropdown-menu_content-checked');
        const sortByRatingBtn = document.querySelector('#sort-by-rating');
        const ratingMark = sortByRatingBtn === null || sortByRatingBtn === void 0 ? void 0 : sortByRatingBtn.querySelector('.filters__dropdown-menu_content-checked');
        const sortByDateBtn = document.querySelector('#sort-by-date');
        const dateMark = sortByDateBtn === null || sortByDateBtn === void 0 ? void 0 : sortByDateBtn.querySelector('.filters__dropdown-menu_content-checked');
        const repliesAtr = 'data-replies';
        const favouritesAtr = 'data-favourites';
        const ratingAtr = 'data-rating';
        if (sortByRepliesBtn && sortByFavouritesBtn && sortByRatingBtn && sortByDateBtn) {
            sortByRepliesBtn.addEventListener('click', () => { this.sortMessages(sortByRepliesBtn, repliesAtr, repliesMark, this.triangle); });
            sortByFavouritesBtn.addEventListener('click', () => { this.sortMessages(sortByFavouritesBtn, favouritesAtr, favouritesMark, this.triangle); });
            sortByRatingBtn.addEventListener('click', () => { this.sortMessages(sortByRatingBtn, ratingAtr, ratingMark, this.triangle); });
            sortByDateBtn.addEventListener('click', () => { this.sortByDate(sortByDateBtn, dateMark, this.triangle); });
        }
    }
    sortMessages(target, attribute, mark, triangle) {
        const messageContainer = document.querySelector('.comments__user-message');
        const sortingDisplay = document.querySelector('.filters__dropdown-menu_button');
        const currentBtn = target.closest('.filters__dropdown-menu_content_container');
        const currentBtnContent = currentBtn.querySelector('.filters__dropdown-menu_content-btn');
        sortingDisplay.textContent = currentBtnContent === null || currentBtnContent === void 0 ? void 0 : currentBtnContent.textContent;
        const allSortingBtns = document.querySelectorAll('.filters__dropdown-menu_content_container');
        allSortingBtns.forEach((btn) => { btn.classList.remove('active'); });
        currentBtn.classList.add('active');
        currentBtn.dataset.sortAttribute = attribute;
        if (messageContainer) {
            const childrens = Array.from(messageContainer.children);
            childrens.sort((a, b) => {
                const firstCounter = a.getAttribute(attribute);
                const secondCounter = b.getAttribute(attribute);
                if (firstCounter && secondCounter) {
                    const result = +firstCounter - +secondCounter;
                    if (triangle) {
                        return -result;
                    }
                    else {
                        return result;
                    }
                }
            });
            messageContainer.innerHTML = '';
            childrens.forEach(child => messageContainer.appendChild(child));
        }
        this.markListener(mark);
    }
    markListener(mark) {
        const allMarks = document.querySelectorAll('.filters__dropdown-menu_content-checked');
        allMarks.forEach(mark => mark.src = '');
        mark.src = './images/checked.svg';
    }
    sortByDate(target, mark, triangle) {
        const messageContainer = document.querySelector('.comments__user-message');
        const sortingDisplay = document.querySelector('.filters__dropdown-menu_button');
        const currentBtn = target.closest('.filters__dropdown-menu_content_container');
        const currentBtnContent = currentBtn.querySelector('.filters__dropdown-menu_content-btn');
        sortingDisplay.textContent = currentBtnContent === null || currentBtnContent === void 0 ? void 0 : currentBtnContent.textContent;
        const allSortingBtns = document.querySelectorAll('.filters__dropdown-menu_content_container');
        allSortingBtns.forEach((btn) => { btn.classList.remove('active'); });
        currentBtn.classList.add('active');
        currentBtn.dataset.sortAttribute = 'date';
        if (messageContainer) {
            const childrens = Array.from(messageContainer.children);
            childrens.sort((a, b) => {
                const firstCounterArr = {
                    year: a.getAttribute('data-date-year'),
                    month: a.getAttribute('data-date-month'),
                    day: a.getAttribute('data-date-day'),
                    hours: a.getAttribute('data-date-hours'),
                    minutes: a.getAttribute('data-date-minutes')
                };
                const secondCounterArr = {
                    year: b.getAttribute('data-date-year'),
                    month: b.getAttribute('data-date-month'),
                    day: b.getAttribute('data-date-day'),
                    hours: b.getAttribute('data-date-hours'),
                    minutes: b.getAttribute('data-date-minutes')
                };
                if (firstCounterArr && secondCounterArr) {
                    const result = firstCounterArr.year - secondCounterArr.year ||
                        firstCounterArr.month - secondCounterArr.month ||
                        firstCounterArr.day - secondCounterArr.day ||
                        firstCounterArr.hours - secondCounterArr.hours ||
                        firstCounterArr.minutes - secondCounterArr.minutes;
                    if (triangle) {
                        return -result;
                    }
                    else {
                        return result;
                    }
                }
            });
            messageContainer.innerHTML = '';
            childrens.forEach(child => messageContainer.appendChild(child));
        }
        this.markListener(mark);
    }
    triangleListener() {
        const triangleBtn = document.querySelector('.filters__triangle');
        triangleBtn === null || triangleBtn === void 0 ? void 0 : triangleBtn.addEventListener('click', () => {
            this.triangle = !this.triangle;
            if (this.triangle) {
                triangleBtn.style.transform = 'rotate(0deg)';
            }
            else {
                triangleBtn.style.transform = 'rotate(180deg)';
            }
            const activeSortButton = document.querySelector('.active');
            if (activeSortButton) {
                const attribute = activeSortButton.getAttribute('data-sort-attribute');
                const mark = activeSortButton.querySelector('.filters__dropdown-menu_content-checked');
                if (attribute === 'date') {
                    this.sortByDate(activeSortButton, mark, this.triangle);
                }
                else if (attribute) {
                    this.sortMessages(activeSortButton, attribute, mark, this.triangle);
                }
            }
        });
    }
}
