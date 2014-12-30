softUniApp.directive('pagination', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/pagination/pagination.tpl.html',
        require : 'filtercontroller',
        link: function(scope,element,attrs,filterController) {
          
           scope.firstPage = function () {
               filterController.firstPage();
           };
           scope.prevPage = function () {
               filterController.prevPage();
           };
           scope.setStartPage = function (startpage) {
               filterController.setStartPage(startpage);
           };
           scope.nextPage = function () {
               filterController.nextPage();
           };
           scope.lastPage = function (lenght) {
               filterController.lastPage(lenght);
           };
        }
    };
}]);