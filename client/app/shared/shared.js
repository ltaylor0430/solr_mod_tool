import {api} from './api';
import {schemaLoader} from './schema.loader';
import angular from 'angular';
import {paramDirective} from './params/param.directive';
export const shared = angular.module('shared', [])
  .constant('API', api)
  .factory('SchemaLoader', schemaLoader)
  .directive('params', paramDirective);
