(function() {
  function HomeCtrl($interval) {
    var $ctrl = this;

    var promise;

    // $ctrl.countdown = function() {
    //   $ctrl.time--;
    // };

    $ctrl.time = 1500;
    $ctrl.startOrResetWork = "START";
    $ctrl.startOrResetBreak = "START";

    var onBreak = false;

    $ctrl.stopTimer = function() {
      $interval.cancel(promise);
    };

    $ctrl.startTimer = function() {
      //promise = $interval($ctrl.countdown(), 1000, [$ctrl.time]);
      promise = $interval(function() {$ctrl.time--;}, 1000, [$ctrl.time]);
    };

    $ctrl.workTimer = function() {
      ($ctrl.startOrResetWork === "START") ? $ctrl.startOrResetWork = "RESET" : $ctrl.startOrResetWork = "START";
      if ($ctrl.startOrResetWork === "START") {
        $ctrl.stopTimer();
        $ctrl.time = 1500;
      } else if ($ctrl.startOrResetWork === "RESET") {
        $ctrl.startTimer();
      }
    };

    $ctrl.breakTimer = function() {};

  }

  angular
    .module('pomodoroManager')
    .controller('HomeCtrl', ['$interval', HomeCtrl]);
})();
