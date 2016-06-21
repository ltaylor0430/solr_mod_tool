
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

    this.hasNew = () => {
            return (this.isAddNewfield ? '!!' : '!');
    };
    this.editType = (item, $index) => {
      this.selectedItem = item;
      $log.debug('selected Item');
      $state.go('^.edit', {index: $index});
      $log.debug(this.selectedItem);
    };

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
      $log.debug('removing field  :' + $index);
      this.SchemaAPI.removefield(field, $index);
    };

    this.undoItemChanges = (item, $index) => {
      this.SchemaAPI.undofieldChanges(item, $index);
    };
  }
}
export {FieldsController};

