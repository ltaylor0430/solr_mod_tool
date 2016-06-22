
import _ from 'lodash';

class FieldTypesController {
  constructor($log, $state, SchemaAPI) {
    this.fieldType = {};
    this.params = [];
    this.test = 'test!';
    this.selectedItem = {};
    this.modal = undefined;
    this.SchemaAPI = SchemaAPI;
    this.solrTypes = this.SchemaAPI.solrTypes();

    this.hasNew = () => {

     return this.isAddNewFieldType ? '!!' : '!';
    };
    this.editType = (item) => {
      this.selectedItem = item;

      $log.debug('selected Item');
      $state.go('fieldType.edit', {id: item.uniqueID});
      $log.debug(this.selectedItem);
    };

    this.reset = () => {
      this.isAddNewFieldType = !this.isAddNewFieldType;
    };

    this.addFieldType = () => {
      // Add field type, but 1st add all optional params
      // TODO: reference fieldType as the destination object in directive
      _(this.params)
          .forEach(({item}) => {
            this.fieldType[item.name] = item.value;
//              _.extend(this.fieldType,item);
          });

      this.SchemaAPI.addFieldType( this.fieldType);
      $log.debug(this.fieldType);
      $state.go('^');
    };

    this.removeFieldType = (fieldType, $index) => {
      $log.debug('removing field type :' + $index);
      this.SchemaAPI.removeFieldType(fieldType, $index);
    };
    this.undoItemChanges = (item, $index) => {
      this.SchemaAPI.undoFieldTypeChanges(item, $index);
    };
  }
}
export {FieldTypesController};

