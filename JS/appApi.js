
//const stats =[
//    { id: "1",name: 'DarkZero',  TotalPoints: 70},
//    { id: "2",name: 'Furia',  TotalPoints: 85},
//    { id: "3",name: '100Thieves',  TotalPoints: 75},
//    { id: "4",name: 'Fnatic',  TotalPoints: 74},
//    { id: "5",name: 'GMT',  TotalPoints: 69},
//    { id: "6",name: 'SSG',  TotalPoints: 68},
//    { id: "7",name: 'TSM',  TotalPoints: 64},
//    { id: "8",name: 'Alliance',  TotalPoints: 61},
//    { id: "9",name: 'NRG',  TotalPoints: 55},
//    { id: "10",name:'αD',  TotalPoints: 54},
//    { id: "11",name:'SCARZ',  TotalPoints: 53}
//];

//api 
async function getData()
{
    const api_url = "https://mocki.io/v1/c951dc02-f1b7-4f32-ac73-ea7a00ee47e3";
    const api_data = await fetch(api_url);
    const api_json = await api_data.json();
    const stats = api_json.slice(0, 5);
    console.log(stats);


 let selected = stats;

const MARGIN = { top: 50, bottom: 10 };
const WIDTH = 600;
const HEIGHT = 500 - MARGIN.top - MARGIN.bottom ;




const chartContainer = d3.select('svg')
.attr('width', WIDTH)
.attr('height', HEIGHT + MARGIN.top + MARGIN.bottom);

const chart = chartContainer.append('g');

//scales
const xScale = d3.scaleBand().rangeRound([0, WIDTH]). padding(0.1);
const yScale = d3.scaleLinear().range([HEIGHT, 0]);

//domains
xScale.domain(stats.map((d) => d.name));
yScale.domain([0, d3.max(stats, (d)=> d.rate) + 1000]);
  
function render(){
//draw bars
chart.selectAll('.bar')
.data(selected, data => data.id)
.enter()
.append('rect')
.classed('bar', true)
.attr('width',xScale.bandwidth())
.attr('height', data => HEIGHT - yScale(data.rate))
.attr('x', data => xScale(data.name) )
.attr('y',data => yScale(data.rate) )
.attr('fill', '#alalal');


//remove bars

chart.selectAll('.bar')
.data(selected,data => data.id)
.exit()
.remove();

//labels
chart.selectAll('.label')
.data(selected,data => data.id)
.enter()
.append('text')
.text(data => data.rate)
.attr('x', data => xScale(data.name) +(xScale.bandwidth()/2))
.attr('y', data => yScale(data.rate)-100)
.attr('text-anchor', 'middle')
.classed('label', true)
;

//remove label
chart.selectAll('.label')
.data(selected,data => data.id)
.exit()
.remove();
}

//axis
chart.append('g')
.call(d3.axisBottom(xScale).tickSizeOuter(0))
.attr('transform', `translate(0, ${HEIGHT})`)
;

//interactive
render();
let unselected=[];

const teamsList = d3.select('#data')
.select('ul')
.selectAll('li')
.data(stats)
.enter()
.append('li')
;

teamsList.append('span')
.text(data => data.name);

//button
teamsList.append('input')
.attr('type', 'checkbox')
.attr('checked', true)
.on('change', (event, info)=> {
    if(unselected.indexOf(info.id)=== -1){
        unselected.push(info.id);
    }
    else{
        unselected = unselected.filter((id => id !== info.id));
    }
    selected = stats.filter(
        (d)=> unselected.indexOf(d.id) === -1
    )
render();
})

}

getData();
