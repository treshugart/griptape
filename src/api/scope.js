var currentScope = window;

export default function (def) {
  if (typeof def === 'undefined') {
    return currentScope;
  }

  currentScope = def;

  // Ensure scope functions are bound to the scope so that when bindings
  // execute the function outside of the scope they are still bound to it.
  for (let a in currentScope) {
    if (typeof currentScope[a] === 'function') {
      currentScope[a] = currentScope[a].bind(currentScope);
    }
  }

  return this;
}
