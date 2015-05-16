export default {
  attached: function (element) {
    var html = element.innerHTML;

    if (html) {
      element.innerHTML = html.trim();
    }
  }
};
