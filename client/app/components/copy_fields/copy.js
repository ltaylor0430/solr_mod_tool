import angular from 'angular';
import {copyDirective} from './copy.directive';
import {copyDetailsDirective} from './details/copy.details.directive';

// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const solrCopyFields = angular.module('solrCopyFields', [])
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('copy', {
    url: '/copy',
    abstract: true,
    views: {
    '' : {template: `<copy-fields></copy-fields>`}

    },
  })
 .state('copy.itemDetails', {
   url:'/index',
   views: {
     'itemDetailsView': {template:`<copy-details></copy-details>`},
   },
 })
  .state('copy.edit', {
    url:'/edit/:index',
    views: {
    'itemDetailsView':{template:`<copy-details edit-mode="true"></copy-details>`},
    },

  });
})
.directive('copyFields', copyDirective)
.directive('copyDetails', copyDetailsDirective);

