import './dynamic.details.styl';
import {DynamicDetailsController as controller} from './dynamic.details.controller';
import template from './dynamic.details.html';

export const dynamicDetailsDirective = ()=> {
  "use strict";
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    bindToController:true,
    scope: { editMode : '='}

  };
};
