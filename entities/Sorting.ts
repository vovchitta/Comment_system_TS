class Sorting {
    private triangle: boolean = true; 
    constructor() {
    }

    public sort(): void {
        const sortByRepliesBtn: HTMLElement | null = document.querySelector('#sort-by-replies');
        const repliesMark = <HTMLImageElement>sortByRepliesBtn?.querySelector('.filters__dropdown-menu_content-checked');
        const sortByFavouritesBtn: HTMLElement | null = document.querySelector('#sort-by-favourites');
        const favouritesMark = <HTMLImageElement>sortByFavouritesBtn?.querySelector('.filters__dropdown-menu_content-checked');
        const sortByRatingBtn: HTMLElement | null = document.querySelector('#sort-by-rating');
        const ratingMark = <HTMLImageElement>sortByRatingBtn?.querySelector('.filters__dropdown-menu_content-checked');
        const sortByDateBtn: HTMLElement | null = document.querySelector('#sort-by-date');
        const dateMark = <HTMLImageElement>sortByDateBtn?.querySelector('.filters__dropdown-menu_content-checked');
        const repliesAtr = 'data-replies';
        const favouritesAtr = 'data-favourites';
        const ratingAtr = 'data-rating';
        if (sortByRepliesBtn && sortByFavouritesBtn && sortByRatingBtn && sortByDateBtn) {
            sortByRepliesBtn.addEventListener('click', ()=> {this.sortMessages(sortByRepliesBtn, repliesAtr, repliesMark, this.triangle)});
            sortByFavouritesBtn.addEventListener('click', ()=> {this.sortMessages(sortByFavouritesBtn, favouritesAtr, favouritesMark, this.triangle)});
            sortByRatingBtn.addEventListener('click', ()=> {this.sortMessages(sortByRatingBtn, ratingAtr, ratingMark, this.triangle)});
            sortByDateBtn.addEventListener('click', ()=> {this.sortByDate(sortByDateBtn, dateMark, this.triangle)});
        }
    }

    private sortMessages(target: HTMLElement, attribute: string, mark: HTMLImageElement, triangle: boolean): void {
        const messageContainer = document.querySelector('.comments__user-message');
        const sortingDisplay = <HTMLElement>document.querySelector('.filters__dropdown-menu_button');
        const currentBtn = <HTMLElement>target.closest('.filters__dropdown-menu_content_container');
        const currentBtnContent = <HTMLElement>currentBtn.querySelector('.filters__dropdown-menu_content-btn');
        sortingDisplay.textContent = currentBtnContent?.textContent;
        const allSortingBtns = document.querySelectorAll('.filters__dropdown-menu_content_container');
        allSortingBtns.forEach((btn)=> {btn.classList.remove('active')});
        currentBtn.classList.add('active');
        currentBtn.dataset.sortAttribute = attribute;
        if (messageContainer) {
            const childrens = <HTMLElement[]>Array.from(messageContainer.children);
            childrens.sort((a, b): any => {
                const firstCounter = a.getAttribute(attribute);
                const secondCounter = b.getAttribute(attribute);
                if(firstCounter && secondCounter) {
                    const result: number = +firstCounter - +secondCounter;
                    if(triangle) {
                        return -result
                    } else {
                        return result
                    }
                }
            });
            messageContainer.innerHTML = '';
            childrens.forEach(child => messageContainer.appendChild(child));
        }
        this.markListener(mark);
    }

    private markListener(mark: HTMLImageElement): void {
        const allMarks: NodeListOf<HTMLImageElement> = document.querySelectorAll('.filters__dropdown-menu_content-checked');
        allMarks.forEach(mark => mark.src = '');
        mark.src = './images/checked.svg';
    }

    private sortByDate(target: HTMLElement, mark: HTMLImageElement, triangle: boolean): void {
        const messageContainer = document.querySelector('.comments__user-message');
        const sortingDisplay = <HTMLElement>document.querySelector('.filters__dropdown-menu_button');
        const currentBtn = <HTMLElement>target.closest('.filters__dropdown-menu_content_container');
        const currentBtnContent = <HTMLElement>currentBtn.querySelector('.filters__dropdown-menu_content-btn');
        sortingDisplay.textContent = currentBtnContent?.textContent;
        const allSortingBtns = document.querySelectorAll('.filters__dropdown-menu_content_container');
        allSortingBtns.forEach((btn)=> {btn.classList.remove('active')});
        currentBtn.classList.add('active');
        currentBtn.dataset.sortAttribute = 'date';
        if(messageContainer) {
            const childrens = <HTMLElement[]>Array.from(messageContainer.children);
            childrens.sort((a, b): any => {
                const firstCounterArr: any = {
                    year: a.getAttribute('data-date-year'),
                    month: a.getAttribute('data-date-month'),
                    day: a.getAttribute('data-date-day'),
                    hours: a.getAttribute('data-date-hours'),
                    minutes: a.getAttribute('data-date-minutes')
                }
                const secondCounterArr: any = {
                    year: b.getAttribute('data-date-year'),
                    month: b.getAttribute('data-date-month'),
                    day: b.getAttribute('data-date-day'),
                    hours: b.getAttribute('data-date-hours'),
                    minutes: b.getAttribute('data-date-minutes')
                }
                if(firstCounterArr && secondCounterArr) {
                    const result: number = 
                    firstCounterArr.year - secondCounterArr.year || 
                    firstCounterArr.month - secondCounterArr.month || 
                    firstCounterArr.day - secondCounterArr.day ||
                    firstCounterArr.hours - secondCounterArr.hours ||
                    firstCounterArr.minutes - secondCounterArr.minutes;
                    if (triangle) {
                        return -result;
                    } else {
                        return result;
                    }
                }
                });
            messageContainer.innerHTML = '';
            childrens.forEach(child => messageContainer.appendChild(child));
        }
        this.markListener(mark);
    }

    public triangleListener(): void {
        const triangleBtn = <HTMLElement>document.querySelector('.filters__triangle');
        triangleBtn?.addEventListener('click', () => {
            this.triangle = !this.triangle;
            if(this.triangle) {
                triangleBtn.style.transform = 'rotate(0deg)';
            } else {
                triangleBtn.style.transform = 'rotate(180deg)';
            }
            const activeSortButton = <HTMLElement>document.querySelector('.active');
            if (activeSortButton) {
                const attribute = activeSortButton.getAttribute('data-sort-attribute');
                const mark = <HTMLImageElement>activeSortButton.querySelector('.filters__dropdown-menu_content-checked');
                if (attribute === 'date') {
                    this.sortByDate(activeSortButton, mark, this.triangle);
                } else if (attribute) {
                    this.sortMessages(activeSortButton, attribute, mark, this.triangle);
                }
            }
        });
    }
}
