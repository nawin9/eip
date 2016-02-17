angular.module('starter.services', [])

.service('AuthService', function($q, $http) {
  var login = function(email, pw) {
    return $q(function(resolve, reject) {
      $http.post('192.168.0.18:8080/api/v1/auth/login', {"email" : email, "pass" : pw}).then(function(resp) {
        alert(email)
        if (resp.data.message) {
          reject('Failed login')
        } else {
          resolve('Login Success')
        }
      })

    })
  }

  return {
    login : login
  }

})

.factory('AuthManager', function($http, PromiseFactory) {
  return {
    login: function(email, password) {
      var dfd = PromiseFactory.defer();

      $http
        .post('http://10.18.207.194:8080/api/v1/login', {"email": email, "password": password})
        .then(function(res) {
          return dfd.resolve(res);
        }, function(err) {
          console.log(err)
          return dfd.reject(err);
        });

      return dfd.promise;
    }
  };
})

.factory('PromiseFactory', function($q) {
  return {
    decorate: function(promise) {
      promise.success = function(callback) {
        promise.then(callback);

        return promise;
      };

      promise.error = function(callback) {
        promise.then(null, callback);

        return promise;
      };
    },
    defer: function() {
      var deferred = $q.defer();

      this.decorate(deferred.promise);

      return deferred;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
