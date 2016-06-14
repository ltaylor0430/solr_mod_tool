
import _ from 'lodash';

class FieldsController {
 constructor($log,$state, $uibModal,SchemaAPI) {
    this.field = {};
    this.params = [];
    this.test = 'test!';
    this.modal = undefined;
    this.SchemaAPI = SchemaAPI;
    $log.debug($state);
    this.solrFields = this.SchemaAPI.solrFields();
    $log.debug(this.solrFields);
    const self = this;
    this.hasNew = () => {
            return (this.isAddNewfield ? '!!' : '!');
        };
   this.editType=(item,$index) => {
      this.selectedItem = item;

      $log.debug('selected Item');
      $state.go('fields.edit',{index:$index});
      $log.debug(this.selectedItem);
    };
    /*this.showAnalyzer = () => {
      const opts = {
                  template: analyzerTemplate,
                  controller: function($scope,$log, $q, $uibModalInstance) {
                        $log.debug( self.field);
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

                                self.field.analyzer = this.analyzer;
                               $log.debug(self.field);

                                //close Modal, save changes to analyzer object
                                $uibModalInstance.close();

                         };

                   },
                  controllerAs:'vm',
                  size:'lg'};
      this.modal = $uibModal.open(opts);

    };
*/
     this.reset = () => {
        this.isAddNewfield = !this.isAddNewfield;

      };

    this.addField = () => {
      //add field type, but 1st add all optional params
      //TODO: reference field as the destination object in directive
      _(this.params)
          .forEach((item) => {
              _.extend(this.field,item);
      });
      this.SchemaAPI.addfield( this.field);
      $log.debug(this.field);
       $state.go('^');

    };

    this.removefield = (field, $index) => {
      $log.debug('removing field type :' + $index);
     this.SchemaAPI.removefield(field, $index);
    };
    this.undoItemChanges = (item, $index) => {
        this.SchemaAPI.undofieldChanges(item, $index);


    };

}
}
  export {FieldsController};

