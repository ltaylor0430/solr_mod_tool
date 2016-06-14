
export const uploadOnChangeDirective = ()=> {
  "use strict";
  return {
    scope: {fileName :'='},
    restrict: 'A',
    link: (scope, element, attrs) => {

    //this works but this assumes the parent scope is using controllerAs 'vm'
     element.bind('change', function() {
      //must run a digest cycle once this is updated.
      scope.$apply(()=>{
              scope.$parent.vm.fileName = element[0].files[0].name;
         console.log( scope);
      });

     });
    }
  };
};


