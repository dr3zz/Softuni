var softUniApp = angular.module('softUniApp', ['ngResource', 'ngRoute'])
	.config(function($routeProvider) {

		$routeProvider.when('/register', {
			title: 'Ads - Registration',
			templateUrl: 'templates/register.html'

		});
		$routeProvider.when('/login', {
			title: 'Ads - Login',
			templateUrl: 'templates/login.html'

		});
		$routeProvider.when('/', {
			title: 'Ads - Home',
			templateUrl: 'templates/all-ads.html',

		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}).run(function($location, $rootScope) {
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.pageTitle = current.$$route.title;
		});
	})
	.constant('baseUrl', 'http://localhost:1337/api/')
	.constant('pageSize', 4);;