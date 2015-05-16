// src/util/error.js
__c8a65d8fb3d3e2eafc3742895a3302cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = error;
  
  function error(msg) {
    for (var a = 1; a < arguments.length; a++) {
      msg = msg.replace(new RegExp('\\$' + a, 'g'), arguments[a]);
    }
  
    throw new Error(msg);
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/api/compile.js
__e0617aae6abd6106b8140eb4de2377d3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilError = __c8a65d8fb3d3e2eafc3742895a3302cf;
  
  var _utilError2 = _interopRequireDefault(_utilError);
  
  exports['default'] = function (js) {
    return function (ctx) {
      try {
        return new Function('ctx', 'with (ctx) { return ' + js + '; }')(ctx);
      } catch (e) {
        (0, _utilError2['default'])('Error parsing "$1" with message: $2', js, e.message);
      }
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/api/scope.js
__1dc4be17bb86f14650f75871c3839525 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var currentScope = window;
  
  exports['default'] = function (def) {
    if (typeof def === 'undefined') {
      return currentScope;
    }
  
    currentScope = def;
  
    // Ensure scope functions are bound to the scope so that when bindings
    // execute the function outside of the scope they are still bound to it.
    for (var a in currentScope) {
      if (typeof currentScope[a] === 'function') {
        currentScope[a] = currentScope[a].bind(currentScope);
      }
    }
  
    return this;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/namespace-join.js
__1848c0913a52446608a37124400935e3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = namespaceJoin;
  
  function namespaceJoin(namespaces) {
    var ns = namespaces.shift();
  
    namespaces.forEach(function (part) {
      ns += "['' + " + part + "]";
    });
  
    return ns;
  }
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// src/util/namespace-split.js
__954eca421263e76f4a1740d3333fa24d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = namespaceSplit;
  
  function namespaceSplit(js) {
    var nameChars = '[^ a-zA-Z0-9_$]+';
    js = js || '';
    js = js.replace(new RegExp('^' + nameChars, 'g'), '');
    js = js.replace(new RegExp(nameChars + '$', 'g'), '');
    return js.split(/[\[\]\.]+(?=(?:[^"\\]*(?:\\.|"(?:[^"\\]*\\.)*[^"\\]*"))*[^"]*$)/);
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/api/expression.js
__c2964be06a01750b4bed2b231c176468 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _compile = __e0617aae6abd6106b8140eb4de2377d3;
  
  var _compile2 = _interopRequireDefault(_compile);
  
  var _scope = __1dc4be17bb86f14650f75871c3839525;
  
  var _scope2 = _interopRequireDefault(_scope);
  
  var _utilNamespaceJoin = __1848c0913a52446608a37124400935e3;
  
  var _utilNamespaceJoin2 = _interopRequireDefault(_utilNamespaceJoin);
  
  var _utilNamespaceSplit = __954eca421263e76f4a1740d3333fa24d;
  
  var _utilNamespaceSplit2 = _interopRequireDefault(_utilNamespaceSplit);
  
  exports['default'] = function (expression, scope) {
    scope = scope || (0, _scope2['default'])();
  
    var namespace = (0, _utilNamespaceSplit2['default'])(expression);
    var propertyName = namespace.pop();
    var namespaceName = (0, _utilNamespaceJoin2['default'])(namespace);
    var compiledExpression = (0, _compile2['default'])(expression);
    var compiledPropertyName = (0, _compile2['default'])(propertyName);
    var compiledNamespaceName = (0, _compile2['default'])(namespaceName);
  
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
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/api/scope-callback.js
__c737e206881f4e38e5b8822f16ebf55a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _scope = __1dc4be17bb86f14650f75871c3839525;
  
  var _scope2 = _interopRequireDefault(_scope);
  
  exports['default'] = function (value, callback) {
    var specials = arguments[2] === undefined ? {} : arguments[2];
  
    var oldScope = (0, _scope2['default'])();
    var newScope = {};
  
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
  
    (0, _scope2['default'])(newScope);
    callback(newScope, oldScope);
    (0, _scope2['default'])(oldScope);
  
    return this;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/api/scope-eval.js
__1f0f3efd4ec954db0326033763fc22b5 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _compile = __e0617aae6abd6106b8140eb4de2377d3;
  
  var _compile2 = _interopRequireDefault(_compile);
  
  var _scope = __1dc4be17bb86f14650f75871c3839525;
  
  var _scope2 = _interopRequireDefault(_scope);
  
  exports['default'] = function (js, customScope) {
    return (0, _compile2['default'])(js)(customScope || (0, _scope2['default'])());
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/each.js
__39ef8df12145cb19e3d370105ce69f8d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = each;
  
  function each(items, callback) {
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
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// node_modules/witness/lib/util/each.js
__42e6813f8150cd4db32d22347fc11d6b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.unknown = mod.exports;
    }
  })(undefined, function (exports, module) {
  
    module.exports = function (items, cb) {
      if (!items) {
        return;
      }
  
      if (items.hasOwnProperty) {
        for (var a in items) {
          if (items.hasOwnProperty(a)) {
            if (cb(items[a], a) === false) {
              return;
            }
          }
        }
      } else if (items.length) {
        for (var a = 0; a < items.length; a++) {
          if (cb(items[a], a) === false) {
            return;
          }
        }
      }
    };
  });
  
  return module.exports;
}).call(this);

// node_modules/witness/lib/registry.js
__a165dcc1ebc9379708c23eb6198c20f2 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.unknown = mod.exports;
    }
  })(undefined, function (exports, module) {
  
    module.exports = {
      objects: [],
      observers: []
    };
  });
  
  return module.exports;
}).call(this);

// node_modules/witness/lib/timeout.js
__462465bc90395e8d52414778dcdb1996 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  'use strict';
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.unknown = mod.exports;
    }
  })(undefined, function (exports, module) {
    // Adapted from: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating.
    //
    // Calls the specified function using `RequestAnimationFrame` and falls back to using `setTimeout`.
  
    var timeout = (function () {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
  
      if (window.requestAnimationFrame) {
        return window.requestAnimationFrame;
      }
  
      for (var x = 0; x < vendors.length; ++x) {
        var method = vendors[x] + 'RequestAnimationFrame';
  
        if (typeof window[method] === 'function') {
          return window[method];
        }
      }
  
      if (!window.requestAnimationFrame) {
        return function (callback) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
  
          lastTime = currTime + timeToCall;
  
          return id;
        };
      }
    })();
  
    timeout.stop = (function () {
      if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame.bind(window);
      }
  
      return function (id) {
        clearTimeout(id);
      };
    })();
  
    module.exports = timeout;
  });
  
  return module.exports;
}).call(this);

// node_modules/witness/lib/observer.js
__fecf2769e7d248af109260a4c6d05b95 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./util/each": __42e6813f8150cd4db32d22347fc11d6b,
    "./registry": __a165dcc1ebc9379708c23eb6198c20f2,
    "./timeout": __462465bc90395e8d52414778dcdb1996
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  'use strict';
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './util/each', './registry', './timeout'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __42e6813f8150cd4db32d22347fc11d6b, __a165dcc1ebc9379708c23eb6198c20f2, __462465bc90395e8d52414778dcdb1996);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.each, global.registry, global.timeout);
      global.unknown = mod.exports;
    }
  })(undefined, function (exports, module, _utilEach, _registry, _timeout) {
  
    function _interopRequire(obj) {
      return obj && obj.__esModule ? obj['default'] : obj;
    }
  
    var _each = _interopRequire(_utilEach);
  
    var _registry2 = _interopRequire(_registry);
  
    var _timeout2 = _interopRequire(_timeout);
  
    var types = ['add', 'update', 'delete', 'change'];
  
    function Observer(obj) {
      if (typeof obj !== 'object') {
        throw new Error('Cannot observe non-object: ' + obj);
      }
  
      this.isArray = Array.isArray(obj);
      this.obj = obj;
      this.init();
    }
  
    Observer.find = function (obj) {
      var index = _registry2.objects.indexOf(obj);
      return index === -1 ? false : _registry2.observers[index];
    };
  
    Observer.prototype = {
      constructor: Observer,
  
      init: function init() {
        var that = this;
  
        this.listeners = {};
        this.timeout = false;
  
        types.forEach(function (type) {
          that.listeners[type] = [];
        });
  
        return this;
      },
  
      on: function on(type, fn) {
        if (!this.listening()) {
          this.start();
        }
  
        this.listeners[type].push(fn);
  
        return this;
      },
  
      off: function off(type, fn) {
        if (fn) {
          this.listeners[type].splice(this.listeners[type].indexOf(fn), 1);
        } else {
          this.listeners[type] = [];
        }
  
        if (!this.listening()) {
          this.stop();
        }
  
        return this;
      },
  
      notify: function notify(diffs) {
        var that = this;
  
        diffs.forEach(function (diff) {
          that.listeners[diff.type].forEach(function (fn) {
            fn(diff);
          });
  
          that.listeners.change.forEach(function (fn) {
            fn(diff);
          });
        });
  
        return this;
      },
  
      diff: function diff() {
        var that = this;
        var diffs = [];
        var keys = Object.keys(this.obj);
  
        if (this.isArray && this.obj.length === this.state.length) {
          return diffs;
        }
  
        (0, _each)(this.state, function (val, a) {
          var missing = that.isArray ? that.obj.indexOf(val) === -1 : typeof that.obj[a] === 'undefined';
  
          if (missing) {
            diffs.push({
              index: that.isArray ? a : keys.indexOf(a),
              name: a,
              newValue: undefined,
              object: that.obj,
              oldValue: val,
              type: 'delete'
            });
          }
        });
  
        (0, _each)(this.obj, function (val, a) {
          var isAdd = typeof that.state[a] === 'undefined';
          var isUpdate = that.isArray ? that.obj.length === that.state.length && that.state[a] !== val : that.state[a] !== val;
  
          if (isAdd || isUpdate) {
            diffs.push({
              index: that.isArray ? a : keys.indexOf(a),
              name: a,
              newValue: val,
              object: that.obj,
              oldValue: typeof that.state[a] === 'undefined' ? undefined : that.state[a],
              type: typeof that.state[a] === 'undefined' ? 'add' : 'update'
            });
          }
        });
  
        return diffs;
      },
  
      save: function save() {
        var that = this;
  
        this.state = that.isArray ? [] : {};
  
        (0, _each)(this.obj, function (val, a) {
          that.state[a] = val;
        });
  
        return this;
      },
  
      listening: function listening() {
        for (var a = 0; a < types.length; a++) {
          if (this.listeners[types[a]].length) {
            return true;
          }
        }
  
        return false;
      },
  
      start: function start() {
        var that = this;
  
        function run() {
          var diff = that.diff();
  
          if (diff.length) {
            that.save();
            that.notify(diff);
          }
  
          (0, _timeout2)(run);
        }
  
        this.save();
        this.timeout = (0, _timeout2)(run);
  
        return this;
      },
  
      stop: function stop() {
        var that = this;
  
        _timeout2.stop(this.timeout);
  
        this.state = {};
        this.timeout = false;
  
        types.forEach(function (type) {
          that.listeners[type] = [];
        });
  
        return this;
      },
  
      destroy: function destroy() {
        this.stop();
        _registry2.objects.splice(_registry2.objects.indexOf(this.obj), 1);
        _registry2.observers.splice(_registry2.observers.indexOf(this), 1);
        delete this.obj;
        return this;
      }
    };
  
    module.exports = Observer;
  });
  
  return module.exports;
}).call(this);

// node_modules/witness/lib/index.js
__c861f3939f1ea7e6b603d7d406bb9167 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./observer": __fecf2769e7d248af109260a4c6d05b95,
    "./registry": __a165dcc1ebc9379708c23eb6198c20f2
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  'use strict';
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './observer', './registry'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __fecf2769e7d248af109260a4c6d05b95, __a165dcc1ebc9379708c23eb6198c20f2);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.Observer, global.registry);
      global.unknown = mod.exports;
    }
  })(undefined, function (exports, module, _observer, _registry) {
  
    function _interopRequire(obj) {
      return obj && obj.__esModule ? obj['default'] : obj;
    }
  
    var _Observer = _interopRequire(_observer);
  
    var _registry2 = _interopRequire(_registry);
  
    function witness(obj) {
      var observer = _Observer.find(obj);
  
      if (!observer) {
        observer = new _Observer(obj);
        _registry2.objects.push(obj);
        _registry2.observers.push(observer);
      }
  
      return observer;
    }
  
    module.exports = window.witness = witness;
  });
  
  return module.exports;
}).call(this);

// src/binding/attr.js
__e69c608e2cae009133c594ced1fc58ff = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiCompile = __e0617aae6abd6106b8140eb4de2377d3;
  
  var _apiCompile2 = _interopRequireDefault(_apiCompile);
  
  var _apiScope = __1dc4be17bb86f14650f75871c3839525;
  
  var _apiScope2 = _interopRequireDefault(_apiScope);
  
  var _utilEach = __39ef8df12145cb19e3d370105ce69f8d;
  
  var _utilEach2 = _interopRequireDefault(_utilEach);
  
  var _witness = __c861f3939f1ea7e6b603d7d406bb9167;
  
  var _witness2 = _interopRequireDefault(_witness);
  
  exports['default'] = {
    created: function created(element) {
      var value = (0, _apiCompile2['default'])(element.getAttribute('gt-attr'));
      var currentScope = (0, _apiScope2['default'])();
  
      element._observer = (0, _witness2['default'])(currentScope);
      element._observer.on('change', function (change) {
        attr(change.name, change.newValue);
      });
  
      (0, _utilEach2['default'])(value(currentScope), function (value, name) {
        attr(element, name, value);
      });
  
      function attr(element, name, value) {
        if (element[name] === undefined) {
          element.setAttribute(name, value);
        } else {
          element[name] = value;
        }
      }
    },
  
    detached: function detached(element) {
      element._observer.stop();
      delete element._observer;
    }
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/click.js
__3f83e12d42ee40e471b9f3e84fc0bc3e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiCompile = __e0617aae6abd6106b8140eb4de2377d3;
  
  var _apiCompile2 = _interopRequireDefault(_apiCompile);
  
  var _apiScope = __1dc4be17bb86f14650f75871c3839525;
  
  var _apiScope2 = _interopRequireDefault(_apiScope);
  
  exports['default'] = {
    created: function created(element) {
      var value = (0, _apiCompile2['default'])(element.getAttribute('gt-click'));
      var currentScope = (0, _apiScope2['default'])();
  
      element.addEventListener('click', function (e) {
        var handler = value(currentScope);
  
        if (typeof handler === 'function') {
          handler(e);
        } else {
          e.preventDefault();
        }
      });
    }
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/inherit.js
__15fa3ccd1c228c0b1670a6636284114c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = inherit;
  
  function inherit(base) {
    for (var a = 1; a < arguments.length; a++) {
      for (var b in arguments[a]) {
        if (typeof base[b] === 'undefined') {
          base[b] = arguments[a][b];
        }
      }
    }
  
    return base;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/util/insert-node-before.js
__c2285dae7f085df52a881f9528d0ed45 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = insertNodeBefore;
  
  function insertNodeBefore(el, ref) {
    ref.parentNode.insertBefore(el, ref);
  }
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/constants.js
__d6e807d1b8cf3f7640b5275dfd579aae = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports);
    }
  })(function (exports) {
  
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  
    var ATTR_IGNORE = "data-skate-ignore";
    exports.ATTR_IGNORE = ATTR_IGNORE;
    var TYPE_ATTRIBUTE = "a";
    exports.TYPE_ATTRIBUTE = TYPE_ATTRIBUTE;
    var TYPE_CLASSNAME = "c";
    exports.TYPE_CLASSNAME = TYPE_CLASSNAME;
    var TYPE_ELEMENT = "t";
    exports.TYPE_ELEMENT = TYPE_ELEMENT;
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/globals.js
__839bffec73f20f49788a558812e60416 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    }
  })(function (exports, module) {
  
    if (!window.__skate) {
      window.__skate = {
        observer: undefined,
        registry: {}
      };
    }
  
    module.exports = window.__skate;
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/data.js
__78bcb1d6977c44b8ef70ab15522218a3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    }
  })(function (exports, module) {
  
    module.exports = function (element) {
      var namespace = arguments[1] === undefined ? "" : arguments[1];
  
      var data = element.__SKATE_DATA || (element.__SKATE_DATA = {});
      return namespace && (data[namespace] || (data[namespace] = {})) || data;
    };
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/utils.js
__d47046751acaed4d2db1331e7ca7004f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./constants": __d6e807d1b8cf3f7640b5275dfd579aae
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "./constants"], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports, __d6e807d1b8cf3f7640b5275dfd579aae);
    }
  })(function (exports, _constants) {
  
    /**
     * Checks {}.hasOwnProperty in a safe way.
     *
     * @param {Object} obj The object the property is on.
     * @param {String} key The object key to check.
     *
     * @returns {Boolean}
     */
  
    exports.hasOwn = hasOwn;
  
    /**
     * Camel-cases the specified string.
     *
     * @param {String} str The string to camel-case.
     *
     * @returns {String}
     */
    exports.camelCase = camelCase;
  
    /**
     * Returns whether or not the source element contains the target element.
     * This is for browsers that don't support Element.prototype.contains on an
     * HTMLUnknownElement.
     *
     * @param {HTMLElement} source The source element.
     * @param {HTMLElement} target The target element.
     *
     * @returns {Boolean}
     */
    exports.elementContains = elementContains;
  
    /**
     * Returns a function that will prevent more than one call in a single clock
     * tick.
     *
     * @param {Function} fn The function to call.
     *
     * @returns {Function}
     */
    exports.debounce = debounce;
  
    /**
     * Returns whether or not the specified element has been selectively ignored.
     *
     * @param {Element} element The element to check and traverse up from.
     *
     * @returns {Boolean}
     */
    exports.getClosestIgnoredElement = getClosestIgnoredElement;
  
    /**
     * Merges the second argument into the first.
     *
     * @param {Object} child The object to merge into.
     * @param {Object} parent The object to merge from.
     * @param {Boolean} overwrite Whether or not to overwrite properties on the child.
     *
     * @returns {Object} Returns the child object.
     */
    exports.inherit = inherit;
  
    /**
     * Traverses an object checking hasOwnProperty.
     *
     * @param {Object} obj The object to traverse.
     * @param {Function} fn The function to call for each item in the object.
     *
     * @returns {undefined}
     */
    exports.objEach = objEach;
    exports.supportsNativeCustomElements = supportsNativeCustomElements;
    exports.isValidNativeCustomElementName = isValidNativeCustomElementName;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  
    var ATTR_IGNORE = _constants.ATTR_IGNORE;
  
    var DocumentFragment = window.DocumentFragment;
    var elementPrototype = window.HTMLElement.prototype;
    exports.elementPrototype = elementPrototype;
    var elementPrototypeContains = elementPrototype.contains;
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  
    function camelCase(str) {
      return str.split(/-/g).map(function (str, index) {
        return index === 0 ? str : str[0].toUpperCase() + str.substring(1);
      }).join("");
    }
  
    function elementContains(source, target) {
      // The document element does not have the contains method in IE.
      if (source === document && !source.contains) {
        return document.head.contains(target) || document.body.contains(target);
      }
  
      return source.contains ? source.contains(target) : elementPrototypeContains.call(source, target);
    }
  
    function debounce(fn) {
      var called = false;
  
      return function () {
        if (!called) {
          called = true;
          setTimeout(function () {
            called = false;
            fn();
          }, 1);
        }
      };
    }
  
    function getClosestIgnoredElement(element) {
      var parent = element;
  
      while (parent && parent !== document && !(parent instanceof DocumentFragment)) {
        if (parent.hasAttribute(ATTR_IGNORE)) {
          return parent;
        }
  
        parent = parent.parentNode;
      }
    }
  
    function inherit(child, parent, overwrite) {
      var names = Object.getOwnPropertyNames(parent);
      var namesLen = names.length;
  
      for (var a = 0; a < namesLen; a++) {
        var name = names[a];
  
        if (overwrite || child[name] === undefined) {
          var desc = Object.getOwnPropertyDescriptor(parent, name);
          var shouldDefineProps = desc.get || desc.set || !desc.writable || !desc.enumerable || !desc.configurable;
  
          if (shouldDefineProps) {
            Object.defineProperty(child, name, desc);
          } else {
            child[name] = parent[name];
          }
        }
      }
  
      return child;
    }
  
    function objEach(obj, fn) {
      for (var a in obj) {
        if (hasOwn(obj, a)) {
          fn(obj[a], a);
        }
      }
    }
  
    function supportsNativeCustomElements() {
      return typeof document.registerElement === "function";
    }
  
    function isValidNativeCustomElementName(name) {
      return name.indexOf("-") > 0;
    }
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/mutation-observer.js
__5f121d4a85ec9b7b86fcc8925f46a21a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./utils": __d47046751acaed4d2db1331e7ca7004f
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module", "./utils"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module, __d47046751acaed4d2db1331e7ca7004f);
    }
  })(function (exports, module, _utils) {
  
    var debounce = _utils.debounce;
    var elementContains = _utils.elementContains;
    var elementPrototype = _utils.elementPrototype;
    var objEach = _utils.objEach;
  
    var Attr = window.Attr;
    var NativeMutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
    var isFixingIe = false;
    var isIe = window.navigator.userAgent.indexOf("Trident") > -1;
  
    /**
     * Creates a new mutation record.
     *
     * @param {Element} target The HTML element that was affected.
     * @param {String} type The type of mutation.
     *
     * @returns {Object}
     */
    function newMutationRecord(target, type) {
      return {
        addedNodes: null,
        attributeName: null,
        attributeNamespace: null,
        nextSibling: null,
        oldValue: null,
        previousSibling: null,
        removedNodes: null,
        target: target,
        type: type || "childList"
      };
    }
  
    /**
     * Takes an element and recursively saves it's tree structure on each element so
     * that they can be restored later after IE screws things up.
     *
     * @param {Node} node The node to save the tree for.
     *
     * @returns {undefined}
     */
    function walkTree(node, cb) {
      var childNodes = node.childNodes;
  
      if (!childNodes) {
        return;
      }
  
      var childNodesLen = childNodes.length;
  
      for (var a = 0; a < childNodesLen; a++) {
        var childNode = childNodes[a];
        cb(childNode);
        walkTree(childNode, cb);
      }
    }
  
    // Mutation Observer "Polyfill"
    // ----------------------------
  
    /**
     * This "polyfill" only polyfills what we need for Skate to function. It
     * batches updates and does the bare minimum during synchronous operation
     * which make mutation event performance bearable. The rest is batched on the
     * next tick. Like mutation observers, each mutation is divided into sibling
     * groups for each parent that had mutations. All attribute mutations are
     * batched into separate records regardless of the element they occured on.
     *
     * @param {Function} callback The callback to execute with the mutation info.
     *
     * @returns {undefined}
     */
    function MutationObserver(callback) {
      if (NativeMutationObserver && !isFixingIe) {
        return new NativeMutationObserver(callback);
      }
  
      this.callback = callback;
      this.elements = [];
    }
  
    /**
     * IE 11 has a bug that prevents descendant nodes from being reported as removed
     * to a mutation observer in IE 11 if an ancestor node's innerHTML is reset.
     * This same bug also happens when using Mutation Events in IE 9 / 10. Because of
     * this, we must ensure that observers and events get triggered properly on
     * those descendant nodes. In order to do this we have to override `innerHTML`
     * and then manually trigger an event.
     *
     * See: https://connect.microsoft.com/IE/feedback/details/817132/ie-11-childnodes-are-missing-from-mutationobserver-mutations-removednodes-after-setting-innerhtml
     *
     * @returns {undefined}
     */
    MutationObserver.fixIe = function () {
      // Fix once only if we need to.
      if (!isIe || isFixingIe) {
        return;
      }
  
      // We have to call the old innerHTML getter and setter.
      var oldInnerHTML = Object.getOwnPropertyDescriptor(elementPrototype, "innerHTML");
  
      // This redefines the innerHTML property so that we can ensure that events
      // are properly triggered.
      Object.defineProperty(elementPrototype, "innerHTML", {
        get: function get() {
          return oldInnerHTML.get.call(this);
        },
        set: function set(html) {
          walkTree(this, function (node) {
            var mutationEvent = document.createEvent("MutationEvent");
            mutationEvent.initMutationEvent("DOMNodeRemoved", true, false, null, null, null, null, null);
            node.dispatchEvent(mutationEvent);
          });
  
          oldInnerHTML.set.call(this, html);
        }
      });
  
      // Flag so the polyfill is used for all subsequent Mutation Observer objects.
      isFixingIe = true;
    };
  
    Object.defineProperty(MutationObserver, "isFixingIe", {
      get: function get() {
        return isFixingIe;
      }
    });
  
    MutationObserver.prototype = {
      observe: function observe(target, options) {
        function addEventToBatch(e) {
          batchedEvents.push(e);
          batchEvents();
        }
  
        function batchEvent(e) {
          var eTarget = e.target;
  
          // In some test environments, e.target has been nulled after the tests
          // are done and a batch is still processing.
          if (!eTarget) {
            return;
          }
  
          var eType = e.type;
          var eTargetParent = eTarget.parentNode;
  
          if (!canTriggerInsertOrRemove(eTargetParent)) {
            return;
          }
  
          // The same bug that affects IE 11 also affects IE 9 / 10 with Mutation
          // Events.
          //
          // IE 11 bug: https://connect.microsoft.com/IE/feedback/details/817132/ie-11-childnodes-are-missing-from-mutationobserver-mutations-removednodes-after-setting-innerhtml
          var shouldWorkAroundIeRemoveBug = isFixingIe && eType === "DOMNodeRemoved";
          var isDescendant = lastBatchedElement && lastBatchedElement.nodeType === 1 && elementContains(lastBatchedElement, eTarget);
  
          // This checks to see if the element is contained in the last batched
          // element. If it is, then we don't batch it because elements are
          // batched into first-children of a given parent. However, IE is (of
          // course) an exception to this and destroys the DOM tree heirarchy
          // before the callback gets fired if the element was removed. Because of
          // this, we have to let through all descendants that had the event
          // triggered on it.
          if (!shouldWorkAroundIeRemoveBug && isDescendant) {
            return;
          }
  
          if (!lastBatchedRecord || lastBatchedRecord.target !== eTargetParent) {
            batchedRecords.push(lastBatchedRecord = newMutationRecord(eTargetParent));
          }
  
          if (eType === "DOMNodeInserted") {
            if (!lastBatchedRecord.addedNodes) {
              lastBatchedRecord.addedNodes = [];
            }
  
            lastBatchedRecord.addedNodes.push(eTarget);
          } else {
            if (!lastBatchedRecord.removedNodes) {
              lastBatchedRecord.removedNodes = [];
            }
  
            lastBatchedRecord.removedNodes.push(eTarget);
          }
  
          lastBatchedElement = eTarget;
        }
  
        function canTriggerAttributeModification(eTarget) {
          return options.attributes && (options.subtree || eTarget === target);
        }
  
        function canTriggerInsertOrRemove(eTargetParent) {
          return options.childList && (options.subtree || eTargetParent === target);
        }
  
        var that = this;
  
        // Batching insert and remove.
        var lastBatchedElement;
        var lastBatchedRecord;
        var batchedEvents = [];
        var batchedRecords = [];
        var batchEvents = debounce(function () {
          var batchedEventsLen = batchedEvents.length;
  
          for (var a = 0; a < batchedEventsLen; a++) {
            batchEvent(batchedEvents[a]);
          }
  
          that.callback(batchedRecords);
          batchedEvents = [];
          batchedRecords = [];
          lastBatchedElement = undefined;
          lastBatchedRecord = undefined;
        });
  
        // Batching attributes.
        var attributeOldValueCache = {};
        var attributeMutations = [];
        var batchAttributeMods = debounce(function () {
          // We keep track of the old length just in case attributes are
          // modified within a handler.
          var len = attributeMutations.length;
  
          // Call the handler with the current modifications.
          that.callback(attributeMutations);
  
          // We remove only up to the current point just in case more
          // modifications were queued.
          attributeMutations.splice(0, len);
        });
  
        var observed = {
          target: target,
          options: options,
          insertHandler: addEventToBatch,
          removeHandler: addEventToBatch,
          attributeHandler: function attributeHandler(e) {
            var eTarget = e.target;
  
            if (!(e.relatedNode instanceof Attr)) {
              // IE10 fires two mutation events for attributes, one with the
              // target as the relatedNode, and one where it's the attribute.
              //
              // Re: relatedNode, "In the case of the DOMAttrModified event
              // it indicates the Attr node which was modified, added, or
              // removed." [1]
              //
              // [1]: https://msdn.microsoft.com/en-us/library/ff943606%28v=vs.85%29.aspx
              return;
            }
  
            if (!canTriggerAttributeModification(eTarget)) {
              return;
            }
  
            var eAttrName = e.attrName;
            var ePrevValue = e.prevValue;
            var eNewValue = e.newValue;
            var record = newMutationRecord(eTarget, "attributes");
            record.attributeName = eAttrName;
  
            if (options.attributeOldValue) {
              record.oldValue = attributeOldValueCache[eAttrName] || ePrevValue || null;
            }
  
            attributeMutations.push(record);
  
            // We keep track of old values so that when IE incorrectly reports
            // the old value we can ensure it is actually correct.
            if (options.attributeOldValue) {
              attributeOldValueCache[eAttrName] = eNewValue;
            }
  
            batchAttributeMods();
          }
        };
  
        this.elements.push(observed);
  
        if (options.childList) {
          target.addEventListener("DOMNodeInserted", observed.insertHandler);
          target.addEventListener("DOMNodeRemoved", observed.removeHandler);
        }
  
        if (options.attributes) {
          target.addEventListener("DOMAttrModified", observed.attributeHandler);
        }
  
        return this;
      },
  
      disconnect: function disconnect() {
        objEach(this.elements, function (observed) {
          observed.target.removeEventListener("DOMNodeInserted", observed.insertHandler);
          observed.target.removeEventListener("DOMNodeRemoved", observed.removeHandler);
          observed.target.removeEventListener("DOMAttrModified", observed.attributeHandler);
        });
  
        this.elements = [];
  
        return this;
      }
    };
  
    module.exports = MutationObserver;
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/registry.js
__2b13acb334cc913419a3f1d957d7121a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./constants": __d6e807d1b8cf3f7640b5275dfd579aae,
    "./globals": __839bffec73f20f49788a558812e60416,
    "./utils": __d47046751acaed4d2db1331e7ca7004f
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module", "./constants", "./globals", "./utils"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module, __d6e807d1b8cf3f7640b5275dfd579aae, __839bffec73f20f49788a558812e60416, __d47046751acaed4d2db1331e7ca7004f);
    }
  })(function (exports, module, _constants, _globals, _utils) {
  
    var _interopRequire = function _interopRequire(obj) {
      return obj && obj.__esModule ? obj["default"] : obj;
    };
  
    var TYPE_ATTRIBUTE = _constants.TYPE_ATTRIBUTE;
    var TYPE_CLASSNAME = _constants.TYPE_CLASSNAME;
    var TYPE_ELEMENT = _constants.TYPE_ELEMENT;
  
    var globals = _interopRequire(_globals);
  
    var hasOwn = _utils.hasOwn;
    var isValidNativeCustomElementName = _utils.isValidNativeCustomElementName;
    var supportsNativeCustomElements = _utils.supportsNativeCustomElements;
  
    /**
     * Returns the class list for the specified element.
     *
     * @param {Element} element The element to get the class list for.
     *
     * @returns {ClassList | Array}
     */
    function getClassList(element) {
      var classList = element.classList;
  
      if (classList) {
        return classList;
      }
  
      var attrs = element.attributes;
  
      return attrs["class"] && attrs["class"].nodeValue.split(/\s+/) || [];
    }
  
    module.exports = {
      clear: function clear() {
        globals.registry = {};
        return this;
      },
  
      get: function get(id) {
        return hasOwn(globals.registry, id) && globals.registry[id];
      },
  
      getForElement: function getForElement(element) {
        var attrs = element.attributes;
        var attrsLen = attrs.length;
        var definitions = [];
        var isAttr = attrs.is;
        var isAttrValue = isAttr && (isAttr.value || isAttr.nodeValue);
        var tag = element.tagName.toLowerCase();
        var isAttrOrTag = isAttrValue || tag;
        var definition;
        var tagToExtend;
  
        if (this.isType(isAttrOrTag, TYPE_ELEMENT)) {
          definition = globals.registry[isAttrOrTag];
          tagToExtend = definition["extends"];
  
          if (isAttrValue) {
            if (tag === tagToExtend) {
              definitions.push(definition);
            }
          } else if (!tagToExtend) {
            definitions.push(definition);
          }
        }
  
        for (var a = 0; a < attrsLen; a++) {
          var attr = attrs[a].nodeName;
  
          if (this.isType(attr, TYPE_ATTRIBUTE)) {
            definition = globals.registry[attr];
            tagToExtend = definition["extends"];
  
            if (!tagToExtend || tag === tagToExtend) {
              definitions.push(definition);
            }
          }
        }
  
        var classList = getClassList(element);
        var classListLen = classList.length;
  
        for (var b = 0; b < classListLen; b++) {
          var className = classList[b];
  
          if (this.isType(className, TYPE_CLASSNAME)) {
            definition = globals.registry[className];
            tagToExtend = definition["extends"];
  
            if (!tagToExtend || tag === tagToExtend) {
              definitions.push(definition);
            }
          }
        }
  
        return definitions;
      },
  
      isType: function isType(id, type) {
        var def = this.get(id);
        return def && def.type === type;
      },
  
      isNativeCustomElement: function isNativeCustomElement(id) {
        return supportsNativeCustomElements() && this.isType(id, TYPE_ELEMENT) && isValidNativeCustomElementName(id);
      },
  
      set: function set(id, definition) {
        if (hasOwn(globals.registry, id)) {
          throw new Error("A component definition of type \"" + definition.type + "\" with the ID of \"" + id + "\" already exists.");
        }
  
        globals.registry[id] = definition;
  
        return this;
      }
    };
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/lifecycle.js
__ded739127d689aabfc308dff84d88ae4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./constants": __d6e807d1b8cf3f7640b5275dfd579aae,
    "./data": __78bcb1d6977c44b8ef70ab15522218a3,
    "./mutation-observer": __5f121d4a85ec9b7b86fcc8925f46a21a,
    "./registry": __2b13acb334cc913419a3f1d957d7121a,
    "./utils": __d47046751acaed4d2db1331e7ca7004f
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "./constants", "./data", "./mutation-observer", "./registry", "./utils"], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports, __d6e807d1b8cf3f7640b5275dfd579aae, __78bcb1d6977c44b8ef70ab15522218a3, __5f121d4a85ec9b7b86fcc8925f46a21a, __2b13acb334cc913419a3f1d957d7121a, __d47046751acaed4d2db1331e7ca7004f);
    }
  })(function (exports, _constants, _data, _mutationObserver, _registry, _utils) {
  
    var _interopRequire = function _interopRequire(obj) {
      return obj && obj.__esModule ? obj["default"] : obj;
    };
  
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  
    var ATTR_IGNORE = _constants.ATTR_IGNORE;
  
    var data = _interopRequire(_data);
  
    var MutationObserver = _interopRequire(_mutationObserver);
  
    var registry = _interopRequire(_registry);
  
    var camelCase = _utils.camelCase;
    var elementContains = _utils.elementContains;
    var hasOwn = _utils.hasOwn;
    var inherit = _utils.inherit;
    var objEach = _utils.objEach;
  
    var elProto = window.HTMLElement.prototype;
    var nativeMatchesSelector = elProto.matches || elProto.msMatchesSelector || elProto.webkitMatchesSelector || elProto.mozMatchesSelector || elProto.oMatchesSelector;
    // Only IE9 has this msMatchesSelector bug, but best to detect it.
    var hasNativeMatchesSelectorDetattachedBug = !nativeMatchesSelector.call(document.createElement("div"), "div");
    var matchesSelector = function matchesSelector(element, selector) {
      if (hasNativeMatchesSelectorDetattachedBug) {
        var clone = element.cloneNode();
        document.createElement("div").appendChild(clone);
        return nativeMatchesSelector.call(clone, selector);
      }
      return nativeMatchesSelector.call(element, selector);
    };
  
    /**
     * Parses an event definition and returns information about it.
     *
     * @param {String} e The event to parse.
     *
     * @returns {Object]}
     */
    function parseEvent(e) {
      var parts = e.split(" ");
      return {
        name: parts.shift(),
        delegate: parts.join(" ")
      };
    }
  
    /**
     * Sets the defined attributes to their default values, if specified.
     *
     * @param {Element} target The web component element.
     * @param {Object} component The web component definition.
     *
     * @returns {undefined}
     */
    function initAttributes(target, component) {
      var componentAttributes = component.attributes;
  
      if (typeof componentAttributes !== "object") {
        return;
      }
  
      for (var attribute in componentAttributes) {
        if (hasOwn(componentAttributes, attribute) && hasOwn(componentAttributes[attribute], "value") && !target.hasAttribute(attribute)) {
          var value = componentAttributes[attribute].value;
          value = typeof value === "function" ? value(target) : value;
          target.setAttribute(attribute, value);
        }
      }
    }
  
    /**
     * Defines a property that proxies the specified attribute.
     *
     * @param {Element} target The web component element.
     * @param {String} attribute The attribute name to proxy.
     *
     * @returns {undefined}
     */
    function defineAttributeProperty(target, attribute) {
      Object.defineProperty(target, camelCase(attribute), {
        get: function get() {
          return this.getAttribute(attribute);
        },
        set: function set(value) {
          if (value === undefined) {
            this.removeAttribute(attribute);
          } else {
            this.setAttribute(attribute, value);
          }
        }
      });
    }
  
    /**
     * Adds links from attributes to properties.
     *
     * @param {Element} target The web component element.
     * @param {Object} component The web component definition.
     *
     * @returns {undefined}
     */
    function addAttributeToPropertyLinks(target, component) {
      var componentAttributes = component.attributes;
  
      if (typeof componentAttributes !== "object") {
        return;
      }
  
      for (var attribute in componentAttributes) {
        if (hasOwn(componentAttributes, attribute) && !hasOwn(target, attribute)) {
          defineAttributeProperty(target, attribute);
        }
      }
    }
  
    function triggerAttributeChanged(target, component, data) {
      var callback;
      var type;
      var name = data.name;
      var newValue = data.newValue;
      var oldValue = data.oldValue;
      var newValueIsString = typeof newValue === "string";
      var oldValueIsString = typeof oldValue === "string";
      var attrs = component.attributes;
      var specific = attrs && attrs[name];
  
      if (!oldValueIsString && newValueIsString) {
        type = "created";
      } else if (oldValueIsString && newValueIsString) {
        type = "updated";
      } else if (oldValueIsString && !newValueIsString) {
        type = "removed";
      }
  
      if (specific && typeof specific[type] === "function") {
        callback = specific[type];
      } else if (specific && typeof specific.fallback === "function") {
        callback = specific.fallback;
      } else if (typeof specific === "function") {
        callback = specific;
      } else if (typeof attrs === "function") {
        callback = attrs;
      }
  
      // Ensure values are null if undefined.
      newValue = newValue === undefined ? null : newValue;
      oldValue = oldValue === undefined ? null : oldValue;
  
      // There may still not be a callback.
      if (callback) {
        callback(target, {
          type: type,
          name: name,
          newValue: newValue,
          oldValue: oldValue
        });
      }
    }
  
    function triggerAttributesCreated(target, component) {
      var a;
      var attrs = target.attributes;
      var attrsCopy = [];
      var attrsLen = attrs.length;
  
      for (a = 0; a < attrsLen; a++) {
        attrsCopy.push(attrs[a]);
      }
  
      // In default web components, attribute changes aren't triggered for
      // attributes that already exist on an element when it is bound. This sucks
      // when you want to reuse and separate code for attributes away from your
      // lifecycle callbacks. Skate will initialise each attribute by calling the
      // created callback for the attributes that already exist on the element.
      for (a = 0; a < attrsLen; a++) {
        var attr = attrsCopy[a];
        triggerAttributeChanged(target, component, {
          name: attr.nodeName,
          newValue: attr.value || attr.nodeValue
        });
      }
    }
  
    function addAttributeListeners(target, component) {
      var attrs = target.attributes;
  
      if (!component.attributes || registry.isNativeCustomElement(component.id)) {
        return;
      }
  
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          var name = mutation.attributeName;
          var attr = attrs[name];
  
          triggerAttributeChanged(target, component, {
            name: name,
            newValue: attr && (attr.value || attr.nodeValue),
            oldValue: mutation.oldValue
          });
        });
      });
  
      observer.observe(target, {
        attributes: true,
        attributeOldValue: true
      });
    }
  
    /**
     * Binds event listeners for the specified event handlers.
     *
     * @param {Element} target The component element.
     * @param {Object} component The component data.
     *
     * @returns {undefined}
     */
    function addEventListeners(target, component) {
      if (typeof component.events !== "object") {
        return;
      }
  
      function makeHandler(handler, delegate) {
        return function (e) {
          // If we're not delegating, trigger directly on the component element.
          if (!delegate) {
            return handler(target, e, target);
          }
  
          // If we're delegating, but the target doesn't match, then we've have
          // to go up the tree until we find a matching ancestor or stop at the
          // component element, or document. If a matching ancestor is found, the
          // handler is triggered on it.
          var current = e.target;
  
          while (current && current !== document && current !== target.parentNode) {
            if (matchesSelector(current, delegate)) {
              return handler(target, e, current);
            }
  
            current = current.parentNode;
          }
        };
      }
  
      objEach(component.events, function (handler, name) {
        var evt = parseEvent(name);
        var useCapture = !!evt.delegate && (evt.name === "blur" || evt.name === "focus");
        target.addEventListener(evt.name, makeHandler(handler, evt.delegate), useCapture);
      });
    }
  
    /**
     * Triggers the created lifecycle callback.
     *
     * @param {Element} target The component element.
     * @param {Object} component The component data.
     *
     * @returns {undefined}
     */
    function triggerCreated(target, component) {
      var targetData = data(target, component.id);
  
      if (targetData.created) {
        return;
      }
  
      targetData.created = true;
  
      // TODO: This doesn't need to happen if using native.
      inherit(target, component.prototype, true);
  
      // We use the unresolved / resolved attributes to flag whether or not the
      // element has been templated or not.
      if (component.template && !target.hasAttribute(component.resolvedAttribute)) {
        component.template(target);
      }
  
      target.removeAttribute(component.unresolvedAttribute);
      target.setAttribute(component.resolvedAttribute, "");
      addEventListeners(target, component);
      addAttributeListeners(target, component);
      addAttributeToPropertyLinks(target, component);
      initAttributes(target, component);
      triggerAttributesCreated(target, component);
  
      if (component.created) {
        component.created(target);
      }
    }
  
    /**
     * Triggers the attached lifecycle callback.
     *
     * @param {Element} target The component element.
     * @param {Object} component The component data.
     *
     * @returns {undefined}
     */
    function triggerAttached(target, component) {
      var targetData = data(target, component.id);
  
      if (targetData.attached) {
        return;
      }
  
      if (!elementContains(document, target)) {
        return;
      }
  
      targetData.attached = true;
  
      if (component.attached) {
        component.attached(target);
      }
  
      targetData.detached = false;
    }
  
    /**
     * Triggers the detached lifecycle callback.
     *
     * @param {Element} target The component element.
     * @param {Object} component The component data.
     *
     * @returns {undefined}
     */
    function triggerDetached(target, component) {
      var targetData = data(target, component.id);
  
      if (targetData.detached) {
        return;
      }
  
      targetData.detached = true;
  
      if (component.detached) {
        component.detached(target);
      }
  
      targetData.attached = false;
    }
  
    /**
     * Triggers the entire element lifecycle if it's not being ignored.
     *
     * @param {Element} target The component element.
     * @param {Object} component The component data.
     *
     * @returns {undefined}
     */
    function triggerLifecycle(target, component) {
      triggerCreated(target, component);
      triggerAttached(target, component);
    }
  
    /**
     * Initialises a set of elements.
     *
     * @param {DOMNodeList | Array} elements A traversable set of elements.
     *
     * @returns {undefined}
     */
    function initElements(elements) {
      var elementsLen = elements.length;
  
      for (var a = 0; a < elementsLen; a++) {
        var element = elements[a];
  
        if (element.nodeType !== 1 || element.attributes[ATTR_IGNORE]) {
          continue;
        }
  
        var currentNodeDefinitions = registry.getForElement(element);
        var currentNodeDefinitionsLength = currentNodeDefinitions.length;
  
        for (var b = 0; b < currentNodeDefinitionsLength; b++) {
          triggerLifecycle(element, currentNodeDefinitions[b]);
        }
  
        var elementChildNodes = element.childNodes;
        var elementChildNodesLen = elementChildNodes.length;
  
        if (elementChildNodesLen) {
          initElements(elementChildNodes);
        }
      }
    }
  
    /**
     * Triggers the remove lifecycle callback on all of the elements.
     *
     * @param {DOMNodeList} elements The elements to trigger the remove lifecycle
     * callback on.
     *
     * @returns {undefined}
     */
    function removeElements(elements) {
      var len = elements.length;
  
      for (var a = 0; a < len; a++) {
        var element = elements[a];
  
        if (element.nodeType !== 1) {
          continue;
        }
  
        removeElements(element.childNodes);
  
        var definitions = registry.getForElement(element);
        var definitionsLen = definitions.length;
  
        for (var b = 0; b < definitionsLen; b++) {
          triggerDetached(element, definitions[b]);
        }
      }
    }
  
    exports.initElements = initElements;
    exports.removeElements = removeElements;
    exports.triggerAttached = triggerAttached;
    exports.triggerAttributeChanged = triggerAttributeChanged;
    exports.triggerCreated = triggerCreated;
    exports.triggerDetached = triggerDetached;
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/document-observer.js
__dafc0a90c6175246530063cde2bb5942 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./globals": __839bffec73f20f49788a558812e60416,
    "./lifecycle": __ded739127d689aabfc308dff84d88ae4,
    "./mutation-observer": __5f121d4a85ec9b7b86fcc8925f46a21a,
    "./utils": __d47046751acaed4d2db1331e7ca7004f
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module", "./globals", "./lifecycle", "./mutation-observer", "./utils"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module, __839bffec73f20f49788a558812e60416, __ded739127d689aabfc308dff84d88ae4, __5f121d4a85ec9b7b86fcc8925f46a21a, __d47046751acaed4d2db1331e7ca7004f);
    }
  })(function (exports, module, _globals, _lifecycle, _mutationObserver, _utils) {
  
    var _interopRequire = function _interopRequire(obj) {
      return obj && obj.__esModule ? obj["default"] : obj;
    };
  
    var globals = _interopRequire(_globals);
  
    var initElements = _lifecycle.initElements;
    var removeElements = _lifecycle.removeElements;
  
    var MutationObserver = _interopRequire(_mutationObserver);
  
    var getClosestIgnoredElement = _utils.getClosestIgnoredElement;
  
    /**
     * The document observer handler.
     *
     * @param {Array} mutations The mutations to handle.
     *
     * @returns {undefined}
     */
    function documentObserverHandler(mutations) {
      var mutationsLen = mutations.length;
  
      for (var a = 0; a < mutationsLen; a++) {
        var mutation = mutations[a];
        var addedNodes = mutation.addedNodes;
        var removedNodes = mutation.removedNodes;
  
        // Since siblings are batched together, we check the first node's parent
        // node to see if it is ignored. If it is then we don't process any added
        // nodes. This prevents having to check every node.
        if (addedNodes && addedNodes.length && !getClosestIgnoredElement(addedNodes[0].parentNode)) {
          initElements(addedNodes);
        }
  
        // We can't check batched nodes here because they won't have a parent node.
        if (removedNodes && removedNodes.length) {
          removeElements(removedNodes);
        }
      }
    }
  
    /**
     * Creates a new mutation observer for listening to Skate definitions for the
     * document.
     *
     * @param {Element} root The element to observe.
     *
     * @returns {MutationObserver}
     */
    function createDocumentObserver() {
      var observer = new MutationObserver(documentObserverHandler);
  
      // Observe after the DOM content has loaded.
      observer.observe(document, {
        childList: true,
        subtree: true
      });
  
      return observer;
    }
  
    module.exports = {
      register: function register(fixIe) {
        // IE has issues with reporting removedNodes correctly. See the polyfill for
        // details. If we fix IE, we must also re-define the document observer.
        if (fixIe) {
          MutationObserver.fixIe();
          this.unregister();
        }
  
        if (!globals.observer) {
          globals.observer = createDocumentObserver();
        }
  
        return this;
      },
  
      unregister: function unregister() {
        if (globals.observer) {
          globals.observer.disconnect();
          globals.observer = undefined;
        }
  
        return this;
      }
    };
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/version.js
__62f6acb43c7d76642733df4feb5e204e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    }
  })(function (exports, module) {
  
    module.exports = "0.13.4";
  });
  
  return module.exports;
}).call(this);

// node_modules/skatejs/lib/skate.js
__820bd0ebd8d14c26e627f1bf65728af7 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./constants": __d6e807d1b8cf3f7640b5275dfd579aae,
    "./document-observer": __dafc0a90c6175246530063cde2bb5942,
    "./lifecycle": __ded739127d689aabfc308dff84d88ae4,
    "./registry": __2b13acb334cc913419a3f1d957d7121a,
    "./utils": __d47046751acaed4d2db1331e7ca7004f,
    "./version": __62f6acb43c7d76642733df4feb5e204e
  };
  var define = function defineReplacement(name, deps, func) {
    var rval;
    var type;
  
    func = [func, deps, name].filter(function (cur) { return typeof cur === 'function'; })[0];
    deps = [deps, name, []].filter(Array.isArray)[0];
    rval = func.apply(null, deps.map(function (value) { return defineDependencies[value]; }));
    type = typeof rval;
  
    // Some processors like Babel don't check to make sure that the module value
    // is not a primitive before calling Object.defineProperty() on it. We ensure
    // it is an instance so that it can.
    if (type === 'string') {
      rval = new String(rval);
    } else if (type === 'number') {
      rval = new Number(rval);
    } else if (type === 'boolean') {
      rval = new Boolean(rval);
    }
  
    // Reset the exports to the defined module. This is how we convert AMD to
    // CommonJS and ensures both can either co-exist, or be used separately. We
    // only set it if it is not defined because there is no object representation
    // of undefined, thus calling Object.defineProperty() on it would fail.
    if (rval !== undefined) {
      exports = module.exports = rval;
    }
  };
  define.amd = true;
  
  "use strict";
  
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module", "./constants", "./document-observer", "./lifecycle", "./registry", "./utils", "./version"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module, __d6e807d1b8cf3f7640b5275dfd579aae, __dafc0a90c6175246530063cde2bb5942, __ded739127d689aabfc308dff84d88ae4, __2b13acb334cc913419a3f1d957d7121a, __d47046751acaed4d2db1331e7ca7004f, __62f6acb43c7d76642733df4feb5e204e);
    }
  })(function (exports, module, _constants, _documentObserver, _lifecycle, _registry, _utils, _version) {
  
    var _interopRequire = function _interopRequire(obj) {
      return obj && obj.__esModule ? obj["default"] : obj;
    };
  
    var TYPE_ATTRIBUTE = _constants.TYPE_ATTRIBUTE;
    var TYPE_CLASSNAME = _constants.TYPE_CLASSNAME;
    var TYPE_ELEMENT = _constants.TYPE_ELEMENT;
  
    var documentObserver = _interopRequire(_documentObserver);
  
    var triggerCreated = _lifecycle.triggerCreated;
    var triggerAttached = _lifecycle.triggerAttached;
    var triggerDetached = _lifecycle.triggerDetached;
    var triggerAttributeChanged = _lifecycle.triggerAttributeChanged;
    var initElements = _lifecycle.initElements;
  
    var registry = _interopRequire(_registry);
  
    var debounce = _utils.debounce;
    var inherit = _utils.inherit;
  
    var version = _interopRequire(_version);
  
    var HTMLElement = window.HTMLElement;
  
    /**
     * Initialises all valid elements in the document. Ensures that it does not
     * happen more than once in the same execution, and that it happens after the DOM is ready.
     *
     * @returns {undefined}
     */
    var initDocument = debounce(function () {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        initElements(document.documentElement.childNodes);
      } else {
        document.addEventListener("DOMContentLoaded", function initialiseSkateElementsOnDomLoad() {
          initElements(document.documentElement.childNodes);
        });
      }
    });
  
    /**
     * Creates a constructor for the specified definition.
     *
     * @param {Object} definition The definition information to use for generating the constructor.
     *
     * @returns {Function} The element constructor.
     */
    function makeElementConstructor(definition) {
      function CustomElement() {
        var element;
        var tagToExtend = definition["extends"];
        var definitionId = definition.id;
  
        if (tagToExtend) {
          element = document.createElement(tagToExtend);
          element.setAttribute("is", definitionId);
        } else {
          element = document.createElement(definitionId);
        }
  
        // Ensure the definition prototype is up to date with the element's
        // prototype. This ensures that overwriting the element prototype still
        // works.
        definition.prototype = CustomElement.prototype;
  
        // If they use the constructor we don't have to wait until it's attached.
        triggerCreated(element, definition);
  
        return element;
      }
  
      // This allows modifications to the element prototype propagate to the
      // definition prototype.
      CustomElement.prototype = definition.prototype;
  
      return CustomElement;
    }
  
    // Public API
    // ----------
  
    /**
     * Creates a listener for the specified definition.
     *
     * @param {String} id The ID of the definition.
     * @param {Object | Function} definition The definition definition.
     *
     * @returns {Function} Constructor that returns a custom element.
     */
    function skate(id, definition) {
      // Just in case the definition is shared, we duplicate it so that internal
      // modifications to the original aren't shared.
      definition = inherit({}, definition);
      definition = inherit(definition, skate.defaults);
      definition.id = id;
  
      registry.set(id, definition);
  
      if (registry.isNativeCustomElement(id)) {
        var elementPrototype = definition["extends"] ? document.createElement(definition["extends"]).constructor.prototype : HTMLElement.prototype;
  
        if (!elementPrototype.isPrototypeOf(definition.prototype)) {
          definition.prototype = inherit(Object.create(elementPrototype), definition.prototype, true);
        }
  
        var options = {
          prototype: inherit(definition.prototype, {
            createdCallback: function createdCallback() {
              triggerCreated(this, definition);
            },
            attachedCallback: function attachedCallback() {
              triggerAttached(this, definition);
            },
            detachedCallback: function detachedCallback() {
              triggerDetached(this, definition);
            },
            attributeChangedCallback: function attributeChangedCallback(name, oldValue, newValue) {
              triggerAttributeChanged(this, definition, {
                name: name,
                oldValue: oldValue,
                newValue: newValue
              });
            }
          })
        };
  
        if (definition["extends"]) {
          options["extends"] = definition["extends"];
        }
  
        return document.registerElement(id, options);
      }
  
      initDocument();
      documentObserver.register(!!definition.detached);
  
      if (registry.isType(id, TYPE_ELEMENT)) {
        return makeElementConstructor(definition);
      }
    }
  
    /**
     * Synchronously initialises the specified element or elements and descendants.
     *
     * @param {Mixed} nodes The node, or nodes to initialise. Can be anything:
     *                      jQuery, DOMNodeList, DOMNode, selector etc.
     *
     * @returns {skate}
     */
    skate.init = function (nodes) {
      var nodesToUse = nodes;
  
      if (!nodes) {
        return nodes;
      }
  
      if (typeof nodes === "string") {
        nodesToUse = nodes = document.querySelectorAll(nodes);
      } else if (nodes instanceof HTMLElement) {
        nodesToUse = [nodes];
      }
  
      initElements(nodesToUse);
  
      return nodes;
    };
  
    // Restriction type constants.
    skate.type = {
      ATTRIBUTE: TYPE_ATTRIBUTE,
      CLASSNAME: TYPE_CLASSNAME,
      ELEMENT: TYPE_ELEMENT
    };
  
    // Makes checking the version easy when debugging.
    skate.version = version;
  
    /**
     * The default options for a definition.
     *
     * @var {Object}
     */
    skate.defaults = {
      // Attribute lifecycle callback or callbacks.
      attributes: undefined,
  
      // The events to manage the binding and unbinding of during the definition's
      // lifecycle.
      events: undefined,
  
      // Restricts a particular definition to binding explicitly to an element with
      // a tag name that matches the specified value.
      "extends": undefined,
  
      // The ID of the definition. This is automatically set in the `skate()`
      // function.
      id: "",
  
      // Properties and methods to add to each element.
      prototype: {},
  
      // The attribute name to add after calling the created() callback.
      resolvedAttribute: "resolved",
  
      // The template to replace the content of the element with.
      template: undefined,
  
      // The type of bindings to allow.
      type: TYPE_ELEMENT,
  
      // The attribute name to remove after calling the created() callback.
      unresolvedAttribute: "unresolved"
    };
  
    // Exporting
    // ---------
  
    var previousSkate = window.skate;
    skate.noConflict = function () {
      window.skate = previousSkate;
      return skate;
    };
  
    // Global
    window.skate = skate;
  
    // ES6
    module.exports = skate;
  });
  
  return module.exports;
}).call(this);

// src/binding/each.js
__b8d4c180975f573d1fa5614b5515c848 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiExpression = __c2964be06a01750b4bed2b231c176468;
  
  var _apiExpression2 = _interopRequireDefault(_apiExpression);
  
  var _apiScopeCallback = __c737e206881f4e38e5b8822f16ebf55a;
  
  var _apiScopeCallback2 = _interopRequireDefault(_apiScopeCallback);
  
  var _utilEach = __39ef8df12145cb19e3d370105ce69f8d;
  
  var _utilEach2 = _interopRequireDefault(_utilEach);
  
  var _utilInherit = __15fa3ccd1c228c0b1670a6636284114c;
  
  var _utilInherit2 = _interopRequireDefault(_utilInherit);
  
  var _utilInsertNodeBefore = __c2285dae7f085df52a881f9528d0ed45;
  
  var _utilInsertNodeBefore2 = _interopRequireDefault(_utilInsertNodeBefore);
  
  var _skatejs = __820bd0ebd8d14c26e627f1bf65728af7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  var _witness = __c861f3939f1ea7e6b603d7d406bb9167;
  
  var _witness2 = _interopRequireDefault(_witness);
  
  exports['default'] = {
    attached: function attached(element) {
      var index = 0;
      var gtEach = element.getAttribute('gt-each');
      var expr = (0, _apiExpression2['default'])(gtEach);
      var propertyValue = expr.propertyValue();
      var observer = (0, _witness2['default'])(propertyValue);
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
  
      (0, _utilEach2['default'])(propertyValue, function (item, name) {
        insert(index, name, item);
        ++index;
      });
  
      function insert(index, name, newScope) {
        var dolly = element.cloneNode(true);
  
        (0, _apiScopeCallback2['default'])(newScope, function (scope) {
          if (scopes[index]) {
            (0, _utilInherit2['default'])(scopes[index], scope);
          } else {
            scopes[index] = scope;
          }
  
          (0, _utilInsertNodeBefore2['default'])(dolly, placeholder);
          _skatejs2['default'].init(dolly);
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
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/if.js
__0c022dc5aee9e41a03f2d1c770461d05 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiExpression = __c2964be06a01750b4bed2b231c176468;
  
  var _apiExpression2 = _interopRequireDefault(_apiExpression);
  
  var _witness = __c861f3939f1ea7e6b603d7d406bb9167;
  
  var _witness2 = _interopRequireDefault(_witness);
  
  exports['default'] = {
    attached: function attached(element) {
      var gtIf = element.getAttribute('gt-if');
      var placeholder = document.createComment(' gt-if: ' + gtIf + ' ');
      var expr = (0, _apiExpression2['default'])(gtIf);
      var observer = (0, _witness2['default'])(expr.namespaceValue());
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
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/template.js
__12f5682923336d2511474bd6d5dc88b5 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiExpression = __c2964be06a01750b4bed2b231c176468;
  
  var _apiExpression2 = _interopRequireDefault(_apiExpression);
  
  var _apiScopeCallback = __c737e206881f4e38e5b8822f16ebf55a;
  
  var _apiScopeCallback2 = _interopRequireDefault(_apiScopeCallback);
  
  var _skatejs = __820bd0ebd8d14c26e627f1bf65728af7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  exports['default'] = {
    attached: function attached(element, done) {
      var template = document.getElementById(element.getAttribute('gt-template'));
      var html = template.innerHTML.replace('{{content}}', element.innerHTML);
      var data = (0, _apiExpression2['default'])(element.getAttribute('gt-template-data'));
  
      (0, _apiScopeCallback2['default'])(data.value(), function () {
        if (element.hasAttribute('gt-template-replace')) {
          element = document.createElement('div');
        }
  
        element.innerHTML = html;
        _skatejs2['default'].init(element.children);
        done(element);
      });
    }
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/text.js
__f4d7babc6d5472f7b66a1e3caf056c0e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiExpression = __c2964be06a01750b4bed2b231c176468;
  
  var _apiExpression2 = _interopRequireDefault(_apiExpression);
  
  exports['default'] = {
    attached: function attached(element) {
      var expr = (0, _apiExpression2['default'])(element.getAttribute('gt-text'));
      element.textContent = expr.propertyValue();
    }
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/trim.js
__daaf800f44bf9cbcd935238e339f23d1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = {
    attached: function attached(element) {
      var html = element.innerHTML;
  
      if (html) {
        element.innerHTML = html.trim();
      }
    }
  };
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);

// src/binding/value.js
__38689c0b6e22dd4baf157ccaeb8c1163 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiExpression = __c2964be06a01750b4bed2b231c176468;
  
  var _apiExpression2 = _interopRequireDefault(_apiExpression);
  
  var _apiScope = __1dc4be17bb86f14650f75871c3839525;
  
  var _apiScope2 = _interopRequireDefault(_apiScope);
  
  var _witness = __c861f3939f1ea7e6b603d7d406bb9167;
  
  var _witness2 = _interopRequireDefault(_witness);
  
  exports['default'] = {
    created: function created(element) {
      var expr = (0, _apiExpression2['default'])(element.getAttribute('gt-value'));
      var observer = (0, _witness2['default'])(expr.namespaceValue());
      var currentScope = (0, _apiScope2['default'])();
  
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
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/binding/with.js
__6b41abc00b5364ad7321abbd58efa043 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiScopeCallback = __c737e206881f4e38e5b8822f16ebf55a;
  
  var _apiScopeCallback2 = _interopRequireDefault(_apiScopeCallback);
  
  var _apiScopeEval = __1f0f3efd4ec954db0326033763fc22b5;
  
  var _apiScopeEval2 = _interopRequireDefault(_apiScopeEval);
  
  var _skatejs = __820bd0ebd8d14c26e627f1bf65728af7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  exports['default'] = {
    created: function created(element) {
      (0, _apiScopeCallback2['default'])((0, _apiScopeEval2['default'])(element.getAttribute('gt-with')), function () {
        _skatejs2['default'].init(element);
      });
    }
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/index.js
__0c1d30f99845741b122cc927e439aeeb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _apiCompile = __e0617aae6abd6106b8140eb4de2377d3;
  
  var _apiCompile2 = _interopRequireDefault(_apiCompile);
  
  var _apiExpression = __c2964be06a01750b4bed2b231c176468;
  
  var _apiExpression2 = _interopRequireDefault(_apiExpression);
  
  var _apiScope = __1dc4be17bb86f14650f75871c3839525;
  
  var _apiScope2 = _interopRequireDefault(_apiScope);
  
  var _apiScopeCallback = __c737e206881f4e38e5b8822f16ebf55a;
  
  var _apiScopeCallback2 = _interopRequireDefault(_apiScopeCallback);
  
  var _apiScopeEval = __1f0f3efd4ec954db0326033763fc22b5;
  
  var _apiScopeEval2 = _interopRequireDefault(_apiScopeEval);
  
  var _bindingAttr = __e69c608e2cae009133c594ced1fc58ff;
  
  var _bindingAttr2 = _interopRequireDefault(_bindingAttr);
  
  var _bindingClick = __3f83e12d42ee40e471b9f3e84fc0bc3e;
  
  var _bindingClick2 = _interopRequireDefault(_bindingClick);
  
  var _bindingEach = __b8d4c180975f573d1fa5614b5515c848;
  
  var _bindingEach2 = _interopRequireDefault(_bindingEach);
  
  var _bindingIf = __0c022dc5aee9e41a03f2d1c770461d05;
  
  var _bindingIf2 = _interopRequireDefault(_bindingIf);
  
  var _bindingTemplate = __12f5682923336d2511474bd6d5dc88b5;
  
  var _bindingTemplate2 = _interopRequireDefault(_bindingTemplate);
  
  var _bindingText = __f4d7babc6d5472f7b66a1e3caf056c0e;
  
  var _bindingText2 = _interopRequireDefault(_bindingText);
  
  var _bindingTrim = __daaf800f44bf9cbcd935238e339f23d1;
  
  var _bindingTrim2 = _interopRequireDefault(_bindingTrim);
  
  var _bindingValue = __38689c0b6e22dd4baf157ccaeb8c1163;
  
  var _bindingValue2 = _interopRequireDefault(_bindingValue);
  
  var _bindingWith = __6b41abc00b5364ad7321abbd58efa043;
  
  var _bindingWith2 = _interopRequireDefault(_bindingWith);
  
  var _skatejs = __820bd0ebd8d14c26e627f1bf65728af7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  (0, _skatejs2['default'])('gt-attr', _bindingAttr2['default']);
  (0, _skatejs2['default'])('gt-click', _bindingClick2['default']);
  (0, _skatejs2['default'])('gt-each', _bindingEach2['default']);
  (0, _skatejs2['default'])('gt-if', _bindingIf2['default']);
  (0, _skatejs2['default'])('gt-template', _bindingTemplate2['default']);
  (0, _skatejs2['default'])('gt-text', _bindingText2['default']);
  (0, _skatejs2['default'])('gt-trim', _bindingTrim2['default']);
  (0, _skatejs2['default'])('gt-value', _bindingValue2['default']);
  (0, _skatejs2['default'])('gt-with', _bindingWith2['default']);
  
  exports['default'] = window.griptape = {
    compile: _apiCompile2['default'],
    expression: _apiExpression2['default'],
    scope: _apiScope2['default'],
    scopeCallback: _apiScopeCallback2['default'],
    scopeEval: _apiScopeEval2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);