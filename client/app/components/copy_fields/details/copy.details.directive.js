import './copy.details.styl';
import {CopyDetailsController as controller} from './copy.details.controller';
import template from './copy.details.html';

export const copyDetailsDirective = ()=> {
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
