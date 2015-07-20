'use strict';

/* Services */

var recruterServices = angular.module('recruterServices', []);


recruterServices.factory('GatherDataServise', function($firebaseObject, 
                                                       $firebaseArray) {     
      var factory = {};  
      var userRef = new Firebase("https://recruter.firebaseio.com/users");
      var fieldRef = new Firebase("https://recruter.firebaseio.com/fields");

      factory.getUserslist = function(a) {
        var list = $firebaseArray(userRef);
        // list.$loaded().then(function(ar){console.log(ar)})
        return list
      };

      factory.addUser = function($scope, userData) {
        userRef.push(userData);
      };

      factory.getFieldlist = function(){
        var fieldList = $firebaseArray(fieldRef);
        return fieldList
      }


    return factory;
 });

