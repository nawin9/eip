
.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {

    var ctrl = this
 
    ctrl.login = function(data) {
        AuthService.login(data.email, data.password).success(function(d) {
            $state.go('tab.dash');
        }).error(function(d) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})