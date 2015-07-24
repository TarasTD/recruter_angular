'use strict';

/* Services */

var recruterServices = angular.module('recruterServices', []);


recruterServices.factory('GatherDataServise', function($firebaseObject, 
                                                       $firebaseArray,
                                                       $firebaseAuth) {     
      var factory = {};  
      var userRef = new Firebase("https://recruter.firebaseio.com/users");
      var fieldRef = new Firebase("https://recruter.firebaseio.com/fields");

      factory.getUserslist = function() {
        var list = $firebaseArray(userRef);
        // list.$loaded().then(function(ar){console.log(ar)})
        return list
      };

      factory.addUser = function($scope, userData) {
        var Ref = $firebaseArray(userRef);
        console.log(userData.latestupdatetime)
        Ref.$add(userData).then("New candidate is added!");
      };


      factory.updateUser = function($scope, userData, id) {
        var Ref = userRef.child(id);
        console.log(userData)

        var onComplete = function(error) {
          if (error) {
            alert('Synchronization failed');
          } else {
            console.log('Synchronization succeeded');
          };
        };
        Ref.update(userData, onComplete);
      };

      factory.deleteRecord = function(id){
        var Ref = userRef.child(id);
        var refObj = $firebaseObject(Ref)
        console.log(refObj)
        refObj.$remove()
        console.log("Deleting "+ refObj)
      }

      factory.getFieldlist = function(){
        var query = fieldRef.orderByPriority()
        var fieldList = $firebaseArray(query);
        return fieldList
      }

      factory.addNewfield = function(label, name, type){
        var fieldRef = new Firebase("https://recruter.firebaseio.com/fields");
          fieldRef.child(name).set({'label': label, 'type': type});
          alert("Field type added!")
        }

      factory.Auth = function(){
        var ref = new Firebase("https://recruter.firebaseio.com");
        return $firebaseAuth(ref);
        }

    return factory;
 });
