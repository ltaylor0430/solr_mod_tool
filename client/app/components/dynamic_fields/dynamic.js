import angular from 'angular';
import {dynamicFieldsDirective} from './dynamic.directive';

// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const dynamic = angular.module('dynamic', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('dynamic', {
    url: '/dynamic',
    views: {
    '' : {template: `<dynamicFields></dynamicFields>`}

    }
  })
 .state('dynamic.details',{
    url:'/add',
    views : {
    'details': {template:`<editfieldtype></editfieldtype>`}
    }


  })
  .state('dynamic.edit',{
    url:'/edit/:id',
    template:'<editfieldtype></editfieldtype>'

  });

})
.directive('dynamicFields', dynamicFieldsDirective);

