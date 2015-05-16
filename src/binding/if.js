import apiExpression from '../api/expression';
import witness from 'witness';

export default {
  attached: function (element) {
    var gtIf = element.getAttribute('gt-if');
    var placeholder = document.createComment(' gt-if: ' + gtIf + ' ');
    var expr = apiExpression(gtIf);
    var observer = witness(expr.namespaceValue());
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
