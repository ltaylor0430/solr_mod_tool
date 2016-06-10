import _ from 'lodash';
 class SchemaController {
    //TODO: Load Schema.xml

  // bind to this and not $scope
  // because of controllerAs.
    constructor($log,$state, SchemaAPI) {
        this.solrCollectionUrl = 'http://solr1:8983/solr/gateway_collection';
        this.schema =  undefined;
        this.isAddNewFieldType = false;
        this.inital = {fieldName: ''};
        this.SchemaAPI = SchemaAPI;
        this.imported = false;
        this.hasNew = () => {
            return (this.isAddNewFieldType ? '!!' : '!');
        };
    //add Field
     this.addField = function(fieldDef) {
      this.SchemaAPI.addField(fieldDef);
      };
    //add Field Type
    this.newFieldType = () => {
      if (!$state.is("schema.addFieldType")){
      $state.go('.addFieldType');
    } else {
      $state.go('^');
    }
    };

    this.addParam = () => {
      $log.debug('wrong param function');
    };
   this.addFieldType = function(fieldType) {
       this.SchemaAPI.addFieldType(fieldType);

    };
     //add Copy Field
   this.addCopyField = function(cpField) {
      this.SchemaAPI.addCopyField(cpField);
      this.reset();
    };
   //Remove fields
    this.removeField = function(fieldDef, $index) {
       this.SchemaAPI.removeField(fieldDef, $index);

    /*  else {
        this.solrFields.push(angular.copy(fieldDef));
      }
*/
    };
 this.removeFieldType = function(fieldType, $index) {
     this.SchemaAPI.removeFieldType(fieldType, $index);
    };
 this.removeCopyField = function(copyField,$index) {
        this.SchemaAPI.removeCopyField(copyField, $index);
    };
  this.export = () =>{
    this.schemaChanges = this.SchemaAPI.exportSchemaChanges();
  };
  this.importSchema = () => {
      this.SchemaAPI.importFromServer(this.solrCollectionUrl).then(()=>{
             this.imported = true;
           $log.debug(SchemaAPI.solrTypes());
            this.solrTypes = SchemaAPI.solrTypes();
            this.solrFields = SchemaAPI.solrFields();
           this.solrCopyFields =SchemaAPI.solrCopyFields();
      });

    };



  }
}
  export {SchemaController};

