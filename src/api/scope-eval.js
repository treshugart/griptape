import apiCompile from './compile';
import apiScope from './scope';

export default function (js, customScope) {
  return apiCompile(js)(customScope || apiScope());
}
