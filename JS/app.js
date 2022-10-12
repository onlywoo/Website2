//const data =[{name: 'Gibralta',  pickRate: 83.0},
//{name: 'Wattson',  pickRate: 17.0},
//{name: 'Crypto',  pickRate: 5.0},
//{name: 'Caustic',  pickRate: 63.0},
//{name: 'Loba',  pickRate: 4.0},
//{name: 'Horizon',  pickRate: 7.0},
//{name: 'Seer',  pickRate: 18.0},
//{name: 'Fuse',  pickRate: 0.0},
//{name: 'Valkyrie',  pickRate: 98.0},
//{name: 'Lifeline',  pickRate: 0.0},
//{name: 'Newcastle',  pickRate: 5.0}
//];

  async function getData()
{
    const api_url = "https://mocki.io/v1/d51a55e3-ddfc-453e-8d1e-fee8a437b13b";
    const api_data = await fetch(api_url);
    const api_json = await api_data.json();
    const data = api_json;
    console.log(data);


const width = 1200;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, 100])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", 'royalblue')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.pickRate, b.pickRate)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.pickRate))
    .attr('title', (d) => d.pickRate)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.pickRate))
    .attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '20px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].name))
    .attr("font-size", '20px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
}
getData();