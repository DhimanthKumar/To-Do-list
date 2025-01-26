import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading as true

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/home')
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data); // Log data after it changes
    }
  }, [data]);

  return loading ? (
    <div className="App">Loading...</div> // Display loading if still fetching
  ) : (
    <div className="App">
      <h1>Data Fetched:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
    </div>
  );
}

export default App;
