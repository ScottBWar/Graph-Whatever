var myApp = angular.module('myApp', []);



myApp.controller('MyController', function MyController($scope, $http) {


    $scope.stats = [{
        'label': 'Item 1',
        'value': 12,
        'color': '#c0392b'
    }, {
        'label': 'Item 2',
        'value': 10,
        'color': '#f39c12'
    }, {
        'label': 'Item 3',
        'value': 8,
        'color': '#9b59b6'
    }, {
        'label': 'Item 4',
        'value': 6,
        'color': '#2980b9'
    }, {
        'label': 'Item 5',
        'value': 4,
        'color': '#2ecc71'
    }];

    $scope.removeField = function(stat){
        var index = $scope.stats.indexOf(stat);
        $scope.stats.splice(index, 1);
    };

    $scope.createField = function(){
        var newField = {
            'label':'new item',
            'value':1,
            'color':'#'+ Math.floor(Math.random()*16777215).toString(16)
        };

        $scope.stats.push(newField);
    };



    $scope.toggle = false;

    $scope.toggleStyle = function(){
        if(!$scope.toggle){
            $scope.toggle = true;
        }
        else{
            $scope.toggle = false;
        }
    };
});


myApp.directive('pieChart', function($window) {
    return {
        restrict: 'EA',
        // replace:true,
        link: function(scope, elem, attrs) {

            scope.$watch('stats', function() {
                drawPieChart();
            }, true);


            function drawPieChart() {

                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];

                var colors = [];

                for (var a = 0; a < dataset.length; a++) {
                    colors.push(dataset[a].color);
                }

                var labels = [];

                for (var b = 0; b < dataset.length; b++) {
                    labels.push(dataset[b].label);
                }


                var legendRectSize = 12;
                var legendSpacing = 4;

                var width = 360;
                var height = 180;
                var radius = Math.min(width, height) / 2;

                var svg = bodySelection
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

                var arc = d3.svg.arc()
                    .outerRadius(radius);

                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d.value;
                    })
                    .sort(null);

                var path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d) {
                        return d.data.color;
                    })

                var legend = svg.selectAll('.legend')
                    .data(colors)
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        var height = legendRectSize + legendSpacing;
                        var offset = height * colors.length / 2;
                        var horz = 8 * legendRectSize;
                        var vert = i * height - offset;
                        return 'translate(' + horz + ',' + vert + ')';
                    });


                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', function(d, i) {
                        return colors[i]
                    })
                    .style('stroke', function(d, i) {
                        return colors[i]
                    });


                legend.append('text')
                    .data(labels)
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function(d) {
                        return d;
                    });

            }
        }
    };
});

myApp.directive('donutChart', function($window) {
    return {
        restrict: 'EA',
        // replace:true,
        link: function(scope, elem, attrs) {

            scope.$watch('stats', function() {
                drawDonutChart();
            }, true);


            function drawDonutChart() {
                console.log("mmm.. donuts")
                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];

                var colors = [];

                for (var a = 0; a < dataset.length; a++) {
                    colors.push(dataset[a].color);
                }

                var labels = [];

                for (var b = 0; b < dataset.length; b++) {
                    labels.push(dataset[b].label);
                }



                //reverse dataset on second graph just looks a little better...
                function reverseDataset() {
                    var retData = new Array;
                    for (var i = dataset.length - 1; i >= 0; i--) {
                        retData.push(dataset[i]);
                    }
                    return retData;
                }
                //
                var legendRectSize = 12;
                var legendSpacing = 4;

                var retData = reverseDataset();

                var width = 360;
                var height = 180;
                var radius = Math.min(width, height) / 2;
                var centerWidth = 30;

                var svg = bodySelection
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

                var arc = d3.svg.arc()
                    .innerRadius(radius - centerWidth)
                    .outerRadius(radius);

                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d.value;
                    })
                    .sort(null);

                var path = svg.selectAll('path')
                    .data(pie(retData))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d) {
                        return d.data.color;
                    });

                var legend = svg.selectAll('.legend')
                    .data(colors)
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        var height = legendRectSize + legendSpacing;
                        var offset = height * colors.length / 2;
                        var horz = -2 * legendRectSize;
                        var vert = i * height - offset;
                        return 'translate(' + horz + ',' + vert + ')';
                    });


                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', function(d, i) {
                        return colors[i]
                    })
                    .style('stroke', function(d, i) {
                        return colors[i]
                    });


                legend.append('text')
                    .data(labels)
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function(d) {
                        return d;
                    });


            }
        }
    };
});

myApp.directive('barsChart', function($window) {
    return {
        restrict: 'EA',
        // replace:true,
        link: function(scope, elem, attrs) {

            scope.$watch('stats', function() {
                drawBarsChart();
            }, true);


            function drawBarsChart() {
                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];






            }
        }
    };
});