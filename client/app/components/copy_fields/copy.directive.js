import {CopyController as controller} from './copy.controller';
import template from './copy.html';

export const copyDirective = ()=> {
  "use strict";
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {type:'='}
  };
};
