var softUniApp = angular.module('softUniApp', ['ngResource', 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider.when('/register', {
			templateUrl: 'templates/register.html'
			
		});
		$routeProvider.when('/login', {
			templateUrl: 'templates/login.html'
			
		});
		$routeProvider.when('/ads',{
			templateUrl: 'templates/all-ads.html'
		});
		$routeProvider.otherwise({ redirectTo: '/ads' });
		
	});


