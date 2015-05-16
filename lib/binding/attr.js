(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/compile', '../api/scope', '../util/each', 'witness'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/compile'), require('../api/scope'), require('../util/each'), require('witness'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiCompile, global.apiScope, global.utilEach, global.witness);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiCompile, _apiScope, _utilEach, _witness) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiCompile2 = _interopRequire(_apiCompile);

  var _apiScope2 = _interopRequire(_apiScope);

  var _utilEach2 = _interopRequire(_utilEach);

  var _witness2 = _interopRequire(_witness);

  module.exports = {
    created: function created(element) {
      var value = (0, _apiCompile2)(element.getAttribute('gt-attr'));
      var currentScope = (0, _apiScope2)();

      element._observer = (0, _witness2)(currentScope);
      element._observer.on('change', function (change) {
        attr(change.name, change.newValue);
      });

      (0, _utilEach2)(value(currentScope), function (value, name) {
        attr(element, name, value);
      });

      function attr(element, name, value) {
        if (element[name] === undefined) {
          element.setAttribute(name, value);
        } else {
          element[name] = value;
        }
      }
    },

    detached: function detached(element) {
      element._observer.stop();
      delete element._observer;
    }
  };
});