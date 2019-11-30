
class YahooGroupsEntityBase {
    constructor (ygMessage) {
        this.ygMessage = ygMessage;
        if (!this.ygMessage.hasOwnProperty('ygData')) {
            this.ygMessage.ygData = {};
        }
    }

    get data() { return this.ygMessage; }

    toString() { return JSON.stringify(this.ygMessage, null, 2); }
}

class MembersList extends YahooGroupsEntityBase {
    [Symbol.iterator]() {
        let index = -1;
        let data = this.ygMessage.ygData.members || [];
        return {
            next: () => ({value: new Member(data[++index]), done: !(index in data)})
        };
    }

}

class Member {

    constructor(data) {
        this.data = data;
    }

    get date() {
        return this.data.date;
    }

    get userId() {
        return this.data.userId;
    }

    get email() {
        return this.data.email;
    }
}

class MessageList extends YahooGroupsEntityBase {

    get totalRecords() {
        return this.ygMessage.ygData.totalRecords || -1;
    }

    get length() {
        return this.ygMessage.ygData.messages.length;
    }

    [Symbol.iterator]() {
        let index = -1;
        let data = this.ygMessage.ygData.messages || [];
        return {
            next: () => ({value: new MessageListItem(data[++index]), done: !(index in data)})
        };
    }
}

class MessageListItem {
    constructor(data) {
        this.data = data;
    }

    get messageId() { return this.data.messageId; }

    get subject() { return this.data.subject; }

    get author() { return this.data.author; }

    get email() {
        if (this.data.yahooAlias) {
            return `${this.data.yahooAlias}@yahoo.com`;
        }
        else {
            return this.data.email;
        }
    }

    get date() {
        return this.data.date;
    }

    get parent() {
        return this.data.parent;
    }

    get hasAttachments() {
        return this.hasAttachments;
    }

    get length() {
        return this.data.length;
    }

    get summary() {
        return this.data.summary;
    }
}

class Message {

    get postDate() {
        return this.ygMessage.ygData.postDate;
    }

    get authorName() {
        return this.ygMessage.ygData.authorName;
    }

    get from() {
        return this.ygMessage.ygData.from;
    }

    get subject() {
        return this.ygMessage.ygData.subject;
    }

    get rawEmail() {
        return this.ygMessage.ygData.rawEmail;
    }

}

module.exports = {
    MembersList, Member, MessageList, MessageListItem, Message
}