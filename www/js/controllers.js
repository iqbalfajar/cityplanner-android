angular.module('app.controllers', [])

.controller('splashCtrl', function($scope,$state) {

  setTimeout(function(){
    $state.go("home");
  }, 3000);

})

.controller('homeCtrl', function($scope) {

})

.controller('cityBuilderPreCtrl', function($scope, Config, $sce) {

})

.controller('cityBuilderCtrl', function($scope, Config, $sce, $ionicTabsDelegate, $stateParams, $timeout) {
  console.log($stateParams.tabIndex);
  // $ionicTabsDelegate.select($stateParams.tabIndex);
  // $scope.tabIndex = $stateParams.tabIndex;

  $scope.kegiatanTitle = '';
  $scope.classTabRumah = 'ng-hide';
  $scope.classTabHotel = 'ng-hide';
  $scope.classTabMinimarket = 'ng-hide';
  switch ($stateParams.tabIndex) {
      case '0':
          $scope.kegiatanTitle = 'Bangun Rumah';
          $scope.classTabRumah = 'ng-show';
          $scope.classTabHotel = 'ng-hide';
          $scope.classTabMinimarket = 'ng-hide';
          break;
      case '1':
          $scope.kegiatanTitle = 'Bangun Hotel';
          $scope.classTabHotel = 'ng-show';
          $scope.classTabRumah = 'ng-hide';
          $scope.classTabMinimarket = 'ng-hide';
          break;
      case '2':
          $scope.kegiatanTitle = 'Bangun Minimarket';
          $scope.classTabMinimarket = 'ng-show';
          $scope.classTabRumah = 'ng-hide';
          $scope.classTabHotel = 'ng-hide';
          break;
      default:
        break;
  }

  $scope.urlZonaRumah = $sce.trustAsResourceUrl(Config.getUrlZonaRumah());
  $scope.urlZonaHotel = $sce.trustAsResourceUrl(Config.getUrlZonaHotel());
  $scope.urlZonaMinimarket = $sce.trustAsResourceUrl(Config.getUrlZonaMinimarket());

})

.controller('cityWatchCtrl', function($scope, Config, $sce, $cordovaGeolocation, $http, leafletMapEvents, leafletData) {
  $scope.urlZonaAll = $sce.trustAsResourceUrl(Config.getUrlZonaAll());

  $scope.data = { filterShow : false};
  var style = {
    top : ($("#cityWatch-button7").position().top - ($("#filterForm").height()+60)) + "px",
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

  // Map Code
  $scope.map = {
    defaults: {
      // tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 18,
      // zoomControlPosition: 'bottomleft'
      // tileLayerOptions: {
      //     opacity: 0.6,
      //     detectRetina: true,
      //     reuseTiles: true,
      // },
    },
    center: {
        lat: -6.9003,
        lng: 107.6203,
        zoom: 16
    },
    layers: {
        baselayers: {
            osm: {
                name: 'OpenStreetMap',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
            },
            googleRoadmap: {
                name: 'Google Streets',
                layerType: 'ROADMAP',
                type: 'google'
            },
            googleHybrid: {
                name: 'Google Hybrid',
                layerType: 'HYBRID',
                type: 'google'
            }, 
            mapbox: {
                name: 'Mapbox',
                url: 'https://api.mapbox.com/styles/v1/iqbalfajar/cimvh38pc00eb9wnjukchjqc9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXFiYWxmYWphciIsImEiOiJjaWx3ZTA1c2kwMXFqdWJrc29yMXlrc216In0.x27mOpcQja1glCL7NO-MLA',
                type: 'xyz'
            },  
        },
        overlays: {
            mapbox_light: {
                name: 'Zona Rumah',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                visible: true,
                type: 'xyz',
                layerOptions: {
                  apikey: 'pk.eyJ1IjoiaXFiYWxmYWphciIsImEiOiJjaWx3ZTA1c2kwMXFqdWJrc29yMXlrc216In0.x27mOpcQja1glCL7NO-MLA',
                  mapid: 'iqbalfajar.acmc3wp2',
                  transparent: true,
                  // style: {
                  //   color: '#00D',
                  //   fillColor: 'red',
                  //   weight: 2.0,
                  //   opacity: 0.6,
                  //   fillOpacity: 0.2
                  // }
                },
                layerParams: {
                  // "layers": "usa:states",
                  // "format": "image/png",
                  transparent: true
                },
            },            
        },
    },
    // tiles: {
    //     name: 'Mapbox Park',
    //     url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    //     type: 'xyz',
    //     options: {
    //         apikey: 'pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ',
    //         mapid: 'feelcreative.llm8dpdk'
    //     }
    // },
    geojson: {},
    markers : {},
  };

  // $http.get("https://a.tiles.mapbox.com/v4/feelcreative.llm8dpdk/features.json?access_token=pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ").success(function(data) {
  //     $scope.map.geojson.data = data;
  //     console.log(data);
  // });

  // $http.get("sampledata/pertahanan_keamanan.geojson").success(function(data, status) {
  //     angular.extend($scope.map.layers.overlays, {
  //         countries: {
  //             name:'Pertahanan Keamanan GeoJson',
  //             type: 'geoJSON',
  //             data: data,
  //             visible: true,
  //             layerOptions: {
  //                 style: {
  //                         color: '#00D',
  //                         fillColor: 'red',
  //                         weight: 2.0,
  //                         opacity: 0.6,
  //                         fillOpacity: 0.2
  //                 }
  //             }
  //         }
  //     });
  // });

  /**
   * Center map on user's current position
   */
  $scope.locate = function(){

    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        $scope.map.center.lat  = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;
        $scope.map.center.zoom = 17;

        $scope.map.markers.now = {
          lat:position.coords.latitude,
          lng:position.coords.longitude,
          message: "Anda berada di sini",
          focus: true,
          draggable: false
        };

      }, function(err) {
        // error
        console.log("Location error!");
        console.log(err);
      });

  };

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

      var style = {
        background : "silver",
      }
      var styleClear = {
        background : "none",
      }
      $(".div-kegiatan").css(styleClear);
      $(".div-"+jenisKegiatan).css(style);

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
       template: 'Terima kasih telah mengirim laporan. Laporan Anda akan kami sampaikan ke Dinas terkait untuk segera diproses.'
     });

     alertPopup.then(function(res) {
       alertPopup.close();
       $scope.modal.hide();
       console.log('redirect to #/menu/zone-detail2/'+$scope.detail.Kode)
      
       // $location.path('#/menu/zone-detail2/'+$scope.detail.Kode);
       // $state.go("menu.detailZona2",{'kode':$scope.detail.Kode}); 
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

.controller('mapCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {
  $scope.accountUser = [];
  $scope.accountUser.name = "Iqbal Fajar";
  $scope.accountUser.email = "iqbalfajar@gmail.com";
  $scope.accountUser.address = "Jl. H. Abdul Malik No. 61";
  $scope.accountUser.city = "Tangerang";

})