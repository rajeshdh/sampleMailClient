/**
 * Directive: Email <email></email>
 */
angular.module('EmailApp')
  .directive('email', function EmailDrctv ($timeout) {
    'use strict';

    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: "js/directives/email.tmpl.html",
      controllerAs: 'email',
      controller: function ($routeParams, $scope, EmailFactory) {
        this.message = {};
        this.reply = function (message) {
          EmailFactory.reply(message);
        };
        var getmessage = EmailFactory.getMessage($routeParams);
        if (getmessage) {
          getmessage.then( angular.bind(this, function (response) {
            EmailFactory.message = response;
            this.message = EmailFactory.message;
            $scope.$parent.email.title = this.message.subject;
          }) );
        }
      },
      link: function (scope, element, attrs, ctrl) {
        var textarea = element.find('.email__response-text')[0];
        scope.$watch('reply', function (newVal, oldVal) {
          if (newVal === oldVal) return;
          if (newVal) {
            $timeout(function () {
              textarea.focus();
            }, 0);
          }
        })
      }
    }
  });