export class  DeepBlurController {
  constructor($scope, $element, $attrs, $timeout) {
    this.value = $scope.value;
   const leaveExpr = $attrs.deepBlur,
            dom = $element[0];

            this.onBlur = (e)  => {
                // e.relatedTarget for Chrome
                // document.activeElement for IE 11
                var targetElement = e.relatedTarget || document.activeElement;
                console.log('deep blur running!');
                let containsDom= (parent, dom)=> {
                    while (dom) {
                        if (dom === parent) {
                            return true;
                        }

                        dom = dom.parentNode;
                    }

                    return false;
                };

                  if (!containsDom(dom, targetElement)) {
                      $timeout(function () {
                          $scope.$apply(leaveExpr);
                      }, 10);
                  }
              };

      }
    }

