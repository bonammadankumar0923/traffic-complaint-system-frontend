import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    pinCode: "",
    password: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER
  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8081/api/users/register",
        user
      );

      if(response.data === "REGISTER_SUCCESS") {

        alert("Registration Successful");

        navigate("/");

      } else if(response.data === "EMAIL_ALREADY_EXISTS") {

        alert("Email already exists");

      } else if(response.data === "PHONE_ALREADY_EXISTS") {

        alert("Phone number already exists");
      }

    } catch(error) {

      console.error(error);

      alert("Registration Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "500px",
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
      >

        {/* BACK */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#0d47a1",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ← Back to Login
        </Link>

        <h1
          style={{
            marginTop: "20px",
            marginBottom: "30px",
            color: "#0d47a1",
          }}
        >
          User Registration
        </h1>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          style={inputStyle}
          onChange={handleChange}
        />

        <input
          type="text"
          name="middleName"
          placeholder="Middle Name"
          style={inputStyle}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          style={inputStyle}
          onChange={handleChange}
        />

        <select
          name="gender"
          style={inputStyle}
          onChange={handleChange}
        >
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          style={inputStyle}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email ID"
          style={inputStyle}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          style={{
            ...inputStyle,
            height: "80px",
          }}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code"
          style={inputStyle}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={inputStyle}
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "15px",
            background: "#d32f2f",
            color: "white",
            border: "none",
            fontSize: "18px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

export default RegisterPage;