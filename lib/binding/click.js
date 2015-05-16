(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/compile', '../api/scope'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/compile'), require('../api/scope'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiCompile, global.apiScope);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiCompile, _apiScope) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiCompile2 = _interopRequire(_apiCompile);

  var _apiScope2 = _interopRequire(_apiScope);

  module.exports = {
    created: function created(element) {
      var value = (0, _apiCompile2)(element.getAttribute('gt-click'));
      var currentScope = (0, _apiScope2)();

      element.addEventListener('click', function (e) {
        var handler = value(currentScope);

        if (typeof handler === 'function') {
          handler(e);
        } else {
          e.preventDefault();
        }
      });
    }
  };
});