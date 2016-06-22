import _ from 'lodash';
//Item Detail
class FieldTypeDetailsController {
  constructor($scope, $log, $state, SchemaAPI,$window) {
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
        let selectedItem =  _.find(this.SchemaAPI.solrTypes(), 'uniqueID', $state.params.id);

        //SchemaAPI.solrTypes()[$state.params.id];
        // Init Field Type
        let workingCopy = angular.copy(selectedItem);
            console.log('working copy NAME = ' + (selectedItem.name || ''));
        this.initFieldType(workingCopy);
        this.initTokenizer(workingCopy);
      }
    };

    this.initFieldType = (item) =>  {
      let exParams = _.chain(item)
                      .omit(['name', 'class', 'analyzer', 'indexAnalyzer', 'queryAnalyzer','uniqueID'])
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
      try {
        _(this.params)
            .forEach((item) => {
              $log.debug(item);
              this.fieldType[item.name] = item.value;
            });

        if (this.editMode) {
          this.SchemaAPI.replaceFieldType( this.fieldType);
         $state.go('^.itemDetails', {});
        } else {
          this.SchemaAPI.addFieldType( this.fieldType);
           $state.reload();
        }
      } catch (e) {
        $window.alert('Changes are pending, unable to save item.');
      }
      $log.debug(this.fieldType);

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

