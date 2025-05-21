import Plot from 'react-plotly.js';

let data = [{
  type: 'choropleth',
  locationmode: 'USA-states',
  locations: ['CA', 'TX', 'NY', 'FL', 'IL'],
  z: [10, 20, 30, 40, 50],
  colorscale: 'Blues',
  colorbar: {
    title: 'Values',
    thickness: 10
  }
}];

let layout = {
  title: 'USA Choropleth Map',
  geo: {
    scope: 'usa',
    projection: { type: 'albers usa' }
  }
}

let config = {
  displayModeBar: false,
  displaylogo: false
}

export default function Choropleth() {
  return (<Plot data={data} layout={layout} config={config} />)
};