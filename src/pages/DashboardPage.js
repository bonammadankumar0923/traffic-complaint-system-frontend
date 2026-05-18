import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [complaints, setComplaints] =
    useState([]);

  const email =
    localStorage.getItem("email");

  // FETCH USER COMPLAINTS
  const fetchComplaints =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:8081/api/complaints/user/${email}`
          );

        setComplaints(
          response.data || []
        );

      } catch (error) {

        console.error(error);
      }
    };

  useEffect(() => {

    if (email) {

      fetchComplaints();
    }

  }, [email]);

  // COUNTS
  const totalComplaints =
    complaints.length;

  const pendingComplaints =
    complaints.filter(
      (c) =>
        c.status ===
        "IN_PROGRESS"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (c) =>
        c.status ===
        "RESOLVED"
    ).length;

  const rejectedComplaints =
    complaints.filter(
      (c) =>
        c.status ===
        "REJECTED"
    ).length;

  // LOGOUT
  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <div>

          <h1
            style={{
              margin: 0
            }}
          >
            🚦 Smart Traffic Dashboard
          </h1>

          <p
            style={{
              marginTop: "5px",
              color: "#555"
            }}
          >
            Welcome {email}
          </p>

        </div>

                <button
          style={styles.backBtn}
          onClick={() => navigate("/complaint")}
        >
          ⬅ Back to Dashboard
        </button>

      </div>

      {/* CARDS */}
      <div style={styles.cardContainer}>

        <div style={styles.card}>

          <h2>
            {totalComplaints}
          </h2>

          <p>
            Total Complaints
          </p>

        </div>

        <div style={styles.card}>

          <h2>
            {pendingComplaints}
          </h2>

          <p>
            Pending
          </p>

        </div>

        <div style={styles.card}>

          <h2>
            {resolvedComplaints}
          </h2>

          <p>
            Resolved
          </p>

        </div>

        <div style={styles.card}>

          <h2>
            {rejectedComplaints}
          </h2>

          <p>
            Rejected
          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.actionSection}>

        <h2>
          Quick Actions
        </h2>

        <div style={styles.actionButtons}>

          <button
            style={styles.actionBtn}
            onClick={() =>
              navigate("/complaint")
            }
          >
            Raise Complaint
          </button>

          <button
            style={styles.actionBtn}
            onClick={() =>
              navigate("/my-complaints")
            }
          >
            My Complaints
          </button>

          <button
            style={styles.actionBtn}
            onClick={() =>
              navigate("/search-vehicle")
            }
          >
            Search Vehicle
          </button>

        </div>

      </div>

      {/* RECENT COMPLAINTS */}
      <div style={styles.tableCard}>

        <h2>
          Recent Complaints
        </h2>

        <table style={styles.table}>

          <thead>

            <tr
              style={
                styles.tableHeader
              }
            >

              <th style={styles.cell}>
                ID
              </th>

              <th style={styles.cell}>
                Vehicle
              </th>

              <th style={styles.cell}>
                Status
              </th>

              <th style={styles.cell}>
                Location
              </th>

            </tr>

          </thead>

          <tbody>

            {complaints.length ===
            0 ? (

              <tr>

                <td
                  colSpan="4"
                  style={
                    styles.empty
                  }
                >
                  No Complaints Found
                </td>

              </tr>

            ) : (

              complaints.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={item.id}
                  >

                    <td
                      style={
                        styles.cell
                      }
                    >
                      {index + 1}
                    </td>

                    <td
                      style={
                        styles.cell
                      }
                    >
                      {
                        item.vehicleNumber
                      }
                    </td>

                    <td
                      style={
                        styles.cell
                      }
                    >
                      {
                        item.status
                      }
                    </td>

                    <td
                      style={
                        styles.cell
                      }
                    >
                      {
                        item.location
                      }
                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* SAFETY TIPS */}
      <div style={styles.tipsCard}>

        <h2>
          Traffic Safety Tips
        </h2>

        <ul>

          <li>
            Wear Helmet Always
          </li>

          <li>
            Do Not Drink and
            Drive
          </li>

          <li>
            Follow Traffic
            Signals
          </li>

          <li>
            Use Seat Belts
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Dashboard;

/* ================= STYLES ================= */

const styles = {

  page: {
    padding: "25px",
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)"
  },

  logoutBtn: {
    background: "#d32f2f",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)"
  },

  actionSection: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)"
  },

  actionButtons: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  actionBtn: {
    background: "#1565c0",
    color: "white",
    border: "none",
    padding: "14px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },

  tableCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)"
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    marginTop: "20px"
  },

  tableHeader: {
    background: "#1565c0",
    color: "white"
  },

    backBtn: {
    padding: "10px 15px",
    border: "none",
    background: "#1565c0",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  },

  cell: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center"
  },

  empty: {
    textAlign: "center",
    padding: "20px"
  },

  tipsCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)"
  }
};