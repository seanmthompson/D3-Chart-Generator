app.controller('PickerController', function ($scope, $modalInstance, itemColor) {
	$scope.showCarrierColors = true;
	$scope.brandColors = [
		{ 
			name: 'Brand Blue',
			hex: '#276681'
		},
		{ 
			name: 'Brand Green',
			hex: '#66b245'
		},	
		{ 
			name: 'Brand Blue Desaturated',
			hex: '#417c95'
		},
		{ 
			name: 'Brand Green Desaturated',
			hex: '#75b86f'
		},
		{ 
			name: 'Bluest',
			hex: '#5baebf'
		},
		{ 
			name: 'Blue',
			hex: '#66b7bb'
		},
		{ 
			name: 'Blue Green',
			hex: '#76beb6'
		},
		{ 
			name: 'Green Blue',
			hex: '#84c6ae'
		},
		{ 
			name: 'Green',
			hex: '#96cca7'
		},
		{ 
			name: 'Greenest',
			hex: '#a4d49a'
		},
		{ 
			name: 'Level 2 Blend',
			hex: '#7fced8'
		},
		{ 
			name: 'Level 2 Blend',
			hex: '#8fd4d6'
		},
		{ 
			name: 'Level 2 Blend',
			hex: '#a5d7d3'
		},
		{ 
			name: 'Level 2 Blend',
			hex: '#b5dcce'
		},
		{ 
			name: 'Level 2 Blend',
			hex: '#bfe0ca'
		},
		{ 
			name: 'Level 2 Blend',
			hex: '#c8e5c2'
		},
		{ 
			name: 'Level 3 Blend',
			hex: '#b0e2e7'
		},
		{ 
			name: 'Level 3 Blend',
			hex: '#bce5e6'
		},
		{ 
			name: 'Level 3 Blend',
			hex: '#c8e6e4'
		},
		{ 
			name: 'Level 3 Blend',
			hex: '#d3eae2'
		},
		{ 
			name: 'Level 3 Blend',
			hex: '#d8ecdf'
		},
		{ 
			name: 'Level 3 Blend',
			hex: '#ddefda'
		},
		{ 
			name: 'Illustration Stroke Darkest',
			hex: '#54636a'
		},
		{ 
			name: 'Illustration Stroke Medium',
			hex: '#7f8a8f'
		},
		{ 
			name: 'Illustration Stroke Light',
			hex: '#a9b1b4'
		},
		{ 
			name: 'Illustration Stroke Lightest',
			hex: '#d4d8da'
		},
		{ 
			name: 'Yellow',
			hex: '#f5db77'
		},
		{ 
			name: 'Medium Yellow',
			hex: '#f8e499'
		},
		{ 
			name: 'Light Yellow',
			hex: '#faedbb'
		},
		{ 
			name: 'Lightest Yellow',
			hex: '#fdf6dd'
		},
		{ 
			name: 'Tang',
			hex: '#f38871'
		},
		{ 
			name: 'Medium Tang',
			hex: '#f7a593'
		},
		{ 
			name: 'Light Tang',
			hex: '#fbc1b4'
		},
		{ 
			name: 'Lightest Tang',
			hex: '#ffded6'
		},
		{ 
			name: 'Black',
			hex: '#555555'
		},
		{ 
			name: 'Dark Gray',
			hex: '#797979'
		},
		{ 
			name: 'Medium Gray',
			hex: '#9c9c9c'
		},
		{ 
			name: 'Light Gray',
			hex: '#c0c0c0'
		},
		{ 
			name: 'Lightest Gray',
			hex: '#e3e3e3'
		},
		{ 
			name: 'Off White',
			hex: '#f9f9f9'
		}
	];
	$scope.carrierColors = [
		{ 
			carrier: 'Verizon',
			hex: '#ca5b59'
		},
		{ 
			carrier: 'AT&T',
			hex: '#5694b4'
		},
		{ 
			carrier: 'T-Mobile',
			hex: '#d45da0'
		},
		{ 
			carrier: 'Sprint',
			hex: '#e9b444'
		},
		{ 
			carrier: 'Cricket',
			hex: '#008752'
		},
		{ 
			carrier: 'Cricket',
			hex: '#439474'
		},
		{ 
			carrier: 'MetroPCS',
			hex: '#6764b3'
		},
		{ 
			carrier: 'EE',
			hex: '#2e9a9c'
		},
		{ 
			carrier: 'O2',
			hex: '#2566a8'
		},
		{ 
			carrier: 'Orange',
			hex: '#ff6c42'
		},
		{ 
			carrier: 'Three',
			hex: '#333333'
		},
		{ 
			carrier: 'Vodafone',
			hex: '#eb5247'
		},
		{ 
			carrier: 'Bell',
			hex: '#2876a5'
		},
		{ 
			carrier: 'Leap',
			hex: '#330066'
		},
		{ 
			carrier: 'Rogers',
			hex: '#d63e3e'
		},
		{ 
			carrier: 'Telus',
			hex: '#4e5cb5'
		},
		{ 
			carrier: 'Videotron',
			hex: '#fcc622'
		},
		{ 
			carrier: 'Wind',
			hex: '#ec7c23'
		},
		{ 
			carrier: 'Tie',
			hex: '#999999'
		}
		
	]
  $scope.ok = function () {
    $modalInstance.close(itemColor);
  };
  
  $scope.closeModal = function(color) {
	  $modalInstance.close(color);
  }
});