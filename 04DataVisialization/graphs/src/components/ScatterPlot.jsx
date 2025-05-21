import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Scatterplot = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { x: 30, y: 20 },
      { x: 50, y: 90 },
      { x: 80, y: 50 },
      { x: 90, y: 80 },
      { x: 200, y: 40 },
    ];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr("viewbox", `0 0 300 600`);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Scatterplot;
