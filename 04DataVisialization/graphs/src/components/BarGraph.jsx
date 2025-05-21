import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import "./barGraph.css";

const Scatterplot = ({ graphData }) => {
  const svgRef = useRef();
  

  useEffect(() => {

    const dateArray = graphData.map((d) => {
      return new Date(d[0]);
    });
    const gdpArray = graphData.map((d) => d[1]);
    const yMax = d3.max(gdpArray);
    const yMin = d3.min(gdpArray);
    const xMax = d3.max(dateArray);
    const xMin = d3.min(dateArray);
    const barWidth = 4;
    //const height = 600;
    //const width = graphData.length * barWidth;
    const padding = 20;
    // Declare the x (horizontal position) scale.

    const svg = d3.select(svgRef.current)
      .attr("viewbox", "0 0 300 600");

    const width = +svg.attr("width") - padding - padding;
    const height = +svg.attr("height") - padding - padding;

    const xScale = d3.scaleUtc()
      .domain([xMin, xMax])
      .range([padding, width - padding]);
    // Declare the y (vertical position) scale.
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height - padding, padding]);
    // Add tooltip
    // Add chart to div
    const tooltip = svg.append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);
    // Add bars
    svg.selectAll("rect")
      .data(graphData)
      .enter()
      .append("rect")
      .attr("data-gdp", (d) => d[1])
      .attr("data-date", (d) => d[0])
      .attr("width", barWidth)
      .attr("height", (d) => height - yScale(d[1]) - padding)
      .attr("x", (d, i) => (((width - (padding * 2)) / graphData.length) * i) + padding)
      .attr("y", (d, i) => yScale(d[1]))
      .attr("class", "bar")
      .on("mousemove", (event, d) => {
        tooltip.style("opacity", 0.9);
        tooltip
          .html(d[0] + `<br /> GDP: ` + d[1])
          .attr("data-date", d[0])
          .attr("z-index", 999)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 60 + "px")
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
    // 
    svg.append("text")
      .attr("font-size", 16)
      .attr("transform", "rotate(-90)")
        .attr("x", "-250")
      .attr("y", "30")
      .attr("fill", "black")
      .text("GDP");
    
    // Add the x-axis.
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height - padding})`)
      .call(d3.axisBottom(xScale));
    // Add the y-axis.
    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .call(d3.axisLeft(yScale));
  

    

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Scatterplot;
