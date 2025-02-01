import axios from "axios";
import { useState } from "react";
import Deadlineerror from "../components/Deadlineerror";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const [job, setJob] = useState("");
  const [progress, setProgress] = useState("");
  const [deadline, setDeadline] = useState("");
  const [validDeadline, setValidDeadline] = useState(true); // Default to true (valid)
  const [isTouched, setIsTouched] = useState(false);

  // Handle Job input change
  const handleJob = (e) => {
    setJob(e.target.value);
  };

  // Handle Progress dropdown change
  const handleProgress = (e) => {
    setProgress(e.target.value);
  };

  // Handle Deadline input change and validation
  const handleDeadline = (e) => {
    const selectedDeadline = e.target.value; // Get the selected deadline string
    setIsTouched(true); // Mark the field as touched

    const now = new Date(); // Current date/time
    const deadlineDate = new Date(selectedDeadline); // Convert the string to a Date object

    if (deadlineDate > now) {
      setValidDeadline(true); // If the selected deadline is in the future
      setDeadline(selectedDeadline); // Update the deadline
    } else {
      setValidDeadline(false); // If the selected deadline is in the past
      setDeadline(""); // Reset the deadline if invalid
    }
  };
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // You can now submit the data via axios or any other method
    if (job && progress && validDeadline) {
      // If all fields are valid
      const formData = {
        job : job,
        status: progress=="Pending" ? "P" : "IP" ,
        deadline,
      };
      console.log(formData.job)

      // Example API request to submit the data
      axios
        .post("http://127.0.0.1:8000/api/post", formData)
        .then((response) => {
          console.log("Task created successfully:", response.data);
          // Reset form data after successful submission
          setJob("");
          setProgress("");
          setDeadline("");
          setIsTouched(false);
          setValidDeadline(true);
          navigate('/home')
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    } else {
      console.log("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} >
        {/* Job Details */}
        <div className="m-2">
          Enter Job Details:
          <br />
          <textarea
            name="job"
            value={job}
            onChange={handleJob}
            className="w-full bg-gray-100 border border-solid border-gray-300 p-1 min-w-64"
            required
          />
        </div>

        {/* Progress Selection */}
        <div className="m-2">
          Choose Progress:
          <br />
          <select
            value={progress}
            name="status"
            onChange={handleProgress}
            required
            className="bg-gray-400 p-1"
          >
            <option value="">Select Progress</option>
            <option>Pending</option>
            <option>In Progress</option>
          </select>
        </div>

        {/* Deadline Input */}
        <div className="m-2">
          Choose Deadline:
          <input
            type="datetime-local"
            value={deadline}
            name="deadline"
            onChange={handleDeadline}
            required
            className="w-full bg-gray-100 border border-solid border-gray-300 p-1"
          />
        </div>

        {/* Deadline Error Message */}
        {isTouched && !validDeadline && <Deadlineerror />}

        {/* Submit Button */}
        <button
          type="submit"
          className="border border-solid border-gray-400 rounded-md p-2 hover:bg-gray-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
