import './Login.css'
import leaderLogo from '../../../../assets/leader-logo.png'
import backgroundImage from '../../../../assets/campaign1.png'
import LoginForm from './../../../@component/LoginForm/LoginForm'
import RegisterForm from './../../../@component/RegisterForm/RegisterForm'
import { useState } from 'react'

function Login() {
    const [showForm, setShowForm] = useState('login');

    const handleForm = (formName) => {
        setShowForm(formName);
    }

    return (
        <div className="loginContainer">
            <div className="split leftSide" 
                style={{ backgroundImage: `url(${backgroundImage})`}}>
                {/* <img className='leaderLogo' src={leaderLogo}/> */}
                <div className="buttonSection">
                    <button className="loginButton" onClick={() => handleForm('login')}>Login</button>
                    <button className="registerButton" onClick={() => handleForm('register')}>Register</button>
                </div>
            </div>
            <div className="split rightSide">
                <div className="form">
                    {/* <img className='leaderLogo' src={leaderLogo}/> */}
                    {showForm === 'login' && <LoginForm />}
                    {showForm === 'register' && <RegisterForm />}
                </div>
            </div>
        </div>

    );
}

export default Login;