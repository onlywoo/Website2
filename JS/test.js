const margin = {top: 20, right: 30, bottom: 0, left: 10},
    width = 750 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/onlywoo/datavis/main/Convert.csv").then(function(data) {

  // List of groups = header of the csv files
  const keys = data.columns.slice(1)

  // Add X axis
  const x = d3.scaleLinear()
  .domain(d3.extent(data, function(d) { return d.Match; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height*0.9})`)
    .call(d3.axisBottom(x).tickSize(-height*.8).tickValues([1, 2, 3, 4.5,6,7,8,9,10]))
    .select(".domain").remove()
  // Customization
  svg.selectAll(".tick line").attr("stroke", "black")

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width - 300)
      .attr("y", height-30 )
      .text("Match");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([-500, 500])
    .range([ 0, 650 ]);
  // color palette
  const color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemePaired);

  //stack the data?
  const stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)

  // create a tooltip
  const Tooltip = svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("font-size", 17)


  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event,d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  const mousemove = function(event,d,i) {
    grp = d.key
    Tooltip.text(grp)
  }
  const mouseleave = function(event,d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
   }

  // Area generator
  const area = d3.area()
    .x(function(d) { return x(d.data.Match); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .join("path")
      .attr("class", "myArea")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      


      
})