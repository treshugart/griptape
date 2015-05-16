export default function indexOfNode (el) {
  var i = -1;

  while (el = el.previousSibling) {
    ++i;
  }

  return i;
}
