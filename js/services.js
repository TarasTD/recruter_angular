'use strict';

/* Services */

var recruterServices = angular.module('recruterServices', []);


recruterServices.factory('GatherDataServise', function($firebaseObject, 
                                                       $firebaseArray) {     
   var factory = {};
     // function returns an object of full list of items 
      factory.getList = function(a) {
        var list = $firebaseArray(new Firebase("https://recruter.firebaseio.com/users"));
        // list.$loaded().then(function(ar){console.log(ar)})
        return list
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
