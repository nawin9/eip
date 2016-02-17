angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $ionicPopup, $state, AuthManager) {

    var ctrl = this
 
    ctrl.login = function(data) {
        // AuthService.login(data.email, data.password).success(function(d) {
        //     $state.go('tab.dash');
        // }).error(function(d) {
        //     var alertPopup = $ionicPopup.alert({
        //         title: 'Login failed!',
        //         template: 'Please check your credentials!'
        //     });
        // });

      AuthManager
        .login(data.email, data.password)
        .success(function(res) {
          //sessionStorage.setItem('authToken', res.authToken);
          $state.go('tab.dash')
        })
        .error(function(err) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        })
  }

})