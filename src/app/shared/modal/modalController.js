app.controller('ModalController', function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };
});