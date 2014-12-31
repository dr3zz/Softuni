var softUniApp = angular.module('softUniApp', ['ngResource', 'ngRoute'])
	.config(function($routeProvider,$locationProvider) {

		$routeProvider.when('/register', {
			title: 'Ads - Registration',
			templateUrl: 'templates/register.html',
			data: {
				requireLogin: false
			},
			controller : 'LoginController'


		});
		$routeProvider.when('/login', {
			title: 'Ads - Login',
			templateUrl: 'templates/login.html',
			data: {
				requireLogin: false
			},
			controller: 'LoginController'

		});
		$routeProvider.when('/', {
			title: 'Ads - Home',
			templateUrl: 'templates/all-ads.html',
			data: {
				requireLogin: false
			},
			controller: 'MainController'

		});
		$routeProvider.when('/user/home', {
			title: 'Ads - Home',
			templateUrl: 'templates/all-ads.html',
			data: {
				requireLogin: true
			},
			controller: 'MainController',
		});
		$routeProvider.when('/user/ads/publish', {
			title: 'Ads - Publish New ad',
			templateUrl: 'templates/user/user-publish.html',
			data: {
				requireLogin: true
			},
			controller : 'UserController'
			
		});
		$routeProvider.when('/user/profile', {
			title: 'Ads - Edit User Profile',
			templateUrl: 'templates/user/user-edit-profile.html',
			data: {
				requireLogin: true
			},
			controller : 'UserController'
			
		});
		$routeProvider.when('/user/ads', {
			title: 'Ads - My ads',
			templateUrl: 'templates/user/user-ads.html',
			data: {
				requireLogin: true
			},
			controller : 'UserController'
			
		});
		$routeProvider.when('/user/ads/edit/:id', {
			title: 'edit ad',
			templateUrl: 'templates/user/user-edit-ad.html',
			data: {
				requireLogin: true
			},
			controller : 'UserController'
			
		});
		$routeProvider.when('/user/ads/delete/:id', {
			title: "Ads - Delete Ad",
			templateUrl: 'templates/user/user-delete-ad.html',
			data: {
				requireLogin: true
			},
			controller : 'UserController'

		});

		$routeProvider.otherwise({
			title: 'Ads - Home',
			redirectTo: '/'
		});
		// $locationProvider.html5Mode(true);

	}).run(function($location, $rootScope, Auth) {
		$rootScope.page = {
			setTitle: function(title) {
				this.title = title;
			}
		};
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.page.setTitle(current.$$route.title || 'Default Title');

		});
		$rootScope.$on('$routeChangeStart', function(event, next) {

			if (!Auth.isLoggedUser() && next.data.requireLogin) {
				$location.path('/');

			} else if (Auth.isLoggedUser() && !next.data.requireLogin) {
				console.log('already logged');

				$location.path('/user/home');
			}
			// if(Auth.isLoggedUser && next.data.requireLogin) {
			// 	userData.getHeaders();
			// 	console.log('headers');
			// }

		});
	})
	.constant('baseUrl', 'http://localhost:1337/api/')
	.constant('pageSize', 4);