import _ from 'lodash';
 class SchemaController {
    //TODO: Load Schema.xml

  // bind to this and not $scope
  // because of controllerAs.
    constructor($log, SchemaLoader) {
        this.solrCollectionUrl = 'http://solr1:8983/solr/gateway_collection';
        this.schema =  undefined;
        this.solrTypes = [];
        this.solrFields = [];
        this.solrCopyFields =[];
        this.inital = {fieldName: ''};
        this.SchemaLoader = SchemaLoader;
        this.imported = false;
    //add Field
     this.addField = function(fieldDef) {
       fieldDef.isNew = true;
       this.solrFields.push(angular.copy(fieldDef));
        //clear
      $log.debug(this.solrFields);
        fieldDef =    angular.copy(this.inital);
      };
    //add Field Type
   this.addFieldType = function(fieldType) {
     fieldType.isNew = true;
     this.solrTypes.push(angular.copy(fieldType));
      //clear
      fieldType =   angular.copy(this.inital);
    };
     //add Copy Field
   this.addCopyField = function(cpField) {
     cpField.isNew = true;
     this.solrCopyFields.push(angular.copy(cpField));
      //clear
      cpField =  angular.copy(this.inital);
    };
   //Remove fields
    this.removeField = function(fieldDef, $index) {
      fieldDef.remove = true;
      //remove field from schema
        $log.debug(fieldDef);
      if (angular.isDefined(fieldDef.isNew)) {
        this.solrFields.splice($index,1);
      }
    /*  else {
        this.solrFields.push(angular.copy(fieldDef));
      }
*/
    };
 this.removeFieldType = function(fieldType, $index) {
      fieldType.remove = true;
      //remove field from schema
      if (angular.isDefined(fieldType.isNew)) {
        this.solrTypes.splice($index,1);
      }
      else {

        this.solrTypes.push(angular.copy(fieldType));
      }
    };
   this.removeCopyField = function(copyField,$index) {
      copyField.remove = true;
       if (angular.isDefined(copyField.isNew)) {
        this.solrTypes.splice($index,1);
      }
      else {
      //remove field from schema
      this.solrCopyFields.push(angular.copy(copyField));
      }
    };
    this.importSchema = () => {
        if(this.imported === false) {
            $log.debug('importing schema');
            this.SchemaLoader.importConfiguration(this.solrCollectionUrl).then(() => {
            this.schema = this.SchemaLoader.getSchema();
            this.imported = true;
            $log.debug(this.schema);
            this.solrFields = _.concat(this.solrFields,angular.copy(this.schema.fields));
            this.solrTypes = _.concat(this.solrTypes,angular.copy(this.schema.fieldTypes));
            this.solrCopyFields = _.concat(this.solrCopyFields,angular.copy(this.schema.copyFields));



      });
      }
    };
  }
}
  export {SchemaController};

