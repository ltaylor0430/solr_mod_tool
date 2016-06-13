import angular from 'angular';
import {copyDirective} from './copy.directive';

// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const solrCopyFields = angular.module('solrCopyFields', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('copy', {
    url: '/copy',
    views: {
    '' : {template: `<copyfields></copyfields>`}

    }
  })
 .state('copy.details',{
    url:'/add',
    views : {
    'details': {template:`<editfieldtype></editfieldtype>`}
    }


  })
  .state('copy.edit',{
    url:'/edit/:id',
    template:'<editfieldtype></editfieldtype>'

  });

})
.directive('copyfields', copyDirective);

