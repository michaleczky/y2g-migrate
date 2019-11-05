const yargs = require('yargs');
const commands = require('./lib/Commands');

yargs.usage('$0 <command> [options]');
for (let commandClass of [commands.MembersListCommand]) {
    let command = new commandClass();
    yargs.command(command.command, command.description, command.buildOptions, command.action);
}
yargs.help('h').alias('h', 'help');
yargs.argv;