var softUniApp = angular.module('softUniApp', ['ngRoute', 'ngCookies','ui.bootstrap.pagination'])
	.config(function($routeProvider) {
		
		$routeProvider.when('/register', {
			title: 'Ads - Registration',
			templateUrl: 'templates/register.html',
			data: {
				requireLogin: false
			},
			controller: 'RegisterController'


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
			controller: 'PublishAdController'

		});
		$routeProvider.when('/user/profile', {
			title: 'Ads - Edit User Profile',
			templateUrl: 'templates/user/user-edit-profile.html',
			data: {
				requireLogin: true
			},
			controller: 'EditUserProfileController'

		});
		$routeProvider.when('/user/ads', {
			title: 'Ads - My ads',
			templateUrl: 'templates/user/user-ads.html',
			data: {
				requireLogin: true
			},
			controller: 'UserController'

		});
		$routeProvider.when('/user/ads/edit/:id', {
			title: 'Ads - Edit Ad',
			templateUrl: 'templates/user/user-edit-ad.html',
			data: {
				requireLogin: true
			},
			controller: 'EditAdController'

		});
		$routeProvider.when('/user/ads/delete/:id', {
			title: "Ads - Delete Ad",
			templateUrl: 'templates/user/user-delete-ad.html',
			data: {
				requireLogin: true
			},
			controller: 'DeleteAdController'

		});
		$routeProvider.when('/admin/home', {
			title: "admin home",
			templateUrl: 'templates/all-ads.html',
			data: {
				requireLogin: true
			},
			controller: 'MainController'

		});

		$routeProvider.otherwise({
			title: 'Ads - Home',
			redirectTo: '/'
		});
		// $locationProvider.html5Mode(true);

	}).run(function($location, $rootScope, $cookieStore, authentication,authorization, userData) {
		$rootScope.page = {
			setTitle: function(title) {
				this.title = title;
			}
		};
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			var editAdUrl = 'templates/user/user-edit-ad.html';
			var deleteAdUrl = 'templates/user/user-delete-ad.html';
			// console.log($cookieStore);
			if (current.$$route) {
				$rootScope.page.setTitle(current.$$route.title || 'Default Title');
			}

			if ($cookieStore.get('adForEdit') && current.$$route.templateUrl != editAdUrl) {
				$cookieStore.remove('adForEdit');
			}
			if ($cookieStore.get('adForDelete') && current.$$route.templateUrl != deleteAdUrl) {
				$cookieStore.remove('adForDelete');
			}

		});
		$rootScope.$on('$routeChangeStart', function(event, next) {
			if (next.data) {
				if (!authorization.isLoggedUser() && next.data.requireLogin) {
					$location.path('/');

				} else if (authorization.isLoggedUser() && !next.data.requireLogin) {
					$location.path('/user/home');
				}
			}
		});
	})
	.constant('baseUrl', 'http://localhost:1337/api/')
	// .constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/')
	.constant('pageSize', 4);