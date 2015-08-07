'use strict';

/* Services */

var recruterServices = angular.module('recruterServices',['recruterFilters']);


recruterServices.factory('GatherDataServise', function($firebaseObject, 
                                                       $firebaseArray,
                                                       $firebaseAuth) {     
      var factory = {};  
      var userRef = new Firebase("https://recruter.firebaseio.com/users");
      var fieldRef = new Firebase("https://recruter.firebaseio.com/fields");
      var admindRef = new Firebase("https://recruter.firebaseio.com/admin");
      var admins = $firebaseArray(admindRef);
      factory.allUsers = $firebaseArray(userRef);

      factory.getAdimnUsers = function(id, $scope){
        var admins = $firebaseArray(admindRef);
        $scope.$apply($firebaseArray(admindRef).$loaded().
                then(function(allData){
                  $scope.adminUsers = allData.$getRecord(id)
                }));
      }

      factory.getID = function(id){
        var record = admins.$getRecord(id);
        console.log(record.$value)
        return record
      }

      factory.getUserslist = function() {

        // var list = $firebaseArray(userRef);
        // factory.allUsers = list;
        return factory.allUsers;
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

      factory.getRecordByID = function(id){
        var id = id;
        var record = $firebaseArray(userRef).$loaded().then(function(allData){return allData.$getRecord(id)});
        // return record.$getRecord(id)
        return record
      }

      factory.deleteRecord = function(id){
        var Ref = userRef.child(id);
        var refObj = $firebaseObject(Ref)
        console.log(refObj)
        refObj.$remove()
        console.log("Deleting "+ refObj)
      }

      factory.getFieldlist = function(){
        var query = fieldRef.orderByChild("order")
        var fieldList = $firebaseArray(query);
        return fieldList
      }

      factory.addNewfield = function(label, name, type, order){
        var fieldRef = new Firebase("https://recruter.firebaseio.com/fields");
        var order = parseInt(order, 10)
          fieldRef.child(name).set({'label': label, 'type': type, 'order': order});
        }

      factory.Auth = function(){
        var ref = new Firebase("https://recruter.firebaseio.com");
        return $firebaseAuth(ref);
        }

    return factory;
 });

recruterServices.factory('advanceSearchServise', function(GatherDataServise,
                                                          $filter) { 
  var factory = {}

  var allProfiles = GatherDataServise.allUsers;

  var searchParameters = {};
  searchParameters.searchFor = "";
  searchParameters.notSearch = "";
  searchParameters.fields = {};
  var result 

  factory.getProfls = function(){
    return allProfiles
  }

  factory.setSearchData = function(field, searchFor, notSearch){
    searchParameters.fields = field;
    searchParameters.searchFor = searchFor;
    searchParameters.notSearch = notSearch;
  }

  factory.getSearchData = function(){
    return searchParameters;
  }

  factory.findProfiles = function(){
    result = $filter("find")(allProfiles, searchParameters);
    return result
  }

  factory.clearSearchRes = function(){
      result = undefined;
  }


  factory.getSearchRes = function(){

    if (result){
      console.log("sending result")
      return result;
    }
    else{
      return allProfiles;     
    }
  }


  return factory
});







