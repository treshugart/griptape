export default function insertNodeBefore (el, ref) {
  ref.parentNode.insertBefore(el, ref);
}
