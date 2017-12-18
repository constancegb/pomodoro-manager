(function() {

  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true, //disables hashbang URLs
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html'
    });
  }

  angular
    .module('pomodoroManager', ['ui.router', 'ui.bootstrap', 'firebase'])
    .config(config);
})();
