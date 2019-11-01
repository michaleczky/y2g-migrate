"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _helpers = require("./helpers");

var _YahooGroupsAPI = require("./YahooGroupsAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var argv = _yargs["default"].usage('$0 <command> [options]').command('members', 'List members').demandOption('n').example('$0 members [--store|-s]').alias('n', 'name').describe('n', 'Provide YahooGroups\' group name').nargs('n', 1).alias('s', 'store').describe('s', 'Store results in the local storage').nargs('s', 1).help('h').alias('h', 'help').argv;

var secrets;
secrets = (0, _helpers.readJSONAsync)('./secrets.json').then(function (secrets) {
  console.dir(argv);

  if (argv.members) {//const api = new YahooGroupsAPI();
  }
});
console.dir(argv);
//# sourceMappingURL=app.js.map