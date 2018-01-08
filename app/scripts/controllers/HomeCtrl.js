(function() {
  function HomeCtrl($interval, Tasks) {
    var $ctrl = this;

    var promise;

    // $ctrl.countdown = function() {
    //   $ctrl.time--;
    // };

    $ctrl.time = 1500;
    $ctrl.startOrResetWork = "START WORK";
    $ctrl.startOrResetBreak = "START BREAK";
    $ctrl.onBreak = false;
    $ctrl.workSessions = 0;

    $ctrl.tasks = Tasks.all;

    var mySound = new buzz.sound( "../../assets/sounds/ding.wav", {
      preload: true
    });

    $ctrl.stopTimer = function() {
      $interval.cancel(promise);
    };

    $ctrl.startTimer = function() {
      //promise = $interval($ctrl.countdown(), 1000, [$ctrl.time]);
      promise = $interval(function() {$ctrl.time--;}, 1000, [3/*$ctrl.time+1*/]);
    };

    $ctrl.addTask = function (addedTask) {
      $ctrl.tasks.$add(addedTask);
      //how do I clear the input after submission?
    };

    $ctrl.workTimer = function() {
      ($ctrl.startOrResetWork === "START WORK") ? $ctrl.startOrResetWork = "RESET" : $ctrl.startOrResetWork = "START WORK";
      if ($ctrl.startOrResetWork === "START WORK") {
        $ctrl.stopTimer();
        $ctrl.time = 1500;
      } else if ($ctrl.startOrResetWork === "RESET") {
        $ctrl.startTimer();
        promise.then(function() {
                      mySound.play();
                      $ctrl.onBreak = true;
                      $ctrl.startOrResetBreak = "START BREAK";
                      $ctrl.workSessions++;
                      if ($ctrl.workSessions === 4) {
                        $ctrl.time = 1800;
                        $ctrl.workSessions = 0;
                      } else {
                        $ctrl.time = 300;
                      }
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
                      mySound.play();
                      $ctrl.onBreak = false;
                      $ctrl.time = 1500;
                      $ctrl.startOrResetWork = "START WORK";
                    });
      }
    };

  }

  angular
    .module('pomodoroManager')
    .controller('HomeCtrl', ['$interval', 'Tasks', HomeCtrl]);
})();
