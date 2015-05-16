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

  var currentScope = window;

  module.exports = function (def) {
    if (typeof def === 'undefined') {
      return currentScope;
    }

    currentScope = def;

    // Ensure scope functions are bound to the scope so that when bindings
    // execute the function outside of the scope they are still bound to it.
    for (var a in currentScope) {
      if (typeof currentScope[a] === 'function') {
        currentScope[a] = currentScope[a].bind(currentScope);
      }
    }

    return this;
  };
});