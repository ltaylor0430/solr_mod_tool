class ParamsController {
  constructor($scope) {
    this.params = $scope.bindingTo;
    this.addParam = (param) =>{
      const newParam = {name: param.name,
                                       value: param.value};
        this.params.push(newParam);
        param.name = '';
        param.value ='';

    };
    this.getParams = () => {
      return this.params;
    };
    this.clearParams = () => {
        this.params = [];
    };

  }
}
export {ParamsController};
