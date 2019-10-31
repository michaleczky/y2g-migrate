'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = _yargs2.default.usage('y2g-migrate').option('i', {
    alias: 'interval',
    describe: 'Provide the interval',
    type: 'date'
}).argv;

console.log("Hello!");