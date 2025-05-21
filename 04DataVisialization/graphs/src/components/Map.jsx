import Plot from 'react-plotly.js';

var data = [{
  type: "choroplethmap",
  locations: ["NY", "MA", "VT"],
  z: [-50, -10, -20],
  geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
}];

var layout = {
  map: {
    center: {lon: -74, lat: 43},
    zoom: 3.5
  },
  width: 600, height:400
};

let config = {
  displayModeBar: false
}

export default function Map() {
  return (<Plot data={data} layout={layout} config={config} />)
};