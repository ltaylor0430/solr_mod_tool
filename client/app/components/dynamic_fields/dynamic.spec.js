import uiRouter from 'angular-ui-router';
import {dynamic} from './dynamic';
import {shared} from '../../shared/shared';
import {dynamicFieldsDirective} from './dynamic.directive';
import template from './dynamic.html';
import {DynamicFieldsController} from './dynamic.controller';

describe('Dynamic Fields', () => {
  let $state;
  let $scope;
  let $log;
  let $q;
  let $window;
  let schemaApi;
  let makeController;
  let module = angular.mock.module;
  let sandbox;
  // step 1. before each test load required modules
  beforeEach(module(uiRouter));
  beforeEach(module(shared.name));
  beforeEach(module(dynamic.name));
// here is where we get reference to all things angular loads in step 1.
  beforeEach(inject((_$q_, _$rootScope_, _$log_, _$state_, _SchemaAPI_) => {
    $scope =    _$rootScope_;
    $state =    _$state_;
    $log =      _$log_;
    $q =        _$q_;
    schemaApi = _SchemaAPI_;

    // uses mock objects
    makeController = (_log, _state, _schema) => {
      return new DynamicFieldsController(_log, _state, _schema);
    };
  }));

  describe('module', () => {
     it('should have an appropriate name', () => {
      expect(dynamic.name).to.equal('dynamic');
    });

  });
  describe('directive', () => {
    let ddo;
    beforeEach(() => {
      ddo = dynamicFieldsDirective();
    });

    it('should have the right template', () => {
      expect(ddo.template).to.equal(template);
    });

    it('should have the right controller', () => {
      expect(ddo.controller).to.equal(DynamicFieldsController);
    });

    it('should have an isolate scope', () => {
      expect(ddo.scope).to.be.an('object');
    });

    it('should use controllerAs', () => {
      expect(ddo.controllerAs).to.be.a('string');
    });

  });
  describe('controller', () => {
    it('should edit field type', () => {

    });
    it('should add field type', () => {

    });
    it('should remove field type', () => {

    });
    it('should undo item changes', () => {

    });

  });
  describe('template', () => {
    it('should strikethrough item on remove', () => {
      // compile template and scope

    });
    it('should filter items marked new', () => {

    });
  });
});
