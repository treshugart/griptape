(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/expression', '../api/scope-callback', 'skatejs'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/expression'), require('../api/scope-callback'), require('skatejs'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiExpression, global.apiScopeCallback, global.skate);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiExpression, _apiScopeCallback, _skatejs) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiExpression2 = _interopRequire(_apiExpression);

  var _apiScopeCallback2 = _interopRequire(_apiScopeCallback);

  var _skate = _interopRequire(_skatejs);

  module.exports = {
    attached: function attached(element, done) {
      var template = document.getElementById(element.getAttribute('gt-template'));
      var html = template.innerHTML.replace('{{content}}', element.innerHTML);
      var data = (0, _apiExpression2)(element.getAttribute('gt-template-data'));

      (0, _apiScopeCallback2)(data.value(), function () {
        if (element.hasAttribute('gt-template-replace')) {
          element = document.createElement('div');
        }

        element.innerHTML = html;
        _skate.init(element.children);
        done(element);
      });
    }
  };
});