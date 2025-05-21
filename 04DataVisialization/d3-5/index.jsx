const Chart = ({ data, height, width }) => {
  const createChart = () => {
    let color = d3.scaleOrdinal([1, 10], [...d3.schemeSet3, ...d3.schemePaired]);
    let hierarchy = d3.hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    let treemap = d3.treemap()
      .size([width, height])
      .paddingInner(5)
      (hierarchy);
    let tree = treemap.leaves();
    // Tooltip
    let tooltip = d3.select("#Chart").append("div")
      .attr("id", "tooltip")
      .attr("class", "tooltip")
      .style("opacity", 0);
    // Create Chart
    let svg = d3.select("#Chart").append("svg")
      .attr("width", width)
      .attr("height", height + 300)
      .attr("id", "tree");
    // Create leaves
    let leaf = svg
      .selectAll('g')
      .data(tree)
      .enter()
      .append('g')
      .attr('class', 'leaf');
    leaf
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => (d.x1 - d.x0))
      .attr("height", (d) => (d.y1 - d.y0))
      .style("stroke", "black")
      .attr("class", "tile")
      .attr("data-name", (d) => d.data.name)
      .attr("data-category", (d) => d.data.category)
      .attr("data-value", (d) => d.data.value)
      .style("fill", (d) => color(d.data.category))
      .on('mousemove', (event, d) => {
        tooltip.style('opacity', 0.9);
        tooltip
          .html(
            'Name: ' +
              d.data.name +
              '<br>Category: ' +
              d.data.category +
              '<br>Value: ' +
              d.data.value
          )
          .attr("data-value", d.data.value)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px')
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
    leaf
      .append('text')
      .attr('class', 'leaf-text')
      .selectAll('tspan')
      .data((d, i) => {
        let result = d.data.name.split(/(?=[A-Z][^A-Z])/g);
        return result.map((r) => [r, i]);
      })
      .enter()
      .append('tspan')
      .attr('x', (r, i) => 3.5 + (tree[r[1]].x0))
      .attr("y", (r, i) => 8 + (tree[r[1]].y0) + (i * 5))
      .text((r) => r[0]);
    // Legend
    let legend = svg.append("g")
      .attr("class", "legend")
      .attr("id", "legend");
    let legendLeaf = legend.selectAll("g")
      .data(new Set(tree.map((d) => d.data.category)))
      .enter()
      .append("g");
    legendLeaf
      .append("rect")
      .attr("x", (d, i) => 40 + (i * 45))
      .attr("y", (d, i) => height + 50)
      .attr("class", "legend-item")
      .attr("width", (d) => 20)
      .attr("height", (d) => 20)
      .attr("fill", (d) => color(d));
    legendLeaf
      .append("text")
      .attr("class", "legend-leaf-text")
      .attr("x", (d, i) => 40 + (i * 45))
      .attr("y", (d, i) => height + 90)
      .text((d) => d);
      
  }
  React.useEffect(() => {
    if (data != null) {
      createChart();
    }
  }, [data]);
  return (
    <div id="Chart">
      <h3 id="title">Tree Map</h3>
      <p id="description">Top 100 Most Sold Video Games Grouped by Platform</p>
    </div>
  );
}

const App = () => {
  const [data, setData] = React.useState(null);
  const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
  const getData = async () => {
    try {
      await axios.get(url)
        .then((result) => {
          setData(result.data)
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
        data={data}
        height={504}
        width={896}
      />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
