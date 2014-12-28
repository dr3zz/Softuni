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
			title: '',
			redirectTo: '/'
		});

	}).run(function($location, $rootScope, Auth) {
		$rootScope.page = {
			setTitle: function(title) {
				this.title = title;
			}
		}
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.page.setTitle(current.$$route.title || 'Default Title');
			console.log($rootScope.page.title);
			// console.log(current.$$route.title);
			// $rootScope.pageTitle = current.$$route.title;
			// if (!Auth.isLoggedUser()) {
			// 	$location.path('/');
			// }
		});
	})
	.constant('baseUrl', 'http://localhost:1337/api/')
	.constant('pageSize', 4);;