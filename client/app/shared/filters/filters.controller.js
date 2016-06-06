import _ from 'lodash';
class FiltersController {
  constructor($scope) {
    this.filters = $scope.bindingTo || [];
    this.filterParam = [];
    this.addFilter = (param) =>{
      const newFilter = {};
      newFilter.class ='';
      //copy all params
      angular.extend(newFilter,filterParams);

    };

    this.getFilters= () => {
      return this.filters;
    }
  }
}
export {FiltersController};
