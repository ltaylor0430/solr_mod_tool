import {api} from './api';
import {schemaAPI} from './schema.api';
import angular from 'angular';
import {paramDirective} from './params/param.directive';
import {filtersDirective} from './filters/filters.directive';
import {uploadOnChangeDirective} from './uploadOnChange/upload.changeEvent.directive';
export const shared = angular.module('shared', [])
  .constant('API', api)
  .factory('SchemaAPI', schemaAPI)
  .directive('params', paramDirective)
  .directive('uploadOnChange', uploadOnChangeDirective)
  .directive('filters', filtersDirective);
