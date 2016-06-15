import analyzerTemplate from './tokenizer.tpl.html';
import _ from 'lodash';
//Item Detail
class FieldsDetailsController {
 constructor($scope,$log,$state, $uibModal,SchemaAPI) {
   this.fieldType  ={};
    this.editMode =$scope.editMode;

    this.params = [];
    this.test = 'test!';
    this.modal = undefined;
    this.SchemaAPI = SchemaAPI;
    this.filters = [];
    this.tokenizerParams=[];
    this.analyzer = {};
    this.tokenizer = {};
    this.solrTypes=this.SchemaAPI.solrTypes();
    this.selectedType = '';

    const self = this;

    if (this.editMode){
      let selectedItem = SchemaAPI.solrFields()[$state.params.index];

      let ex_params=_.chain(selectedItem)
                    .omit(['name','class','type','indexAnalyzer','queryAnalyzer','indexed','stored','multiValued'])
                    .map((result,v,key) => { return {name:v, value:result}; })
                    .value();
      $log.debug(selectedItem);
      this.params = ex_params;
      this.selectedType =selectedItem.type;
      //set up the field without the optional parameter.
      // those will get added on save
      this.fieldType ={name: selectedItem.name,
                                 indexed:selectedItem.indexed,
                                 stored:selectedItem.stored,
                                 multiValued:selectedItem.multiValued,
                                 class: selectedItem.class};


    }
    this.showAnalyzer = () => {
      const opts = {
                  template: analyzerTemplate,
                  controller: function($scope,$log, $q, $uibModalInstance) {
                        $log.debug( self.fieldType);
                        this.tokenizerType = 'indexquery';
                        this.filters = [];
                        this.tokenizerParams=[];
                         this.saveAnalyzer = () => {

                                //create analyzer object
                                this.analyzer = {
                                  tokenizer: {
                                    class:  this.tokenizerClass
                                  },
                                  filters:this.filters
                                };
                                //add
                                    _(this.tokenizerParams)
                                    .forEach((item) => {
                                        _.extend(this.analyzer.tokenizer,item);
                                    });
                               // _.extend(this.analyzer.tokenizer,tk_params);

                                self.fieldType.analyzer = this.analyzer;
                               $log.debug(self.fieldType);

                                //close Modal, save changes to analyzer object
                                $uibModalInstance.close();

                         };

                   },
                  controllerAs:'vm',
                  size:'lg'};
      this.modal = $uibModal.open(opts);

    };
     this.setFieldType = (ft) => {
        this.fieldType = ft;

    };
  this.reset = () => {
        fieldType = {params:[]};
        this.isAddNewFieldType = !this.isAddNewFieldType;

      };

    this.addFieldType = () => {

      //add field type, but 1st add all optional params
      //TODO: reference fieldType as the destination object in directive
      _(this.params)
          .forEach((item) => {
             $log.debug(item);
            this.fieldType[item.name] = item.value;
      });
      if (this.editMode) {
         this.SchemaAPI.replaceFieldType( this.fieldType);

      } else {
      this.SchemaAPI.addFieldType( this.fieldType);
      }
      $log.debug(this.fieldType);
      $state.go('^.itemDetails');
    };

    this.isFormDirty = () => {
       return this.itemDetails.$dirty;
    };
    this.cancel = () => {
      $state.go('^.itemDetails');
    };
}

}
  export {FieldsDetailsController};

