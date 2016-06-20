//import all related objects to item
import {shared} from '../../shared/shared';
import {schema} from './schema';
import uiRouter from 'angular-ui-router';
import {schemaDirective} from './schema.directive';
import  template from './schema.html';
import {SchemaController} from './schema.controller';
import {SchemaAPI} from '../../shared/schema.api';

describe ('Schema', () => {
  let $state;
  let $scope;
  let $log;
 let $q;
  let  schemaApi;
  let makeController;
  let module = angular.mock.module;
  let API ={url: 'localhost:8080'};

  //before each test load required modules

  beforeEach(module(uiRouter));
  beforeEach(module(shared.name));
  beforeEach(module(schema.name));


  beforeEach(inject((_$q_,_$rootScope_, _$log_,_$state_,_SchemaAPI_) => {
    //get access to state , and create controller function
    //get provider.
    $scope =_$rootScope_;
    $state = _$state_;
    $log = _$log_;
    $q = _$q_;
    schemaApi = _SchemaAPI_;

    //uses mock objects
    makeController = (_scope,_log,_state,_schema) => {
      return new SchemaController(_scope,_log,_state,_schema);
    }
  }));

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
    let log =angular.mock.$LogProvider;

    it ('should have SchemaController', ()=> {

      const controller = makeController($scope,$log,$state,schemaApi);
      expect(controller).to.be.defined;


     });

     it ('should import Schema', ()=> {

      let jsonData = `name":"example","version":"1.5","fields":[{"name":"_version_","type":"long","indexed":"true","stored":"true"}],
      "types":{"fieldType":[{"name":"string","class":"solr.StrField","sortMissingLast":"true"}],"copyField":[{"dest":"TC_0Y0_FTS","source":"TC_0Y0_*"}]`;


      let stub = sinon.stub(schemaApi,'importFromServer', () => {
         let deferred = $q.defer();
        deferred.resolve(jsonData);
        // We have to call apply for this to work
                $scope.$apply();
          console.log(deferred);
          return deferred.promise;
      });
/*
    sinon.stub(schemaApi,"solrTypes").returns(['test']);
    sinon.stub(schemaApi,"solrFields").returns(['test']);
    sinon.stub(schemaApi,"solrCopyFields").returns(['test']);
*/
     const controller = makeController($scope,$log,$state,schemaApi);
     controller.xmlFile ='foo.xml';
      controller.importSchema();
      console.log(controller.solrTypes);
      expect(controller.imported).to.be.true;
      expect(controller.solrTypes).to.have.length.above(1);
      expect(controller.solrFields).to.have.length.above(1);
      expect(controller.solrCopyFields).to.have.length.above(1);


     });



  });
  describe('template',  () =>{

  });

});
