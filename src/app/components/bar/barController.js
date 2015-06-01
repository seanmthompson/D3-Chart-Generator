app.controller('BarController', function ($scope, $timeout, ChartData) {

	var svg = d3.select("#graph");				
			
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
				var margins = { top: 90, left: 60, right: 30, bottom: 50 };
				var barWidth = (width - margins.left - margins.right) / obj.length;
				var adjustedHeight = height - margins.bottom - margins.top;
				var adjustedWidth = width - margins.left - margins.right;								
				
				svg.attr('height', height);
				svg.attr('width', width);

				var container = svg.select('#svgcontainer')
					    .attr("transform", "translate(" + (width /2) + "," + ((height/2)) + ")");
					    
				container.append("rect")
						 .classed('rect', true)
						 .attr('height', height)
						 .attr('width', width)
						 .attr('y', -(height/2))
						 .attr('x', -(width/2))
						 
				var chartContainer = container.append("g").attr("transform", "translate(" + -(width /2) + "," + -(height/2) + ")");		 
			
				if($scope.ChartData.useScales == 'true') {
					var y = d3.scale.linear().domain([ $scope.ChartData.scaleLower, $scope.ChartData.scaleUpper]).range([adjustedHeight, 0]);
				} else {
					var y = d3.scale.linear().domain([0, 100]).range([adjustedHeight, 0]);
				}	  
						 
				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
				    .ticks(10)
				    .tickPadding(15)
				    .tickSize(-(width - margins.left - margins.right));
				    
				var x = d3.scale.ordinal().rangeBands([0, adjustedWidth ]);   
				x.domain(obj.map(function(d) { return d.text; }));
				var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(5);
				
				chartContainer.append("g")
			       .attr("class", "y axis")
			       .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
			       .call(yAxis);
				
				chartContainer.append("g")
 				   .attr("class", "x axis")
  				   .attr("transform", "translate(" + margins.left + "," + (height - margins.bottom) + ")")
				   .call(xAxis);
				   	  
	    
				chartContainer.selectAll("rect")
							  .data(obj)
							  .enter()
							  .append("rect")
							  .style("fill", function(d) { return d.color; })
							  .attr('x', margins.left)
						      .attr("y", function(d) { return y(d.value) - margins.bottom + margins.top})
						      .attr("height", function(d) { return adjustedHeight - y(d.value); })
						      .attr("width", barWidth/ 2)
						      .attr("transform", function(d, i) { return "translate(" + ((i * barWidth) + (barWidth / 2) - (barWidth/4)) + "," +  margins.bottom + ")"; });       

				
				if($scope.ChartData.errorBars) {
					chartContainer.selectAll(".whisker.whisker-top")
								  .data(obj)
								  .enter()
								  .append("rect")								  
								  .style("fill", "#555555")
								  .classed("whisker", true)
								  .attr("width", barWidth / 6)
								  .attr("y", function(d) { return y(+d.upper) + margins.top })
								  .attr("x", margins.left)
								  .attr("height", 2)
								  .attr("transform", function(d, i) { 
									  return "translate(" + ((i * barWidth) + (barWidth / 2) - (barWidth/12)) + ",0)"; 
								  })
								  
					chartContainer.selectAll(".whisker.whisker-bottom")
								  .data(obj)
								  .enter()			  
								  .append("rect")								  
								  .style("fill", "#555555")
								  .classed("whisker", true)
								  .attr("width", barWidth / 6)
								  .attr("y", function(d) { return y(+d.lower) + margins.top })
								  .attr("x", margins.left)
								  .attr("height", 2)
								  .attr("transform", function(d, i) { 
									  return "translate(" + ((i * barWidth) + (barWidth / 2) - (barWidth/12)) + ",0)"; 
								  })
					
					chartContainer.selectAll(".whisker.error-bar")
						.data(obj)
						.enter()
						.append("rect")						
						.attr("class", "error-bar")
						.classed("whisker", true)
						.style("fill", "#555555")
						.attr("width", 2)
						.attr("x", margins.left)
						.attr("y", function(d) { 
							return y(d.upper) + margins.top;
						})
						.attr("transform", function(d, i) { 	
							var difference = (d.upper + d.lower) / 2;
							return "translate(" + ((i * barWidth) + (barWidth / 2)) + ",0)"; })
						.attr("height", function(d) {
							var upperScale = y(d.upper);
							var lowerScale = y(d.lower);
							return  (lowerScale - upperScale);
					})			  
								  					        
				}

				
				svg.append('defs')
					    .append('pattern')
					    .attr('id', 'diagonalHatch')
					    .attr('patternUnits', 'userSpaceOnUse')
					    .attr('width', 7)
					    .attr('height', 7)
					    .attr('patternTransform', 'rotate(45 0 0)')
					    .append('line')
					    .attr('x1', '0')
					    .attr('y1', '0')
					    .attr('x2', '0')
					    .attr('y2', '7')
					    .attr('stroke', '#ffffff')
					    .attr('stroke-width', 2);
				
				if($scope.ChartData.addTies) {
					chartContainer.selectAll(".ties")
						.data(obj)
						.enter()
						.append("rect")
						.classed('ties', true)
		                .attr('fill', 'url(#diagonalHatch)')
		                .style('opacity', 0.5)
		                .attr("height", function(d) { return adjustedHeight - y(d.ties); })
						.attr('x', margins.left)
						.attr("y", function(d) { return y(d.ties) - margins.bottom + margins.top})
						.attr("width", barWidth/ 2)
						.attr("transform", function(d, i) { return "translate(" + ((i * barWidth) + (barWidth / 2) - (barWidth/4)) + "," +  margins.bottom + ")"; });
				}

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
			
			}, 0)	//end timeout (we use 0, so it happens immediately after digest loop
		}
	}	

});