import {DeelBlurController as controller} from './deep-blur.controller';
export const deepBlurDIrective = () => {
        "use strict";
     return {
        restrict: 'A',
        controller: controller,
        controllerAs: 'vm',
        link:(scope,elem,attr,ctrl) => {
                    if (elem[0].addEventListener) {
                        elem[0].addEventListener('blur', scope.vm.onBlur, true);
                    } else {
                        elem[0].attachEvent('onfocusout', scope.vm.onBlur); // For IE8
                    }
        }
    };
};

