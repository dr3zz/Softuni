softUniApp.directive('filtercategories', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/layouts/filter-category.html',
        require: 'filtercontroller',
        link: function(scope, element, attrs, filterController) {
            scope.selectedCategory = function(category) {
                filterController.addCategory(category);
            };
        }
    };
}]);