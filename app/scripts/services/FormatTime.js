(function() {
  function FormatTime(timeInSeconds) {
    var output;
    var numberOfSeconds = Math.floor(parseFloat(timeInSeconds) % 60);
    var numberOfMinutes = Math.floor(parseFloat(timeInSeconds) / 60);
    if (numberOfSeconds < 10) {
      output = numberOfMinutes + ":0" + numberOfSeconds;
    } else {
      output = numberOfMinutes + ":" + numberOfSeconds;
    }
    return output;
  }

  angular
    .module('pomodoroManager')
    .factory('FormatTime', [FormatTime]);
})();
