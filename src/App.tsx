import './App.css';
import { LocationList } from './components/LocationList';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <LocationList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
