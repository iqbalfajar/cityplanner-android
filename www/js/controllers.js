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

.controller('detailZonaCtrl', function($scope,$stateParams, BackendService) {
  $scope.kode = $stateParams.kode;
  $scope.zona = '';
  $scope.sub_zona = '';
  $scope.kdb = 0;
  
  BackendService.getZonaKegiatan()
  .success(function(zonas) {
    for (var i = 0; i < zonas.length; i++) {
      if (zonas[i].kode == $scope.kode && zonas[i].kegiatan == $stateParams.kegiatan) {
        console.log(zonas[i]);

        $scope.zona = zonas[i].zona;
        $scope.sub_zona = zonas[i].sub_zona;
        $scope.kdb = zonas[i].kdb;

        break;
      }
    }
  })


})

.controller('detailZona2Ctrl', function($scope, $stateParams, BackendService) {
  $scope.kode = $stateParams.kode;
  $scope.zona = '';
  $scope.sub_zona = '';
  
  BackendService.getZonaKegiatan()
  .success(function(zonas) {
    for (var i = 0; i < zonas.length; i++) {
      if (zonas[i].kode == $scope.kode) {
        console.log(zonas[i]);

        $scope.zona = zonas[i].zona;
        $scope.sub_zona = zonas[i].sub_zona;

        break;
      }
    }
  })

  $scope.kdb = 0;

  $scope.toogleMore = function(jenisKegiatan){
      $(".showmore").show();

      BackendService.getZonaKegiatan()
      .success(function(zonas) {
        for (var i = 0; i < zonas.length; i++) {
          if (zonas[i].kode == $scope.kode && zonas[i].kegiatan == jenisKegiatan) {
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
