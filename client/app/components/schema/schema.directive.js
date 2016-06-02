import './schema.styl';
import {SchemaController as controller} from './schema.controller';
import template from './schema.html';

export const schemaDirective = ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {}
  };
};
