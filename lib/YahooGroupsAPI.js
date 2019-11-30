const axios = require('axios');
const MembersList = require('./Entities').MembersList;
const MessageList = require('./Entities').MessageList;
const Message = require('./Entities').Message;

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

    _isResponseValid(response) {
        return response.headers['content-type'].toLowerCase().startsWith('application/json');
    }

}