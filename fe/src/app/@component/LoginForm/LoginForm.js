import React, { useState } from "react";
import "./LoginForm.css";
import profileIcon from "../../../assets/persona-icon.png";
import { axiosInstance } from "../../../config/axios";
import { API_ENDPOINT } from "../../../config/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCode, setAccountCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform login operation
    try {
      const user = { email, password, crm_platform_account_id: accountCode };
      const response = await axiosInstance.post(API_ENDPOINT.AUTH_LOGIN, user);
      response.status === 200 && localStorage.setItem("access_token", response.data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="floatForm">
      <div>
        <img style={{ width: "30%", marginTop: "20px" }} src={profileIcon} />
      </div>
      <h2>LOGIN</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <label>Email*</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Code*</label>
          <input
            type="text"
            placeholder="Enter account code"
            value={accountCode}
            onChange={(e) => setAccountCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password*</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="submitButton">
          <input
            type="submit"
            value="Login"
            style={{
              backgroundColor: "rgba(255,255,255,.45)",
              borderRadius: "8px",
              fontFamily: "Raleway, monospace",
              color: "#eaf2f4",
              fontSize: "30px",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
