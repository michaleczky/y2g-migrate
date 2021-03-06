const helpers = require('./helpers');
const yargs = require('yargs');
const Storage = require('./Storage');
const YahooGroupsAPI = require('./YahooGroupsAPI');

const DEFAULTMSGCOUNT = 10000;

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

    getStorage() {
        return new Storage();
    }
}

class MembersListCommand extends CommandBase {
    constructor(props) {
        super(props);
        this.command = 'members';
        this.description = 'Archive members into the local storage';
    }

    buildOptions() {
        return yargs
            .demandOption('n');
    }

    action() {
        (async () => {
            try {
                const secrets = await super.getSecretsAsync();
                const groupName = super.getGroupNameFromArgs();
                if (!groupName) throw new Error('Yahoo Groups group name is not specified');
                let api = new YahooGroupsAPI(groupName, secrets.YahooGroups);
                let members = await api.getMembersListAsync();
                let result = await super.getStorage().setMembersAsync(members);
                console.log(`${Array.from(members).length} members is written to ${result.file}`);
            } catch (e) {
                console.error(e);
            }
        })();
    }
}

class MessageListCommand extends CommandBase {
    constructor(props) {
        super(props);
        this.command = 'msglist';
        this.description = 'Archive the list of messages to local storage';
    }

    buildOptions() {
        return yargs
            .demandOption('n')
            .alias('c', 'count')
            .describe('c', `Message count to archive in the index (default ${DEFAULTMSGCOUNT})`)
            .nargs('c', 1);
    }

    action() {
        const argv = yargs.argv;
        (async () => {
            try {
                const secrets = await super.getSecretsAsync();
                const groupName = super.getGroupNameFromArgs();
                const count = argv.count || DEFAULTMSGCOUNT;
                if (!groupName) throw new Error('Yahoo Groups group name is not specified');
                let api = new YahooGroupsAPI(groupName, secrets.YahooGroups);
                let messageList = await api.getMessageListAsync(count);
                let result = await super.getStorage().setMessagesAsync(messageList);
                console.log(`${messageList.length} messages are stored in ${result.file}.`);
                if (messageList.totalRecords > count) {
                    console.log(`WARNING! Not all messages are stored in the index! (totalRecords=${msgList.totalRecords})`);
                    console.log(`Use -c switch to specify the maximum number. By default it is ${DEFAULTMSGCOUNT}`);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }
}

class ArchiveMessagesCommand extends CommandBase {
    constructor(props) {
        super(props);
        this.command = 'archive';
        this.description = 'Archive all messages to local storage';
    }

    buildOptions() {
        return yargs
            .demandOption('n');
    }

    action() {
        const argv = yargs.argv;
        (async () => {
            try {
                const secrets = await super.getSecretsAsync();
                const groupName = super.getGroupNameFromArgs();
                if (!groupName) throw new Error('Yahoo Groups group name is not specified');
                let api = new YahooGroupsAPI(groupName, secrets.YahooGroups);
                let messageList = await api.getMessageListAsync(count);
                let result = await super.getStorage().storage.setItem(messageList);
                console.log(`${messageList.length} messages are stored in ${result.file}.`);
                if (messageList.totalRecords > count) {
                    console.log(`WARNING! Not all messages are stored in the index! (totalRecords=${msgList.totalRecords})`);
                    console.log(`Use -c switch to specify the maximum number. By default it is ${DEFAULTMSGCOUNT}`);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }
}

module.exports = {
    MembersListCommand,
    MessageListCommand,
    ArchiveMessagesCommand
};