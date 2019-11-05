const helpers = require('./helpers');
const yargs = require('yargs');
const storage = require('node-persist');
const YahooGroupsAPI = require('./YahooGroupsAPI');

class CommandBase {
    constructor() {
        this.command = '';
        this.description = '';
    }

    async getSecretsAsync() {
        return await helpers.readJSONAsync('./.secrets.json');
    }

    getGroupNameFromArgs() {
        return yargs.argv.name;
    }
}

class MembersListCommand extends CommandBase {
    constructor(props) {
        super(props);
        this.command = 'members';
        this.description = 'List members';
    }

    buildOptions() {
        return yargs
            .alias('n', 'name')
            .describe('n', 'Provide YahooGroups\' group name')
            .nargs('n', 1)
            .alias('s', 'store')
            .describe('s', 'Store results in the local storage');
    }

    action() {
        const argv = yargs.argv;
        (async () => {
            try {
                const secrets = await super.getSecretsAsync();
                const groupName = super.getGroupNameFromArgs();
                if (!groupName) throw new Error('Yahoo Groups group name is not specified');
                let api = new YahooGroupsAPI(groupName, secrets.YahooGroups);
                let members = await api.getMembersListAsync();
                if (argv.store) {
                    await storage.init();
                    let res = await storage.setItem('members', members.data);
                    console.log(`${Array.from(members).length} members is written to ${res.file}`);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }
}

module.exports = {
    MembersListCommand
}