import apiScope from './scope';

export default function (value, callback, specials = {}) {
  var oldScope = apiScope();
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

  apiScope(newScope);
  callback(newScope, oldScope);
  apiScope(oldScope);

  return this;
}
