//we import d3 everything necessary to carry out the practice
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { avgTemp } from "./barchart.data";
import {extent} from "d3-array"
import {axisBottom,axisLeft} from "d3-axis"

//We define all the necessary constants to create the drawing cards with their corresponding dimensions
const d3 = {
  select, selectAll, scaleBand, scaleLinear, extent, axisBottom ,axisLeft
};

const width = 500;
const height = 300;
const padding = 50;

const card = select("#root")
  .append("div")
    .attr("class", "card");

const svg = card
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`);

//We create the scales for the axis x and y
const scaleYPos = scaleLinear() 
    .domain(d3.extent(avgTemp))
    .range([height, 0]);

const scaleXPos = d3.scaleBand<number>()
    .domain(Array(12).fill(0).map((d,i)=>i+1))
    .range([0, width]) // use RangeRound to get pixel perfect layout
    .paddingInner(0.05); // space between bars, wathout! percentages values, range number 0..1

//Una vez creadas las escalas ya podemos empezar a dibujar las barras con gradientes
// de color desde menor a mayor temperatura y le añadimos los ejes correspondientes junto a dos títulos
const barGroup = svg
    .append('g');

const barPadding =5;
const barWidth=(width/avgTemp.length);

const gradient = svg
  .append("defs")
    .append("linearGradient")
      .attr("id", "barGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0")
      .attr("y1", height)
      .attr("x2", "0")
      .attr("y2", "0");
gradient
  .append("stop")
    .attr("offset", "0")
    .attr("stop-color", "#185a9d");
gradient
  .append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#ff9900");
gradient
  .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#dc3912");

barGroup
    .selectAll("rect")
    .data(avgTemp)
    .enter()
    .append("rect")
    .attr("x", (d,i) => scaleXPos(i+1))
    .attr("y", d => scaleYPos(d))
    .attr("width", barWidth-barPadding)
    .attr("height",d => height - scaleYPos(d))
    .attr("fill", "url(#barGradient)");

svg.append("g")
    .attr("transform", "translate(0,"+ height +")")
    .call(d3.axisBottom( scaleXPos));
   
svg.append("g")
  .call(d3.axisLeft(scaleYPos));


svg.append("text") 
  .attr("class", "x") 
  .attr("text-anchor", "end") 
  .attr("x", width -180) 
  .attr("y", height + 35) 
  .text("Months of the year 2018"); 

svg.append("text") 
  .attr("class", "y") 
  .attr("text-anchor", "end") 
  .attr("y", -40) 
  .attr("x", -40)
  .attr("dy", ".200em") 
  .attr("transform", "rotate(-90)") 
  .text("Average Temperatures (ºC)"); 


