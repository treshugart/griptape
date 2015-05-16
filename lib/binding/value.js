(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/expression', '../api/scope', 'witness'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/expression'), require('../api/scope'), require('witness'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiExpression, global.apiScope, global.witness);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiExpression, _apiScope, _witness) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiExpression2 = _interopRequire(_apiExpression);

  var _apiScope2 = _interopRequire(_apiScope);

  var _witness2 = _interopRequire(_witness);

  module.exports = {
    created: function created(element) {
      var expr = (0, _apiExpression2)(element.getAttribute('gt-value'));
      var observer = (0, _witness2)(expr.namespaceValue());
      var currentScope = (0, _apiScope2)();

      observer.on('change', function (change) {
        if (change.name === expr.propertyName) {
          element.value = change.newValue;
        }
      });

      element.addEventListener('change', function () {
        currentScope[expr.propertyName] = element.value;
      });
    }
  };
});