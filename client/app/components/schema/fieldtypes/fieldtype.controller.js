import analyzerTemplate from './tokenizer.tpl.html';
class FieldTypeController {
 constructor($log, $uibModal) {
    this.fieldType = {params:[]};
    this.test = 'test!';
    this.modal = undefined;
    const self = this;
    this.showAnalyzer = () => {
      const opts = {
                  template: analyzerTemplate,
                  controller: function($scope,$log, $q, $uibModalInstance) {
                        $log.debug( this.fieldType);
                        this.tokenizerType = 'indexquery';
                        this.filters = [];
                         this.saveAnalyzer = () => {
                                this.analyzer = {
                                  tokenizer: {
                                    class:  this.tokenizerClass
                                  },
                                  filters:this.filters
                                };
                               $log.debug(this);
                                //close Modal, save changes to analyzer object
                                $uibModalInstance.close();

                         };

                   },
                  controllerAs:'vm',
                  size:'lg'};
      this.modal = $uibModal.open(opts);

    };


 }
}
  export {FieldTypeController};

