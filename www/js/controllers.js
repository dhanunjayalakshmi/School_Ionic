angular.module('School.controllers', [])

.controller('ClassesController', ClassesController);

  function ClassesController($resource, $window) {
    var vm = this;
    var classResource = $resource('http://localhost:3000/api/v1/klasses/:classId?access_token=J2JYA6HSHXKFVRNZY3G2JF4QXBBTX52P',
       {}, { 'update': {method: "PUT"}});

    vm.getClasses = function() {
      vm.classResponse = classResource.get();
      console.log(vm.classResponse);
    }();

    vm.addClass = function(name) {
      console.log("Add");
      console.log(name);
      classResource.save({name:name});
      $window.location.href = '/';
    }

    vm.editClass = function(classes) {
      console.log("Edit");
      vm.classes = classes;
      $('#editModal').modal('show');
    }

    vm.updateClass = function(classes, name) {
      $('#editModal').modal('hide');
      console.log("Update");
      classResource.update({classId: classes.id, name: name}, classes);
    }

    vm.deleteClass = function(classes) {
      console.log("delete");
      console.log(classes);
      classResource.delete({classId:classes.id, name:classes.name});
      $window.location.href = '/';
    }
};
