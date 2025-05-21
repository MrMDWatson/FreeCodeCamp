import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Legend from "./color-legend.js";

export default function AgePopulationChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    
    const width = 928;
    const height = 600;
    const marginTop = 80;
    const marginRight = 10;
    const marginBottom = 40;
    const marginLeft = 60;
  
    // Prepare the scales for positional and color encodings.
    // Fx encodes the state.
    const fx = d3.scaleBand()
        .domain(new Set(data.map(d => d.state)))
        .rangeRound([marginLeft, width - marginRight])
        .paddingInner(0.1);
  
    // Both x and color encode the age class.
    const ages = new Set(data.map(d => d.age));
  
    const x = d3.scaleBand()
        .domain(ages)
        .rangeRound([0, fx.bandwidth()])
        .padding(0.05);
  
    const color = d3.scaleOrdinal()
        .domain(ages)
        .range(d3.schemeSpectral[ages.size])
        .unknown("#ccc");
  
    // Y encodes the height of the bar.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.population)]).nice()
        .rangeRound([height - marginBottom, marginTop]);
  
    // A function to format the value in the tooltip.
    const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")
  
    // Create the SVG container.
    const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    const tooltip = d3.select("#age-population-chart").append('div')
      .style('position', 'absolute')
      .style('background', '#f4f4f4')
      .style('padding', '5px')
      .style('border', '1px solid #d4d4d4')
      .style('border-radius', '5px')
      .style('opacity', 0);

    svg.append("g")
      .attr("transform", "translate(610,40)")
      .append(() => Legend(color, {title: "Age Population", width: 260}));
  
    // Append a group for each state, and a rect for each age.
    svg.append("g")
      .selectAll()
      .data(d3.group(data, d => d.state))
      .join("g")
        .attr("transform", ([state]) => `translate(${fx(state)},0)`)
      .selectAll()
      .data(([, d]) => d)
      .join("rect")
        .attr("x", d => x(d.age))
        .attr("y", d => y(d.population))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.population))
        .attr("fill", d => color(d.age))
        .on('mouseover', (event, d) => {
          tooltip
            .style('left', `${event.pageX + 30}px`)
            .style('top', `${event.pageY - 30}px`)
            .style('opacity', 1)
            .html(`State: ${d.state}<br>Age: ${d.age}<br>Population: ${d.population}`)
        })
          .on('mouseout', () => {
            tooltip.style('opacity', 0);
        });


    // y Axis label
    svg.append("text")
      .attr("font-size", 32)
      .attr("x", "350")
      .attr("y", "30")
      .attr("fill", "black")
      .text("Age Population by State");

    // y Axis label
    svg.append("text")
        .attr("font-size", 16)
        .attr("transform", "rotate(-90)")
          .attr("x", "-330")
        .attr("y", "20")
        .attr("fill", "black")
        .text("Population");

    // x Axis label    
    svg.append("text")
        .attr("font-size", 16)
        .attr("x", "450")
        .attr("y", "600")
        .attr("fill", "black")
        .text("States");        
  
    // Append the horizontal axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(fx).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove());
  
    // Append the vertical axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove());
  
  }, []);

  return (
    <div id='age-population-chart'>
      <svg ref={svgRef}></svg>
    </div>
  )
};
