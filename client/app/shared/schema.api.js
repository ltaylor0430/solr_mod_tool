import _ from 'lodash';
const schemaAPI = ($http, $log, API) => {
  let existingSchema = {};
  let schema =  {};
  let solrTypes = [];
  let solrFields = [];
  let solrCopyFields =[];
  let solrDynamicFields = [];


  const getSolrType = () => {
    return getSchema().fieldTypes;
  };

  const getSolrFields = () => {
    return getSchema().fields;
  };

  const getSolrCopyFields = () => {
      $log.debug('solr copy fields');
      $log.debug(solrCopyFields);
    return solrCopyFields;
  };

  const getSolrDynamicFields = () => {
    return solrDynamicFields;
  };

  const getSchema = () => {
    return existingSchema;
  };

  const setSchema = (curSchema) => {
    // create unique id
    let keys = ['fieldTypes', 'dynamicFields', 'copyFields', 'fields'];
      let foo =_.chain(curSchema)
      .pick(keys)
      .map((result, key, col) => {
        _.each(col[key], (item) => {
          if (!item.uniqueID) {
             item.uniqueID = (item.name || key) + '_' +  _.uniqueId();
          }
        });
        return col[key];
      }).value();

    existingSchema = curSchema;
    schema = existingSchema;
  };

   // using local Storage to persist changes.
  const saveToLocalStorage = () => {
    localStorage.setItem('modified_schema', JSON.stringify(getSchema()));
  };

  const addFieldType = (fieldType) => {
    fieldType.operation = 'new';

    let itemExist = _.some(getSolrType(), ['name', fieldType.name]);
    if  (itemExist || fieldType.uniqueID) {
      throw new Error('Duplicate item exists');
    }
    // set unique ID
    fieldType.uniqueID =  fieldType.name  + '_' +  _.uniqueId();
    getSolrType().push(fieldType);

    // update localStorage;
    saveToLocalStorage();
  };

  const replaceFieldType = (fieldType) => {
  // check array to see if this fieldType exist and is mark for replacement.
       let filterItems = _.filter(getSolrType(), (x)=> { return angular.isDefined(x.operation);});


    let itemExist = _.some(filterItems, ['name', fieldType.name]);
    console.log(itemExist);
    if  (itemExist) {
      throw new Error('This item has uncommited changes');
    }
    fieldType.operation = 'replace';
    getSolrType().push(fieldType);
    saveToLocalStorage();
  };
    // add  Field
  const addField = (field)  =>{
    field.operation = 'new';

    let itemExist = _.some(getSolrFields(), ['name', field.name]);
    if  (itemExist) {
      throw new Error('Duplicate item exists');
    }
    solrFields.push(angular.copy(field));
    // clear
    field = {};
  };

  // add Copy Field
  const addCopyField = (cpField)  =>{
     cpField.operation = 'new';

     solrCopyFields.push(angular.copy(cpField));
     // clear
     cpField = {};
    };

   //Remove fields
    const removeField = (fieldDef, $index)  =>{
      fieldDef.operation = 'remove';
      //remove field from schema
      saveToLocalStorage();
        $log.debug(fieldDef);
      if (angular.isDefined(fieldDef.isNew)) {
         solrFields.splice($index,1);
      }

    };

  const  removeFieldType = (fieldType, $index)  =>{
    if (fieldType.operation === 'new') {
      getSolrType().splice($index, 1);
    } else {
      fieldType.operation = 'remove';
      // update
      getSolrType()[$index] = fieldType;
      // remove field from schema
      $log.debug('removing field type');
      $log.debug(getSolrType());

      $log.debug(solrTypes);
    }
    saveToLocalStorage();
  };

   const  removeCopyField = (copyField, $index) => {
       copyField.remove = true;
       if (angular.isDefined(copyField.isNew)) {
        solrCopyFields.splice($index, 1);
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
    let fd = {xmlschema: formData};
    $log.debug('form data: ');
    $log.debug(fd);
    return $http.post('/build/parseXML/',fd,config).then(({data}) => {
         //  schema.fieldTypes = _.clone(schema.types.fieldType);
             schema =  data.schema;
             //match the response to be the same as what is return from the schema api service.
            schema.fieldTypes = schema.types.fieldType;
            schema.dynamicFields = schema.fields.dynamicField;
            schema.fields = schema.fields.field;
           $log.debug('field types');
          $log.debug(schema.fieldTypes);

           setSchema(schema);
           return getSchema();
        });
  };

   const importFromServer = (solrCollectionUrl) => {
            $log.debug('importing schema');
            return importConfiguration(solrCollectionUrl).then(() => {

                $log.debug(existingSchema);
                solrFields = existingSchema.fields;
                $log.debug(solrFields);
             //   solrTypes = existingSchema.fieldTypes;
                solrCopyFields = existingSchema.copyFields;
                solrDynamicFields = existingSchema.dynamicFields;
                saveToLocalStorage();
      });
    };
 const importFromFile = (formFile) => {
            $log.debug('importing schema');
            return loadXmlFile(formFile).then(() => {
                $log.debug(existingSchema);
                solrFields = existingSchema.fields;
                $log.debug(solrFields);
           //    solrTypes = existingSchema.fieldTypes;
                solrCopyFields = existingSchema.copyFields;
                solrDynamicFields = existingSchema.dynamicFields;
                saveToLocalStorage();
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
      _.chain(_array).filter((o) => {return o.operation === key; })
          .map( (o)=>{
              o = _.omit(o, 'operation');
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

  const loadFromLocalStorage = () => {
    localStorage.getItem('modified_schema');
    let modSchema =  localStorage.getItem('modified_schema');
    if (modSchema){
      let obj_schema = JSON.parse(modSchema);

      setSchema(obj_schema);
      if (getSchema().field) {
        solrFields = getSchema().field;
      } else {
        solrFields = getSchema().fields;
      }

  /*    if(getSchema().fieldType) {
         solrTypes = getSchema().fieldType;
       } else {
         solrTypes = getSchema().fieldTypes;
       }*/
       if(getSchema().copyField) {
         solrCopyFields = getSchema().copyField;
       } else {
         solrCopyFields = getSchema().copyFields;
       }
             }
       if(getSchema().dynamicField) {
         solrDynamicFields = getSchema().dynamicField;
       } else {
         solrDynamicFields = getSchema().dynamicFields;
       }


    $log.debug(solrTypes);
  };
  const exportSchemaChanges = () => {

    let output = '';
    let typeCommands = [{command: 'add-field-type',  key: 'new'},
                        {command: 'delete-field-type',  key: 'remove'},
                        {command: 'replace-field-type',  key: 'replace'}];
    let fieldCommands = [{command: 'add-field',  key: 'operation.new'},
                         {command: 'delete-field',  key: 'operation.remove'},
                         {command: 'replace-field',  key: 'operation.replace'}];

    let copyCommands = [{command: 'add-copy-field',  key: 'operation.new'},
                        {command: 'delete-copy-field',  key: 'operation.remove'}];

    $log.debug(getSolrType());

    _.each(typeCommands, (c) => {
      $log.debug(c);
      console.log(existingSchema.fieldTypes);
      output = getOutput(c.command, output, c.key, getSolrType());
    });

     // fields
    _.each(fieldCommands, (c) => {
      output = getOutput(c.command, output, c.key, solrFields);
    });
    _.each(copyCommands, (c) => {
      output = getOutput(c.command, output, c.key, solrCopyFields);
    });

    $log.debug(output);
    return output;
  };

  const getSelectedType = (itemId) => {

    let myTypes = getSolrType();
    let output = _.filter(myTypes, (x)=> {
      console.log(x.uniqueID);
      return (x.uniqueID || '') == itemId;
    });
    return output[0];
//    return  _.find(getSolrType(), {'uniqueID': '' + itemId});
  };

  const undoFieldTypeChanges = (fieldType, $index) => {
    delete fieldType.operation;
//    delete fieldType.replace;
    // update
    solrTypes[$index] = fieldType;
    saveToLocalStorage();
  };
  return {getSchema,
              setSchema,
              solrTypes: getSolrType,
              solrFields: getSolrFields,
              solrCopyFields: getSolrCopyFields,
              solrDynamicFields: getSolrDynamicFields,
              addField,
              addFieldType,
              addCopyField,
              getSelectedType,
              replaceFieldType,
              removeField,
              removeFieldType,
              removeCopyField,
              exportSchemaChanges,
              importFromServer,
              importFromFile,
              loadFromLocalStorage,
              undoFieldTypeChanges};
};

// for minification
schemaAPI.$inject = ['$http', '$log', 'API'];
export {schemaAPI};
