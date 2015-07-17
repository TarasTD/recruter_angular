'use strict';

/* Services */

var recruterServices = angular.module('recruterServices', []);


recruterServices.factory('GatherDataServise', function($firebaseObject, 
                                                       $firebaseArray) {     
   var factory = {};
      var factory = {};  
      var ref = new Firebase("https://recruter.firebaseio.com/users");
      factory.getList = function(a) {
        var list = $firebaseArray(ref);
        // list.$loaded().then(function(ar){console.log(ar)})
        return list
      };

      factory.add = function($scope, userData) {
        ref.push(userData);
      };
   return factory;
 });


