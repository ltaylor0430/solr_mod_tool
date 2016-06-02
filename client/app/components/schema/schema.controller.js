
 class SchemaController {
    //TODO: Load Schema.xml

  // bind to this and not $scope
  // because of controllerAs.
    constructor($log) {
        this.solrCollectionUrl = '';
        this.solrTypes = [];
        this.solrFields = [];
        this.solrCopyFields =[];
        this.inital = {fieldName: ''};

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
      else {
        this.solrFields.push(angular.copy(fieldDef));
      }
   
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
  }
}
  export {SchemaController};

