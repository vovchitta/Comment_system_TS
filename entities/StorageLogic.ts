class StorageLogic {
    constructor() {}

    public messageSaver(value: string): void {
        localStorage.setItem('messageList', value);
    }

    public messageLoader(messageContainer: HTMLElement | null): void {
        const currentMessageList: string | null = localStorage.getItem('messageList');
        if(currentMessageList) {
            if(messageContainer) {
                messageContainer.innerHTML = currentMessageList;
            }
        }
    }
}
