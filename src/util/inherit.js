export default function inherit (base) {
  for (var a = 1; a < arguments.length; a++) {
    for (var b in arguments[a]) {
      if (typeof base[b] === 'undefined') {
        base[b] = arguments[a][b];
      }
    }
  }

  return base;
}
