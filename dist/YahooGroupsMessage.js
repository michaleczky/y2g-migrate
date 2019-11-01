"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YahooGroupsMessage =
/*#__PURE__*/
function () {
  function YahooGroupsMessage(ygMessage) {
    _classCallCheck(this, YahooGroupsMessage);

    this.ygMessage = ygMessage;
  }

  _createClass(YahooGroupsMessage, [{
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

  return YahooGroupsMessage;
}();

exports["default"] = YahooGroupsMessage;
//# sourceMappingURL=YahooGroupsMessage.js.map