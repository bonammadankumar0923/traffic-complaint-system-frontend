import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ComplaintPage() {

  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    complaintType: "",
    description: "",
    vehicleNumber: "",
    location: "",
    photo: "",
    video: "",
  });

  const [complaints, setComplaints] = useState([]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8081/api/complaints"
      );

      setComplaints(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // PAGE LOAD
  useEffect(() => {

    fetchComplaints();

  }, []);

  // SUBMIT COMPLAINT
  const submitComplaint = async () => {

    try {

      const payload = {
        complaintType: complaint.complaintType,
        description: complaint.description,
        vehicleNumber: complaint.vehicleNumber,
        location: complaint.location,
        photoUrl: complaint.photo,
        videoUrl: complaint.video,
      };

      await axios.post(
        "http://localhost:8081/api/complaints",
        payload
      );

      alert("Complaint Submitted Successfully");

      fetchComplaints();

      // CLEAR FORM
      setComplaint({
        complaintType: "",
        description: "",
        vehicleNumber: "",
        location: "",
        photo: "",
        video: "",
      });

    } catch (error) {

      console.error(error);

      alert("Failed To Submit Complaint");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
        background: "#f4f6f9",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#062b5b",
          color: "white",
          padding: "20px",
        }}
      >

        <h2 style={{ marginBottom: "40px" }}>
          Smart Traffic Complaint System
        </h2>

        <SidebarItem
          text="Dashboard"
          onClick={() => navigate("/dashboard")}
        />

        <SidebarItem
          text="Raise Complaint"
          active
          onClick={() => navigate("/complaint")}
        />

        <SidebarItem
          text="My Complaints"
          onClick={() => navigate("/my-complaints")}
        />

        <SidebarItem
          text="Complaint Status"
          onClick={() => navigate("/status")}
        />

        <SidebarItem
          text="Search Vehicle"
          onClick={() => navigate("/search-vehicle")}
        />

        <SidebarItem
          text="Notifications"
          onClick={() => navigate("/notifications")}
        />

        <SidebarItem
          text="Profile Settings"
          onClick={() => navigate("/profile")}
        />

        <SidebarItem
          text="Help & Support"
          onClick={() => navigate("/support")}
        />

        <SidebarItem
          text="Logout"
          onClick={() => navigate("/")}
        />

      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "30px" }}>

        {/* TOP HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            padding: "15px 25px",
            borderRadius: "10px",
            marginBottom: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >

          <h3>🚦 Raise Traffic Complaint</h3>

          <div style={{ display: "flex", gap: "30px" }}>
            <span>🚫 Don’t Drink and Drive</span>
            <span>🚦 Follow Traffic Signals</span>
            <span>🪖 Wear Helmet Save Life</span>
          </div>

        </div>

        {/* CONTENT */}
        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >

          {/* LEFT FORM */}
          <div
            style={{
              flex: 2,
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >

            <h2 style={{ marginBottom: "25px" }}>
              Raise Traffic Complaint
            </h2>

            {/* COMPLAINT TYPE */}
            <label>Complaint Type</label>

            <select
              name="complaintType"
              value={complaint.complaintType}
              style={inputStyle}
              onChange={handleChange}
            >
              <option>Select Complaint Type</option>
              <option>Wrong Parking</option>
              <option>Rash Driving</option>
              <option>Signal Jump</option>
              <option>Drunk and Drive</option>
            </select>

            {/* DESCRIPTION */}
            <label>Description</label>

            <textarea
              name="description"
              value={complaint.description}
              placeholder="Explain what happened..."
              style={{
                ...inputStyle,
                height: "120px",
              }}
              onChange={handleChange}
            />

            {/* PHOTO */}
            <label>Upload Photo Evidence</label>

            <input
              type="file"
              accept="image/*"
              style={inputStyle}
              onChange={(e) => {

                const file = e.target.files[0];

                const reader = new FileReader();

                reader.onloadend = () => {

                  setComplaint((prev) => ({
                    ...prev,
                    photo: reader.result,
                  }));
                };

                if(file) {
                  reader.readAsDataURL(file);
                }
              }}
            />

            {/* PHOTO PREVIEW */}
            {complaint.photo && (

              <img
                src={complaint.photo}
                alt="preview"
                style={{
                  width: "250px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
            )}

            {/* VIDEO */}
            <label>Upload Video Evidence</label>

            <input
              type="file"
              accept="video/*"
              style={inputStyle}
              onChange={(e) => {

                const file = e.target.files[0];

                const reader = new FileReader();

                reader.onloadend = () => {

                  setComplaint((prev) => ({
                    ...prev,
                    video: reader.result,
                  }));
                };

                if(file) {
                  reader.readAsDataURL(file);
                }
              }}
            />

            {/* VIDEO PREVIEW */}
            {complaint.video && (

              <video
                width="300"
                controls
                style={{
                  marginBottom: "20px",
                }}
              >
                <source src={complaint.video} />
              </video>
            )}

            {/* VEHICLE NUMBER */}
            <label>Vehicle Number</label>

            <div style={{ display: "flex", gap: "10px" }}>

              <input
                type="text"
                name="vehicleNumber"
                value={complaint.vehicleNumber}
                placeholder="TS09AB1234"
                style={{
                  ...inputStyle,
                  flex: 1,
                }}
                onChange={handleChange}
              />

              <button
                style={detectBtn}
                onClick={() =>
                  alert("Vehicle Detection Coming Soon")
                }
              >
                Detect Number
              </button>

            </div>

            {/* LOCATION */}
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={complaint.location}
              placeholder="Hyderabad"
              style={inputStyle}
              onChange={handleChange}
            />

            {/* SUBMIT */}
            <button
              style={submitBtn}
              onClick={submitComplaint}
            >
              Submit Complaint
            </button>

          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >

            {/* LOCATION */}
            <div style={cardStyle}>

              <h3>📍 Location Details</h3>

              <p>Latitude: 17.385044</p>
              <p>Longitude: 78.486671</p>

              <div
                style={{
                  background: "#ddd",
                  height: "200px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                Google Map
              </div>

            </div>

            {/* INSTRUCTIONS */}
            <div style={cardStyle}>

              <h3>ℹ Important Instructions</h3>

              <ul>
                <li>Upload clear evidence</li>
                <li>Provide correct vehicle number</li>
                <li>Do not submit fake complaints</li>
                <li>Track complaint status later</li>
              </ul>

            </div>

          </div>

        </div>

        {/* RECENT COMPLAINTS */}
        <div
          style={{
            background: "white",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >

          <h2>Recent Complaints</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >

            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th style={tableCell}>Complaint ID</th>
                <th style={tableCell}>Vehicle Number</th>
                <th style={tableCell}>Status</th>
                <th style={tableCell}>Location</th>
                <th style={tableCell}>Photo</th>
                <th style={tableCell}>Video</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((item) => (

                <tr key={item.id}>

                  <td style={tableCell}>
                    {item.id}
                  </td>

                  <td style={tableCell}>
                    {item.vehicleNumber}
                  </td>

                  <td style={tableCell}>
                    {item.status || "IN_PROGRESS"}
                  </td>

                  <td style={tableCell}>
                    {item.location}
                  </td>

                  {/* PHOTO */}
                  <td style={tableCell}>

                    {item.photoUrl ? (

                      <img
                        src={item.photoUrl}
                        alt="complaint"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                    ) : (
                      "No Photos Uploaded"
                    )}

                  </td>

                  {/* VIDEO */}
                  <td style={tableCell}>

                    {item.videoUrl ? (

                      <video
                        width="160"
                        height="100"
                        controls
                      >
                        <source src={item.videoUrl} />
                      </video>

                    ) : (
                      "No Videos Uploaded"
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

function SidebarItem({ text, active, onClick }) {

  return (
    <div
      onClick={onClick}
      style={{
        padding: "14px",
        marginBottom: "10px",
        background: active ? "#1565c0" : "transparent",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {text}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const submitBtn = {
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "15px",
  width: "100%",
  borderRadius: "6px",
  fontSize: "18px",
  cursor: "pointer",
};

const detectBtn = {
  background: "#0d47a1",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const tableCell = {
  border: "1px solid #ddd",
  padding: "12px",
};

export default ComplaintPage;