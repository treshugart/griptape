import apiCompile from '../api/compile';
import apiScope from '../api/scope';

export default {
  created: function (element) {
    var value = apiCompile(element.getAttribute('gt-click'));
    var currentScope = apiScope();

    element.addEventListener('click', function(e) {
      var handler = value(currentScope);

      if (typeof handler === 'function') {
        handler(e);
      } else {
        e.preventDefault();
      }
    });
  }
};
