import './App.css';
import { Routes, Route } from 'react-router-dom'; // For routing and navigation
import Leftbar from './components/leftnavbar'; // Left navigation bar component
import Home from './pages/home'; // Home page that displays the list of tasks
import CreateTask from './pages/create'; // Page for creating new tasks

function App() {
  return (
    <div className="App h-full w-full m-0 p-0">
      {/* Flex container for the layout */}
      <div className="flex">
        <Leftbar /> {/* Left navigation bar component */}

        {/* Main content area */}
        <div className="">
          {/* Define the routes for navigation */}
          <Routes>
            <Route path="/home" element={<Home />} /> {/* Home page displaying tasks */}
            <Route path="/Create" element={<CreateTask />} /> {/* Create Task page */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
