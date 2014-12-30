softUniApp.directive('filtertowns', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/layouts/filter-towns.html',
        require: 'filtercontroller',
        link: function(scope, element, attrs, filterController) {
            scope.selectedTown = function(town) {
                filterController.addTown(town);
            };
        }
    };
}]);