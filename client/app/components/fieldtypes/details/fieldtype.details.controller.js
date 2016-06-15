import analyzerTemplate from './tokenizer.tpl.html';
import _ from 'lodash';
//Item Detail
class FieldTypeDetailsController {
 constructor($scope,$log,$state, $uibModal,SchemaAPI) {
   this.fieldType               ={};
    this.editMode             =$scope.editMode;
    this.params                = [];
    this.test                      = 'test!';
    this.modal                  = undefined;
    this.SchemaAPI          = SchemaAPI;
    this.filters                   = [];
    this.tokenizerParams =[];
    this.analyzer              = {};
    this.tokenizer             = {};
    this.tokenizerType ='indexquery';
    const self = this;

    if (this.editMode){
      let selectedItem = SchemaAPI.solrTypes()[$state.params.index];

      let ex_params=_.chain(selectedItem)
                    .omit(['name','class','analyzer','indexAnalyzer','queryAnalyzer'])
                    .map((result,v,key) => { return {name:v, value:result}; })
                    .value();
      $log.debug(ex_params);
      this.params = ex_params;
      this.fieldType ={name: selectedItem.name,
                                 class: selectedItem.class};

      if (selectedItem.analyzer)
      {
        //index query
        this.tokenizerType = 'indexquery';
        this.tokenizer = selectedItem.analyzer.tokenizer;
        this.filters = selectedItem.analyzer.filters;
      } else {
           this.tokenizerType = 'separate';
           this.tokenizer.index = selectedItem.indexAnalyzer;
           this.tokenizer.query = selectedItem.queryAnalyzer;

      }


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
        this.params = _(ft).without
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
  export {FieldTypeDetailsController};

