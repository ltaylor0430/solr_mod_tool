
import {FiltersController as controller} from './filters.controller';
import template from './filters.html';

export const filtersDirective = () => {
  return {
    template: template,
    controller: controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {bindingTo: '='},

  };
};
