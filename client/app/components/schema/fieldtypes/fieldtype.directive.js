import './fieldtype.styl';
import {FieldTypeController as controller} from './fieldtype.controller';
import template from './fieldtype.html';

export const fieldTypeDriective = ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {type:'='}
  };
};
