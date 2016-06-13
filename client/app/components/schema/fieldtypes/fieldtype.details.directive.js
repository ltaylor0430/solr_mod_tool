import './fieldtype.details.styl';
import {FieldTypeDetailsController as controller} from './fieldtype.details.controller';
import template from './fieldtype.details.html';

export const fieldTypeDetailsDirective = ()=> {
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
