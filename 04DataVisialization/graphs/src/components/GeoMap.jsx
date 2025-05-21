import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson";
import Legend from "./color-legend";
import data from "../stateData.json";
import us from "../us.json";
import "./geoMap.css";

export default function GeoMap() {
  const svgRef = useRef();
  useEffect(() => {
    const color = d3.scaleQuantize([1, 10], d3.schemeReds[9]);
    const path = d3.geoPath();
    const format = d => `${d}%`;
    const valuemap = new Map(data.map(d => [d.id, d.rate]));
    const counties = topojson.feature(us, us.objects.counties);
    const states = topojson.feature(us, us.objects.states);
    const statemap = new Map(states.features.map(d => [d.id, d]));
    const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
    const svg = d3.select(svgRef.current)
      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");
    svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => Legend(color, {title: "Unemployment rate (%)", width: 260}));
    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
        .attr("fill", d => color(valuemap.get(d.id)))
        .attr("d", path)
      .append("title")
        .html(d => `${d.properties.name}, ${statemap.get(d.id.slice(0, 2)).properties.name}\n<div className="tooltip-body">${valuemap.get(d.id)}%</div>`);
    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  }, []);

  return <svg ref={svgRef}></svg>;
};
