class SchemaController {
  // TODO: Load Schema.xml

  // bind to this and not $scope
  // because of controllerAs.

  constructor($scope, $log, $state, SchemaAPI) {
    this.solrCollectionUrl = 'http://solr1:8983/solr/gateway_collection';
    this.schema =  undefined;
    this.fileName = '';
    this.xmlFile = '';
    this.inital = {fieldName: ''};
    this.SchemaAPI = SchemaAPI;
    this.solrTypes  = [];
    this.solrFields  = [];
    this.solrCopyFields = [];
    this.imported = false;
    this.loaded = false;

    this.hasNew = () => {
      return this.isAddNewFieldType ? '!!' : '!';
    };
    this.fileSelected = () => {
      $log.debug(this);
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
        this.solrCopyFields = SchemaAPI.solrCopyFields();
      });
    };

    this.retrieveFromLocalStorage = () => {
      let currentSchema =  localStorage.getItem('schema');
      $log.debug(currentSchema);
      SchemaAPI.setSchema(JSON.parse(currentSchema));
    };

    this.importSchema = () => {
      this.SchemaAPI.importFromServer(this.solrCollectionUrl).then(()=> {
        this.imported = true;
        $log.debug(this.SchemaAPI.solrTypes());
        this.solrTypes = this.SchemaAPI.solrTypes();
        this.solrFields = this.SchemaAPI.solrFields();
        this.solrCopyFields = this.SchemaAPI.solrCopyFields();
      });
    };
    this.init = () => {
      this.retrieveFromLocalStorage();
      this.loaded = true;
    };
  }

}
SchemaController.$inject = ['$scope', '$log', '$state', 'SchemaAPI'];
export {SchemaController};

