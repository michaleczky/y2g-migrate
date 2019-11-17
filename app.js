const yargs = require('yargs');
const commands = require('./lib/Commands');

yargs.usage('$0 <command> [options]');
for (let commandClass of [commands.MembersListCommand, commands.MessageListCommand]) {
    let command = new commandClass();
    yargs.command(command.command, command.description, command.buildOptions, command.action);
}

yargs
    .demandCommand(1)
    .alias('n', 'name')
    .describe('n', 'Provide YahooGroups\' group name')
    .nargs('n', 1)
    .help('h')
    .alias('h', 'help')
    .argv;