import apiCompile from './api/compile';
import apiExpression from './api/expression';
import apiScope from './api/scope';
import apiScopeCallback from './api/scope-callback';
import apiScopeEval from './api/scope-eval';
import bindingAttr from './binding/attr';
import bindingClick from './binding/click';
import bindingEach from './binding/each';
import bindingIf from './binding/if';
import bindingTemplate from './binding/template';
import bindingText from './binding/text';
import bindingTrim from './binding/trim';
import bindingValue from './binding/value';
import bindingWith from './binding/with';
import skate from 'skatejs';

skate('gt-attr', bindingAttr);
skate('gt-click', bindingClick);
skate('gt-each', bindingEach);
skate('gt-if', bindingIf);
skate('gt-template', bindingTemplate);
skate('gt-text', bindingText);
skate('gt-trim', bindingTrim);
skate('gt-value', bindingValue);
skate('gt-with', bindingWith);

export default window.griptape = {
  compile: apiCompile,
  expression: apiExpression,
  scope: apiScope,
  scopeCallback: apiScopeCallback,
  scopeEval: apiScopeEval
};
