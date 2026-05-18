import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/api/complaints";

function MyComplaints() {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  const email = localStorage.getItem("email");

  const fetchMyComplaints = async () => {
    try {
      const res = await axios.get(`${API}/user/${email}`);
      setComplaints(res.data || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    if (email) {
      fetchMyComplaints();
    }
  }, [email]);

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <h2 style={{ margin: 0 }}>🚔 My Complaints</h2>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/complaint")}
        >
          ⬅ Back to Dashboard
        </button>

      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>

        <table style={styles.table}>

          <thead>
            <tr style={styles.headRow}>
              <th style={styles.cell}>ID</th>
              <th style={styles.cell}>Vehicle</th>
              <th style={styles.cell}>Status</th>
              <th style={styles.cell}>Location</th>
              <th style={styles.cell}>Photo</th>
              <th style={styles.cell}>Video</th>
            </tr>
          </thead>

<tbody>

  {complaints.length === 0 ? (

    <tr>

      <td
        colSpan="6"
        style={styles.empty}
      >
        No complaints found
      </td>

    </tr>

  ) : (

    complaints.map((c, index) => (

      <tr key={c.id}>

        {/* SERIAL NUMBER */}
        <td style={styles.cell}>
          {index + 1}
        </td>

        {/* VEHICLE */}
        <td style={styles.cell}>
          {c.vehicleNumber}
        </td>

        {/* STATUS */}
        <td style={styles.cell}>
          {c.status}
        </td>

        {/* LOCATION */}
        <td style={styles.cell}>
          {c.location}
        </td>

        {/* PHOTO */}
        <td style={styles.cell}>

          {c.photoUrl ? (

            <img
              src={c.photoUrl}
              alt="photo"
              style={styles.img}
            />

          ) : (

            "No Photo"
          )}

        </td>

        {/* VIDEO */}
        <td style={styles.cell}>

          {c.videoUrl ? (

            <video
              width="120"
              controls
              style={{
                borderRadius: "8px"
              }}
            >

              <source
                src={c.videoUrl}
              />

            </video>

          ) : (

            "No Video"
          )}

        </td>

      </tr>

    ))

  )}

</tbody>

        </table>

      </div>

    </div>
  );
}

export default MyComplaints;

/* ================= CSS ================= */

const styles = {

  page: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#f4f6f9",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  backBtn: {
    padding: "10px 15px",
    border: "none",
    background: "#1565c0",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  headRow: {
    background: "#1565c0",
    color: "white"
  },

  row: {
    transition: "0.2s"
  },

  cell: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center"
  },

  img: {
    width: "90px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  empty: {
    textAlign: "center",
    padding: "20px"
  }
};