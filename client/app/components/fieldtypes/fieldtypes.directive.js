import {FieldTypesController as controller} from './fieldtypes.controller';
import template from './fieldtypes.html';

export const fieldTypesDirective = ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {type: '='},
  };
};
