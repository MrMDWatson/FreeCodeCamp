const Scattorplot = ({ graphData, width, height, padding }) => {
  const createScattorplot = () => {
    const yearArray = graphData.map((d) => d["Year"]);
    const timeArray = graphData.map((d) => d["Seconds"] * 1000);
    const xMax = d3.max(yearArray, (d) => d);
    const xMin = d3.min(yearArray, (d) => d);
    const yMax = d3.min(timeArray, (d) => d);
    const yMin = d3.max(timeArray, (d) => d);
    // Declare the x (horizontal position) scale.
    const xScale = d3
      .scaleLinear()
      .domain([xMin - 1, xMax + 1])
      .range([padding, width - padding]);
    // Declare the y (vertical position) scale.
    const yScale = d3
      .scaleTime()
      .domain([new Date(yMin + 5000), new Date(yMax - 5000)])
      .range([height - padding, padding]);
    // Add tooltip
    let tooltip = d3
      .select("#Chart")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);
    // Add legend
    const legend = d3
      .select("#Chart")
      .append("div")
      .attr("id", "legend")
      .style("left", width - (padding * 2) + "px")
      .style("top", height + "px")
      .html(`Red - Doping allegations <br /> Blue - No doping allegations`);
    // Add chart to div
    const svg = d3
      .select("#Chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    // Add bars
    svg.selectAll("circle")
      .data(graphData)
      .enter()
      .append("circle")
      .attr("r", 2)
      .attr("cx", (d, i) => xScale(d["Year"]))
      .attr("cy", (d, i) => yScale(new Date(d["Seconds"] * 1000)))
      .attr("data-xvalue", (d) => d["Year"])
      .attr("data-yvalue", (d) => new Date(d["Seconds"] * 1000))
      .attr("fill", (d) => d["Doping"] ? "red" : "blue")
      .attr("class", "dot")
      .on("mousemove", (d, i) => {
        tooltip.style("opacity", 0.9);
        tooltip
          .html(d["Year"] + `<br /> Time: ` + d["Time"])
          .attr("data-year", d["Year"])
          .style("left", (((width - (padding * 2)) / graphData.length) * i) + padding + "px")
          .style("top", d3.event.pageY - 60 + "px")
      })
      .on("mouseout", (d, i) => {
        tooltip.style("opacity", 0);
      });
    // Y axis title
    svg.append("text")
      .attr("font-size", 16)
      .attr("transform", "rotate(-90)")
        .attr("x", "-250")
      .attr("y", "30")
      .attr("fill", "black")
      .text("Time in Minutes");
    // Add the x-axis.
    let xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('d'));
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height - padding})`)
      .call(xAxis);
    // Add the y-axis.
    let yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat('%M:%S'));
    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .call(yAxis);
  }
  React.useEffect(() => {
    if (graphData != "") {
      createScattorplot();
    }
  }, [graphData]);
  return (
    <div id="Chart">
      <h3 id="title">Scattorplot</h3>
    </div>
  );
}

const App = () => {
  const [graphData, setGraphData] = React.useState([]);
  const getGraphData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
      const result = await response.json();
      setGraphData(result);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getGraphData();
  }, []);
  return (
    <div id="App">
      <Scattorplot
        graphData={graphData}
        width={1000}
        height={800}
        padding={80} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));