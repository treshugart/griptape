(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './scope'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./scope'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiScope);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _scope) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiScope = _interopRequire(_scope);

  module.exports = function (value, callback) {
    var specials = arguments[2] === undefined ? {} : arguments[2];

    var oldScope = (0, _apiScope)();
    var newScope = {};

    if (value && typeof value === 'object') {
      newScope = value;
    }

    specials.parent = oldScope;
    specials.value = value;

    for (var name in specials) {
      var specialName = '$' + name;

      if (!newScope[specialName]) {
        newScope[specialName] = specials[name];
      }
    }

    (0, _apiScope)(newScope);
    callback(newScope, oldScope);
    (0, _apiScope)(oldScope);

    return this;
  };
});