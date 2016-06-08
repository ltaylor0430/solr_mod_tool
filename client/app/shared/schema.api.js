import _ from 'lodash';
const schemaAPI= ($http,$log) => {
    "use strict";
    let existingSchema = {};
    let schema =  undefined;
    let solrTypes = [];
    let solrFields = [];
   let solrCopyFields =[];
   const getSolrType = () => {
    return solrTypes;
   };
      const getSolrFields = () => {
    return solrFields;
   };
      const getSolrCopyFields = () => {
    return solrCopyFields;
   };
    const getSchema = () => {
        return existingSchema;
      };
   const setSchema = (curSchema) => {
      existingSchema = curSchema;
   };
  const addFieldType = (fieldType) => {
     fieldType.isNew = true;
     solrTypes.push(angular.copy(fieldType));
      //clear
      fieldType = {};
    };
        //add  Field
    const addField = (field)  =>{
     field.isNew = true;
     solrFields.push(angular.copy(field));
      //clear
      field = {};
    };

     //add Copy Field
    const addCopyField = (cpField)  =>{
     cpField.isNew = true;
     solrCopyFields.push(angular.copy(cpField));
      //clear
      cpField = {};
    };

   //Remove fields
    const removeField = (fieldDef, $index)  =>{
      fieldDef.remove = true;
      //remove field from schema
        $log.debug(fieldDef);
      if (angular.isDefined(fieldDef.isNew)) {
         solrFields.splice($index,1);
      }
    /*  else {
        this.solrFields.push(angular.copy(fieldDef));
      }
}
*/
    };

    const  removeFieldType = (fieldType, $index)  =>{
      fieldType.remove = true;
      //remove field from schema
      if (angular.isDefined(fieldType.isNew)) {
        solrTypes.splice($index,1);
      }
      else {
        solrTypes.push(angular.copy(fieldType));
      }
    };

   const  removeCopyField = (copyField,$index) => {
      copyField.remove = true;
       if (angular.isDefined(copyField.isNew)) {
        solrTypes.splice($index,1);
      }
      else {
      //remove field from schema
      solrCopyFields.push(angular.copy(copyField));
      }
    };
   const importConfiguration= (collectionApi) => {
        return $http.jsonp(`${collectionApi}/schema?wt=json&json.wrf=JSON_CALLBACK&callback=JSON_CALLBACK`)
        .then(({data}) => {
           setSchema(data.schema);
           return getSchema();
        });
    };


   const importFromServer = (solrCollectionUrl) => {
            $log.debug('importing schema');
            return importConfiguration(solrCollectionUrl).then(() => {
            $log.debug(existingSchema);
            solrFields = _.concat(solrFields,angular.copy(existingSchema.fields));
            $log.debug(solrFields);
            solrTypes = _.concat(solrTypes,angular.copy(existingSchema.fieldTypes));
            solrCopyFields = _.concat(solrCopyFields,angular.copy(existingSchema.copyFields));



      });
    };
const exportSchemaChanges = () =>{
  //TO DO:map fieldtypes
  //map fields
  schema = {};
};
  return {getSchema,
              setSchema,
              solrTypes:getSolrType,
              solrFields:getSolrFields,
              solrCopyFields:getSolrCopyFields,
              addField,
              addFieldType,
              addCopyField,
              removeField,
              removeFieldType,
              removeCopyField,
              exportSchemaChanges,
              importFromServer};
  };

//for minification
 schemaAPI.$inject = ['$http','$log'];
export {schemaAPI};
