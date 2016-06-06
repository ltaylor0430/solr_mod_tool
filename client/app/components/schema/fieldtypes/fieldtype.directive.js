import './fieldtype.styl';
import {FieldTypeController as controller} from './fieldtype.controller';
import template from './fieldtype.html';

export const fieldTypeDirective = ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {type:'='}
  };
};
