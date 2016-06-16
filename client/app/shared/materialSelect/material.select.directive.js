import './material.select.styl';

import {MaterialSelectController as controller} from './material.select.controller';


export const matSelectDirective = ($window) => {
 "use strict";
  return {
    template:`

<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">
      <input ng-model="vm.selectedItem" class="mdl-textfield__input" type="text" id="{{vm.name}}" readonly tabIndex="-1" value=" " data-val="{{vm.selectedItem}}"/>
       <label for="{{vm.name}}">
                <i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
            </label>
        <label class="mdl-textfield__label" for="{{vm.name}}">{{vm.name}}</label>
        <ul  class="mdl-menu mdl-menu--bottom-left mdl-js-menu" for="{{vm.name}}">
          <li  ng-click="vm.selectedItem = item.name" ng-repeat="item in vm.items" class="mdl-menu__item" data-val="{{item.name}}">{{item.name}}</li>

        </ul>
    </div>

`,
    controller:controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    bindToController:true,
    scope: {
                  name:'@',

                  selectedItem:'=',
                  items: '='},
                  link: (scope,elem,attr,ctrl) => {

                  }


  };
};

