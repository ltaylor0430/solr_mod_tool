import {api} from './api';
import {schemaAPI} from './schema.api';
import angular from 'angular';
import {paramDirective} from './params/param.directive';
import {filtersDirective} from './filters/filters.directive';
import {uploadOnChangeDirective} from './uploadOnChange/upload.changeEvent.directive';
import {matRadioDirective} from './materialRadio/material.radio.directive';
import {matSelectDirective} from './materialSelect/material.select.directive';
import {analyzerDirective} from './analyzer/analyzer.directive';
export const shared = angular.module('shared', [])
  .constant('API', api)
  .factory('SchemaAPI', schemaAPI)
  .directive('params', paramDirective)
  .directive('analyzer', analyzerDirective)
  .directive('uploadOnChange', uploadOnChangeDirective)
  .directive('matRadio',matRadioDirective)
  .directive('matSelect', matSelectDirective)
  .directive('filters', filtersDirective);
