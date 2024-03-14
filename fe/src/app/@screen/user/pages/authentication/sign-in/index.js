import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../../../../@component/MDBox";
import MDTypography from "../../../../../@component/MDTypography";
import MDInput from "../../../../../@component/MDInput";
import MDButton from "../../../../../@component/MDButton";

// Authentication layout components
import BasicLayout from "../components/BasicLayout";

// Images
// import bgImage from "../../../../../../assets/images/bg-sign-in-basic.jpeg";
import bgImage from "../../../../../../assets/campaign1.png";
import { axiosInstance } from "../../../../../../config/axios";
import { API_ENDPOINT } from "../../../../../../config/api";
import { useAuthContext } from "provider/AuthProvider";
import { useNotificationContext } from "provider/NotificationProvider";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const { setUser } = useAuthContext();
  const { handleOpenNoti } = useNotificationContext();

  const handleLogin = async () => {
    try {
      const user = { email, password, crm_platform_account_code: accountCode };
      const response = await axiosInstance.post(API_ENDPOINT.AUTH_LOGIN, user);
      localStorage.setItem("access_token", response.data.access_token);
      const getMeResponse = await axiosInstance.get(API_ENDPOINT.AUTH_ME);
      setUser(getMeResponse.data);
      handleOpenNoti({ color: "success", content: "Sign in successfully" });
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.detail)) {
        error.detail.forEach((detail) => {
          handleOpenNoti({ color: "error", content: detail.msg });
        });
      } else {
        handleOpenNoti({ color: "error", content: error?.detail });
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Campaign Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Account Code"
                value={accountCode}
                onChange={(e) => setAccountCode(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => handleLogin()} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
