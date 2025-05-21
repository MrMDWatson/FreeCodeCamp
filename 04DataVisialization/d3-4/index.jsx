const Chart = ({ educationData, countyData, height, width }) => {
  const createChart = () => {
    // Data arrays
    const usTopoArray = topojson.feature(countyData, countyData.objects.counties).features;
    const xMin = d3.min(educationData.map((d) => d["bachelorsOrHigher"]));
    const xMax = d3.max(educationData.map((d) => d["bachelorsOrHigher"]));
    // Map paths
    let path = d3.geoPath();
    // Color scale
    let color = d3.scaleQuantize([xMin, xMax], d3.schemeBlues[9].filter((d, i) => i > 1));
    // Legend scale
    let x = d3.scaleLinear([xMin, xMax], [600, 860]);
    // Create chart
    let svg = d3.select("#Chart").append("svg")
    .attr("width", width)
    .attr("height", height);
    // Create tooltip
    let tooltip = d3.select("#Chart").append("g")
      .attr("id", "tooltip")
      .attr("class", "tooltip")
      .style("opacity", 0);
    // Create legend
    let legend = svg.append("g")
      .attr("class", "legend")
      .attr("id", "legend");
    // Create counties
    svg.append("g")
      .attr("class", "counties")
      .selectAll('path')
      .data(usTopoArray)
      .enter()
      .append("path")
      .attr("class", "county")
      .attr("d", path)
      .attr("data-fips", (d) => d.id)
      .attr("data-education", (d) => educationData.filter((county) => county.fips === d.id)[0].bachelorsOrHigher)
      .attr("fill", (d) => color(educationData.filter((county) => county.fips === d.id)[0].bachelorsOrHigher))
      .on("mousemove", (event, d) => {
        tooltip.style("opacity", 0.9);
        tooltip
          .html(() => {
            let result = educationData.filter((county) => county.fips === d.id);
            return `${result[0]["area_name"]}, ${result[0]["state"]}: ${result[0].bachelorsOrHigher}%`;
          })
          .attr("data-education", () => educationData.filter((county) => county.fips === d.id)[0].bachelorsOrHigher)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
    // Create states
    svg
      .append("path")
      .datum(topojson.mesh(countyData, countyData.objects.states, (a, b) => a !== b))
      .attr("class", "states")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
    // Legend Axis
    let xLegendAxis = d3.axisBottom(x)
      .tickValues(color.range().map((d, i) => 3 + (i * ((xMax - xMin) / color.range().length))))
      .tickSize(8)
      .tickFormat((d) => `${Math.round(d)}%`);
    legend
      .attr("transform", `translate(0,40)`)
      .call(xLegendAxis);
    // Legend colors
    legend.selectAll("rect")
      .data(color.range().map((d) => [d, ...color.invertExtent(d)]))
      .enter()
      .append("rect")
      .attr("height", 6)
      .attr("x", (d, i) => x(d[1]))
      .attr("width", (d, i) => x(d[2]) - x(d[1]))
      .attr("fill", (d) => d[0]);
  }
  React.useEffect(() => {
    if (educationData != null && countyData != null) {
      createChart();
    }
  }, [educationData, countyData]);
  return (
    <div id="Chart">
      <h3 id="title">Choropleth Map</h3>
      <p id="description">Degree Attainment Percentage</p>
    </div>
  );
}

const App = () => {
  const [educationData, setEducationData] = React.useState(null);
  const [countyData, setCountyData] = React.useState(null);
  const educationUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
  const countyUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
  const urlArray = [educationUrl, countyUrl];
  const getData = async () => {
    try {
      await Promise.all(urlArray.map((url) => axios.get(url)))
        .then((responses) => {
          setEducationData(responses[0].data);
          setCountyData(responses[1].data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <main id="App">
      <Chart
        educationData={educationData}
        countyData={countyData}
        height={600}
        width={960}
      />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));