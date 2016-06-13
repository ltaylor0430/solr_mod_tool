import angular from 'angular';
import {fieldTypesDirective} from './fieldtypes.directive';
import {fieldTypesTemplate} from './fieldtypes.html';
// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const fieldtypes = angular.module('solrTypes', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('fieldType', {
    url: '/types',
    views: {
    '' : {template: `<field-types></field-types>`}
  
    }
  })
 .state('fieldType.details',{
    url:'/add',
    views : {
    'details': {template:`<editfieldtype></editfieldtype>`}
    }
     
    
  })
  .state('fieldType.edit',{
    url:'/edit/:id',
    template:'<editfieldtype></editfieldtype>'

  });
 
})
.directive('fieldTypes', fieldTypesDirective);
 
