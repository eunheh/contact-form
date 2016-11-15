import angular from 'angular';

import { FormController } from './controllers/form';

angular
  .module('app', [])
  .controller('FormController', FormController);
