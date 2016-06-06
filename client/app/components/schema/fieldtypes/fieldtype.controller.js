import tokenizerTemplate from './tokenizer.tpl.html';
class FieldTypeController {
 constructor($log, $uibModal) {
    this.fieldType = {params:[]};
    this.test = 'test!';
    this.modal = undefined;
    this.showTokenizer = () => {
      const opts = {template: tokenizerTemplate,
                              size:'lg'};
      this.modal = $uibModal.open(opts);

    };
    this.showAnalyzer = () => {
      const opts = {template: analyzerTemplate,
                              size:'lg'};
      this.modal = $uibModal.open(opts);

    };


 }
}
  export {FieldTypeController};

