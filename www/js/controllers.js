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

.controller('detailZonaCtrl', function($scope,$ionicPopup) {
})

.controller('detailZona2Ctrl', function($scope, BackendService) {
  $scope.kdb = 0;
  
  $scope.toogleMore = function(jenisKegiatan){
      $(".showmore").show();

      BackendService.getZonaByKodeKegiatan()
      .success(function(zonas) {
        for (var i = 0; i < zonas.length; i++) {
          if (zonas[i].kode == 'K3' && zonas[i].kegiatan == jenisKegiatan) {
            console.log(zonas[i]);

            $scope.kdb = zonas[i].kdb;

          }
        }
      })

  }  
})

.controller('formLaporanPelanggaranCtrl', function($scope) {
  $scope.data = { showMore : false};

  $scope.toogleMore = function(){
    $scope.data.showMore = !$scope.data.showMore;
    if($scope.data.showMore){
      $(".showmore").show();
      $(".showless").hide();
    }
    else{
      $(".showmore").hide();
      $(".showless").show();
    }
  }  
})

.controller('formLaporanPelanggaran2Ctrl', function($scope) {

})

.controller('mapCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {


})
