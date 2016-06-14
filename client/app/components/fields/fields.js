import angular from 'angular';
import {fieldsDirective} from './fields.directive';
import {fieldsDetailsDirective} from './details/field.details.directive';

 // placing an export in front of ar var is the same

// as exporting the var at the end of the file
// using export {varname}
export const fields = angular.module('fields', [])
.config(function($stateProvider, $urlRouterProvider) {
  "use strict";
  $stateProvider.state('fields', {
    url: '/fields',
    views: {
    '' : {template: `<fields></fields>`}

    }
  })
 .state('fields.itemDetails',{
    url:'/index',
    views : {
    'itemDetailsView': {template:`<field-details></field-details>`}
    }


  })
  .state('fields.edit',{
    url:'/edit/:index',
    views : {
    'itemDetailsView':{template:`<field-details edit-mode="true"></field-details>`}
    }


  });

})
.directive('fields', fieldsDirective)
.directive('fieldDetails', fieldsDetailsDirective);

