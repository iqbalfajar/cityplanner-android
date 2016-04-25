angular.module('app.services', [])

// .factory('BlankFactory', [function(){

// }])

// .service('BlankService', [function(){

// }]);

.factory('BackendService', ['$http', function ($http) {

  var svc = {};

  svc.getZonaByKodeKegiatan = function(){
  	return $http.get('sampledata/zonakegiatan.json');
  }

  return svc;

}])
