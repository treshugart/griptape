(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './compile', './scope'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./compile'), require('./scope'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiCompile, global.apiScope);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _compile, _scope) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiCompile = _interopRequire(_compile);

  var _apiScope = _interopRequire(_scope);

  module.exports = function (js, customScope) {
    return (0, _apiCompile)(js)(customScope || (0, _apiScope)());
  };
});