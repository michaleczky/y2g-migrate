export default class YahooGroupsMessage {
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