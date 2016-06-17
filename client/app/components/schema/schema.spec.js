//import all related objects to item
import {shared} from '../../shared/shared';
import {schema} from './schema';
import uiRouter from 'angular-ui-router';
import {schemaDirective} from './schema.directive';
import  template from './schema.html';
import {SchemaController} from './schema.controller';

describe ('Schema', () => {
  let $state;
  let $scope;

  let $SchemaApi;
  let makeController;
  let API ={url: 'localhost:8080'};

  //before each test load required modules
  beforeEach(window.module(uiRouter));
  beforeEach(window.module(shared.name));
  beforeEach(window.module(schema.name));

  beforeEach(inject(_$rootScope_,$injector => {
    //get access to state , and create controller function
    //get provider.

   $scope = _$rootScope_;

   console.log($scope);
    makeController = (injectables) => {
      return new SchemaController(injectables);
    }
  }))
  describe('module',  () =>{
      it('should have an appropriate name', () => {
      expect(schema.name).to.equal('schema');
    });

  });
  describe('directive',  () =>{
      let ddo;
    beforeEach(() => {
      ddo = schemaDirective();
    });

   it('should have the right template', () => {
      expect(ddo.template).to.equal(template);
    });

    it('should have the right controller', () => {
      expect(ddo.controller).to.equal(SchemaController);
    });

    it('should have an isolate scope', () => {
      expect(ddo.scope).to.be.an('object');
    });

    it('should use controllerAs', () => {
      expect(ddo.controllerAs).to.be.a('string');
    });
  });
  describe('controller',  () =>{

     it('should load Schema from  file', ()=> {
      const controller = makeController();
      expect(controller.xmlFile).to.be.an('string');


  });


  });
  describe('template',  () =>{

  });

});
