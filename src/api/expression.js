import apiCompile from './compile';
import apiScope from './scope';
import utilNamespaceJoin from '../util/namespace-join';
import utilNamespaceSplit from '../util/namespace-split';

export default function (expression, scope) {
  scope = scope || apiScope();

  var namespace = utilNamespaceSplit(expression);
  var propertyName = namespace.pop();
  var namespaceName = utilNamespaceJoin(namespace);
  var compiledExpression = apiCompile(expression);
  var compiledPropertyName = apiCompile(propertyName);
  var compiledNamespaceName = apiCompile(namespaceName);

  return {
    currentScope: scope,
    namespaceName: namespaceName,
    propertyName: propertyName,
    namespaceValue: function () { return namespaceName ? compiledNamespaceName(scope) : scope; },
    propertyValue: function () { return compiledPropertyName(this.namespaceValue()); },
    value: function () { return compiledExpression(scope); },
  };
}
