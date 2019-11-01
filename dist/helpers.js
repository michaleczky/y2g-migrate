"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileAsync = readFileAsync;
exports.readJSONAsync = readJSONAsync;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function readFileAsync(fileName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _fs["default"].readFile(fileName, 'utf8', function (error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

function readJSONAsync(fileName) {
  return readFileAsync(fileName).then(function (data) {
    return JSON.parse(data);
  });
}
//# sourceMappingURL=helpers.js.map