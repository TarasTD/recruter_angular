'use strict';

/* Controllers */

var recruterControllers = angular.module('recruterControllers', 
                                        ["recruterServices", 
                                         'customDirectives']);

    recruterControllers.controller("authCtrl", ["$scope", "Auth", 
                                                "GatherDataServise", 
                                                "$location",
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
            swal({title: "Welcome " + $scope.authData.google.displayName + "!",
                  timer: 1500,
                  showConfirmButton: false});
          }
        else
          {$scope.auth.$unauth();
          sweetAlert("Access denied!", "Contact administrator to gain access", "error");
          }
        });

      }
    ]);

    
    recruterApp.controller('CandidateListCtrl', function($scope, GatherDataServise,  
                                                         $location, Auth, advanceSearchServise) {

      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {$scope.name = authData.google.displayName;
                                              $scope.pic = authData.google.profileImageURL;
                                              })
      // show only a couple of profiles due to performance

      if (!advanceSearchServise.result){
          advanceSearchServise.getSearchRes()
          .$loaded(function(da){$scope.allData = da.slice(-40); 
                              $scope.len = da.length;
                              });
        }
      else {
        $scope.allData = advanceSearchServise.result;
        $scope.len = advanceSearchServise.result.length;
      }

      var searchParameters = advanceSearchServise.getSearchData();

      $scope.words = {}
      $scope.chkBox = searchParameters.fields;
      $scope.words.include = searchParameters.searchFor;
      $scope.words.exclude = searchParameters.notSearch;

      $scope.go = function (path) {
        $location.path( path );
      }

      $scope.clearRes = function(){
        advanceSearchServise.clearSearchRes()
        // show only a couple of profiles due to performance issues
        advanceSearchServise.getSearchRes()
          .$loaded(function(da){$scope.allData = da.slice(-40); 
                                $scope.len = da.length;
                                });
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
                          swal("Deleted!", 
                               "Profile has been deleted.", 
                               "success"); 
                        });
      };

      $scope.logout = function(){console.log($scope.auth)
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

      $scope.advanceSearch = function(){
        var fieldsToSearch = $scope.chkBox
        var toSearch = $scope.words.include.toString().split(/[ ,]+/)
        var notToSearch = $scope.words.exclude.toString().split(/[ ,]+/)
        advanceSearchServise.setSearchData(fieldsToSearch,
                                     toSearch, 
                                     notToSearch)
        $scope.allData = advanceSearchServise.findProfiles();
        $scope.len = $scope.allData.length;
      };

      var jsonData;

      $scope.showContent = function($fileContent){

        var content = $fileContent.split("\n");
        // console.log(content)
        var counter = 0;
        jsonData = [];
        for (var i = content.length - 1; i >= 0; i--) {
          // console.log(content[i])
          var userData = angular.fromJson(content[i]);
          userData.latestupdatetime = new Date().getTime();
          jsonData.push(userData);
          counter += 1;
          $scope.counter = counter;
          console.log(userData.namesurname);
          };

        swal({title: "Will add "+counter+" users",   
                text: "It might take a while",   
                type: "warning",   showCancelButton: false,    
                closeOnConfirm: true })
      };

      var uploadedCounter = 0;

      $scope.uploadData = function(){
        console.log(jsonData)
        if (!jsonData || jsonData.length === 0){
          swal({title: "No file selected or data is not readable!",
          type: "warning"})
        }
        for (var i = jsonData.length - 1; i >= 0; i--) {
          GatherDataServise.addUser($scope, jsonData[i]);
          uploadedCounter += 1;
          $scope.uploadCurrent = uploadedCounter;
          console.log($scope.uploadName)
        };
      }



      
    });

    recruterApp.controller('CandidateDetailCtrl', function($scope, 
                                                            GatherDataServise,
                                                            $firebaseObject){
        $scope.message = GatherDataServise.getUserlist();
    });


    recruterApp.controller('CandidateNewCtrl', function($scope, 
                                                        GatherDataServise,
                                                        $firebaseObject, 
                                                        $location){

        var fields = GatherDataServise.getFieldlist();
        $scope.fields = fields;
        $scope.values = {}

        $scope.addNew = function (values){
          var userData = values
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
          GatherDataServise.addNewfield(fieldlabel, 
                                        fieldname, 
                                        $scope.field.type, 
                                        $scope.field.order)
          swal({title: "New field type added!"});

        }
      });

    recruterApp.controller('CandidateViewlCtrl', function($scope, 
                                                          $routeParams, 
                                                          GatherDataServise, 
                                                          userData){
        $scope.fields = GatherDataServise.getFieldlist();
        // var userData = GatherDataServise.getRecordByID($routeParams.CandidateID)

        $scope.userDataview = userData
        console.log($scope.userDataview)
      });

    recruterApp.controller('CandidateEditlCtrl', function($scope, 
                                                          $routeParams, 
                                                          GatherDataServise, 
                                                          userData,
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
