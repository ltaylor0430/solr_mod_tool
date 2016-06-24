
export const editableDirective = ($compile) => {
 "use strict";
  return {
    restrict: 'A',
    scope: {toggle: '=',
                  editableItem:'='},
    controller:()=> {},

    link: {
        pre: (scope, elem, attrs) =>{
             let  template = `<div  ng-show="toggle">
                                  <span class="warning" ng-show="vm.hasErrors">required</span>
                                  <input placeholder="name"   class="mdl-textfield__input" type="text" ng-model="editableItem"/>
                                  </div>`;
            let e = $compile(template)(scope);
            elem.after(e);


        },
        post: (scope,elem,attrs) => {
          scope.$watch('toggle', (newVal)=>{
            if (newVal) {
              elem.css('display', 'none');
            } else {
              elem.css('display', 'inline');
            }
          });
        },
    },
  };
};
