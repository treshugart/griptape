import apiExpression from '../api/expression';
import apiScope from '../api/scope';
import witness from 'witness';

export default {
  created: function (element) {
    var expr = apiExpression(element.getAttribute('gt-value'));
    var observer = witness(expr.namespaceValue());
    var currentScope = apiScope();

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
