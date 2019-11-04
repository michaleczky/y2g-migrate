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
        expect(Array.from(uut).length).is.equal(10);
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