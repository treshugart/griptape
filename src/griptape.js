(function (skate, witness) {

  // Attr
  // ----

  skate('gt-attr', {
    ready: function (element) {
      var value = gt.compile(element.getAttribute('gt-attr'));
      var scope = gt.scope();

      element._observer = witness(scope);
      element._observer.on('change', function (change) {
        attr(change.name, change.newValue);
      });

      each(value(scope), function (value, name) {
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
    remove: function (element) {
      element._observer.stop();
      delete element._observer;
    }
  });


  // Click
  // -----

  skate('gt-click', {
    ready: function (element) {
      var value = gt.compile(element.getAttribute('gt-click'));
      var scope = gt.scope();

      element.addEventListener('click', function(e) {
        var handler = value(scope);

        if (typeof handler === 'function') {
          handler(e);
        } else {
          e.preventDefault();
        }
      });
    }
  });


  // Each
  // ----

  skate('gt-each', {
    ready: function (element) {
      var index = 0;
      var gtEach = element.getAttribute('gt-each');
      var expression = gt.expression(gtEach);
      var propertyValue = expression.propertyValue();
      var observer = witness(propertyValue);
      var parent = element.parentNode;
      var placeholder = document.createComment(' gt-each: ' + gtEach + ' ');
      var scopes = [];

      // We don't want this element or it's children to be initialised.
      skate.blacklist(element);

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

      each(propertyValue, function (item, name) {
        insert(index, name, item);
        ++index;
      });

      function insert(index, name, newScope) {
        var dolly = element.cloneNode(true);
        var placeholderIndex = indexOfNode(placeholder);

        gt.scopeCallback(newScope, function (scope) {
          if (scopes[index]) {
            inherit(scopes[index], scope);
          } else {
            scopes[index] = scope;
          }

          insertNodeBefore(dolly, placeholder);
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
  });


  // If
  // --

  skate('gt-if', {
    ready: function (element) {
      var gtIf = element.getAttribute('gt-if');
      var placeholder = document.createComment(' gt-if: ' + gtIf + ' ');
      var expression = gt.expression(gtIf);
      var observer = witness(expression.namespaceValue());
      var parent = element.parentNode;
      var isInDom = false;

      skate.blacklist(element);
      element.removeAttribute('gt-if');
      parent.insertBefore(placeholder, element);
      parent.removeChild(element);

      if (expression.value()) {
        parent.insertBefore(element.cloneNode(true), placeholder);
        isInDom = true;
      }

      observer.on('change', function (change) {
        var propertyValue = expression.value();

        if (!isInDom && propertyValue) {
          parent.insertBefore(element.cloneNode(true), placeholder);
          isInDom = true;
        } else if (isInDom && !propertyValue) {
          parent.removeChild(placeholder.previousSibling);
          isInDom = false;
        }
      });
    }
  });


  // Template
  // --------

  var templates = {};

  skate('gt-template', {
    ready: function (element, done) {
      var template = document.getElementById(element.getAttribute('gt-template'));
      var html = template.innerHTML.replace('{{content}}', element.innerHTML);
      var data = gt.expression(element.getAttribute('gt-template-data'));

      gt.scopeCallback(data.value(), function (scope) {
        if (element.hasAttribute('gt-template-replace')) {
          element = document.createElement('div');
        }

        element.innerHTML = html;
        skate.init(element.children);
        done(element);
      });
    }
  });


  // Text
  // ----

  skate('gt-text', {
    ready: function (element) {
      var expression = gt.expression(element.getAttribute('gt-text'));
      element.textContent = expression.propertyValue();
    }
  });


  // Trim
  // ----

  skate('gt-trim', {
    ready: function (element) {
      element.innerHTML = trim(element.innerHTML);
    }
  });


  // Value
  // -----

  skate('gt-value', {
    ready: function (element) {
      var expression = gt.expression(element.getAttribute('gt-value'));
      var observer = witness(expression.namespaceValue());

      observer.on('change', function (change) {
        if (change.name === expression.propertyName) {
          element.value = change.newValue;
        }
      });

      element.addEventListener('change', function () {
        scope[expression.propertyName] = element.value;
      });
    }
  });


  // With
  // ----

  skate('gt-with', {
    ready: function (element) {
      gt.scopeCallback(gt.scopeEval(element.getAttribute('gt-with')), function () {
        skate.init(element);
      });
    }
  });


  // Utilities
  // ---------

  function each (items, callback) {
    if (Array.isArray(items)) {
      return items.forEach(callback);
    }

    if (!items.hasOwnProperty) {
      return;
    }

    for (var a in items) {
      if (items.hasOwnProperty(a)) {
        callback(items[a], a);
      }
    }
  }

  function error (msg) {
    for (var a = 1; a < arguments.length; a++) {
      msg = msg.replace(new RegExp('\\$' + a, 'g'), arguments[a]);
    }

    throw new Error(msg);
  }

  function indexOfNode (el) {
    var i = -1;

    while (el = el.previousSibling) {
      ++i;
    }

    return i;
  }

  function insertNodeBefore (el, ref) {
    ref.parentNode.insertBefore(el, ref);
  }

  function inherit (base) {
    for (var a = 1; a < arguments.length; a++) {
      for (var b in arguments[a]) {
        if (typeof base[b] === 'undefined') {
          base[b] = arguments[a][b];
        }
      }
    }

    return base;
  }

  function namespaceJoin (namespaces) {
    var ns = namespaces.shift();

    namespaces.forEach(function (part) {
      ns += "['' + " + part + ']';
    });

    return ns;
  }

  function namespaceSplit (js) {
    var nameChars = '[^ a-zA-Z0-9_$]+';
    js = js || '';
    js = js.replace(new RegExp('^' + nameChars, 'g'), '')
    js = js.replace(new RegExp(nameChars + '$', 'g'), '');
    return js.split(/[\[\]\.]+(?=(?:[^"\\]*(?:\\.|"(?:[^"\\]*\\.)*[^"\\]*"))*[^"]*$)/);
  }

  function trim (str) {
    return str && str.toString().replace(/^\s+/, '').replace(/\s+$/, '');
  }


  // Griptape
  // --------

  var scope = window;
  var gt = {
    compile: function (js) {
      return function (ctx) {
        try {
          return new Function('ctx', 'with (ctx) { return ' + js + '; }')(ctx);
        } catch (e) {
          error('Error parsing "$1" with message: $2', js, e.message);
        }
      };
    },
    expression: function (expression, scope) {
      var scope = scope || gt.scope();
      var namespace = namespaceSplit(expression);
      var propertyName = namespace.pop();
      var namespaceName = namespaceJoin(namespace);
      var compiledExpression = gt.compile(expression);
      var compiledPropertyName = gt.compile(propertyName);
      var compiledNamespaceName = gt.compile(namespaceName);

      return {
        currentScope: scope,
        namespaceName: namespaceName,
        propertyName: propertyName,
        namespaceValue: function () { return namespaceName ? compiledNamespaceName(scope) : scope; },
        propertyValue: function () { return compiledPropertyName(this.namespaceValue()); },
        value: function () { return compiledExpression(scope); },
      };
    },
    scope: function (def) {
      if (typeof def === 'undefined') {
        return scope;
      }

      scope = def;

      // Ensure scope functions are bound to the scope so that when bindings
      // execute the function outside of the scope they are still bound to it.
      for (var a in scope) {
        if (typeof scope[a] === 'function') {
          scope[a] = scope[a].bind(scope);
        }
      }

      return this;
    },
    scopeCallback: function (value, callback, specials) {
      var oldScope = this.scope();
      var newScope = {};
      var specials = specials || {};

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

      this.scope(newScope);
      callback(newScope, oldScope);
      this.scope(oldScope);
    },
    scopeEval: function (js, scope) {
      return this.compile(js)(scope || this.scope());
    }
  };


  // Export
  // ------

  window.griptape = gt;

}(window.skate, window.witness));
