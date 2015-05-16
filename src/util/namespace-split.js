export default function namespaceSplit (js) {
  var nameChars = '[^ a-zA-Z0-9_$]+';
  js = js || '';
  js = js.replace(new RegExp('^' + nameChars, 'g'), '');
  js = js.replace(new RegExp(nameChars + '$', 'g'), '');
  return js.split(/[\[\]\.]+(?=(?:[^"\\]*(?:\\.|"(?:[^"\\]*\\.)*[^"\\]*"))*[^"]*$)/);
}
