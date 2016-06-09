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

    };

    const  removeFieldType = (fieldType, $index)  =>{
      fieldType.remove = true;
      //remove field from schema
      if (angular.isDefined(fieldType.isNew)) {
        solrTypes.splice($index,1);
      }

    };

   const  removeCopyField = (copyField,$index) => {
      copyField.remove = true;
       if (angular.isDefined(copyField.isNew)) {
        solrTypes.splice($index,1);
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

    const formatForSolr = (dest,item) =>{
      if (dest.legnth >0) {
        dest +=',';
      }
      dest+= item ;
      return dest;
    };
    //The actual json has duplicate keys which is technically invalid.  need to  massage the output to
    //allow this to happen
    //
const exportSchemaChanges = () =>{
  //TO DO:map fieldtypes
  //"add-field-type" : {
 let output = '';
 let newFieldTypes = _.chain(solrTypes).filter({'isNew': true})
  .map( (o)=>{
      o =_.omit(o,['isNew']);
      return {'add-field-type': o};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();
  $log.debug(output);
   let  removeFieldTypes = _.chain(solrTypes).filter({'remove': true})
  .map( (o)=>{
      return {'delete-field-type': {name: o.name}};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();
  let  replaceFieldTypes = _.chain(solrCopyFields).filter({'replace': true})
  .map( (o)=>{
    o =_.omit(o,['replace']);
      return {'replace-field-type': o};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();

//fields
  let newFields = _.chain(solrFields).filter({'isNew': true})
  .map( (o)=>{
      o =_.omit(o,['isNew']);
      return {'add-field': o};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();
   let  removeFields= _.chain(solrFields).filter({'remove': true})
  .map( (o)=>{
      return {'delete-field': {name: o.name}};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();
  let  replaceField = _.chain(solrFields).filter({'replace': true})
  .map( (o)=>{
    o =_.omit(o,['replace']);
      return {'replace-field': o};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();

//copy fields
   let  copyFields = _.chain(solrCopyFields).filter({'isNew': true})
  .map( (o)=>{
    o =_.omit(o,['isNew']);
      return {'add-copy-field': o};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();

   let  removeCopyFields = _.chain(solrCopyFields).filter({'remove': true})
  .map( (o)=>{
      return {'delete-copy-field': o};
  }).forEach((value)=>{
    output = formatForSolr(output,JSON.stringify(value));
  }).value();
  $log.debug('newField Types');
  $log.debug(newFieldTypes);

  //map fields

 //_.merge(schema, newFieldTypes,removeFieldTypes,replaceFieldTypes,newFields,replaceField,removeFields,copyFields,removeCopyFields);
 $log.debug(output);
 return output;
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
