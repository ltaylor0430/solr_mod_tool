import _ from 'lodash';
class FiltersController {
  constructor($log,$scope) {
    this.filters = $scope.bindingTo || [];
    this.filterParam = [];
    this.filter = {};
    this.addFilter = () =>{
      let newFilter = {};
      newFilter.class =this.filter.class;
      //copy all params
    $log.debug(this.filterParam);
    _.chain(this.filterParam)
      .forEach()
      .forIn
      .extend(newFilter);
    //newFilter = angular.extend(newFilter,this.filterParam);
    //add filter
    this.filters.push(newFilter);
    $log.debug(this.filters);
    this.reset();
    };

    this.getFilters= () => {
      return this.filters;
    };

    this.reset = () => {
      this.filter.class = '';
    };
  }
}
export {FiltersController};
