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
  $scope.detail = [];
  $scope.tatabangunans = [];
  
  BackendService.getZonaKegiatan($stateParams.kegiatan)
  .success(function(zonas) {
    for (var i = 0; i < zonas.length; i++) {
      if (zonas[i].Kode == $stateParams.kode) {
        console.log(zonas[i]);

        $scope.detail = zonas[i];
        $scope.tatabangunans = zonas[i].TataBangunan.split('<br>');

        break;
      }
    }
  })


})

.controller('detailZona2Ctrl', function($scope, $stateParams, BackendService, $ionicModal, $ionicPopup, $location, $state) {
  $scope.detail = {};
  $scope.detailKegiatan = [];
  $scope.tatabangunans = [];
  $scope.jenisKegiatan = '';

  $scope.zonasRumah = ["C1","HK","I","K2","K3","R1.1","R1.2","R1.3","R2.2","R3"];
  $scope.zonasHotel = ["C1","I","K2","K3","K1","HK","W","SPU5","SPU1","SPU2"];
  $scope.zonasMinimarket = ["R3","R2.2","R2.1","R1.1","R1.2","R1.3","C1","I","KT","K2","K3","W","SPU2","SPU1","SPU3","SPU5"];
  
  BackendService.getZonaKegiatan('')
  .success(function(zonas) {
    for (var i = 0; i < zonas.length; i++) {
      if (zonas[i].Kode == $stateParams.kode) {
        console.log(zonas[i]);

        $scope.detail = zonas[i];

        break;
      }
    }
  })

  $scope.toogleMore = function(jenisKegiatan){
      $(".showmore").show();
      $scope.jenisKegiatan = jenisKegiatan;

      BackendService.getZonaKegiatan(jenisKegiatan)
      .success(function(zonas) {
        for (var i = 0; i < zonas.length; i++) {
          if (zonas[i].Kode == $stateParams.kode) {
            console.log(zonas[i]);

            $scope.detailKegiatan = zonas[i];
            $scope.tatabangunans = zonas[i].TataBangunan.split('<br>');

          }
        }
      })
  }

  $scope.data = { showMore : false};

  $scope.toogleMoreModal = function(){
    $scope.data.showMore = !$scope.data.showMore;
    if($scope.data.showMore){
      $(".showmore_modal").show();
      $(".showless_modal").hide();
    }
    else{
      $(".showmore_modal").hide();
      $(".showless_modal").show();
    }
  }  

  $scope.kdbCheck = "-1";
  $scope.klbCheck = "-1";
  $scope.kdhCheck = "-1";
  $scope.updateCheck = function(item,value) {
    switch (item) {
        case 'kdb':
            $scope.kdbCheck = value;
            break;
        case 'klb':
            $scope.klbCheck = value;
            break;
        case 'kdh':
            $scope.kdhCheck = value;
            break;
        default:
    }  
    console.log(item + ':' + value);
  }

  $ionicModal.fromTemplateUrl('templates/formLaporanModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });  

  // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Sukses!',
       template: 'Terima kasih telah mengirim Laporan. Laporan Anda akan kami sampaikan ke Dinas terkait untuk segera diproses.'
     });

     alertPopup.then(function(res) {
       alertPopup.close();
       $scope.modal.hide();
       console.log('redirect to #/menu/zone-detail2/'+$scope.detail.Kode)
      
       // $location.path('#/menu/zone-detail2/'+$scope.detail.Kode);
       $state.go("menu.detailZona2",{'kode':$scope.detail.Kode});
       
     });
   };
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
  $scope.accountUser = [];
  $scope.accountUser.name = "Iqbal Fajar";
  $scope.accountUser.email = "iqbalfajar@gmail.com";
  $scope.accountUser.address = "Jl. H. Abdul Malik No. 61";
  $scope.accountUser.city = "Tangerang";

})
