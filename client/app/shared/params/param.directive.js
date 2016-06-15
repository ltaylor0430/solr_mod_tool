import './params.styl';
import {ParamsController as controller} from './params.controller';
import template from './params.html';

export const paramDirective = () => {
 "use strict";
  return {
    template:template,
    controller:controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {bindingTo:'='}

  };
};
