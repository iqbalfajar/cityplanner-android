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

.controller('cityBuildRumahCtrl', function($scope, Config, $sce, $cordovaGeolocation, $http, leafletMapEvents, leafletData) {
  $scope.data = { filterShow : false};
  var style = {
    top : ($(".citybuild-filter-btn").position().top - ($(".filterForm").height()+60)) + "px",
  }
  $(".filterForm").css(style);
  $scope.toogle = function(){
    $scope.data.filterShow = !$scope.data.filterShow;
    if($scope.data.filterShow){
      $(".filterForm").show();
    }
    else{
      $(".filterForm").hide();
    }
  }  

  // Map Code
  $scope.map = {
    defaults: {
      // maxZoom: 18,
    },
    center: {
        lat: -6.9003,
        lng: 107.6203,
        zoom: 15
    },
    layers: {
        baselayers: {
            googleRoadmap: {
                name: 'Streets',
                layerType: 'ROADMAP',
                type: 'google'
            },
            googleHybrid: {
                name: 'Hybrid',
                layerType: 'HYBRID',
                type: 'google'
            }, 
        },
        overlays: {           
        },
    },
    geojson: {},
    markers : {},
    events: {
      map: {
        enable: ['click', 'context'],
        logic: 'emit'
      }
    }    
  };

  // Get the layer geojson data from a JSON
  $scope.loadGeojson = function (Kategori, fillColor, show) {
      $http.get("sampledata/geojson/citybuild-rumah/"+Kategori+".geojson").success(function(data, status) {
        $scope.map.geojson[Kategori] = {
          data: data,
          filter: function (feature) {
              return show;
          },
          style: {
                fillColor: fillColor,
                weight: 1,
                opacity: 0.4,
                color: fillColor,
                fillOpacity: 0.4
          },
          hoverStyle : {
              fillOpacity: 0.6
          },
          onEachFeature: onEachFeature,
          resetStyleOnMouseout: true
        };

        function onEachFeature(feature, layer) {
            layer.on({

              click: function() {
                layer.bindPopup("<a href='#/menu/zone-detail/rumah/"+feature.properties.kode15+"' class='a-popup'>"+ feature.properties.kategori + "</a>");
              }
            })
          }
    });
  };

  $scope.show = {};
  $scope.show.Perdagangan_Jasa_Linier = false;
  $scope.show.Pertahanan_Keamanan = true;
  $scope.show.Perumahan_Kepadatan_Rendah = true;  
  $scope.show.Perumahan_Kepadatan_Sedang = false;
  $scope.show.Perumahan_Kepadatan_Tinggi = false;
  // Load geojson
  $scope.loadAllGeojson = function () {
    // $scope.loadGeojson('Perdagangan_Jasa_Linier','rgba(255,61,0,72)', $scope.show.Perdagangan_Jasa_Linier);
    $scope.loadGeojson('Pertahanan_Keamanan','rgba(129,95,51,10)', $scope.show.Pertahanan_Keamanan);
    $scope.loadGeojson('Perumahan_Kepadatan_Rendah','rgba(55,148,179,1)', $scope.show.Perumahan_Kepadatan_Rendah);
    // $scope.loadGeojson('Perumahan_Kepadatan_Sedang','rgba(255,171,64,25)', $scope.show.Perumahan_Kepadatan_Sedang);
    // $scope.loadGeojson('Perumahan_Kepadatan_Tinggi','rgba(255,193,7,14)', $scope.show.Perumahan_Kepadatan_Tinggi);
  };
  //Load geojson
  $scope.loadAllGeojson();
  
  // Filter Layer
  $scope.filterChecked = true;
  $scope.filterChange = function(Kategori, fillColor, checked) {
      $scope.show[Kategori] = checked;
 
      // now remove and reload geojson
      leafletData.getMap().then(function (map) {
          leafletData.getGeoJSON().then(function (geoJSON) {
              // console.log(geoJSON);
              
              if ($scope.show[Kategori]) {
                console.log('reload');
                $scope.loadGeojson(Kategori,fillColor, $scope.show[Kategori]);
              } else {
                console.log('remove');
                map.removeLayer(geoJSON[Kategori]);
              }
              // $scope.loadAllGeojson();
          });
      });
  };

  /**
   * Center map on user's current position
   */
  $scope.locate = function(){

    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        $scope.map.center.lat  = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;
        $scope.map.center.zoom = 16;

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

.controller('cityBuildHotelCtrl', function($scope, Config, $sce, $cordovaGeolocation, $http, leafletMapEvents, leafletData) {
  $scope.data = { filterShow : false};
  var style = {
    top : ($(".citybuild-filter-btn").position().top - ($(".filterForm").height()+60)) + "px",
  }
  $(".filterForm").css(style);
  $scope.toogle = function(){
    $scope.data.filterShow = !$scope.data.filterShow;
    if($scope.data.filterShow){
      $(".filterForm").show();
    }
    else{
      $(".filterForm").hide();
    }
  }  

  // Map Code
  $scope.map = {
    defaults: {
      // maxZoom: 18,
    },
    center: {
        lat: -6.9003,
        lng: 107.6203,
        zoom: 15
    },
    layers: {
        baselayers: {
            googleRoadmap: {
                name: 'Streets',
                layerType: 'ROADMAP',
                type: 'google'
            },
            googleHybrid: {
                name: 'Hybrid',
                layerType: 'HYBRID',
                type: 'google'
            }, 
        },
        overlays: {           
        },
    },
    geojson: {},
    markers : {},
    events: {
      map: {
        enable: ['click', 'context'],
        logic: 'emit'
      }
    }    
  };

  // Get the layer geojson data from a JSON
  $scope.loadGeojson = function (Kategori, fillColor, show) {
      $http.get("sampledata/geojson/citybuild-hotel/"+Kategori+".geojson").success(function(data, status) {
        $scope.map.geojson[Kategori] = {
          data: data,
          filter: function (feature) {
              return show;
          },
          style: {
                fillColor: fillColor,
                weight: 1,
                opacity: 0.4,
                color: fillColor,
                fillOpacity: 0.4
          },
          hoverStyle : {
              fillOpacity: 0.6
          },
          onEachFeature: onEachFeature,
          resetStyleOnMouseout: true
        };

        function onEachFeature(feature, layer) {
            layer.on({

              click: function() {
                layer.bindPopup("<a href='#/menu/zone-detail/hotel/"+feature.properties.kode15+"' class='a-popup'>"+ feature.properties.kategori + "</a>");
              }
            })
          }
    });
  };

  $scope.show = {};
  $scope.show.Campuran_Intensitas_Tinggi = true;
  $scope.show.Pendidikan = true;
  $scope.show.Perdagangan_Jasa_Linier = false;
  $scope.show.Pertahanan_Keamanan = true;
  $scope.show.Pusat_Perdagangan_Jasa = true;
  $scope.show.Wisata_Buatan = true;
  // Load geojson
  $scope.loadAllGeojson = function () {
    $scope.loadGeojson('Campuran_Intensitas_Tinggi','rgba(255,139,253,56)', $scope.show.Campuran_Intensitas_Tinggi);
    $scope.loadGeojson('Pendidikan','rgba(245,124,0,44)', $scope.show.Pendidikan);
    // $scope.loadGeojson('Perdagangan_Jasa_Linier','rgba(255,61,0,72)', $scope.show.Perdagangan_Jasa_Linier);
    $scope.loadGeojson('Pertahanan_Keamanan','rgba(255,195,0,13)', $scope.show.Pertahanan_Keamanan);
    $scope.loadGeojson('Pusat_Perdagangan_Jasa','rgba(249,0,0,79)', $scope.show.Pusat_Perdagangan_Jasa);
    $scope.loadGeojson('Wisata_Buatan','rgba(197,0,255,84)', $scope.show.Wisata_Buatan);
  };
  //Load geojson
  $scope.loadAllGeojson();
  
  // Filter Layer
  $scope.filterChecked = true;
  $scope.filterChange = function(Kategori, fillColor, checked) {
      $scope.show[Kategori] = checked;
 
      // now remove and reload geojson
      leafletData.getMap().then(function (map) {
          leafletData.getGeoJSON().then(function (geoJSON) {
              // console.log(geoJSON);
              
              if ($scope.show[Kategori]) {
                console.log('reload');
                $scope.loadGeojson(Kategori,fillColor, $scope.show[Kategori]);
              } else {
                console.log('remove');
                map.removeLayer(geoJSON[Kategori]);
              }
              // $scope.loadAllGeojson();
          });
      });
  };

  /**
   * Center map on user's current position
   */
  $scope.locate = function(){

    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        $scope.map.center.lat  = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;
        $scope.map.center.zoom = 16;

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

.controller('cityBuildMinimarketCtrl', function($scope, Config, $sce, $cordovaGeolocation, $http, leafletMapEvents, leafletData) {
  $scope.data = { filterShow : false};
  var style = {
    top : ($(".citybuild-filter-btn").position().top - ($(".filterForm").height()+60)) + "px",
  }
  $(".filterForm").css(style);
  $scope.toogle = function(){
    $scope.data.filterShow = !$scope.data.filterShow;
    if($scope.data.filterShow){
      $(".filterForm").show();
    }
    else{
      $(".filterForm").hide();
    }
  }  

  // Map Code
  $scope.map = {
    defaults: {
      // maxZoom: 18,
    },
    center: {
        lat: -6.9003,
        lng: 107.6203,
        zoom: 15
    },
    layers: {
        baselayers: {
            googleRoadmap: {
                name: 'Streets',
                layerType: 'ROADMAP',
                type: 'google'
            },
            googleHybrid: {
                name: 'Hybrid',
                layerType: 'HYBRID',
                type: 'google'
            }, 
        },
        overlays: {           
        },
    },
    geojson: {},
    markers : {},
    events: {
      map: {
        enable: ['click', 'context'],
        logic: 'emit'
      }
    }    
  };

  // Get the layer geojson data from a JSON
  $scope.loadGeojson = function (Kategori, fillColor, show) {
      $http.get("sampledata/geojson/citybuild-minimarket/"+Kategori+".geojson").success(function(data, status) {
        $scope.map.geojson[Kategori] = {
          data: data,
          filter: function (feature) {
              return show;
          },
          style: {
                fillColor: fillColor,
                weight: 1,
                opacity: 0.4,
                color: fillColor,
                fillOpacity: 0.4
          },
          hoverStyle : {
              fillOpacity: 0.6
          },
          onEachFeature: onEachFeature,
          resetStyleOnMouseout: true
        };

        function onEachFeature(feature, layer) {
            layer.on({

              click: function() {
                layer.bindPopup("<a href='#/menu/zone-detail/minimarket/"+feature.properties.kode15+"' class='a-popup'>"+ feature.properties.kategori + "</a>");
              }
            })
          }
    });
  };

  $scope.show = {};
  $scope.show.Kantor_Pemerintahan = true;
  $scope.show.Pendidikan = true;
  $scope.show.Perdagangan_Jasa_Linier = false;
  $scope.show.Perumahan_Kepadatan_Tinggi = false;
  $scope.show.Pusat_Perdagangan_Jasa = true;
  $scope.show.Transportasi = true;
  // Load geojson
  $scope.loadAllGeojson = function () {
    $scope.loadGeojson('Kantor_Pemerintahan','rgba(255,139,253,56)', $scope.show.Kantor_Pemerintahan);
    $scope.loadGeojson('Pendidikan','rgba(245,124,0,44)', $scope.show.Pendidikan);
    // $scope.loadGeojson('Perdagangan_Jasa_Linier','rgba(255,61,0,72)', $scope.show.Perdagangan_Jasa_Linier);
    // $scope.loadGeojson('Perumahan_Kepadatan_Tinggi','rgba(255,193,7,14)', $scope.show.Perumahan_Kepadatan_Tinggi);
    $scope.loadGeojson('Pusat_Perdagangan_Jasa','rgba(249,0,0,79)', $scope.show.Pusat_Perdagangan_Jasa);
    $scope.loadGeojson('Transportasi','rgba(255,195,0,13)', $scope.show.Transportasi);
  };
  //Load geojson
  $scope.loadAllGeojson();
  
  // Filter Layer
  $scope.filterChecked = true;
  $scope.filterChange = function(Kategori, fillColor, checked) {
      $scope.show[Kategori] = checked;
 
      // now remove and reload geojson
      leafletData.getMap().then(function (map) {
          leafletData.getGeoJSON().then(function (geoJSON) {
              // console.log(geoJSON);
              
              if ($scope.show[Kategori]) {
                console.log('reload');
                $scope.loadGeojson(Kategori,fillColor, $scope.show[Kategori]);
              } else {
                console.log('remove');
                map.removeLayer(geoJSON[Kategori]);
              }
              // $scope.loadAllGeojson();
          });
      });
  };

  /**
   * Center map on user's current position
   */
  $scope.locate = function(){

    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        $scope.map.center.lat  = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;
        $scope.map.center.zoom = 16;

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

.controller('cityWatchCtrl', function($scope, Config, $sce, $cordovaGeolocation, $http, leafletMapEvents, leafletData) {
  // Bug leaflet after close modal
  $scope.$on('$ionicView.afterEnter', function() {
    ionic.trigger('resize');
  });

  /**
   * Once state loaded, get put map on scope.
   */
  // $scope.$on("$stateChangeSuccess", function() {

    $scope.data = { filterShow : false};
    var style = {
      top : ($("#cityWatch-button7").position().top - ($("#filterForm").height()+60)) + "px",
    }
    $("#filterForm").css(style);
    $scope.toogle = function(){
      console.log('Toggle');
      console.log($scope.data.filterShow);
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
        // maxZoom: 18,
      },
      center: {
          lat: -6.9003,
          lng: 107.6203,
          zoom: 15
      },
      layers: {
          baselayers: {
              googleRoadmap: {
                  name: 'Streets',
                  layerType: 'ROADMAP',
                  type: 'google'
              },
              googleHybrid: {
                  name: 'Hybrid',
                  layerType: 'HYBRID',
                  type: 'google'
              }, 
          },
          overlays: {           
          },
      },
      geojson: {},
      markers : {},
      events: {
        map: {
          enable: ['click', 'context'],
          logic: 'emit'
        }
      }    
    };

    // Get the layer geojson data from a JSON
    $scope.loadGeojson = function (Kategori, fillColor, show) {
        $http.get("sampledata/geojson/citywatch/"+Kategori+".geojson").success(function(data, status) {
          $scope.map.geojson[Kategori] = {
            data: data,
            filter: function (feature) {
                return show;
            },
            style: {
                  fillColor: fillColor,
                  weight: 1,
                  opacity: 0.4,
                  color: fillColor,
                  fillOpacity: 0.4
            },
            hoverStyle : {
                fillOpacity: 0.6
            },
            onEachFeature: onEachFeature,
            resetStyleOnMouseout: true
          };

          function onEachFeature(feature, layer) {
              layer.on({

                click: function() {
                  layer.bindPopup("<a href='#/menu/zone-detail2/"+feature.properties.kode15+"' class='a-popup'>"+ feature.properties.kategori + "</a>");
                }
              })
            }
      });
    };

    $scope.show = {};
    $scope.show.Campuran_Intensitas_Tinggi = true;
    $scope.show.Industri = true;
    $scope.show.Kantor_Pemerintahan = true;
    $scope.show.Kesehatan = true;
    $scope.show.Pendidikan = true;
    $scope.show.Perdagangan_Jasa_Linear = false;
    $scope.show.Peribadatan = true;
    $scope.show.Perumahan_Kepadatan_Tinggi = false;
    $scope.show.Pusat_Perdagangan_Jasa = true;
    // $scope.show.RTH_Taman_Kota = true;
    // $scope.show.RTNH = true;
    // Load geojson
    $scope.loadAllGeojson = function () {
      $scope.loadGeojson('Campuran_Intensitas_Tinggi','rgba(225,225,225,0)', $scope.show.Kantor_Pemerintahan);
      $scope.loadGeojson('Industri','rgba(150,135,131,5)', $scope.show.Kesehatan);
      $scope.loadGeojson('Kantor_Pemerintahan','rgba(255,139,253,56)', $scope.show.Kantor_Pemerintahan);
      $scope.loadGeojson('Kesehatan','rgba(245,124,0,44)', $scope.show.Kesehatan);
      $scope.loadGeojson('Pendidikan','rgba(245,124,0,44)', $scope.show.Pendidikan);
      // $scope.loadGeojson('Perdagangan_Jasa_Linear','rgba(255,61,0,72)', $scope.show.Perdagangan_Jasa_Linear);
      $scope.loadGeojson('Peribadatan','rgba(255,195,0,13)', $scope.show.Peribadatan);
      // $scope.loadGeojson('Perumahan_Kepadatan_Tinggi','rgba(255,193,7,14)', $scope.show.Perumahan_Kepadatan_Tinggi);
      $scope.loadGeojson('Pusat_Perdagangan_Jasa','rgba(249,0,0,79)', $scope.show.Pusat_Perdagangan_Jasa);
      // $scope.loadGeojson('RTH_Taman_Kota','rgba(85,255,0,-71)', $scope.show.RTH_Taman_Kota);
      // $scope.loadGeojson('RTNH','rgba(85,255,0,-71)', $scope.show.RTNH);
    };
    //Load geojson
    $scope.loadAllGeojson();

  // });
    
  // Filter Layer
  $scope.filterChecked = true;
  $scope.filterChange = function(Kategori, fillColor, checked) {
      $scope.show[Kategori] = checked;
 
      // now remove and reload geojson
      leafletData.getMap().then(function (map) {
          leafletData.getGeoJSON().then(function (geoJSON) {
              // console.log(geoJSON);
              
              if ($scope.show[Kategori]) {
                console.log('reload');
                $scope.loadGeojson(Kategori,fillColor, $scope.show[Kategori]);
              } else {
                console.log('remove');
                map.removeLayer(geoJSON[Kategori]);
              }
              // $scope.loadAllGeojson();
          });
      });
  };

  /**
   * Center map on user's current position
   */
  $scope.locate = function(){

    $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        $scope.map.center.lat  = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;
        $scope.map.center.zoom = 16;

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
  $scope.kegiatan = $stateParams.kegiatan;
  
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
      var zonaKodeClean = zonas[i].Kode.split('.');
      if (zonaKodeClean[0] == $stateParams.kode) {
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
          //TODO: fix R1.1,2,3 di city watch
          var zonaKodeClean = zonas[i].Kode.split('.');
          if (zonaKodeClean[0] == $stateParams.kode) {
            console.log(zonas[i]);

            $scope.detailKegiatan = zonas[i];
            $scope.tatabangunans = zonas[i].TataBangunan.split('<br>');

            $scope.tataBangunanCheck = {};
            for (var j = 0; j < $scope.tatabangunans.length; j++) {
              var key = $scope.tatabangunans[j];
              $scope.tataBangunanCheck[key] = "-1";
            }
            break;
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

  // $scope.kdbCheck = "-1";
  // $scope.klbCheck = "-1";
  // $scope.kdhCheck = "-1";
  // $scope.ketStatusCheck = "-1";
  // $scope.tataBangunanHeadCheck = "-1";
  $scope.kdbCheck = false;
  $scope.klbCheck = false;
  $scope.kdhCheck = false;
  $scope.ketStatusCheck = false;
  $scope.tataBangunanHeadCheck = false;

  $scope.updateCheck = function(item,value) {
    console.log(item + ':' + value);
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
        case 'ketStatus':
            $scope.ketStatusCheck = value;
            break;
        case 'tataBangunan':
            $scope.tataBangunanHeadCheck = value;
            break;
        default:
    }  
  }
  $scope.updateCheckTataBangunan = function(item,value) {
    $scope.tataBangunanCheck[item] = value;

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

.controller('profileCtrl', function($scope) {
  $scope.accountUser = [];
  $scope.accountUser.name = "Iqbal Fajar";
  $scope.accountUser.email = "iqbalfajar@gmail.com";
  $scope.accountUser.address = "Jl. H. Abdul Malik No. 61";
  $scope.accountUser.city = "Tangerang";

})