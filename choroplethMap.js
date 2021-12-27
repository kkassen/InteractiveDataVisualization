/*Author: Kyle Arick Kassen
**Reference: Interactive Data Visualization for the Web,
       2nd Edition, Scott Murray, Chapters 14 ** */

var choroplethMapViz = function () {
    var newChoropleth = {
        drawChoroplethMap: function drawChoroplethMap() {
                var width = 1060;
                var height = 500;

            var svg = d3.select("#uno")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

            var projection = d3.geoAlbersUsa()
                .translate([10, 10]);

            var path = d3.geoPath(projection)

            var color = d3.scaleQuantile()
                .domain([84,130])
                .range(['#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525']);

            var panAndZoom = function () {
                var delta = [d3.event.transform.x, d3.event.transform.y];
                var scaler = d3.event.transform.k * 5000;
                projection.translate(delta)
                    .scale(scaler);
                svg.selectAll("path")
                    .attr("d", path);
            }

            var zoom = d3.zoom()
                .scaleExtent([0.20, 1.5])
                .translateExtent([[-3500, -3500], [3500, 3500]])
                .on("zoom", panAndZoom);

            var position = projection([-100.0, 38.0]);

            var map = svg.append("g")
                .attr("id", "map")
                .call(zoom)
                .call(zoom.transform, d3.zoomIdentity
                    .translate(width/2, height/2)
                    .scale(0.20)
                    .translate(-position[0], -position[1]));

                d3.csv("data.csv", function (data) {

                    d3.json("us-states.json", function (json) {
                        for (var i = 0; i < data.length; i++) {
                            var dataState = data[i].state;
                            var dataValue = parseFloat(data[i].value);
                            for (var j = 0; j < json.features.length; j++) {
                                var jsonState = json.features[j].properties.name;
                                if (dataState == jsonState) {
                                    json.features[j].properties.value = dataValue;
                                }
                            }
                        }
                        arr = [];
                        function click(data) {
                            if (!d3.select(this).classed("selected")) {
                                d3.select(this).style("stroke", "#a117fe").classed("selected", true).on("mouseout", false).on("mouseover", false)
                                    .on(newChoropleth.dispatch.call("este", arr.push(data.properties.name)))
                            } else {
                                d3.select(this).classed("selected", false).on("mouseover", function () {
                                    d3.select(this).style("opacity", .8).style("stroke-width", 4)
                                        .style("stroke", "#a117fe");
                                })
                                    .on("mouseout", function () {
                                        d3.select(this).style("opacity", 1)
                                            .style("stroke-width", 0.4)
                                            .style("stroke", "#000000")
                                    })
                                arr1 = arr.pop();
                                filterArray = rectArray.filter((group) => arr1.includes(group.group))
                                d3.selectAll("rect").data(filterArray,function(d){
                                 return d.group + ':' + d.variable}).style("stroke-width", 2).style("stroke", "slategrey").style("opacity", .9)
                            }
                        }

                        map.selectAll("path")
                            .data(json.features)
                            .enter()
                            .append("path")
                            .attr("d", path)
                            .style("fill", function (d) {
                                return color(d.properties.value);
                            })
                            .on("mouseover", function () {
                                d3.select(this).style("opacity", .8).style("stroke-width", 4)
                                    .style("stroke", "#a117fe")
                            })
                            .on("mouseout", function () {
                                d3.select(this).style("opacity", 1)
                                    .style("stroke-width", 0.4)
                                    .style("stroke", "#000000")
                            })
                            .on("click",click)
                    });

                });
        },
        dispatch: d3.dispatch("este")
        //close function
    }//close object creation
    return newChoropleth;
}//close outer function wrapper
