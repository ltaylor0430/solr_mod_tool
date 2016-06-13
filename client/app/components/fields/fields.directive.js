import {FieldsController as controller} from './fields.controller';
import template from './fields.html';

export const fieldsDirective = ()=> {
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
