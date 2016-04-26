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
        	return $http.get('sampledata/zona-rumah.json');
    }  	
  }

  return svc;

}])
