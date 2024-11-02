"use strict";
class StorageLogic {
    constructor() { }
    messageSaver(value) {
        localStorage.setItem('messageList', value);
    }
    messageLoader(messageContainer) {
        const currentMessageList = localStorage.getItem('messageList');
        if (currentMessageList) {
            if (messageContainer) {
                messageContainer.innerHTML = currentMessageList;
            }
        }
    }
}
