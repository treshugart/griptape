(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../api/expression', '../api/scope-callback', '../util/each', '../util/inherit', '../util/insert-node-before', 'skatejs', 'witness'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../api/expression'), require('../api/scope-callback'), require('../util/each'), require('../util/inherit'), require('../util/insert-node-before'), require('skatejs'), require('witness'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.apiExpression, global.apiScopeCallback, global.utilEach, global.utilInherit, global.utilInsertNodeBefore, global.skate, global.witness);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _apiExpression, _apiScopeCallback, _utilEach, _utilInherit, _utilInsertNodeBefore, _skatejs, _witness) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _apiExpression2 = _interopRequire(_apiExpression);

  var _apiScopeCallback2 = _interopRequire(_apiScopeCallback);

  var _utilEach2 = _interopRequire(_utilEach);

  var _utilInherit2 = _interopRequire(_utilInherit);

  var _utilInsertNodeBefore2 = _interopRequire(_utilInsertNodeBefore);

  var _skate = _interopRequire(_skatejs);

  var _witness2 = _interopRequire(_witness);

  module.exports = {
    attached: function attached(element) {
      var index = 0;
      var gtEach = element.getAttribute('gt-each');
      var expr = (0, _apiExpression2)(gtEach);
      var propertyValue = expr.propertyValue();
      var observer = (0, _witness2)(propertyValue);
      var parent = element.parentNode;
      var placeholder = document.createComment(' gt-each: ' + gtEach + ' ');
      var scopes = [];

      // We don't want this element or it's children to be initialised.
      element.setAttribute('data-skate-ignore', '');

      // Prepare for using as a template.
      element.removeAttribute('gt-each');
      parent.insertBefore(placeholder, element);
      parent.removeChild(element);

      observer.on('add', function (change) {
        insert(change.index, change.name, change.newValue);
      });

      observer.on('update', function (change) {
        insert(change.index, change.name, change.newValue);
      });

      observer.on('delete', function (change) {
        remove(change.index);
      });

      (0, _utilEach2)(propertyValue, function (item, name) {
        insert(index, name, item);
        ++index;
      });

      function insert(index, name, newScope) {
        var dolly = element.cloneNode(true);

        (0, _apiScopeCallback2)(newScope, function (scope) {
          if (scopes[index]) {
            (0, _utilInherit2)(scopes[index], scope);
          } else {
            scopes[index] = scope;
          }

          (0, _utilInsertNodeBefore2)(dolly, placeholder);
          _skate.init(dolly);
        }, {
          index: index,
          name: name
        });
      }

      function remove(index) {
        parent.removeChild(parent.children.item(index));
        scopes.splice(index, 1);

        for (var a = index; a < scopes.length; a++) {
          --scopes[a].$index;

          if (Array.isArray(scopes[a].$value)) {
            --scopes[a].$name;
          }
        }
      }
    }
  };
});