(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/error'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/error'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.utilError);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _utilError) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _utilError2 = _interopRequire(_utilError);

  module.exports = function (js) {
    return function (ctx) {
      try {
        return new Function('ctx', 'with (ctx) { return ' + js + '; }')(ctx);
      } catch (e) {
        (0, _utilError2)('Error parsing "$1" with message: $2', js, e.message);
      }
    };
  };
});