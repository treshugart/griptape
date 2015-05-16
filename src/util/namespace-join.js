export default function namespaceJoin (namespaces) {
  var ns = namespaces.shift();

  namespaces.forEach(function (part) {
    ns += "['' + " + part + ']';
  });

  return ns;
}
