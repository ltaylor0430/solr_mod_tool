import _ from 'lodash';
const schemaAPI= ($http,$log, API) => {
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
  
  const loadXmlFile = (formData) => {
    let config = {
      headers:{ 'Content-Type': undefined},
      transformRequest : (data,headersGetter) => {
        let formData = new FormData();
        angular.forEach(data, (value,key) => {
                            formData.append(key, value);
                        });

                        var headers = headersGetter();
                      //  delete headers['Content-Type'];

                        return formData;
      }
    };
    var fd = {xmlschema: formData};
    $log.debug('form data: ');
    $log.debug(fd);
    return $http.post('/build/parseXML/',fd,config).then(({data}) => {
      $log.debug(data);
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
 const importFromFile = (formFile) => {
            $log.debug('importing schema');
            return loadXmlFile(formFile).then(() => {
                $log.debug(existingSchema);
                solrFields = _.concat(solrFields,angular.copy(existingSchema.field));
                $log.debug(solrFields);
                solrTypes = _.concat(solrTypes,angular.copy(existingSchema.fieldType));
                solrCopyFields = _.concat(solrCopyFields,angular.copy(existingSchema.copyField));
      });
    };

    const formatForSolr = (dest,item) =>{
      if (dest.legnth >0) {
        dest +=',';
      }
      dest+= item ;
      return dest;
    };
    const getOutput = (command,output,key,_array) =>{
      _.chain(_array).filter({[key]: true})
          .map( (o)=>{
              o =_.omit(o,[key]);
              if (command ==='delete-field-type') {
                  return {[command]: {name: o.name}};
              } else {
                $log.debug(o);
                  return {[command]: o};
            }
          }).forEach((value)=>{
            output = formatForSolr(output,JSON.stringify(value));
          }).value();
          $log.debug(output);
            return output;
    };
    //The actual json has duplicate keys which is technically invalid.  need to  massage the output to
    //allow this to happen
    //
const exportSchemaChanges = () =>{

     let output = '';
     let typeCommands = [{command: 'add-field-type',  key:'isNew'},
                                         {command: 'delete-field-type',  key:'remove'},
                                         {command:'replace-field-type',  key:'replace'}];
     let fieldCommands = [{command: 'add-field',  key:'isNew'},
                                         {command: 'delete-field',  key:'remove'},
                                         {command:'replace-field',  key:'replace'}];

    let copyCommands = [{command: 'add-copy-field',  key:'isNew'},
                                         {command: 'delete-copy-field',  key:'remove'}];


    _.each(typeCommands, (c) => {
      output = getOutput(c.command,output,c.key,solrTypes);
    });

    //fields
     _.each(fieldCommands, (c) => {
      output = getOutput(c.command,output,c.key,solrFields);
    });
     _.each(copyCommands, (c) => {
      output = getOutput(c.command,output,c.key,solrCopyFields);
    });

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
              importFromServer,
              importFromFile};
  };

//for minification
 schemaAPI.$inject = ['$http','$log'];
export {schemaAPI};
