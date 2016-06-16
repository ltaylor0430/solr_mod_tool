import angular from 'angular';
import {dynamicFieldsDirective} from './dynamic.directive';
import {dynamicDetailsDirective} from './details/dynamic.details.directive';

// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const dynamic = angular.module('dynamic', [])
.config(function($stateProvider) {
  "use strict";
  $stateProvider.state('dynamic', {
    url: '/dynamic',
    views: {
    '' : {template: `<dynamic-fields></dynamic-fields>`}

    }
  })
 .state('dynamic.itemDetails',{
    url:'/index',
    views : {
    'itemDetailsView': {template:`<dynamic-details></dynamic-details>`}
    }


  })
  .state('dynamic.edit',{
    url:'/edit/:index',
     views : {
    'itemDetailsView':{template:`<dynamic-details edit-mode="true"></dynamic-details>`}
    }


  });

})
.directive('dynamicFields', dynamicFieldsDirective)
.directive('dynamicDetails', dynamicDetailsDirective);


