import AgePopulationChart from './components/AgePopulationChart';
import data from "./dataFolder/agePopulation.json";
import Choropleth from './components/Choropleth';
import "./App.css";

export default function App() {

  return (
    <div className='App'>
      <AgePopulationChart
        data={data}
      />
      <Choropleth />
    </div>
  );
}
