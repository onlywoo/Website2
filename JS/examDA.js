
const margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 1500 - margin.left - margin.right,
height = 750 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#Exam_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",`translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then( function(data) {

// Add X axis
const x = d3.scaleLinear()
.domain([20, 200])
.range([ 0, width ]);
const xAxis = svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x).ticks(55));

// Add Y axis
const y = d3.scaleLinear()
.domain([40, 1])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y).ticks(35));

// Add dots
svg.append('g')
.selectAll("dot")
.data(data)
.join("circle")
  .attr("cx", function (d) { return x(d.Sepal_Length); } )
  .attr("cy", function (d) { return y(d.Petal_Length); } )
  .attr("r", 5)
  .style("fill", "#69b3a2" )


// A function that update the plot for a given xlim value
function updatePlot() {

// Get the value of the button
xlim = this.value

// Update X axis
x.domain([3,xlim])
xAxis.transition().duration(1000).call(d3.axisBottom(x))

// Update chart
svg.selectAll("circle")
   .data(data)
   .transition()
   .duration(1000)
   .attr("cx", function (d) { return x(d.Sepal_Length); } )
   .attr("cy", function (d) { return y(d.Petal_Length); } )
}

// Add an event listener to the button created in the html part
d3.select("#buttonXlim").on("input", updatePlot )



})
