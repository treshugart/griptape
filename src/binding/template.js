import apiExpression from '../api/expression';
import apiScopeCallback from '../api/scope-callback';
import skate from 'skatejs';

export default {
  attached: function (element, done) {
    var template = document.getElementById(element.getAttribute('gt-template'));
    var html = template.innerHTML.replace('{{content}}', element.innerHTML);
    var data = apiExpression(element.getAttribute('gt-template-data'));

    apiScopeCallback(data.value(), function () {
      if (element.hasAttribute('gt-template-replace')) {
        element = document.createElement('div');
      }

      element.innerHTML = html;
      skate.init(element.children);
      done(element);
    });
  }
};
