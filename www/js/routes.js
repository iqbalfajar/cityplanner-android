angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'splashCtrl'
    })

    .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('menu.cityBuilder', {
    url: '/citybuilder',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cityBuilder.html',
        controller: 'cityBuilderCtrl'
      }
    }
  })

  .state('menu.cityWatch', {
    url: '/citywatch',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cityWatch.html',
        controller: 'cityWatchCtrl'
      }
    }
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('menu.detailZona', {
    url: '/zone-detail',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detailZona.html',
        controller: 'detailZonaCtrl'
      }
    }
  })

  .state('menu.detailZona2', {
    url: '/zone-detail2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detailZona2.html',
        controller: 'detailZona2Ctrl'
      }
    }
  })

  .state('menu.formLaporanPelanggaran', {
    url: '/report-form',
    views: {
      'side-menu21': {
        templateUrl: 'templates/formLaporanPelanggaran.html',
        controller: 'formLaporanPelanggaranCtrl'
      }
    }
  })

  .state('menu.formLaporanPelanggaran2', {
    url: '/report-form2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/formLaporanPelanggaran2.html',
        controller: 'formLaporanPelanggaranCtrl'
      }
    }
  })

  .state('menu.map', {
    url: '/map',
    views: {
      'side-menu21': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/splash')



});
