import './App.css';
import { LocationList, locationsMock } from './components/LocationList';

function App() {
  return (
    <div className="App">
      <LocationList locations={locationsMock} />
    </div>
  );
}

export default App;
