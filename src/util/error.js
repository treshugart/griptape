export default function error (msg) {
  for (var a = 1; a < arguments.length; a++) {
    msg = msg.replace(new RegExp('\\$' + a, 'g'), arguments[a]);
  }

  throw new Error(msg);
}
