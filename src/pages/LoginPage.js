import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        loginData
      );

      if(response.data === "LOGIN_SUCCESS") {

        alert("Login Successful");

        navigate("/complaint");

      } else if(response.data === "USER_NOT_FOUND") {

        alert("User not found. Please register first.");

      } else if(response.data === "INVALID_PASSWORD") {

        alert("Invalid Password");
      }

    } catch(error) {

      console.error(error);

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#0d47a1",
          color: "white",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            lineHeight: "1.2",
            marginBottom: "30px",
          }}
        >
          Smart Traffic Complaint Management System
        </h1>

        <h2
          style={{
            fontSize: "24px",
            marginBottom: "30px",
          }}
        >
          Report Traffic Violations & Help Build Safer Roads
        </h2>

        <ul
          style={{
            fontSize: "18px",
            lineHeight: "2",
          }}
        >
          <li>Don’t Drink and Drive</li>
          <li>Follow Traffic Signals</li>
          <li>Wear Helmet Save Life</li>
          <li>Speed Thrills But Kills</li>
        </ul>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          alt="Traffic"
          style={{
            width: "320px",
            marginTop: "50px",
          }}
        />

      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <div
          style={{
            width: "420px",
          }}
        >

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "40px",
              fontWeight: "bold",
            }}
          >
            Traffic Violation Reporting Portal
          </h1>

          {/* EMAIL */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "20px",
              fontSize: "18px",
              border: "1px solid #999",
              borderRadius: "4px",
            }}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "20px",
              fontSize: "18px",
              border: "1px solid #999",
              borderRadius: "4px",
            }}
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "15px",
              background: "#d32f2f",
              color: "white",
              border: "none",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Login
          </button>

          {/* REGISTER */}
          <p
            style={{
              marginTop: "25px",
              fontSize: "18px",
            }}
          >
            New User?{" "}

            <Link
              to="/register"
              style={{
                color: "#d32f2f",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register Here
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;