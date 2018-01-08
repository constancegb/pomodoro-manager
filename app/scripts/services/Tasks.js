(function() {
  function Tasks($firebaseArray) {
    var $ctrl = this;
    var ref = firebase.database().ref();

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);
    $ctrl.tasks = tasks;
    
    return {
      all: tasks
      // remaining logic for tasks
    };
  }

  angular
    .module('pomodoroManager')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
