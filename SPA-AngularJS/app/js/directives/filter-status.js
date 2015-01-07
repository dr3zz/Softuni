softUniApp.directive('filterAdStatus', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/user/includes/user-filterads.html',
        require : 'filtercontroller',
        link: function(scope,element,attrs,filterController) {
            scope.selectAdStatus = function (status) {
            	filterController.addUserAdsStatus(status);
            }
           
        }
    };
	}]);