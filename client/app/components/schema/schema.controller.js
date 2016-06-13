import _ from 'lodash';
 class SchemaController {
    //TODO: Load Schema.xml

  // bind to this and not $scope
  // because of controllerAs.
    constructor($log,$state,API, SchemaAPI) {
        this.solrCollectionUrl = 'http://solr1:8983/solr/gateway_collection';
        this.schema =  undefined;
        this.isAddNewFieldType = false;
        this.fileName ='foo.html';
        this.inital = {fieldName: ''};
        this.SchemaAPI = SchemaAPI;
        this.formAction = API.url + '/parseXML';
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

 this.removeCopyField = function(copyField,$index) {
        this.SchemaAPI.removeCopyField(copyField, $index);
    };
  this.export = () =>{
    this.schemaChanges = this.SchemaAPI.exportSchemaChanges();
  };

  this.loadFromFile = (formEvent) => {
    this.xmlFile = formEvent.target[0].files[0];
    this.SchemaAPI.importFromFile(this.xmlFile).then(()=>{
             this.imported = true;
           $log.debug(SchemaAPI.solrTypes());
            this.solrTypes = SchemaAPI.solrTypes();
            this.solrFields = SchemaAPI.solrFields();
           this.solrCopyFields =SchemaAPI.solrCopyFields();
           this.saveToLocalStorage();
      });
  };

  this.retrieveFromLocalStorage = () => {
   let currentSchema =  localStorage.getItem('schema');
   $log.debug(currentSchema);
   SchemaAPI.setSchema(JSON.parse(currentSchema));

  };

  this.importSchema = () => {
      this.SchemaAPI.importFromServer(this.solrCollectionUrl).then(()=>{
             this.imported = true;
           $log.debug(SchemaAPI.solrTypes());
            this.solrTypes = SchemaAPI.solrTypes();
            this.solrFields = SchemaAPI.solrFields();
           this.solrCopyFields =SchemaAPI.solrCopyFields();
           this.saveToLocalStorage();
      });

    };


 this.retrieveFromLocalStorage();
  }

}

  export {SchemaController};

