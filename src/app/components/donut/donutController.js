app.controller('DonutController', function ($scope, $modal, $timeout, ChartData) {	
	var svg =  d3.select("#graph");		

	$scope.$on('DataSaved', function(event,data) {
    	$scope.ChartData = data;
    	drawGraph();
   	});
	
	function drawGraph() {
		var obj = $scope.ChartData.values;
		
		if(obj.length === 0) {
			$scope.open();
			return;			
			} else {
				$timeout(function() {  // we have to do this in a timeout, because we need the normal angular digest loop to happen before starting DOM changes
			        svg.selectAll('text').remove();
					svg.select('#svgcontainer').selectAll("*").remove();	
					var width = +$scope.ChartData.width;
					var height = +$scope.ChartData.height;
					var margins = { top: 0, left: 30, right: 30, bottom: 40 };
					
					svg.attr('height', height);
					svg.attr('width', width);
					var radius = Math.min(width, height) / 2 - margins.top - margins.bottom;			
									
					var outerRadius = (100 * radius) / 100 - 30;
					var innerRadius = ($scope.ChartData.innerDonutRadius * radius) / 100 - 30;
						
					var arc = d3.svg.arc()
					    .outerRadius(outerRadius)
					    .innerRadius(innerRadius);
					
					var pie = d3.layout.pie()
					    .sort(null)
					    .value(function(d) { return +d.value; });
					
					var container = svg.select('#svgcontainer')
					    .attr("transform", "translate(" + (width /2) + "," + ((height/2) + margins.top) + ")");
					    
					container.append("rect")
						 .classed('rect', true)
						 .attr('height', height)
						 .attr('width', width)
						 .attr('y', -(height/2))
						 .attr('x', -(width/2))  
					
					
					obj.forEach(function(d) {
						d.value = +d.value;
					});
					
					var g = container.selectAll(".arc")
					  .data(pie(obj))
					  .enter().insert("g")
					  .attr("class", "arc")
					  .attr("transform", "translate(0," + 30 + ")");				
					g.insert("path")
					  .attr("d", arc)
					  
					  .style("fill", function(d) { return d.data.color; });	
				  					  					  
					  
					if($scope.ChartData.title !== '') {
						svg.insert('text')
							.text($scope.ChartData.title)
							.classed('proxima-nova-light', true)
							.style('font-size', 24)
							.attr('text-anchor', 'middle')
							.attr('y', 40)
							.classed('title', true)
							.attr('x', function() { return width / 2 })
					}
					
					if($scope.ChartData.subtitle !== '') {
						svg.insert('text')
							.text($scope.ChartData.subtitle)
							.classed('proxima-nova-regular', true)
							.style('font-size', 14)
							.attr('text-anchor', 'middle')
							.attr('y', 60)
							.classed('subtitle', true)
							.attr('x', function() { return width / 2 })
					} 
			    }, 0);	//end timeout (we use 0, so it happens immediately after digest loop
			}				
	}
	
	$scope.open = function () {
	    var modalInstance = $modal.open({
	      templateUrl: '/src/app/shared/modal/modalView.html',
	      controller: 'ModalController'
	    });
	};
});