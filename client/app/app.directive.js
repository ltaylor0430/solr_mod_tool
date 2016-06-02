import './app.styl';
import template from './app.html';
//ES2015
export const appDirective = ()=> {
  return {
    template,
    restrict: 'E',
    scope: {},
    replace: true
  };
};
