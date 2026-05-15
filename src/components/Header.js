import React from "react";

function Header() {

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div style={styles.header}>

      <div>
        🚦 Traffic Complaint System
      </div>

      <div>
        👤 {name ? name : "Guest"} ({email})
      </div>

    </div>
  );
}

export default Header;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#1565c0",
    color: "white",
    fontWeight: "bold"
  }
};