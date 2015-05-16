import utilError from '../util/error';

export default function (js) {
  return function (ctx) {
    try {
      return new Function('ctx', 'with (ctx) { return ' + js + '; }')(ctx);
    } catch (e) {
      utilError('Error parsing "$1" with message: $2', js, e.message);
    }
  };
}
