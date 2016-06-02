import {api} from './api';
import {schemaLoader} from './schema.loader';
import angular from 'angular';

export const shared = angular.module('shared', [])
  .constant('API', api)
  .factory('SchemaLoader', schemaLoader);
