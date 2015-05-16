export default function each (items, callback) {
  if (Array.isArray(items)) {
    return items.forEach(callback);
  }

  if (!items.hasOwnProperty) {
    return;
  }

  for (var a in items) {
    if (items.hasOwnProperty(a)) {
      callback(items[a], a);
    }
  }
}
