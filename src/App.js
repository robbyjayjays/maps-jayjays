import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Locations from './components/locations';
import Gym from './components/Gym'; // Import the Gym component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Locations />} />
                <Route path="/gym" element={<Gym />} /> {/* Route for the Gym component */}
            </Routes>
        </Router>
    );
}

export default App;
