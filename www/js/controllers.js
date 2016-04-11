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
