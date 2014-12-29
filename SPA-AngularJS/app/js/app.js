var softUniApp = angular.module('softUniApp', ['ngResource', 'ngRoute'])
	.config(function($routeProvider) {

		$routeProvider.when('/register', {
			title: 'Ads - Registration',
			templateUrl: 'templates/register.html',
			data: {
				requireLogin: false
			}

		});
		$routeProvider.when('/login', {
			title: 'Ads - Login',
			templateUrl: 'templates/login.html',
			data: {
				requireLogin: false
			}

		});
		$routeProvider.when('/', {
			title: 'Ads - Home',
			templateUrl: 'templates/all-ads.html',
			data: {
				requireLogin: false
			}

		});
		$routeProvider.when('/user/home', {
			title: 'Ads - Home',
			templateUrl: 'templates/user/home.tpl.html',
			data: {
				requireLogin: true
			}
		});
		$routeProvider.when('/user/ads/publish', {
			title: 'Ads - Publish New ad',
			templateUrl : 'templates/user/publish.tpl.html',
			data : {
				requiredLogin : true
			}
		});

		$routeProvider.otherwise({
			title: '',
			redirectTo: '/'
		});

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
			}
			
		});
	})
	.constant('baseUrl', 'http://localhost:1337/api/')
	.constant('pageSize', 4);