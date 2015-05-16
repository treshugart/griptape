(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/expression'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/expression'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiExpression);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiExpression) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiExpression2 = _interopRequire(_apiExpression);

  module.exports = {
    attached: function attached(element) {
      var expr = (0, _apiExpression2)(element.getAttribute('gt-text'));
      element.textContent = expr.propertyValue();
    }
  };
});