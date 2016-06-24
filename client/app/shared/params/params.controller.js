class ParamsController {
  constructor($scope) {
    this.params = this.bindingTo;
    this.toggleParams = false;
    this.hasErrors  = false;
    this.addParam = (param) =>{
      if (param.name && param.value ) {
            const newParam = {name: param.name,
                                           value: param.value};

            this.params.push(newParam);

            param.name = '';
            param.value ='';
            this.hasErrors = false;
            }
            else {
              this.hasErrors = true;
            }
    };
    this.editItem  = (item,$index) => {
          console.log('edit item click');
          this.editIndex = $index;
    };
    this.getParams = () => {
      return this.params;
    };
    this.clearParams = () => {
        this.params = [];
    };
    this.removeParam = (item,$index) => {
      this.params.splice($index,1);
    };
  }
}
export {ParamsController};
