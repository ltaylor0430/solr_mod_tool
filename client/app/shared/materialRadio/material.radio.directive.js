
import {MaterialRadioController as controller} from './material.radio.controller';


export const matRadioDirective = () => {
 "use strict";
  return {
    template:`<label class=" mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                    <i  class="material-icons" >{{vm.radioStyle}}</i>
                    <input  name="{{name}}" class="none" ng-model="selectedItem"  value="{{value}}"   type="radio" /> </label>

`,
    controller:controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {
                  name:'@',
                  selectedItem:'=',
                  value: '@'},
    link: (scope,elem,attrs,ctrl) =>{
      scope.$watch('selectedItem',()=>{
        ctrl.onChange();

      });

    }
  };
};
