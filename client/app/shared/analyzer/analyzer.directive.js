import './analyzer.styl';
import {AnalyzerController as controller} from './analyzer.controller';
import template from './analyzer.html';

export const analyzerDirective = ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    bindToController: true,
    scope: { item: '='}
  };
};
