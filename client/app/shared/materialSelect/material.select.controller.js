export class  MaterialSelectController {
  constructor($scope,$log){

    this.onSelectItemChange = (item) => {
      console.log(item);
      this.selectedItem = item;
      this.expanded =false;

    };

  }
}
