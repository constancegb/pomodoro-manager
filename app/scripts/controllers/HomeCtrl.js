(function() {
  function HomeCtrl(FormatTime, $interval) {
    var $ctrl = this;

    $ctrl.time = FormatTime(1500);
    $ctrl.startOrResetWork = "START";
    $ctrl.startOrResetBreak = "START";

    var onBreak = false;

    var countdown = function() {
      time--;
    };

    $ctrl.workTimer = function(time) {
      if (time === 1500) {
        $interval(countdown, 1000, [time]);
        startOrResetWork = "RESET";
      } else if (0 < time < 1500) {
        $interval.cancel(promise);
        startOrResetWork = "START";
        time = 1500;
      } else if (time === 0) {}
    };

    $ctrl.breakTimer = function(time) {};


  }

  angular
    .module('pomodoroManager')
    .controller('HomeCtrl', ['FormatTime', HomeCtrl]);
})();
