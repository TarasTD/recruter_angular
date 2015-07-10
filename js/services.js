'use strict';

/* Services */

var recruterServices = angular.module('recruterServices', []);

recruterServices.factory('GatherDataServise', function() {     
   var factory = {};  
   factory.getList = function() {
      return "Taras"
   }
   return factory;
