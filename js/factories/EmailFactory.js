/**
 * Factory: EmailFactory
 */
angular.module('EmailApp')
  .factory('EmailFactory', function EmailFactory ($q, $http, $routeParams) {
    'use strict';
    var exports = {};

    exports.reply = function (message) {
      if (message) {
        // we would obviously hit the back-end here
        // but let's just alert what we've typed
        alert('Reply content: ' + message);
      }
    };

    exports.getMessage = function (params) {
      if ( params.id ) {
        var deferred = $q.defer();
        $http.get('json/message/' + params.id + '.json')
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (data) {
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };

    return exports;
  });