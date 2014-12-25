var softUniApp = angular.module('softUniApp', ['ngResource', 'ngRoute', 'angularUtils.directives.dirPagination'])
	.config(function($routeProvider, paginationTemplateProvider) {
		paginationTemplateProvider.setPath('templates/pagination/dirPagination.tpl.html');
		$routeProvider.when('/register', {
			templateUrl: 'templates/register.html'

		});
		$routeProvider.when('/login', {
			templateUrl: 'templates/login.html'

		});
		$routeProvider.when('/ads', {
			templateUrl: 'templates/all-ads.html',

		});
		$routeProvider.otherwise({
			redirectTo: '/ads'
		});

	});