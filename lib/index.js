(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './api/compile', './api/expression', './api/scope', './api/scope-callback', './api/scope-eval', './binding/attr', './binding/click', './binding/each', './binding/if', './binding/template', './binding/text', './binding/trim', './binding/value', './binding/with', 'skatejs'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./api/compile'), require('./api/expression'), require('./api/scope'), require('./api/scope-callback'), require('./api/scope-eval'), require('./binding/attr'), require('./binding/click'), require('./binding/each'), require('./binding/if'), require('./binding/template'), require('./binding/text'), require('./binding/trim'), require('./binding/value'), require('./binding/with'), require('skatejs'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiCompile, global.apiExpression, global.apiScope, global.apiScopeCallback, global.apiScopeEval, global.bindingAttr, global.bindingClick, global.bindingEach, global.bindingIf, global.bindingTemplate, global.bindingText, global.bindingTrim, global.bindingValue, global.bindingWith, global.skate);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiCompile, _apiExpression, _apiScope, _apiScopeCallback, _apiScopeEval, _bindingAttr, _bindingClick, _bindingEach, _bindingIf, _bindingTemplate, _bindingText, _bindingTrim, _bindingValue, _bindingWith, _skatejs) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiCompile2 = _interopRequire(_apiCompile);

  var _apiExpression2 = _interopRequire(_apiExpression);

  var _apiScope2 = _interopRequire(_apiScope);

  var _apiScopeCallback2 = _interopRequire(_apiScopeCallback);

  var _apiScopeEval2 = _interopRequire(_apiScopeEval);

  var _bindingAttr2 = _interopRequire(_bindingAttr);

  var _bindingClick2 = _interopRequire(_bindingClick);

  var _bindingEach2 = _interopRequire(_bindingEach);

  var _bindingIf2 = _interopRequire(_bindingIf);

  var _bindingTemplate2 = _interopRequire(_bindingTemplate);

  var _bindingText2 = _interopRequire(_bindingText);

  var _bindingTrim2 = _interopRequire(_bindingTrim);

  var _bindingValue2 = _interopRequire(_bindingValue);

  var _bindingWith2 = _interopRequire(_bindingWith);

  var _skate = _interopRequire(_skatejs);

  (0, _skate)('gt-attr', _bindingAttr2);
  (0, _skate)('gt-click', _bindingClick2);
  (0, _skate)('gt-each', _bindingEach2);
  (0, _skate)('gt-if', _bindingIf2);
  (0, _skate)('gt-template', _bindingTemplate2);
  (0, _skate)('gt-text', _bindingText2);
  (0, _skate)('gt-trim', _bindingTrim2);
  (0, _skate)('gt-value', _bindingValue2);
  (0, _skate)('gt-with', _bindingWith2);

  module.exports = window.griptape = {
    compile: _apiCompile2,
    expression: _apiExpression2,
    scope: _apiScope2,
    scopeCallback: _apiScopeCallback2,
    scopeEval: _apiScopeEval2
  };
});