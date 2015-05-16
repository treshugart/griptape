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

  module.exports = namespaceSplit;

  function namespaceSplit(js) {
    var nameChars = '[^ a-zA-Z0-9_$]+';
    js = js || '';
    js = js.replace(new RegExp('^' + nameChars, 'g'), '');
    js = js.replace(new RegExp(nameChars + '$', 'g'), '');
    return js.split(/[\[\]\.]+(?=(?:[^"\\]*(?:\\.|"(?:[^"\\]*\\.)*[^"\\]*"))*[^"]*$)/);
  }
});