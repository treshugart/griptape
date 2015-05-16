(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.unknown = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  module.exports = error;

  function error(msg) {
    for (var a = 1; a < arguments.length; a++) {
      msg = msg.replace(new RegExp('\\$' + a, 'g'), arguments[a]);
    }

    throw new Error(msg);
  }
});