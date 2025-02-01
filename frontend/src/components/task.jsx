import { useState, useEffect } from "react"
import { Link, Route, Routes } from "react-router-dom";
import edit from "../assets/edit.png"
import Test from "./test";
import cancel from "../assets/cancel.png";
import save from "../assets/save.png";
import del from "../assets/delete.png";
import Deadlineerror from "./Deadlineerror";
import axios from "axios";
const Task = ({ id, job, status, deadline, created_at }) => {
    const color = status === "P" ? "lightyellow" : status === "IP" ? "lightblue" : "lightgreen";
    const [isediting, setIsediting] = useState(false);
    const [managejob, setJob] = useState(job);
    const [managestatus, setStatus] = useState(status === "P" ? "Pending" : status === "IP" ? "In Progress" : "Completed");
    
    const formatDate = (date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`; 
    };
    const deadlinedate = new Date(deadline)    
    const [managedeadline, setDeadline] = useState(formatDate(deadlinedate));
    const [validDeadline, setValidDeadline] = useState(true); // Default to true (valid)
    const [isTouched, setIsTouched] = useState(false);
    const handleedit = (e) => {
        setIsediting(true);
    }
    const handlejob = (e) => {
        setJob(e.target.value);
        console.log(e.target.value)
    }
    const handlestatus = (e) => {
        setStatus(e.target.value);
    }
    
    const handleDeadline = (e) => {
        const selectedDeadline = e.target.value; // Get the selected deadline string
        setIsTouched(true); // Mark the field as touched
        
        const now = new Date(); // Current date/time
        const deadlineDate = new Date(selectedDeadline); // Convert the string to a Date object
        
        
        if (deadlineDate > now) {
            setValidDeadline(true); // If the selected deadline is in the future
            setDeadline(deadlineDate.toISOString()) // Update the deadline
            print(managedeadline);
        } else {
            setValidDeadline(false); // If the selected deadline is in the past
            setDeadline(""); // Reset the deadline if invalid
        }
    };

    const [style, setStyle] = useState({
        // Use the variable here
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
        wordWrap: "break-word",
        whiteSpace: "normal",
        marginLeft: "5px",
    });
    //Only Valid Deadlines
    useEffect(() => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
    
        if (isNaN(deadlineDate.getTime())) {
            // If the deadline is invalid (NaN), do not proceed with the background color change
            return;
        }
    
        const backgroundColor = now > deadlineDate ? "red" : color;
        setStyle({ ...style, backgroundColor: backgroundColor });
    }, [isediting, deadline]);
    const dateString = deadline;
    const date = new Date(dateString);
    const formattedDate = date.toUTCString();
    // Format to a readable string
    
    const handlecancel = ()=>{
        setIsediting(false);
        setJob(job);
        setStatus(status === "P" ? "Pending" : status === "IP" ? "In Progress" : "Completed");
        setDeadline(deadlinedate);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(id)
        const formdata = { 
            job : managejob,
            status : managestatus == "Pending" ? "P" : managestatus === "In Progress" ? "IP" : "C",
            deadline : managedeadline ,
        };
        console.log(formdata)
        const olddata = {
            job:job ,
            status : status ,
            deadline : deadline
        }
        if (olddata != formdata){
            axios.patch(`http://127.0.0.1:8000/api/patch/${id}` , formdata)
            .catch((error) => {
                console.error("Error Editing task:", error);
              })
        }

    }
    const handledelete = ()=>{
        axios.delete(`http://127.0.0.1:8000/api/delete/${id}`)
        .then(response => {
            // After successful deletion, reload the page
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error Editing task:", error);
          })
    }
    return isediting ? <div style={{ ...style, backgroundColor: 'white' }}>
        <form>
            <label>Job : </label>
            <textarea value={managejob} onChange={handlejob} className="w-full bg-gray-100 border border-solid border-gray-300 p-1 min-w-64" />
            <br />
            <label>Status :</label>
            <select value={managestatus} onChange={handlestatus} required>
                <option >Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>
            <div className="m-2">
                Choose Deadline:
                <input
                    type="datetime-local"
                    value={managedeadline}
                    name="deadline"
                    onChange={handleDeadline}
                    required
                    className="w-full bg-gray-100 border border-solid border-gray-300 p-1"
                />
            </div>
            {isTouched && !validDeadline && <Deadlineerror />}
            <div className="flex  ">
            <img  src={cancel} width={40} className="ml-auto  m-2 hover:bg-gray-300 hover:border-1 p-2" onClick={handlecancel}/>
            <button type="submit" onClick={handleSubmit}>
            <img src={save}  width={40} className=" m-2  m-2 hover:bg-gray-300 hover:border-1 p-2"/></button></div>
    </form>
    </div>




        :


        (<div style={style}><div className="inline relative">
            <h3>Task: {job}</h3>
            
            <img src={del} width={20} title="delete" className="hover:cursor-pointer absolute top-0 right-0" onClick={handledelete} />
            </div>
            <h4 style={{ position: 'relative' }}>
                Status: {status === "P" ? "Pending" : status === "IP" ? "In Progress" : "Completed"}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Deadline: {formattedDate}</span>

                    <img src={edit} width={20} title="Edit" className="hover:cursor-pointer" onClick={handleedit} />
                </div>

            </h4>

        </div>)
}
export default Task;
