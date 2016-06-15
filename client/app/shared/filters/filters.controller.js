import _ from 'lodash';
class FiltersController {
  constructor($log,$scope) {
    this.filters = $scope.bindingTo || [];
    this.filterParam = [];
    this.filter = {};
    this.filterType = 'standard';
    this.test = () => {
      $log.debug(this.filterType);
    };
    this.addFilter = () =>{
      let newFilter = {};
      newFilter.class =this.filter.class;
      //copy all params
    $log.debug(this.filterParam);
    _(this.filterParam)
      .forEach((item) => {
          _.extend(newFilter,item);
      });
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
      //clear array using .length property,
      //reassignment using filterParams =[] breaks ng-repeat
      this.filterParam.length = 0;
    };
  }
}
export {FiltersController};
