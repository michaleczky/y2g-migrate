const yargs = require('yargs');
const helpers = require('./lib/helpers');

const argv = yargs
    .usage('$0 <command> [options]')
    .command('members', 'List members')
    .demandOption('n')
    .example('$0 members [--store|-s]')
    .alias('n', 'name')
    .describe('n', 'Provide YahooGroups\' group name')
    .nargs('n', 1)
    .alias('s', 'store')
    .describe('s', 'Store results in the local storage')
    .nargs('s', 1)
    .help('h')
    .alias('h', 'help')
    .argv;

let secrets;

secrets = helpers.readJSONAsync('./secrets.json').then((secrets) => {
    console.dir(argv);
    if (argv.members) {
        const api = new YahooGroupsAPI('test', secrets.YahooGroups);
    }
});
