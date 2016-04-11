angular.module('app.controllers', [])

.controller('splashCtrl', function($scope,$state) {

  setTimeout(function(){
    $state.go("home");
  }, 3000);

})

.controller('homeCtrl', function($scope) {

})

.controller('cityBuilderCtrl', function($scope) {

})

.controller('cityWatchCtrl', function($scope) {

  $scope.data = { filterShow : false};
  var style = {
    top : ($("#cityWatch-button7").position().top - ($("#filterForm").height()+5)) + "px",
  }
  $("#filterForm").css(style);
  $scope.toogle = function(){
    $scope.data.filterShow = !$scope.data.filterShow;
    if($scope.data.filterShow){
      $("#filterForm").show();
    }
    else{
      $("#filterForm").hide();
    }
  }
})

.controller('loginCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('detailZonaCtrl', function($scope) {

})

.controller('formLaporanPelanggaranCtrl', function($scope) {

})

.controller('formLaporanPelanggaran2Ctrl', function($scope) {

})
