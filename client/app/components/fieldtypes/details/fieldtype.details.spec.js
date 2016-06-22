import uiRouter from 'angular-ui-router';
import _ from 'lodash';
import {fieldtypes} from '../fieldtypes';
import {shared} from '../../../shared/shared';
import {fieldTypeDetailsDirective} from './fieldtype.details.directive';
import template from './fieldtype.details.html';
import {FieldTypeDetailsController} from './fieldtype.details.controller';

describe('Field Type Details', () => {
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
  beforeEach(module(fieldtypes.name));
// here is where we get reference to all things angular loads in step 1.
  beforeEach(inject((_$q_, _$rootScope_, _$log_, _$state_, _SchemaAPI_, _$window_) => {
    $scope =    _$rootScope_;
    $state =    _$state_;
    $log =      _$log_;
    $q =        _$q_;
    schemaApi = _SchemaAPI_;

    // uses mock objects
    makeController = (_scope, _log, _state, _schema, _window) => {
      return new FieldTypeDetailsController(_scope,_log, _state, _schema, _window);
    };
  }));

  describe('module', () => {
     it('should have an appropriate name', () => {
      expect(fieldtypes.name).to.equal('solrTypes');
    });

  });
  describe('directive', () => {
    let ddo;
    beforeEach(() => {
      ddo = fieldTypeDetailsDirective();
    });

    it('should have the right template', () => {
      expect(ddo.template).to.equal(template);
    });

    it('should have the right controller', () => {
      expect(ddo.controller).to.equal(FieldTypeDetailsController);
    });

    it('should have an isolate scope', () => {
      expect(ddo.scope).to.be.an('object');
    });

    it('should use controllerAs', () => {
      expect(ddo.controllerAs).to.be.a('string');
    });

  });
  describe('controller', () => {
     beforeEach(() => {
      // create sandbox to restore changes after test
      sandbox = sinon.sandbox.create();
    });
     beforeEach(() => {
       //create a mock schema
      const schema = sandbox.mock({
                                  fieldTypes: [],
                                  fields: [],
                                  dynamicFields: [],
                                  copyFields: []
                                });
      schemaApi.setSchema(schema.object);


     });
    afterEach(() => {
      sandbox.restore();
    });
    it('should be in edit mode', () => {


       let model = {name: 'test',
                         uniqueID:'test_1',
                         class: 'solr.textfield',
                         analyzer: {
                                tokenizer:{name:'Moolah'},
                                filters: [ {name:'Run'}]
                                },
                          random: 'random'
                   };
        sandbox.stub(schemaApi, 'solrTypes').returns(model);

        const controller = makeController($scope, $log, $state, schemaApi);
        controller.editMode =true;
        $state.params.id ='test_1';

        controller.init();
        expect(controller.fieldType).to.have.all.keys('name','class',);
        expect (controller.tokenizerType).to.equal('indexquery');
        expect (controller.tokenizer.name).to.equal(model[0].analyzer.tokenizer.name);
        expect (controller.filters).to.eql(model[0].analyzer.filters);

    });

    it('should reset type', () => {
       let model = {name: 'test',
                         uniqueID:'test_1',
                         class: 'solr.textfield',
                         analyzer: {
                                tokenizer:{name:'Moolah'},
                                filters: [ {name:'Run'}]
                                },
                          random: 'random'
                   };

        sandbox.stub(schemaApi, 'solrTypes').returns(model);
        const controller = makeController($scope, $log, $state, schemaApi);
       $state.params.id ='test_1';
        controller.editMode =true;
        controller.fieldType.name ='OhNo!';
        controller.reset();
        expect(controller.fieldType.name).to.equal('test');

    });

    it('should cancel changes', () => {
          const controller = makeController($scope, $log, $state, schemaApi);
        $state.go('fieldType.edit');
        $scope.$apply();
        let spy = sandbox.spy($state,'go');
       controller.cancel();
        assert($state.go.calledOnce, "method was not call or called too many times");


    });
    describe('saving Changes', () => {
      let model;
      beforeEach(() => {
            sandbox.mock(schemaApi,'getSchema');
            model = {name: 'test',
                         uniqueID:'test_1',
                         class: 'solr.textfield',
                         analyzer: {
                                tokenizer:{name:'Moolah'},
                                filters: [ {name:'Run'}]
                                },
                          random: 'random'
                   };
      });
       it('should save change', () => {

       //add field
        schemaApi.getSchema().fieldTypes.push(model);
        let mySpy = sandbox.spy(schemaApi,'replaceFieldType');
        let spy = sandbox.spy($state,'go');
        const controller = makeController($scope, $log, $state, schemaApi);
        $state.go('fieldType.edit',{id:'test_1'});

         $scope.$apply();
        controller.editMode = true;
        controller.init();
       controller.save();
       let modifications =  _.filter(schemaApi.solrTypes(), (o) => {
       return angular.isDefined(o.operation);
      });

       assert(schemaApi.replaceFieldType.calledOnce);
       expect(schemaApi.getSchema().fieldTypes).to.have.lengthOf(2);
       expect(modifications).to.have.lengthOf(1);
       let output = schemaApi.exportSchemaChanges();

       expect(output).to.match(/\s?replace-field-type\s?/g);



    });

    it('should not save duplicate changes', () => {
        let spy = sandbox.spy($state,'go');
        let mySpy = sandbox.spy(schemaApi,'addFieldType');
        let windowSpy = sandbox.stub($window);
        const controller = makeController($scope, $log, $state, schemaApi,windowSpy);


       $state.go('fieldType.itemDetails',{id:'test_1'});
       $scope.$apply();
       controller.fieldType = model;
       controller.save();
       expect(controller.save).to.throw(Error);
       let output = schemaApi.exportSchemaChanges();
       let matches = (output.match(/\s?add-field-type\s?/g) || [] ).length;
       expect(matches).to.eql(1);
       expect(schemaApi.getSchema().fieldTypes).to.have.lengthOf(1);

    });
    });


  });
  describe('template', () => {

  });
});
