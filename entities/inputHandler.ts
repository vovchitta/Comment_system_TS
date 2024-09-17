class InputHandler {
    private input: HTMLInputElement = document.querySelector('.user-form__inputs_input');
    private sendBtn: HTMLButtonElement = document.querySelector('.user-form__inputs_send-button');
    private limit: HTMLElement = document.querySelector('.user-form__labels_character-limit');
    private userForm: HTMLElement = document.querySelector('.user-form__labels');

    constructor() {}

    public inputHandlerCheck = (event: Event): void => {

        this.input.style.height = '61px';
        this.input.style.height = this.input.scrollHeight + 'px';

        if (this.input.value.length > 0) {
            this.sendBtn.disabled = false;
            this.sendBtn.style.backgroundColor = '#ABD873';
            this.sendBtn.style.opacity = '1';
            this.sendBtn.style.cursor = 'pointer';
            this.limit.textContent = `${this.input.value.length}/1000`;
        } else {
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
        console.log(this.input.value.length);
    }
}

    public inputEventListener(): void {
        this.input.addEventListener('input', this.inputHandlerCheck);
    }
}
