import './field.details.styl';
import {FieldsDetailsController as controller} from './field.details.controller';
import template from './field.details.html';

export const fieldsDetailsDirective = ()=> {
  "use strict";
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    bindToController:true,
    scope: { editMode : '='}
    //TODO: write unsaved changes warning
/*    link:(scope,iElem,iAttrs,ctrl)=> {
        scope.$watch('type',(newVal, oldVal)=>{

            if (angular.equals(newVal,oldVal)) {
                return;
            }
            if (ctrl.isFormDirty()) {
              //alert user before changing
              let answer =$window.confirm('You have unsaved changes. Are you sure you want to leave?');
              if (!answer) {
                event.preventDefault();

                newVal = scope.type;
              }
          }


        });
    }*/
  };
};
