import uiRouter from 'angular-ui-router';
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
  beforeEach(inject((_$q_, _$rootScope_, _$log_, _$state_, _SchemaAPI_) => {
    $scope =    _$rootScope_;
    $state =    _$state_;
    $log =      _$log_;
    $q =        _$q_;
    schemaApi = _SchemaAPI_;

    // uses mock objects
    makeController = (_scope, _log, _state, _schema) => {
      return new FieldTypeDetailsController(_scope,_log, _state, _schema);
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
      let schema = sandbox.mock({
                                  fieldTypes: [],
                                  fields: [],
                                  dynamicFields: [],
                                  copyFields: []
                                });
      schemaApi.setSchema(schema.object);
      console.log(schemaApi.getSchema().fieldTypes);
     });
    afterEach(() => {
      sandbox.restore();
    });
    it('should be in edit mode', () => {


       let model = [{name: 'test',
                            class: 'solr.textfield',
                            analyzer: {
                                              tokenizer:{name:'Moolah'},
                                              filters: [ {name:'Run'}]
                                            },
                            random: 'random'
                          }];
        sandbox.stub(schemaApi, 'solrTypes').returns(model);

        const controller = makeController($scope, $log, $state, schemaApi);
        controller.editMode =true;
        $state.params.index =0;

        controller.init();
        expect(controller.fieldType).to.have.all.keys('name','class',);
        expect (controller.tokenizerType).to.equal('indexquery');
        expect (controller.tokenizer.name).to.equal(model[0].analyzer.tokenizer.name);
        expect (controller.filters).to.eql(model[0].analyzer.filters);

    });

    it('should reset type', () => {
       let model = [{name: 'test',
                      class: 'solr.textfield',
                      analyzer: {
                                        tokenizer:{name:'Moolah'},
                                        filters: [ {name:'Run'}]
                                      },
                      random: 'random'
                    }];

        sandbox.stub(schemaApi, 'solrTypes').returns(model);
        const controller = makeController($scope, $log, $state, schemaApi);
       $state.params.index =0;
        controller.editMode =true;
        controller.fieldType.name ='OhNo!';
        controller.reset();
        expect(controller.fieldType.name).to.equal('test');

    });
    it('should save changes', () => {
        let model = [{name: 'test',
                      class: 'solr.textfield',
                      analyzer: {
                                        tokenizer:{name:'Moolah'},
                                        filters: [ {name:'Run'}]
                                      },
                      random: 'random'
                    }];
          const controller = makeController($scope, $log, $state, schemaApi);
        $state.go('fieldType.edit');
        $scope.$apply();
        let spy = sandbox.spy($state,'go');
       controller.save();
        assert($state.go.calledOnce, "method was not call or called too many times");


    });
    it('should not save duplicate changes', () => {
          const controller = makeController($scope, $log, $state, schemaApi);
        $state.go('fieldType.edit');
        $scope.$apply();
        let spy = sandbox.spy($state,'go');
       controller.cancel();
        assert($state.go.calledOnce, "method was not call or called too many times");


    });
    it('should cancel changes', () => {
          const controller = makeController($scope, $log, $state, schemaApi);
        $state.go('fieldType.edit');
        $scope.$apply();
        let spy = sandbox.spy($state,'go');
       controller.cancel();
        assert($state.go.calledOnce, "method was not call or called too many times");


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
