(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/scope-callback', '../api/scope-eval', 'skatejs'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/scope-callback'), require('../api/scope-eval'), require('skatejs'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiScopeCallback, global.apiScopeEval, global.skate);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiScopeCallback, _apiScopeEval, _skatejs) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiScopeCallback2 = _interopRequire(_apiScopeCallback);

  var _apiScopeEval2 = _interopRequire(_apiScopeEval);

  var _skate = _interopRequire(_skatejs);

  module.exports = {
    created: function created(element) {
      (0, _apiScopeCallback2)((0, _apiScopeEval2)(element.getAttribute('gt-with')), function () {
        _skate.init(element);
      });
    }
  };
});