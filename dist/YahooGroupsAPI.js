"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MESSAGE_ENDPOINT = function MESSAGE_ENDPOINT(groupName, msgNumber) {
  return "https://groups.yahoo.com/api/v1/groups/".concat(groupName, "/messages/").concat(msgNumber, "/raw");
};

var MEMBERS_ENDPOINT = function MEMBERS_ENDPOINT(groupName) {
  return "https://groups.yahoo.com/api/v1/groups/".concat(groupName, "/members/confirmed");
};

var YahooGroupsAPI =
/*#__PURE__*/
function () {
  function YahooGroupsAPI(groupName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, YahooGroupsAPI);

    this.groupName = groupName;
    var cookie_T = options.hasOwnProperty('cookie_T') ? options.cookie_T : '';
    var cookie_Y = options.hasOwnProperty('cookie_Y') ? options.cookie_Y : '';
    var headers = {};

    if (cookie_Y && cookie_T) {
      headers.Cookie = "Y=".concat(cookie_Y, "; T=").concat(cookie_T, ";");
    }

    this.headers = headers;
  }

  _createClass(YahooGroupsAPI, [{
    key: "getMessageAsync",
    value: function () {
      var _getMessageAsync = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(msgNumber) {
        var url, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = MESSAGE_ENDPOINT(this.groupName, msgNumber);
                _context.next = 3;
                return _axios["default"].get(url, {
                  headers: this.headers
                });

              case 3:
                resp = _context.sent;
                return _context.abrupt("return", new Message(resp.data));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMessageAsync(_x) {
        return _getMessageAsync.apply(this, arguments);
      }

      return getMessageAsync;
    }()
  }, {
    key: "getMembersListAsync",
    value: function () {
      var _getMembersListAsync = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var url, resp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = MEMBERS_ENDPOINT(this.groupName);
                _context2.next = 3;
                return _axios["default"].get(url, {
                  headers: this.headers
                });

              case 3:
                resp = _context2.sent;

                if (this._isResponseValid(resp)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Invalid response (non-JSON), possible authentication error.');

              case 6:
                return _context2.abrupt("return", new MembersList(resp.data));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMembersListAsync() {
        return _getMembersListAsync.apply(this, arguments);
      }

      return getMembersListAsync;
    }()
  }, {
    key: "_isResponseValid",
    value: function _isResponseValid(response) {
      return response.headers['content-type'].toLowerCase().startsWith('application/json');
    }
  }]);

  return YahooGroupsAPI;
}();

exports["default"] = YahooGroupsAPI;

var MembersList =
/*#__PURE__*/
function () {
  function MembersList(ygMessage) {
    _classCallCheck(this, MembersList);

    this.ygMessage = ygMessage;

    if (!this.ygMessage.hasOwnProperty('ygData')) {
      this.ygMessage.ygData = {};
    }
  }

  _createClass(MembersList, [{
    key: Symbol.iterator,
    value: function value() {
      var index = -1;
      var data = this.ygMessage.ygData.members || [];
      return {
        next: function next() {
          return {
            value: new Member(data[++index]),
            done: !(index in data)
          };
        }
      };
    }
  }]);

  return MembersList;
}();

var Member =
/*#__PURE__*/
function () {
  function Member(data) {
    _classCallCheck(this, Member);

    this.data = data;
  }

  _createClass(Member, [{
    key: "getDate",
    get: function get() {
      return this.data.date;
    }
  }, {
    key: "userId",
    get: function get() {
      return this.data.userId;
    }
  }, {
    key: "email",
    get: function get() {
      return this.data.email;
    }
  }]);

  return Member;
}();

var Message =
/*#__PURE__*/
function () {
  function Message(ygMessage) {
    _classCallCheck(this, Message);

    this.ygMessage = ygMessage;
  }

  _createClass(Message, [{
    key: "postDate",
    get: function get() {
      return this.ygMessage.ygData.postDate;
    }
  }, {
    key: "authorName",
    get: function get() {
      return this.ygMessage.ygData.authorName;
    }
  }, {
    key: "from",
    get: function get() {
      return this.ygMessage.ygData.from;
    }
  }, {
    key: "subject",
    get: function get() {
      return this.ygMessage.ygData.subject;
    }
  }, {
    key: "rawEmail",
    get: function get() {
      return this.ygMessage.ygData.rawEmail;
    }
  }]);

  return Message;
}();
//# sourceMappingURL=YahooGroupsAPI.js.map