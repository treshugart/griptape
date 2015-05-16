(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './compile', './scope', '../util/namespace-join', '../util/namespace-split'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./compile'), require('./scope'), require('../util/namespace-join'), require('../util/namespace-split'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiCompile, global.apiScope, global.utilNamespaceJoin, global.utilNamespaceSplit);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _compile, _scope, _utilNamespaceJoin, _utilNamespaceSplit) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiCompile = _interopRequire(_compile);

  var _apiScope = _interopRequire(_scope);

  var _utilNamespaceJoin2 = _interopRequire(_utilNamespaceJoin);

  var _utilNamespaceSplit2 = _interopRequire(_utilNamespaceSplit);

  module.exports = function (expression, scope) {
    scope = scope || (0, _apiScope)();

    var namespace = (0, _utilNamespaceSplit2)(expression);
    var propertyName = namespace.pop();
    var namespaceName = (0, _utilNamespaceJoin2)(namespace);
    var compiledExpression = (0, _apiCompile)(expression);
    var compiledPropertyName = (0, _apiCompile)(propertyName);
    var compiledNamespaceName = (0, _apiCompile)(namespaceName);

    return {
      currentScope: scope,
      namespaceName: namespaceName,
      propertyName: propertyName,
      namespaceValue: function namespaceValue() {
        return namespaceName ? compiledNamespaceName(scope) : scope;
      },
      propertyValue: function propertyValue() {
        return compiledPropertyName(this.namespaceValue());
      },
      value: function value() {
        return compiledExpression(scope);
      } };
  };
});