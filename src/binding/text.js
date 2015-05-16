import apiExpression from '../api/expression';

export default {
  attached: function (element) {
    var expr = apiExpression(element.getAttribute('gt-text'));
    element.textContent = expr.propertyValue();
  }
};
