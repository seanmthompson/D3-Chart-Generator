app.controller('SidebarController', function ($scope, $state, ChartData, $location, $timeout, $modal) {
	var type = $location.$$path.slice(8);	
	$scope.activeIndex = 1;
	$scope.ChartData = {
		width: 500,
		height: 500,
		//csv: 'Carrier,Tally\nAT&T,50\nVerizon,100',
		innerDonutRadius: 85,
		circleRadius: 8,
		errorBars:false,
		title: 'd3.Js Chart',
		subtitle: 'Chart description can go here',
		scatter: {
			xTitle: 'X',
			yTitle: 'Y'
		},
		values: [
			{ text: 'Company 1', value: 97.5, upper: 98.5, lower: 96.2 , color: '#ca5b59', scatterX: 95, scatterY: 94, ties: 45 },
			{ text: 'Company 2', value: 95.2, upper: 97.2, lower: 93.4, color: '#5694b4', scatterX: 85, scatterY: 84, ties: 35 },			
			{ text: 'Company 3', value: 88.4, upper: 89.8, lower: 87.6, color: '#d45da0', scatterX: 75, scatterY: 74, ties: 25 }, 
			{ text: 'Company 4', value: 76.4, upper: 78.4, lower: 70.3, color: '#e9b444', scatterX: 65, scatterY: 64, ties: 15 }
		],
		useScales: 'false',
		scaleLower: 0,
		scaleUpper: 100,
		addTies: false
	};
	$scope.GraphProperties = {
		Type: [
			{ name: 'Donut',
			  value: 'donut'	
			},
			{ 
				name: 'Bar Chart',
				value: 'bar'
			},
			{
				name: 'Scatterplot',
				value: 'scatter'
			}
		]
	};	

	$scope.sortableOptions = {
    	axis: 'y',
    	placeholder: "ui-state-highlight",
    	handle: '> .dragHandle',
    	update: function(e, ui) {
  		}
  	};
  	
  	$scope.removeItem = function(index) {	  	
		$scope.ChartData.values.splice(index, 1);
  	}
  	
  	$scope.addRow = function() {
	  	$scope.ChartData.values.push({ text: '', value: '', color: '#999' });
  	}
	
	$scope.GraphProperties.SelectedGraphType = type;	
	
	$scope.routeChange = function() {
		var chartType = $scope.GraphProperties.SelectedGraphType.toLowerCase();
		$state.go('charts.' + chartType)
	}
	
	$scope.generateForm = function() {
		//update our Data Service
		ChartData.setData($scope.ChartData);
	}
	
	$scope.colorPicker = function(item) {
		var modalInstance = $modal.open({
	      templateUrl: '/src/app/shared/colorpicker/pickerView.html',
	      controller: 'PickerController',
	      size: 'lg',
	      resolve: {
	        itemColor: function () {
	          return item.color;
	        }
	      }
	    });  
		
	    modalInstance.result.then(function (color) {
	    	item.color = color;
	    });
	   
	}
	
	//load up the first donut chart based on default values
	//in a timeout so we wait til end of first digest loop
	$timeout(function() {
        $scope.generateForm();
    }, 0);

});