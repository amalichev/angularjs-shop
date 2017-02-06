'use strict';

/* Controllers */

var shop = angular.module('Shop', ['ngRoute']);

shop.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	// $locationProvider.hashPrefix('');
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});

	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'ProductsCtrl'
		})
		.when('/about', {
			templateUrl: 'templates/about.html',
			controller: 'AboutCtrl'
		})
		.when('/product/:productId', {
			templateUrl: 'templates/view.html',
			controller: 'ProductDetailCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

shop.controller('ProductsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$http.get('products/products.json').then(function(response) {
		$scope.products = response.data;
	});

	$scope.sortField = undefined;
	$scope.reverse = false;

	$scope.sort = function(fieldName) {
		if ($scope.sortField === fieldName) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.sortField = fieldName;
			$scope.reverse = false;
		}
	}

	$scope.isSortUp = function(fieldName) {
		return $scope.sortField === fieldName && !$scope.reverse;
	}

	$scope.isSortDown = function(fieldName) {
		return $scope.sortField === fieldName && $scope.reverse;
	}
}]);

shop.controller('AboutCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

}]);

shop.controller('ProductDetailCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
	$scope.productId = $routeParams.productId;
}]);