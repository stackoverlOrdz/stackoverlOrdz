
angular.module('myApp', [])
.controller('myController', function($scope){
 $scope.message = "what up";
 $scope.categories = [{'id': '1', name: 'yo'},
                     {'id': '2', name: 'yoyo'},
                     {'id': '3', name: 'yoyoyo'}];
})
