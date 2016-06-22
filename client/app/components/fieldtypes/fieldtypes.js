import angular from 'angular';
import {fieldTypesDirective} from './fieldtypes.directive';
import {fieldTypeDetailsDirective} from './details/fieldtype.details.directive';
// placing an export in front of ar var is the same
// as exporting the var at the end of the file
// using export {varname}
export const fieldtypes = angular.module('solrTypes', [])
.config(($stateProvider) => {
  $stateProvider.state('fieldType', {
    url: '/types',
    abstract: true,
    views: {
      '': {template: '<field-types></field-types>'},
    },
  })
 .state('fieldType.itemDetails', {
   url: '/index',
   views: {
     'itemDetailsView': {template: '<editfieldtype></editfieldtype>'},
   },
 })
  .state('fieldType.edit', {
    url: '/edit/:id',
    views: {
      'itemDetailsView': {
        template: '<editfieldtype edit-mode="true"></editfieldtype>'},
    },
  });
})
.directive('fieldTypes', fieldTypesDirective)
.directive('editfieldtype', fieldTypeDetailsDirective);


