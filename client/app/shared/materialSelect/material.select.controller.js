export class  MaterialSelectController {
  constructor($scope,$log){

    this.onSelectItemChange = (item) => {
      $scope.selectedItem = item;
      this.expanded =false;

    };
    this.hide = () => {
      console.log('hey im hiding');
        this.expanded = false;
    };
  }
}
