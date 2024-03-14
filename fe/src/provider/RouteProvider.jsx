import React, { useState } from "react";

// react-router components
import { Routes, Route, Navigate } from "react-router-dom";

// @mui material components
import { CircularProgress, CssBaseline, Icon, Alert, Snackbar } from "@mui/material";
import { useMaterialUIController } from "app/@context";
import ProtectedPage from "components/ProtectedPage";

// Material Dashboard 2 React components
import MDBox from "app/@component/MDBox";

// Material Dashboard 2 React contexts
import { setMiniSidenav, setOpenConfigurator } from "app/@context";

// Material Dashboard 2 React example components
import Sidenav from "app/@examples/Sidenav";
import Configurator from "app/@examples/Configurator";

// Material Dashboard 2 React routes
import { useAuthContext } from "./AuthProvider";
import { routes, protectedRoutes } from "routes";
import { useNotificationContext } from "./NotificationProvider";

export default function RouteProvider() {
  const [controller, dispatch] = useMaterialUIController();
  const { layout, sidenavColor, miniSidenav, openConfigurator } = controller;
  const { user, isChecking } = useAuthContext();
  const { notification, open, handleCloseNoti } = useNotificationContext();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <>
      <CssBaseline />
      {isChecking && (
        <MDBox display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </MDBox>
      )}

      {!isChecking && user && (
        <>
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="CRM PLATFORM Campaign"
                routes={protectedRoutes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            <Route element={<ProtectedPage isAllowed={!!user} />}>
              {getRoutes(protectedRoutes)}
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      )}

      {!isChecking && !user && (
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseNoti}
      >
        <Alert
          elevation={5}
          variant="filled"
          onClose={handleCloseNoti}
          severity={notification.color}
        >
          {notification.content}
        </Alert>
      </Snackbar>
    </>
  );
}
