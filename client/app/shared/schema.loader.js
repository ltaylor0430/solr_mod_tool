const schemaLoader= ($http, API, $q) => {
    "use strict";
    let existingSchema = {};
    const importConfiguration= (collectionApi) => {
        return $http.jsonp(`${collectionApi}/schema?wt=json&json.wrf=JSON_CALLBACK&callback=JSON_CALLBACK`)
        .then(({data}) => {
          existingSchema =  data.schema;
           return existingSchema;
        });
    };

    const getSchema = () => {
        return existingSchema;
      };

  return {importConfiguration, getSchema};
  };
//for minification
 schemaLoader.$inject = ['$http', 'API', '$q'];

export {schemaLoader};
