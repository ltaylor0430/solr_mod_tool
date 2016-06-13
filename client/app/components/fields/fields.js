import angular from 'angular';
import {fieldsDirective} from './fields.directive';
 // placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const fields = angular.module('fields', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('fields', {
    url: '/fields',
    views: {
    '' : {template: `<fields></fields>`}

    }
  })
 .state('fields.details',{
    url:'/add',
    views : {
    'details': {template:`<editfieldtype></editfieldtype>`}
    }


  })
  .state('fields.edit',{
    url:'/edit/:id',
    template:'<editfieldtype></editfieldtype>'

  });

})
.directive('fields', fieldsDirective);

