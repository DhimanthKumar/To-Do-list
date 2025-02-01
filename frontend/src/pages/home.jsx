import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../components/task';
const Home = () => {
  // State for storing task data fetched from the API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching task data from the API when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/get') // Fetch data from the backend API
      .then((response) => {
        setData(response.data); // Save the fetched data in state
        setLoading(false); // Stop the loading indicator after data is fetched
      })
      .catch((error) => {
        console.error(error); // Log any errors in the console
        setLoading(false); // Stop the loading indicator even if there's an error
      });
  }, []); // Empty dependency array ensures this only runs once, when the component mounts

  return loading ? (
    // Show this loading screen while data is being fetched
    <div className="App ">Loading...</div>
  ) : (
    <div className="task-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4 overflow-auto max-h-screen">
      {/* Map over the data array to render Task components */}
      {data.map((element) => (
        <div key={element.id}> {/* Use key here directly on the div */}
          <Task
            id={element.id}
            job={element.job}
            status={element.status}
            deadline={element.deadline}
            created_at={element.created_at}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
