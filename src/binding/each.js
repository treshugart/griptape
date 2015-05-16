import apiExpression from '../api/expression';
import apiScopeCallback from '../api/scope-callback';
import utilEach from '../util/each';
import utilInherit from '../util/inherit';
import utilInsertNodeBefore from '../util/insert-node-before';
import skate from 'skatejs';
import witness from 'witness';

export default {
  attached: function (element) {
    var index = 0;
    var gtEach = element.getAttribute('gt-each');
    var expr = apiExpression(gtEach);
    var propertyValue = expr.propertyValue();
    var observer = witness(propertyValue);
    var parent = element.parentNode;
    var placeholder = document.createComment(' gt-each: ' + gtEach + ' ');
    var scopes = [];

    // We don't want this element or it's children to be initialised.
    element.setAttribute('data-skate-ignore', '');

    // Prepare for using as a template.
    element.removeAttribute('gt-each');
    parent.insertBefore(placeholder, element);
    parent.removeChild(element);

    observer.on('add', function(change) {
      insert(change.index, change.name, change.newValue);
    });

    observer.on('update', function(change) {
      insert(change.index, change.name, change.newValue);
    });

    observer.on('delete', function(change) {
      remove(change.index);
    });

    utilEach(propertyValue, function (item, name) {
      insert(index, name, item);
      ++index;
    });

    function insert(index, name, newScope) {
      var dolly = element.cloneNode(true);

      apiScopeCallback(newScope, function (scope) {
        if (scopes[index]) {
          utilInherit(scopes[index], scope);
        } else {
          scopes[index] = scope;
        }

        utilInsertNodeBefore(dolly, placeholder);
        skate.init(dolly);
      }, {
        index: index,
        name: name
      });
    }

    function remove (index) {
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
