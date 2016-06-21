import _ from 'lodash';
//Item Detail
class FieldTypeDetailsController {
  constructor($scope, $log, $state, SchemaAPI) {
    this.fieldType              = {};
    this.params                = [];
    this.test                      = 'test!';
    this.modal                  = undefined;
    this.SchemaAPI          = SchemaAPI;
    this.filters                   = [];
    this.tokenizerParams = [];
    this.analyzer              = {};
    this.tokenizer             = {};

    this.tokenizerType = 'indexquery';

    this.init = () => {
      if (this.editMode) {
        let selectedItem = SchemaAPI.solrTypes()[$state.params.index];
        // Init Field Type
        let workingCopy = angular.copy(selectedItem);

        this.initFieldType(workingCopy);
        this.initTokenizer(workingCopy);
      }
    };

    this.initFieldType = (item) =>  {
      let exParams = _.chain(item)
                      .omit(['name', 'class', 'analyzer', 'indexAnalyzer', 'queryAnalyzer'])
                      .map((result, v) => { return {name: v, value: result}; })
                      .value();
      $log.debug(exParams);
      this.params = exParams;
      this.fieldType = {name: item.name,
                                   class: item.class};
    };

    this.initTokenizer = (item) => {
      if (item.analyzer) {
         // index query
        this.tokenizerType = 'indexquery';
        this.tokenizer = item.analyzer.tokenizer;
        this.filters = item.analyzer.filters;
      } else {
        this.tokenizerType = 'separate';
        this.tokenizer.index = item.indexAnalyzer;
        this.tokenizer.query = item.queryAnalyzer;
      }
    };

  /*  this.setFieldType = (ft) => {
        this.fieldType = ft;
    };*/
    this.reset = () => {
      this.fieldType = {};
        this.init();
        //this.isAddNewFieldType = !this.isAddNewFieldType;

      };

    this.save = () => {

      // add field type, but 1st add all optional params
      // TODO: reference fieldType as the destination object in directive

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

