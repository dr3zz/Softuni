softUniApp.directive('pagination', [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/pagination/pagination.tpl.html',
        link: function (scope) {
            scope.firstPage = function () {
                scope.adsRequestParams.startPage = 1;
                scope.getAds(scope.adsRequestParams);
                scope.activePage = 1;
            };
            scope.prevPage = function () {
                if (parseInt(scope.adsRequestParams.startPage) > 1) {
                    scope.adsRequestParams.startPage -= 1;
                    scope.activePage -=1;
                }
                scope.getAds(scope.adsRequestParams);
            };

            scope.setStartPage = function (startPage) {
                scope.adsRequestParams.startPage = startPage;
                scope.getAds(scope.adsRequestParams);
                scope.activePage =startPage;
            };

            scope.nextPage = function () {
                if(parseInt(scope.adsRequestParams.startPage)  < scope.pagesArr.length){
                     scope.adsRequestParams.startPage += 1;
                     scope.activePage +=1;
                }
               
                scope.getAds(scope.adsRequestParams);
            };

            scope.lastPage = function (length) {
                scope.adsRequestParams.startPage = length;
                scope.getAds(scope.adsRequestParams);
                scope.activePage = length;

            };
        }
    }
}]);