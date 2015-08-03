'use strict';

/* Controllers */

var recruterControllers = angular.module('recruterControllers', 
                                        ["recruterServices", 'customDirectives']);

    recruterControllers.controller("authCtrl", ["$scope", "Auth", "GatherDataServise", "$location",
      function($scope, Auth, GatherDataServise, $location) {
        $scope.auth = Auth;
        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
        // get information about logged in user
        $scope.authData = authData; 
        // transform name of the user from GOOGLE to id format - witout: spase, <'> and lovercase 
        var id = $scope.authData.google.displayName.replace(/[\s\']+/g, '').toLowerCase().replace(/\.+/g, '');
        console.log(id)
        // will update scope with adminUsers var
        GatherDataServise.getAdimnUsers(id, $scope);
        // get name of the alloved user
        var userName = $scope.adminUsers.$value
        if ($scope.authData.google.displayName == userName){
            $location.path( "/search" )
          }
        else
          {$scope.auth.$unauth();
          sweetAlert("Access denied!", "Contact administrator to gain access", "error");
          }
        });

      }
    ]);

    
    recruterApp.controller('CandidateListCtrl', function($scope, GatherDataServise,  
                                                         $location, Auth) {
      var all = GatherDataServise.getUserslist();
      $scope.allData = all;
      $scope.chkBox = {};
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {$scope.name = authData.google.displayName;
                                              $scope.pic = authData.google.profileImageURL;
                                              console.log($scope.pic)
                                              })

      $scope.go = function (path) {
        $location.path( path );
      }

      $scope.deleteProfile = function(id){
        swal({title: "Are you sure?",   
              text: "You will not be able to recover this profile!",   
              type: "warning",   showCancelButton: true,   
              confirmButtonColor: "#DD6B55",   
              confirmButtonText: "Yes, delete it!",   
              closeOnConfirm: false }, 
              function(){
                          GatherDataServise.deleteRecord(id);
                          swal("Deleted!", "Profile has been deleted.", "success"); 
                        });
      };

      $scope.logout = function(){
        console.log($scope.auth)
        $scope.auth.$unauth()
        $location.path( "/login" )
      };

      $scope.showExtendedsearch = function(){
        if ($scope.show == true){
          $scope.show = false
        }
        else{
          $scope.show = true;
        }
      };
      $scope.fields = GatherDataServise.getFieldlist();
      console.log($scope.chkBox)
      console.log($scope.filtered)


    });

    recruterApp.controller('CandidateDetailCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject){
        $scope.message = GatherDataServise.getUserlist();
    });


    recruterApp.controller('CandidateNewCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject, $location){

        var fields = GatherDataServise.getFieldlist();
        $scope.fields = fields;
        $scope.values = {}

        $scope.addNew = function (){
          var userData = $scope.values
          userData.latestupdatetime = new Date().getTime();
          console.log(userData)
          GatherDataServise.addUser($scope, userData);
          swal({title: "Nice job!",   
                text: "Keep up the good work",   
                imageUrl: "img/thumbs-up.jpg" });
          $location.path("/search/");
        }

        $scope.showAddnew = function (){

          // console.log(google.id)

            if ($scope.show1) {
                $scope.show1 = false;
                }
            else { 
                $scope.show1 = true;
            }
        }

        $scope.submitNewfield = function(){
          var fieldlabel = $scope.field.name;
          var fieldname = $scope.field.name.replace(/\s+/g, '').toLowerCase().replace(/\.+/g, '');
          GatherDataServise.addNewfield(fieldlabel, fieldname, $scope.field.type, $scope.field.order)
        }
      });

    recruterApp.controller('CandidateViewlCtrl', function($scope, $routeParams, 
                                                          GatherDataServise, userData){
        $scope.fields = GatherDataServise.getFieldlist();
        // var userData = GatherDataServise.getRecordByID($routeParams.CandidateID)

        $scope.userDataview = userData
        console.log($scope.userDataview)
      });

    recruterApp.controller('CandidateEditlCtrl', function($scope, $routeParams, 
                                                          GatherDataServise, userData,
                                                          $location){

        // $scope.userDataview = $scope.allData.$getRecord($routeParams.CandidateID)
        $scope.userDataview = userData;
        $scope.fields = GatherDataServise.getFieldlist();

        $scope.saveEdit = function (){
          delete $scope.userDataview.$id;
          delete $scope.userDataview.$priority;
          // $scope.userDataview.latestupdatetime = new Date();
          GatherDataServise.updateUser($scope, $scope.userDataview, $routeParams.CandidateID);

          swal({title: "Profile is updated!",
                timer: 1000,   
                showConfirmButton: false });
        };

    });
