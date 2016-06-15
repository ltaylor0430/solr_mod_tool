import angular from 'angular';
import {dynamicFieldsDirective} from './dynamic.directive';

// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const dynamic = angular.module('dynamic', [])
.config(function($stateProvider) {
  "use strict";
  $stateProvider.state('dynamic', {
    url: '/dynamic',
    views: {
    '' : {template: `<dynamicFields></dynamicFields>`}

    }
  })
 .state('dynamic.itemDetails',{
    url:'/index',
    views : {
    'itemDetails': {template:`<field-details>></field-details>>`}
    }


  })
  .state('dynamic.edit',{
    url:'/edit/:index',
     views : {
    'itemDetailsView':{template:`<field-details edit-mode="true"></field-details>`}
    }


  });

})
.directive('dynamicFields', dynamicFieldsDirective);

