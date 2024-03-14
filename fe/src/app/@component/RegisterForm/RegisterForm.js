import React, { useState } from "react";
import "./RegisterForm.css";
import profileIcon from "../../../assets/bald-mate.png"
import { createAccount } from "./function/CreateAccount";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const strengthLabels = ["weak", "medium", "strong"];
    const [strength, setStrength] = useState("");

    const getStrength = (password) => {
        let strengthIndicator = -1,
            upper = false,
            lower = false,
            numbers = false;

        for (let index = 0; index < password.length; index++) {
            const char = password.charCodeAt(index);
            if (!upper && char >= 65 && char <= 90) {
                upper = true;
                strengthIndicator++;
            }
            if (!numbers && char >= 48 && char <= 57) {
                numbers = true;
                strengthIndicator++;
            }
            if (!lower && char >= 97 && char <= 122) {
                lower = true;
                strengthIndicator++;
            }
        }
        setStrength(strengthLabels[strengthIndicator]);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        setPassword(inputValue);
        getStrength(inputValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login operation
        console.log(
            `Full Name: ${fullName}, Email: ${email}, Password: ${password}`
        );
    };

    return (
        <div className='floatForm'>
            <div><img className='avatar' src={profileIcon}/></div>
            <h2>CREATE ACCOUNT</h2>
            <form className="registerForm" onSubmit={handleSubmit}>
                <div>
                    <label>Full Name*</label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email*</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password*</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <div className={`bars ${strength}`}></div>
                    <div className="strength">
                        {strength && <> {strength} password </>}
                    </div>
                </div>

                <div className="checkboxContainer">
                    <input
                        type="checkbox"
                        id="agreement"
                        className="checkbox"
                        required
                    />
                    <label
                        htmlFor="agreement"
                        style={{ fontSize: "13px", marginLeft: "5px" }}
                    >
                        I have read and by creating my user account. I accept
                        the
                        <br /> general
                        <span style={{ color: "blue" }}>
                            {" "}
                            Terms & Conditions
                        </span>
                    </label>
                </div>
                <div className="submitButton">
                    <input
                        type="submit"
                        value="Create Account"
                        style={{
                            backgroundColor: "rgba(255,255,255,.45)",
                            borderRadius: "8px",
                            fontFamily: "Raleway, monospace",
                            color: "#eaf2f4",
                            fontSize: "30px",
                        }}
                        onClick={createAccount}
                    />
                </div>
            </form>
        </div>
    );
};

export default Register;
