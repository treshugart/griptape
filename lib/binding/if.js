(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/expression', 'witness'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/expression'), require('witness'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiExpression, global.witness);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiExpression, _witness) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiExpression2 = _interopRequire(_apiExpression);

  var _witness2 = _interopRequire(_witness);

  module.exports = {
    attached: function attached(element) {
      var gtIf = element.getAttribute('gt-if');
      var placeholder = document.createComment(' gt-if: ' + gtIf + ' ');
      var expr = (0, _apiExpression2)(gtIf);
      var observer = (0, _witness2)(expr.namespaceValue());
      var parent = element.parentNode;
      var isInDom = false;

      element.setAttribute('data-skate-ignore');
      element.removeAttribute('gt-if');
      parent.insertBefore(placeholder, element);
      parent.removeChild(element);

      if (expr.value()) {
        parent.insertBefore(element.cloneNode(true), placeholder);
        isInDom = true;
      }

      observer.on('change', function () {
        var propertyValue = expr.value();

        if (!isInDom && propertyValue) {
          parent.insertBefore(element.cloneNode(true), placeholder);
          isInDom = true;
        } else if (isInDom && !propertyValue) {
          parent.removeChild(placeholder.previousSibling);
          isInDom = false;
        }
      });
    }
  };
});