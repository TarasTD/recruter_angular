'use strict';

/* Controllers */

var recruterControllers = angular.module('recruterControllers', 
                                        ["recruterServices"]);
    
    recruterApp.controller('CandidateListCtrl', function($scope, $firebaseObject, 
                                                         $firebaseArray, $location) {
      var list = $firebaseArray(new Firebase("https://recruter.firebaseio.com/users"));
      list.$loaded().then(function(ar){console.log(ar)})
      $scope.names = list

    $scope.go = function ( path) {
      console.log(path)
      $location.path( path );
      };
    //   },
    //   function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //     });
    });

    recruterApp.controller('CandidateDetailCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject){
        $scope.message = GatherDataServise.getList();
    });



    recruterApp.controller('CandidateNewCtrl', function($scope, AddNewServise,
                                                            $firebaseObject){

        $scope.addNew = function (){
          var userData = {
              name: $scope.nameSurname,
              currentCompany: $scope.currentCompany,
              mainTech: $scope.mainTech,
              minorTech: $scope.minorTech,
              comments: $scope.comments,
              contacts: $scope.contacts,
              avatar: $scope.skype,
            }

          AddNewServise.add($scope, userData)

        }
    });





