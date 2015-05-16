import apiScopeCallback from '../api/scope-callback';
import apiScopeEval from '../api/scope-eval';
import skate from 'skatejs';

export default {
  created: function (element) {
    apiScopeCallback(apiScopeEval(element.getAttribute('gt-with')), function () {
      skate.init(element);
    });
  }
};
