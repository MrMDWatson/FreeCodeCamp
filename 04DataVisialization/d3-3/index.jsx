const Chart = ({ graphData, width, height, padding }) => {
  const createChart = () => {
    const yearArray = graphData.map((d) => d["year"]);
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const xMax = d3.max(yearArray);
    const xMin = d3.min(yearArray);
    // Declare the x (horizontal position) scale.
    const xScale = d3
      .scaleLinear()
      .domain([xMin, xMax + 1])
      .range([padding, width - padding]);
    // Declare the y (vertical position) scale.
    const yScale = d3
      .scaleBand()
      .domain(months)
      .range([padding, height - padding]);
    // Add tooltip
    let tooltip = d3
      .select("#Chart")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);
    // Add chart to div
    const svg = d3
      .select("#Chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    // Add legend
    const legendData = [["9.67 degrees +", "red"], ["9.66 - 8.67 degrees", "yellow"], ["8.66 - 7.67 degress", "blue"], ["7.66 degrees -", "lightBlue"]];
    const legend = d3
      .select("#Chart")
      .append("div")
      .attr("id", "legend")
      .style("left", width - (40) + "px")
      .style("top", width - padding + "px");
    legend.selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("fill", (d) => d[1])
      .style("background", (d) => d[1])
      .attr("height", 20)
      .attr("width", 60)
      .attr("class", "legend-item")
      .html((d) => d[0]);
    // Add bars
    svg.selectAll("rect")
      .data(graphData)
      .enter()
      .append("rect")
      .attr("data-year", (d) => d["year"])
      .attr("data-month", (d) => d["month"] - 1)
      .attr("data-temp", (d) => d["variance"] + 8.66)
      .attr("height", (height - (padding * 2)) / 12)
      .attr("width", (width - (padding * 2)) / (xMax - xMin))
      .attr("x", (d, i) => xScale(d["year"]))
      .attr("y", (d, i) => yScale(months[d["month"] - 1]))
      .attr("fill", (d) => (
        d["variance"] > 2
        ? "red"
        : d["variance"] > 1
          ? "orange"
          : d["variance"] > 0
            ? "yellow"
            : d["variance"] > -1
              ? "blue"
              : "lightBlue"
      ))
      .attr("id", "cell")
      .attr("class", "cell")
      .on("mousemove", (event, d) => {
        tooltip.style("opacity", 0.9);
        tooltip
          .html(`${months[d["month"] - 1]} ${d["year"]}<br />${d3.format('.1f')((Math.floor((d["variance"] + 8.66) * 100)) / 100) + '&#8451;'}<br />Variance: ${d3.format('.1f')(d["variance"]) + '&#8451;'}`)
          .attr("data-year", d["year"])
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 75 + "px")
      })
      .on("mouseout", (event, d) => {
        tooltip.style("opacity", 0);
      });
    // Axis title
    svg.append("text")
      .attr("font-size", 16)
      .attr("transform", "rotate(-90)")
        .attr("x", "-250")
      .attr("y", "30")
      .attr("fill", "black")
      .text("Months");
    // Add the x-axis.
    let xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('d'));
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height - padding})`)
      .call(xAxis);
    // Add the y-axis.
    let yAxis = d3.axisLeft(yScale);
    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .call(yAxis);
  }
  React.useEffect(() => {
    if (graphData != null) {
      createChart();
    }
  }, [graphData]);
  return (
    <div id="Chart">
      <h3 id="title">Heat Map</h3>
      <p id="description">Surface Temperature - Base 8.66%</p>
    </div>
  );
}

const App = () => {
  const [graphData, setGraphData] = React.useState(null);
  const getGraphData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json");
      const result = await response.json();
      console.log(result);
      setGraphData(result.monthlyVariance);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getGraphData();
  }, []);
  return (
    <div id="App">
      <Chart
        graphData={graphData}
        height={600}
        width={800}
        padding={80}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));