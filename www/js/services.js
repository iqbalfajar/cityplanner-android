angular.module('app.services', [])

.factory('BackendService', ['$http', function ($http) {

  var svc = {};

  svc.getZonaKegiatan = function(kegiatan){
  	switch (kegiatan) {
        case 'rumah':
            return $http.get('sampledata/zona-rumah.json');
            break;
        case 'hotel':
            return $http.get('sampledata/zona-hotel.json');
            break;
        case 'minimarket':
            return $http.get('sampledata/zona-minimarket.json');
            break;
        default:
        	return $http.get('sampledata/zona-all.json');
    }  	
  }

  return svc;

}])

.factory('Config', function () {

  // var mapbox_host = 'http://localhost/cityplanner-web/public';
  var mapbox_host = 'http://cityplanweb.herokuapp.com';

  return {
      getUrlZonaRumah: function () {
          return mapbox_host + '/examples/show/mapbox-gljs-rumah';
      },
      getUrlZonaHotel: function () {
          return mapbox_host + '/examples/show/mapbox-gljs-hotel';
      },
      getUrlZonaMinimarket: function () {
          return mapbox_host + '/examples/show/mapbox-gljs-rumah';
      },
      getUrlZonaAll: function () {
          return mapbox_host + '/examples/show/mapbox-gljs-zona';
      },
  };

});
