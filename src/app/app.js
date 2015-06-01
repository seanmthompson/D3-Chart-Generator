'use strict';

var app = angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'ui.sortable',
  'ngAnimate'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('charts', {
        url: '/charts',
        abstract: true,
        controller: 'ParentController',        
        views: {
	        'sidebar': {
		        templateUrl: 'src/app/shared/sidebar/sidebarView.html',
		        controller: 'SidebarController'
	        },
	        'charts': {
		        controller: 'ChartsController',
				templateUrl: 'src/app/components/charts/chartsView.html',
	        }
        }
    })

    .state('charts.donut', {
        url: '/donut',
        templateUrl: 'src/app/components/donut/donutView.html',
        controller: 'DonutController'
    })
    .state('charts.bar', {
		url: '/bar',
  		templateUrl: 'src/app/components/bar/barView.html',
  		controller: 'BarController'
  	})
  	.state('charts.scatter', {
		url: '/scatter',  
  		templateUrl: 'src/app/components/scatter/scatterView.html',
  		controller: 'ScatterController'
  	})
  
  $urlRouterProvider.when('', 'charts/donut');
  $urlRouterProvider.otherwise('charts/donut');	        
//  $locationProvider.html5Mode(true).hashPrefix('!'); 

}); //end of config


app.factory('ChartData', ['$rootScope', function($rootScope) {
	var ChartData;
	
	return {
        getData: function () {
            return ChartData;
        },
        setData: function (data) {	        
            ChartData = data;
            $rootScope.$broadcast('DataSaved',ChartData);
        }
    };	
}]);



//random helper functions
function replaceAll(str, find, replace) {
  var i = str.indexOf(find);
  if (i > -1){
    str = str.replace(find, replace); 
    i = i + replace.length;
    var st2 = str.substring(i);
    if(st2.indexOf(find) > -1){
      str = str.substring(0,i) + replaceAll(st2, find, replace);
    }       
  }
  return str;
}