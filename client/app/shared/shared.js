import {api} from './api';
import {schemaAPI} from './schema.api';
import angular from 'angular';
import {paramDirective} from './params/param.directive';
import {filtersDirective} from './filters/filters.directive';
import {uploadOnChangeDirective} from './uploadOnChange/upload.changeEvent.directive';
import {matRadioDirective} from './materialRadio/material.radio.directive';
import {matSelectDirective} from './materialSelect/material.select.directive';
import {deepBlurDIrective} from './deepBlur/deep-blur.directive';
export const shared = angular.module('shared', [])
  .constant('API', api)
  .factory('SchemaAPI', schemaAPI)
  .directive('params', paramDirective)
  .directive('uploadOnChange', uploadOnChangeDirective)
  .directive('matRadio',matRadioDirective)
  .directive('matSelect', matSelectDirective)
  .directive('deepBlur',deepBlurDIrective)
  .directive('filters', filtersDirective);
