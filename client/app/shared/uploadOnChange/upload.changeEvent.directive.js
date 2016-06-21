
export const uploadOnChangeDirective = ()=> {
  return {
    scope: {fileName: '='},
    restrict: 'A',
    link: (scope, element, attrs) => {
    // this works but this assumes the parent scope is using controllerAs 'vm'
      element.bind('change', () => {
        // must run a digest cycle once this is updated.
        scope.$apply(()=>{
          scope.$parent.vm.fileName = element[0].files[0].name;
        });
      });
    },
  };
};


