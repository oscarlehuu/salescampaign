import './User.css'
import React, {useState} from "react"

import Navbar from "../../@component/SideNav/SideNav";
import {Route, Routes } from "react-router-dom";

import Dashboard from "../user/pages/dashboard/index"
// import Profile from "../user/pages/profile/Profile"
import Profile from "../user/pages/profile/index"

const User = () => {
    return ( 
        <div className="UserContainer">
            <Navbar />
            <Routes>
                <Route path="/" element= {<Dashboard/>} />
                <Route path="profile" element= {<Profile/>} />
            </Routes>
        </div>
    );
}
 
export default User;