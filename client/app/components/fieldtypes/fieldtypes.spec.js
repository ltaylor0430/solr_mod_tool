import uiRouter from 'angular-ui-router';
import {fieldtypes} from './fieldtypes';
import {shared} from '../../shared/shared';
import {fieldTypesDirective} from './fieldtypes.directive';
import template from './fieldtypes.html';
import {FieldTypesController} from './fieldtypes.controller';

describe('FieldTypes', () => {
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
    makeController = (_log, _state, _schema) => {
      return new FieldTypesController(_log, _state, _schema);
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
      ddo = fieldTypesDirective();
    });

    it('should have the right template', () => {
      expect(ddo.template).to.equal(template);
    });

    it('should have the right controller', () => {
      expect(ddo.controller).to.equal(FieldTypesController);
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
     });
    afterEach(() => {
      sandbox.restore();
    });
    it('should edit field type', () => {

        let spy = sandbox.spy($state,'go');
        let item =  sandbox.mock({uniqueID:'boom_1'});
        const controller = makeController( $log, $state, schemaApi);
        controller.editType(item);
        assert($state.go.calledOnce, "method was not call or called too many times");
        // we change state, need to run a digest cycle
        $scope.$apply();
        expect($state.current).to.have.property('name').and.to.equal('fieldType.edit');


    });
    it('should add field type', () => {
         sandbox.stub($state,'go');

       const controller = makeController( $log, $state, schemaApi);
       controller.fieldType = {name:'fooBar'};
       controller.addFieldType();
       expect(schemaApi.solrTypes()).to.have.lengthOf(1);
       expect(schemaApi.solrTypes()[0]).to.have.property('name').and.to.equal('fooBar');
        expect(schemaApi.solrTypes()[0]).to.have.property('operation').and.to.equal('new');
    });
    it('should remove  field type', () => {
        let spy = sandbox.spy($state,'go');

        const controller = makeController( $log, $state, schemaApi);

        schemaApi.solrTypes().push( {name:'foo', uniqueID: 'foo_1'});
        expect(schemaApi.solrTypes()).to.have.lengthOf(1);
        controller.removeFieldType(schemaApi.solrTypes()[0],0);
        expect(schemaApi.solrTypes()[0]).to.have.property('operation').and.to.equal('remove');


    });
    it('should delete new field type', () => {
        let spy = sandbox.spy($state,'go');

        const controller = makeController( $log, $state, schemaApi);
        schemaApi.solrTypes().push( {name:'foo', operation:'new'});
        controller.removeFieldType(schemaApi.solrTypes()[0],0);
        expect(schemaApi.solrTypes()).to.have.lengthOf(0);

    });
    it('should undo item changes', () => {
        const controller = makeController( $log, $state, schemaApi);
        sandbox.stub(schemaApi, 'getSelectedItemByIndex').returns(0);
        schemaApi.solrTypes().push( {name:'foo', uniqueID:'foo_1', operation:'replace'});
        expect(schemaApi.solrTypes()).to.have.lengthOf(1);
        controller.undoItemChanges(schemaApi.solrTypes()[0],0);
        expect(schemaApi.solrTypes()[0]).to.not.have.property('operation');
       expect(schemaApi.getSchema().fieldTypes[0]).to.not.have.property('operation');
    });

   it('should replace item', () => {
        const controller = makeController( $log, $state, schemaApi);
        schemaApi.solrTypes().push( {name:'foo', operation:'new'});
        controller.removeFieldType(schemaApi.solrTypes()[0]);
        expect(schemaApi.solrTypes()).to.have.lengthOf(0);
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
