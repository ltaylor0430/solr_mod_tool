import {DynamicFieldsController as controller} from './dynamic.controller';
import template from './dynamic.html';

export const dynamicFieldsDirective = ()=> {
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
