import './material.select.styl';
import {MaterialSelectController as controller} from './material.select.controller';


export const matSelectDirective = () => {
 "use strict";
  return {
    template:`
    <div  ng-init="expanded = false" deep-blur="expanded = false">
    <button  ng-attr-expanded="{{expanded}}"  ng-click="expanded = !expanded" class=" mat-select mdl-button mdl-js-button mdl-button--icon">
                  {{selectedItem}}asfs
                  <div class="select-icon">
                    <i  class="material-icons" >expand_more</i>
                    </div>
                   </button>
                  <div  class="animate list-items" ng-show="expanded">

                      <ul  ng-blur="vm.hide()"   class="dropdown-list-item mdl-list">
                        <li ng-click="vm.onSelectItemChange(item)"  class="mdl-list__item">
                          <span class="mdl-list__item-primary-content">
                            Bryan Cranston
                          </span>
                        </li>
                        <li class="mdl-list__item">
                          <span class="mdl-list__item-primary-content">
                            Aaron Paul
                          </span>
                        </li>
                        <li class="mdl-list__item">
                          <span class="mdl-list__item-primary-content">
                            Bob Odenkirk
                          </span>
                        </li>
                      </ul>
                  </div>

          </div>
`,
    controller:controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {
                  name:'@',
                  selectedItem:'=',
                  items: '='}


  };
};
