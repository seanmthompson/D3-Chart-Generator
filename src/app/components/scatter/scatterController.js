app.controller('ScatterController', function ($scope, $timeout, ChartData) {
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
				var margins = { top: 90, left: 75, right: 30, bottom: 65 };
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
					var x = d3.scale.linear().domain([ $scope.ChartData.scaleLower, $scope.ChartData.scaleUpper]).range([0, adjustedWidth]);
					var y = d3.scale.linear().domain([ $scope.ChartData.scaleLower, $scope.ChartData.scaleUpper]).range([adjustedHeight, 0]);
				} else {
					var x = d3.scale.linear().domain([0, 100]).range([0, adjustedWidth ]); 
					var y = d3.scale.linear().domain([0, 100]).range([adjustedHeight, 0]);					
				}	  						 
				
				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
				    .ticks(10)
				    .tickPadding(15)
				    .tickSize(-(width - margins.left - margins.right));
				    
				var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(5);
				
				chartContainer.append("g")
			       .attr("class", "y axis")
			       .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
			       .call(yAxis);
				
				chartContainer.append("g")
 				   .attr("class", "x axis")
  				   .attr("transform", "translate(" + margins.left + "," + (height - margins.bottom) + ")")
				   .call(xAxis);
				   
				chartContainer.selectAll(".dot")
				      	.data(obj)
					  	.enter().append("circle")					  					  	
					  	.attr("class", "dot")
					  	.style("fill", function(d) { return d.color; })
					  	.attr("r", $scope.ChartData.circleRadius)
					  	.style("stroke-width", 2)
					  	.style("stroke", "#ebebeb")
					  	.attr("cx", function(d) {
						  	return x(d.scatterX) + margins.left; 
						})
					  	.attr("cy", function(d) { 
						  	return y(d.scatterY) + margins.top; 
						})   
				   
				chartContainer.append("text")
				      .attr("class", "chartLabel")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 30)
				      .attr("x", -(height /2))
				      .style("text-anchor", "middle")
				      .text($scope.ChartData.scatter.yTitle)
				      
			    chartContainer.append("text")
			      .attr("class", "chartLabel")
			      .attr("y", function() {
				      if($scope.ChartData.showTradeDress) {
					      return height - 55;
				      } else {
					      return height - 20;
				      }
				   })
			      .attr("x", width / 2)
			      .style("text-anchor", "middle")
			      .text($scope.ChartData.scatter.xTitle);	   
				   
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