import analyzerTemplate from './tokenizer.tpl.html';
import _ from 'lodash';

class FieldTypeController {
 constructor($log,$state, $uibModal,SchemaAPI) {
    this.fieldType = {params:[]};
    this.test = 'test!';
    this.modal = undefined;
    this.SchemaAPI = SchemaAPI;
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
  this.reset = () => {
        fieldType = {params:[]};
        this.isAddNewFieldType = !this.isAddNewFieldType;

      };
    this.addFieldType = () => {
      //add field type
      this.SchemaAPI.addFieldType( this.fieldType);
       $state.go('^');

    };

}
}
  export {FieldTypeController};

