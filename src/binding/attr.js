import apiCompile from '../api/compile';
import apiScope from '../api/scope';
import utilEach from '../util/each';
import witness from 'witness';

export default {
  created: function (element) {
    var value = apiCompile(element.getAttribute('gt-attr'));
    var currentScope = apiScope();

    element._observer = witness(currentScope);
    element._observer.on('change', function (change) {
      attr(change.name, change.newValue);
    });

    utilEach(value(currentScope), function (value, name) {
      attr(element, name, value);
    });


    function attr (element, name, value) {
      if (element[name] === undefined) {
        element.setAttribute(name, value);
      } else {
        element[name] = value;
      }
    }
  },

  detached: function (element) {
    element._observer.stop();
    delete element._observer;
  }
};
