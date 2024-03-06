import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [cgpa, setCgpa] = useState(0);
  const [address, setAddress] = useState("");
  const [list, setList] = useState([]);
  const [showWarning, setShowWarning] = useState(false); // State for warning popup

  const add = () => {
    // Check if any field is empty
    if (!name || !age || !department || !year || !cgpa || !address) {
      setShowWarning(true); // Show warning popup if any field is empty
      return;
    } else {
      setShowWarning(false);
    }
    Axios.post("http://localhost:3000/insert", {
      name: name,
      age: age,
      department: department,
      year: year,
      cgpa: cgpa,
      address: address,
    }).then(() => {
      console.log("success");
      gett(); // After adding, refresh the list
    });
  };

  const gett = () => {
    Axios.get("http://localhost:3000/detail").then((response) => {
      setList(response.data);
    });
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`).then(() => {
      console.log("Student deleted");
      gett(); // After deleting, refresh the list
    });
  };

  return (
    <div className="App">
      <div className="App-container">

        <h1>Student Details</h1>
        <h3 style={{marginBottom:40}}>ABC Student Innovation Club</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Department</label>
        <input
          type="text"
          name="department"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <label>year</label>
        <input
          type="text"
          name="year"
          onChange={(e) => setYear(e.target.value)}
        />

        <label>cgpa</label>
        <input
          type="number"
          name="cgpa"
          onChange={(e) => setCgpa(e.target.value)}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="btn" onClick={add}>Submit</button>
        {/* Warning popup */}
        {showWarning && (
          
          <div className="warning-popup">
            <p>Enter valid details!</p>
            
          </div>
        )}
      </div>
      
      
      <button className="show" onClick={gett}>
        Display
      </button>

      {/* Display student details */}
      <div className="display">
        <div className="studentdet">
          <span className="id">ID</span>
          <span className="name">NAME</span>
          <span className="age">AGE</span>
          <span className="department">DEPARTMENT</span>
          <span className="year">YEAR</span>
          <span className="cgpa">CGPA</span>
          <span className="address">ADDRESS</span>
        </div>
        {list.map((value) => (
          <div key={value.id} className="studentdet">
            <span className="id">{value.id}</span>
            <span className="name">{value.name}</span>
            <span className="age">{value.age}</span>
            <span className="department">{value.department}</span>
            <span className="year">{value.year}</span>
            <span className="cgpa">{value.cgpa}</span>
            <span className="address">{value.address}</span>
            <button onClick={() => deleteStudent(value.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
