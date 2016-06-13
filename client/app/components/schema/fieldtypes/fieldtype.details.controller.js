import analyzerTemplate from './tokenizer.tpl.html';
import _ from 'lodash';
//Item Detail
class FieldTypeDetailsController {
 constructor($log,$state, $uibModal,SchemaAPI) {
    this.fieldType = {};
    this.params = [];
    this.test = 'test!';
    this.modal = undefined;
    this.SchemaAPI = SchemaAPI;
    this.filters = [];
    this.tokenizerParams=[];
    const self = this;
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
      this.SchemaAPI.addFieldType( this.fieldType);
      $log.debug(this.fieldType);
      this.fieldType = {};
      this.params.length = 0;
    };

}

}
  export {FieldTypeDetailsController};

