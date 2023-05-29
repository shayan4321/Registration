
import './App.css';
import Register from './components/Register';
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
        <Toaster />
        <Register />
    </div>
  );
}

export default App;
