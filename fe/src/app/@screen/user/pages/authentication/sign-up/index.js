// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "./../../../../../@component/MDBox";
import MDTypography from "./../../../../../@component/MDTypography";
import MDInput from "./../../../../../@component/MDInput";
import MDButton from "./../../../../../@component/MDButton";

// Authentication layout components
import CoverLayout from "../components/CoverLayout";

// Images
import bgImage from "../../../../../../assets/background-image1.png";

import { axiosInstance } from "config/axios";
import { useNotificationContext } from "provider/NotificationProvider";
import { API_ENDPOINT } from "config/api";

function Cover() {
  const navigate = useNavigate();
  const { handleOpenNoti } = useNotificationContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const user = { full_name: fullName, email, password, crm_platform_account_code: accountCode };
      await axiosInstance.post(API_ENDPOINT.AUTH_REGISTER, user);

      handleOpenNoti({ color: "success", content: "Sign up successfully" });
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.detail)) {
        error.detail.forEach((detail) => {
          handleOpenNoti({ color: "error", content: detail.msg });
        });
      } else {
        handleOpenNoti({ color: "error", content: error.detail });
      }
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                label="Name"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="crm_platform_account_code"
                value={accountCode}
                onChange={(e) => setAccountCode(e.target.value)}
                type="text"
                label="Account Code"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
