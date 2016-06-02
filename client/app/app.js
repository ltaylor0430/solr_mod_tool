
// we don't need to use a variable
// or the from keyword when importing a css/styl file
// thanks the the styles loader it gets added as a
// <style> tag in the head by default but can be changed
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import './app.styl';

// the angular libs are just common js
// and therefore we can assume they were
// exported using the default keyword in ES2015
// so we can import each module
// with any name we see fit.
// Note that the actual value are just strings except angular itself
// because that's how angular decided to export
// their auxillary modules
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {appDirective} from './app.directive';
import {schema} from './components/schema/schema';
angular.module('app',
               [uiRouter,
                schema.name
              ])
.directive('app', appDirective);
