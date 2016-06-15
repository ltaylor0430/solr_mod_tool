export class  MaterialRadioController {
  constructor($scope,$log){
    this.value = $scope.value;

    this.onChange = ()  => {
     this.selectedItem = '' +$scope.selectedItem;


      $log.debug(this.value);

      $log.debug(this.selectedItem);

      if (this.selectedItem === this.value)
      { //check
         this.radioStyle= 'radio_button_checked';
      } else {
        this.radioStyle = 'radio_button_unchecked';
      }
     $log.debug(this.radioStyle);
    };


  }
}
