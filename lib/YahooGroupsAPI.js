const axios = require('axios');

const MESSAGE_ENDPOINT = (groupName, msgNumber) => `https://groups.yahoo.com/api/v1/groups/${groupName}/messages/${msgNumber}/raw`;
const MEMBERS_ENDPOINT = (groupName) => `https://groups.yahoo.com/api/v1/groups/${groupName}/members/confirmed`;

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
            throw new Error('Invalid response (non-JSON), possible authentication error.');
        }
        return new MembersList(resp.data);
    }

    _isResponseValid(response) {
        return response.headers['content-type'].toLowerCase().startsWith('application/json');
    }

}

class MembersList {
    constructor (ygMessage) {
        this.data = ygMessage;
        if (!this.data.hasOwnProperty('ygData')) {
            this.data.ygData = {};
        }
    }

    [Symbol.iterator]() {
        let index = -1;
        let data = this.data.ygData.members || [];
        return {
            next: () => ({value: new Member(data[++index]), done: !(index in data)})
        };
    }
}

class Member {
    constructor (data) {
        this.data = data;
    }

    get getDate() {
        return this.data.date;
    }

    get userId() {
        return this.data.userId;
    }

    get email() {
        return this.data.email;
    }
}

class Message {
    constructor (ygMessage) {
        this.ygMessage = ygMessage;
    }

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