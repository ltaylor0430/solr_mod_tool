import angular from 'angular';
import {schemaDirective} from './schema.directive';


// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const schema = angular.module('schema', [])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('schema', {
    url: '/',
    template: '<schema></schema>',
  });/*
 .state('schema.addFieldType',{
    url:'/add/fieldType',
    views: {
      'addFieldType': {
        template:'<editfieldtype></editfieldtype>'
       }
    }
  })
  .state('schema.editFieldType',{
    url:'/edit/fieldType/:id',
    template:'<editfieldtype></editfieldtype>'

  });*/
})
.directive('schema', schemaDirective);
