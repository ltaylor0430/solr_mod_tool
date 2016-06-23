import {AnalyzerController} from './analyzer.controller';
import {analyzerDirective} from './analyzer.directive';
import {shared} from '../shared';
import  template from './analyzer.html';
import uiRouter from 'angular-ui-router';

describe('Analyzer', () => {
  let module = angular.mock.module;
  beforeEach(module(uiRouter));
  beforeEach(module(shared.name));

  beforeEach(() => {

  });
  describe('Module', () => {

  });
  describe('Directive', () => {
    let ddo;
    beforeEach(() => {
      ddo = analyzerDirective();
    });

    it('should have the right template', () => {
      expect(template).to.not.be.undefined;
      expect(ddo.template).to.equal(template);
    });

    it('should have the right controller', () => {
      expect(ddo.controller).to.equal(AnalyzerController);
    });

    it('should have an isolate scope', () => {
      expect(ddo.scope).to.be.an('object');
    });

    it('should use controllerAs', () => {
      expect(ddo.controllerAs).to.be.a('string');
    });
  });

  describe('Controller', () => {

  });

  describe('Template', () => {

  });
});
