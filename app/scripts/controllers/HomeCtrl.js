(function() {
  function HomeCtrl($interval) {
    var $ctrl = this;

    var promise;

    // $ctrl.countdown = function() {
    //   $ctrl.time--;
    // };

    $ctrl.time = 1500;
    $ctrl.startOrResetWork = "START WORK";
    $ctrl.startOrResetBreak = "START BREAK";

    $ctrl.onBreak = false;

    $ctrl.stopTimer = function() {
      $interval.cancel(promise);
    };

    $ctrl.startTimer = function() {
      //promise = $interval($ctrl.countdown(), 1000, [$ctrl.time]);
      promise = $interval(function() {$ctrl.time--;}, 1000, [$ctrl.time+1]);
    };

    $ctrl.workTimer = function() {
      ($ctrl.startOrResetWork === "START WORK") ? $ctrl.startOrResetWork = "RESET" : $ctrl.startOrResetWork = "START WORK";
      if ($ctrl.startOrResetWork === "START WORK") {
        $ctrl.stopTimer();
        $ctrl.time = 1500;
      } else if ($ctrl.startOrResetWork === "RESET") {
        $ctrl.startTimer();
        promise.then(function() {
                      $ctrl.onBreak = true;
                      $ctrl.time = 300;
                      $ctrl.startOrResetBreak = "START BREAK";
                    });
      }
    };

    $ctrl.breakTimer = function() {
      ($ctrl.startOrResetBreak === "START BREAK") ? $ctrl.startOrResetBreak = "RESET" : $ctrl.startOrResetBreak = "START BREAK";
      if ($ctrl.startOrResetBreak === "START BREAK") {
        $ctrl.stopTimer();
        $ctrl.time = 300;
      } else if ($ctrl.startOrResetBreak === "RESET") {
        $ctrl.startTimer();
        promise.then(function() {
                      $ctrl.onBreak = false;
                      $ctrl.time = 1500;
                      $ctrl.startOrResetWork = "START WORK";
                    });
      }
    };

  }

  angular
    .module('pomodoroManager')
    .controller('HomeCtrl', ['$interval', HomeCtrl]);
})();
