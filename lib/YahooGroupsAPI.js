const axios = require('axios');

const MESSAGE_ENDPOINT = (groupName, msgNumber) => `https://groups.yahoo.com/api/v1/groups/${groupName}/messages/${msgNumber}/raw`;
const MEMBERS_ENDPOINT = (groupName) => `https://groups.yahoo.com/api/v1/groups/${groupName}/members/confirmed?count=100`;
const MESSAGELIST_ENDPOINT = (groupName, count) => `https://groups.yahoo.com/api/v1/groups/${groupName}/messages?count=${count}`;
const INVALIDRESPONSE = 'Invalid response (non-JSON), possible authentication error.';

module.exports = class YahooGroupsAPI {

    constructor(groupName, options = {}) {
        this.groupName = groupName;
        let cookie_T = options.hasOwnProperty('cookie_T') ? options.cookie_T : '';
        let cookie_Y = options.hasOwnProperty('cookie_Y') ? options.cookie_Y : '';
        let headers = {};
        if (cookie_Y && cookie_T) {
            headers.Cookie = `Y=${cookie_Y}; T=${cookie_T};`;
        }
        this.headers = headers;
    }

    async getMessageAsync(msgNumber) {
        const url = MESSAGE_ENDPOINT(this.groupName, msgNumber);
        const resp = await axios.get(url, { headers: this.headers });
        return new Message(resp.data);
    }

    async getMembersListAsync() {
        const url = MEMBERS_ENDPOINT(this.groupName);
        const resp = await axios.get(url, { headers: this.headers});
        if (!this._isResponseValid(resp)) {
            throw new Error(INVALIDRESPONSE);
        }
        return new MembersList(resp.data);
    }

    async getMessageListAsync(count = 100) {
        const url = MESSAGELIST_ENDPOINT(this.groupName, count);
        const resp = await axios.get(url, { headers: this.headers });
        if (!this._isResponseValid(resp)) {
            throw new Error(INVALIDRESPONSE)
        }
        return new MessageList(resp.data);
    }

    async getMessageCountAsync() {  // TODO: rename this to getTotalMessageCount()
        const list = await this.getMessageListAsync();
        return list.totalRecords;
    }

    _isResponseValid(response) {
        return response.headers['content-type'].toLowerCase().startsWith('application/json');
    }

};

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
}

class Message extends YahooGroupsEntityBase {

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