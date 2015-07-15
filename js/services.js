'use strict';

/* Services */

var recruterServices = angular.module('recruterServices', []);


recruterServices.factory('GatherDataServise', function() {     
   var factory = {};  
       factory.getList = function(a) {
      
      return names
      };
   return factory;
 });

recruterServices.factory('AddNewServise', function() {     
    var factory = {};  
    var ref = new Firebase("https://recruter.firebaseio.com/");

    factory.add = function($scope, userData) {
      var usersRef = ref.child("users");
      alert(userData)
      usersRef.push(userData);
    }

   return factory;
 });
