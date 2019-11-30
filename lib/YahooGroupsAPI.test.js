const chai = require('chai');
const expect = chai.expect;
const YahooGroupsAPI = require('./YahooGroupsAPI');
const helpers = require('./helpers');

describe('YahooGroupsAPI', async () => {

    const TESTGROUP_NAME = 'chain-mail';
    const SECRETPATH = './.secrets.json';

    it('should build the request header correctly', async () => {
       const secrets = {
           YahooGroups: {
               cookie_T: 'cookie_T',
               cookie_Y: 'cookie_Y'
           }
       };
       const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
       const uut = api.headers;
       expect(uut.Cookie).is.equal('Y=cookie_Y; T=cookie_T;');
    });

    it('should authenticate with the secret cookies', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const uut = Array.from(await api.getMembersListAsync());
        expect(uut.length).is.above(0);
    });

    it('should return a list of members', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const uut = await api.getMembersListAsync();
        expect(Array.from(uut).length).is.equal(23);
    });

    it('should return raw data of members\' list', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const uut = await api.getMembersListAsync();
        expect(uut.data.hasOwnProperty('ygData')).is.true;
    });

    it('should return list of messages', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const list = await api.getMessageListAsync();
        const uut = Array.from(list);
        expect(uut.length).is.equals(100);
    });

    it('should return a valid message list item', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const list = await api.getMessageListAsync();
        const uut = Array.from(list)[0];
        expect(uut.messageId).is.above(0);
        expect(uut.author.length).is.not.equals(0);
        expect(uut.date).is.within(852076800, 1577836800);
        expect(uut.length).is.above(0);
        expect(uut.summary.length).is.above(0);
    });

    it('should provide valid email in all message', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const list = await api.getMessageListAsync();
        const uut = Array.from(list);
        uut.forEach((m) => {
            expect(m.email).is.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        });
    });

    it('should return a valid message', async () => {
        const secrets = await helpers.readJSONAsync(SECRETPATH);
        const api = new YahooGroupsAPI(TESTGROUP_NAME, secrets.YahooGroups);
        const uut = await api.getMessageAsync(1);
        expect(uut.postDate).is.equal('942861971');
        expect(uut.authorName).is.not.empty;
        expect(uut.from).is.not.empty;
        expect(uut.subject).is.not.empty;
        expect(uut.rawEmail).is.not.empty;
    });

});