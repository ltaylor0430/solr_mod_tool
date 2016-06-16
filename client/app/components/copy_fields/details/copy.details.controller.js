
import _ from 'lodash';
//Item Detail
class CopyDetailsController {
 constructor($scope,$log,$state, $uibModal,SchemaAPI) {
   this.fieldType  ={};
    this.params = [];
    this.test = 'test!';
    this.modal = undefined;
    this.SchemaAPI = SchemaAPI;
    this.solrTypes=this.SchemaAPI.solrTypes();
    $log.debug(this.solrTypes);
    this.selectedType = ' ';

    if (this.editMode){
      let selectedItem = SchemaAPI.solrCopyFields()[$state.params.index];

      //set up the field without the optional parameter.
      // those will get added on save
      this.fieldType =selectedItem;

    }

     this.setFieldType = (ft) => {
        this.fieldType = ft;

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
  export {CopyDetailsController};

