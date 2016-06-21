// import all related objects to item
import {shared} from '../../shared/shared';
import {schema} from './schema';
import uiRouter from 'angular-ui-router';
import {schemaDirective} from './schema.directive';
import template from './schema.html';
import {SchemaController} from './schema.controller';

describe('Schema', () => {
  let $state;
  let $scope;
  let $log;
  let $q;
  let $window;
  let  schemaApi;
  let makeController;
  let module = angular.mock.module;
  let sandbox;
  // step 1. before each test load required modules
  beforeEach(module(uiRouter));
  beforeEach(module(shared.name));
  beforeEach(module(schema.name));

   // here is where we get reference to all things angular loads in step 1.
  beforeEach(inject((_$q_, _$rootScope_, _$log_, _$state_, _SchemaAPI_) => {
    // get access to state , and create controller function
    // get provider.
    $scope =    _$rootScope_;
    $state =    _$state_;
    $log =      _$log_;
    $q =        _$q_;
    schemaApi = _SchemaAPI_;


    // uses mock objects
    makeController = (_scope, _log, _state, _schema) => {
      return new SchemaController(_scope, _log, _state, _schema);
    };
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
    beforeEach(() => {
      // create sandbox to restore changes after test
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should have SchemaController', ()=> {
      const controller = makeController($scope, $log, $state, schemaApi);
      expect(controller).to.be.defined;
    });

    it('should import Schema', ()=> {
      let jsonData = `name":"example","version":"1.5","fields":
          [{"name":"_version_","type":"long","indexed":"true","stored":"true"}],
          "types":{"fieldType":[{"name":"string","class":"solr.StrField",
          "sortMissingLast":"true"}],
          "copyField":[{"dest":"TC_0Y0_FTS","source":"TC_0Y0_*"}]`;
      sandbox.stub(schemaApi, 'importFromServer', () => {
        let deferred = $q.defer();
        deferred.resolve(jsonData);
        return deferred.promise;
      });

      sandbox.stub(schemaApi, 'solrTypes').returns(['test']);
      sandbox.stub(schemaApi, 'solrFields').returns(['test']);
      sandbox.stub(schemaApi, 'solrCopyFields').returns(['test']);

      const controller = makeController($scope, $log, $state, schemaApi);
      controller.xmlFile = 'foo.xml';
      controller.importSchema();
      // We have to call apply for this to work
      $scope.$apply();

      expect(controller.imported).to.be.true;
      expect(controller.solrTypes).to.have.lengthOf(1);
      expect(controller.solrFields).to.have.lengthOf(1);
      expect(controller.solrCopyFields).to.have.lengthOf(1);
    });

    it('should be initalized', () => {
      const controller = makeController($scope, $log, $state, schemaApi);
      controller.init();
      expect(controller.loaded).to.be.true;
    });
    it('should call export', () => {
      let exportChanges = sandbox.spy(schemaApi,'exportSchemaChanges');
      const controller = makeController($scope, $log, $state, schemaApi);
      controller.export();
      exportChanges.should.have.been.calledOnce;
    });

    describe('should access local Storage', function() {
        let tmpStorage = window.localStorage;
        beforeEach(() => {
          // This is basically a hack to mock localStorage which
          // is readonly, after we are done testing we set it
          // back
          window.__defineGetter__('localStorage', function () {
             return {getItem:()=>JSON.stringify({test:0})};
              // you could also return some other object here as a mock
          });

        });
        afterEach(() => {
          // restore old getter to actual local storage
          window.__defineGetter__('localStorage',
                    function () { return tmpStorage });
                  });
      it('should check local storage for saved data', () => {
      const controller = makeController($scope, $log, $state, schemaApi);
       // stub property for feature detection to use localStorage
       // // replace local storage

      let stub = sandbox.stub(window.localStorage, "getItem");
      // You can use this in your assertions
      controller.retrieveFromLocalStorage();
      expect(schemaApi.getSchema()).to.have.property('test')
         .and.to.eql(0);
    });
      });

  });

  describe('template',  () =>{
    it('should call init', () => {
       // console.log(template);
        expect(template).to.match(/\s?vm.init\s?/g)
    });


  });
});
