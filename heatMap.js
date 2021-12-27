/*<!-- REFERENCE: https://www.d3-graph-gallery.com/graph/heatmap_style.html -->*/

var heatMapViz = function() {

    var newHeatMap = {
        drawHeatMap: function drawHeatMap(svg,data) {
            // set the dimensions and margins of the graph
            var margin = {top: 80, right: 25, bottom: 30, left: 40},
                width = 1060 - margin.left - margin.right,
                height = 360 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            var svg = d3.select("#dos").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

           d3.csv("tempState3.csv", function (data) {


                var myGroups = d3.map(data, function (d) {
                    return d.group;
                }).keys()

                var myVars = d3.map(data, function (d) {
                    return d.variable;}).keys()


                var x = d3.scaleBand()
                    .range([0, width])
                    .domain(myGroups)
                    .padding(0.05);
                svg.append("g")
                    //.style("font-size", 15)
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).tickSize(0))
                    .select(".domain").remove()


                var y = d3.scaleBand()
                    .range([height, 0])
                    .domain(myVars)
                    .padding(0.05);
                svg.append("g")
                    //.style("font-size", 15)
                    .call(d3.axisLeft(y).tickSize(0))
                    .select(".domain").remove()


                var myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateRdYlBu)
                    //.interpolator(d3.interpolateInferno)
                    .domain([100,1])


                var tooltip = d3.select("#dos")
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px")
                    .style("font-size", "200%")
                    .style("font-family", "dubai")


                var mouseover = function (d) {
                    tooltip
                        .style("opacity", 1)
                    d3.select(this)
                        .style("stroke", "black")
                        .style("opacity", 1)
                }
                var mousemove = function (d) {
                    tooltip
                        .html("Temperature: " + d.value)
                        .style("position","absolute")
                        .style("left", "70px")
                        .style("bottom", "-200px")
                }
                var mouseleave = function (d) {
                    tooltip
                        .style("opacity", 0)
                    d3.select(this)
                        .style("stroke", "slategrey")
                        .style("opacity", .9)
                }

                svg.selectAll()
                    .data(data, function (d) {
                        return d.group + ':' + d.variable;
                    })
                    .enter()
                    .append("rect")
                    .attr("x", function (d) {
                        return x(d.group)
                    })
                    .attr("y", function (d) {
                        return y(d.variable)
                    })
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth())
                    .style("fill", function (d) {
                        return myColor(d.value)
                    })
                    .style("stroke-width", 2)
                    .style("stroke", "slategrey")
                    .style("opacity", .9)
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)

            })
        }//close function
    }//close object creation
    return newHeatMap;
};//close outer function wrapper
