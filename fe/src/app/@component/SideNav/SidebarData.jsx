import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/user/",
        icon: <AiIcons.AiFillDashboard />,
        cName: "nav-text"
    },
    {
        title: "Profile",
        path: "/user/profile",
        icon: <AiIcons.AiFillProfile />,
        cName: "nav-text"
    },
    {
        title: "Logout",
        path: "/user/logout",
        icon: <AiIcons.AiOutlineLogout />,
        cName: "nav-text"
    }
]