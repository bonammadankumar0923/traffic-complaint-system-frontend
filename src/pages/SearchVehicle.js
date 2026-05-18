import { useState } from "react";
import axios from "axios";

function SearchVehicle() {

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  const search = () => {
    axios.get(
      `http://localhost:8081/api/complaints/search?vehicleNumber=${vehicleNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((res) => {
      setResults(res.data);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <h2>Search Vehicle</h2>

      <input
        placeholder="Enter vehicle number"
        onChange={(e) => setVehicleNumber(e.target.value)}
      />

      <button onClick={search}>
        Search
      </button>

      <hr />

      {results.map((item) => (
        <div key={item.id}>
          <h4>{item.vehicleNumber}</h4>
          <p>{item.title}</p>
          <p>{item.description}</p>
        </div>
      ))}

    </div>
  );
}

export default SearchVehicle;