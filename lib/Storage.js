const storage = require('node-persist');

class Storage {
    constructor() {
        this.members = null;
        this.messages = null;
    }

    async getMembersAsync() {
        if (!this.members) {
            await storage.init();
            const data = await storage.getItem('members');
            this.members = new MembersList(data);
        }
        return this.members;
    }

    async setMembersAsync(members) {
        await storage.init();
        this.members = members;
        return storage.setItem('members', members.data);
    }

    async getMessagesAsync() {
        if (!this.messages) {
            await storage.init();
            const data = await storage.getItem('index');
            this.messageListList = new MembersList(data);
        }
        return this.messages;
    }

    async setMessagesAsync(messages) {
        await storage.init();
        this.messages = messages;
        return storage.setItem('index', messages.data);
    }

}

module.exports = Storage;